"use strict";

/* exported CODE_BEHIND */
const CODE_BEHIND = { init };

require("assets");

const
    M4 = require("webgl.math").m4,
    Add = require("webgl.filter.addition"),
    Filter = require("light-saber.filter"),
    Resize = require("webgl.resize"),
    HiltObject = require("light-saber.saber-hilt"),
    GaussianBlur = require("webgl.filter.gaussian-blur"),
    PlasmaObject = require("light-saber.saber-plasma");


/**
 * According to wikipedia, a light saber has a tilt of 27 cm and a plasma blade of 91 cm.
 * @this ViewXJS
 */
function init() {
    const
        that = this,
        canvas = this.$elements.canvas.$,
        gl = canvas.getContext("webgl", { preserveDrawingBuffer: false }),
        framebuffers = {},
        add = new Add({ gl }),
        filter = new Filter(gl),
        hiltObject = new HiltObject(gl),
        plasmaObject = new PlasmaObject(gl),
        projection = M4.identity(),
        rotation = M4.identity(),
        translation = new Float32Array([0, -0.4, -1.5, 0]);
    let
        blurH = new GaussianBlur({ gl, size: 7, energy: 0.6, horizontal: true }),
        blurV = new GaussianBlur({ gl, size: 7, energy: 0.6, horizontal: false });

    hiltObject.projection = projection;
    hiltObject.rotation = rotation;
    hiltObject.translation = translation;
    plasmaObject.projection = projection;
    plasmaObject.rotation = rotation;
    plasmaObject.translation = translation;

    createFramebuffers(gl, framebuffers);

    const paint = function(time) {
        requestAnimationFrame(paint);

        if (Resize(gl)) {
            console.log("Resize!");
            createFramebuffers(gl, framebuffers);
        }

        const
            angX = ramp(Math.sin(1 + time * 0.000147), -Math.PI * 0.5, Math.PI * 0.5),
            angY = 4 * Math.cos(time * 0.000458),
            w = gl.canvas.clientWidth,
            h = gl.canvas.clientHeight,
            fb = framebuffers;

        M4.rotationYX(angY, angX, rotation);
        M4.perspective(Math.PI * .35, w / h, .1, 10, projection);

        renderScene(gl, that.gloom ? fb.scene : null, hiltObject, plasmaObject, time);

        if (that.gloom) {
            if (that.persistence !== blurH.energy ||
                that.blur !== blurH.size) {
                const
                    size = Math.max(1, Math.floor(that.blur)),
                    energy = that.persistence;
                console.info("that.persistence=", that.persistence);
                console.info("blurH.energy=", blurH.energy);
                blurH = new GaussianBlur({ gl, size, energy, horizontal: true });
                blurV = new GaussianBlur({ gl, size, energy, horizontal: false });
            }

            renderFilter(gl, filter, fb.scene, fb.blurV, time);
            renderBlur(gl, blurH, fb.blurV, fb.blurH, time);
            renderBlur(gl, blurV, fb.blurH, fb.blurV, time);
            renderAdd(gl, add, fb.blurV, fb.scene, null, that.brightness, time);
        }
    };

    requestAnimationFrame(paint);
}

/**
 * Render the scene on screen or in a frame buffer.
 *
 * @param   {[type]} gl      [description]
 * @param   {[type]} outputFB [description]
 * @param {object} hiltObject -
 * @param {object} plasmaObject -
 * @param {float} time -
 */
function renderScene(gl, outputFB, hiltObject, plasmaObject, time) {
    bindFramebuffer(gl, outputFB);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clearDepth(1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    hiltObject.paint(time);
    plasmaObject.paint(time);
}

/**
 * Keep only the saber plasma.
 *
 * @param   {[type]} gl       [description]
 * @param   {[type]} filter   [description]
 * @param   {[type]} inputFB - Framebuffer for source.
 * @param   {[type]} outputFB - Framebuffer for destination.
 * @param {double} time -
 */
function renderFilter(gl, filter, inputFB, outputFB, time) {
    bindFramebuffer(gl, outputFB);

    filter.texture = inputFB.texture;
    filter.paint(time);
}

/**
 * Gaussian blur.
 *
 * @param   {[type]} gl       [description]
 * @param   {[type]} blur   [description]
 * @param   {[type]} inputFB [description]
 * @param   {[type]} outputFB [description]
 * @param {double} time -
 */
function renderBlur(gl, blur, inputFB, outputFB, time) {
    bindFramebuffer(gl, outputFB);

    blur.texture = inputFB.texture;
    blur.width = inputFB.width;
    blur.height = inputFB.height;
    blur.paint(time);
}

/**
 * Add glowing effect above final image.
 *
 * @param   {[type]} gl   [description]
 * @param   {[type]} add  [description]
 * @param   {[type]} time [description]
 * @param {object} fb -
 */
function renderAdd(gl, add, input0FB, input1FB, outputFB, brightness, time) {
    bindFramebuffer(gl, outputFB);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    add.texture0 = input0FB.texture;
    add.energy0 = brightness;
    add.texture1 = input1FB.texture;
    add.paint(time);
}

/**
 * Take a number between -1 and +1 and project it between min and max.
 *
 * @param   {float} value - Value between -1 and +1.
 * @param   {float} min - Mapped value for -1.
 * @param   {float} max - Mapped value for +1.
 * @returns {float} .
 */
function ramp(value, min, max) {
    const delta = max - min;
    return min + (value + 1) * 0.5 * delta;
}

/**
 * Create all needed framebuffers and delete the previous one.
 *
 * @param   {[type]} gl           [description]
 * @param   {[type]} framebuffers [description]
 */
function createFramebuffers(gl, framebuffers) {
    Object.values(framebuffers).forEach(deleteFramebuffer.bind(null, gl));

    const
        w = Math.max(1, gl.canvas.width),
        h = Math.max(1, gl.canvas.height);

    framebuffers.scene = createFramebufferWithDepth(gl, w, h);
    framebuffers.filter = createFramebuffer(gl, w / 2, h / 2);
    framebuffers.blurH = createFramebuffer(gl, w / 4, h / 4);
    framebuffers.blurV = createFramebuffer(gl, w / 4, h / 4);
}

/**
 * Crate a Framebuffer and its associated texture.
 *
 * @param   {[type]} gl     [description]
 * @param   {[type]} width  [description]
 * @param   {[type]} height [description]
 *
 * @returns {object} `{ texture, framebuffer }`
 */
function createFramebuffer(gl, width, height) {
    const texture = createTexture(gl, width, height);
    const fb = gl.createFramebuffer();

    // Tell GL that the current framebuffer is this one.
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

    // Attach the texture to this framebuffer.
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D, texture, 0
    );

    return { texture, fb, width, height };
}

/**
 * Create a texture of the given size.
 *
 * @param {object} gl -
 * @param   {int} width -
 * @param   {int} height -
 * @returns {Texture} -
 */
function createTexture(gl, width, height) {
    const texture = gl.createTexture();

    // Tell GL that the current texture is this one.
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // The texture doesn't wrap and it uses linear interpolation.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Set texture dimension.
    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, null
    );

    return texture;
}

/**
 * Crate a Framebuffer with its associated texture and depth buffer.
 *
 * @param   {[type]} gl     [description]
 * @param   {[type]} width  [description]
 * @param   {[type]} height [description]
 *
 * @returns {object} `{ texture, fb, depth }`
 */
function createFramebufferWithDepth(gl, width, height) {
    const fb = createFramebuffer(gl, width, height);

    // Create a depth renderbuffer
    const depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

    fb.depth = depthBuffer;
    return fb;
}

/**
 * Clean up the framebuffer and its texture.
 *
 * @param   {[type]} gl          [description]
 * @param   {[type]} frameBuffer [description]
 */
function deleteFramebuffer(gl, { texture, fb, depth }) {
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(fb);
    if (depth) {
        gl.deleteRenderbuffer(depth);
    }
}

/**
 * Bind to the given Framebuffer.
 *
 * @param  {[type]} gl          [description]
 * @param  {[type]} framebuffer - Can be null to switch to the render buffer.
 */
function bindFramebuffer(gl, framebuffer) {
    if (!framebuffer) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer.fb);
        gl.viewport(0, 0, framebuffer.width, framebuffer.height);
    }
}
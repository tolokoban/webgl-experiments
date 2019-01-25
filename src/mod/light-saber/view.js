"use strict";

/* exported CODE_BEHIND */
const CODE_BEHIND = { init };

require("assets");

const
    M4 = require("webgl.math").m4,
    Add = require("light-saber.add"),
    Blur = require("light-saber.blur"),
    Filter = require("light-saber.filter"),
    Resize = require("webgl.resize"),
    HiltObject = require("light-saber.saber-hilt"),
    PlasmaObject = require("light-saber.saber-plasma"),
    VerticalBlur = require("light-saber.vertical-blur"),
    HorizontalBlur = require("light-saber.horizontal-blur");


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
        add = new Add(gl, framebuffers, "persistence1", "scene"),
        blur1 = new VerticalBlur(gl, framebuffers, "filter", 9),
        blur2 = new HorizontalBlur(gl, framebuffers, "blur1", 9),
        filter = new Filter(gl, framebuffers, "scene"),
        blurPersistence = new Blur(gl, framebuffers, "persistence1"),
        addPersistence = new Add(gl, framebuffers, "persistence2", "blur2"),
        hiltObject = new HiltObject(gl),
        plasmaObject = new PlasmaObject(gl),
        projection = M4.identity(),
        rotation = M4.identity(),
        translation = new Float32Array([0, -0.4, -1.5, 0]);

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
            h = gl.canvas.clientHeight;

        M4.rotationYX(angY, angX, rotation);
        M4.perspective(Math.PI * .35, w / h, .1, 10, projection);

        const sceneFB = framebuffers.scene;
        const filterFB = framebuffers.filter;
        const blur1FB = framebuffers.blur1;
        const blur2FB = framebuffers.blur2;
        const persistence1FB = framebuffers.persistence1;

        renderScene(gl, sceneFB, that.gloom, hiltObject, plasmaObject, time);

        if (that.gloom) {
            renderFilter(gl, filter, filterFB, time);
            renderPersistence(gl, blurPersistence, framebuffers, time);
            renderBlur(gl, blur1, blur1FB, time);
            renderBlur(gl, blur2, blur2FB, time);
            renderAdd(gl, addPersistence, time, persistence1FB);
            renderAdd(gl, add, time, null, that.brightness);
        }
    };

    requestAnimationFrame(paint);
}

/**
 * Render the scene on screen or in a frame buffer.
 *
 * @param   {[type]} gl      [description]
 * @param   {[type]} sceneFB [description]
 * @param   {[type]} gloom   [description]
 * @param {object} hiltObject -
 * @param {object} plasmaObject -
 * @param {float} time -
 */
function renderScene(gl, sceneFB, gloom, hiltObject, plasmaObject, time) {
    if (gloom) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, sceneFB.fb);
        gl.viewport(0, 0, sceneFB.width, sceneFB.height);
    } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

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
 * @param   {[type]} filterFB [description]
 * @param {double} time -
 */
function renderFilter(gl, filter, filterFB, time) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, filterFB.fb);
    gl.viewport(0, 0, filterFB.width, filterFB.height);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    filter.paint(time);
}

/**
 * Gaussian blur.
 *
 * @param   {[type]} gl       [description]
 * @param   {[type]} blur   [description]
 * @param   {[type]} blurFB [description]
 * @param {double} time -
 */
function renderBlur(gl, blur, blurFB, time) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, blurFB.fb);
    gl.viewport(0, 0, blurFB.width, blurFB.height);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const attenuation = 1.75;
    blur.centerCoeff = 0.332 * attenuation;
    blur.segmentCoeff = 0.122 * attenuation;
    blur.cornerCoeff = 0.045 * attenuation;
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
function renderAdd(gl, add, time, fb = null, brightness = 1) {
    if (fb === null) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb.fb);
        gl.viewport(0, 0, fb.width, fb.height);

    }
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    add.brightness = brightness;
    add.paint(time);
}

/**
 * Fade persistence buffer.
 *
 * @param   {[type]} gl           [description]
 * @param   {[type]} blur         [description]
 * @param   {[type]} framebuffers [description]
 * @param   {[type]} time         [description]
 */
function renderPersistence(gl, blur, framebuffers, time) {
    const fb = framebuffers.persistence2;

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb.fb);
    gl.viewport(0, 0, fb.width, fb.height);

    const attenuation = 0.8;
    blur.centerCoeff = 0.332 * attenuation;
    blur.segmentCoeff = 0.122 * attenuation;
    blur.cornerCoeff = 0.045 * attenuation;
    blur.paint(time);
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
    framebuffers.filter = createFramebuffer(gl, w / 8, h / 8);
    framebuffers.blur1 = createFramebuffer(gl, w / 4, h / 4);
    framebuffers.blur2 = createFramebuffer(gl, w / 4, h / 4);
    framebuffers.persistence1 = createFramebuffer(gl, w / 2, h / 2);
    framebuffers.persistence2 = createFramebuffer(gl, w / 2, h / 2);
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
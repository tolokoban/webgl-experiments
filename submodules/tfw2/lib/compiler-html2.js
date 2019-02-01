"use strict";

module.exports = {
    compile,
    initialize
};


/*
 *  When compiling the file `main.html`, we  gather all the CSS and JS files
 *  needed.
 *
 * If `no-zip` option has  not been set, all the CSS  files are combined in
 *  `css/@main.css` and all the JS files are combined in `js/@main.js`.
 *
 * # Modules
 *
 * Modules are stored in folder `mod/`.
 * * `mymodule/`
 * * `mymodule.js`
 * * `mymodule.xjs`
 * * `mymodule.ini`
 * * `mymodule.css`
 * * `mymodule.dep`
 */

const
    FS = require( "fs" ),
    Path = require( "path" ),
    ToloframeworkPermissiveJson = require( "toloframework-permissive-json" ),
    MinifyJS = require( "./minifyJS" ),
    CompilerCOM = require( "./compiler-com" ),
    CompilerJS = require( "./compiler-js" ),
    ParserHTML = require( "./tlk-htmlparser" ),
    PathUtils = require( "./pathutils" ),
    Template = require( "./template" ),
    Source = require( "./source" ),
    Fatal = require( "./fatal" ),
    Util = require( "./util" ),
    Tree = require( "./htmltree" ),
    Libs = require( "./compiler-com-libs" ),
    Tpl = require( "./template" ),
    Rework = require( 'rework' );

let
    Project = null,
    Components = {},
    Scopes = [ {} ];


/**
 * @param  {type} prj - Current project.
 * @returns {undefined}
 */
function initialize( prj ) {
    Project = prj;
    Components = {};
    Scopes = [ {} ];
    CompilerCOM.loadComponents( prj );
}


/**
 * @param {string} file - Full path of the HTML file to compile.
 * @param {object} _options - Options for debug/release mode, etc.
 * @returns {object} Compiled html source code as an instance of Source.
 * @see source
 */
function compile( file, _options ) {
    const
        options = typeof _options !== 'undefined' ? _options : {},
        sourceHTML = new Source( Project, file ),
        // Array of the sources we must link.
        sourcesToLink = [];
    let
        // Output of a page file.
        outputPage = '',

        /*
         * In case of  multi-pages, the first page has the  same name as the `file`.
         * So it's output must become the output of the `file`.
         */
        outputOfFirstPage = '',
        // Page filename relative to the sourceHTML.
        pageFilename = '';
    // Check if the file and all its components are uptodate.
    if ( !isUptodate( sourceHTML ) ) {
        Scopes[ 0 ].$filename = sourceHTML.name();
        console.log( `Compile HTML: ${sourceHTML.name().cyan}` );
        let root = ParserHTML.parse( sourceHTML.read() );
        // Output of the main file.
        const output = compileRoot( root, sourceHTML, options );
        if ( output ) {
            sourceHTML.tag( 'output', output );
            while ( typeof root.type === 'undefined' &&
                root.children &&
                root.children.length === 1 ) {
                root = root.children[ 0 ];
            }
            if ( root.type === Tree.PAGES ) {
                outputPage = ToloframeworkPermissiveJson.parse( JSON.stringify( output ) );
                root.children.forEach( function ( child, idx ) {
                    console.log( ( "  Page " + ( idx + 1 ) ).cyan );
                    var src = sourceHTML;
                    pageFilename = src.name();
                    if ( idx !== 0 ) {
                        pageFilename = file.substr( 0, file.length - 4 ) + idx + '.html';
                        src = new Source( Project, pageFilename );
                    }
                    outputPage = compileRoot(
                        child, src, options, ToloframeworkPermissiveJson.parse( JSON.stringify( output ) )
                    );
                    outputPage.filename = pageFilename;
                    src.tag( "output", outputPage );
                    src.save();
                    sourcesToLink.push( pageFilename );
                    if ( idx === 0 ) {
                        // This is the first page.
                        outputOfFirstPage = outputPage;
                    }
                } );
                sourceHTML.tag( 'pages', sourcesToLink );
                sourceHTML.tag( 'output', outputOfFirstPage );
            }
            sourceHTML.save();
        }
    }

    // Linking.
    linkPages( sourceHTML, options );
    return sourceHTML;
}


/**
 * @param {Source} sourceHTML - Html source instance.
 * @param {object} options - Options for debug/release mode, etc.
 * @returns {undefined}
 */
function linkPages( sourceHTML, options ) {
    console.log( `Link: ${sourceHTML.name().yellow}` );
    const sourcesToLink = sourceHTML.tag( 'pages' );
    if ( sourcesToLink ) {
        // Multi-pages.
        sourcesToLink.forEach( function forEachPage( pageFilename ) {
            const src = new Source( Project, pageFilename );
            link( src, options );
        } );
    } else {
        // Single page.
        link( sourceHTML, options );
    }
}

/**
 * @param {object} root - HTML tree.
 * @param {Source} sourceHTML - Source object represnting the HTML file.
 * @param {object} options - Build options for release/debug, etc.
 * @param {object} _output - Stuff used internally in the recursive process to create the final Html file.
 * @see tlk-htmlparser
 */
function compileRoot( root, sourceHTML, options, _output ) {
    // Stuff to create HTML file.
    const output = typeof _output !== 'undefined' ? _output : {
        // Code CSS.
        innerCSS: {},
        // CSS files.
        outerCSS: {},
        // Code Javascript to embed in `js/@index.js` file.
        innerJS: {},
        // Javascript modules directly required.
        require: {},
        // All the Javascript modules needed to build this page.
        modules: [],
        // Javascript code to insert in a `DOMContentLoaded` event.
        initJS: {},
        // Javascript code to insert in a `DOMContentLoaded` event after all the code of `initJS`.
        postInitJS: {},
        // Files needed to build this file. If a include change, we must recompile.
        include: {},
        // A resource is a file to create in the output folder when this HTML is linked.
        // the key is the resource name, and the value is an objet depending on the type of resource:
        //  * {dst: "img/plus.png", src: "../gfx/icon-plus.png"}
        //  * {dst: "img/face.svg", txt: "<svg xmlns:svg=..."}
        resource: {},
        // Modules  that have  no real  file in  `mod` directory,  but
        // which are created dynamically in Components.
        dynamicModules: {}
    };
    var libs = Libs( sourceHTML, Components, Scopes, output );
    libs.compile( root, options );
    Tree.trim( root );
    output.root = root;
    return output;
}

/**
 * A source needs to be rebuild if it is not uptodate.
 * Here are the reasons for a source not to be uptodate:
 * * Source code more recent than the tags (`Source.isUptodate()`).
 * * Includes source codes more recent than this source.
 * @param {Source} sourceHTML - Html source file.
 */
function isUptodate( sourceHTML ) {
    if ( !sourceHTML.isUptodate() ) return false;
    var output = sourceHTML.tag( 'output' );
    if ( !output || !output.include ) return true;
    // File name relative to `sourceHTML`.
    var includeFilename;
    // Source object of the `sourceFilename`.
    var includeSource;
    // Modification time for the current HTML file.
    var currentFileModificationTime = sourceHTML.modificationTime();
    // Stats of an include file.
    var stats;
    for ( includeFilename in output.include ) {
        includeSource = new Source(
            Project,
            sourceHTML.getPathRelativeToSource( includeFilename )
        );
        stats = FS.statSync( includeSource.getAbsoluteFilePath() );
        if ( stats.mtime > currentFileModificationTime ) {
            // An included file if more recent. We must recompile.
            return false;
        }
    }
    return true;
}

/**
 * Take  a HTML  file `filename.html`  and combine  all the  styles in
 * `css/@filename.css` and  all the javascripts  in `js/@filename.js`.
 * For each module, check if there is  a folder with the same name. If
 * yes, copy  that resource  in `css`  dir. For  example, it  you have
 * `mod/foobar.js`   and   a   folder  `mod/foobar/`,   copy   it   to
 * `www/css/foobar/`.
 */
function link( src, options ) {
    const
        htmlDir = Path.dirname( src.name() ),
        pathWWW = Project.wwwPath( htmlDir ),
        pathJS = Path.join( pathWWW, "js" ),
        pathCSS = Path.join( pathWWW, "css" );

    Project.mkdir( pathJS );
    Project.mkdir( pathCSS );

    const output = linkForRelease( src, pathJS, pathCSS, options, htmlDir );

    PathUtils.file(
        Project.wwwPath( src.name() ),
        `<!DOCTYPE html>\n${Tree.toString(output.root).trim()}`
    );

    // Writing resources if any.
    writeResources( output );
}

/**
 *
 */
function linkForRelease( src, pathJS, pathCSS, options, htmlDir ) {
    Project.mkdir( Path.join( pathJS, "map" ) );
    Project.mkdir( Path.join( pathCSS, "map" ) );

    var key, val;
    var prj = src.prj();
    var nameWithoutExt = src.name().substr( 0, src.name().length - 5 );
    // If `nameWithoutExt` is in a subfolder, `backToRoot` must containt
    // as many `../` as there are subfolders in `nameWithoutExt`.
    var backToRoot = getBackToRoot( nameWithoutExt );
    backToRoot = ''; // Finalement les dépendances sont au même niveau que le fichier HTML.

    var output = src.tag( "output" ) || {};
    var root = output.root;
    if ( !root ) {
        Fatal.fire(
            "The cache seems to be corrupted. Try `tfw clean` to clean it up. " +
            "And try building again.",
            "Please cleanup the cache!"
        );
    }
    output.filename = src.name();
    var head = findHead( root );
    addDescriptionToHead( head, options );
    var innerJS = Tpl.file( "require.js" ).out + concatDicValues( output.innerJS );
    innerJS += getInitJS( output );

    var innerCSS = concatDicValues( output.innerCSS );

    // If there is a CSS file with the same name as the HTML file, embed it.
    if ( FS.existsSync( Project.srcOrLibPath( nameWithoutExt + '.css' ) ) ) {
        console.log( "Found: " + ( nameWithoutExt + ".css" ) );
        innerCSS += PathUtils.file( Project.srcOrLibPath( nameWithoutExt + '.css' ) );
    }

    function addInnerJS() {
        // Adding innerJS.
        const zippedJS = MinifyJS.minify( {
            name: src.name(),
            content: innerJS
        } ).zip;
        prj.flushContent( "js/" + addFilePrefix( nameWithoutExt ) + ".js", zippedJS, htmlDir );
        head.children.push( {
            type: Tree.TAG,
            name: 'script',
            attribs: {
                defer: null,
                src: backToRoot + "js/" + addFilePrefix( nameWithoutExt ) + ".js"
            }
        } );
    }

    const combination = combineRequires( output, options );
    makeDependenciesGraph( combination.js, src, Project );

    var externalDeps = lookForExternalDependencies( combination.js );
    externalDeps.js.forEach( function ( code ) {
        innerJS += code;
    } );
    for ( key in externalDeps.res ) {
        val = externalDeps.res[ key ];
        try {
            Project.copyFile( key, val );
        } catch ( ex ) {
            throw Error( "Unable to copy external dependency `" + key + "` into `" + val + "`!\n" +
                JSON.stringify( externalDeps, null, '  ' ) );
        }
    }

    // Used to loop over CSS and JS files.
    if ( options.dev ) {
        addInnerJS();
        // DEBUG. Do not combine.
        for ( key in combination.css ) {
            val = combination.css[ key ];
            if ( key.substr( 0, 4 ) == 'mod/' ) {
                key = key.substr( 4 );
            }
            head.children.push( {
                type: Tree.TAG,
                name: 'link',
                void: true,
                attribs: {
                    rel: "stylesheet",
                    type: "text/css",
                    href: backToRoot + "css/" + key + ".css"
                }
            } );
            prj.flushContent( "css/" + key + ".css", val.src, htmlDir );
        }
        for ( key in combination.js ) {
            val = combination.js[ key ];
            if ( key.substr( 0, 4 ) == 'mod/' ) {
                key = key.substr( 4 );
            }
            head.children.push( {
                type: Tree.TAG,
                name: 'script',
                attribs: {
                    defer: null,
                    src: backToRoot + "js/" + key + ".js"
                }
            } );
            prj.flushContent( "js/" + key + ".js", val.src, htmlDir );
            prj.flushContent( "js/" + key + ".js.map", JSON.stringify( val.map ), htmlDir );
        }
    } else {
        // RELEASE.
        for ( key in combination.css ) {
            val = combination.css[ key ];
            innerCSS += val.zip;
        }
        for ( key in combination.js ) {
            val = combination.js[ key ];
            innerJS += val.zip + "\n";
        }
        addInnerJS();
    }

    // Adding innerCSS.
    prj.flushContent( "css/" + addFilePrefix( nameWithoutExt ) + ".css", innerCSS, htmlDir );
    head.children.push( {
        type: Tree.TAG,
        name: 'link',
        void: true,
        attribs: {
            rel: "stylesheet",
            type: "text/css",
            href: backToRoot + "css/" + addFilePrefix( nameWithoutExt ) + ".css"
        }
    } );

    return output;
}

/**
 * Look for any "*.dep" file for all the neededmodules.
 *
 * @param   {array} jsFiles - Array of the JS files of each module.
 * @returns {undefined}
 */
function lookForExternalDependencies( jsFiles ) {
    const
        javascriptSources = [],
        resources = {};

    for ( const jsFileName of Object.keys( jsFiles ) ) {
        const depFileName = `${jsFileName}.dep`;
        if ( Project.srcOrLibPath( depFileName ) ) {
            const depFile = new Source( Project, depFileName );
            try {
                const
                    json = depFile.read(),
                    dependencies = ToloframeworkPermissiveJson.parse( json );
                // Looking for Javascript dependencies.
                lookForExternalDependenciesJS( dependencies.js, javascriptSources );
                // Looking for other dependencies.
                lookForExternalDependenciesRES( dependencies.res, resources, depFile );
            } catch ( ex ) {
                Fatal.fire(
                    `Unable to parse JSON file "${depFile.getAbsoluteFilePath()}"!\n${ex}`,
                    Project.srcOrLibPath( jsFileName )
                );
            }
        }
    }

    return {
        js: javascriptSources,
        res: resources
    };
}

/**
 * Section "res" in a dependency file.
 *
 * @param   {objects} _def - `{ "bob/foo.png": "", "yo/man.kml": "maps/man.kml" }`
 * @param {object} resources -
 * @param {Source} depFile - Source of the dependency file.
 * @returns {undefined}
 */
function lookForExternalDependenciesRES( _def, resources, depFile ) {
    if ( !_def ) return;
    try {
        const def = convertExternalDependencyDefinition( _def );
        for ( const dep of Object.keys( def ) ) {
            if ( def[ dep ] === "" ) {
                // `res: { "bob/foo.png": "" }` is equivalent to
                // `res: { "bob/foo.png": "bob/foo.png" }`
                def[ dep ] = dep;
            }
            const
                srcDep = Project.srcOrLibPath( `mod/${dep}` ) ||
                Project.srcOrLibPath( dep );
            if ( !srcDep ) {
                Fatal.fire(
                    `Unable to find dependency file "${dep}" nor "mod/${dep}"!`,
                    depFile.getAbsoluteFilePath()
                );
            }
            resources[ srcDep ] = Project.wwwPath( def[ dep ] );
        }
    } catch ( ex ) {
        Fatal.fire(
            `Unable to parse RES dependencies: ${JSON.stringify(_def)}!\n${ex}`,
            depFile
        );
    }
}

/**
 * Section "js" in a dependency file.
 *
 * @param   {objects} _def - `{ "helper.js": "" }` or `"helper.js"`.
 * @param {array} javascriptSources - Array of the Javascript code to include in current HTML page.
 * @returns {undefined}
 */
function lookForExternalDependenciesJS( _def, javascriptSources ) {
    if ( !_def ) return;
    try {
        const def = convertExternalDependencyDefinition( _def );
        Object.keys( def ).forEach( function ( js ) {
            const
                filename = `mod/${js}`,
                src = new Source( Project, filename ),
                code = src.read();
            pushUnique( javascriptSources, code );
        } );
    } catch ( ex ) {
        Fatal.fire(
            `Unable to parse JS dependencies: ${JSON.stringify(_def)}!\n${ex}`,
            javascriptSources
        );
    }
}

/**
 * There are three ways to define a list of external dependencies:
 * * "foo.js"
 * * ["foo.js", "bar.js"]
 * * { "foo.js": "libs/foo.js", ... }
 *
 * This function transforms a definition in its third form: `{ "foo.js": "libs/foo.js", ... }`.
 *
 * @param   {any} def - Definition of the dependencies.
 * @returns {object} Definition in the third form.
 */
function convertExternalDependencyDefinition( def ) {
    if ( typeof def === 'string' ) {
        const defAsString = {};
        defAsString[ def ] = "";
        return defAsString
    }
    if ( Array.isArray( def ) ) {
        const defAsArray = {};
        def.forEach( function ( file ) {
            defAsString[ file ] = "";
        } );
    }
    return def;
}

/**
 * Push `item` into `arr` if it is not already in.
 */
function pushUnique( arr, item ) {
    if ( arr.indexOf( item ) > -1 ) return false;
    arr.push( item );
    return true;
}

function writeResources( output ) {
    // Name of the resource.
    var resourceName;
    // Data of the resource.
    var resourceData;
    // Destination path (in `www`folder).
    var dstPath;
    // Source path (in `src` folder).
    var srcPath;
    // Resource content.
    var content;

    for ( resourceName in output.resource ) {
        resourceData = output.resource[ resourceName ];
        dstPath = Project.wwwPath( resourceData.dst );
        if ( PathUtils.isDirectory( dstPath ) ) {
            // We must copy a whole directory.

        } else {
            // Create folders if needed.
            Project.mkdir( Path.dirname( dstPath ) );
            if ( resourceData.src ) {
                srcPath = Project.srcOrLibPath( resourceData.src );
                Project.copyFile( srcPath, dstPath );
            } else {
                content = resourceData.txt;
                PathUtils.file( dstPath, content );
            }
        }
    }

    // Copy modules' resources if any.
    var moduleName;
    // Path of the folder containing the resourses of the module (if any).
    var resourcePath;
    output.modules.forEach( function ( moduleName ) {
        resourcePath = Project.srcOrLibPath( moduleName );
        if ( resourcePath ) {
            // Ok, this folder exists.
            //console.info( "Copy resource: " + ( moduleName + "/" ).cyan );
            var dst = Path.join( Path.dirname( output.filename ), moduleName.substr( 4 ) );
            dst = dst.replace( /\\/g, '/' );
            Project.copyFile( resourcePath, Project.wwwPath( 'css/' + dst ) );
        }
    } );
}


function concatDicValues( map ) {
    if ( !map ) return '';
    var key, out = '';
    for ( key in map ) {
        if ( out != '' ) out += "\n";
        out += key;
    }
    return out;
}


function findHead( root ) {
    if ( !root ) return null;

    var head = Tree.getElementByName( root, "head" );
    if ( !head ) {
        // There is no <head> tag. Create it!
        var html = Tree.getElementByName( root, "html" );
        if ( !html ) {
            html = {
                type: Tree.TAG,
                name: "html",
                children: []
            };
            root.children.push( html );
        }
        head = {
            type: Tree.TAG,
            name: "head",
            children: []
        };
        html.children.push( head );
    }
    return head;
}


function getInitJS( output ) {
    var js = '';
    var dynamicModule, code;
    for ( dynamicModule in output.dynamicModules ) {
        code = output.dynamicModules[ dynamicModule ];
        js += code;
    }
    js += concatDicValues( output.initJS ) +
        "\n" + concatDicValues( output.postInitJS );
    if ( js.length > 0 ) {
        return Tpl.file( "init.js", {
            INIT_JS: js
        } ).out;
    }
    return js;
}


function writeInnerCSS( innerCSS, pathCSS, nameWithoutExt, head, sourcemap ) {
    if ( innerCSS.length > 0 ) {
        // Add inner CSS file.
        writeCSS( '@' + nameWithoutExt + ".css", innerCSS );
        head.children.push( {
            type: Tree.TAG,
            name: 'link',
            void: true,
            attribs: {
                rel: "stylesheet",
                type: "text/css",
                href: "css/@" + nameWithoutExt + ".css"
            }
        } );
    }
}


function writeInnerJS( innerJS, pathJS, nameWithoutExt, head, sourcemap ) {
    if ( innerJS.length > 0 ) {
        // Add inner JS file.
        writeJS( '@' + nameWithoutExt + ".js", innerJS );
        head.children.push( {
            type: Tree.TAG,
            name: 'script',
            attribs: {
                defer: null,
                src: "js/@" + nameWithoutExt + ".js"
            }
        } );
    }
}


/**
 * @param {object} output - Results of the HTML's compilation.
 *
 * @return {object} two attributes:
 * * __js__: map of Javascript sources.
 * * __css__: map of stylesheet sources.
 */
function combineRequires( output, options ) {
    // The  `cache` is  used  to prevent  dependencies  cycling. When  a
    // module has been  processed, we add its name in  the `cache`. Next
    // time we find a module already in `cache` we will not process it.
    var cache = {},
        // dictionary  of directly needed modules. The key is the module's name, the value is always `1`.
        modules = output.require || {},
        // List of modules' names we have to process.
        fringe = [],
        // Name of the current module.
        moduleName,
        // Style Sheet combined content.
        css = '',
        // Source file of the JS or CSS for the current module.
        src,
        // Dependencies of the current module's javascript.
        dependencies,
        // Map of Javascript sources. No compression.
        jsFiles = {},
        // Map of Stylesheet sources. No compression.
        cssFiles = {},
        // Iterator used for comments visual improvements.
        i;

    if ( !Array.isArray( output.modules ) ) output.modules = [];

    // Fill the cache with all dynamic modules.
    for ( moduleName in output.dynamicModules ) {
        cache[ moduleName ] = 1;
    }

    // Always include the module `$` which was generated automatically.
    modules[ 'mod/$' ] = 1;
    // Fill the fringe with `modules`.
    for ( moduleName in modules ) {
        fringe.push( moduleName );
    }

    // Process all required modules by popping the next module's name from the `fringe`.
    while ( fringe.length > 0 ) {
        moduleName = fringe.pop(); // Pop the current module from the `fringe`.
        cache[ moduleName ] = 1; // Don't process this module more than once.
        if ( moduleName.substr( 0, 4 ) == 'cls/' ) {
            // We have to include `tfw3.js` for backward compatibility.
            output.innerJS[ Template.file( 'tfw3.js' ).out ] = 1;
        } else if ( moduleName.substr( 0, 4 ) == 'mod/' ) {
            // Remember all the modules used in this HTML page.
            if ( output.modules.indexOf( moduleName ) < 0 ) {
                output.modules.push( moduleName );
            }
        }
        //============
        // Javascript
        //------------
        // Compile (if  not uptodate) the  JS of the current  module and
        // return the source file.
        src = CompilerJS.compile( Project, moduleName + ".js", options, output );
        if ( !jsFiles[ moduleName ] ) {
            jsFiles[ moduleName ] = {
                src: src.tag( 'src' ),
                zip: src.tag( 'zip' ),
                map: src.tag( 'map' ),
                dep: src.tag( "dependencies" )
            };
        }
        // Adding dependencies to the `fringe`.
        dependencies = src.tag( "dependencies" );
        if ( Array.isArray( dependencies ) ) {
            dependencies.forEach( function ( dep ) {
                if ( !cache[ dep ] ) {
                    fringe.push( dep );
                }
            } );
        }
        //==============
        // Style Sheets
        //--------------
        src = compileCSS( moduleName + ".css", options );
        if ( src ) {
            if ( !cssFiles[ moduleName ] ) {
                cssFiles[ moduleName ] = {
                    src: src.tag( 'src' ),
                    zip: src.tag( 'zip' )
                };
            }
        }
    }

    return {
        js: jsFiles,
        css: cssFiles
    };
}


function writeJS( name, sourceZip, sourceMap ) {
    if ( name.substr( -3 ) == '.js' ) {
        name = name.substr( 0, name.length - 3 );
    }
    var path = Path.join( Project.wwwPath( "js" ), name + ".js" );
    FS.writeFileSync( path, sourceZip );
    if ( sourceMap ) {
        path = Path.join( Project.wwwPath( "js" ), name + ".js.map" );
        FS.writeFileSync( path, sourceMap );
    }
    // Look for resources.
    var src = Project.srcOrLibPath( name );
    if ( FS.existsSync( src ) ) {
        var dst = Path.join( Project.wwwPath( "css" ), name );
        Project.copyFile( src, dst );
    }
}


function writeCSS( name, content, sourceMap ) {
    if ( name.substr( -4 ) == '.css' ) {
        name = name.substr( 0, name.length - 4 );
    }
    var path = Path.join( Project.wwwPath( "css" ), name + ".css" );
    FS.writeFileSync( path, content );
    if ( sourceMap ) {
        path = Path.join( Project.wwwPath( "css" ), name + ".css.map" );
        FS.writeFileSync( path, sourceMap );
    }
}


function moduleExists( requiredModule ) {
    var path = Project.srcOrLibPath( requiredModule + ".js" );
    if ( path ) return true;
    return false;
}


function minifyCSS( name, code, options ) {
    var result = null;
    if ( !code ) return null;

    if ( code.trim().length == 0 ) {
        // Empty CSS content.
        console.log( " Warning! ".yellowBG.black + name + " is EMPTY!" );
        return null; // {src: "", zip: ""};
    }

    try {
        var css = Util.zipCSS( code );
        result = {
            src: code,
            zip: css.styles,
            map: css.sourceMap
        };
    } catch ( ex ) {
        throw Error( "Unable to minify CSS \"" + name + "\":\n" + ex +
            "\n\nCSS content was:\n" + code.substr( 0, 256 ) +
            ( code.length > 256 ? '\n[...]' : '' ) );
    }
    return result;
}

/**
 * @param {string} path Source path relative to the `src` folder.
 */
function compileCSS( path, options ) {
    var absPath = Project.srcOrLibPath( path );
    if ( !absPath ) return null;
    var src = new Source( Project, path );
    if ( !src.exists() ) return null;
    if ( !src.isUptodate() ) {
        console.log( "Compiling CSS " + path.yellow );
        var cssCode = src.read();
        //var multiBrowserCssCode = Rework( cssCode ).use( Vars({}) ).toString();
        var multiBrowserCssCode = Rework( cssCode ).toString();
        var minify = minifyCSS( src.name(), multiBrowserCssCode, options );
        src.tag( 'src', cssCode );
        src.tag( 'zip', minify.zip );
        src.tag( 'map', minify.map );
        src.save();
    }
    return src;
}


/**
 * Add a prefix to  a filename. This is not as  simple as prepending the
 * `prefix` to  the string `path`,  because `path` can  contain folders'
 * separators. The  prefix must be prepended  to the real file  name and
 * not to the whole path.
 * Examples with `prefix` == "@":
 * * `foobar.html`: `@foobar.html`
 * * `myfolder/myfile.js`: `myfolder/@myfile.js`
 */
function addFilePrefix( path, prefix ) {
    if ( typeof prefix === 'undefined' ) prefix = '@';

    var separatorPosition = path.lastIndexOf( '/' );
    if ( separatorPosition < 0 ) {
        // Let's try with Windows separators.
        separatorPosition = path.lastIndexOf( '\\' );
    }
    var filenameStart = separatorPosition > -1 ? separatorPosition + 1 : 0;
    var result = path.substr( 0, filenameStart ) + prefix + path.substr( filenameStart );
    return result.replace( /\\/g, '/' );
}

/**
 * The  depth of  `path` is  the number  of subfolders  it defines.  For
 * example, `foo.js'  defined no  subfolder and  it is  of depth  0. But
 * `foo/bar/file.html` has two levels of subfolders hence it is of depth
 * 2.
 */
function getBackToRoot( path ) {
    // Counter for '/'.
    var standardFolderSepCount = 0;
    // Counter for '\' (windows folder separator).
    var windowsFolderSepCount = 0;
    // Loops index used for parsing chars of `path`and to add `../` to the result.
    var i;
    // Current char read from `path`.
    var c;
    // Counting folders' separators.
    for ( i = 0; i < path.length; i++ ) {
        c = path.charAt( i );
        if ( c == '/' ) standardFolderSepCount++;
        if ( c == '\\' ) windowsFolderSepCount++;
    }
    var folderSepCount = Math.max( standardFolderSepCount, windowsFolderSepCount );
    if ( folderSepCount == 0 ) {
        // There is no subfolder.
        return '';
    }

    var result = '';
    var folderSep = '/'; // windowsFolderSepCount > standardFolderSepCount ? '\\' : '/';
    for ( i = 0; i < folderSepCount; i++ ) {
        result += '..' + folderSep;
    }
    return result;
}


/**
 * Add a description in the header if no one was found.
 * @param {string} options.config.description - The description to use.
 */
function addDescriptionToHead( head, options ) {
    if ( !options || !options.config || typeof options.config.description !== 'string' ) {
        return false;
    }

    if ( !Array.isArray( head.children ) ) {
        head.children = [];
    }
    for ( let i = 0; i < head.children.length; i++ ) {
        const child = head.children[ i ];
        if ( child.type !== Tree.ELEMENT ) continue;
        if ( child.name.toLowerCase() != 'meta' ) continue;
        if ( !child.attribs ) continue;
        if ( typeof child.attribs.name !== 'string' ) continue;
        if ( child.attribs.name.toLowerCase() === 'description' ) {
            // There is already a description. We don't add a new one.
            return false;
        }
    }
    head.children.push( {
        type: Tree.ELEMENT,
        name: 'meta',
        attribs: {
            name: 'description',
            content: options.config.description
        }
    } );
    return true;
}


/**
 * For `src/foobar.html`, creates a graphviz file `doc/foobar.dot`
 * with all the dependencies of all modules used by `foobar.html`.
 * @param {array} modules - `{ "tp4.trace-tools": { dep: [...] }, ... }`.
 * @param {Source} source - HTML source file.
 * @param {Project} project - Current project.
 * @return {undefined}
 */
function makeDependenciesGraph( modules, source, project ) {
    const
        lines = Object.keys( modules ).map( ( moduleName ) => {
            const
                module = modules[ moduleName ],
                moduleShortName = Util.removeFirstSubFolder( moduleName ),
                mapper = function mapper( dependencyName ) {
                    return `    "${moduleShortName}" -> "${Util.removeFirstSubFolder(dependencyName)}"\n`;
                };
            return module.dep.map( mapper ).join( "\n" );
        } ),
        content = `digraph dependencies {\n${lines.join('')}\n}`,
        destinationPath = project.docPath( `${source.name()}.dot` );
    FS.writeFileSync( destinationPath, content );
}
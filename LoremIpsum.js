/*
 * The MIT License (MIT)
 * Copyright (c) 2013 Lance Campbell. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, regexp: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

define(function (require, exports, module) {
    "use strict";

    // --- Constants ---
    var DEFAULT_WRAP_WIDTH  = 80;
    
    // --- Private members
    var _loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, ";
    _loremIpsumText += "sed do eiusmod tempor incididunt ut labore et dolore magna ";
    _loremIpsumText += "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ";
    _loremIpsumText += "ullamco laboris nisi ut aliquip ex ea commodo consequat. ";
    _loremIpsumText += "Duis aute irure dolor in reprehenderit in voluptate velit ";
    _loremIpsumText += "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint ";
    _loremIpsumText += "occaecat cupidatat non proident, sunt in culpa qui officia ";
    _loremIpsumText += "deserunt mollit anim id est laborum.";
    
    // --- Helper functions
    function isNumber(value) {
        return (typeof value === "number") && (isFinite(value));
    }

    // From http://james.padolsey.com/javascript/wordwrap-for-javascript/
    function _wordwrap(str, width, brk, cut) {
        brk = brk || "\n";
        width = width || 75;
        cut = cut || false;
        
        if (!str) { return str; }
        
        var regex = ".{1," + width + "}(\\s|$)" + (cut ? "|.{" + width + "}|.+$" : "|\\S+?(\\s|$)");
        
        return str.match(new RegExp(regex, "g")).join(brk);
    }
    
    // Public methods
    function parseCommand(command) {
        var i,
            commandArray    = command.split("."),
            commandRegExp   = /([a-z]+)(\d*)/,
            commandResult   = [],
            commandString   = "",
            commandInt      = 0,
            finalText       = "";
        
        // Command options
        var isHTML      = false,
            isWrapped   = true,
            wrapWidth   = DEFAULT_WRAP_WIDTH;
        
        // Parse the command string
        for (i = 1; i < commandArray.length; i++) {
            commandResult   = commandArray[i].match(commandRegExp);
            commandString   = commandResult[1];
            commandInt      = parseInt(commandResult[2], 10);
            
            switch (commandString) {
            case "html":
                isHTML = true;
                break;
            case "nowrap":
                isWrapped = false;
                break;
            case "wrap":
                isWrapped = true;
                wrapWidth = (isNumber(commandInt)) ? commandInt : DEFAULT_WRAP_WIDTH;
                break;
            default:
                // Command Error: just return an empty string for now
                // TODO: return a useful error message that helps fix the command
                return "";
            }
        }
        
        if (isWrapped) {
            if (wrapWidth && (wrapWidth > 0)) {
                finalText = _wordwrap(_loremIpsumText, wrapWidth);
            } else {
                finalText = _wordwrap(_loremIpsumText, DEFAULT_WRAP_WIDTH);
            }
        } else {
            finalText = _loremIpsumText;
        }
        
        if (isHTML) {
            finalText = "<p>\n" + finalText + "\n</p>";
        }
        
        return finalText;
    }
    
    // --- Public API ---
    exports.parseCommand = parseCommand;
});
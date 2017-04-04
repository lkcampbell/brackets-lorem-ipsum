/*
 * The MIT License (MIT)
 * Copyright (c) 2013-2017 Lance Campbell. All rights reserved.
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
/*global define, brackets, XMLHttpRequest, $ */

define(function (require, exports, module) {
    "use strict";
    
    // Brackets modules
    var EditorManager       = brackets.getModule("editor/EditorManager"),
        AppInit             = brackets.getModule("utils/AppInit"),
        CommandManager      = brackets.getModule("command/CommandManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager");
    
    // Extension modules
    var LoremIpsum = require("LoremIpsum");
    
    // Constants
    var LOREM_COMMAND_NAME  = "Lorem Ipsum",
        LOREM_COMMAND_ID    = "lkcampbell.loremIpsum",
        LOREM_KEY           = "Ctrl-Shift-L";
    
    function _getLoremCommand(editor) {
        var document    = editor.document,
            pos         = editor.getCursorPos(),
            line        = document.getLine(pos.line),
            start       = pos.ch,
            end         = pos.ch,
            command     = "";
        
        while (start > 0 && (/\S/).test(line.charAt(start - 1))) {
            --start;
        }
        
        command = document.getRange({line: pos.line, ch: start}, {line: pos.line, ch: end});
        
        if (command.match(/lorem/)) {
            command = command.substring(command.match(/lorem/).index);
        }
        
        return ((command.split("_")[0] === "lorem") ? command : "");
    }
    
    // Event handlers
    function _handleLoremIpsum() {
        var editor      = EditorManager.getFocusedEditor(),
            command     = editor ? _getLoremCommand(editor) : null,
            text        = "",
            start       = 0,
            end         = 0,
            codemirror  = null,
            i           = 0;
        
        if (command) {
            text    = LoremIpsum.parseCommand(command);
            end     = editor.getCursorPos();
            start   = {line: end.line, ch: end.ch - command.length};
            editor.document.replaceRange(text, start, end);
            
            // Fix the line indentation
            codemirror = editor._codeMirror;
            if (codemirror) {
                end = editor.getCursorPos();
                for (i = (start.line); i <= end.line; i++) {
                    codemirror.indentLine(i);
                }
            }
        }
    }

    // Initialize extension
    AppInit.appReady(function () {
        // Register commands and bind default keyboard shortcut (same for all platforms)
        CommandManager.register(LOREM_COMMAND_NAME, LOREM_COMMAND_ID, _handleLoremIpsum);
        KeyBindingManager.addBinding(LOREM_COMMAND_ID,
                                     [{key: LOREM_KEY},
                                      {key: LOREM_KEY, platform: "mac"}]);
    });
});

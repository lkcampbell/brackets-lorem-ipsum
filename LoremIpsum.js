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
    
    var _loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, ";
    _loremIpsumText += "sed do eiusmod tempor incididunt ut labore et dolore magna ";
    _loremIpsumText += "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ";
    _loremIpsumText += "ullamco laboris nisi ut aliquip ex ea commodo consequat. ";
    _loremIpsumText += "Duis aute irure dolor in reprehenderit in voluptate velit ";
    _loremIpsumText += "esse cillum dolore eu fugiat nulla pariatur. Excepteur sint ";
    _loremIpsumText += "occaecat cupidatat non proident, sunt in culpa qui officia ";
    _loremIpsumText += "deserunt mollit anim id est laborum.";
    
    // --- Helper functions
    
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
    function getParagraph() {
        return _wordwrap(_loremIpsumText, 80);
    }
    
    
    // --- Public API ---
    exports.getParagraph = getParagraph;
});
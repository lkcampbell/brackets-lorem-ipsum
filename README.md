# Lorem Ipsum Generator for Brackets
An extension for [Brackets](https://github.com/adobe/brackets/) to produce
Lorem Ipsum text automatically.

### How to Install
1. Select **Brackets > File > Install Extension...**
2. Type or paste https://github.com/lkcampbell/brackets-lorem-ipsum into the
dialog box
3. Click on the **Install** button.

### How to Use Extension
For plaintext Lorem Ipsum, type `lorem` then press the **Tab** key.

You can also add options to the `lorem` command in the format `<.option>`.
Multiple options can be chained together.  For example, typing `lorem.html.wrap40`
and then pressing the **Tab** key will give you html formatted Lorem Ipsum text
and a word wrap width of 40 characters.

**Note:** Options to the far right of the chain always have the highest
priority. If two options in the chain conflict with each other, the option
on the right will have precedence. For example, the command `lorem.nowrap.wrap40`
will insert Lorem Ipsum text with a word wrap width of 40 characters and the
command `lorem.wrap40.nowrap` will insert Lorem Ipsum text with no word wrapping.

##### List of Current Options
**.html:** Provides Lorem Ipsum text in HTML format.

**.nowrap:** Inserts Lorem Ipsum text without any word wrapping.

**.wrap[width]:** Word wraps Lorem Ipsum text using the specified `width`
For example, `lorem.wrap40` will wrap the text at 40 characters.  By default,
the word wrap option is on and the width is set to 80 characters.  If you want
to turn word wrap off, use the `.nowrap` option.

### Roadmap

* Randomized content
* Multiple words, sentences, and paragraphs
* Multiple sizes: short, medium, long, and very long
* HTML links and lists
* Help documentation
* Error handling (highlight unrecognized portions of command)

### License
MIT-licensed -- see `main.js` for details.

### Compatibility
Brackets Sprint 22 or later.

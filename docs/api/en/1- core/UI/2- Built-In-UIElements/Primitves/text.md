- **Text Elements :**
  - ***`text(...str : (string | number | boolean)[])`*** : Represents a standard text element.
    - `📦 .setValue(newTextContent : string, add : boolean)`
    - `📦 .addValue(newTextContent : string, add : boolean)`
    - `📦 .clear()`
    - `📦 .value`

  - ***`quote(...str : (string | number | boolean)[])`*** : Creates an inline quotation element with the given text or values.
  
  - ***`dfnText(...str : (string | number | boolean)[])`*** : Defines a term by wrapping the provided text or values in a ***&lt;dfn&gt;*** element.

  - ***`codeText(...str : (string | number | boolean)[])`*** : 

  - ***`supText(sup : (string | number | boolean)[])`*** : Creates a superscript element with the given text or values.

  - ***`subText(sup : (string | number | boolean)[])`*** : Creates a subscript element with the provided text or values.

  - ***`abbrText(abbr : (string | number | boolean)[], title : (string | number | boolean)[])`*** : Defines an abbreviation with a tooltip using the abbr content and the title attribute.

  - ***`p(...UIElement : []UIElement)`*** : Creates a paragraph containing the provided UIElement instances.

  - ***`blockquote(...UIElement : []ZikoUIQuote)`*** : Creates a block quotation element with the provided ZikoUIQuote instances.

  
  **Usage**
   ```js
   const t1 = text("Hello World")
   const t2 = text("Hello from Zikojs").style({
    color: "darkblue"
   })
   const para = p(
    t1,
    t2
   )
   ```
- **Headings Elements :**
  - ***`h1(text : string)`*** : Represents the top-level heading.
  - ***`h2(text : string)`*** : Represents a second-level heading.
  - ***`h3(text : string)`*** : Represents a third-level heading.
  - ***`h4(text : string)`*** : Represents a fourth-level heading.
  - ***`h5(text : string)`*** : Represents a fifth-level heading.
  - ***`h6(text : string)`*** : Represents a sixth-level heading.
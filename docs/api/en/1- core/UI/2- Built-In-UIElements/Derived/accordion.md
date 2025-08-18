- **Collapsible :**
***`Collapsible(summary : UIElement, content : UIElement,icon? : string)`*** : Represents an UI element that toggles the visibility of its content when the summary is clicked. The `summary` is the header or title that remains visible, while the content is the expandable area. Optionally, an icon can be displayed next to the summary to indicate the collapsible nature.
**Usage**
  ```js
  let summary = text("What is ZikoGL");
  let content = p(
    text(" ZikoGL is a ...")
  )
   Collapsible(
    summary,
    content
    )
  ```
- **Accordion :**
***`Accordion(...elements : ZikoUICollapsible[])`*** : Represents A container that organizes multiple Collapsible elements into a unified structure. It allows users to expand and collapse sections of content independently or in a coordinated manner. Typically, in an accordion, only one section remains open at a time, collapsing the others automatically when a new section is expanded.
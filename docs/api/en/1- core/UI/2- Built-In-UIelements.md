ZikoJS provides a comprehensive set of built-in UI elements, each designed to simplify the process of creating rich, interactive user interfaces. These elements are built on top of the UIElement class, ensuring consistency and ease of use. Below is an overview of the available elements, organized by category:

# Primitive Elements 
 <!-- ## Special Element Constructor
  - ***`html(tag : string | HTMLElement, ...Element : (UIElement | undefined)[])`*** :
 ## Text Elements

  - ***`text(...str : (string | number | boolean)[])`*** : Represents a standard text element.
    - `📦 .setValue(newTextContent : string, add : boolean)`


  - ***`p(UIElement : []UIElement)`*** : Represents a paragraph element
  
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
 ## Headings Elements : 
  - ***`h1(text : string)`*** : Represents the top-level heading.
  - ***`h2(text : string)`*** : Represents a second-level heading.
  - ***`h3(text : string)`*** : Represents a third-level heading.
  - ***`h4(text : string)`*** : Represents a fourth-level heading.
  - ***`h5(text : string)`*** : Represents a fifth-level heading.
  - ***`h6(text : string)`*** : Represents a sixth-level heading.

 ## List Elements :
  - ***`ol(....Element : UIElement[])`*** : Represents an ordered list.
  - ***`ul(...Element : UIElement[])`*** : Represents an unordered list.

 ## Media Elements :
  - ***`image(src : string, width : string | number, height : string | number)`*** : Represents an image element.

  - ***`video(src : string, width : string | number, height : string | number)`*** : Represents a video element 
    - `📦 .play()` :
    - `📦 .pause()` :
    - `📦 .stop()` :
    - `📦 .seekTo()` :
    - `📦 .useControls()` :
    - `📦 .usePIP()` :
  - ***`audio(src : string)`*** :Represents an audio element.
    - `📦 .play()` :
    - `📦 .pause()` :
    - `📦 .stop()` :
 ## Input Elements :
  - ***`btn(textContent? : string)`*** :
  - ***`input(defaultValue? : string | number | boolean, datalist : ZikoUIInputDatalist)`*** :
  - ***`search()`*** :
  - ***`slider()`*** :
  - ***`checkbox()`*** :
  - ***`radio()`*** :
  <!-- - ***`datalist()`*** : -->
  - ***`inputNumber()`*** :
  - ***`inputColor()`*** :
  - ***`inputDate()`*** :
  - ***`inputTime()`*** :
  - ***`inputEmail()`*** :
  - ***`inputPassword()`*** :
  - ***`inputImage()`*** :
  - ***`inputCamera()`*** :
  - ***`select()`*** :
  - ***`textarea()`*** :
 ## Table Elements : 
  - ***`Table(matrix, config)`*** :
  - ***`iTable(matrix, config)`*** :
 ## Semantic Elements :
  - ***`Main(...elements : ZikoUIElements[])`*** : Represents the main content area of the document.
  - ***`Header(...elements : ZikoUIElements[])`*** : Represents a header section.
  - ***`Section(...elements : ZikoUIElements[])`*** : Represents a section of content.
  - ***`Article(...elements : ZikoUIElements[])`*** : Represents an article element for independent content.
  - ***`Aside(...elements : ZikoUIElements[])`*** : Represents a sidebar or aside content.
  - ***`Nav(...elements : ZikoUIElements[])`*** : Represents a navigation element.
  - ***`Footer(...elements : ZikoUIElements[])`*** :
 ## Miscellaneous Elements :
  - ***`link(href : string, ...elements : ZikoUIElements[])`*** : Represents a footer section.Represents a hyperlink element.
  - ***`br()`*** : Represents a line break element.
  - ***`hr()`*** : Represents a horizontal rule element.
  - ***`brs(n : number)`*** : Represents multiple line break elements.
  - ***`hrs(n : number)`*** : Represents multiple horizontal rule elements. -->
# Custom Elements : 
  - ***`Collapsible(summary : UIElement, content : UIElement,icon? : string)`*** : Represents an accordion element for collapsible content.
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

  - ***`Tabs(Controllers : UIElement[],Contents : UIElement[])`*** : Represents a tabbed content element.
  **Usage**
  ```js
  let Controllers = [
    btn(1),
    btn(2),
    btn(3)
  ];
  let Contents = [
    p("Content 1 ..."),
    p("Content 2 ..."),
    p("Content 3 ...")
  ]
   Tabs(
    Controllers,
    Contents
    ).vertical()
  ```
  - ***`Carousel(...element : ZikoUIELement[])`*** : 
  - ***`Menu()`*** : 

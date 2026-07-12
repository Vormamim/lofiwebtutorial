/* LoFiWeb Tutorial — the complete course, as data.
   Converted from the four quick_start workbooks and the practical exam.
   Teacher-editable. Structure:

   window.COURSES = [ { id, title, sub, lessons: [ {
     id, title, goal,
     pages:  [ "markdown-lite chunk", ... ],   one small idea per page
     sample: { html, css, js } | null,         loadable example code
     task:   "markdown-lite",                  the Try-it brief (always their OWN content)
     checks: [ { html|css|js|differs, ... , label } ]   completion requirements
   } ] } ]

   Check types (evaluated by js/progress.js against the three editors):
     { html: "css selector", min: N }   HTML box contains N+ matching elements
     { css:  "regex", flags }           CSS box matches
     { js:   "regex", flags, min }      JS box matches (min = occurrences)
     { differs: true }                  code must differ meaningfully from the sample
*/
window.COURSES = [

  /* ======================================================== COURSE 1 ==== */
  {
    id: "c1", title: "Course 1 · First Steps",
    sub: "What HTML, CSS and JavaScript are, and your first pages",
    lessons: [

      {
        id: "c1l1", title: "How the web works",
        goal: "Understand what HTML, CSS and JavaScript each do.",
        pages: [
          "### A website is like a house\nEvery website you have ever visited is built from three languages, and each one has a single job.\n- **HTML** builds the structure - the walls and rooms.\n- **CSS** paints and decorates it.\n- **JavaScript** makes things move and respond - the light switches and doorbells.\nWithout HTML there is nothing to see. Without CSS everything works but looks plain. Without JavaScript the page cannot react to you.",
          "### The three languages\n**HTML** (HyperText Markup Language) describes *what things are*: a heading, a paragraph, an image, a button. Think of it as putting name labels on pieces of information.\n\n**CSS** (Cascading Style Sheets) controls *appearance*: colour, size, font, borders, backgrounds. CSS never creates content - it only changes how existing content looks.\n\n**JavaScript** adds *behaviour*. It lets the page count, remember things, react to clicks and display messages.",
          "### They work in order\n1. HTML creates the page.\n2. CSS makes it look the way you want.\n3. JavaScript makes it interactive.\nIn this IDE, each language has its own box on the left. The page they build together appears in the preview on the right.\n\n### Your first webpage\n```\n<h1>Hello World!</h1>\n<p>This is my first webpage.</p>\n```\nPress **Load example** below to put this code in the editor, then press **Run**."
        ],
        sample: {
          html: "<h1>Hello World!</h1>\n<p>This is my first webpage.</p>",
          css: "", js: ""
        },
        task: "Change the heading to say something about **you**, and rewrite the paragraph in your own words. Add a second paragraph about your favourite subject at school.\n\nType the changes yourself - the point is to get your fingers used to the tags.",
        checks: [
          { html: "h1", min: 1, label: "A main heading (h1)" },
          { html: "p", min: 2, label: "At least two paragraphs" },
          { differs: true, label: "Your own words, not the example's" }
        ]
      },

      {
        id: "c1l2", title: "HTML elements and tags",
        goal: "Learn how HTML is organised.",
        pages: [
          "### Everything uses tags\nHTML is made of **tags**. A tag is a name inside angle brackets.\n```\n<h1>Hello</h1>\n```\n- `<h1>` is the *opening tag* - it says \"a big heading starts here\".\n- `</h1>` is the *closing tag* - the slash means \"the heading ends here\".\n- Everything between them is the *content*.",
          "### Common elements\n```\n<h1>Main Heading</h1>\n<p>This is a paragraph.</p>\n<button>Click Me</button>\n<br>\n<hr>\n```\n`<br>` makes a line break and `<hr>` draws a horizontal line. Notice they have no closing tag - nothing goes *inside* them.",
          "### Nesting - boxes inside boxes\nElements can sit inside other elements.\n```\n<div>\n  <h1>Welcome</h1>\n  <p>Hello everyone.</p>\n</div>\n```\nThink of boxes inside bigger boxes. The `<div>` box holds a heading and a paragraph. Whatever opens *last* must close *first* - just like stacking real boxes."
        ],
        sample: {
          html: "<h1>My Favourite Movie</h1>\n<p>Star Wars</p>\n<hr>\n<p>I like science fiction.</p>\n<button>Watch Trailer</button>",
          css: "", js: ""
        },
        task: "Build a page about **your** favourite movie (not the example's). It needs a heading with the movie's name, a paragraph saying why you like it, a horizontal line, a second paragraph, and a button.",
        checks: [
          { html: "h1", min: 1, label: "A heading with the movie name" },
          { html: "p", min: 2, label: "Two paragraphs" },
          { html: "hr", min: 1, label: "A horizontal line" },
          { html: "button", min: 1, label: "A button" },
          { differs: true, label: "Your own movie, not the sample's" }
        ]
      },

      {
        id: "c1l3", title: "Lists",
        goal: "Display collections of information.",
        pages: [
          "### Bullet lists\nWhen you have several things of the same kind, use a list. An *unordered list* `<ul>` shows bullets. Each item goes inside `<li>` (list item).\n```\n<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Orange</li>\n</ul>\n```",
          "### Numbered lists\nAn *ordered list* `<ol>` numbers the items for you - perfect for steps or rankings.\n```\n<ol>\n  <li>Wake up</li>\n  <li>Eat breakfast</li>\n  <li>Go to school</li>\n</ol>\n```\nThe browser does the numbering. If you add an item in the middle, every number below it fixes itself - that is the point of `<ol>`."
        ],
        sample: {
          html: "<h2>Fruit</h2>\n<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Orange</li>\n</ul>",
          css: "", js: ""
        },
        task: "Make a page with a bullet list of **three of your favourite games** and a numbered list of **three foods you would eat in order of preference**. Give each list its own small heading.",
        checks: [
          { html: "ul li", min: 3, label: "A bullet list with three items" },
          { html: "ol li", min: 3, label: "A numbered list with three items" },
          { html: "h2, h3", min: 1, label: "A heading for a list" },
          { differs: true, label: "Your own lists, not the sample's" }
        ]
      },

      {
        id: "c1l4", title: "Links and images",
        goal: "Connect pages and display pictures.",
        pages: [
          "### Links\nA link takes the reader somewhere else. The `<a>` element (for *anchor*) needs an `href` - the address to go to.\n```\n<a href=\"https://google.com\">Visit Google</a>\n```\nThe text between the tags is what the reader clicks.",
          "### Images\nImages use a single tag with no closing tag. `src` says which picture to show.\n```\n<img src=\"https://picsum.photos/300\">\n```\nYou can control the size with `width`:\n```\n<img src=\"https://picsum.photos/300\" width=\"200\">\n```\nIn this IDE you can also press **Import placeholder** in the toolbar to drop in a practice image."
        ],
        sample: {
          html: "<h1>Two Pictures</h1>\n<img src=\"https://picsum.photos/300\" width=\"200\">\n<img src=\"https://picsum.photos/301\" width=\"200\">\n<p>Both images come from the internet.</p>",
          css: "", js: ""
        },
        task: "Make a page with a heading, **two images** (use Import placeholder or picsum addresses), a paragraph underneath them, and **one link** to a website you actually visit.",
        checks: [
          { html: "img", min: 2, label: "Two images" },
          { html: "a[href]", min: 1, label: "A link with an address" },
          { html: "h1, h2", min: 1, label: "A heading" },
          { html: "p", min: 1, label: "A paragraph" }
        ]
      },

      {
        id: "c1l5", title: "Introduction to CSS",
        goal: "Make webpages look better.",
        pages: [
          "### CSS is a list of rules\nA CSS rule picks an element and changes how it looks.\n```\nh1 {\n  color: red;\n}\n```\nRead it out loud: \"every h1: make its colour red.\" The part before the braces is the *selector* (who), and each line inside is a *property* (what to change).",
          "### Three properties to start with\n- `color` changes text colour.\n- `font-size` changes text size.\n- `background` changes the background.\n```\nbody {\n  background: lightblue;\n}\nh1 {\n  color: navy;\n}\np {\n  font-size: 20px;\n}\n```\n`body` means the whole page. CSS goes in the **CSS box** in this IDE - you never need `<style>` tags here."
        ],
        sample: {
          html: "<h1>A Styled Page</h1>\n<p>The CSS box changes how I look.</p>",
          css: "body {\n  background: lightblue;\n}\nh1 {\n  color: navy;\n}\np {\n  font-size: 20px;\n}",
          js: ""
        },
        task: "Style your own page: give the **page a background colour**, the **heading a different colour**, and make the **paragraph text larger**. Pick your own colours - not the sample's.",
        checks: [
          { css: "body\\s*\\{[^}]*background", label: "The page has a background colour" },
          { css: "h1\\s*\\{[^}]*color", label: "The heading has its own colour" },
          { css: "font-size", label: "A font size is set" },
          { differs: true, label: "Your own colours, not the sample's" }
        ]
      },

      {
        id: "c1l6", title: "Classes",
        goal: "Style only certain elements.",
        pages: [
          "### The problem\n`p { color: red; }` changes **every** paragraph. What if only one paragraph should stand out?\n\n### The answer: classes\nGive the special element a class name in HTML:\n```\n<p class=\"important\">Read this!</p>\n```\nThen style *only that class* in CSS. The dot means \"class called\":\n```\n.important {\n  color: red;\n  font-weight: bold;\n}\n```",
          "### One class, many uses\nA class is reusable. Put `class=\"important\"` on five different elements and all five get the style. That is how real websites keep hundreds of pages looking consistent: define the look once, use it everywhere."
        ],
        sample: {
          html: "<p class=\"important\">Warning: quiz on Friday.</p>\n<p>Normal school day today.</p>",
          css: ".important {\n  color: red;\n  font-weight: bold;\n}",
          js: ""
        },
        task: "Write two paragraphs of your own: one marked with a class that makes it stand out (your choice how), and one normal. The class name should describe the *meaning*, like `important` or `reminder`.",
        checks: [
          { html: "p[class]", min: 1, label: "A paragraph with a class" },
          { html: "p", min: 2, label: "Two paragraphs" },
          { css: "\\.[a-zA-Z][\\w-]*\\s*\\{", label: "A class rule in the CSS (starts with a dot)" },
          { differs: true, label: "Your own text, not the sample's" }
        ]
      },

      {
        id: "c1l7", title: "Layout with divs",
        goal: "Group parts of a webpage into boxes.",
        pages: [
          "### A div is a cardboard box\nA `<div>` is a container with no look of its own. Everything inside it belongs together.\n```\n<div>\n  <h1>News</h1>\n  <p>Today's story...</p>\n</div>\n```\nOn its own it changes nothing - the power comes when you style it.",
          "### Styling the box\n```\ndiv {\n  background: white;\n  padding: 20px;\n  border: 2px solid black;\n}\n```\n- `border` draws the edge of the box.\n- `padding` pushes the content away from the edge, like bubble wrap inside a parcel.\nSuddenly your content looks like a card."
        ],
        sample: {
          html: "<div>\n  <h2>News</h2>\n  <p>Today's story is about a very good dog.</p>\n</div>",
          css: "div {\n  background: white;\n  color: black;\n  padding: 20px;\n  border: 2px solid black;\n}",
          js: ""
        },
        task: "Create **two boxes**: one for Sport and one for Weather. Each box needs a heading and a paragraph of your own writing, and the boxes must have a border and padding.",
        checks: [
          { html: "div", min: 2, label: "Two div boxes" },
          { html: "div h2, div h3", min: 2, label: "A heading inside each box" },
          { css: "border", label: "The boxes have a border" },
          { css: "padding", label: "The boxes have padding" },
          { differs: true, label: "Your own stories, not the sample's" }
        ]
      },

      {
        id: "c1l8", title: "JavaScript basics",
        goal: "Run your first JavaScript.",
        pages: [
          "### The third box\nJavaScript goes in the **JS box** of this IDE. The first command to learn shows a pop-up message:\n```\nalert(\"Hello!\");\n```\nRun it - the preview pops up a message box. Every JavaScript instruction ends with a semicolon, like a full stop.",
          "### Variables remember things\nA variable is a labelled box in the computer's memory.\n```\nlet name = \"Alex\";\n```\n`let` creates the variable, `name` is its label, and `\"Alex\"` is what is stored inside. Now you can use it:\n```\nalert(name);\n```\nThe pop-up shows *Alex* - the computer looked inside the box for you. Text needs quotes; numbers do not: `let age = 15;`"
        ],
        sample: {
          html: "<h1>JavaScript lives in the JS box</h1>",
          css: "",
          js: "let age = 15;\nalert(age);"
        },
        task: "Create **two variables of your own** - one holding text (like a name) and one holding a number - and show each one with its own `alert`.",
        checks: [
          { js: "let\\s+\\w+\\s*=", min: 2, label: "Two variables made with let" },
          { js: "alert\\s*\\(", min: 2, label: "Two alert messages" },
          { differs: true, label: "Your own values, not the sample's" }
        ]
      },

      {
        id: "c1l9", title: "Buttons that do something",
        goal: "Make buttons run your code.",
        pages: [
          "### Waiting for a click\nSo far your JavaScript runs the moment the page loads. Usually we want code to wait until the user does something. Buttons can name a function to run when clicked:\n```\n<button onclick=\"hello()\">Click Me</button>\n```\n`onclick` means \"when clicked, run this\".",
          "### Functions are named instructions\nA function is a set of instructions with a name. It does nothing until something *calls* it.\n```\nfunction hello() {\n  alert(\"Welcome!\");\n}\n```\nNow the button and the function connect: click the button, the browser calls `hello()`, the alert appears. One function can be used by many buttons - that is why we bother naming code."
        ],
        sample: {
          html: "<button onclick=\"hello()\">Click Me</button>",
          css: "",
          js: "function hello() {\n  alert(\"Welcome!\");\n}"
        },
        task: "Create **three buttons**. Each button runs a **different function**, and each function shows a different message written by you.",
        checks: [
          { html: "button[onclick]", min: 3, label: "Three buttons with onclick" },
          { js: "function\\s+\\w+\\s*\\(", min: 3, label: "Three functions" },
          { js: "alert\\s*\\(", min: 3, label: "Three different messages" },
          { differs: true, label: "Your own messages, not the sample's" }
        ]
      },

      {
        id: "c1l10", title: "Changing the webpage",
        goal: "Use JavaScript to change HTML that is already on screen.",
        pages: [
          "### Giving an element a name tag\nTo change something, JavaScript first has to *find* it. Give the element an `id` - a unique name tag:\n```\n<h1 id=\"title\">Hello</h1>\n```\nAn id must appear **once** per page. Classes are for many; ids are for one.",
          "### Find it, then change it\n```\ndocument.getElementById(\"title\")\n```\nreads as: \"document, get me the element whose id is title.\" Once found, change its text with `innerHTML`:\n```\ndocument.getElementById(\"title\").innerHTML = \"Goodbye\";\n```\nThe heading changes instantly - no reload. This is how every live website updates scores, messages and feeds.",
          "### Put it behind a button\n```\n<h1 id=\"title\">Hello</h1>\n<button onclick=\"changeText()\">Click</button>\n```\n```\nfunction changeText() {\n  document.getElementById(\"title\").innerHTML = \"You clicked the button!\";\n}\n```\nClick the button and watch the heading rewrite itself."
        ],
        sample: {
          html: "<h1 id=\"title\">Hello</h1>\n<button onclick=\"changeText()\">Click</button>",
          css: "",
          js: "function changeText() {\n  document.getElementById(\"title\").innerHTML = \"You clicked the button!\";\n}"
        },
        task: "Build a page with a heading (with an id), two paragraphs, a coloured box and **two buttons**. When one button is clicked, change the heading; when the other is clicked, change one paragraph AND show an alert. All text your own.",
        checks: [
          { html: "h1[id], h2[id]", min: 1, label: "A heading with an id" },
          { html: "button[onclick]", min: 2, label: "Two buttons that call functions" },
          { js: "getElementById\\s*\\(", min: 2, label: "JavaScript finds elements by id" },
          { js: "innerHTML", min: 2, label: "JavaScript changes text on the page" },
          { js: "alert\\s*\\(", min: 1, label: "One button also shows an alert" },
          { differs: true, label: "Your own page, not the sample's" }
        ]
      }
    ]
  },

  /* ======================================================== COURSE 2 ==== */
  {
    id: "c2", title: "Course 2 · Better Websites",
    sub: "Structure, selectors, variables, decisions and loops",
    lessons: [

      {
        id: "c2l1", title: "Thinking like a web developer",
        goal: "Plan before you code.",
        pages: [
          "### Every website solves a problem\nBefore professionals write a single line of code, they ask three questions:\n1. What information does the user need?\n2. What actions can they perform?\n3. What should happen after each action?\nA weather site, for example, lets you read a forecast, search a city and refresh - each feature becomes one small coding problem.",
          "### Break big problems into small ones\nNobody builds a whole website at once. The order is always: build the heading, add the content, style it, add buttons, make the buttons work, then improve it. One small problem at a time.\n\nYour task for this lesson is a *planning* task - you will put your plan on the page itself."
        ],
        sample: null,
        task: "Plan a webpage about your favourite sport. On the page, write a heading with the sport's name, then a bullet list answering three questions: **what should appear**, **what can users click**, and **what should happen when they click it**. One list item per answer.",
        checks: [
          { html: "h1, h2", min: 1, label: "A heading naming your sport" },
          { html: "ul li, ol li", min: 3, label: "Your three planning answers as a list" }
        ]
      },

      {
        id: "c2l2", title: "Semantic HTML",
        goal: "Use HTML that describes meaning.",
        pages: [
          "### Tags that say what they are\nInstead of putting everything in `<div>` boxes, HTML has elements whose *names describe their job*:\n- `<header>` - the top of the page\n- `<nav>` - the navigation links\n- `<main>` - the main content\n- `<section>` - one group of related information\n- `<footer>` - the bottom of the page",
          "### Example\n```\n<header>\n  <h1>Wildlife Australia</h1>\n</header>\n<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Animals</a>\n</nav>\n<main>\n  <section>\n    <h2>Kangaroos</h2>\n    <p>Kangaroos are marsupials.</p>\n  </section>\n</main>\n<footer>\n  <p>Wildlife Australia 2026</p>\n</footer>\n```",
          "### Why bother?\nThe page *looks* the same - so why do it? Because meaning helps everyone who is not looking at the screen: search engines rank the page better, screen readers can jump straight to the main content for blind users, and other programmers (including future you) understand the code instantly."
        ],
        sample: {
          html: "<header>\n  <h1>Wildlife Australia</h1>\n</header>\n<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Animals</a>\n</nav>\n<main>\n  <section>\n    <h2>Kangaroos</h2>\n    <p>Kangaroos are marsupials.</p>\n  </section>\n</main>\n<footer>\n  <p>Wildlife Australia 2026</p>\n</footer>",
          css: "", js: ""
        },
        task: "Rebuild one of your earlier pages (your movie page or sport page) using semantic HTML: it needs a header, a nav with two links, a main with at least one section, and a footer.",
        checks: [
          { html: "header", min: 1, label: "A header" },
          { html: "nav a", min: 2, label: "A nav with two links" },
          { html: "main section", min: 1, label: "A section inside main" },
          { html: "footer", min: 1, label: "A footer" },
          { differs: true, label: "Your own topic, not Wildlife Australia" }
        ]
      },

      {
        id: "c2l3", title: "CSS selectors",
        goal: "Target exactly the elements you mean.",
        pages: [
          "### Four ways to pick an element\n**By tag** - every one of them:\n```\np { color: blue; }\n```\n**By id** - the one element with that name tag (# means id):\n```\n#title { color: red; }\n```\n**By class** - everything wearing that class (. means class):\n```\n.card { background: white; }\n```",
          "### Inside something else\nA *descendant selector* picks elements only when they are inside another:\n```\nnav a { color: white; }\n```\n\"Links, but only inside the nav.\" Links elsewhere stay normal.\n\n### When the mouse hovers\n```\nbutton:hover { background: green; }\n```\nThe style applies only while the mouse is over the button - instant feedback for the user."
        ],
        sample: {
          html: "<h1 id=\"title\">Selector Practice</h1>\n<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">About</a>\n</nav>\n<p class=\"card\">I am a card.</p>\n<button>Hover over me</button>",
          css: "#title { color: darkred; }\nnav a { color: green; }\n.card { background: lightyellow; padding: 10px; }\nbutton:hover { background: gold; }",
          js: ""
        },
        task: "Make a page of your own that uses **one id selector**, **two different class selectors**, and **one hover effect**. Choose your own names and styles.",
        checks: [
          { css: "#[a-zA-Z][\\w-]*\\s*\\{", label: "An id selector (#name)" },
          { css: "\\.[a-zA-Z][\\w-]*\\s*\\{[\\s\\S]*\\.[a-zA-Z][\\w-]*\\s*\\{", label: "Two class selectors (.name)" },
          { css: ":hover", label: "A hover effect" },
          { differs: true, label: "Your own styles, not the sample's" }
        ]
      },

      {
        id: "c2l4", title: "The box model",
        goal: "Understand the invisible rectangles around everything.",
        pages: [
          "### Everything is a rectangle\nEvery HTML element is a rectangle with four layers. From the inside out:\n1. **Content** - the text or image itself.\n2. **Padding** - breathing room inside the edge.\n3. **Border** - the visible edge.\n4. **Margin** - space pushing other elements away outside.\n\nImagine a framed picture: the photo is content, the matting inside the frame is padding, the frame is the border, and the gap between frames on the wall is margin.",
          "### Try each layer\n```\n.card {\n  padding: 20px;\n  margin: 20px;\n  border: 3px solid black;\n}\n```\nChange one number at a time and press Run. Which gap grows when you increase `padding`? Which one when you increase `margin`? Predicting first, then testing, is the fastest way to learn CSS."
        ],
        sample: {
          html: "<div class=\"card\">\n  <h2>Boxes all the way down</h2>\n  <p>Padding inside, margin outside.</p>\n</div>\n<div class=\"card\">\n  <p>A second card so you can see the margin between us.</p>\n</div>",
          css: ".card {\n  padding: 20px;\n  margin: 20px;\n  border: 3px solid black;\n  background: white;\n  color: black;\n}",
          js: ""
        },
        task: "Create two cards of your own content. Style them with padding, margin and a border - then make YOUR cards different: change the border style, the amounts, and add a background colour of your choosing.",
        checks: [
          { html: "div", min: 2, label: "Two card boxes" },
          { css: "padding", label: "Padding is set" },
          { css: "margin", label: "Margin is set" },
          { css: "border", label: "A border is set" },
          { differs: true, label: "Your own cards, not the sample's" }
        ]
      },

      {
        id: "c2l5", title: "Variables and data",
        goal: "Store different kinds of information.",
        pages: [
          "### Three kinds of data\n```\nlet age = 16;\nlet name = \"Sarah\";\nlet loggedIn = true;\n```\n- Numbers have no quotes.\n- Text (called a *string*) needs quotes.\n- `true`/`false` (called a *boolean*) answers yes-or-no questions.",
          "### Variables can change\nThat is the whole point of the name:\n```\nlet score = 10;\nscore = 20;\n```\nImagine a game that shows your score. The page does not store \"10\" anywhere permanent - it stores *the variable*, and when the variable changes the game updates. A shortcut for adding one:\n```\nscore++;\n```"
        ],
        sample: {
          html: "<h1>Variable practice</h1>",
          css: "",
          js: "let name = \"Sarah\";\nlet age = 16;\nlet colour = \"green\";\nalert(name);\nalert(age);\nalert(colour);"
        },
        task: "Create four variables about **yourself**: name, age, favourite colour and favourite animal. Show each one with an alert. Use your real details (or invented ones - just not the sample's).",
        checks: [
          { js: "let\\s+\\w+\\s*=", min: 4, label: "Four variables" },
          { js: "alert\\s*\\(", min: 4, label: "Four alerts showing them" },
          { differs: true, label: "Your own details, not the sample's" }
        ]
      },

      {
        id: "c2l6", title: "Decisions",
        goal: "Let programs choose between paths.",
        pages: [
          "### Programs ask questions\nIs the score above 100? Is the password correct? Did the player win? Every question has a yes-or-no answer, and the program takes a different path for each.\n\n### The if statement\n```\nlet age = 18;\nif (age >= 18) {\n  alert(\"Adult\");\n}\n```\nRead it as a sentence: \"if age is at least 18, show Adult.\" The code in the braces runs **only** when the question's answer is yes.",
          "### if ... else\nWhat about the other path?\n```\nif (age >= 18) {\n  alert(\"Adult\");\n} else {\n  alert(\"Child\");\n}\n```\n`else` means \"otherwise\". Exactly one of the two blocks will run - never both, never neither.\n\nShops check *has the customer logged in*; games check *has the player won*; your school portal checks *is the answer correct*. It is all `if` and `else`."
        ],
        sample: {
          html: "<h1>Decision practice</h1>",
          css: "",
          js: "let temperature = 28;\nif (temperature > 25) {\n  alert(\"Go swimming!\");\n} else {\n  alert(\"Take a jacket.\");\n}"
        },
        task: "Write your own decision: store a number in a variable (a test score, a temperature, anything), then use `if` and `else` to show **two different messages of your own** depending on its value.",
        checks: [
          { js: "if\\s*\\(", label: "An if statement" },
          { js: "else", label: "An else path" },
          { js: "alert\\s*\\(", min: 2, label: "A different message on each path" },
          { differs: true, label: "Your own decision, not the sample's" }
        ]
      },

      {
        id: "c2l7", title: "Getting information from users",
        goal: "Ask questions and use the answers.",
        pages: [
          "### prompt() asks, the variable remembers\n```\nlet name = prompt(\"What is your name?\");\n```\nA box pops up, the user types an answer, and the answer lands in the variable. From then on it is just a normal variable.",
          "### Joining text together\nThe `+` sign glues text together:\n```\nalert(\"Hello \" + name);\n```\nIf the user typed *Mia*, the alert says *Hello Mia*. Notice the space inside the quotes - the computer only writes exactly what you tell it to."
        ],
        sample: {
          html: "<h1>Ask me anything</h1>",
          css: "",
          js: "let name = prompt(\"What is your name?\");\nalert(\"Hello \" + name);"
        },
        task: "Ask the user **three questions of your own** (for example their favourite food and sport), then show one personalised message that joins at least two answers together with text you wrote.",
        checks: [
          { js: "prompt\\s*\\(", min: 3, label: "Three questions with prompt" },
          { js: "\\+", label: "Answers joined together with +" },
          { js: "alert\\s*\\(", min: 1, label: "A personalised message" },
          { differs: true, label: "Your own questions, not the sample's" }
        ]
      },

      {
        id: "c2l8", title: "Changing HTML with JavaScript",
        goal: "Update the page while it is running.",
        pages: [
          "### Text, colour, background\nYou already know `innerHTML` changes text:\n```\ndocument.getElementById(\"message\").innerHTML = \"Welcome!\";\n```\nJavaScript can also change styles - anything CSS can do:\n```\ndocument.getElementById(\"message\").style.color = \"red\";\ndocument.body.style.background = \"lightgreen\";\n```\n`document.body` is the whole page - no id needed.",
          "### The pattern to memorise\nFind the element, then change one thing about it:\n1. `document.getElementById(\"...\")` - find\n2. `.innerHTML = ...` or `.style.something = ...` - change\nEvery interactive page you have ever used - live sport scores, chat apps, games - is doing this pattern thousands of times."
        ],
        sample: {
          html: "<h1 id=\"title\">Waiting...</h1>\n<p id=\"message\">Nothing has happened yet.</p>\n<button onclick=\"update()\">Make it happen</button>",
          css: "",
          js: "function update() {\n  document.getElementById(\"title\").innerHTML = \"Something happened!\";\n  document.getElementById(\"message\").style.color = \"red\";\n  document.body.style.background = \"lightgreen\";\n}"
        },
        task: "Make your own button that changes **three things at once**: a heading's text, a paragraph's colour, and the page's background colour. Your own words and colours.",
        checks: [
          { html: "button[onclick]", min: 1, label: "A button that runs a function" },
          { js: "innerHTML", label: "Changes text" },
          { js: "style\\.color", label: "Changes a text colour" },
          { js: "style\\.background", label: "Changes the background" },
          { differs: true, label: "Your own page, not the sample's" }
        ]
      },

      {
        id: "c2l9", title: "Repetition with loops",
        goal: "Make the computer repeat work for you.",
        pages: [
          "### Never write the same line five times\nSuppose you want to show the numbers 1 to 5. You *could* write five lines... or tell the computer to count:\n```\nfor (let i = 1; i <= 5; i++) {\n  console.log(i);\n}\n```\nRead the three parts in the brackets as: **start** at 1, **keep going** while i is at most 5, **add one** each time round.",
          "### Watching it work\n`console.log` writes to the Console panel under the preview - perfect for testing loops. To write onto the page itself:\n```\nfor (let i = 1; i <= 10; i++) {\n  document.getElementById(\"out\").innerHTML += i + \" \";\n}\n```\n`+=` means \"add to what is already there\". Games, drawing, searching, AI - almost every big program is loops all the way down."
        ],
        sample: {
          html: "<h1>Counting</h1>\n<p id=\"out\"></p>",
          css: "",
          js: "for (let i = 1; i <= 10; i++) {\n  document.getElementById(\"out\").innerHTML += i + \" \";\n}"
        },
        task: "Use one loop to show the numbers **1 to 20** on the page. Then change it (or add a second loop) to show **even numbers only**. Hint: start at 2 and add 2 each time with `i = i + 2`.",
        checks: [
          { js: "for\\s*\\(", min: 1, label: "A for loop" },
          { js: "20", label: "Counts up to 20" },
          { js: "innerHTML|console\\.log", label: "Shows the numbers" },
          { differs: true, label: "Not just the sample's 1 to 10" }
        ]
      },

      {
        id: "c2l10", title: "Mini application",
        goal: "Combine everything from Course 2.",
        pages: [
          "### Build a Favourite Animal page\nThis lesson has no new theory - it is a build. You will combine semantic HTML, classes, the box model, a hover effect, user input and page changes into one small application.\n\nWork through the checklist in order: structure first, then style, then behaviour. That is the professional order - you cannot style what does not exist, and you cannot script what you cannot see.",
          "### The plan\n1. HTML: a header, a nav, one image, a paragraph and a button.\n2. CSS: a background colour, a styled card with rounded corners (`border-radius`), and a button hover.\n3. JavaScript: ask the user's name with `prompt`, welcome them by name in the heading, and let the button change the paragraph."
        ],
        sample: null,
        task: "Build the Favourite Animal page: header + nav + image + paragraph + button in HTML; a card with `border-radius`, a page background and a `:hover` in CSS; and JavaScript that prompts for the user's name, puts a welcome into the heading with `innerHTML`, and changes the paragraph when the button is clicked.",
        checks: [
          { html: "header", min: 1, label: "A header" },
          { html: "nav", min: 1, label: "A nav" },
          { html: "img", min: 1, label: "An image" },
          { html: "button[onclick]", min: 1, label: "A working button" },
          { css: "border-radius", label: "Rounded corners" },
          { css: ":hover", label: "A hover effect" },
          { js: "prompt\\s*\\(", label: "Asks the user's name" },
          { js: "innerHTML", min: 2, label: "Changes the page in two places" }
        ]
      }
    ]
  },

  /* ======================================================== COURSE 3 ==== */
  {
    id: "c3", title: "Course 3 · Web Applications",
    sub: "Functions, events, numbers, arrays and small apps",
    lessons: [

      {
        id: "c3l1", title: "Programming is solving problems",
        goal: "Think in algorithms before writing code.",
        pages: [
          "### An algorithm is a recipe\nAn algorithm is just a list of instructions in order. Making toast: get bread, put it in the toaster, wait, remove, spread butter. A computer follows instructions in exactly the same way - except it cannot guess. If an instruction is missing, the program simply does the wrong thing.",
          "### The four questions\nBefore writing any code, professionals ask:\n1. What information do I need?\n2. What should happen?\n3. What decisions are required?\n4. What should the user see?\nAnswering these on paper first makes the coding ten times easier. Your task practises exactly this."
        ],
        sample: null,
        task: "Design a digital stopwatch **without coding it**. On the page, write a heading, then a numbered list giving the algorithm (at least five steps: what happens from pressing start to reading the time), then a short paragraph answering: what information does the stopwatch need to remember?",
        checks: [
          { html: "h1, h2", min: 1, label: "A heading" },
          { html: "ol li", min: 5, label: "An algorithm with at least five steps" },
          { html: "p", min: 1, label: "A paragraph about what it must remember" }
        ]
      },

      {
        id: "c3l2", title: "Reusing code with functions",
        goal: "Write functions that accept information.",
        pages: [
          "### Functions save repeating yourself\nImagine three buttons that each need fifty lines of nearly identical code. Without functions you write 150 lines; with one function you write 50 and *call* it three times. Shorter, and when there is a bug you fix it once.",
          "### Passing information in\nA function can take *parameters* - information it needs to do its job:\n```\nfunction greet(name) {\n  alert(\"Hello \" + name);\n}\ngreet(\"Sarah\");\ngreet(\"Alex\");\n```\nThe same function greets different people. `name` is a placeholder that takes whatever value the call hands over. This is the single most useful idea in programming."
        ],
        sample: {
          html: "<h1>Function practice</h1>",
          css: "",
          js: "function greet(name) {\n  alert(\"Hello \" + name);\n}\ngreet(\"Sarah\");\ngreet(\"Alex\");"
        },
        task: "Write a function `showAnimal(animal)` that shows \"My favourite animal is ...\" with the animal filled in. Call it **three times** with three different animals of your choosing.",
        checks: [
          { js: "function\\s+showAnimal\\s*\\(\\s*\\w+\\s*\\)", label: "A showAnimal function with a parameter" },
          { js: "showAnimal\\s*\\(\\s*[\"']", min: 3, label: "Called three times with different animals" },
          { js: "\\+", label: "The animal is joined into the message" }
        ]
      },

      {
        id: "c3l3", title: "Events",
        goal: "React to what the user does.",
        pages: [
          "### An event is something that happens\nA button is clicked. The mouse moves. A key is pressed. A page finishes loading. JavaScript can *wait* for any of these and run code when they occur.\n\nWithout events, a page would load once and never change. Every modern website - games, shops, chats - is a machine that waits for events and reacts.",
          "### The click event, properly used\n```\n<button onclick=\"sayHello()\">Click Me</button>\n```\n```\nfunction sayHello() {\n  alert(\"Hello!\");\n}\n```\nThe browser holds `sayHello` ready and runs it *only* when the click happens. Different buttons can call different functions - or the same function. You choose the wiring."
        ],
        sample: {
          html: "<p id=\"p1\">First paragraph.</p>\n<p id=\"p2\">Second paragraph.</p>\n<button onclick=\"changeFirst()\">Change first</button>\n<button onclick=\"changeSecond()\">Change second</button>",
          css: "",
          js: "function changeFirst() {\n  document.getElementById(\"p1\").innerHTML = \"The first one changed!\";\n}\nfunction changeSecond() {\n  document.getElementById(\"p2\").innerHTML = \"Now the second one too!\";\n}"
        },
        task: "Create **three paragraphs** (each with an id) and **three buttons**. Each button changes a different paragraph to a message you wrote.",
        checks: [
          { html: "p[id]", min: 3, label: "Three paragraphs with ids" },
          { html: "button[onclick]", min: 3, label: "Three buttons" },
          { js: "function\\s+\\w+\\s*\\(", min: 3, label: "Three functions" },
          { js: "innerHTML", min: 3, label: "Each changes a paragraph" },
          { differs: true, label: "Your own messages, not the sample's" }
        ]
      },

      {
        id: "c3l4", title: "Working with numbers",
        goal: "Calculate, and keep a running score.",
        pages: [
          "### JavaScript is a calculator\n```\nlet total = 10 + 5;\nalert(total);\n```\nThe operators are `+` add, `-` subtract, `*` multiply, `/` divide, and `%` remainder (what is left over after dividing - 7 % 2 is 1).",
          "### Updating a variable with itself\nThe most common line in any game:\n```\nscore = score + 1;\n```\nRead the right side first: take the current score, add one, then store the result back. The shortcut is `score++`. Banks, games, shopping carts and weather apps are all just variables being updated like this."
        ],
        sample: {
          html: "<h1>Score: <span id=\"score\">0</span></h1>\n<button onclick=\"addOne()\">Add 1</button>",
          css: "",
          js: "let score = 0;\nfunction addOne() {\n  score = score + 1;\n  document.getElementById(\"score\").innerHTML = score;\n}"
        },
        task: "Build a score counter with **three buttons**: add 1, subtract 1, and reset to 0. The score shows on the page (not in alerts) and must update every click.",
        checks: [
          { html: "button[onclick]", min: 3, label: "Three buttons: add, subtract, reset" },
          { js: "let\\s+\\w+\\s*=\\s*0", label: "A score variable starting at 0" },
          { js: "-", label: "Subtraction happens somewhere" },
          { js: "innerHTML", label: "The score shows on the page" },
          { differs: true, label: "More than the sample's single button" }
        ]
      },

      {
        id: "c3l5", title: "Numbers from the user",
        goal: "Convert answers into numbers you can calculate with.",
        pages: [
          "### prompt always gives text\nEven when the user types 15, JavaScript stores it as the *text* \"15\". Text plus text glues: \"15\" + \"5\" makes \"155\", not 20. This is one of the most common beginner bugs on the entire internet.",
          "### Number() converts\n```\nlet age = Number(prompt(\"Age?\"));\n```\nNow it really is a number and maths works:\n```\nlet a = Number(prompt(\"First number\"));\nlet b = Number(prompt(\"Second number\"));\nalert(a + b);\n```"
        ],
        sample: {
          html: "<h1>Adding machine</h1>",
          css: "",
          js: "let a = Number(prompt(\"First number\"));\nlet b = Number(prompt(\"Second number\"));\nalert(a + b);"
        },
        task: "Build a mini calculator: ask for two numbers, then show **three alerts**: their sum, their difference, and their product (multiplication).",
        checks: [
          { js: "Number\\s*\\(", min: 2, label: "Both answers converted with Number()" },
          { js: "prompt\\s*\\(", min: 2, label: "Two questions" },
          { js: "\\*", label: "A multiplication" },
          { js: "alert\\s*\\(", min: 3, label: "Three results shown" }
        ]
      },

      {
        id: "c3l6", title: "Bigger decisions",
        goal: "Combine conditions with AND, OR and NOT.",
        pages: [
          "### Combining questions\nReal decisions often need two questions at once.\n- `&&` means **AND** - both must be true: `if (age >= 18 && citizen == true)`\n- `||` means **OR** - either one is enough: `if (day == \"Saturday\" || day == \"Sunday\")`\n- `!` means **NOT** - flips the answer: `if (!loggedIn)`",
          "### Notice == versus =\nOne equals sign *stores* (`day = \"Saturday\"`). Two equals signs *compare* (`day == \"Saturday\"`). Mixing them up is the classic bug - the computer will not warn you, it will just cheerfully do the wrong thing."
        ],
        sample: {
          html: "<h1>Weekend checker</h1>",
          css: "",
          js: "let day = prompt(\"What day is it?\");\nif (day == \"Saturday\" || day == \"Sunday\") {\n  alert(\"It is the weekend!\");\n} else {\n  alert(\"School day.\");\n}"
        },
        task: "Ask the user their age. If they are 18 or older show \"You may vote.\" otherwise show \"You are not old enough.\" Then add a second decision of your own that uses `&&` or `||`.",
        checks: [
          { js: "Number\\s*\\(|prompt\\s*\\(", label: "Asks the user" },
          { js: "if\\s*\\(", min: 2, label: "Two decisions" },
          { js: "&&|\\|\\|", label: "Uses AND or OR" },
          { js: "else", label: "Has an otherwise path" },
          { differs: true, label: "Your own second decision, not the sample's" }
        ]
      },

      {
        id: "c3l7", title: "Loops that do real work",
        goal: "Use loops for calculation, not just counting.",
        pages: [
          "### From counting to calculating\nThis loop adds up 1 to 10 without you typing a single sum:\n```\nlet total = 0;\nfor (let i = 1; i <= 10; i++) {\n  total = total + i;\n}\nalert(total);\n```\nThe variable `total` starts empty and collects a bit more every time round. This *accumulator* pattern is everywhere: adding scores, totalling prices, averaging temperatures.",
          "### Controlling the step\nThe third part of the loop is yours to change. `i = i + 5` counts 5, 10, 15... Try predicting what `for (let i = 5; i <= 25; i = i + 5)` prints before you run it."
        ],
        sample: {
          html: "<h1>Loop calculator</h1>\n<p id=\"out\"></p>",
          css: "",
          js: "let total = 0;\nfor (let i = 1; i <= 10; i++) {\n  total = total + i;\n}\ndocument.getElementById(\"out\").innerHTML = \"1 to 10 adds up to \" + total;"
        },
        task: "Use one loop to show **5, 10, 15, 20, 25** on the page. Then use a second loop to add up the numbers 1 to 100 and show the total.",
        checks: [
          { js: "for\\s*\\(", min: 2, label: "Two loops" },
          { js: "\\+\\s*5|i\\s*\\+=\\s*5", label: "One loop steps by 5" },
          { js: "100", label: "One loop reaches 100" },
          { js: "innerHTML", label: "Results appear on the page" }
        ]
      },

      {
        id: "c3l8", title: "Arrays",
        goal: "Store many values in one variable.",
        pages: [
          "### One box with many compartments\nInstead of:\n```\nlet animal1 = \"Dog\";\nlet animal2 = \"Cat\";\nlet animal3 = \"Horse\";\n```\nuse an **array**:\n```\nlet animals = [\"Dog\", \"Cat\", \"Horse\"];\n```\nOne variable, many values, in order.",
          "### Positions start at zero\nEach compartment has a number called its *index* - and the first one is 0, not 1.\n```\nalert(animals[0]);   shows Dog\nalert(animals[2]);   shows Horse\n```\nYou can also swap a value:\n```\nanimals[1] = \"Rabbit\";\n```\nPlaylists, shopping carts, class rolls, photo galleries - all arrays."
        ],
        sample: {
          html: "<h1>Array practice</h1>",
          css: "",
          js: "let animals = [\"Dog\", \"Cat\", \"Horse\"];\nalert(animals[0]);\nanimals[1] = \"Rabbit\";\nalert(animals[1]);"
        },
        task: "Make an array of **five favourite movies**. Show the first and the last one with alerts, then replace one movie with a different one and show the replacement.",
        checks: [
          { js: "\\[\\s*[\"'][^\\]]+,[^\\]]+,[^\\]]+,[^\\]]+,", label: "An array with five values" },
          { js: "\\w+\\[\\d+\\]\\s*=", label: "One value replaced" },
          { js: "alert\\s*\\(\\s*\\w+\\[", min: 2, label: "Values shown by index" },
          { differs: true, label: "Your own movies, not the sample's animals" }
        ]
      },

      {
        id: "c3l9", title: "Arrays and loops together",
        goal: "Process a whole collection with three lines.",
        pages: [
          "### The most useful pattern in programming\nShowing every item one line at a time does not scale - what if the array had a thousand entries? Let the loop walk the array:\n```\nfor (let i = 0; i < animals.length; i++) {\n  alert(animals[i]);\n}\n```\n`animals.length` is how many items there are, so the loop automatically fits the array - add items and the loop just works.\n\nNotice the loop starts at 0 and uses `<` (not `<=`) because positions start at zero.",
          "### Onto the page instead\n```\nfor (let i = 0; i < colours.length; i++) {\n  document.getElementById(\"out\").innerHTML += colours[i] + \"<br>\";\n}\n```\nProfessionals write this exact pattern every single day."
        ],
        sample: {
          html: "<h1>Every animal</h1>\n<p id=\"out\"></p>",
          css: "",
          js: "let animals = [\"Dog\", \"Cat\", \"Horse\"];\nfor (let i = 0; i < animals.length; i++) {\n  document.getElementById(\"out\").innerHTML += animals[i] + \"<br>\";\n}"
        },
        task: "Create an array of **ten colours** and use one loop with `.length` to display every colour on the page.",
        checks: [
          { js: "\\.length", label: "The loop uses .length" },
          { js: "for\\s*\\(", label: "A for loop" },
          { js: "\\w+\\[i\\]", label: "Items read by index inside the loop" },
          { js: "(,[^\\]]*){9}", label: "The array has ten values" },
          { differs: true, label: "Your own colours, not the sample's animals" }
        ]
      },

      {
        id: "c3l10", title: "Mini application: quiz",
        goal: "Build a complete small web application.",
        pages: [
          "### The Animal Quiz\nNo new theory - a build that uses everything in Course 3: an array of data, functions, events, decisions and page updates.\n\nBuild it in this order:\n1. The HTML skeleton: heading, a question paragraph, an answer button or two, a score display.\n2. The data: an array of animals.\n3. The behaviour: ask the user's name, show an animal, count answers, update the score on the page.",
          "### Keep it small\nA quiz that asks \"is this animal a mammal?\" with Yes/No buttons is completely enough. The skill being practised is *wiring the parts together*, not quiz design. If you finish early, add a Restart button that puts the score back to zero."
        ],
        sample: null,
        task: "Build the Animal Quiz: an array of at least five animals; the user's name asked with `prompt`; a question shown on the page; at least two answer buttons that call functions; an `if` that checks the answer; and a score that updates on the page with `innerHTML`.",
        checks: [
          { js: "\\[\\s*[\"'][^\\]]+,[^\\]]+,[^\\]]+,[^\\]]+,", label: "An array of five or more animals" },
          { js: "prompt\\s*\\(", label: "Asks the user's name" },
          { html: "button[onclick]", min: 2, label: "Two answer buttons" },
          { js: "if\\s*\\(", label: "Checks the answer" },
          { js: "innerHTML", min: 2, label: "Question and score shown on the page" },
          { js: "function\\s+\\w+", min: 2, label: "At least two functions" }
        ]
      }
    ]
  },

  /* ======================================================== COURSE 4 ==== */
  {
    id: "c4", title: "Course 4 · The Project Book",
    sub: "Ten projects that combine everything - little new theory",
    lessons: [

      {
        id: "c4p1", title: "Project 1 · Personal profile page",
        goal: "HTML structure and CSS styling from memory.",
        pages: [
          "### Why this project\nEvery website begins by displaying information. The browser builds the page from your HTML, then CSS changes how it looks. No JavaScript needed - the page does not have to respond to anyone yet.\n\nFrom here on, the theory pages are short. The learning is in the building - try to write the tags **without looking back** at earlier lessons first, and only peek when stuck."
        ],
        sample: null,
        task: "Build a profile page about yourself (or an invented character): a heading with the name, three paragraphs, one image, one hyperlink, and a coloured page background. Challenge: add a second heading size, a horizontal rule and a favourite quote.",
        checks: [
          { html: "h1", min: 1, label: "A main heading" },
          { html: "p", min: 3, label: "Three paragraphs" },
          { html: "img", min: 1, label: "An image" },
          { html: "a[href]", min: 1, label: "A hyperlink" },
          { css: "background", label: "A page background colour" }
        ]
      },

      {
        id: "c4p2", title: "Project 2 · Information cards",
        goal: "Group and style repeated content with classes.",
        pages: [
          "### Why this project\nAs pages grow they need organisation. Developers group related content into containers and use **one class** to style all of them the same - design once, reuse everywhere. That consistency is what makes a site feel professional."
        ],
        sample: null,
        task: "Create **three information cards** on any topic (three animals, three games, three bands). Each card is a div with a class containing a heading, a paragraph and an image. The class gives every card a border, padding, rounded corners and a background colour. Challenge: give ONE card an id and make it look different.",
        checks: [
          { html: "div[class]", min: 3, label: "Three cards sharing a class" },
          { html: "div h2, div h3", min: 3, label: "A heading in each card" },
          { html: "div img", min: 3, label: "An image in each card" },
          { css: "border-radius", label: "Rounded corners" },
          { css: "padding", label: "Padding inside the cards" }
        ]
      },

      {
        id: "c4p3", title: "Project 3 · Navigation",
        goal: "Semantic structure with a styled navigation bar.",
        pages: [
          "### Why this project\nVisitors should always know where they are and where they can go. Even a one-page site should have navigation - it frames the page like a book's contents page. Hover effects give the reader instant feedback that links are clickable."
        ],
        sample: null,
        task: "Build a page with a `<nav>` containing four links: Home, About, Gallery and Contact. Style the navigation bar with CSS (its own background, spacing, and link colours) and change the link colour when the mouse hovers over them.",
        checks: [
          { html: "nav a", min: 4, label: "A nav with four links" },
          { css: "nav", label: "The nav is styled in CSS" },
          { css: ":hover", label: "Links change on hover" }
        ]
      },

      {
        id: "c4p4", title: "Project 4 · Making it interactive",
        goal: "Functions and events working together.",
        pages: [
          "### Why this project\nThe event chain to burn into memory: the user clicks a button, the browser detects the event, the named function runs, the webpage changes. Every interactive feature on the web - like buttons, dark-mode toggles, add-to-cart - is that chain with different details."
        ],
        sample: null,
        task: "Create **three buttons**. Each button displays a different message, changes the heading, and changes a paragraph. Challenge: one button should also change the background colour of the page.",
        checks: [
          { html: "button[onclick]", min: 3, label: "Three wired-up buttons" },
          { js: "function\\s+\\w+", min: 3, label: "Three functions" },
          { js: "innerHTML", min: 2, label: "Heading and paragraph change" },
          { js: "alert\\s*\\(", min: 1, label: "A message appears" },
          { js: "style\\.background", label: "The background changes (challenge)" }
        ]
      },

      {
        id: "c4p5", title: "Project 5 · Variables",
        goal: "Store and display personal data.",
        pages: [
          "### Why this project\nVariables are the program's memory. Without them every page would forget everything instantly. With them, pages can be personalised - which is what separates an application from a poster."
        ],
        sample: null,
        task: "Store a name, an age and a favourite colour in three variables and display each one somewhere **on the page** (not only alerts). Challenge: ask for the name with `prompt()` and greet the user with it.",
        checks: [
          { js: "let\\s+\\w+\\s*=", min: 3, label: "Three variables" },
          { js: "innerHTML", label: "Values written onto the page" },
          { js: "prompt\\s*\\(", label: "The name is asked (challenge)" },
          { js: "\\+", label: "The greeting joins text and the name" }
        ]
      },

      {
        id: "c4p6", title: "Project 6 · Decisions",
        goal: "Branching behaviour with if and else.",
        pages: [
          "### Why this project\nComputers decide by comparing values, and every comparison boils down to true or false. Two different messages from one program - depending on the data - is the seed of every game, login screen and quiz you have used."
        ],
        sample: null,
        task: "Ask the user their age and show one message if they are 18 or older and a different one if not. Challenge: add a second decision - ask for a score and show \"Excellent!\" above 80, otherwise \"Keep practising.\"",
        checks: [
          { js: "prompt\\s*\\(", min: 2, label: "Two questions asked" },
          { js: "if\\s*\\(", min: 2, label: "Two decisions" },
          { js: "else", min: 2, label: "Both have an otherwise path" },
          { js: "18", label: "The age rule uses 18" },
          { js: "80", label: "The score rule uses 80" }
        ]
      },

      {
        id: "c4p7", title: "Project 7 · Calculations",
        goal: "A working score counter with guarded maths.",
        pages: [
          "### Why this project\nMost software calculates: banks, games, shops, science. This project adds one professional touch - *guarding* a value so it cannot go somewhere silly (like a negative score). A guard is just an `if` around an update."
        ],
        sample: null,
        task: "Build a score counter with buttons for **Add 1**, **Add 5** and **Reset**, showing the score on the page. Challenge: stop the score going below zero even if you add a Subtract button.",
        checks: [
          { html: "button[onclick]", min: 3, label: "Three buttons" },
          { js: "\\+\\s*5|\\+=\\s*5", label: "One button adds 5" },
          { js: "=\\s*0", label: "Reset puts it back to 0" },
          { js: "innerHTML", label: "Score displayed on the page" },
          { js: "if\\s*\\(", label: "A guard protects the score (challenge)" }
        ]
      },

      {
        id: "c4p8", title: "Project 8 · Arrays",
        goal: "Store, change and display a collection.",
        pages: [
          "### Why this project\nInformation rarely comes alone - it comes in lists. Arrays hold the list; the index numbers each item (starting at zero); loops visit every item. This trio is the backbone of nearly all data handling."
        ],
        sample: null,
        task: "Create an array of five favourite movies and display every one on the page using a loop. Challenge: replace one movie with a different one, then display the updated list a second time.",
        checks: [
          { js: "\\[\\s*[\"'][^\\]]+,[^\\]]+,[^\\]]+,[^\\]]+,", label: "An array of five movies" },
          { js: "for\\s*\\(", label: "A loop displays them" },
          { js: "\\.length", label: "The loop uses .length" },
          { js: "\\w+\\[\\d+\\]\\s*=", label: "One movie replaced (challenge)" }
        ]
      },

      {
        id: "c4p9", title: "Project 9 · Everything together",
        goal: "One page that uses the whole toolkit.",
        pages: [
          "### Why this project\nProfessional features rarely use one concept at a time. A single \"welcome\" feature might use HTML, CSS, a variable, a function, a decision and a page update all at once. This build is the dress rehearsal for the examination."
        ],
        sample: null,
        task: "Create a webpage that: asks the user's name; displays a welcome message on the page; has three buttons that change things; changes the page colour; displays the contents of an array; uses at least one `if`; and uses at least one loop. Style it so you would be happy to show it to the class.",
        checks: [
          { js: "prompt\\s*\\(", label: "Asks the user's name" },
          { js: "innerHTML", min: 2, label: "Welcome and data written to the page" },
          { html: "button[onclick]", min: 3, label: "Three working buttons" },
          { js: "style\\.background|background", label: "The page colour changes" },
          { js: "for\\s*\\(", label: "A loop" },
          { js: "if\\s*\\(", label: "A decision" },
          { js: "\\[\\s*[\"']", label: "An array" }
        ]
      },

      {
        id: "c4p10", title: "Project 10 · Independent challenge",
        goal: "Design and build your own mini application.",
        pages: [
          "### Your choice\nPick ONE: a student study planner, a movie recommendation app, a pet information page, a holiday destination guide, a favourite video game page, or a simple quiz.\n\nWhatever you choose, the minimum requirements are the same - they are the checklist below. This is the last stop before the examination: if you can pass this checklist on a topic of your own choosing, you are ready.",
          "### Advice from the professionals\n- Sketch the page on paper first: what appears, what is clickable, what happens.\n- Build in the order structure, style, behaviour.\n- Test after every small change - never write twenty lines untested.\n- When something breaks, check the Console under the preview: the error message names the line."
        ],
        sample: null,
        task: "Build your chosen application. It must have semantic structure (header, main, footer), headings, paragraphs, an image, buttons and a link; CSS with classes, an id, colours, borders, hover effects, padding, margins and rounded corners; and JavaScript with variables, an array, functions, events, a loop, an if statement, user input and page updates.",
        checks: [
          { html: "header", min: 1, label: "Semantic structure: header" },
          { html: "main", min: 1, label: "Semantic structure: main" },
          { html: "footer", min: 1, label: "Semantic structure: footer" },
          { html: "img", min: 1, label: "An image" },
          { html: "button[onclick]", min: 2, label: "Working buttons" },
          { html: "a[href]", min: 1, label: "A link" },
          { css: "\\.[a-zA-Z][\\w-]*\\s*\\{", label: "CSS classes" },
          { css: "#[a-zA-Z][\\w-]*\\s*\\{", label: "A CSS id" },
          { css: ":hover", label: "A hover effect" },
          { css: "border-radius", label: "Rounded corners" },
          { js: "\\[\\s*[\"']", label: "An array" },
          { js: "function\\s+\\w+", min: 2, label: "Functions" },
          { js: "for\\s*\\(", label: "A loop" },
          { js: "if\\s*\\(", label: "A decision" },
          { js: "prompt\\s*\\(", label: "User input" },
          { js: "innerHTML", label: "Page updates" }
        ]
      }
    ]
  }
];

/* =========================================================== THE EXAM ==== */
/* From exam.md: 8 questions, 5 marks each, 50 minutes. Self-check lists use
   the same checker engine as lessons. */
window.EXAM = {
  title: "HTML, CSS & JavaScript Practical Examination",
  minutes: 50,
  totalMarks: 40,
  instructions: "Complete all eight questions. Each question is independent - the Clear button empties the editors between questions. Use only the HTML, CSS and JavaScript concepts taught in Courses 1 to 4. Save your work for each question before moving on. Complete as many as you can in the time allowed, then download and submit your completed code.",
  questions: [
    {
      n: 1, marks: 5, title: "My Favourite Hobby", skill: "HTML structure",
      brief: "Create a webpage about your favourite hobby. It must include one heading, two paragraphs, one image and one button.",
      checks: [
        { html: "h1, h2", min: 1, label: "One heading" },
        { html: "p", min: 2, label: "Two paragraphs" },
        { html: "img", min: 1, label: "One image" },
        { html: "button", min: 1, label: "One button" }
      ]
    },
    {
      n: 2, marks: 5, title: "Improve the Appearance", skill: "CSS styling",
      brief: "Apply CSS to your hobby page: a background colour, a different heading colour, padding around the paragraphs, a border around the image, and a hover effect on the button.",
      checks: [
        { css: "body\\s*\\{[^}]*background|background", label: "A background colour" },
        { css: "h1\\s*\\{[^}]*color|h2\\s*\\{[^}]*color", label: "A heading colour" },
        { css: "p\\s*\\{[^}]*padding", label: "Padding on paragraphs" },
        { css: "img\\s*\\{[^}]*border", label: "A border on the image" },
        { css: ":hover", label: "A hover effect on the button" }
      ]
    },
    {
      n: 3, marks: 5, title: "Organise Your Webpage", skill: "Semantic HTML",
      brief: "Reorganise your webpage using semantic HTML: include header, main and footer, plus one class and one id.",
      checks: [
        { html: "header", min: 1, label: "A header" },
        { html: "main", min: 1, label: "A main" },
        { html: "footer", min: 1, label: "A footer" },
        { html: "[class]", min: 1, label: "One class" },
        { html: "[id]", min: 1, label: "One id" }
      ]
    },
    {
      n: 4, marks: 5, title: "Welcome Button", skill: "JavaScript events and functions",
      brief: "Make your button interactive. When clicked it must display an alert, change the heading, and change the background colour.",
      checks: [
        { html: "button[onclick]", min: 1, label: "The button calls a function" },
        { js: "alert\\s*\\(", label: "Displays an alert" },
        { js: "innerHTML", label: "Changes the heading" },
        { js: "style\\.background", label: "Changes the background colour" }
      ]
    },
    {
      n: 5, marks: 5, title: "Welcome the Visitor", skill: "Variables and user input",
      brief: "Ask the visitor for their first name and display a welcome message using the name entered, for example: Welcome, Mia!",
      checks: [
        { js: "prompt\\s*\\(", label: "Asks for the name" },
        { js: "let\\s+\\w+\\s*=", label: "Stores it in a variable" },
        { js: "\\+", label: "Joins the name into a message" },
        { js: "alert\\s*\\(|innerHTML", label: "Displays the welcome" }
      ]
    },
    {
      n: 6, marks: 5, title: "Adult or Child?", skill: "Decisions (if / else)",
      brief: "Ask the visitor for their age. If they are 18 or older display Adult, otherwise display Child.",
      checks: [
        { js: "prompt\\s*\\(", label: "Asks for the age" },
        { js: "if\\s*\\(", label: "An if statement" },
        { js: ">=\\s*18|18\\s*<=", label: "Compares against 18" },
        { js: "else", label: "An else path" }
      ]
    },
    {
      n: 7, marks: 5, title: "Favourite Foods", skill: "Arrays and loops",
      brief: "Create an array containing five favourite foods. Use a loop to display every food on the webpage.",
      checks: [
        { js: "\\[\\s*[\"'][^\\]]+,[^\\]]+,[^\\]]+,[^\\]]+,", label: "An array of five foods" },
        { js: "for\\s*\\(", label: "A loop" },
        { js: "\\.length|<\\s*5", label: "The loop covers the whole array" },
        { js: "innerHTML|document\\.write", label: "Foods appear on the page" }
      ]
    },
    {
      n: 8, marks: 5, title: "School Club", skill: "Apply all learned skills",
      brief: "Create a new webpage for a school club with one heading, one paragraph, one image, one button, one class and one id. When the button is clicked it must change the paragraph and display an alert.",
      checks: [
        { html: "h1, h2", min: 1, label: "A heading" },
        { html: "p", min: 1, label: "A paragraph" },
        { html: "img", min: 1, label: "An image" },
        { html: "button[onclick]", min: 1, label: "A working button" },
        { html: "[class]", min: 1, label: "A class" },
        { html: "[id]", min: 1, label: "An id" },
        { js: "innerHTML", label: "The paragraph changes" },
        { js: "alert\\s*\\(", label: "An alert appears" }
      ]
    }
  ]
};

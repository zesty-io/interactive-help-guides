# Interactive Help Guides

A javascript widget that creates an interactive walkthrough based upon a JSON array of element targets, title, icon, and html.

This is created to be used in Zesty.io, to have its sub apps probive a JSON array of info to provide a global help icon with an interactive guides

### Guidelines

* vanilla javascript 
* accepts a simple JSON array with an object of guide data

### Guide Data Object

An array of the obects, the order of the array is the order of the guide. Objects the following data:

* target: a string that is read by document.querySelector()
* title: string of the title
* icon: string using font-awesome spec
* body: markdown or html string

### Example Array

```
let guideArray = [
                {
                    "title": "my first highlight",
                    "target": "p .hello",
                    "body": "this is how you say hello",
                    "icon": "edit"
                },
                {
                    "title": "my second highlight",
                    "target": ".helloNumberTwo",
                    "body": "this is asdas asdhow you say hello",
                    "icon" : "alert"
                },
                {
                    "title": "my third highlight",
                    "target": ".rightside",
                    "body": "this isasdasd how you say hello",
                    "icon" : "alert"
                }
            ]
```

### How to Use

Include the script to your html document
```
<script src="../interactive-help-guides.js"></script>
```
Inside of script tags, create a javascript array of object like so. Ensure the target exist in your dom
```
let guideArray = [
                {
                    "title": "my first highlight",
                    "target": "p .hello",
                    "body": "this is how you say hello",
                    "icon": "edit"
                },
                {
                    "title": "my second highlight",
                    "target": ".helloNumberTwo",
                    "body": "this is asdas asdhow you say hello",
                    "icon" : "alert"
                },
                {
                    "title": "my third highlight",
                    "target": ".rightside",
                    "body": "this isasdasd how you say hello",
                    "icon" : "alert"
                }
            ]
```

Run the guide after declaring the jacascript array, pass the javascript array as a parameter

```
new InteractiveHelpGuide(guideArray);
```


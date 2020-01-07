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


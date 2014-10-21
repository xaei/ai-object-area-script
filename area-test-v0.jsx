prompt("Message", "default value in the text field");
var idoc = app.activeDocument;
var title = "Rectangle Maker";
var width = Number(prompt ("Enter Width", 100, title));
var height = Number(prompt ("Enter Height", 50, title));
var rectangle = idoc.pathItems.rectangle(0, 0, width, height);
// script.name = scaleStrokes.jsx;
// script.description = scales selected objects strokes only;
// script.required = one or more selected objects
// script.parent = CarlosCanto // 5/7/12;
// script.elegant = false;

// script.updates = preview ON by default // 5/7/12

#target Illustrator

var idoc = activeDocument;
var sel = idoc.selection;
var unscale = 0;
if (sel.length>0) {
	var paletteWindow = new Window("palette", "Scale Strokes", undefined, {resizeable:true});
	var pnlScale = paletteWindow.add("panel");
    paletteWindow.preferredSize = [100,-1];
    paletteWindow.alignChildren = ["fill", "bottom"];
    paletteWindow.onShow = function (){ paletteWindow.layout.resize(); } 
	// pnlScale.orientation = "row";
	// var lblScale = pnlScale.add("statictext",undefined,"Scale");
	// var editScale = pnlScale.add("edittext",undefined,"100");
	// editScale.characters = 5;
	// var lblScale = pnlScale.add("statictext",undefined,"%");

	// var grpScroll = win.add("group");
	// var scrlScale = grpScroll.add("scrollbar", undefined,100, 1, 1000); // 1 min scaling to avoid division by zero

	// var grpBottom = win.add("group");
	// grpBottom.alignChildren = "top";
	// var chkpreview = grpBottom.add("checkbox", undefined, "Preview");
	// chkpreview.value = 1;
	// var grpButtons = grpBottom.add("group");
	// grpButtons.orientation = "column";
	// var btnOk = grpButtons.add("button", undefined, "Ok");
	// var btnCancel = grpButtons.add("button", undefined, "Cancel");
	
	// win.helpTip = grpBottom.helpTip = "\u00A9 2012 Carlos Canto"; 

	// scrlScale.onChanging = function() {
	// 	editScale.text = this.value; // update edit box with scroll value
	// 	scaleStrokes (sel,editScale.text); // and do the scaling as the scroll changes
	// }

	// editScale.onChange = function() {
	// 	if (this.text<1) // if value entered by hand is less than 1, make it 1 to avoid division by zero
	// 		this.text = 1;
	// 	scrlScale.value = this.text; // update edit box with scroll value
	// 	scaleStrokes (sel,editScale.text); // and do the scaling after the edit box changes (manually entering values)
	// }

	// chkpreview.onClick = function () {
	// 	if (chkpreview.value)
	// 		app.redraw();
	// }
	
	// // unscale (back to 100%) on cancel, except no scaling has applied
	// btnCancel.onClick = function() {
	// 	if (unscale != 0) {
	// 		unscaleStrokes (sel, unscale);
	// 	}
	// 	win.close();
	// }

	paletteWindow.center();
	paletteWindow.show();
}
else {
	alert("select at least one object before running");
}

function scaleStrokes (sel,scale) {
	// skip unscaling the first time, there's nothing to unscale
	if (unscale != 0) {
		unscaleStrokes (sel, unscale);
	}
	for (i=0; i<sel.length; i++) {
		var pgitem = sel[i];
		pgitem.resize(100, 100, undefined, undefined, undefined, undefined, scale, Transformation.CENTER); 
	}
	if (chkpreview.value)
		app.redraw();
	unscale = 10000/scale;
}

// unscale or bring back selection to 100%
function unscaleStrokes (sel,unscale) {
	for (j=0; j<sel.length; j++) {
		var pgitem = sel[j];
		pgitem.resize(100, 100, undefined, undefined, undefined, undefined, unscale, Transformation.CENTER); 
	}
	if (chkpreview.value)
		app.redraw();
}
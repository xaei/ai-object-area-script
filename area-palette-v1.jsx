
//additions for scaling 131221-112724 AM
//based on JET Get Area & others
//amended 140205-202919 AM for interactive area

#target Illustrator
#targetengine main
var idoc = app.activeDocument;
var sel = idoc.selection;
var unscale = 0;

//function getArea(){
    if (sel.length>0) {

        var scaleList=updateArea();
        
        var paletteWindow = new Window('palette', 'Areas' , undefined, {resizeable:true});
        paletteWindow.preferredSize = [100,100];
        paletteWindow.alignChildren = ["fill", "bottom"];
        paletteWindow.onShow = function (){ paletteWindow.layout.resize(); }


        if (scaleList.length>0) {
            var selectListBox = paletteWindow.add('statictext', undefined, scaleList.join("\n"), {multiline: true});
        }
        else {
            var selectListBox = paletteWindow.add('abc')
        }
        selectListBox.alignment = ["fill","fill"];
        
        var msg = "yay";
        var lblNote = paletteWindow.add('statictext', undefined, msg, {multiline:true});
        //--
        // paletteWindow.orientation = "row";
        var lblX = paletteWindow.add("statictext",undefined,"Expand in x to area:");
        var editX = paletteWindow.add("edittext",undefined,"100");
        editX.characters = 5;

        var lblY = paletteWindow.add("statictext",undefined,"Expand in y to area:");
        var editY = paletteWindow.add("edittext",undefined,"100");
        editY.characters = 5;
        // var grpScroll = paletteWindow.add("group");
        // var scrlScale = grpScroll.add("scrollbar", undefined,100, 1, 1000); // 1 min scaling to avoid division by zero

        var grpBottom = paletteWindow.add("group");
        grpBottom.alignChildren = "top";
        var chkpreview = grpBottom.add("checkbox", undefined, "Preview");
        chkpreview.value = 1;
        var grpButtons = grpBottom.add("group");
        grpButtons.orientation = "column";
        var btnOk = grpButtons.add("button", undefined, "Ok");
        var btnCancel = grpButtons.add("button", undefined, "Cancel");
        
        paletteWindow.helpTip = grpBottom.helpTip = "\u00A9"; 

        var b = paletteWindow.add("button", undefined, "Close");
        b.onClick = function(){
            paletteWindow.close();

            // alert(updateArea().join("\n"));
            // paletteWindow.hide();
            // var paletteWindow2 = new Window('palette', 'Areas' , undefined, {resizeable:true});
            // var selectListBox2 = paletteWindow.add('statictext', undefined, updateArea().join("\n"), {multiline: true});
            // paletteWindow2.layout.resize();
            // paletteWindow2.show();
        }

    // scrlScale.onChanging = function() {
    //  editScale.text = this.value; // update edit box with scroll value
    //  scaleStrokes (sel,editScale.text); // and do the scaling as the scroll changes
    // }

        editX.onChange = function() {
        if (Number(this.text)<1) // if value entered by hand is less than 1, make it 1 to avoid division by zero
            this.text = 1;
            //editX.value = this.text; // update edit box with scroll value
            resizeObj(sel, Number(this.text)); // and do the scaling after the edit box changes (manually entering values)
        }

        chkpreview.onClick = function () {
            if (chkpreview.value)
                app.redraw();
        }
    
        // unscale (back to 100%) on cancel, except no scaling has applied
        btnCancel.onClick = function() {
            if (unscale != 0) {
                unscaleStrokes (sel, unscale);
            }
            paletteWindow.close();
        }

        paletteWindow.show();
    }
//}

function updateArea(){
   var scaleList=[]
   if ( app.documents.length > 0 && app.activeDocument.selection.length > 0 ) {
        var docRef=app.activeDocument;    
        var pathRef=docRef.selection[0];
        var pathAreaPica=Math.abs(pathRef.area);
        var pathAreaInches=(pathAreaPica/5184);
        var s1="pica area: "  +pathAreaPica.toFixed(2)+"\n";
        var s2="1:1=1'-0\": " +pathAreaInches.toFixed(2)+" sq. in.\n";
        var s3="1/16=1'-0\": "+(pathAreaInches*(Math.pow(16,2))).toFixed(2)+" sq. ft.\n";
        var s4="3/32=1'-0\": "+(pathAreaInches*(Math.pow(32/3,2))).toFixed(2)+" sq. ft.\n";
        var s5="1/8=1'-0\": " +(pathAreaInches*(Math.pow(8,2))).toFixed(2)+" sq. ft.\n";
        var s6="3/16=1'-0\": "+(pathAreaInches*(Math.pow(16/3,2))).toFixed(2)+" sq. ft.\n";
        var s7="1/4 =1'-0\": "+(pathAreaInches*(Math.pow(4,2))).toFixed(2)+" sq. ft.\n";
        var s8="1\"=20'-0\": "+(pathAreaInches*(Math.pow(20,2))).toFixed(2)+" sq. ft.\n";
        var s9="1\"=30'-0\": "+(pathAreaInches*(Math.pow(30,2))).toFixed(2)+" sq. ft.\n";
        var scaleList = [s1,s2,s3,s4,s5,s6,s7,s8,s9];
    }  
    return scaleList;
}

//getArea(); 

function resizeObj(sel,scale){
    for (i=0; i<sel.length; i++) {
        var pgitem = sel[i];
        alert("resizing! to "+scale+" "+pgitem);
        try {
          var bt = new BridgeTalk();
          bt.target = "illustrator";
          bt.body = "{\n" +
          "var pgitem=activeDocument.selection[0];\n" +
          "//if (app.documents.length == 0) app.documents.add();\n" +
          "//var pathRef = activeDocument.pathItems.rectangle(600, 200, 100, 120);\n" +
          "//var left = (Math.random() * 100) + 150;\n" +
          "//var top = (Math.random() * 100) + 200;\n" +
          "//pathRef.position = new Array( left, top );\n" +
          "pgitem.resize(100, 100, undefined, undefined, undefined, undefined, scale, Transformation.CENTER);\n" +
          "alert(pgitem);\n"
            + "}\n";
          bt.onResult= function(msg){alert(msg.body);}
          bt.send();
        } 
        catch(e) {
          alert (e);
        }
        // try{
        //     pgitem.resize(100, 100, undefined, undefined, undefined, undefined, scale, Transformation.CENTER); 
        // }
        // catch(e){
        //     alert(e);
        // }
    }
    if (chkpreview.value)
        app.redraw();
    //unscale = 10000/scale;

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

//additions for scaling 131221-112724 AM
//based on JET Get Area

#target Illustrator
#targetengine main
 
if ( app.documents.length > 0 && app.activeDocument.selection.length > 0 ) {
    var docRef=app.activeDocument;    
    var pathRef=docRef.selection[0];
    var pathRefArea=pathRef.area;
    var pathAreaPica=(Math.abs(pathRefArea));
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
}  

var scaleList = [s1,s2,s3,s4,s5,s6,s7,s8,s9];

var paletteWindow = new Window('palette', 'Areas', undefined, {resizeable:true});
var selectListBox = paletteWindow.add('listbox',undefined, scaleList, {multiselect: true});
var msg = "yay";
var lblNote = paletteWindow.add('statictext', undefined, msg, {multiline:true});
 
selectListBox.alignment = ["fill","fill"];
paletteWindow.preferredSize = [100,-1];
paletteWindow.alignChildren = ["fill", "bottom"];
 
selectListBox.onChange = function () {
    buildMsg (selectListBox.selection.index);
}
 
win.onShow = function () {paletteWindow.layout.resize();}
 
// win.center();
paletteWindow.show();

function buildMsg (alignment) {
 
    var bt = new BridgeTalk;
    bt.target = "illustrator";         
    var params = {idx:alignment};
    var msg = alignSelection + '\ralignSelection(' + params.toSource() + ');';
 
    bt.body = msg;
    bt.send(); 
}


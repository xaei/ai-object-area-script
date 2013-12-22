
//additions for scaling 131221-112724 AM
//based on JET Get Area & others

#target Illustrator
#targetengine main

function getArea(){
    scaleList=updateArea();
    
    var paletteWindow = new Window('palette', 'Areas' , undefined, {resizeable:true});
    paletteWindow.preferredSize = [100,-1];
    paletteWindow.alignChildren = ["fill", "bottom"];
    paletteWindow.onShow = function (){ paletteWindow.layout.resize(); } 

    var selectListBox = paletteWindow.add('statictext', undefined, scaleList.join("\n"), {multiline: true});
    selectListBox.alignment = ["fill","fill"];
    
    var msg = "yay";
    var lblNote = paletteWindow.add('statictext', undefined, msg, {multiline:true});
    var b = paletteWindow.add("button", undefined, "Close");
    b.onClick = function(){
        alert(updateArea().join("\n"));
        // paletteWindow.hide();
        // var paletteWindow2 = new Window('palette', 'Areas' , undefined, {resizeable:true});
        // var selectListBox2 = paletteWindow.add('statictext', undefined, updateArea().join("\n"), {multiline: true});
        // paletteWindow2.layout.resize();
        // paletteWindow2.show();
    }

    paletteWindow.show();
    
}

function updateArea(){
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

getArea();
//additions for scaling 131221-112724 AM
//based on JET Get Area

if ( app.documents.length > 0 && app.activeDocument.selection.length > 0 ) {
	var docRef=app.activeDocument;
		
//	for (var i in docRef.selection){
		var pathRef=docRef.selection[0];
		var pathRefArea=pathRef.area;
		var pathAreaHumanReadable=(Math.abs(pathRefArea)).toFixed(2);
		var pathAreaInches=(pathAreaHumanReadable/5184).toFixed(2);

		alert("raw area: "+(pathAreaHumanReadable)+"\n"+
			"1:1 scale: "+(pathAreaInches)+" sq. in.\n"+
			"3/32 scale: "+((pathAreaInches*113.78)).toFixed(2)+" sq. ft.\n"+
			"3/16 scale: "+((pathAreaInches*28.444)).toFixed(2)+" sq. ft.\n"+
			"1/4 scale: "+((pathAreaInches*16)).toFixed(2)+" sq. ft.\n");

		// alert ("Square Points: "+Math.round(pathRefArea*100)/100+"\n"
		// +"Square Picas: "+(Math.round((pathRefArea/144)*100))/100+"\n"
		// +"Square Inches: "+(Math.round((pathRefArea/5184)*100))/100+"\n"
		// +"Square Millimeters: "+(Math.round((pathRefArea/8.037)*100))/100+"\n"
		// +"Square Centimeters: "+(Math.round((pathRefArea/803.520)*100))/100);
		
	}	

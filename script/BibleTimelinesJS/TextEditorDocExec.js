var oDoc, sDefTxt, showDetail;
var runFunction = 0;

detailsSummary.addEventListener('click', function () {
	if (detailsSummary.querySelector('.showDetail')) {
		showDetail = document.getElementsByClassName('showDetail');
		currentSelection = showDetail[0];
		oDocID = currentSelection.id;
		oDoc = document.getElementById(oDocID);

		sDefTxt = oDoc.innerHTML;

		if (oDoc.checked) {
			setDocMode(true);
		}
		runFunction = 1;
	}
});



function formatDoc(sCmd, sValue) {
	if ((runFunction == 1) && (validateMode())) {
		document.execCommand(sCmd, false, sValue);
		oDoc.focus();
	}
}

function validateMode() {
	if ((runFunction == 1) && (!oDoc.checked)) {
		return true;
	}
	alert("Uncheck \"Show HTML\".");
	oDoc.focus();
	return false;
}

function setDocMode(bToSource) {
	var oContent;
	if ((runFunction == 1) && (bToSource)) {
		oContent = document.createTextNode(oDoc.innerHTML);
		oDoc.innerHTML = "";
		var oPre = document.createElement("pre");
		oDoc.contentEditable = false;
		oPre.id = "sourceText";
		oPre.contentEditable = true;
		oPre.appendChild(oContent);
		oDoc.appendChild(oPre);
	} else {
		if ((runFunction == 1) && (document.all)) {
			oDoc.innerHTML = oDoc.innerText;
		} else {
			oContent = document.createRange();
			oContent.selectNodeContents(oDoc.firstChild);
			oDoc.innerHTML = oContent.toString();
		}
		oDoc.contentEditable = true;
	}
	oDoc.focus();
}

function printDoc() {
	if ((runFunction == 1) && (!validateMode())) {
		return;
	}
	var oPrntWin = window.open("", "_blank", "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
	oPrntWin.document.open();
	oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
	oPrntWin.document.close();
}
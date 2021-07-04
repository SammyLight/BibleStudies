//PART OF THE HTML DOVUMNT TO SAVE
//TO CREATE FILE TO SAVE
function saveDynamicDataToFile() {
	//remove selected class from any selected cell. in case ther is one
	if(selectedGroup = storyLineTable.querySelectorAll('.selected')){
		selectedGroup.forEach(element => {
			element.classList.remove('selected')
		});
	}
	var saveText = `---
layout: bibleStoryLineTEMPLATE
title: "` + storyLineTableTitleHeader.innerHTML + `"
categories: Timeline
---
<style id="divColorStyles">` +
		divColorStyles.innerHTML +
		`</style>
{% include BStL-preStorylineTable.html %}` +
		// storyLineTable.innerHTML +
		storyLineTable.outerHTML +
		`

{% include BStL-masterTableEND.html %}
 ` + masterNoteNote.innerHTML + `
{% include BStL-detailsSection-Buttons.html %}

	<div id="detailsSummary" class="scrollbar-custom">` +
		detailsSummary.innerHTML;

	//console.log(saveText);

	////////////////////////////////////////////////////////////////////////////////////////////
	//REMOVE THE MODIFICATION ADDED BY REFTAGGER BEFORE SAVING
	//This is useful for when you make a correction in a Bible reference or else it would still link to the old reference.
	saveText.toString();
	//	saveText = saveText.replace(/(<a class="rtBibleRef"([^>]+)>)(\w+\s+\d+:\d+)(<\/a>)/g, "$3");
	saveText = saveText.replace(/<a[\s]+class="rtBibleRef"[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>/g, "$2");
	saveText = saveText.replace(/<a[\s]*class="rtBibleRef"[\s]*([^>]*)>((?:(.|\n)(?!\<\/a\>))*(.|\n))<\/a>/g, "$2");
	saveText = saveText.replace(/((((data-)*)|(--))*(darkreader)([^\s*]+)((\s\d*\w*)*)+(;|(?<!;)"))/g, "");

	//remove inline css generated by darkReader chrome plugin
	saveText = saveText.replace(/([\s]*style=\"[^\"]*\")/g, "");
	saveText = saveText.replace(/<b>/g, "<strong>");
	saveText = saveText.replace(/<\/b>/g, "</strong>");
	saveText = saveText.replace(/<i>/g, "<em>");
	saveText = saveText.replace(/<\/i>/g, "</em>");
	saveText = saveText.replace(/([\s]*style=\"[^\"]*\")/g, "");
	saveText = saveText.replace(/(showingDetail )/g, "");
	saveText = saveText.replace(/(<p><\/p>)/g, "");//Remove emply paragraphs
	saveText = saveText.replace(/(<p><ol>)/g, "<ol>");//Remove emply paragraphs
	saveText = saveText.replace(/(<\/ol><\/p>)/g, "</ol>");//Remove emply paragraphs
	// console.log(saveText);
	////////////////////////////////////////////////////////////////////////////////////////////

	var fname = storyLineTableTitleHeader.innerHTML;
	if (fname == "") {
		customAlert("!!! PLEASE <h1>ENTER TITLE</h1> FOR THE STORY LINE !!!");
		return false;
	} else {

		var filename = fname + `.html`;

		var blob = new Blob([saveText], {
			type: "text/plain;charset=utf-8"
		});
		saveAs(blob, filename);
	}
}
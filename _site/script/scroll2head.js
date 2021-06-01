function tfunction() {
	this.scrollIntoView({
		behavior: "smooth"
	})
};
//FOR H1s ONLY
/*var theaders = document.querySelectorAll("h1");
for (i=0; i < theaders.length; i++) {
	theaders[i].addEventListener('click', tfunction)
};*/

//FOR ALL HEADERS

var allBodyElements = document.querySelectorAll("body *");
for (i=0; i < allBodyElements.length; i++) {
	if(allBodyElements[i].tagName == ("H1"||"H2"||"H3"||"H4"||"H5"||"H6")){
	   var aHeadingElement = allBodyElements[i];
		aHeadingElement.addEventListener('click', tfunction);
	   }
};
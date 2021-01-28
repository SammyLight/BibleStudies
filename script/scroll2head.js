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

var allheaders = document.querySelectorAll("body *");
for (i=0; i < allheaders.length; i++) {
	if(allheaders[i].tagName == "H1"||"H2"||"H3"||"H4"||"H5"||"H6"){
	   allheaders[i].addEventListener('click', tfunction);
	   }
};

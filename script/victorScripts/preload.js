setTimeout(function() {
  $('.loader-bg').fadeToggle();
}, 1500);
//Remove the - in Articles and Summaries Categories name
const artSumCatNameElements = document.querySelectorAll('.ArtSumCatName');
artSumCatNameElements.forEach(element => {
  const textContent = element.textContent;
  if (textContent.includes('-')) {
    // Remove all occurrences of the hyphen and update the textContent
    const updatedTextContent = textContent.replace(/-/g, ' ');
    element.textContent = updatedTextContent;
  }
});
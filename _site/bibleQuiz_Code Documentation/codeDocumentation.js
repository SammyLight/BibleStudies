// DoubleClick eventListner to make Main editable
main.addEventListener('dblclick', editDocumentation)
main.addEventListener('mouseup', toggleH1to6siblings);
main.querySelectorAll('h6,h5,h4,h3,h2,h1').forEach(x=>{toggleH1to6siblings(null, x)})

document.addEventListener('keydown', e => {
    // Escape key press eventListner to make Main non-editable
    if (e.key === 'Escape' && main.contentEditable == 'true') {
        disableCKEditor(main)
    }
    // Ctrl+S key press eventListner to save Main
    if (e.ctrlKey && e.key.toUpperCase() === 'S') {
        e.preventDefault();
        e.stopPropagation();
        if (main.contentEditable == 'true') {
            disableCKEditor(main)
        }
        const text_content_head = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="/ckeditor-standard/ckeditor.js"></script><title>CodeDoc4LC-BibleApp</title><link rel="stylesheet" href="codeDocumentation.css"></head>
        <body>
            <h1>LightCity Bible App Code Documentation</h1>
            <button id="darkmode_btn" onclick="toggleDarkLightMode('darkmode')">D&L</button><main id="main" contenteditable="false">`;
        const text_content_bottom = `</main></body><script src="/script.js/helpers.js" charset="utf-8"></script><script src="codeDocumentation.js" charset="utf-8"></script></html>`;
        const text_content = text_content_head + modifyQuotationMarks(main.innerHTML) + text_content_bottom;
        saveToLocalDrive(text_content, 'Code Guide', 'html')
    }
    if (e.altKey && e.key.toUpperCase() === 'D') {
        e.preventDefault();
        e.stopPropagation();
        toggleDarkLightMode('darkmode')
    }
});

function editDocumentation(e){
    enableCKEditor(main)
    main.contentEditable = 'true';
    function enableCKEditor(ID) {
        disableCKEditor(ID)
        CKEDITOR.inline(ID, {
            // Allow some non-standard markup that we used in the introduction.
            extraAllowedContent: 'a(documentation);abbr[title];code',
            removePlugins: 'stylescombo',
            extraPlugins: 'sourcedialog',
            removeButtons: 'PasteFromWord',
            // Show toolbar on startup (optional).
            startupFocus: true
        });
    }    
}
function disableCKEditor(ID) {
    main.contentEditable = 'false';
    for (k in CKEDITOR.instances) {
        var instance = CKEDITOR.instances[k];
        instance.destroy();
    }
}

function toggleDarkLightMode(cls){
    document.querySelector('body').classList.toggle(cls)
}

function toggleH1to6siblings(e, eTarget){
    if(main.contentEditable=='true'){return}
    const h1to6arr = ['H1','H2','H3','H4','H5','H6'];
    let hElm;
    if(e){hElm = e.target}else{hElm = eTarget}
    const hTag = hElm.tagName;
    if(h1to6arr.includes(hTag.toUpperCase())){
        const hIndx = h1to6arr.indexOf(hTag)
        let hElmSibling = hElm.nextElementSibling;
        let hElmSibTagName;
        if(hElmSibling){
            hElmSibTagName = hElmSibling.tagName.toUpperCase();
            if((h1to6arr.includes(hElmSibTagName) && (h1to6arr.indexOf(hElmSibTagName) < hIndx))){
                return
            }
        }
        while(hElmSibling && hElmSibTagName != hTag && hElmSibTagName != 'SCRIPT'){
            if(hElmSibling.classList.contains('hidby_' + hTag)){
                hElmSibling.classList.remove('hidby_' + hTag);
                hElm.classList.remove('hidingsibs')
            } else {
                hElmSibling.classList.add('hidby_' + hTag);
                hElm.classList.add('hidingsibs')
            }
            hElmSibling = hElmSibling.nextElementSibling;
            if(hElmSibling){
                hElmSibTagName = hElmSibling.tagName.toUpperCase();
                if((h1to6arr.includes(hElmSibTagName) && (h1to6arr.indexOf(hElmSibTagName) < hIndx))){
                    return
                }
            }
        }
    }
}
document.body.addEventListener('click', toggleH1to6siblings);
document.body.addEventListener('contextmenu', toggleH1to6siblings);
document.body.addEventListener('keydown', toggleH1to6siblings);
document.body.querySelectorAll('H1:not(main>h1)','H2:not(main>h2)','H3:not(main>h3)','H4:not(main>h4)','H5:not(main>h5)','H6:not(main>h6)').forEach(x=>{toggleH1to6siblings(null, x)})
function toggleH1to6siblings(e, eTarget){
    let hElm, hTag;
    const h1to6arr = ['H1','H2','H3','H4','H5','H6'];
    if(e){
        if(e.target.matches('[strnum]')||!['H1','H2','H3','H4','H5','H6'].some(hx=>{return e.target.matches(`.context_menu ${hx}`)})){return}
        if(e.type!='keydown'){e.preventDefault()}
        // hElm = e.target or closest heading ancestor;
        hElm = h1to6arr.includes(e.target.tagName.toUpperCase())==true ? e.target : (e.target.closest('h1,h2,h3,h4,h5,h6') ? e.target.closest('h1,h2,h3,h4,h5,h6') : e.target);
    }else{hElm = eTarget}
    hTag = hElm.tagName;
    const eTargetParent = hElm.parentElement
    if(!h1to6arr.includes(hTag.toUpperCase()) || eTargetParent.contentEditable=='true'){return}
    function unhideAllH1to6() {
        eTargetParent.querySelectorAll('.hidingsibs').forEach(y=>{y.classList.remove('hidingsibs')})
        h1to6arr.forEach(x=>{
            eTargetParent.querySelectorAll('.hidby_'+ x).forEach(y=>{y.classList.remove('hidby_'+ x)})
        })
    }
    if(h1to6arr.includes(hTag.toUpperCase())){
        if(e && e.type=='contextmenu'){
            const othersH1to6showing = Array.from(eTargetParent.querySelectorAll('h6:not(.hidingsibs),h5:not(.hidingsibs),h4:not(.hidingsibs),h3:not(.hidingsibs),h2:not(.hidingsibs),h1:not(.hidingsibs)'));
            if(hElm.matches('.hidingsibs')){
                //hide siblings of any whose siblings are showing, if any
                othersH1to6showing ? othersH1to6showing.forEach(x=>{toggleH1to6siblings(null, x)}):null;
                //then show its own nonH1to6 siblings
                toggleH1to6siblings(null, hElm);
                // unhideAllH1to6()
            } else {
                //remove hElm from the h1to6 showing their siblings
                othersH1to6showing.splice(othersH1to6showing.indexOf(hElm))
                //hide siblings of any whose siblings are showing, if any, but if none, just hide this one's nonH1to6 sibs
                othersH1to6showing.length>0 ? othersH1to6showing.forEach(x=>{toggleH1to6siblings(null, x)}):toggleH1to6siblings(null, hElm);
            }
        }
        else if(e && e.ctrlKey && e.type=='click'){
            if(hElm.matches('.hidingsibs')){
                unhideAllH1to6()
            } else {
                eTargetParent.querySelectorAll('h6:not(.hidingsibs),h5:not(.hidingsibs),h4:not(.hidingsibs),h3:not(.hidingsibs),h2:not(.hidingsibs),h1:not(.hidingsibs)').forEach(x=>{toggleH1to6siblings(null, x)})
                h1to6arr.forEach(x=>{
                    eTargetParent.querySelectorAll(x + '[class*=hidby_]').forEach(y=>{
                        h1to6arr.forEach(z=>{y.classList.remove('hidby_'+ z)})
                    })
                })
            }
        }
        else if(!e || e.type=='click'){
            const hIndx = h1to6arr.indexOf(hTag)
            let hElmSibling = hElm.nextElementSibling;
            let hElmSibTagName;
            if(hElmSibling){
                hElmSibTagName = hElmSibling.tagName.toUpperCase();
                if((h1to6arr.includes(hElmSibTagName) && (h1to6arr.indexOf(hElmSibTagName) < hIndx))){
                    return
                }
            }
            let hElmHidingSiblings = hElm.classList.contains('hidingsibs');
            while(hElmSibling && hElmSibTagName != hTag && hElmSibTagName != 'SCRIPT'){
                // Show all sibling if Helm was hidingsibs
                if(hElmHidingSiblings && hElmSibling.classList.contains('hidby_' + hTag)){
                    for (let i = hIndx; i <= 6; i++) {
                        hElmSibling.classList.remove('hidby_H' + i);
                    }
                    hElm.classList.remove('hidingsibs')
                } else if (!hElmHidingSiblings) {
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
}
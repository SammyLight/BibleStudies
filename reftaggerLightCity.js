let showingXref=localStorage.getItem('showingXref')?JSON.parse(localStorage.getItem('showingXref')):false;
let main = document.body;
let pagemaster = document.body;
let isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
let contextMenu_touch="contextmenu";
let bibleversions_Array = ['KJV','ESV','NIV’84','ABP-en','ABP-gr','NET'];


/* **** ****************************** **** */
/* **** CONTEXTMENU//SCRIPTURE TOOLTIP **** */
/* **** ****************************** **** */
// ToDo: change 'context_menu' to 'scriptureContextMenu' site-wide
let cmenu_backwards_navigation_arr=[];
let prev_contextmenu;
let newStrongsDef = '';
let rightClickedElm = null;
document.addEventListener('click', appendCrossReferences);
document.addEventListener('click', contextMenu_CreateNAppend);
// document.addEventListener('contextmenu', contextMenu_CreateNAppend);
// document.addEventListener('click', touchORclickCMenu);
document.addEventListener('touchstart', touchORclickCMenu);
document.addEventListener('contextmenu', touchORclickCMenu);
// document.addEventListener('touchstart', contextMenu_CreateNAppend);

// Touchstart event
function touchORclickCMenu(e) {
    if (['click'].includes(e.type)) {
        contextMenu_CreateNAppend(e)
    }//if it is a click, run contextMenu_CreateNAppend function
    else if (e.type=='touchstart'){
        if(!e.target.closest('.context_menu')){
        contextMenu_CreateNAppend({'type':'click','target':e.target,'truecontextmenu':false})
        }//if it is not inside contextmenu
        else if(e.target.closest('.context_menu *')){//if it is element inside contextmenu
            // if touch is not ended in 300ms, run contextMenu_CreateNAppend function
               let touchStartTime;
               let touchEndCheckTimeout;
               touchStartTime = Date.now();// Record the timestamp when the touch starts
               
               // Touchend event
               document.addEventListener("touchend", touchDownEnded);// Clear the timeout when the touch ends

               context_menu.style.userSelect = 'none';
               // Set a timeout to check if the touch has ended after 300ms
               touchEndCheckTimeout = setTimeout(function() {
                   // Check if the touch has not ended after 300ms
                   if (Date.now() - touchStartTime >= 300) {
                       document.removeEventListener("touchend", touchDownEnded);
                    //    preventContextMenu_mo(null,false)
                       contextMenu_CreateNAppend({'type':'contextmenu','target':e.target,'truecontextmenu':false});
                       context_menu.style.userSelect = '';
                       // e.preventDefault();
                       let selectionsTimer = setInterval(() => {
                           let selection = window.getSelection();
                           if (selection.rangeCount > 0) {
                               window.getSelection().removeRange(window.getSelection().getRangeAt(0));
                               clearInterval(selectionsTimer);
                            }
                        }, 300);
                    }
                }, 300);
                function touchDownEnded(e) {clearTimeout(touchEndCheckTimeout);}
            }
        }
}
/* ******* ******* ******* **** *** **** ******* ******* ***** ************* ** ************** ******* */
/* PREVENT DEFAULT CONTEXT MENU FOR WHEN ELEMENT CHANGES AFTER RIGHTCLICKING ON .crfnnote_btns buttons */
/* ******* ******* ******* **** *** **** ******* ******* ***** ************* ** ************** ******* */
let prevntDefault_cMenu = false;
let timer_prevntDefault_cMenu;
document.addEventListener('mouseover', preventContextMenu_mo);
document.addEventListener('touchstart', preventContextMenu_mo);
// document.addEventListener('contextmenu', preventContextMenu);
function preventContextMenu_mo(e,allowdefaultCmenu) {
    if(!e.target.matches('.verse_crossref_button,.compare_withinsearchresult_button')||!allowdefaultCmenu){return}
    if(prevntDefault_cMenu == false){
        clearTimeout(timer_prevntDefault_cMenu);
        prevntDefault_cMenu = true;
        document.addEventListener('contextmenu', preventContextMenu);
    } else {
        clearTimeout(timer_prevntDefault_cMenu)
        timer_prevntDefault_cMenu = setTimeout(() => {
            prevntDefault_cMenu = false;
            document.removeEventListener('contextmenu', preventContextMenu);}, 1000);
    }
    function preventContextMenu(event) {if (prevntDefault_cMenu) {event.preventDefault();}}
}
/* ******* ******* ******* **** *** **** ******* ******* ***** ************* ** ************** ******* */
/* ******* ******* ******* **** *** **** ******* ******* ***** ************* ** ************** ******* */
function contextMenu_CreateNAppend(e) {
	if (!e.target.matches('span[ref], .crossrefs>span:not(.notref), .translated, .strnum, #context_menu span:not(.notref):not(.verse)')||e.target.closest('.ignorecmenu')){return} // Select the element(s) that the context menu will be attached to
	if (!e.target.matches('#context_menu *')){cmenu_backwards_navigation_arr=[];} // Reset the cmenu_backwards_navigation_arr if the context menu is not called from context_menu
    let addquotes = true,prv_indx='',currentContextMenu_style, cmenu_cmt_dX, cmenu_cmt_dY, cmenu_dX,cmenu_dY, prv_cmenuIndx=false, prv_title='',cmenu_tsk_display='displaynone',dzabled='disabled';
    // formerContextMenu_Coordinates.transform = context_menu.style.transform;
	let parentIsContextMenu=false;
    if (e.target.closest('.context_menu')) {
        //This is a temporary solution
        //Do not create context_menu if etarget is strongs number in a context menu
        //so that strong's number words can be changed to their transliteration back and forth
        //only right click will create context menu for strongs number
        if (e.type=='click' && e.target.matches('.context_menu .translated, .context_menu .translated .strnum')) {
            return
        }
        parentIsContextMenu = true;
        prev_contextmenu=context_menu.cloneNode(true);
        prev_contextmenu.addEventListener('contextmenu', function(e){e.preventDefault()});
        /* Store the old cmenu to go back to it */
        currentContextMenu_style = context_menu.getAttribute('style');
        cmenu_cmt_dX = context_menu.querySelector('.cmtitlebar').getAttribute('data-x');
        cmenu_cmt_dY = context_menu.querySelector('.cmtitlebar').getAttribute('data-y');
        cmenu_dX = context_menu.getAttribute('data-x');
        cmenu_dY = context_menu.getAttribute('data-y');
    } else {
        currentContextMenu_style='';
    }

    // console.log({parentIsContextMenu});
    // console.log({currentContextMenu_style,cmenu_cmt_dX,cmenu_cmt_dY});
	if (!document.head.querySelector('#lightCityReftaggerContextMenuStyleInHead')) {
        addContextMenuStyleToHead();
	}
    parentIsContextMenu = 0;
    let newCmenu = createNewContextMenu();
    ifForStrongsNumberORforCrossRef();
    appendORpositionContextMenu();
    if (!e.hasOwnProperty('truecontextmenu')) {e.preventDefault();}
    
    // Create Context Menu if Not available
    function createNewContextMenu(){
        // If there isn't a contextMenu already, create one
        if (!document.querySelector('#context_menu')) {
            let context_menu_replacement = document.createElement('div');
            context_menu_replacement.id = 'context_menu';
            context_menu_replacement.classList.add('context_menu');
            context_menu_replacement.classList.add('slideintoview');
            showingXref==true?context_menu_replacement.classList.add('showingXref'):null;
            context_menu_replacement.style.display = 'block';
            document.body.prepend(context_menu_replacement);
            document.body.appendChild(context_menu);
            context_menu_replacement.addEventListener('contextmenu', function(e){e.preventDefault()})
            return true
        }
        return false
    }
    /* ********************************** */
    /* ** WHERE TO APPEND CONTEXT-MENU ** */
    /* ********************************** */
    function ifForStrongsNumberORforCrossRef() {
        /* ||||||||||||||||||||||||||||||||||||||||||||||| */
        /* || FOR WHEN IT IS CALLED FROM A CONTEXT-MENU || */
        /* ||||||||||||||||||||||||||||||||||||||||||||||| */
        if (elmAhasElmOfClassBasAncestor(e.target, '.context_menu')) {
            parentIsContextMenu = 1;
            prev_contextmenu=context_menu.cloneNode(true);
            prev_contextmenu.addEventListener('contextmenu', function(e){e.preventDefault()});

            /* Store the old cmenu to go back to it */
            currentContextMenu_style = context_menu.getAttribute('style');
            cmenu_cmt_dX = context_menu.querySelector('.cmtitlebar').getAttribute('data-x');
            cmenu_cmt_dY = context_menu.querySelector('.cmtitlebar').getAttribute('data-y');
            cmenu_dX = context_menu.getAttribute('data-x');
            cmenu_dY = context_menu.getAttribute('data-y');
            if(typeof prv_cmenuIndx === 'number'){
                /* For contextMenu whose parent was contextMenu: In case it is one that is called from the array and there are other saved cmenus in the array */
                cmenu_backwards_navigation_arr.splice(prv_cmenuIndx+1,0,prev_contextmenu);
                cmenu_backwards_navigation_arr.length=prv_cmenuIndx+2;
                prv_indx=`indx="${prv_cmenuIndx+1}"`;
                dzabled='';
            }
            else {
                cmenu_backwards_navigation_arr.push(prev_contextmenu);
                prv_indx=`indx="${cmenu_backwards_navigation_arr.length-1}"`;
                dzabled='';
                if(context_menu.matches('[strnum]')){
                    let codeChildren = context_menu.querySelectorAll('.cmtitlebar code');
                    let numOfStrnums=1;
                    let divider=''
                    for(let i=0;i<codeChildren.length;i++){
                        let codetxt=codeChildren[i].childNodes;
                        for(let i=0;i<codetxt.length;i++){
                            if(codetxt[i].nodeType==3){
                                if (numOfStrnums>1) {divider=' || '}
                                numOfStrnums+=1
                                prv_title+=`${divider}${codetxt[i].wholeText}`;
                            }
                        }
                    }
                    prv_title=`title="${prv_title}"`;
                } else {
                    let codeChildren = context_menu.querySelector('.cmtitlebar, .cmtitlebar code').childNodes;
                    for(let i=0;i<codeChildren.length;i++){
                        let codetxt=codeChildren[i];
                        if(codetxt.nodeType==3){
                            prv_title=`title="${codetxt.wholeText}"`;
                            break
                        }    
                    }
                }  
            }
        }
        else {
            context_menu.style.visibility = "hidden";
            context_menu.style.transform = '';// In case it has been dragged, reset its transform
            //context_menu.classList.remove('showingXref')//if disabled, will show .crfnnote_btns once it was displayed in any .context_menu until it is hidden again
        }
        /* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
        /* || If eTraget is a [Translated Strongs Word] or the [Strongs Number] itself || */
        /* |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
        if (e.target.matches('.translated, .strnum')) {
            // console.log(e.type);
            // On Mobile Devices
            if ((isMobileDevice && contextMenu_touch!="touchstart") || !e.hasOwnProperty('truecontextmenu')) {
                // remove windows selection
                // (because on mobile, the user has to press and hold for contextmenu which also selects the text)
                (window.getSelection().rangeCount > 0) ? window.getSelection().removeRange(window.getSelection().getRangeAt(0)):null;
            }
            if (e.target.getAttribute("translation")) {
                originalWord = e.target.getAttribute("translation");
                if (truexlit = e.target.getAttribute("data-true-xlit")) {
                    if (elmAhasElmOfClassBasAncestor(e.target, 'rtl')) {
                        originalWord = `“${originalWord.trim()} : ”${truexlit}`;
                    } //because of the direction of the text
                    else {
                        originalWord = `“${originalWord.trim()}” : ${truexlit}`;
                    }
                    addquotes = false;
                }
            } else {
                originalWord = e.target.parentElement.getAttribute("translation");
            }
            
            // If the target is a strong's number
            if (e.target.getAttribute('strnum')) {
                rightClickedElm = e.target;
                firstShadowColorOfElem = getBoxShadowColor(rightClickedElm);
                // console.log('strongs');
                getCurrentStrongsDef(e);
            }
            let menu_inner;
            let arrOfStrnums = e.target.getAttribute('strnum').split(' ');
            let searchicon = 'search-svgrepo-com(2).svg';
            if(document.body.matches('.darkmode')){
                searchicon = 'search-svgrepo-com(2)-DarkMode.svg';
            }
            // console.log({originalWord,newStrongsDef,context_menu});
            if (originalWord) {
                let xlitNlemma = '',br = '';
                for (let i = 0; i < arrOfStrnums.length; i++) {
                    br = '', st = '';
                    if(i==arrOfStrnums.length-1){br = '<br>'}
                    let sn = arrOfStrnums[i];
                    if(!/[GHgh]\d+/.test(sn)){continue}
                    let srchBtn = `<button class="cmenusrchbtn" onmouseup="searchInputsValueChange(event,'${sn}')"><img src="images/${searchicon}" alt="&#128270;"></button>`;
                    xlitNlemma = `${xlitNlemma}${br}<code>${srchBtn}${getsStrongsLemmanNxLit(sn).lemma} (${getsStrongsLemmanNxLit(sn).xlit}, ${sn})</code>`
                    // console.log({xlitNlemma});
                    // console.log(getsStrongsLemmanNxLit(sn));
    }
                if (addquotes) {
                    menu_inner = `${xlitNlemma}<hr>“${originalWord.trim()}”`;
                } else {
                    menu_inner = `${xlitNlemma}<hr>${originalWord.trim()}`;
                }
                // console.log(menu_inner);
                context_menu.innerHTML = `<div class="cmtitlebar">${menu_inner}<div id="cmenu_navnclose_btns"><button class="cmenu_tsk ${cmenu_tsk_display}" onclick="toggleCMenuTSK(this)">TSK</button><button class="prv" ${prv_indx} ${prv_title} onclick="cmenu_goBackFront(this)" ${dzabled}></button><button class="nxt" onclick="cmenu_goBackFront(this)" disabled></button><button class="closebtn cmenu_closebtn" onclick="hideRightClickContextMenu()"></button></div></div>${newStrongsDef}`;
                // console.log('01');
            } else if ([contextMenu_touch,'click','touchstart'].includes(e.type)) { // For strongs number in verseNote
                // console.log('02');
                let srchBtn = `<code><button class="cmenusrchbtn" onmouseup="searchInputsValueChange(event,'${arrOfStrnums}')"><img src="images/${searchicon}" alt="&#128270;"></button>${arrOfStrnums} (${getsStrongsLemmanNxLit(arrOfStrnums).lemma}, ${getsStrongsLemmanNxLit(arrOfStrnums).xlit})</code>`;
                context_menu.innerHTML = `<div class="cmtitlebar">${srchBtn}<div id="cmenu_navnclose_btns"><button class="cmenu_tsk ${cmenu_tsk_display}" onclick="toggleCMenuTSK(this)">TSK</button><button class="prv" ${prv_indx} ${prv_title} onclick="cmenu_goBackFront(this)" ${dzabled}></button><button class="nxt" onclick="cmenu_goBackFront(this)" disabled></button><button class="closebtn cmenu_closebtn" onclick="hideRightClickContextMenu()"></button></div></div>${newStrongsDef}</div>`;
            }
            if (strnum = e.target.getAttribute('strnum')) {
                context_menu.setAttribute('strnum', strnum)
            } else {
                context_menu.removeAttribute('strnum')
            }
        }
    
        /* ||||||||||||||||||||||||||||||||||||||||| */
        /* || If eTarget is a Scripture Reference || */
        /* ||||||||||||||||||||||||||||||||||||||||| */
        else {
            // if (crossRefinScriptureTooltip_check.checked) {
                cmenu_tsk_display="";
            // }
            context_menu.innerText = null;
            context_menu.classList.add('win2');
            if (e.target.matches('.crossrefs>span, span[ref]')) {
                let cmtitlebar = document.createElement('div');
                cmtitlebar.classList.add('cmtitlebar');
                let cmtitletext;
                if (bkn = e.target.getAttribute('bkn')) {
                    cmtitletext = bkn + ' ' + e.target.innerText;
                } else {
                    cmtitletext = e.target.innerText;
                }
                cmtitletext = cmtitletext + ' [' + bversionName + ']';
                // cmtitlebar.innerText=e.target.innerText;
                cmtitlebar.innerHTML = cmtitletext + `<div id="cmenu_navnclose_btns"><button class="prv_verse" onclick="cmenu_goToPrevOrNextVerse('prev')"></button><button class="nxt_verse" onclick="cmenu_goToPrevOrNextVerse('next')"></button><button class="cmenu_tsk ${cmenu_tsk_display}" onclick="toggleCMenuTSK(this)">TSK</button><button class="prv" ${prv_indx} ${prv_title} onclick="cmenu_goBackFront(this)" ${dzabled}></button><button class="nxt" onclick="cmenu_goBackFront(this)" disabled></button><button class="closebtn" id="cmenu_closebtn"></button></div></div>`;
                context_menu.append(cmtitlebar);
            }
            let vHolder = getCrossReference(e.target);
            /* FOR CROSS-REFS & NOTES IN SEARCH WINDOW */
            // if(crossRefinScriptureTooltip_check.checked){
                vHolder.querySelectorAll('span.verse').forEach(spanVerse=>{
                    let tskHolder=crfnnote_DIV(spanVerse);
                    context_menu.matches('.showingXref')?null:tskHolder.classList.add('displaynone');
                    spanVerse.append(tskHolder);
                });
            // }

            context_menu.append(vHolder);
            // context_menu.append(getCrossReference(e.target));
            
            if (strnum = e.target.getAttribute('strnum')) {
                context_menu.setAttribute('strnum', strnum)
            } else {
                context_menu.removeAttribute('strnum')
            }
            transliterateAllStoredWords()
        }
    }
    function appendORpositionContextMenu(){
        if (currentContextMenu_style) {return}
        if (!e.target.matches('#context_menu, #context_menu *')) {
            let menuWidth = context_menu.offsetWidth; // Set the width of your context menu
            let menuHeight = context_menu.offsetHeight; // Set the height of your context menu
            // let windowHeight = window.innerHeight; // Get the height of your window
            let windowHeight = document.documentElement.clientHeight;
            // let windowWidth = window.innerWidth; // Get the width of your window
            let windowWidth = document.documentElement.clientWidth;
            let scrollX = window.scrollX;
            let scrollY = window.scrollY;

            // Reduce height/width greater than that of the window
            if (menuHeight >= windowHeight) {
                menuHeight = windowHeight - 20;
                context_menu.style.height = menuHeight;
            }
            if (menuWidth >= windowWidth) {
                menuWidth = windowWidth - 20;
                context_menu.style.width = menuWidth;
            }

            positionContextMenu(e, menuWidth, menuHeight)
            function positionContextMenu(event, menuWidth, menuHeight) {
                const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
                // const windowWidth = window.innerWidth - scrollBarWidth;
                const windowWidth = document.documentElement.clientWidth;
                const scrollBarHeight = window.innerHeight - document.documentElement.clientHeight;
                // const windowHeight = window.innerHeight - scrollBarHeight;
                const windowHeight = document.documentElement.clientHeight;
              
                const clickedElement = event.target;
                const clickedElementRect = clickedElement.getBoundingClientRect();
                // const clickedElementTop = clickedElementRect.top;//for position fixed
                // const clickedElementTop = clickedElement.offsetTop;
                const clickedElementTop = getOffsetRelativeToAncestor(clickedElement).top;//because of elements in table or nested in positioned ancestor(s)
                // console.log({clickedElementTop,'elmHeight':clickedElement.offsetHeight,menuHeight,windowHeight,'wscrllY':window.scrollY,scrollBarHeight});

                // Enough Space Above In Visible Part of Window
                if (clickedElementTop >= menuHeight) {
                    context_menu.style.top = (clickedElementTop - menuHeight ) + 'px';
                }
                // Enough Space Below (Visible and Non Visible) Part of Window
                else if (clickedElementTop + clickedElement.offsetHeight + menuHeight + 10 > -windowHeight + window.scrollY + scrollBarHeight) {
                    context_menu.style.top = (clickedElementTop + clickedElement.offsetHeight ) + 'px';
                }
              
                // Adjust x position if menu is off the right side of the page
                const clickedElementLeft = clickedElementRect.left + window.scrollX;
                if (clickedElementLeft + menuWidth > windowWidth + window.scrollX + scrollBarWidth) {
                    context_menu.style.left = (windowWidth - menuWidth - scrollBarWidth - 3) + 'px';
                } else {
                    context_menu.style.left = clickedElementLeft - scrollBarWidth - 3 + 'px';
                }
                // Set the position of the context menu
                context_menu.style.visibility = "visible";
            }
        }
    }
    function addContextMenuStyleToHead(w=450,h=400) {
        const lightCityReftaggerContextMenuStyleInHead = document.createElement('style');
        lightCityReftaggerContextMenuStyleInHead.id='lightCityReftaggerContextMenuStyleInHead';
        lightCityReftaggerContextMenuStyleInHead.textContent = `.context_menu {
            display: none;
            position: absolute!important;
            padding: 0;
            margin: 0;
            max-width: ${w}px!important;
            max-height: ${h}px!important;
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow:-1px -1px 2px 0px black, 1px 5px 6px -3px black!important;
            overflow-y:auto;
            z-index: 100!important;
            transition:all 0.1s ease-in-out;
            transition: transform 0;
          }
          @media only screen and (max-width: 414px){
              .context_menu{ 
                  max-width: ${w-100}px!important;
                  max-height: ${h-100}px!important;
                  min-width: 300px!important;
                }
            }
        //     @media only screen and (min-width: 650px) and (max-width: 960px){
        //       .context_menu{ 
        //       max-width: ${w+150}px!important;
        //       max-height: ${h+150}px!important;
        //   }}
          .cmenusrchbtn {display:none!important;}
          span.verse {display:block}
          .darkmode .context_menu {
              background-color: var(--darkmode-bg1color)!important;
          }
          .strngsdefinition h1, .strngsdefinition h2, .strngsdefinition h3, .strngsdefinition h4, .strngsdefinition h5, .strngsdefinition h6 {
              display: flex;
              box-shadow: none!important;
              border-radius: 0px!important;
          }
          .strngsdefinition summary h1::before, .strngsdefinition summary h2::before, .strngsdefinition summary h3::before, .strngsdefinition summary h4::before, .strngsdefinition summary h5::before, .strngsdefinition summary h6::before {
              content:''!important;
          }
          #cmenu_navnclose_btns {
              margin-right: -5px;
              font-size:12px;
          }
          #context_menu[strnum] #cmenu_navnclose_btns {
              margin-right: -20px;
          }
          #cmenu_navnclose_btns button {
              height: 1.2em;
              width: 1.2em;
          }
          #cmenu_navnclose_btns button.prv {
              background:url(../images/arrow-up-svgrepo-com.svg) center no-repeat;
              transform:rotate(-90deg);
              margin-left:2px;
              box-shadow:-1px -1px 1px var(--shadow-color);
          }
          #cmenu_navnclose_btns button.prv_verse {
              background:url(../images/arrow-up-svgrepo-com.svg) center no-repeat;
              margin-left:2px;
              box-shadow:1px 1px 1px var(--shadow-color);
          }
          #cmenu_navnclose_btns button.nxt_verse {
              background:url(../images/arrow-up-svgrepo-com.svg) center no-repeat;
              transform:rotate(-180deg);
              margin-left:1px;
              box-shadow:-1px -1px 1px var(--shadow-color);
          }
          .verse:not(.v_accented) .eng2grk::after {
              content: attr(translation);
              font-size: 75%;
              line-height: 0;
              position: relative;
              vertical-align: baseline;
              top: -0.5em;
              font-style: italic;
              color: crimson;
          }
          #cmenu_navnclose_btns button.nxt {
            transform:rotate(-90deg) scaleY(-1);
         }
          `;
        document.head.append(lightCityReftaggerContextMenuStyleInHead);
    }
    
    if (newCmenu){cmenu_backwards_navigation_arr=[]}
    if (parentIsContextMenu) {
        context_menu.setAttribute('style',currentContextMenu_style);            
        context_menu.querySelector('.cmtitlebar').setAttribute('data-x',cmenu_cmt_dX);
        context_menu.querySelector('.cmtitlebar').setAttribute('data-y',cmenu_cmt_dY);
        context_menu.setAttribute('data-y',cmenu_dX);
        context_menu.setAttribute('data-x',cmenu_dY);
        if(cm_dtl = context_menu.querySelector('details')){cm_dtl.open = true;}
    }
    // Remove ContextMenu Eventlistner
    enableInteractJSonEl('.cmtitlebar', context_menu);
    context_menu.addEventListener('mouseenter', add_cMenuNavigationByKeys);
    context_menu.addEventListener('mouseleave', remove_cMenuNavigationByKeys);
}
document.addEventListener('click', contextMenu_Remove);
document.addEventListener('keydown', contextMenu_Remove);
// document.addEventListener('click', mainBibleVersion);
// function mainBibleVersion(e){
//     if(!e.target.matches('span.verse[ref]')){return}
//     bversionName = e.target.getAttribute('ref').split(' ').pop();
//     localStorage.getItem('bversionName',bversionName)
// }
document.addEventListener('dblclick', mainBibleVersion);
document.addEventListener('contextmenu', mainBibleVersion);
function mainBibleVersion(e){
    if(e.target.matches('button.compare_withinsearchresult_button')){
        bversionName = e.target.getAttribute('b_version');
        loadVersion(bversionName)
        localStorage.setItem('bversionName',bversionName);
    }
}
function hideRightClickContextMenu() {contextMenu_Remove({'type':'click','key':'Escape','target':context_menu})}
function contextMenu_Remove(e) {
    //Don't remove the cmenu if it is a strong's number 
    if ((e.target.matches('[strnum],[ref],.crossrefs span') && !e.target.closest('.context_menu'))||(e.type!='click' && e.key !== 'Escape')){return}
    console.log('removed');
    if (typeof context_menu != 'undefined' && (e.target.id=='cmenu_closebtn' || !e.target.matches("#context_menu *"))) {
        // context_menu.removeEventListener('contextmenu', mainBibleVersion);
        // lightCityReftaggerContextMenuStyleInHead.remove();
        context_menu.matches('.showingXref')?showingXref=true:showingXref=false;
        localStorage.setItem('showingXref',showingXref)
        context_menu.remove();
    }
}
function add_cMenuNavigationByKeys(e) {
    e.target.classList.add('keydownready')
    document.addEventListener('keydown', cMenuNavigationByKeys);
}
function remove_cMenuNavigationByKeys(e) {
    e.target.classList.remove('keydownready')
    document.removeEventListener('keydown', cMenuNavigationByKeys);
}
function cMenuNavigationByKeys(e) {
    let key_code = e.which || e.keyCode;
    switch (key_code) {
        // case e.shiftKey && 37: //left arrow key
        case 37: //left arrow key
            const previous = cmenu_navnclose_btns.querySelector('.prv');
            if(!previous.disabled){
                cmenu_goBackFront(previous);
                e.preventDefault();
            }
            break;
        case 39: //right arrow key
            const next = cmenu_navnclose_btns.querySelector('.nxt');
            if(!next.disabled){
                cmenu_goBackFront(next);
                e.preventDefault();
            }
            break;
        case e.altKey && 38: //Up arrow key
            if(cmenu_navnclose_btns.querySelector('.prv_verse')){
                cmenu_goToPrevOrNextVerse('prev');
                e.preventDefault();
            }
            break;
        case e.altKey && 40: //down arrow key
            if(cmenu_navnclose_btns.querySelector('.nxt_verse')){
                cmenu_goToPrevOrNextVerse('next');
                e.preventDefault();
            }
            break;
        case 88: //x key
            if(cmenu_tsk = cmenu_navnclose_btns.querySelector('.cmenu_tsk')){
                toggleCMenuTSK(cmenu_tsk);
                e.preventDefault();
            }
            break;
    }
}

/* ***** *********************** ***** */
/* ***** GENERAL BIBLE DATA CODE ***** */
/* ***** *********************** ***** */
const bible = bibleData();
function bibleData() {
    const bible = {};
    bible.Data = {};
    bible.Data.books = [
        ["GENESIS","GEN","GE","GN"],
        ["EXODUS","EXO","EX","EXOD"],
        ["LEVITICUS","LEV","LE","LV"],
        ["NUMBERS","NUM","NU","NM","NB"],
        ["DEUTERONOMY","DEU","DEUT","DT"],
        ["JOSHUA","JOSH","JOS","JSH"],
        ["JUDGES","JDG","JUDGE","JUDG","JG","JDGS"],
        ["RUTH","RTH","RU","RUT"],
        ["I SAMUEL","1SAM","1 SAMUEL","1SAMUEL","1ST SAMUEL","FIRST SAMUEL","1 SAM","1 SA","1S","I SA","1 SM","1SA","I SAM"],
        ["II SAMUEL","2SAM","2 SAMUEL","2SAMUEL","2ND SAMUEL","SECOND SAMUEL","2 SAM","2 SA","2S","II SA","2 SM","2SA","II SAM"],
        ["I KINGS","1KIN","1 KGS","1 KI","1K","I KGS","1KGS","I KI","1KI","I KING","1KINGS","1 KINGS","1 KING","1 KIN","1ST KGS","1ST KINGS","FIRST KINGS","FIRST KGS"],
        ["II KINGS","2KIN","2 KGS","2 KI","2K","II KGS","2KGS","II KI","2KI","II KING","2KINGS","2 KINGS","2 KING","2 KIN","2ND KGS","2ND KINGS","SECOND KINGS","SECOND KGS"],
        ["I CHRONICLES","1CHR","1 CHRON","1 CH","I CH","1CH","1 CHR","I CHR","1 CHR","I CHRON","1CHRON","1CHRONICLES","1 CHRONICLES","1ST CHRONICLES","FIRST CHRONICLES"],
        ["II CHRONICLES","2CHR","2 CHRON","2 CH","II CH","2CH","II CHR","2 CHR","II CHRON","2CHRON","2CHRONICLES","2 CHRONICLES","2ND CHRONICLES","SECOND CHRONICLES"],
        ["EZRA","EZR"],
        ["NEHEMIAH","NEH","NE"],
        ["ESTHER","EST","ESTH","ES"],
        ["JOB","JOB","JB"],
        ["PSALMS","PSA","PSALM","PSAL","PSLM","PS","PSM","PSS"],
        ["PROVERBS","PRO","PROV","PR","PRV"],
        ["ECCLESIASTES","ECC","ECCL","ECCLES","EC","QOH","QOHELETH"],
        ["SONG OF SOLOMON","SON","SOS","SONG OF SONGS","SONG","SO","CANTICLE OF CANTICLES","CANTICLES"],
        ["ISAIAH","ISA","IS"],
        ["JEREMIAH","JER","JERE","JE","JR"],
        ["LAMENTATIONS","LAM","LAMENTATION","LA"],
        ["EZEKIEL","EZE","EZEK","EZK","EZ"],
        ["DANIEL","DAN","DA","DN"],
        ["HOSHEA","HOSEA","HOS","HO"],
        ["JOEL","JOE","JL"],
        ["AMOS","AMO","AM"],
        ["OBADIAH","OBA","OBAD","OB"],
        ["JONAH","JON","JONA","JNH"],
        ["MICAH","MIC","MICA"],
        ["NAHUM","NAH","NAHU","NA"],
        ["HABAKKUK","HAB","HBK","HABA","HABAK"],
        ["ZEPHANIAH","ZEPH","ZEP","ZP"],
        ["HAGGAI","HAG","HAGG","HG"],
        ["ZECHARIAH","ZEC","ZECH","ZC"],
        ["MALACHI","MAL","MALA","ML","MLC","MALAC"],
        ["MATTHEW","MAT","MATHEW","MATT","MT"],
        ["MARK","MAR","MRK","MK","MR"],
        ["LUKE","LUK","LK"],
        ["JOHN","JOH","JN","JHN"],
        ["ACTS","ACT","AC"],
        ["ROMANS","ROM","RO","RM"],
        ["I CORINTHIANS","1COR","1CO","1 CO","I CO","I COR","1 COR","1CORINTHIANS","1 CORINTHIANS","1ST CORINTHIANS","FIRST CORINTHIANS"],
        ["II CORINTHIANS","2COR","2CO","2 COR","2 CO","II CO","II COR","2CORINTHIANS","2 CORINTHIANS","2 CORINTHIANS","2ND CORINTHIANS","SECOND CORINTHIANS"],
        ["GALATIANS","GAL","GA","GALATIAN"],
        ["EPHESIANS","EPH","EPHESIAN","EPHES"],
        ["PHILIPPIANS","PHP","PHILIP","PHILP","PHILI","PHIL"],
        ["COLOSSIANS","COL","COLO","COLOS"],
        ["I THESSALONIANS","1TH","1THE","1THES","1 TH","1 THE","1 THESS","I TH","I THE","I THES","I THESS","1THESS","1THESSALONIANS","1 THESSALONIANS","1ST THESSALONIANS","FIRST THESSALONIANS"],
        ["II THESSALONIANS","2TH","2THE","2THES","2 TH","2 THE","2 THESS","II TH","II THE","II THES","II THESS","2THESS","2THESSALONIANS","2 THESSALONIANS","2ND THESSALONIANS","SECOND THESSALONIANS"],
        ["I TIMOTHY","1TI","1TIM","1 TIM","1 TI","I TI","I TIM","1TIMOTHY","1 TIMOTHY","1ST TIMOTHY","FIRST TIMOTHY"],
        ["II TIMOTHY","2TI","2TIM","2 TIM","2 TI","II TI","II TIM","2TIMOTHY","2 TIMOTHY","2ND TIMOTHY","SECOND TIMOTHY"],
        ["TITUS","TIT","TITU"],
        ["PHILEMON","PHM","PHILE","PHILEM","PHILM"],
        ["HEBREWS","HEB"],
        ["JAMES","JAM","JAS","JM"],
        ["I PETER","1PE","1PET","1 PET","1 PE","I PE","I PET","I PT","1 PT","1PT","1PETER","1 PETER","1ST PETER","FIRST PETER"],
        ["II PETER","2PE","2PET","2 PET","2 PE","II PE","II PET","II PT","2 PT","2PT","2PETER","2 PETER","2ND PETER","SECOND PETER"],
        ["I JOHN","1JOH","1 JOHN","1 JN","I JN","1JN","I JO","1JO","I JOH","1 JOH","I JHN","1 JHN","1JHN","1JOHN","1 JOHN","1ST JOHN","FIRST JOHN"],
        ["II JOHN","2JOH","2 JOHN","2 JN","II JN","2JN","II JO","2JO","II JOH","2 JOH","II JHN","2 JHN","2JHN","2JOHN","2 JOHN","2ND JOHN","SECOND JOHN"],
        ["III JOHN","3JOH","3 JOHN","3 JN","III JN","3JN","III JO","3JO","III JOH","3 JOH","III JHN","3 JHN","3JHN","3JOHN","3 JOHN","3RD JOHN","THIRD JOHN"],
        ["JUDE","JUD"],
        ["REVELATION","REV","RE","THE REVELATION"]
        ];
    //TODO - use the arrays above
    bible.Data.otBooks = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy','Joshua','Judges','Ruth','I Samuel','II Samuel','I Kings','II Kings','I Chronicles','II Chronicles','Ezra','Nehemiah','Esther','Job','Psalms','Proverbs','Ecclesiastes','Song of Solomon','Isaiah','Jeremiah','Lamentations','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malachi'];
    bible.Data.ntBooks = ['Matthew','Mark','Luke','John','Acts','Romans','I Corinthians','II Corinthians','Galatians','Ephesians','Philippians','Colossians','I Thessalonians','II Thessalonians','I Timothy','II Timothy','Titus','Philemon','Hebrews','James','I Peter','II Peter','I John','II John','III John','Jude','Revelation'];
    bible.Data.allBooks = bible.Data.otBooks.concat( bible.Data.ntBooks );
    bible.Data.bookNamesByLanguage = {
    	"en":["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","I Samuel","II Samuel","I Kings","II Kings","I Chronicles","II Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","I Corinthians","II Corinthians","Galatians","Ephesians","Philippians","Colossians","I Thessalonians","II Thessalonians","I Timothy","II Timothy","Titus","Philemon","Hebrews","James","I Peter","II Peter","I John","II John","III John","Jude","Revelation"],
    	"fa":["پدایش","خروج","لاویان","اعداد","تشنیه","یوشع","داوران","روت","اول سموییل","دوم سموییل","اول پادشاهان","دوم پادشاهان","اول تواریخ","دوم تواریخ","عزرا","نحمیا","استر","ایوب","مزامیر","امثال","جامعه","غزل غزلها","اشعیا","ارمیا","مراثی ارمیا","حزقیال","دانیال","هوشع","یوییل","عاموس","عوبدیا","یونس","میکاه","ناحوم","حبقوق","صفنیا","حخی","زکریا","ملاکی","متی","مرقس","لوقا","یوحنا","اعمال رسولان","رومیان","اول قرنتیان","دوم قرنتیان","علاطیان","افسیان","فلیپیان","کولسیان","اول تسالونیکیان","دوم تسالونیکیان","اول تیموتایوس","دوم تیموتایوس","تیطوس","فلیمون","عبرانیان","یعقوب","اول پطرس","دوم پطرس","اول یحنا","دوم یحنا","سوم یحانا","یهودا","مکاشفه"],
    	"fr":["Genèse","Exode","Lévitique","Nombres","Deutéronome","Josué","Juges","Ruth","1 Samuel","2 Samuel","1 Rois","2 Rois","1 Chroniques","2 Chroniques","Esdras","Néhémie","Esther","Job","Psaumes","Proverbes","Ecclésiaste","Cantique des Cantiques","Ésaïe","Jérémie","Lamentations","Ézéchiel","Daniel","Osée","Joël","Amos","Abdias","Jonas","Michée","Nahum","Habacuc","Sophonie","Aggée","Zacharie","Malachie","Matthieu","Marc","Luc","Jean","Actes","Romains","1 Corinthiens","2 Corinthiens","Galates","Éphésiens","Philippiens","Colossiens","1 Thessaloniciens","2 Thessaloniciens","1 Timothée","2 Timothée","Tite","Philémon","Hébreux","Jacques","1 Pierre","2 Pierre","1 Jean","2 Jean","3 Jean","Jude","Apocalypse"],
    	"original":["בראשית","שמות","ויקרא","במדבר","דברים","יהושע","שפטים","רות","שמואל א","שמואל ב","מלכים א","מלכים ב","דברי הימים א","דברי הימים ב","עזרא","נחמיה","אסתר","איוב","תהילים","משלי","קהלת","שיר השירים","ישעה","ירמיה","איכה","יחזקאל","דניאל","הושע","יואל","עמוס","עבדיה","יונה","מיכה","נחום","חבקוק","צפניה","חגי","זכריה","מלאכי","Ματθαίος","Μαρκος","Λουκας","Ιωαννης","Πραξεις","Ρωμαιους","Α Κορινθίους","Β Κορινθίους","Γαλατες","Εφεσιους","Φιλιππησιους","Κολοσσαεις","Α Θεσσαλονικεις","Β Θεσσαλονικεις","Α Τιμοθεο","Β Τιμοθεο","Τιτο","Φιλημονα","Εβραιους","Ιακωβου","Α Πετρου","Β Πετρου","Α Ιωαννη","Β Ιωαννη","Γ Ιωαννη","Ιουδα","Αποκαλυψη του Ιωαννη"],
    	'ar':['تكوين','خروج','لاويين','عدد','تثنية','يشوع','قضاة','راعوث','1 صموئيل','2 صموئيل','1 ملوك','2 ملوك','1 اخبار','2 اخبار','عزرا','نحميا','استير','ايوب','مزامير','امثال','جامعة','نشيد الانشاد','اشعياء','ارميا','مراثي','حزقيال','دانيال','هوشع','يوئيل','عاموس','عوبديا','يونان','ميخا','ناحوم','حبقوق','صفنيا','حجى','زكريا','ملاخي','متى','مرقس','لوقا','يوحنا','اعمال','رومية','1 كورنثوس','2 كورنثوس','غلاطية','افسس','فيلبي','كولوسي','1 تسالونيكي','2 تسالونيكي','1 تيموثاوس','2 تيموثاوس','تيطس','فليمون','عبرانيين','يعقوب','1بطرس','2بطرس','1 يوحنا','2 يوحنا','3 يوحنا','يهوذا','رؤيا'],
    	'ro':['Geneza','Exodul','Leviticul','Numeri','Deuteronom','Iosua','Judecători','Rut','1 Samuel','2 Samuel','1 Regi','2 Regi','1 Cronici','2 Cronici','Ezra','Neemia','Estera','Iov','Psalmii','Proverbe','Eclesiastul','Cântarea Cântărilor','Isaia','Ieremia','Plângeri','Ezechiel','Daniel','Osea','Ioel','Amos','Obadia','Iona','Mica','Naum','Habacuc','Ţefania','Hagai','Zaharia','Maleahi','Matei','Marcu','Luca','Ioan','Faptele Apostolilor','Romani','1 Corintieni','2 Corintieni','Galateni','Efeseni','Filipeni','Coloseni','1 Tesaloniceni','2 Tesaloniceni','1 Timotei','2 Timotei','Titus','Filimon','Evrei','Iacov','1 Petru','2 Petru','1 Ioan','2 Ioan','3 Ioan','Iuda','Apocalipsa'],
    	'hlt':['Suencuek','Sunglatnah','Thothuengnah','Lampahnah','Olrhaep','Joshua','Laitloekkung','Ruth','1 Samuel','2 Samuel','1 Manghai','2 Manghai','1 Khokhuen','2 Khokhuen','Ezra','Nehemiah','Esther','Job','Tingtoeng','Olcueih','Thuituen','Solomon Laa','Isaiah','Jeremiah','Rhaengsae','Ezekiel','Daniel','Hosea','Joel','Amos','Obadiah','Jonah','Micah','Nahum','Habakkuk','Zephaniah','Haggai','Zechariah','Malakhi','Matthai','Marku','Luka','Johan','Caeltueih','Rom','1 Khawrin','2 Khawrin','Galati','Ephisa','Philipi','Kolosa','1 Thesalonika','2 Thesalonika','1 Timothy','2 Timothy','Titu','Philimon','Hebru','Jame','1 Peter','2 Peter','1 Johan','2 Johan','3 Johan','Jude','Olphong'],
    	'ckb':['پەیدابوون','دەرچوون','لێڤییەکان','سه‌رژمێری','دواوتار','یەشوع','ڕابەران','ڕائووس','یەکەم ساموئێل','دووەم ساموێل','یەکەم پاشایان','دووەم پاشایان','یەکەم پوختەی مێژوو','دووەم پوختەی مێژوو','عەزرا','نەحەمیا','ئەستەر','ئەیوب','زەبوورەکان','پەندەکانی سلێمان','ژیرمه‌ندی','گۆرانی گۆرانییه‌كان','ئیشایا','یه‌رمیا','شینه‌كانی یه‌رمیا','حزقیێل','دانیال','هۆشه‌ع','یۆئێل','ئامۆس','عۆبه‌دیا','یونس','میخا','ناحوم','حه‌به‌قوق','سه‌فه‌نیا','حه‌گه‌ی','زه‌كه‌ریا','مه‌لاخی','مەتا','مەرقۆس','لۆقا','یۆحەنا','کردار','ڕۆما','١ کۆرنسۆس','٢ کۆرنسۆس','گەلاتیا','ئەفەسۆس','فیلیپی','کۆلۆسی','١ سالۆنیكی','٢ سالۆنیكی','١ تیمۆساوس','٢ تیمۆساوس','تیتۆس','فلیمۆن','عیبرانییەکان','یاقوب','١ پەترۆس','٢ پەترۆس','١ یۆحەنا','٢ یۆحەنا','٣ یۆحەنا','یەهوزا','ئاشکراکردن'],
    };
    bible.Data.rtlLanguages = [ 'he', 'fa', 'ar', 'ckb' ];
    bible.Data.supportedVersions = {
    	'original': { name: 'Original', language: 'original' },
    	'accented': { name: 'Accented original', language: 'original' },
    	'KJV': { name: 'King James Version', language: 'en' },
    	'ABP-en': { name: 'Apostolic Bible Polyglot-en', language: 'en' },
    	'ABP-gr': { name: 'Apostolic Bible Polyglot-gr', language: 'gr' },
    	'WEB': { name: 'World English Bible', language: 'en' },
    	'ESV': { name: 'English Standard Version', language: 'en' },
    	'LC': { name: 'Literal Consistent', language: 'en' },
    	'YLT': { name: 'Young\'s Literal Translation', language: 'en' },
    	'ASV': { name: 'American Standard Version', language: 'en' },
    	'DARBY': { name: 'Darby Translation', language: 'en' },
    	'GW': { name: 'God\'s Word Translation', language: 'en' },
    	'JUB': { name: 'Jubilee Bible 200', language: 'en' },
    	'LEB': { name: 'Lexham English Bible', language: 'en' },
    	'NIV’84': { name: 'New International Translation', language: 'en' },
    	'NET': { name: 'New English Translation', language: 'en' },
    	'WMB': { name: 'World Messianic Bible', language: 'en' },
    	'OPV': { name: 'ترجمه-ی قدام', language: 'fa' },
    	'TPV': { name: 'مژده برای اسرع جدید', language: 'fa' },
    	'NMV': { name: 'ترجمه هزارۀ نو', language: 'fa' },
    	'AraSVD': { name: 'Arabic Bible', language: 'ar' },
    	'RomCor': { name: 'Cornilescu Bible in Romanian language', language: 'ro' },
    	'MCSB': { name: 'Matupi Chin Standard Bible', language: 'hlt' },
    	'FreSegond1910': { name: "Bible Louis Segond (1910)", language: 'fr' },
    	'FreJND': { name: "Bible J.N.Darby en français", language: 'fr' },
    	'FrePGR': { name: "Bible Perret-Gentil et Rilliet", language: 'fr' },
    	'CKBOKS': { name: "وەشانی بێبەرامبەری کوردیی سۆرانیی ستاندەر", language: 'ckb' },
    	// 'GRKV': { name: "Greek LXX and NT-TR", language: 'gr' },
    };
    bible.Data.interfaceLanguages = {
    	'original': 'Hebrew/Greek',
    	'en': 'English',
    	'fa': 'Farsi',
    	'ro': 'Romanian',
    	'ar': 'Arabic',
    	'hlt': 'Matupi Chin',
    	'fr': 'French',
    	'ckb': 'Kurdi Sorani',
    	'gr': 'Greek',
    };
    
    bible.Data.verses = [
    [31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26],
    [22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38],
    [17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34],
    [54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13],
    [46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12],
    [18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33],
    [36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25],
    [22,23,18,22],
    [28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13],
    [27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25],
    [53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53],
    [18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30],
    [54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30],
    [17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23],
    [11,70,13,24,17,22,28,36,15,44],
    [11,20,32,23,19,19,73,18,38,39,36,47,31],
    [22,23,15,17,14,14,10,17,32,3],
    [22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17],
    [6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6],
    [33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31],
    [18,26,22,16,20,12,29,17,18,20,10,14],
    [17,17,11,16,16,13,13,14],
    [31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24],
    [19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34],
    [22,22,66,22,22],
    [28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35],
    [21,49,30,37,31,28,28,27,27,21,45,13],
    [11,23,5,19,15,11,16,14,17,15,12,14,16,9],
    [20,32,21],
    [15,16,15,13,27,14,17,14,15],
    [21],
    [17,10,10,11],
    [16,13,12,13,15,16,20],
    [15,13,19],
    [17,20,19],
    [18,15,20],
    [15,23],
    [21,13,10,14,11,15,14,23,17,12,17,14,9,21],
    [14,17,18,6],
    [25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20],
    [45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20],
    [80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53],
    [51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25],
    [26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31],
    [32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27],
    [31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24],
    [24,17,18,18,21,18,16,24,15,18,33,21,14],
    [24,21,29,31,26,18],
    [23,22,21,32,33,24],
    [30,30,21,23],
    [29,23,25,18],
    [10,20,13,18,28],
    [12,17,18],
    [20,15,16,16,25,21],
    [18,26,17,22],
    [16,15,15],
    [25],
    [14,18,19,16,14,20,28,13,28,39,40,29,25],
    [27,26,18,17,20],
    [25,25,22,19,14],
    [21,22,18],
    [10,29,24,21,21],
    [13],
    [14],
    [25],
    [20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,21]
    ];
    
    bible.parseReference = function(textReference) {
    
    	var bookID = -1;
    	var chapter1 = -1;
    	var verse1 = -1;
    	var chapter2 = -1;
    	var verse2 = -1;
    	var input = new String(textReference);
    
    	bookID = bible.getBookId( input )
    
    	var afterRange = false;
    	var afterSeparator = false;
    	var startedNumber = false;
    	var currentNumber = '';
    
    	for (var i = 0; i < input.length; i++) {
    		var c = input.charAt(i);
    
    		if (c == ' ' || isNaN(c)) {
    			if (!startedNumber)
    				continue;
    
    			if (c == '-') {
    				afterRange = true;
    				afterSeparator = false;
    			} else if (c == ':' || c == ',' || c == '.') {
    				afterSeparator = true;
    			} else {
    				// ignore
    			}
    
    			// reset
    			currentNumber = '';
    			startedNumber = false;
    
    		} else {
    			startedNumber = true;
    			currentNumber += c;
    
    			if (afterSeparator) {
    				if (afterRange) {
    					verse2 = parseInt(currentNumber);
    				} else { // 1:1
    					verse1 = parseInt(currentNumber);
    				}
    			} else {
    				if (afterRange) {
    					chapter2 = parseInt(currentNumber);
    				} else { // 1
    					chapter1 = parseInt(currentNumber);
    				}
    			}
    		}
    	}
    
    	// reassign 1:1-2
    	if (chapter1 > 0 && verse1 > 0 && chapter2 > 0 && verse2 <= 0) {
    		verse2 = chapter2;
    		chapter2 = chapter1;
    	}
    	// fix 1-2:5
    	if (chapter1 > 0 && verse1 <= 0 && chapter2 > 0 && verse2 > 0) {
    		verse1 = 1;
    	}
    
    	// just book
    	if (bookID > 0 && chapter1 <= 0 && verse1 <= 0 && chapter2 <= 0 && verse2 <= 0) {
    		chapter1 = 1;
    		verse1 = 1;
    	}
    
    	// validate max chapter
    	if (chapter1 == -1) {
    		chapter1 = 1;
    	} else if (chapter1 > bible.Data.verses[bookID - 1].length) {
    		chapter1 = bible.Data.verses[bookID - 1].length;
    		verse1 = 1;
    	}
    
    	// validate max verse
    	if (verse1 == -1) {
    		verse1 = 1;
    	} else if (verse1 > bible.Data.verses[bookID - 1][chapter1-1]) {
    		verse1 = bible.Data.verses[bookID - 1][chapter1-1];
    	}
    
    	// finalize
    
    	return new bible.Reference(bookID, chapter1, verse1, chapter2, verse2);
    };
    
    bible.Reference = function() {
    
    	var _bookID = -1;
    	var _chapter1 = -1;
    	var _verse1 = -1;
    	var _chapter2 = -1;
    	var _verse2 = -1;
    
    	if (arguments.length == 0) {
    		// error
    	} else if (arguments.length == 1) { // a string that needs to be parsed
    		return bible.parseReference(arguments[0]);
    	} else {
    		_bookID = arguments[0];
    		_chapter1 = arguments[1];
    		if (arguments.length >= 3) _verse1 = arguments[2];
    		if (arguments.length >= 4) _chapter2 = arguments[3];
    		if (arguments.length >= 5) _verse2 = arguments[4];
    	}
    
    	function padLeft(input, length, s) {
    		while (input.length < length)
    			input = s + input;
    		return input;
    	}
    
    	return {
    		bookID: _bookID,
    		bookName: bible.getBook( _bookID ),
    		chapter: _chapter1,
    		verse: _verse1,
    		chapter1: _chapter1,
    		verse1: _verse1,
    		chapter2: _chapter2,
    		verse2: _verse2,
    
    		isValid: false,
    
    		toString: function() {
    			if (this.bookID < 1 || this.bookID > bible.Data.books.length) return "invalid";
    
    			var b = bible.Data.books[this.bookID - 1][0] + ' ';
    
    			if (this.chapter1 > 0 && this.verse1 <= 0 && this.chapter2 <= 0 && this.verse2 <= 0) // John 1
    				return b + this.chapter1;
    			else if (this.chapter1 > 0 && this.verse1 > 0 && this.chapter2 <= 0 && this.verse2 <= 0) // John 1:1
    				return b + this.chapter1 + ':' + this.verse1;
    			else if (this.chapter1 > 0 && this.verse1 > 0 && this.chapter2 <= 0 && this.verse2 > 0) // John 1:1-5
    				return b + this.chapter1 + ':' + this.verse1 + '-' + this.verse2;
    			else if (this.chapter1 > 0 && this.verse1 <= 0 && this.chapter2 > 0 && this.verse2 <= 0) // John 1-2
    				return b + this.chapter1 + '-' + this.chapter2;
    			else if (this.chapter1 > 0 && this.verse1 > 0 && this.chapter2 > 0 && this.verse2 > 0) // John 1:1-2:2
    				return b + this.chapter1 + ':' + this.verse1 + '-' + ((this.chapter1 != this.chapter2) ? this.chapter2 + ':' : '') + this.verse2;
    			else
    				return 'unknown';
    		},
    		toOsis: function() {
    			if (this.bookID <= 0 || this.bookID > bible.Data.books.length) return "invalid";
    			return bible.Data.books[this.bookID - 1][0] + '.' + this.chapter1 + '.' + this.verse1;
    		},
    		toChapterCode: function() {
    			if (this.bookID <= 0 || this.bookID > bible.Data.books.length) return "invalid";
    			//return this.bookID.toString() + this.chapter1.toString()
    			return 'c' + padLeft(this.bookID.toString(), 3, '0') + padLeft(this.chapter1.toString(), 3, '0');
    		},
    		toVerseCode: function() {
    			if (this.bookID <= 0 || this.bookID > bible.Data.books.length) return "invalid";
    			return 'v' + padLeft(this.bookID.toString(), 3, '0') + padLeft(this.chapter1.toString(), 3, '0') + padLeft(this.verse1.toString(), 3, '0');
    		},
    		prevChapter: function() {
    			this.verse1 = 1;
    			this.chapter2 = -1;
    			this.verse2 = -1;
    			if (this.chapter1 == 1 && this.bookID > 1) {
    				this.bookID--;
    				this.chapter1 = bible.Data.verses[this.bookID - 1].length;
    			} else if ( this.chapter1 === 1 && this.bookID === 1 ) {
    				return null;
    			} else {
    				this.chapter1--;
    			}
    			this.bookName = bible.getBook( this.bookID );
    			return Object.assign( {}, this );
    		},
    		nextChapter: function() {
    			this.verse1 = 1;
    			this.chapter2 = -1;
    			this.verse2 = -1;
    			if (this.chapter1 < bible.Data.verses[this.bookID - 1].length) {
    				this.chapter1++;
    			} else if (this.bookID < bible.Data.books.length) {
    				this.bookID++;
    				this.chapter1 = 1;
    			} else {
    				return null;
    			}
    			this.bookName = bible.getBook( this.bookID );
    			return Object.assign( {}, this );
    		},
    		isFirstChapter: function() {
    			return (this.bookID == 1 && this.chapter1 ==1); //  && this.verse1 == 1);
    		},
    		isLastChapter: function() {
    			var v = bible.Data.verses[this.bookID-1];
    
    			return (this.bookID	== bible.Data.books.length &&
    				this.chapter1 == v.length);//  && 	this.verse1 == v[v.length-1]);
    		},
    		getBook: function() {
    			return bible.Data.books[ this.bookID - 1 ][ 0 ];
    		}
    	}
    };
    bible.utility = {};
    bible.getBookId = function( textReference ) {
    	var input = textReference;
    	var bookID = -1;
    	// tear off book name
    	for (var i = bible.Data.books.length - 1; i >= 0; i--) {
    		for (var j = 0; j < bible.Data.books[i].length; j++) {
    			var name = new String(bible.Data.books[i][j]).toLowerCase();
    			var possibleMatch = input.substring(0, Math.floor(name.length, input.length)).toLowerCase();
    
    			if (possibleMatch == name) {
    				bookID = i + 1;
    				input = input.substring(name.length);
    				break;
    			}
    		}
    		if (bookID > -1)
    			break;
    	}
    	return bookID;
    };
    bible.getBook = function( bookId ) {
    	return bible.Data.books[ bookId - 1][0];
    };
    
    bible.getTranslatedBookNameByLanguage = function( bookName, language ) {
    	return bible.Data.bookNamesByLanguage[ language ][ bible.getBookId( bookName ) - 1 ];
    };
    
    bible.getTranslatedBookName = function( bookName, version ) {
    	if ( ! bookName || ! version ) {
    		return 'problemo';
    	}
    	var language = bible.Data.supportedVersions[ version ].language;
    	return bible.getTranslatedBookNameByLanguage( bookName, language );
    };
    
    bible.isRtlVersion = function( version, book ) {
    	var versionLanguage = bible.Data.supportedVersions[ version ].language;
    	if ( bible.Data.rtlLanguages.indexOf( versionLanguage ) > -1 ) {
    		return true;
    	}
    	if ( versionLanguage === 'original' && book && bible.Data.otBooks.indexOf( book ) > -1 ) {
    		return true;
    	}
    };
    return bible
}
/* ********************************* */
/* ***** BIBLE VERSIONS LOADER ***** */
/* ********************************* */
let bversionName = 'KJV';
if (bv = localStorage.getItem('bversionName')) {
    bversionName = bv;
}
loadVersion(bversionName)
function loadVersion(versionName) {
    return new Promise((resolve, reject) => {
      const fullPathHead = '';
      let request_Version_URL = fullPathHead + `../bibles/${versionName}.json`;
      let bibleVersion = new XMLHttpRequest();
      bibleVersion.open('GET', request_Version_URL);
      bibleVersion.responseType = 'json';
  
      bibleVersion.onload = function () {
        let booksChaptersAndVerses = bibleVersion.response;
        let newVersion = booksChaptersAndVerses['books'];
        window[versionName] = newVersion;
        resolve();
      };
  
      bibleVersion.onerror = function () {
        reject(new Error('Failed to load Bible version.'));
      };
  
      bibleVersion.send();
    });
  }
function appendCrossReferences(e) {
    if (!e.target.matches('[bversion], #verse_crossref_button, .verse_crossref_button')&&!((e.shiftKey||e.callorigin=='x') && e.target.matches('.vmultiple .verse'))) {
        return
    }
    let eTarget;//Holds the 'ref' attribute;
    let masterVerseHolder; //For indicating if crossrefs are being shown and for finidng nextSibling to append the crossrefs to
    let refCode;
    let vHolder; // Element to append after 
    
    if(elmAhasElmOfClassBasAncestor(e.target, 'vmultiple')){
            if(e.target.matches('#verse_crossref_button')){eTarget = e.target.parentNode.parentNode;}
            else if(e.target.matches('#verse_crossref_button a')){eTarget = e.target.parentNode.parentNode.parentNode;}
            else if(e.shiftKey && e.target.matches('.vmultiple .verse')){eTarget=e.target.querySelector('code[ref]')}
            else if(e.callorigin&&e.callorigin=='x'){eTarget=e.target.querySelector('code[ref]');}
            masterVerseHolder = elmAhasElmOfClassBasAncestor(eTarget, '.vmultiple');
            refCode = eTarget.getAttribute('ref');
            let siblingCrossREF = masterVerseHolder.nextElementSibling;
        
            //Only Append Crossrefs If It Doesn't Have Already
            if (siblingCrossREF==null || siblingCrossREF==undefined || !siblingCrossREF.matches('.crossrefs')) {
                masterVerseHolder.classList.add('showing_crossref')
                vHolder = masterVerseHolder;
                if (refCode){
                    siblingCrossREF = generateCrossRefsFromRefCode(refCode);
                    if(!siblingCrossREF){return}
                    siblingCrossREF.style.zIndex = -1;
                    setTimeout(()=>{slideUpDown(siblingCrossREF)}, 1);
                    setTimeout(()=>{siblingCrossREF.scrollIntoView({behavior:"smooth",block:"nearest"})},300)
                }
            } else {
                slideUpDown(siblingCrossREF);
                setTimeout(()=>{
                    masterVerseHolder.classList.remove('showing_crossref');
                    siblingCrossREF.remove()
                }, 300);
            }
    }
    /* FOR SEARCHRESULT WINDOW */
    else if (crfnnoteHolder = elmAhasElmOfClassBasAncestor(e.target, '.crfnnote')){
        verseInSearchWindow = elmAhasElmOfClassBasAncestor(e.target, '.verse')
        refCode = verseInSearchWindow.querySelector('[ref]').getAttribute('ref');
        vHolder = e.target.parentNode;
        if(siblingCrossREF = crfnnoteHolder.querySelector('.crossrefs')){
            // If hidden show it
            if(siblingCrossREF.classList.contains('sld_up')){
                slideUpDown(siblingCrossREF, 'show')
                verseInSearchWindow.classList.add('showing_crossref')
                siblingCrossREF.scrollIntoView({behavior:"smooth",block:"nearest"});
            }
            // If showing, hide it
            else {
                slideUpDown(siblingCrossREF)
                verseInSearchWindow.classList.remove('showing_crossref')
            }
        }
        else {
            verseInSearchWindow.classList.add('showing_crossref')
            generateCrossRefsFromRefCode(refCode, 1)
            siblingCrossREF = crfnnoteHolder.querySelector('.crossrefs')
            setTimeout(()=>{slideUpDown(siblingCrossREF)},1);
        }
    }
    function generateCrossRefsFromRefCode(refCode, transition){
        // refCode, i.e., clicked verse
        refCode = refCode.replace(/(\w)\s([0-9]+)/g, '$1.$2'); //Romans 2:3==>Romans.2:3
        refCode = refCode.replace(/:/g, '.'); //Romans.2:3==>Romans.2.3

        let generatedXref;
        let crfDiv = document.createElement('DIV');
        crfDiv.classList.add('crossrefs');
        
        // if(transition){
            /* So I can get its height */
            crfDiv.style.position = 'absolute';
            crfDiv.style.opacity = 0;
        // }
        // if(transition){
            // crfDiv = vHolder.parentNode.querySelector('.crossrefs');
            crfDiv.style.position = '';
            crfDiv.style.marginTop = '-' + crfDiv.offsetHeight + 'px';
            crfDiv.classList.add('sld_up');// for the slideUpDown(elm) function
        // }
        let tskRefs=[];

        [[TSK,'TSK'],[crossReferences_fullName,'Others']].forEach(xRef=>{
            // Get crossreferences array for clicked verse
            // let crossRef = crossReferences_fullName[refCode];
            // let crossRef = TSK[refCode];
            let crossRef = xRef[0][refCode];
            currentVerseCrossRefrence=crossRef;
            if (!crossRef) {return}
            let narr=[]
            crossRef.forEach(cf=>{
                if(cf[0] instanceof Array){
                    cf.forEach((cfL1,i)=>{
                        if(i==0){narr.push(cfL1)}
                        else {
                            cfL1.forEach(cfL2=>{
                                cfL2 = refineCrossrefCode(cfL2)
                                narr.push(cfL2)
                            })
                        }
                    })
                }
                else {
                    cf = refineCrossrefCode(cf);
                    narr.push(cf)
                }
            })
            crossRef=narr;
            generatedXref = parseCrossRef(crossRef,crfDiv,xRef[1]);
        })
        return generatedXref
        function parseCrossRef(crossRef,crfDiv,sumtext) {
            let crfFrag = new DocumentFragment();
            // let details = document.createElement('DETAILS');
            // let summary = document.createElement('SUMMARY');
            // summary.innerText = sumtext;
            // details.append(summary);
            let appendSumtext=false;
            crossRef.forEach((crf,i) => {
                let divider = document.createElement('SPAN');
                if(crf instanceof Array){
                    if(i>0){
                        if (crfFrag.lastChild.nodeType === Node.TEXT_NODE) {
                            crfFrag.removeChild(crfFrag.lastChild);
                        }
                        // crfFrag.append('; ');
                        let br = document.createElement('BR');
                        crfFrag.append(br);
                    }
                    let crfSpan = document.createElement('SPAN');
                    crfSpan.innerText = crf;
                    if(sumtext=='TSK'){tskRefs.push(crf);}
                    crfSpan.style.fontStyle = 'italic';
                    crfSpan.style.fontWeight = 'bold';
                    crfSpan.classList.add('notref');
                    crfFrag.append(crfSpan);
                    divider.innerText = ': ';
                    crfFrag.append(divider);
                }
                else {
                    let unComma = crf.replace(/-/,',');
                    if(sumtext=='Others' && (tskRefs.indexOf(crf)>-1||tskRefs.indexOf(unComma)>-1)){return}
                    appendSumtext=true;
                    let crfSpan = document.createElement('SPAN');
                    crfSpan.innerText = crf;
                    if(sumtext=='TSK'){tskRefs.push(crf);}
                    crfFrag.append(crfSpan);
                    divider.innerText = '; ';
                    if(i!=crossRef.length-1){crfFrag.append(divider)}
                }
            });
            if(sumtext=='TSK'||appendSumtext==true){
                let H3 = document.createElement('H5');
                H3.innerText = sumtext;
                crfFrag.prepend(H3);
                if (crfFrag.lastChild.nodeType === Node.TEXT_NODE) {
                    crfFrag.removeChild(crfFrag.lastChild);
                }
            }
                    
            crfDiv.append(crfFrag);
            vHolder.parentNode.insertBefore(crfDiv, vHolder.nextSibling);
            
            return crfDiv
        }
    }
}
function refineCrossrefCode(cf) {
    let cfr = cf.split('.');
    let cv = cfr[0] + '.' + cfr[1] + '.'; // first bk and chpt in reference (some have two chapters)
    cf = cfr[0] + '.' + cfr[1] + '.' + cf.split(cv).join(''); // Isa.6:1-Isa.6.3 => Isa.6:1-3
    cf = cf.replace(/(\w)\.([0-9]+)/g, '$1 $2');
    cf = cf.replace(/\./g, ':');
    return cf;
}
/* ***** ************************* ***** */
/* ***** GETTING TEXT OF REFERENCE ***** */
/* ***** ************************* ***** */
/* FOR GETTING THE ACTUAL BIBLE TEXT OF A CROSS-REFERENCE */
function getCrossReference(x,bkn,bvName) {
    // x is the ref as a string or the code elm itself
    let crf2get;
    if(typeof (x)=='string'){
        crf2get = x.replace(/\s+/ig, ' ').replace(/\s*([:;,.-])\s*/ig, '$1').replace(/\bI\s/i, 1).replace(/\bII\s/i, 2).replace(/\bIII\s/i, 3).replace(/\bIV\s/i, 4).replace(/\bV\s/i, 5);
    }
    else {
            if(x.hasAttribute('ref')){
            crf2get = x.getAttribute('ref');
        }
        else if(x.matches('.reference')){
            //refine the reference
            let bkname=x.value;
            bkname.replace(/([a-zA-Z])(\d)/ig, '$1 $2'); // Rom1 => Rom 1
            let bkNchv=bkname.split(/(?<=[a-zA-Z])\s+(?=\d)/ig);// 1 Cor 2:14-16 => ['1 Cor','2:14-16']
            let bk=bkNchv[0].replace(/i\s/i, '1').replace(/ii\s/, '2').replace(/\s+/, '');
            crf2get=bk+bkNchv[1];
        }
        else {
            crf2get = x.innerText.replace(/\s+/ig, ' ').replace(/\s*([:;,.-])\s*/ig, '$1');
        }
    }
    // Requires that book name not have space: Not Valid: '1 Cor'. Valid: '1Cor'
    crf2get = crf2get.split(' ').join('.').split(':').join('.');
    let bk = crf2get.split('.')[0]
    let chp1 = Number(crf2get.split('.')[1]);
    let vrs1 = Number(crf2get.split('.')[2]);
    let chp2 = chp1;
    let vrs2 = vrs1;
    let fullBkn;
    bible.Data.books.forEach((ref_, ref_indx) => {
        if (ref_.includes(bk.toUpperCase())) {
            fullBkn = bible.Data.bookNamesByLanguage.en[ref_indx];
        }
    });
    let vHolder = new DocumentFragment();
    let br = '';
    if (crf2get.includes(',')) {
        let vrsGrpsByCommas = crf2get.split(',');
        let grp1 = vrsGrpsByCommas.shift(); // Will contain a full reference, c.g., Gen 2:16-17
        let vRange1 = verseRange(grp1);
        getVersesInVerseRange(vRange1);
        let vRanges = []; // populated by getVranges(vg)
        vrsGrpsByCommas.forEach(vg=>getVranges(vg))
        vRanges.forEach((vR,j)=>{
            br=`<hr vrange="${bk} ${chp1}:${vrsGrpsByCommas[j]}">`
            getVersesInVerseRange(vR)
        })
        function getVranges(vg){
            if(vg.split('-').length>1){ // it is a range, e.g., 5-13
                vRanges.push([Number(vg.split('-')[0]), Number(vg.split('-')[1])])
            } else { // it is a single number
                vRanges.push([Number(vg),Number(vg)])
            }
        }
    }else {
        vRange = verseRange(crf2get);
        getVersesInVerseRange(vRange);
    }
    function verseRange(crf2get){
        if (crf2get.includes('-')) { //MORE THAN ONE VERSE
            vrs1 = Number(crf2get.split('-')[0].split('.')[2]);
            let ref_secondHalf = crf2get.split('-')[1].split('.')

            //e.g., Gen.1.3-Gen.1.6
            if (ref_secondHalf.length > 1) {
                chp2 = Number(ref_secondHalf[1]);
                vrs2 = Number(ref_secondHalf[2]);
            }
            //e.g., Gen.1.3-6
            else {
                chp2 = chp1;
                vrs2 = Number(ref_secondHalf[0]);
            }
        } else {// If it is a single verse
            vrs1 = Number(crf2get.split('-')[0].split('.')[2]);
            vrs2 = vrs1;
        }
        return [vrs1,vrs2]
    }
    function getVersesInVerseRange(vRange){
        let vrs1 = vRange[0];
        let vrs2 = vRange[1];
        if(bkn){bookName=bkn;}
        let b_vn='';
        if(bvName){b_vn=`-${bvName}`;}
        let verseSpan;
        // e.g., 11-28
        if (vrs1 <= vrs2) {
            for (i = vrs1; i < vrs2 + 1; i++) {
                verseSpan = document.createElement('span');
                vNum(i);
            }
        }
        // e.g., 28-11
        else if (vrs1 > vrs2){
            for (i = vrs1; i > vrs2 - 1; i--) {
                verseSpan = document.createElement('span');
                vNum(i);
            }
        }
        function vNum(i) {
            let verseNum = document.createElement('code');
            verseNum.setAttribute('ref', fullBkn + ' ' + (chp1) + ':' + i);
            verseNum.setAttribute('aria-hidden', 'true'); //so that screen readers ignore the verse numbers
            verseNum.prepend(document.createTextNode(`[${(bk)} ${(chp1)}:${i}${b_vn}]`))
            // verseNum.title = b_v + ' ' + fullBkn + chp1 + ':' + i;
            verseSpan.classList.add('verse');
            let vText;
            if(bvName){
                // if(window[bvName]){loadVersion(bvName)}
                vText = window[bvName][fullBkn][chp1-1][i-1]
                verseSpan.classList.add('v_'+bvName);
            } else {
                // if(window[bversionName]){loadVersion(bversionName)}
                vText = window[bversionName][fullBkn][chp1-1][i-1]
                verseSpan.classList.add('v_'+bversionName);
            }
            if(vText){
                if (bible.isRtlVersion(bversionName,fullBkn)==true) {
                    verseSpan.classList.add('rtl');
                    // verseNum.prepend(document.createTextNode(`[${b_vn}${i}:${(chp1)} ${(bk)}]`));
                }
                // else{verseNum.prepend(document.createTextNode(`[${(bk)} ${(chp1)}:${i}${b_vn}]`))}
                vHolder.append(parseVerseText(vText, verseSpan));
                verseSpan.prepend(' ');
                verseSpan.prepend(verseNum);
                // if(br){
                verseSpan.innerHTML = br + verseSpan.innerHTML;
                // br = '<br>';
                br='';//Divider is only added at the start of the comma separated group, so once added, remove it
            }
        }
    }
    createTransliterationAttr(vHolder)
    return vHolder;
}
pagemaster.addEventListener('keydown',compareThisSearchVerse)
/* COMPARE THIS SEARCH VERSE */
let firstClick=false;
async function compareThisSearchVerse(e){
    if (e.button==0) {
        if (firstClick==false) {
            //Double Click on version btn will compare version
            firstClick=true;
            setTimeout(() => {
                if(firstClick){
                    firstClick=false;
                    mainBibleVersion({'target':e.target});
                    let evt = {'button':2,'target':e.target};
                    e=evt;
                    compareThisSearchVerse_innerFunc();
                }
                //Has been changed by a second click
                else if(firstClick==false) {return};
            }, 250);
        }
        //Single Click on version btn will change the version in the context menu
        else if (firstClick==true) {
            firstClick=false
            compareThisSearchVerse_innerFunc()
        }
    }
    async function compareThisSearchVerse_innerFunc() {
        if(e.button==undefined){return};//any keydown will trigger this function so ensure there is a mouse click accompanying it or it will try to load a bible version
        let dis = e.target;
        let v = dis.closest('.verse');
        let bvNme = dis.getAttribute('b_version');
    
        // Check if current Bible Version has already been compared
        if(!window[bvNme]){await loadVersion(bvNme)}
        
        // middleMouseButton or Right-click event (change the bible version)
        if (e.button==1 || (!e.ctrlKey && e.button==2)) {changeLoadedVersion(v,dis)}
        // Ctrl + Right-click (change just the verse)
        else if (e.ctrlKey && e.button==2) {changeLoadedVersion(v,dis,true)}
        // Left-click event with NO ctrlkey (show the compare verse for just this verse)
        else if (!e.ctrlKey && e.button==0) {singleVerse(v,dis)}
        // Ctrl + left-click (show all compare verses for clicked bible version)
        else if ((e.ctrlKey && e.button==0)) {
            //get all the verses in parent window
            let parentWindow = dis.closest('#context_menu');
            if(!parentWindow){parentWindow = dis.closest('#searchPreviewFixed, .compare_verses')}
            let versionCompareBtns = parentWindow.querySelectorAll('.compare_withinsearchresult_button[b_version='+bvNme+']')
            let addORremove = 'add';
            if(dis.classList.contains('green_active')){addORremove = 'remove';}// Remove all
            versionCompareBtns.forEach(cmpBtn => {
                let v = elmAhasElmOfClassBasAncestor(cmpBtn,'.verse');
                singleVerse(v,cmpBtn,addORremove)
            });
        }
    
        function changeLoadedVersion(v,dis,just1verse){
            let vParent = v.parentElement;
            let bvNme = dis.getAttribute('b_version');
            let nonCompVerses = [v];
            if (!just1verse) {
                nonCompVerses = vParent.querySelectorAll('.verse:not(.verse_compare)');//get all verses that are not compare verses
            }
            nonCompVerses.forEach(v => {
                const oldcrfnnote = v.querySelector('.crfnnote').cloneNode(true);//get the crfnnote
                oldcrfnnote.querySelector('.cbv').classList.remove('cbv');//former cbv (current bible version)
                oldcrfnnote.querySelector(`[b_version="${bvNme}"]`).classList.add('cbv');//former cbv (current bible version)
                const vccls = v.classList.contains('verse_compare');//check if v has verse_compare class
                const vref = v.querySelector('code[ref]').getAttribute('ref');
                const newVerse = createSingleVerseFromREFandVERSION(vref,bvNme);
                vccls ? newVerse.classList.add('verse_compare') : null;
                let vinfrag = newVerse.querySelector('.verse');
                vinfrag.append(oldcrfnnote)//append old crfnnote to new v
                let refcodeinv = vinfrag.querySelector('[ref]');
                refcodeinv.innerText = `(${bvNme})${refcodeinv.innerText}`;//add version to reference text
                vParent.insertBefore(newVerse, v)//replace old v with new verse
                transliteratedWords_Array.forEach(storedStrnum=>{showTransliteration(storedStrnum,vParent)});
                
                // prevent contextmenu on strong's word in new verse
                vParent.classList.add('ignorecmenu');
                setTimeout(() => {vParent.classList.remove('ignorecmenu');}, 150);
                v.remove()//remove old verse 
                //If it is context menu, replace the version name of the reference
                if((!just1verse && vParent.closest('#context_menu')) || !vParent.querySelector(`.verse:not(.verse_compare):not(.v_${bvNme})`)){
                    let cmtitlebarTextNode = context_menu.querySelector('.cmtitlebar').childNodes[0];
                    cmtitlebarTextNode.textContent = cmtitlebarTextNode.textContent.replace(/\s*\[[^\]]+\]/,` [${bvNme}]`)
                }
                //change the general book version
                if (!just1verse) {
                    bversion=bvNme;
                    bversionName=bvNme;
                }
            });
        }
        function singleVerse(v,dis2,addORremove){
            let vref = v.querySelector('code[ref]').getAttribute('ref');
            let bvNme = dis2.getAttribute('b_version');
            let vrefModified = vref.replace(/[:.]+/,'_');
    
            // Check if current Bible Version has already been compared
            const prevComparedVerse = v.parentElement.querySelector('.verse_compare[ref="' + vrefModified + ' ' + bvNme + '"]')
            if(((addORremove && addORremove=='remove') || !addORremove) && prevComparedVerse){
                if(addORremove && addORremove=='add'){return}
                prevComparedVerse.remove();
                dis2.classList.remove('green_active');
                if(!v.nextElementSibling || !v.nextElementSibling.matches('.verse_compare')){v.classList.remove('vrs_bein_comp')};
                return
            } else if(addORremove && addORremove=='remove'){return}
    
            let newVerse = createSingleVerseFromREFandVERSION(vref, bvNme);
            let newVerseInner = newVerse.querySelector('.verse');
            newVerseInner.prepend(createNewElement('button','.closebtn','.cmenu_closebtn', '[onclick=removeCompareVerse(this)]'));
            newVerseInner.classList.add('verse_compare');
            newVerseInner.setAttribute('ref', vrefModified + ' ' + bvNme);
            newVerseInner.querySelector('code[ref]').innerText=newVerseInner.querySelector('code[ref]').innerText.replace(/\[/,`[${bvNme} `);
            insertElmAafterElmB(newVerse, v);
            transliteratedWords_Array.forEach(storedStrnum=>{showTransliteration(storedStrnum/* ,tElm */)});
            dis2.classList.add('green_active');
            v.classList.add('vrs_bein_comp');
            if(v.matches('.displaynone')){newVerseInner.classList.add('displaynone')}
        }
        function createSingleVerseFromREFandVERSION(vref, bvNme) {
            let vrefObj = breakDownRef(vref);
            let new_bk = vrefObj.bn;
            let new_chp = vrefObj.bc;
            let new_vn = vrefObj.cv;
            let fullBkn = fullBookName(new_bk).fullBkn;
            newRef2get = `${new_bk} ${new_chp}:${new_vn}`;
            let newVerse = createSingleVerse(new_bk, new_chp, new_vn, fullBkn, bvNme);
            createTransliterationAttr(newVerse);
            return newVerse;
        }
    }
}
/* GETTING PREVIOUS OR NEXT VERSE */
function cmenu_goToPrevOrNextVerse(prvNxt, searchWindowVerse){
    let new_bk,new_chp,new_vn,fullBkn,b_version_n;
    let allcmVerses;
    let isC=0;
    if (!searchWindowVerse) {
        allcmVerses = context_menu.querySelectorAll('.verse:not(.verse_compare)');
        searchWindowVerse = context_menu;
        isC=1;
    } else {
        allcmVerses = searchWindowVerse;
    }
    /* replace the topmost verse */
    let v;
    
    if (prvNxt=='prev') {
        v = allcmVerses[0];
        let vref = v.querySelector('code[ref]').getAttribute('ref');
        let vrefObj = breakDownRef(vref);
        let newRef2get;
        /* Not the First Verse */
        if(vrefObj.cv>1){
            new_bk=vrefObj.bn;
            new_chp=vrefObj.bc;
            new_vn=vrefObj.cv-1;
            fullBkn=fullBookName(new_bk).fullBkn;
            newRef2get=`${new_bk} ${new_chp}:${new_vn}`;
        }
        /* *********************** IF FIRST VERSE ********************** */
        /* Go to last verse in previous chapter if it is not chapter one */
        /* ************************************************************* */
        else if(vrefObj.cv==1 && vrefObj.bc>1){
            new_bk=vrefObj.bn;
            new_chp=vrefObj.bc-1;
            new_vn=lastVerseInPrevChpt(new_chp);
            fullBkn=fullBookName(new_bk).fullBkn;
            newRef2get=`${new_bk} ${new_chp}:${new_vn}`;
        }
        /* **************** IF FIRST CHAPTER *************** */
        /* Go to last verse in last chapter of previous book */
        /* ************************************************* */
        else if(vrefObj.cv==1 && vrefObj.bc==1){
            let prvBk;
            let bkIndx=fullBookName(vrefObj.bn).bkIndex;
            if (bkIndx>1) {// Not Genesis
                prvBk=bible.Data.bookNamesByLanguage.en[bkIndx-1];
                bkIndx=bkIndx-1
            } else {return}
            let lastChptInBk = bible.Data.verses[bkIndx].length;
            let lastVerseInlastChptInBk = bible.Data.verses[bkIndx][lastChptInBk-1];
            new_bk=prvBk;
            new_chp=lastChptInBk;
            new_vn=lastVerseInlastChptInBk;
            fullBkn=fullBookName(new_bk).fullBkn;
            newRef2get=`${new_bk} ${new_chp}:${new_vn}`;
        }
        function lastVerseInPrevChpt(chpt){
            return bible.Data.verses[fullBookName(vrefObj.bn).bkIndex][chpt-1]
        }
    }
    else if(prvNxt=='next'){
        v = allcmVerses[allcmVerses.length-1];
        let vref = v.querySelector('code[ref]').getAttribute('ref');
        let vrefObj = breakDownRef(vref);
        let currentBookIndx = fullBookName(vrefObj.bn).bkIndex;
        let lastVerseInChapter=bible.Data.verses[currentBookIndx][vrefObj.bc-1];
        let lastChapterInBook=bible.Data.verses[currentBookIndx].length;
        /* ************************************************* */
        /* ******* Go to the next verse in chapter  ******** */
        /* ******* If Not the Last Verse in Chapter ******** */
        /* ************************************************* */
        if(vrefObj.cv < lastVerseInChapter){
            new_bk=vrefObj.bn;
            new_chp=vrefObj.bc;
            new_vn=vrefObj.cv+1;
            fullBkn=fullBookName(new_bk).fullBkn;
        }
        /* ************************************************ */
        /* ******* Go to first verse in next chapter ****** */
        /* If this is the last verse in the current chapter */
        /* ************************************************ */
        else if(vrefObj.cv == lastVerseInChapter){
            if(vrefObj.bc < lastChapterInBook){
                new_bk=vrefObj.bn;
                new_chp=vrefObj.bc+1;
                new_vn=1;
                fullBkn=fullBookName(new_bk).fullBkn;
            }
            /* Go to the next book */
            else if(vrefObj.bc == lastChapterInBook){
                let nextBookIndx = currentBookIndx + 1;
                // If it is not Revelation
                if (nextBookIndx < 65) {
                    new_bk=bible.Data.bookNamesByLanguage.en[nextBookIndx];
                    new_chp=1;
                    new_vn=1;
                    fullBkn=fullBookName(new_bk).fullBkn;
                }
                else {return}
            }
        }
    }
    b_version_n=Array.from(v.classList).find(c=>c.startsWith('v_')).replace(/v_/,'');
    if(!b_version_n){b_version_n=bversionName}
    let newVerseDocFrag=createSingleVerse(new_bk,new_chp,new_vn,fullBkn,b_version_n);
    createTransliterationAttr(newVerseDocFrag);
    /* ************ */
    /* Add CrossRef */
    /* ************ */
    let tskHolder=crfnnote_DIV(newVerseDocFrag);
    if(isC&&!context_menu.matches('.showingXref')){
        tskHolder.classList.add('displaynone');
        context_menu.classList.remove('showingXref');
    }
    newVerse=newVerseDocFrag.querySelector('span.verse');
    newVerse.append(tskHolder);
    /* Copy all the classes of the former verse */
    newVerse.setAttribute('class',v.getAttribute('class'));
    if(newVerse.classList.contains('verse_compare')){
        let vrefModified = newVerse.querySelector('code[ref]').getAttribute('ref').replace(/[:.]+/,'_');
        newVerse.setAttribute('ref', vrefModified + ' ' + b_version_n);
        newVerse.querySelector('code[ref]').innerText=newVerse.querySelector('code[ref]').innerText.replace(/\[/,'['+b_version_n+' ');
        newVerse.prepend(createNewElement('button','.closebtn','#cmenu_closebtn', '[onclick=removeCompareVerse(this)]'));
    }
    if (prvNxt=='prev') {
        // Prepend New Verse Above Highest Verse
        insertElmAbeforeElmB(newVerseDocFrag, v);
        // Remove the Last Vere in the ContextMenu
        let lastVerse=allcmVerses[allcmVerses.length-1];
        // Remove all verse_compare that are attached to the verse to be removed
        if(isC){
            while(lastVerse.nextElementSibling && lastVerse.nextElementSibling.matches('.verse_compare')){lastVerse.nextElementSibling.remove()}
        }
        lastVerse.remove();
    }
    else if(prvNxt=='next'){
        let w=v;
        // Append New Verse After Lowest Verse
        if(isC){
            while(w.nextElementSibling && w.nextElementSibling.matches('.verse_compare')){w=w.nextElementSibling}
        }
        insertElmAafterElmB(newVerse, w);
        /* // Shift all the verses upwards avoiding the .verse_compare
        allcmVerses.forEach((vrs,i) => {
            if (i > 0) {
                let existingNode=allcmVerses[i-1];
                existingNode.parentElement.insertBefore(vrs.cloneNode(true), existingNode.nextElementSibling)
                vrs.remove();
            }
        }); */
        // Remove the first Vere in the ContextMenu
        let firstVerse=allcmVerses[0];
        // Remove all verse_compare that are attached to the verse to be removed
        if(isC){
            while(firstVerse.nextElementSibling && firstVerse.nextElementSibling.matches('.verse_compare')){firstVerse.nextElementSibling.remove()}
        }
        firstVerse.remove();
    }
    /* ************************* */
    /* Show Transliterated Words */
    /* ************************* */
    transliteratedWords_Array.forEach(storedStrnum=>{showTransliteration(storedStrnum/* ,searchWindowVerse */)});
    // createTransliterationAttr(newVerse)
}
function createSingleVerse(bk,chp,vn,fullBkn,bversionName){
    let vHolder = new DocumentFragment();
    let verseNum = document.createElement('code');
    let verseSpan = document.createElement('span');
    let vText;
    verseNum.setAttribute('ref', fullBkn + ' ' + (chp) + ':' + vn);
    verseNum.setAttribute('aria-hidden', 'true'); //so that screen readers ignore the verse numbers
    // Get BookName Abreviation
    let bkShort = bible.Data.books[bible.Data.bookNamesByLanguage.en.indexOf(fullBkn)][1];
    bkShort=bkShort.toLowerCase().replace(/[0-9]*\s*([a-z])/, (v)=>{return v.toUpperCase()})
    verseNum.prepend(document.createTextNode(`[${(bkShort)} ${(chp)}:${vn}]`));
    verseSpan.classList.add('verse');
    if(!window[bversionName]){loadVersion(bversionName);};
    vText = window[bversionName][fullBkn][chp - 1][vn - 1];
    verseSpan.classList.add('v_'+bversionName);
    if (bible.isRtlVersion(bversionName,fullBkn)==true) {
        verseSpan.classList.add('rtl');
        // verseNum.prepend(document.createTextNode(`[${vn}:${(chp)} ${(bkShort)}]`));
    }
    // else{verseNum.prepend(document.createTextNode(`[${(bkShort)} ${(chp)}:${vn}]`))}
    vHolder.append(parseVerseText(vText, verseSpan));
    verseSpan.prepend(' ');
    verseSpan.prepend(verseNum);
    // createTransliterationAttr(vHolder)
    return vHolder
}
/* ******************************************************** */
/* CONVERT REFERENCES & STRONGS NUMBERS TO CLICKABLE FORMAT */
/* ******************************************************** */
replaceAllStrongsAndRefs()
function replaceAllStrongsAndRefs(xtx) {
    function generateRefsInNote(txt,shortForm='false'){
        let bdb=bible.Data.books;
        let preferredBKabrv;
        let orderOfarray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,61,62,63,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,64,65];//because of Joh (42) and I Joh (61,62,63) conflict
        for(let k=0;k<orderOfarray.length;k++){//loop through all the arrays of book names and their abbreviations
            let i = orderOfarray[k];
            const bkMatchFound=bdb[i].some((bkNabrv) => {
                let rgx = new RegExp(`${bkNabrv}`, 'i');
                return txt.match(rgx)
            });
            if(bkMatchFound){//check if any of the names in the array matches
                preferredBKabrv=bdb[i][1];//NOT USED: if there is a match, pick the second name which is the preferred abbreviation
                for(let j=0;j<bdb[i].length;j++){
                    let bkName2find=bdb[i][j];
                    txt = findAndIndicateScriptureRefs(txt,bkName2find);
                }
            }
        }
        // Indicate strongs numbers
        // txt = txt.replace(/((H|G)[0-9]+)/g, '<span class="strnum $1 vnotestrnum" strnum="$1">$1</span>')
        txt = txt.replace(/((H|G)[0-9]+)(?![^<]*<\/span>)|(<span[^>]*strnum="[^"]*">[^<]*<\/span>)/g, function(match, p1, p2, p3) {
            if (p3) {
              return p3; // If it's an existing <span> with strnum, keep it unchanged
            } else {
              return `<span class="strnum ${p1} vnotestrnum" strnum="${p1}">${p1}</span>`;
            }
          });
        /* WRAP SCRIPTURE REFERENCES FOR RIGHT-CLICKING */
        function findAndIndicateScriptureRefs(txt,bkName2find){
            // Wrap scripture references in spans
            txt = txt.replace(/([0-9]+)\s*([,-:])\s*([0-9]+)/g, '$1$2$3')//remove undesired spaces
            txt = txt.replace(/([0-9]+)\s*([;])/g, '$1$2')//remove undesired spaces
            // prevent it from converting references in img tags--(?<!notes_img\/)
            // let newBkReg = new RegExp(`\\b((?<![notes_img|(span ref=")]\/)${bkName2find})((\\s*\\d+[:.]\\d+([-]\\d+)*([,]*\\d+([-]\\d+)*)*;*)+)`, 'ig');
            let newBkReg = new RegExp(`(?<!ref="${bkName2find}\\.\\d+\\.\\d+([-,]\\d+)*">)\\b((?<!notes_img\/)${bkName2find})((\\s*\\d+[:.]\\d+([-]\\d+)*([,]*\\d+([-]\\d+)*)*;*)+)`, 'ig');
            // Make sure bkName2find is not preceded by ref="${bkName2find}\\.\\d+\\.\\d+">
            txt = txt.replace(newBkReg, function (x) {
                let xSplit = x.split(';');
                newBkReg2 = new RegExp(`(?<!span ref=")${bkName2find}`,'i');
                if(xSplit.length>1){
                    let refWithName = xSplit.shift();
                    refWithName = shortenedBookName(refWithName);
                    let bkn = refWithName.match(/[iI0-9]*\s*([a-zA-Z]+\s*)/)[0].trim();
                    let rtxt = `<span ref="${refWithName.split(' ').join('.').split(':').join('.')}">${refWithName}</span>` + xSplit.map(y => `; <span bkn="${bkn}" ref="${bkn}.${y.trim().split(':').join('.')}">${y}</span>`).join('')
                    return rtxt
                }
                else{
                    let refWithName = xSplit.shift();
                    refWithName = shortenedBookName(refWithName);
                    let rtxt = `<span ref="${refWithName.split(' ').join('.').split(':').join('.')}">${refWithName}</span>`
                    return rtxt
                }
            })
            txt = modifyQuotationMarks(txt);
            return txt
    
            function shortenedBookName(refWithName) {
                if (shortForm) {
                    refWithName = refWithName.replace(/(\w+)\s*(\d+)\s*(:)\s*(\d+)/ig, '$1 $2$3$4')//Replace name ensure space between name and chapter number
                    refWithName = refWithName.replace(newBkReg2, preferredBKabrv).toLowerCase().replace(/\b\d*\s*(\w)/g, function (match) {
                        return match.toUpperCase();
                    });
                }
                return refWithName.replace(/\bSOS\b/gi,'SoS').replace(/\bJb\b/gi,'Job');
            }
        }
        return txt
    }
    const textNodesArray = []
    function modifyReferencesANDstrongsNumbers(node) {
        /* ************************************************ */
        /* LOOP THROUGH ALL TEXTNODES IN GIVEN ELEMENT/BODY
            to avoid overiding eventListners on elements */
        /* ************************************************ */
        if (node.nodeType === Node.TEXT_NODE) {
            textNodesArray.push(node)
        } else {
          const children = node.childNodes;
          for (let i = 0; i < children.length; i++) {
              modifyReferencesANDstrongsNumbers(children[i])
            }
        }
    }
    if(!xtx){xtx=document.body}
    modifyReferencesANDstrongsNumbers(xtx)
    textNodesArray.forEach(txtnode => {
        const parentElement = txtnode.parentNode;
        if (parentElement && !parentElement.matches('span[ref]')) {
            const tempDiv = document.createElement('DIV')
            tempDiv.innerHTML = generateRefsInNote(txtnode.textContent);
            parentElement.insertBefore(tempDiv,txtnode)
            txtnode.remove()
            tempDiv.outerHTML = tempDiv.innerHTML
        }
    });
}

/* *********************************** */
/* Change Verse on Scroll Over CodeRef */
/* *********************************** */
document.body.addEventListener("wheel",wheelDirection,{passive:false});
function wheelDirection(e) {
    // VERSE(S) IN CONTEXTMENU
    if(e.target.matches('#context_menu:not([strnum]) .verse:not(.verse_compare) code[ref]')){
        e.preventDefault();
        if(e.deltaY<0){cmenu_goToPrevOrNextVerse('prev')}
        else if(e.deltaY>0){cmenu_goToPrevOrNextVerse('next')}
    }
    // VERSE (SINGLE) IN SEARCH WINDOW OR TRANSLATION_COMPARE
    else if(e.target.matches('#searchPreviewFixed > .verse code[ref], #context_menu:not([strnum]) .verse.verse_compare code[ref], #scriptureCompare_columns_holder .verse.verse_compare code[ref]')){
        e.preventDefault();
        let targetVerseInsearchWindow = [elmAhasElmOfClassBasAncestor(e.target,'.verse')];
        if(e.deltaY<0){cmenu_goToPrevOrNextVerse('prev',targetVerseInsearchWindow)}
        else if(e.deltaY>0){cmenu_goToPrevOrNextVerse('next',targetVerseInsearchWindow)}
    }
    // VERSE (ONE OR MORE) IN COMPARE SECTION
    else if(e.target.matches('#scriptureCompare_columns_holder .verse code[ref]')){
        e.preventDefault();
        let parentCopareVersesDiv = e.target.closest('.compare_verses');
        let allVersesInCompareDiv = parentCopareVersesDiv.querySelectorAll('.verse')
        let targetVerseInsearchWindow = allVersesInCompareDiv;
        if(e.deltaY<0){cmenu_goToPrevOrNextVerse('prev',targetVerseInsearchWindow)}
        else if(e.deltaY>0){cmenu_goToPrevOrNextVerse('next',targetVerseInsearchWindow)}
    }
}
/* ************************** */
/* FOR VERSE COMPARE CLOSEBTN */
/* ************************** */
function removeCompareVerse(dis){
    let v_c = dis.parentElement;
    let vCl=Array.from(v_c.classList).find(c=>c.startsWith('v_')).replace(/v_/,'');
    let v_origin=v_c.previousElementSibling;
    let v_cps=v_origin;
    while (v_cps && v_cps.matches('.verse')) {
        if(v_cps.querySelector(`[b_version=${vCl}].green_active`)){v_origin=v_cps; break}
        else{v_cps=v_cps.previousElementSibling}
    }
    v_origin.querySelector(`button.compare_withinsearchresult_button[b_version=${vCl}]`).classList.remove('green_active');
    v_c.remove();// remove comp verse
}
function elmAhasElmOfClassBasAncestor(a, ancestorsClass, limit = 'BODY') {
    while (a.parentElement && a.parentElement.tagName.toUpperCase() != limit) {
        if (a.parentElement.classList.contains(ancestorsClass) || a.parentElement.matches(ancestorsClass)) {
            return a.parentNode
        }
        a = a.parentElement;
    }
    return false
}
/* ********************************************* */
/*              Scripture Reference              */
/* ********************************************* */
/* ********************************************* */
// function codeElmRefClick(e) {
//     if (e.target.tagName == "CODE" && !e.target.matches('.cmtitlebar>code')) {
//         let codeElm = e.target;
        
//         // If it is the verseNotePage and not the index.html.
//         if(document.querySelector('body').matches('#versenotepage')){
            
//             let col2 = document.querySelector('#col2');
//             col2.innerHTML = `<div id="context_menu" class="context_menu slideoutofview"></div><details open><summary><div class='openCloseIconHolder'></div><h1 class="win2_bcv_ref">${codeElm.getAttribute('ref')}</h1></summary><div class="win2_noteholder"><em>loading...</em></div></details>`;
            
//             win2_noteholder = col2.querySelector('.win2_noteholder')

//             let refDetails = refDetails4rmCodeElm(codeElm);
//             // clog({bN, bC, cV,win2_noteholder})
//             bN = refDetails.bookName;
//             bC = refDetails.bookChapter;
//             cV = refDetails.chapterVerse;
//             bookName = bN;
//             chapternumber = bC;
//             verseNumber = cV;
//             readFromVerseNotesFiles(bN, bC, cV,win2_noteholder)
//         }
//         else{
//             gotoRef(codeElm.getAttribute('ref'))
//         }
//         e.preventDefault();
//     }
// }
function refDetails4rmCodeElm(codeElm){
    let bC=codeElm.getAttribute('chpt').trim();
    let bkNvrs=codeElm.getAttribute('ref').split(' ' + bC + ':');
    let bN=bkNvrs[0].trim();
    let cV=bkNvrs[1].trim();
    return {
        bookName:bN,
        bookChapter:bC,
        chapterVerse:cV
    }
}
function breakDownRef(ref){
    ref=ref.replace(/\s+/ig,' ').replace(/\s*([:;,.-])\s*/ig,'$1').replace(/\bI\s/i,1).replace(/\bII\s/i,2).replace(/\bIII\s/i,3).replace(/\bIV\s/i,4).replace(/\bV\s/i,5);
    ref=ref.replace(/:([0-9]+)/,'.$1').replace(/(\w)[\s*]([0-9]+)/,'$1.$2').split('.');
    let bn=ref[0];
    let bc=Number(ref[1]);
    let cv=Number(ref[2]);
    return {bn,bc,cv}
}
function fullBookName(bkn) {
    let fullBkn;
    let bkIndex;
    bible.Data.books.forEach((bkAbrv, ref_indx) => {
        if (bkAbrv.includes(bkn.toUpperCase())) {
            fullBkn = bible.Data.bookNamesByLanguage.en[ref_indx];
            bkIndex = ref_indx;
        }
    });
    return {fullBkn, bkIndex}
}

/* ***** ******* ***** **** ***** */
/* ***** PARSING VERSE TEXT ***** */
/* ***** ******* ***** **** ***** */
let currentlyParsedVersion = null;
let versionWithRedWordsArray = [];

function parseVerseText(vT, verseSpan) {

    if (Array.isArray(vT)) {
        previousVT=vT;
        vTLength = Object(vT).length;
        let redWordFRAG, redWordSpan, startRed, endRed, restartRed, italicStart=false, italicEnd=true;
        let italicElm;
        vT.forEach((wString, i) => {
            let wordSpan = document.createElement('span');
            let wordSpan1 = document.createElement('span');
            let wordSpan2 = document.createElement('span');
            // For making words of Christ red, for versions that have it, e.g., WEB. (The WEB translation however has issues so I do not use it)
            if (/^""/.test(wString[0]) || (restartRed && versionWithRedWordsArray.includes(currentlyParsedVersion))) {
                startRed = true;
                redWordFRAG = new DocumentFragment()
                redWordSpan = document.createElement('span');
                redWordSpan.classList.add('red');
                /* To ensure it only applies the red word span accross multiple verses for the same translation */
                if (!versionWithRedWordsArray.includes(currentlyParsedVersion)) {
                    versionWithRedWordsArray.push(currentlyParsedVersion);
                }
            };
            if (/""$/.test(wString[0])) {
                endRed = true;
                removeItemFromArray(currentlyParsedVersion, versionWithRedWordsArray)
            };

            if (wString.length == 3) {
                if (wString[2].includes('/')) { //For words such as ["וְ/כָל","Hc/H3605","HC/Ncmsc"]
                    let splt_L = wString[2].split('/');
                    wordSpan1.setAttribute('TH', splt_L[0]);
                    wordSpan2.setAttribute('TH', splt_L[1]);
                } else {
                    wordSpan.setAttribute('TH', wString[2]);
                }
            }
            if (wString.length >= 2) {
                if (wString[0].includes('/')) { //For words such as ["וְ/כָל","Hc/H3605","HC/Ncmsc"]
                    let splt_L = wString[0].split('/')

                    wordSpan1.classList.add('translated');
                    wordSpan1.setAttribute('data-xlit', "");
                    wordSpan1.setAttribute('data-lemma', "");
                    wordSpan1.setAttribute('strnum', wString[1].split('/')[0]);
                    wordSpan1.setAttribute('data-kjv-trans', ' ' + splt_L[0]);
                    wordSpan1.setAttribute('translation', ' ' + splt_L[0]);
                    wordSpan1.innerHTML = splt_L[0];
                    versespanAppender([' ', wordSpan1]);

                    wordSpan2.classList.add('translated');
                    wordSpan2.setAttribute('data-xlit', "");
                    wordSpan2.setAttribute('data-lemma', "");
                    wordSpan2.setAttribute('strnum', wString[1].split('/')[1]);
                    wordSpan2.setAttribute('data-kjv-trans', ' ' + splt_L[1]);
                    wordSpan2.setAttribute('translation', ' ' + splt_L[1]);
                    wordSpan2.innerHTML = splt_L[1];
                    versespanAppender([wordSpan2]);
                } else {
                    // The actual translated text
                    wStringREGEXED = wString[0];
                    italicsStartnEnd(wStringREGEXED)
                    wStringREGEXED = wStringREGEXED.replace(/\{/g, '<sup>');
                    wStringREGEXED = wStringREGEXED.replace(/\}/g, '</sup>');
                    wStringREGEXED = wStringREGEXED.replace(/(^"")|(^")/g, '“');
                    wStringREGEXED = wStringREGEXED.replace(/(""$)|"$/g, '”');
                    
                    // Create its "SPAN" container and set attributes as needed 
                    if (wString[1] != 'added') {//If it has an actual strongs number
                        wordSpan.classList.add('translated');
                        wordSpan.setAttribute('data-xlit', "");
                        wordSpan.setAttribute('data-lemma', "");
                        wordSpan.setAttribute('strnum', wString[1]);
                        // wordSpan.classList.add(wString[1]);
                        wordSpan.setAttribute('data-kjv-trans', ' ' + wStringREGEXED);//add the actual translation as an attribute
                        wordSpan.setAttribute('translation', ' ' + wStringREGEXED);//add the actual translation as an attribute
                        // If it is a Title to a Psalm (**they are in italics in the original document, ABP in particular)
                        if(italicStart==true && italicEnd==false){
                            wordSpan.classList.add('em');
                        }
                        if(italicStart==true && italicEnd==true){
                            italicStart=false;
                            // console.log(wStringREGEXED)
                            wordSpan.classList.add('em');
                            wStringREGEXED=wStringREGEXED+'<hr>'
                        }
                    }

                    // Add the text to the "SPAN" element
                    wordSpan.innerHTML = wStringREGEXED;
                    // Add the "SPAN" element with text in it to the current verse
                    versespanAppender([' ', wordSpan]);
                }
            }
            if (wString.length == 1) {
                let spacebtwwords = ' ';
                // Check if last string of string is a punctuation that should be followed by a space
                if (([".", ",", ":", ";", "?", "]", ")"].includes(wString[0][0]) == true)) {
                    spacebtwwords = '';
                }

                if (wString[0].match(/\{\d\}/)) {// ABP word order number
                    spacebtwwords = ' ';
                    wStringREGEXED = wString[0];
                    wStringREGEXED = wStringREGEXED.replace(/\{/g, '<sup>');
                    wStringREGEXED = wStringREGEXED.replace(/\}/g, '</sup>');
                    verseSpan.append(' ');

                    verseSpan.innerHTML=verseSpan.innerHTML+wStringREGEXED;
                } else {
                    wStringREGEXED = wString[0];
                    //Opening and closing quotations marks
                    wStringREGEXED = wStringREGEXED.replace(/(^"")|(^")/g, '“');
                    wStringREGEXED = wStringREGEXED.replace(/(""$)|"$/g, '”');
                    italicsStartnEnd(wStringREGEXED)
                    if(italicStart==true && italicEnd==false){
                        // console.log('italicsStartnEnd')
                        wordSpan.append(wStringREGEXED);
                        wordSpan.classList.add('em');
                    }
                    if(italicStart==true && italicEnd==true){
                        italicStart=false;
                        wStringREGEXED = wStringREGEXED.replace(/<ii>/g, '')
                        wordSpan.append(wStringREGEXED);
                        wordSpan.append(document.createElement('hr'));
                        wordSpan.classList.add('em');
                        wStringREGEXED=wordSpan;
                    }
                    if (startRed) {
                        redWordFRAG.append(spacebtwwords);
                        redWordFRAG.append(wStringREGEXED);
                        // redWordFRAG.innerHTML=redWordFRAG.innerHTML+wStringREGEXED;
                    } else {
                        verseSpan.append(spacebtwwords);
                        verseSpan.append(wStringREGEXED);
                        // verseSpan.innerHTML=verseSpan.innerHTML+wStringREGEXED;
                    }
                }
                
            }
            verseSpan.innerHTML = verseSpan.innerHTML.replace(/<\/sup> /g, '</sup>').replace(/(([\(\[])\s*)/g, '$2').replace(/NaN/g, '');
        });
        function italicsStartnEnd(wStringREGEXED){
            italicStart
            italicEnd
            if((italicStart==false)&&(/<i>/i.test(wStringREGEXED))){
                // console.log('emS')
                italicStart=true;
                italicEnd=false;
                wStringREGEXED = wStringREGEXED.replace(/<i>/g, '');
            }
            if(/<ii>/i.test(wStringREGEXED)){
                // console.log('emE')
                // console.log(wStringREGEXED)
                italicEnd=true;
                wStringREGEXED = wStringREGEXED.replace(/<ii>/g, '');
                // console.log(wStringREGEXED)
            }
        }
        function versespanAppender(arr) {
            if (redWordFRAG) {
                arr.forEach(a => {
                    redWordFRAG.append(a)
                })
                restartRed = false;
                if (endRed || i == vTLength - 1) {
                    redWordSpan.append(redWordFRAG);
                    verseSpan.append(redWordSpan);
                    endRed = null;
                    startRed = null;
                    if (i == vTLength - 1) {
                        restartRed = true;
                    }
                }
            } else {
                arr.forEach(a => {
                    verseSpan.append(a)
                })
            }
        }
    } else {
        // if (/'missing'/.test(vT)){// console.log(vT)}
        vT = vT.replace(/<hi type="bold">/g, '<span class="b">');
        vT = vT.replace(/<hi type="italic">/g, '<span class="i">');
        vT = vT.replace(/<\/hi>/g, '</span>');
        vT = vT.replace(/<ptitle>/g, '<span class="em">');
        vT = vT.replace(/<\/ptitle>/g, '</span><hr>');
        // vT = vT.replace(/^""/g, '<span class="red">');
        // vT = vT.replace(/""/g, '</span>');
        vT = modifyQuotationMarks(vT);
        vT = vT.replace(/ ,/g, ',');
        verseSpan.innerHTML = vT;
    }
    
    return verseSpan;
}
/* FOR CROSS-REFS & NOTES IN SEARCH WINDOW */
function crfnnote_DIV(vHolder){
    let crfnnote_DIV = document.createElement('DIV');
    crfnnote_DIV.classList.add('crfnnote');
    const tskBtn = '<button class="buttons verse_crossref_button">TSK</button>';
    let compareBtn='';
    bibleversions_Array.forEach(bversion => {
        bclass = 'class="buttons compare_withinsearchresult_button"'
        if (bversion==bversionName) {
            bclass = 'class="buttons cbv compare_withinsearchresult_button"'
            bversion=`${bversionName}`
        }
        compareBtn += `<button ${bclass} onmouseup="compareThisSearchVerse(event)" b_version="${bversion}">${bversion}</button>`;
    });
    // const noteBtn = '<button class="buttons verse_notes_button">Note</button>';
    const noteBtn = '';
    
    if (vHolder && crossReferences_fullName[vHolder.querySelector('code[ref]').getAttribute('ref').replace(/(\w)\s([0-9]+)/g, '$1.$2').replace(/:/g, '.')]) {
        crfnnote_DIV.innerHTML = `<div class="crfnnote_btns">${tskBtn}${noteBtn}${compareBtn}</div>`;
    } else if (vHolder){
        crfnnote_DIV.innerHTML = `<div class="crfnnote_btns" title="Not Crossreferenced"><button class="verse_crossref_button" style="font-size:0.55em;color:red;font-style:italic;">NO TSK</button>${noteBtn}${compareBtn}</div>`;
    } else {
        crfnnote_DIV.innerHTML = `<div class="crfnnote_btns">${tskBtn}${noteBtn}${compareBtn}</div>`;
    }
    // if(vHolder){vHolder.classList.add('verse');}
    return crfnnote_DIV
}
/* **** ********** ********* ***** */
/* **** STYLESHEET MODIFIERS ***** */
/* **** ********** ********* ***** */
//STYLE SHEET MODIFIER
function findCSSRule(mySheet, selector) {
    mySheet=mySheet.sheet;
    let ruleIndex = -1; // Default to 'not found'
    let theRules = mySheet.cssRules ? mySheet.cssRules : mySheet.rules;
    for (i = 0; i < theRules.length; i++) {
        if (theRules[i].selectorText == selector) {
            ruleIndex = i;
            break;
        }
    }
    return ruleIndex;
}
//Random color Alternative
//+'#' + (0x1220000 + Math.random() * 0xFF00FF).toString(16).substr(1,6);
function createNewStyleSheetandRule(styleID, styleRule) {
    if (!document.getElementsByTagName('head')[0].querySelector('#' + styleID)) {
        addNewStyle()
    } else {
        document.getElementsByTagName('head')[0].querySelector('#' + styleID).remove();
        addNewStyle()
    }

    function addNewStyle() {
        let headPart = document.getElementsByTagName('head')[0];
        newStyleInHead = document.createElement('style');
        newStyleInHead.id = styleID;
        newStyleInHead.innerHTML = styleRule;
        headPart.append(newStyleInHead);
    }
}

function addRemoveRuleFromStyleSheet(CS_rule, ruleSelector, targetStyleSheet) {
    let highlightStrongsSheet = targetStyleSheet.sheet;
    let allRules = highlightStrongsSheet.cssRules;
    for (let i = 0; i < allRules.length; i++) {
        //Add rule if it doesn't exist
        if (findCSSRule(targetStyleSheet, ruleSelector) == -1) {
            targetStyleSheet.sheet.insertRule(CS_rule, allRules.length - 1);
            // console.log('RULE ADDED')
        }
        //Remove rule if it already exists
        else {
            highlightStrongsSheet.deleteRule(findCSSRule(targetStyleSheet, ruleSelector));
            //Remove stylesheet if there are no more rules in it
            if (allRules.length == 0) {
                targetStyleSheet.remove()
            }
            // console.log('RULE REMOVED')
        }
        break
    }
}
function getAllRulesInStyleSheet(styleSheet) {
    if (styleSheet.sheet) {
        let allRules = styleSheet.sheet.cssRules;
        // let rulesArray = [];
        let rulesArray = '';
        for (let i = 0; i < allRules.length; i++) {
            // rulesArray.push(allRules[i].cssText)
            rulesArray=`${rulesArray}${allRules[i].cssText}`
        };
        // console.log(rulesArray)
        return rulesArray
    }
}
/* **** ***** ******* **** */
/* **** LOCAL STORAGE **** */
/* **** ***** ******* **** */
function setItemInLocalStorage(name, nValue) {
    let cache_strongs=document.querySelector('#cache_strongs');
    let cache_higlights=document.querySelector('#cache_higlights');
    if (name == 'transliteratedWords'/*  && (!cache_strongs||!cache_strongs.checked) */) { //check if in the settings saving to cache for the transliteration words is selected
        localStorage.setItem(name, nValue);
    } else if (name == 'strongsHighlightStyleSheet'/*  && (!cache_higlights||!cache_higlights.checked) */) {
        localStorage.setItem(name, nValue);
    } else {
        localStorage.setItem(name, nValue);
    }
}
function cacheFunctions() {
    if (localStorage.getItem('strongsHighlightStyleSheet')) {
        let headPart = document.getElementsByTagName('head')[0];
        newStyleInHead = document.createElement('style');
        newStyleInHead.id = 'highlightstrongs';
        newStyleInHead.innerHTML = localStorage.getItem('strongsHighlightStyleSheet');
        headPart.append(newStyleInHead);
    }
    if (localStorage.getItem('transliteratedWords')) {
        transliteratedWords_Array = localStorage.getItem('transliteratedWords').split(',');
        transliteratedWords_Array.forEach(storedStrnum => {
            if(/G|H\d+/i.test(storedStrnum)){
                showTransliteration(storedStrnum)
            }
        });
    }
}
/* **************************** */
/* HELPER FUNCTIONS *********** */
/* **************************** */
function getBoxShadowColor(elm){
    // GET FIRST SHADOW COLOR
    // Even if element has more than one box-shadow color, it will only get the first one
    let boxShadowOfElem = window.getComputedStyle(elm, null).getPropertyValue("box-shadow");
    return boxShadowOfElem.split('px')[0].replace(/^.*(rgba?\([^)]+\)).*/,'$1')
}
/* Ensure doublick does not run click eventListner */
function debounce(func, timeout = 300) {
    // function func will only run if it is not clicked twice within 300ms
    var ttt;
    return function () {
        if (ttt) {
            clearTimeout(ttt)
            ttt = undefined;
        } else {
            // console.log('setting Timeout')
            const context = this
            const args = arguments
            ttt = setTimeout(() => {
                func.apply(context, args);
                ttt = undefined;
                // console.log('done & cleared')
            }, timeout)
        }
    }
}
function modifyQuotationMarks(txt){
    txt = txt.replace(/&nbsp;/ig, ' ');
    // Modify Opening Quotation Marks
    txt = txt.replace(/<\/em><em>/ig, '');
    txt = txt.replace(/(?<!<[^>]*)(.)\.\.\./ig, '$1…');
    txt = txt.replace(/”…/ig, '“…');
    txt = txt.replace(/(?<!<[^>]*)([\d\w])['‘]([\w…])/ig, '$1’$2');
    txt = txt.replace(/(?<!<[^>]*)(^|[\b\s‘])"/ig, '$1“');
    txt = txt.replace(/(?<!<[^>]*)"([\d\w…‘])/ig, '“$1');
    txt = txt.replace(/(?<!<[^>]*)"([\s.,’])/ig, '”$1');
    txt = txt.replace(/(?<!<[^>]*)([\w\d.,…’])"/ig, '$1”');
    // Modify Closing Quotation Marks 
    txt = txt.replace(/!"/g, '!”');
    txt = txt.replace(/(?<!<[^>]*)(^|[\b\s“])'/ig, '$1‘');
    txt = txt.replace(/(?<!<[^>]*)'([\d\w…“])/ig, '‘$1');
    txt = txt.replace(/(?<!<[^>]*)'([\s.,”])/ig, '’$1');
    txt = txt.replace(/(?<!<[^>]*)([\w\d.,…”])'/ig, '$1’');
    txt = txt.replace(/--/g, '—');
    // Remove <br> that comes before block element closing tag
    txt = txt.replace(/<br>(<\/(p|h\d)>)/ig, '$1');
    txt = txt.replace(/(?<!<[^>]*)(\s+([.,]))/ig, '$2');
    txt = txt.replace(/<span[\s=\":#\w\d]*\">[↵]*<\/span>/ig, '');
    txt = txt.replace(/<(?<tagname>[\w\d]+)><\/\k<tagname>>/ig,'');// Remove empty html elements
    txt = txt.replace(/<span contenteditable="false" data-cke-magic-line="\d+" style="height: \d+px; padding: \d+px; margin: \d+px; display: block; z-index: \d+; color: rgb(\d+, \d+, \d+); font-size: \d+px; line-height: 0px; position: absolute; border-top: \d+px dashed rgb(\d+, \d+, \d+); user-select: none; left: \d+px; right: \d+px; top: \d+px;">  \s*↵\s*<\/span>/ig, '');
    return txt
}
function removeItemFromArray(n, array) {
    if(Array.isArray(n)){
        array.forEach((nArr,i) => {
            if(Array.isArray(nArr) && nArr[0]==n[0]){array.splice(i, 1);}
        });
    } else {
        const index = array.indexOf(n);
        // if the element is in the array, remove it
        if (index > -1) {
            // remove item
            array.splice(index, 1);
        }
    }
    return array;
}
function randomColor(brightness) {
    function randomChannel(brightness) {
        var r = 255 - brightness;
        var n = 0 | ((Math.random() * r) + brightness);
        var s = n.toString(16);
    return (s.length == 1) ? '0' + s : s;
    }
    return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
}
function insertElmAbeforeElmB(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode);
}
function insertElmAafterElmB(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextElementSibling);
}
function relocateElmTo(elm, moveHere) {
    let elmCopy = elm.cloneNode(true);
    elm.remove();
    moveHere.append(elmCopy)
}
function areAllitemsOfAinB(a, b) {
    if (a.every(elem => b.indexOf(elem) > -1)) {
        return true
    } else {
        return false
    }
}
function createNewElement(elmTagName,classIdAttr){
    /*
    This function can take any number of parameters (arguments)
    However, the first one must be the name of the element
    The others will be class name, id, and/or attribute
        * classes must start with a dot ('.')
        * ids must start with a dot ('#')
        * attributes must be enclosed in square brackets ('[]')--[attribute="value"]
    */
    let newElm=document.createElement(elmTagName);

    for (var i = 1; i < arguments.length; i++) {
        let currentParam = arguments[i].trim();
        // Replace Spaces With Underscore
        currentParam = currentParam.replace(/\s+/g,'_');
		// For classes
        if(/^\./.test(currentParam)){
            let className = currentParam.replace(/^\./,'');
            newElm.classList.add(className)
        }
		// For ids
        else if(/^#/.test(currentParam)){
            let iD = currentParam.replace(/^#/,'');
            newElm.id = iD;
        }
		// For Attributes - [attrName=]
        else if(/^\[.+\]/.test(currentParam)){
            let attrNvalue = currentParam.replace(/^\[(.+)\]/,'$1').replace(/(=)\s*["']/g,'$1').replace(/["']\s*(\])/g,'$1');
            let attr = attrNvalue.split('=')[0];
            let val = attrNvalue.split('=')[1];
            newElm.setAttribute(attr,val);
        }
        else if(currentParam!='' && /^[\d-]/.test(currentParam)){
            let className = currentParam;
            newElm.classList.add(className)
        }
	}
    return newElm
}

/* SLIDE UP & SLIDE DOWN */
let slideUpDownTimer;
function slideUpDown(elm, upOrDown){
    elm.style.transition = 'all 0.3s ease-in-out';
    if(slideUpDownTimer){clearTimeout(slideUpDownTimer)}
    
    const tMargin = elm.offsetHeight;
    let animDuration = (tMargin * 0.8);

    if(animDuration<=0){
        if(anim_dur = elm.getAttribute('anim_dur')){
            animDuration = anim_dur;
        }
    }
    if(animDuration<300){
            animDuration = 300;
        }
    elm.style.transition = 'all ' + animDuration/1000 + 's ease-in-out';

    // SHOW It If It is Hidden
    if(upOrDown=='show'|| upOrDown=='down'||elm.classList.contains('sld_up')){
        if(elm.style.zIndex == ''||elm.style.zIndex > '-1'){
            elm.style.zIndex = '-1'
        }
        elm.style.display = '';
        // elm.style.display = elm.getAttribute('display');
        elm.style.opacity = 1;
        setTimeout(() => {
            elm.classList.remove('sld_up')
            elm.style.position = '';
            elm.style.marginTop = '0';
        }, 1);
        setTimeout(() => {
            elm.style.zIndex = '';
        }, animDuration);

    }
    // HIDE It If It Is Showing
    else if((upOrDown && (upOrDown=='hide'|| upOrDown=='up'))||!elm.classList.contains('sld_up')) {
        elm.classList.add('sld_up')
        elm.style.marginTop = '-' + tMargin + 'px';
        elm.style.opacity = 0;
        elm.style.zIndex = -1;
        elm.setAttribute('display', elm.style.display);
        elm.setAttribute('anim_dur', animDuration);
        slideUpDownTimer = setTimeout(() => {
            elm.style.setProperty('display', 'none', 'important');
        }, animDuration);
    }
    return animDuration
}


/* **** ****************************** **** */
/* **** ****************************** **** */


function getCurrentStrongsDef(e) {
    let approvedStrnum=[];
    if (strnum = e.target.getAttribute('strnum')) {
        strnum = strnum.split(' ');
        strnum.forEach(s => {
            if(/^[HGhg]\d+/.test(s)){
                approvedStrnum.push(s)
            }
        });
        strnum=approvedStrnum;
        getsStrongsDefinition(strnum);
    }
    // if (e.type == contextMenu_touch) {
        context_menu.classList.add('rightclicked');
        context_menu.removeAttribute('strnum');
        if (strnum) {
            context_menu.setAttribute('strnum', strnum);
        }
        newStrongsDef = currentStrongsDef;
    // } else if (e.type != contextMenu_touch) {
    //     newStrongsDef = '';
    // }
}

/* C-Menu History Navigation */
function cmenu_goBackFront(x){
    let indx = parseInt(x.getAttribute('indx'));
    let calledByPrv = x.classList.contains('prv');
    let prvTitle;
    /* GET PRESENT TRANSFORM */
    let cmenu_cmt_dX = context_menu.querySelector('.cmtitlebar').getAttribute('data-x');
    let cmenu_cmt_dY = context_menu.querySelector('.cmtitlebar').getAttribute('data-y');
    let cmenu_dX = context_menu.getAttribute('data-x');
    let cmenu_dY = context_menu.getAttribute('data-y');
    let currentContextMenu_style = context_menu.getAttribute('style');
    /* Replace the context menu with the save one */
    let cMenuParent = context_menu.parentElement;
    let prev_contextmenu=context_menu;
    if (calledByPrv) {
        /* Add the cmenu to the cmenu_backwards_navigation_arr */
        cmenu_backwards_navigation_arr.splice(indx+1,1,prev_contextmenu);
        prvTitle=prev_contextmenu.querySelector('.cmtitlebar button.prv').getAttribute('title')
    }
    cMenuParent.replaceChild(cmenu_backwards_navigation_arr[indx], context_menu);
    context_menu.setAttribute('style',currentContextMenu_style);
    context_menu.querySelector('.cmtitlebar').setAttribute('data-x',cmenu_cmt_dX);
    context_menu.querySelector('.cmtitlebar').setAttribute('data-y',cmenu_cmt_dY);
    context_menu.setAttribute('data-x',cmenu_dX);
    context_menu.setAttribute('data-y',cmenu_dY);
    enableInteractJSonEl('.cmtitlebar', context_menu);

    if(calledByPrv){
        let nxtBtn=context_menu.querySelector('.cmtitlebar .nxt');
        nxtBtn.setAttribute('indx',indx+1);
        nxtBtn.setAttribute('title',prvTitle);
        nxtBtn.removeAttribute('disabled');
    }
}
/* To Toggle TSK in CMenu When Present */
function toggleCMenuTSK(){
    context_menu.querySelectorAll('.crfnnote').forEach(crfn=>{crfn.classList.toggle('displaynone')});
    context_menu.classList.toggle('showingXref')?showingXref=true:showingXref=false;
    localStorage.setItem('showingXref',showingXref)
}

/* MAKING CONTEXT_MENU DRAGGABLE */
// target elements with the "draggable" class
function enableInteractJSonEl(dragTarget, elmAffected) {
    // interact(elmAffected)
    let dt=elmAffected.querySelector(dragTarget);
    dt?(dt.style.touchAction = 'none'):null;//to enable dragging by touch
    interact(dragTarget)
        .draggable({
            // enable inertial throwing
            inertia: true,
            // enable autoScroll
            autoScroll: false,
            // keep the element within the area of it's parent
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            listeners: {
                // call this function on every dragmove event
                move: dragMoveListener.bind(null,'drag',dragTarget,elmAffected),
            }
        })
}
function dragMoveListener(moveTye,dragTarget,elmAffected,event) {
    var target = event.target;
    // if(moveTye=='drag' && target==elmAffected){
    //     target=elmAffected.querySelector(dragTarget)
    // }
    
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // Always Make ContextMenu translateX Equal ZERO While in #searchPreviewFixed 
    if(elmAhasElmOfClassBasAncestor(elmAffected,'#searchPreviewFixed')){x=0}
    // translate the element
    elmAffected.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}
// this function is used later in the resizing and gesture
// window.dragMoveListener = dragMoveListener;
/* GET OFFEST OF ELEMENT RELATIVE TO GIVEN ANCESTOR OR BODY  */
function getOffsetRelativeToAncestor(element, ancestor=null) {
    let offsetLeft = 0, offsetTop = 0;
    while (element && element !== ancestor) {
        offsetLeft += element.offsetLeft;
        offsetTop += element.offsetTop;

        // Consider the element's clientLeft and clientTop (borders) when it's not the body element
        if (element !== document.body) {
            offsetLeft += element.clientLeft;
            offsetTop += element.clientTop;
        }
        element = element.offsetParent;
    }
    return {
        left: offsetLeft,
        top: offsetTop
    };
}

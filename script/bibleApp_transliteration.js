// FOR STRONGS LEXICON
// let pagemaster = document.body
// const fullPathHead = document.querySelectorAll('body')[0].baseURI.split('resources/app')[0];
// var requestStrongsURL =fullPathHead + `resources/app/src/data/strongs.json`;
const fullPathHead = '';
var requestStrongsURL =fullPathHead + `data/strongs.json`;
var requestStrongsURL =fullPathHead + `../data/strongs.json`;
var strongsJSON = new XMLHttpRequest();
strongsJSON.open('GET', requestStrongsURL);
strongsJSON.responseType = 'json';
strongsJSON.send();

let strongsJSONresponse, strngsAll;
strongsJSON.onload = function () {
    strongsJSONresponse = strongsJSON.response;
    // Because BibleTimelines and BibleNodesGraph May have style#highlightstrongs saved in them
    let styleHLS = document.head.querySelectorAll('style#highlightstrongs');
    if(styleHLS){styleHLS.forEach((x,i) => {x.remove()});}
    cacheFunctions()
}

// Create and Append Transliteration Data Attribute
function createTransliterationAttr(x, l) {
    let translatedWordsInVerse = x.querySelectorAll('[strnum]');
    translatedWordsInVerse.forEach(strNumElm => {
        wStrnum_array = strNumElm.getAttribute('strnum').split(' ');
        const wl=wStrnum_array.length;
        wStrnum_array.forEach((wStrnum,i) => {
            let divider='';
            if (i>0) {divider = '|'}
            //For Greek/Hebrew Bibles
            if (l == 'original'||l == 'gr') {
                strNumElm.setAttribute("data-true-xlit", keyValueReplacer(strNumElm.innerText));
            }
            // CHECK STRONGS DICTIONARY
            for (k = 0; k < strongsJSONresponse.length; k++) {
                if (strongsJSONresponse[k].number == wStrnum) {
                    strNumElm.classList.add(wStrnum);
                    let str_xlit = strongsJSONresponse[k].xlit;
                    let str_lemma = strongsJSONresponse[k].lemma;
                    strNumElm.setAttribute("data-xlit", strNumElm.getAttribute("data-xlit") + divider + str_xlit);
                    strNumElm.setAttribute("data-lemma", strNumElm.getAttribute("data-lemma") + divider + str_lemma);
                    let strNum_Title = '';
                    strNumElm.setAttribute('data-title', wStrnum + " | " + str_xlit + " | " + str_lemma);
                    // strNumElm.setAttribute('title', wStrnum + " | " + str_xlit + " | " + str_lemma);
                    break
                }
            }
        });
        let strNum_Title = '';
        if (strNumElm.getAttribute('data-title')) {
            strNum_Title = strNumElm.getAttribute('data-title');
        }
        // strNumElm.setAttribute('data-title', '(' + strNumElm.getAttribute("translation") + ')' + strNum_Title);
        strNumElm.setAttribute('data-title', strNum_Title);
    });
    return x
}
let currentStrongsDef = null;
// function isRelated(word1, word2) {
//     function removeCommonPrefixes(word) {
//       const prefixPattern = /^(α|ανα|αμφι|δια|εν|επι|κατα|μετα|παρα|περι|υπερ|προ)/;
//       return word.replace(prefixPattern, '');
//     }
  
//     function removeCommonSuffixes(word) {
//       const suffixPattern = /(ος|ης|ου|ον|ιζω|ομαι|ει|εις|ειν|ειτε|ειτες|οι|ες|εστε|ουν|ομεν|ετε|ουσα|ων)$/;      
//       return word.replace(suffixPattern, '');
//     }
  
//     function removeInflections(word) {
//       const inflections = [
//         { pattern: /α$/, replacement: '' },
//         { pattern: /ες$/, replacement: '' },
//         { pattern: /ων$/, replacement: '' },
//         { pattern: /ουσα$/, replacement: '' },
//         { pattern: /εως$/, replacement: '' },
//         { pattern: /εων$/, replacement: '' },
//         { pattern: /ευς$/, replacement: '' },
//         { pattern: /ευν$/, replacement: '' },
//         { pattern: /ος$/, replacement: '' },
//         { pattern: /ουν$/, replacement: '' }
//       ];
//       for (const inflection of inflections) {
//         if (inflection.pattern.test(word)) {
//           return word.replace(inflection.pattern, inflection.replacement);
//         }
//       }
//       return word;
//     }
  
//     function areWordsRelated(word1, word2) {
//       let modifiedWord1 = removeCommonPrefixes(normalizeWord(word1));
//       modifiedWord1 = removeCommonSuffixes(modifiedWord1);
//       modifiedWord1 = removeInflections(modifiedWord1);
      
//       let modifiedWord2 = removeCommonPrefixes(normalizeWord(word2));
//       modifiedWord2 = removeCommonSuffixes(modifiedWord2);
//       modifiedWord2 = removeInflections(modifiedWord2);
  
//       return modifiedWord1 === modifiedWord2 || calculateLevenshteinDistance(modifiedWord1, modifiedWord2) <= 2;
//     }
  
//     function normalizeWord(word) {
//       const accentMap = {
//         ά: 'α', Ά: 'Α', ὰ: 'α', ᾶ: 'α', ἀ: 'α', ἄ: 'α', ἂ: 'α', ἆ: 'α', ἁ: 'α', ἅ: 'α', ἃ: 'α', ἇ: 'α', ᾳ: 'α', έ: 'ε', Έ: 'Ε', ὲ: 'ε', ἐ: 'ε', ἔ: 'ε', ἒ: 'ε', ἕ: 'ε', ἓ: 'ε', ή: 'η', Ή: 'Η', ῆ: 'η', ἠ: 'η', ἤ: 'η', ἢ: 'η', ἦ: 'η', ἡ: 'η', ἥ: 'η', ἣ: 'η', ἧ: 'η', ῃ: 'η', ί: 'ι', Ι: 'Ι', ῖ: 'ι', ἰ: 'ι', ἴ: 'ι', ἲ: 'ι', ἶ: 'ι', ἱ: 'ι', ἵ: 'ι', ἳ: 'ι', ἷ: 'ι', ῐ: 'ι', ῑ: 'ι', ό: 'ο', Ό: 'Ο', ὸ: 'ο', ὀ: 'ο', ὄ: 'ο', ὂ: 'ο', ὅ: 'ο', ὃ: 'ο', ύ: 'υ', Ύ: 'Υ', ῦ: 'υ', ὐ: 'υ', ὔ: 'υ', ὒ: 'υ', ὖ: 'υ', ὑ: 'υ', ὕ: 'υ', ὓ: 'υ', ὗ: 'υ', ϋ: 'υ', ΰ: 'υ', ώ: 'ω', Ώ: 'Ω', ῶ: 'ω', ὠ: 'ω', ὤ: 'ω', ὢ: 'ω', ὦ: 'ω', ὡ: 'ω', ὥ: 'ω', ὣ: 'ω', ὧ: 'ω', ῳ: 'ω'
//       };
  
//       const normalizedWord = word.replace(/./g, (c) => accentMap[c] || c);
  
//       return normalizedWord.toLowerCase();
//     }
        // /* Levenshtein algorithm */

//     function calculateLevenshteinDistance(word1, word2) {
//       const m = word1.length;
//       const n = word2.length;
//       const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
//       for (let i = 1; i <= m; i++) {dp[i][0] = i;}
//       for (let j = 1; j <= n; j++) {dp[0][j] = j;}
//       for (let i = 1; i <= m; i++) {
//         for (let j = 1; j <= n; j++) {
//           if (word1[i - 1] === word2[j - 1]) {
//             dp[i][j] = dp[i - 1][j - 1];
//           } else {
//             dp[i][j] = Math.min(
//               dp[i - 1][j] + 1, // Deletion
//               dp[i][j - 1] + 1, // Insertion
//               dp[i - 1][j - 1] + 1 // Substitution
//             );
//           }
//         }
//       }
  
//       return dp[m][n];
//     }
  
//     return areWordsRelated(word1, word2);
// }   
      
function isRelated(word1, word2) {
    function removeCommonPrefixes(word) {
      const prefixPattern = /^(α|ανα|αμφι|δια|εν|επι|κατα|μετα|παρα|περι|υπερ|προ)/;
      return word.replace(prefixPattern, '');
    }
  
    function removeCommonSuffixes(word) {
      const suffixPattern = /(ος|ης|ου|ον|ιζω|ομαι|ει|εις|ειν|ειτε|ειτες|οι|ες|εστε|ουν|ομεν|ετε|ουσα|ων)$/;
      return word.replace(suffixPattern, '');
    }
  
    function removeInflections(word) {
      const inflections = [
        { pattern: /α$/, replacement: '' },
        { pattern: /ες$/, replacement: '' },
        { pattern: /ων$/, replacement: '' },
        { pattern: /ουσα$/, replacement: '' },
        { pattern: /εως$/, replacement: '' },
        { pattern: /εων$/, replacement: '' },
        { pattern: /ευς$/, replacement: '' },
        { pattern: /ευν$/, replacement: '' },
        { pattern: /ος$/, replacement: '' },
        { pattern: /ουν$/, replacement: '' }
      ];
      for (const inflection of inflections) {
        if (inflection.pattern.test(word)) {
          return word.replace(inflection.pattern, inflection.replacement);
        }
      }
      return word;
    }
  
    function areWordsRelated(word1, word2) {
      let modifiedWord1 = removeCommonPrefixes(normalizeWord(word1));
      modifiedWord1 = removeCommonSuffixes(modifiedWord1);
      modifiedWord1 = removeInflections(modifiedWord1);
  
      let modifiedWord2 = removeCommonPrefixes(normalizeWord(word2));
      modifiedWord2 = removeCommonSuffixes(modifiedWord2);
      modifiedWord2 = removeInflections(modifiedWord2);
  
      return (
        modifiedWord1 === modifiedWord2 || calculateJaroWinklerScore(modifiedWord1, modifiedWord2) >= 0.85
      );
    }
  
    /* Jaro-Winkler algorithm */
    function calculateJaroWinklerScore(word1, word2) {
      const matchScoreThreshold = Math.floor(Math.max(word1.length, word2.length) / 2) - 1;
      const jaroScore = calculateJaroScore(word1, word2);
      if (jaroScore < 0.7) {
        return jaroScore;
      }
      const prefixLength = getPrefixLength(word1, word2, matchScoreThreshold);
      const jaroWinklerScore = jaroScore + 0.1 * prefixLength * (1 - jaroScore);
      return jaroWinklerScore;
    }
  
    function calculateJaroScore(word1, word2) {
      const matchingDistance = Math.floor(Math.max(word1.length, word2.length) / 2) - 1;
      const commonChars1 = getCommonCharacters(word1, word2, matchingDistance);
      const commonChars2 = getCommonCharacters(word2, word1, matchingDistance);
      if (commonChars1.length === 0 || commonChars2.length === 0) {
        return 0;
      }
      const transpositions = countTranspositions(commonChars1, commonChars2);
      const jaroScore =
        (commonChars1.length / word1.length +
          commonChars2.length / word2.length +
          (commonChars1.length - transpositions) / commonChars1.length) /
        3;
      return jaroScore;
    }
  
    function getCommonCharacters(word1, word2, matchingDistance) {
      const commonChars = [];
      const visited = Array(word2.length).fill(false);
      for (let i = 0; i < word1.length; i++) {
        const start = Math.max(0, i - matchingDistance);
        const end = Math.min(i + matchingDistance + 1, word2.length);
        for (let j = start; j < end; j++) {
          if (word1[i] === word2[j] && !visited[j]) {
            commonChars.push(word1[i]);
            visited[j] = true;
            break;
          }
        }
      }
      return commonChars;
    }
  
    function countTranspositions(chars1, chars2) {
      let transpositions = 0;
      for (let i = 0; i < chars1.length; i++) {
        if (chars1[i] !== chars2[i]) {
          transpositions++;
        }
      }
      return transpositions / 2;
    }
  
    function getPrefixLength(word1, word2, maxLength) {
      const prefixLength = Math.min(maxLength, getCommonPrefixLength(word1, word2));
      return prefixLength;
    }
  
    function getCommonPrefixLength(word1, word2) {
      let prefixLength = 0;
      const minLength = Math.min(word1.length, word2.length);
      for (let i = 0; i < minLength; i++) {
        if (word1[i] === word2[i]) {
          prefixLength++;
        } else {
          break;
        }
      }
      return prefixLength;
    }
  
    return areWordsRelated(word1, word2);
}
function normalizeWord(word) {
    const accentMap = {
      ά: 'α', Ά: 'Α', ὰ: 'α', ᾶ: 'α', ἀ: 'α', ἄ: 'α', ἂ: 'α', ἆ: 'α', ἁ: 'α', ἅ: 'α', ἃ: 'α', ἇ: 'α', ᾳ: 'α', έ: 'ε', Έ: 'Ε', ὲ: 'ε', ἐ: 'ε', ἔ: 'ε', ἒ: 'ε', ἕ: 'ε', ἓ: 'ε', ή: 'η', Ή: 'Η', ῆ: 'η',
      ἠ: 'η', ἤ: 'η', ἢ: 'η', ἦ: 'η', ἡ: 'η', ἥ: 'η', ἣ: 'η', ἧ: 'η', ῃ: 'η', ί: 'ι', Ι: 'Ι', ῖ: 'ι', ἰ: 'ι', ἴ: 'ι', ἲ: 'ι', ἶ: 'ι', ἱ: 'ι', ἵ: 'ι', ἳ: 'ι', ἷ: 'ι', ῐ: 'ι', ῑ: 'ι', ό: 'ο', Ό: 'Ο',
      ὸ: 'ο', ὀ: 'ο', ὄ: 'ο', ὂ: 'ο', ὅ: 'ο', ὃ: 'ο', ύ: 'υ', Ύ: 'Υ', ῦ: 'υ', ὐ: 'υ', ὔ: 'υ', ὒ: 'υ', ὖ: 'υ', ὑ: 'υ', ὕ: 'υ', ὓ: 'υ', ὗ: 'υ', ϋ: 'υ', ΰ: 'υ', ώ: 'ω', Ώ: 'Ω', ῶ: 'ω', ὠ: 'ω', ὤ: 'ω', ὢ: 'ω',
      ὦ: 'ω', ὡ: 'ω', ὥ: 'ω', ὣ: 'ω', ὧ: 'ω', ῳ: 'ω'
    };

    const normalizedWord = word.replace(/./g, (c) => accentMap[c] || c);
    return normalizedWord.toLowerCase();
}
function wordsSharingDerivationWith(x) {
    const wordsToOmit = /^(α|ανα|αμφι|δια|εν|επι|κατα|μετα|παρα|περι|υπερ|προ|ος|ης|ου|ον|ιζω|ομαι|ει|εις|ειν|ειτε|ειτες|οι|ες|εστε|ουν|ομεν|ετε|ουσα|ων)$/;
    // Get the strongs numbers from which it was derived
    const xDerivation = getsStrongsLemmanNxLit(x).derivation;
    let lemaXlit = '';
    let s = '';
    // Extract the strongs number
    if (!xDerivation) {
      return { lemaXlit };
    }
    const derivationRoots = extractStrongNumbers(xDerivation);
    let strongsSharingDerivation = {};
    let htmlWrappedRelations = {};
    if (derivationRoots.length == 0) {
      return { strongsSharingDerivation, lemaXlit };
    }
    if (normalizeWord(getsStrongsLemmanNxLit(x).lemma).match(wordsToOmit)) {
      return { strongsSharingDerivation, lemaXlit };
    }
    // Store each derivation separately
    derivationRoots[x] = {};
    derivationRoots.forEach((dr) => {
      strongsSharingDerivation[dr] = {};
    });
  
    // Look for all strongs numbers that include the derivation strongs number
    for (let k = 0; k < strongsJSONresponse.length; k++) {
      derivationRoots.forEach((dr) => {
        htmlWrappedRelations[dr] = [];
        const rgx = new RegExp(dr + "\\b");
        const sk = strongsJSONresponse[k];
        if (sk.lemma.length > 1) {
          const skmatch = rgx.test(sk.description.derivation);
          if (skmatch) {
            const num = sk.number;
            const xlit = sk.xlit;
            const lemma = sk.lemma;
            strongsSharingDerivation[dr][num] = { xlit, lemma };
          }
        }
      });
    }
    derivationRoots.forEach((dr) => {
      const relatedWordsCount = Object.keys(strongsSharingDerivation[dr]).length;
      if (
        !normalizeWord(getsStrongsLemmanNxLit(dr).lemma).match(wordsToOmit) &&
        relatedWordsCount > 0
      ) {
        if (relatedWordsCount > 1) {
          s = 's';
        }
        // Iterate through each key-value pair in the object
        for (const [objKey, objValue] of Object.entries(strongsSharingDerivation[dr])) {
          const currentlyInspectedStrongsArray = objValue;
          // Check if the current key or value's Strong's numbers intersect with the Strong's numbers of the given key
          /* ROOTS */
          // Loop through all the strongs words and find all that have the same root
          const l = currentlyInspectedStrongsArray.lemma;
          const x = currentlyInspectedStrongsArray.xlit;
          if (l != undefined && (objKey !== x || objKey !== x)) {
            const strString = `<li><span class="strnum ${objKey}" strnum="${objKey}">${objKey}</span> ${l}/${x}</li>`;
            htmlWrappedRelations[dr].push(strString);
          }
        }
  
        // WRAP IN HTML TAGS
        // lemaXlit += `<div><h5 class="hidingsibs"><div>(${htmlWrappedRelations[dr].length + 1}) Relation${s} Derived From <span class="strnum ${dr}" strnum="${dr}">${dr}</span> ${getsStrongsLemmanNxLit(dr).lemma}/${getsStrongsLemmanNxLit(dr).xlit}</div></h5>
        //       <ol class="hidby_H5"><li><span class="strnum ${dr}" strnum="${dr}">${dr} ${getsStrongsLemmanNxLit(dr).lemma}/${getsStrongsLemmanNxLit(dr).xlit}</span></li>${htmlWrappedRelations[dr].join('')}</ol></div>`;
        lemaXlit += `<h5 class="hidingsibs"><div>(${htmlWrappedRelations[dr].length + 1}) Relation${s} Derived From <span class="strnum ${dr}" strnum="${dr}">${dr}</span> ${getsStrongsLemmanNxLit(dr).lemma}/${getsStrongsLemmanNxLit(dr).xlit}</div></h5>
              <ol class="hidby_H5"><li><span class="strnum ${dr}" strnum="${dr}">${dr} ${getsStrongsLemmanNxLit(dr).lemma}/${getsStrongsLemmanNxLit(dr).xlit}</span></li>${htmlWrappedRelations[dr].join('')}</ol>`;
      }
    });
  
    return { strongsSharingDerivation, lemaXlit };
  
    function extractStrongNumbers(str) {
      const regex = /G\d+/g;
      const matches = str.match(regex);
      if (!matches) {
        return [];
      }
      return matches;
    }
} 
// Function to get all strongs word related to a selected strongs word by root
function wordsRelatedBySpelling(x){ //Or just close in spelling
    let keysWithSharedRoots = {};
    let lemaXlit = '';
    if(!x.match(/^G/)){return {keysWithSharedRoots,lemaXlit}}//Works only with Greek words
    const xLema = getsStrongsLemmanNxLit(x).lemma
    
    let htmlWrappedRelations = [];
    let s = '';
    let lx;
    
    // Loop through all stongs words
    for (k = 8682; k < strongsJSONresponse.length; k++) {
        if (isRelated(xLema, strongsJSONresponse[k].lemma)) {
            const num = strongsJSONresponse[k].number;
            const xlit = strongsJSONresponse[k].xlit;
            const lemma = strongsJSONresponse[k].lemma;
            keysWithSharedRoots[num]={xlit,lemma};
        }
    }

    const relatedWordsCount = Object.keys(keysWithSharedRoots).length;
    if (relatedWordsCount>0) {
        if (relatedWordsCount > 1) {s='s'}      
        // Iterate through each key in the object
        for (const objKey in keysWithSharedRoots) {
            if (objKey !== x) {
                const currentlyInspectedStrongsArray = keysWithSharedRoots[objKey];
                // Check if the current key's Strong's numbers intersect with the Strong's numbers of the given key
                /* ROOTS */
                //Loop through all the strongs words and find all that have the same root
                const l = currentlyInspectedStrongsArray.lemma;
                const x = currentlyInspectedStrongsArray.xlit;
                if (l != undefined) {
                    const strString = `<li>${objKey.replace(/([GH]\d+)/g, '<span class="strnum $1" strnum="$1">$1</span>')} ${l}/${x}</li>`;
                    htmlWrappedRelations.push(strString);
                }
            }
        }
        // WRAP IN HTML TAGS
        // lemaXlit += `<div><h5 class="hidingsibs">(${htmlWrappedRelations.length}) Relation${s} By Root/Spelling</h5><ol class="hidby_H5">${htmlWrappedRelations.join('')}</ol></div>`;
        lemaXlit += `<h5 class="hidingsibs">(${htmlWrappedRelations.length}) Relation${s} By Root/Spelling</h5><ol class="hidby_H5">${htmlWrappedRelations.join('')}</ol>`;
    }

    return {keysWithSharedRoots,lemaXlit};
}
function getsStrongsDefinition(x) {
    _text = '';
    let openOrclose='';
    let strngsearchfor = '';
    x.forEach((wStrnum,i) => {
        strngsearchfor = strngsearchfor + ' ' + wStrnum;
        if(i!=0){openOrclose=''}// only the first detail element will be open
        let xlit_lemma_definition=getsStrongsLemmanNxLit(wStrnum);
        let lsj_match=getLSJGreekStrongs(wStrnum);

        if(xlit_lemma_definition.xlit!=''){
            let str_xlit = xlit_lemma_definition.xlit;
            let str_lemma = xlit_lemma_definition.lemma;
            let str_morph = xlit_lemma_definition.morphology;
            // let str_definition = xlit_lemma_definition.definition;
            let str_definition = xlit_lemma_definition.definition;
            // Some strong's number entries don't have derivations
            if (str_definition) {
                if(str_definition.derivation){
                    var str_derivation = str_definition.derivation.replace(/([GH]\d+)/g, '<span class="strnum $1" strnum="$1">$1</span>');
                    str_derivation = modifyRefInDef(str_derivation);
            }
                else{str_derivation='…'}
                if(str_definition.kjv_def){
                    var str_kjv_def = str_definition.kjv_def.replace(/([GH]\d+)/g, '<span class="strnum $1" strnum="$1">$1</span>');
                    str_kjv_def = modifyRefInDef(str_kjv_def);
                }
                if(str_definition.strongs_def){
                    var str_strongs_def = str_definition.strongs_def.replace(/([GH]\d+)/g, '<span class="strnum $1" strnum="$1">$1</span>');
                    str_strongs_def = modifyRefInDef(str_strongs_def);
                }
                function modifyRefInDef(def) {
                    def = def.replace(/(\w+[.\s:])(\d+[.:]\d+(,*\s*\d+(-\d+)*)*)(,*\s*(\d+[.:]\d+(,*\s*\d+(-\d+)*)*))+/g,'<span ref="$1$2">$1$2</span>; <span ref="$5">$5</span>');
                    def = def.replace(/(\w+[.\s:])(\d+[.:]\d+(,*\s*\d+(-\d+)*)*)/g,'<span ref="$1$2">$1$2</span>');
                    return def
                }
            }
            
            _text = `${_text}
            <details class="strngsdefinition" ${openOrclose}>
            <summary>
                <div class='openCloseIconHolder'></div>
                <div>
                    <h2>${wStrnum}</h2><br>
                    <i>Lemma</i>: <h2>${str_lemma}</h2><br>
                    <i title='transliteration'>Translit</i>: <h2>${str_xlit}</h2>
                    ${str_morph!=''?`<br><i>Morphology</i>: <h2 title="${/G\d/.test(wStrnum)==true?`${parseGreekMorph(str_morph)}`:`${parseHebrewMorph(str_morph)}`}">${str_morph}</h2>`:''}
                </div>
            </summary>
                <div>
                    <h5 class="hidingsibs">KJV Definition</h5>
                    <p class="hidby_H5">${str_kjv_def}</p>
                    <h5 class="">Strong's Definition</h5>
                    <p>
                        <b><i>Derivation: </i></b>${str_derivation}
                        <span style="border-top:2px solid;display:block;margin-top:0.2em;padding-top:0.5em">${str_strongs_def}</span>
                    </p>
                    ${lsj_match.lemaXlit}
                    ${wordsSharingDerivationWith(wStrnum).lemaXlit}
                    ${wordsRelatedBySpelling(wStrnum).lemaXlit}
                </div>
            </details>`;
        }
        //For strong's numbers that don't exist like some in the ABP
        else {_text = `${_text}<span style="display:flex;justify-content:center;font-style:italic;">No Strong’s entry for&nbsp;<b>${wStrnum}</b>.</span>`;}
    });
    currentStrongsDef = _text;
    // if(!document.querySelector('body').matches('#versenotepage')){
    //     strongsdefinition_text.innerHTML = _text.replace(/(<details class="strngsdefinition")/i,'$1 open');
    //     strongsnum_input.value = strngsearchfor;
    // }
    return _text
}

function getsStrongsLemmanNxLit(wStrnum) {
    let str_xlit='', str_lemma='', str_definition='', str_morph='';
    for (k = 0; k < strongsJSONresponse.length; k++) {
        if (strongsJSONresponse[k].number == wStrnum) {
            const currentStrongsNum = strongsJSONresponse[k];
            str_xlit = currentStrongsNum.xlit;
            str_lemma = currentStrongsNum.lemma;
            str_definition = currentStrongsNum.description;
            if (morph = currentStrongsNum.morph) {str_morph = morph;}
            k = strongsJSONresponse.length//to end the forloop
        }
    }
    return {
        xlit: str_xlit,
        lemma: str_lemma,
        morphology: str_morph,
        definition: str_definition,
        derivation: str_definition.derivation,
    }
}
function getLSJGreekStrongs(wStrnum) {
    let lemaXlit = '',morph='';
    const regex = /(LXX|NT|OT)\.((\w+\.\d+\.\d+(-\d+)*)(,*\s*\d+\.\d+(-\d+)*)*)/g;
    function modifyTags(str) {
        // Regular expression to match HTML tags
        var tagRegex = /(<a[^>]+>[^<]+<)/g;
      
        // Array to store modified tags
        var modifiedTags = [];
      
        // Replace each tag with the modified version
        var modifiedStr = str.replace(tagRegex, function(match, tag) {
            const matchedRefs = tag.match(regex);
            let replacement = '';
            // Modify the tag if there is a match
            if(matchedRefs){
                let tm = [];
                matchedRefs.forEach(r=>{
                    r = r.replace(/((LXX|NT|OT)\.)(\w+\.)(\d+\.\d+(,*\s*\d+(-\d+)*)*)(,*\s*(\d+\.\d+(,*\s*\d+(-\d+)*)*))+/g,'$1<span ref="$3$4">$3$4</span>; <span ref="$7">$7</span>');
                    r = r.replace(/((LXX|NT|OT)\.)(\w+\.)(\d+\.\d+(,*\s*\d+(-\d+)*)*)/g,'$1<span ref="$3$4">$3$4</span>');
                    tm.push(r);
                })
                replacement = tm.join('; ');
                replacement = replacement.replace(/NT\.|OT\./g,'');
                replacement = replacement.replace(/LXX\./g,'LXX ');
                tag = tag.replace(/(>[^(LXX|NT|OT)]*)(LXX|NT|OT)/, '$1' + replacement)
            }
          // Store the modified tag in the array
          modifiedTags.push(tag);
          // Return the modified tag to replace the original tag in the string
          return tag;
        });
      
        // Return the modified string and the array of modified tags
        return { modifiedStr, modifiedTags };
    }
    
    if(!wStrnum.match(/G\d+/)){return {lemaXlit,morph}}
    let str_xlit,str_lemma,str_definition;
    for (k = 0; k < lsj_full.length; k++) {
        if (lsj_full[k].number == wStrnum) {
            const lsjk = lsj_full[k];
            morph = lsjk.morph;
            str_xlit = lsjk.xlit;
            str_lemma = lsjk.lemma;
            str_definition = lsjk.definition;
            str_definition = modifyTags(str_definition).modifiedStr
            // lemaXlit += `<div>
            //     <h5 class="hidingsibs">Liddell-Scott-Jones Definition</h5>
            //     <p class="hidby_H5">
            //         <i><b>Gloss</b>: ${lsjk.gloss}</i><br>
            //         <i><b>Definition</b>: </i>
            //         ${str_definition}
            //     </p>
            // </div>`;
            lemaXlit += `<h5 class="hidingsibs">Liddell-Scott-Jones Definition</h5>
                <p class="hidby_H5">
                    <i><b>Gloss</b>: ${lsjk.gloss}</i><br>
                    <i><b>Definition</b>: </i>
                    ${str_definition}
                </p>`;
            k = lsj_full.length//to end the forloop
        }
    }
    return {
        xlit: str_xlit,
        lemma: str_lemma,
        definition: str_definition,
        lemaXlit:lemaXlit,
        morph:morph,
    }
}

//TO SHOW TRANSLITERATION OF WORDS
pagemaster.addEventListener("dblclick",transliterateWordsOnDoubleClick)

var transliteratedWords_Array = [];
function transliterateAllStoredWords(targetedSection){
    transliteratedWords_Array.forEach(storedStrnum => {showTransliteration(storedStrnum,targetedSection)});
}
function showTransliteration(stn,targetedSection) {
    let allSimilarWords;
    if(!targetedSection){targetedSection=pagemaster;}
    if(/G|H\d+/i.test(stn)&&stn!=='G*'){
        allSimilarWords = targetedSection.querySelectorAll('.' + stn + '[data-xlit]:not(.vnotestrnum)');
        // ':not(.vnotestrnum)' so as to exempt strnums in verseNotes
    } else {return}
    if(allSimilarWords.length<1){return}
    allSimilarWords.forEach(elm => {
        elm.innerHTML = '';
        let xlitFragment = new DocumentFragment();
        let elm_strnum = elm.getAttribute("strnum").split(' ');
        let elm_dxlit = elm.getAttribute("data-xlit").split('|');
        let elm_lemma = '';
        if (elm.getAttribute("data-lemma")) {
            elm_lemma = elm.getAttribute("data-lemma").split('|')
        }
        let engTranslation;
        let trueTransliteration = null;
        if (elm.getAttribute("data-true-xlit")) { //If it is from Greek Bible
            trueTransliteration = elm.getAttribute("data-true-xlit");
        } else { //If it is not from Greek Bible
            engTranslation = elm.getAttribute("translation");
        }
        let j = 0;
        elm_strnum.forEach(eStn => {
            let transSpan = document.createElement('SPAN');
            transSpan.classList.add(eStn);
            transSpan.classList.add('strnum')
            transSpan.setAttribute('strnum', eStn);
            transSpan.setAttribute('data-xlit', elm_dxlit[j]);
            let sLemma = ' | ' + elm_lemma[j];
            transSpan.setAttribute('data-title', eStn + ' | ' + elm_dxlit[j] + sLemma);
            if (elm.getAttribute("transliteration")) {
                transSpan.innerText = ' ' + elm.getAttribute("transliteration").split(' ')[j];
            } else {
                transSpan.innerText = ' ' + elm_dxlit[j];
            }
            if (trueTransliteration) {
                transSpan.setAttribute("data-true-xlit", trueTransliteration);
                transSpan.innerText = ' ' + trueTransliteration;
            }
            xlitFragment.append(transSpan);
            j++
        });
        elm.append(xlitFragment);
        elm.classList.add('eng2grk');
    })
}

function hideTransliteration(stn) {
    let allSimilarWords = pagemaster.querySelectorAll('.' + stn + ':not(.vnotestrnum)');
    // ':not(.vnotestrnum)' so as to exempt strnums in verseNotes
    allSimilarWords.forEach(elm => {
        elm.classList.remove('eng2grk');
        elm.innerHTML = '';
        elm.innerHTML = elm.getAttribute("translation");
    })
}

function highlightAllStrongs(x) {
    if(!x){return}
    let allStrNumsInWord=x.trim().split(' ');
    let alreadyHighlightedStrnum=[];
    let rc=randomColor(200);
    allStrNumsInWord.forEach(stnum => {
        let ruleSelector1= `span[strnum="${stnum}"]:not(.translated), .${stnum}:not(.eng2grk), .${stnum}.eng2grk::after`;
        let ruleSelector2= `span[strnum].${stnum} span.strnum`;
        if (document.querySelector('style#highlightstrongs')&&findCSSRule(highlightstrongs, ruleSelector1) != -1) {
            //first unhighlight the strNums with highlight then
            addRemoveRuleFromStyleSheet('cs', ruleSelector1, highlightstrongs)
            //get all strongs number that have been highlihgted
            alreadyHighlightedStrnum.push(stnum)
        }
        // if (document.querySelector('style#highlightstrongs')&&findCSSRule(highlightstrongs, ruleSelector2) != -1) {
        //     addRemoveRuleFromStyleSheet('cs', ruleSelector2, highlightstrongs)
        // }
        
    });
    if(alreadyHighlightedStrnum.length!=allStrNumsInWord.length){//Not all strNums were formally highlighted
        highlightArrOfStrNum(allStrNumsInWord)//apply an equal color to all of them
    }

    function highlightArrOfStrNum(xxx){
        xxx.forEach(stnum => {
            let ruleSelector1= `span[strnum="${stnum}"]:not(.translated), .${stnum}:not(.eng2grk), .${stnum}.eng2grk::after`;
            let ruleSelector2= `span[strnum].${stnum} span.strnum`;
            cs1 = `${ruleSelector1}{
                    background-color:${rc};
                    box-shadow: 0px 0px 0px 1px grey;
                    color:black!important;
                    transition: all 0.3s ease-in;}`;
            cs2 = `${ruleSelector2}{color:black!important}`;
            //CREATE THE INNER-STYLE WITH ID #highlightstrongs IN THE HEAD IF IT DOESN'T EXIST
            if (document.querySelector('style#highlightstrongs')) {//IF HIGHLIGHTSTRONGS STYLESHEET ALREADY EXISTS
                addRemoveRuleFromStyleSheet(cs1, ruleSelector1, highlightstrongs)
                // addRemoveRuleFromStyleSheet(cs2, ruleSelector2, highlightstrongs)
            } else {//ELSE HIGHLIGHTSTRONGS STYLESHEET DOES NOT ALREADY EXISTS
                createNewStyleSheetandRule('highlightstrongs', cs1)
                // addRemoveRuleFromStyleSheet(cs2, ruleSelector2, highlightstrongs)
            }
        });
    }
}
var clickeElmArray = [];
let timerstn;

function removeRecentStrongsFromArray(stn) {
    timerstn = setTimeout(() => {
        const index = clickeElmArray.indexOf(stn);
        if (index > -1) {
            clickeElmArray.splice(index, 1)
        }
        highlightAllStrongs(stn)
        if (document.querySelector('style#highlightstrongs')) {
            setItemInLocalStorage('strongsHighlightStyleSheet', getAllRulesInStyleSheet(highlightstrongs));
        }
    }, 300);
}

function strongsHighlighting(e) {
    let clickedElm;
    //IF IT IS A WORD TRANSLATED FROM HEBREW/GREEK
    if (e.target.classList.contains('translated')) {
        clickedElm = e.target;
        let stn = clickedElm.getAttribute('strnum');
        if (!clickeElmArray.includes(stn)) {
            clickeElmArray.push(stn)
            removeRecentStrongsFromArray(stn);
        }
    }
    //IF IT IS THE STRONGS WORD ITSELF
    else if (!e.target.matches('#singleverse_compare_menu')) {
        // clickedElm = e.target.parentElement;
        clickedElm = e.target;
        let stn = clickedElm.getAttribute('strnum');
        if (!clickeElmArray.includes(stn)) {
            clickeElmArray.push(stn)
            removeRecentStrongsFromArray(stn);
        } else { //If doubleclicked (stn will still be in the array)
            clickeElmArray.shift(stn);
            clearTimeout(timerstn)
        }
    }
}
//ON PAGE LOAD, GET TRANSLITERATED ARRAY FROM CACHE
function transliterateWordsOnDoubleClick(e) {
    hoverElm = e.target;
    if (hoverElm.nodeName == 'SPAN' && hoverElm.classList.contains('translated') && !hoverElm.classList.contains('eng2grk')) {
            let allstn = hoverElm.getAttribute('strnum').split(' '); //Some words are translated from more than one word
            allstn.forEach(stn => {
                if (transliteratedWords_Array.indexOf(stn) == -1) {
                    /* ADD THE WORD TO THE transliteratedWords_Array */
                    transliteratedWords_Array.push(stn);
                }
                if(/G|H\d+/i.test(stn)){
                    showTransliteration(stn)
                }
            })
        } else if (hoverElm.classList.contains('strnum')) {
            let allstn = hoverElm.parentElement.getAttribute('strnum').split(' ');
            allstn.forEach(stn => {
                if (transliteratedWords_Array.indexOf(stn) != -1) {
                    /* REMOVE THE WORD FROM THE transliteratedWords_Array */
                    transliteratedWords_Array.splice(transliteratedWords_Array.indexOf(stn), 1);
            }
            hideTransliteration(stn)
        })
    }
    setItemInLocalStorage('transliteratedWords', transliteratedWords_Array);
}

//HIGHLIGHTING CLICKED WORD
const strongs_dblclick_prevent = debounce(strongsHighlighting, 300);
main.addEventListener("click", strongs_dblclick_prevent)
document.addEventListener("click", togglePinDetails)
document.addEventListener(contextMenu_touch, togglePinDetails)
function togglePinDetails(e){
    // let h5s = '.strngsdefinition h5, .strngsdefinition h6, #strongsdefinition_text h5,#strongsdefinition_text h6';
    // if(e.target.matches(h5s)){
    //     if(e.type=='click'){
    //         slideUpDown(e.target.nextElementSibling)
    //     }
    //     else if(e.type==contextMenu_touch){
    //         let strDefh5h6 = elmAhasElmOfClassBasAncestor(e.target, '.strngsdefinition').querySelectorAll(h5s)
    //         strDefh5h6.forEach(h56=>{
    //             slideUpDown(h56.nextElementSibling)
    //         })
    //     }
    // }
}

/* EVENT LISTENERS FOR HIGHLIGHTING ALL ELEMENTS WITH THE SAME CLASS NAME BY HOVERING OVER ONE OF THEM */
/* This is acomplished by modifying the styles in the head */
document.addEventListener('mouseover', function (e) {
    let strAtt,highlightColor;
    if (!e.target.matches('#context_menu')&&e.target.getAttribute('strnum')) {
        strAtt = e.target.getAttribute('strnum')
        highlightColor = getBoxShadowColor(e.target);
    }
    //For context_menu when it is serving a strong's number
    else {
        let strElm = null;
        if (e.target.matches('#context_menu[strnum]')||(strElm=elmAhasElmOfClassBasAncestor(e.target,'#context_menu[strnum]'))) {
            /* 'rightClickedElm' & 'firstShadowColorOfElem' are gotten from the rightclickmenu function */
            if(firstShadowColorOfElem){
                if(strElm){
                    strAtt=strElm.getAttribute('strnum');
                } else{
                    strAtt=rightClickedElm.getAttribute('strnum');
                }
                highlightColor = firstShadowColorOfElem;
            }
        } else if (elmAhasElmOfClassBasAncestor(e.target, '[strnum]')) {
            strElm=elmAhasElmOfClassBasAncestor(e.target, '[strnum]');
            strAtt=strElm.getAttribute('strnum');
            highlightColor = getBoxShadowColor(e.target);
        }
    }
    let isStrnum=false;
    if(e.target.matches('.strnum')){isStrnum=true}
    if (strAtt) {
        if (document.getElementById('highlightall')) {
            highlightall.remove();
        }
        let newStyleInHead = document.createElement('style');
        strAtt = strAtt.split(' ');
        transStyleSelector = '';
        let i = 0;
        let comma = '';
        strAtt.forEach(stn => {
            i++;
            if (i > 1) {
                comma = ','
            }
            if(isStrnum){stn=`${stn}:not(.eng2grk), .${stn}.eng2grk::after`}
            else{stn=`${stn},.${stn}.eng2grk .strnum`}
            // transStyleSelector = `${transStyleSelector}${comma}.${stn},[strnum~="${stn}"] .strnum,[strnum^="${stn}"] .strnum`;
            transStyleSelector = `${transStyleSelector}${comma}.${stn}`;
        });
        newStyleInHead.id = 'highlightall';
        // newStyleInHead.innerHTML = `${transStyleSelector}{background-color:var(--chpt);border-radius:2px;border-bottom: 1px solid rgb(151, 116, 0);color:black!important;`;
        if(highlightColor=='none'){highlightColor='var(--strongword-hover)'}
        newStyleInHead.innerHTML = `${transStyleSelector}{
            background-color:var(--strnum-hover)!important;
            border-bottom:2px solid maroon!important;
            box-shadow: 0px 0px 0px 1px grey;
            color:var(--black)!important;
            transition: all 0.05s ease-in;
            `;
        let headPart = document.getElementsByTagName('head')[0];
        headPart.append(newStyleInHead);
    }
})
document.addEventListener('mouseout', function (e) {
    if (e.target.hasAttribute('strnum')&&document.getElementById('highlightall')) {
        highlightall.remove();
    }
})

/* ***** ***** *************** ***** */
/* ***** GREEK TRANSLITERATION ***** */
/* ***** ***** *************** ***** */
/* GREEK TRANSLITERATOR */
// //https://gist.github.com/eyy/7d37f1a0a9debf0286efaa3aa4651c3c
// //Transliterates ENGLISH TO GREEK which is not what I want
// let r = 'αβσδεφγ῾ικλμνοπρστυξυζηω'.split('').reduce((o,curr,i) => {o['abcdefghiklmnoprstuxyzēō'[i]] = curr;return o}, {})
// function gr(s) { return s.replace('th','θ').replace('ch','χ').replace(/./gui, a=>r[a]||a).replace(/σ /g, 'ς ') }
// // replace selected
// s=window.getSelection()
// t=s.toString()
// p=s.focusNode.parentNode;p.innerHTML=p.innerHTML.replace(t, gr(t))


/* TRANSLITERAIOTN */
/* 
'ΑΒΓΔΕΖΗΙΚΛΜΝΞΟΠΡΣΤΥΩ'
'ABGDEZHIKLMNXOPRSTYŌ'
'αβγδεζηικλμνξοπρσςτυω'
'abgdezhiklmnxoprsstyō'
s.replace('\bυ','hu')
s.replace('\bΥ','Hu')
Α	α	a
Β	β	b
Γ	γ	g
Δ	δ	d
Ε	ε	e
Ζ	ζ	z
Η	η	h ē
Θ	θ	th
Ι	ι	i
Κ	κ	k
Λ	λ	l
Μ	μ	m
Ν	ν	n
Ξ	ξ	x
Ο	ο	o
Π	π	p
Ρ	ρ	r
Σ	σ,ς	s
Τ	τ	t
Υ	υ	u (hu when it is the first letter)
Φ	φ	ph
Χ	χ	ch
Ψ	ψ	ps
Ω	ω	ō
 */
/* const greekTransliterationReplacementSET = {
    "αυ": "au",
    "\bυ": "hu",
    "Α": "A",
    "Β": "B",
    "Γ": "G",
    "Δ": "D",
    "Ε": "E",
    "Ζ": "Z",
    "Η": "H",
    "Ι": "I",
    "Κ": "K",
    "Λ": "L",
    "Μ": "M",
    "Ν": "N",
    "Ξ": "X",
    "Ο": "O",
    "Π": "P",
    "Ρ": "R",
    "Σ": "S",
    "Τ": "T",
    "Υ": "Y",
    "Ω": "Ō",
    "α": "a",
    "β": "b",
    "γ": "g",
    "δ": "d",
    "ε": "e",
    "ζ": "z",
    "η": "h",
    "ι": "i",
    "κ": "k",
    "λ": "l",
    "μ": "m",
    "ν": "n",
    "ξ": "x",
    "ο": "o",
    "π": "p",
    "ρ": "r",
    "σ": "s",
    "ς": "s",
    "τ": "t",
    "υ": "y",
    "ω": "ō"
} */

const greekTransliterationReplacementSET = {
    "au": ["αυ"],
    "hu": ["\bυ"],
    "au": ["αυ"],
    "eu": ["ευ"],
    "ou": ["ου"],
    "hu": ["ηυ"],
    "me": ["μὴ"],
    "ui": ["υι"],
    "ng": ["γγ"],
    "nch": ["γχ"],
    "nk": ["γκ"],
    "nx": ["γξ"],
    "th": ["θ"],
    "Th": ["Θ"],
    "ph": ["φ"],
    "Ph": ["Φ"],
    "ch": ["χ"],
    "Ch": ["Χ"],
    "ps": ["ψ"],
    "Ps": ["Ψ"],
    "A": ["Α"],
    "B": ["Β"],
    "G": ["Γ"],
    "D": ["Δ"],
    "E": ["Ε","Ἔ"],
    "Z": ["Ζ"],
    "H": ["Η"],
    "I": ["Ι"],
    "K": ["Κ"],
    "L": ["Λ"],
    "M": ["Μ"],
    "N": ["Ν"],
    "X": ["Ξ"],
    "O": ["Ο"],
    "P": ["Π"],
    "R": ["Ρ"],
    "S": ["Σ"],
    "T": ["Τ"],
    "Y": ["Υ"],
    "Ō": ["Ω"],
    "a": ["α","ὰ","ά","ᾶ","ᾰ","ᾱ"],
    "b": ["β"],
    "g": ["γ"],
    "d": ["δ"],
    "e": ["ε","ὲ","ἐ","ἔ"],
    "é": ["ἐ"],
    "z": ["ζ"],
    "ḗ": ["ή"],
    "ē": ["η"],
    "h": ["ὴ","ή","ῆ","ῃ"],
    "ḗ": ["ή"],
    "i": ["ι","ὶ","ϊ",'ΐ',"ῖ","ῐ","ῑ"],
    "k": ["κ"],
    "l": ["λ"],
    "m": ["μ"],
    "n": ["ν"],
    "x": ["ξ"],
    "o": ["ο","ὸ"],
    "p": ["π"],
    "r": ["ρ"],
    "s": ["σ","ς"],
    "t": ["τ"],
    "y": ["υ","ὺ","ύ","ϋ","ΰ","ῠ","ῡ"],
    "û": ["ῦ"],
    "ō": ["ω","ὧ","ῷ","ώ","ὼ","ῶ","ὠ"]
}

/* GREEK TRANSLITERATOR */
// 'ΑΒΓΔΕΖΗΙΚΛΜΝΞΟΠΡΣΤΥΩαβγδεζηικλμνξοπρσςτυω'
// 'ABGDEZHIKLMNXOPRSTYŌabgdezhiklmnxoprsstyō'

// Create Object from 2 Arrays
//FROM: (https://bobbyhadz.com/blog/javascript-create-object-from-two-arrays#:~:text=To create an object from two arrays%3A 1,iteration%2C assign the key-value pair to an object.)
// function generateGreekTransliterationReplacementSET() {
//     let greekLetters = ['αυ', '\bυ', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Ω', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ρ', 'σ', 'ς', 'τ', 'υ', 'ω'];
//     let replacementLetters = ['au', 'hu', 'A', 'B', 'G', 'D', 'E', 'Z', 'H', 'I', 'K', 'L', 'M', 'N', 'X', 'O', 'P', 'R', 'S', 'T', 'Y', 'Ō', 'a', 'b', 'g', 'd', 'e', 'z', 'h', 'i', 'k', 'l', 'm', 'n', 'x', 'o', 'p', 'r', 's', 's', 't', 'y', 'ō'];
//     let greekTransliterationReplacementSET = {};
//     greekLetters.forEach((element, index) => {
//         greekTransliterationReplacementSET[element] = replacementLetters[index];
//     });
//     return greekTransliterationReplacementSET;
// }
//Match key and replace with value
function keyValueReplacer(str, keyValueReplacementObj=greekTransliterationReplacementSET) {
    //GREEK to ENGLISH
    /* For Word Begining */
    str = str.replace(new RegExp(`\\b[υὑ]`, 'g'), 'hu')
    Object.keys(keyValueReplacementObj).forEach(k => keyValueReplacementObj[k].forEach(function (item) {
        str = str.replace(new RegExp(`${item}`, 'g'), k)
    }));
    // console.log(str);
    let transliteration=str;
    return transliteration
}
// keyValueReplacer()
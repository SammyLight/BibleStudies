// FOR GENERATING FILES FOR ALL THE BIBLE BOOKS
// Creates the files from array of bible book names

// Works best in fireFox
// Edge only downloaded the first 10 files
let allBibleBooks = bible.Data.bookNamesByLanguage.en;
// allBibleBooks.map(bk_name=>downloadFile(`{
//     "book":"${bk_name}",
//     "notes":{}
// }`, bk_name))

// allBibleBooks.map((bk_name, i) => (console.log("__" + bk_name), console.log(Array.from(Array(bible.Data.verses[i].length), x => {}))))

// allBibleBooks.map(bk_name=>downloadFile(`{
//     "book":"${bk_name}",
//     "notes":[Array.from(Array(bible.Data.verses[i].length]
// }`, bk_name))

// allBibleBooks.map(bk_name=>downloadFile('', bk_name))//  Empty file

fetch('/bible_notes/Daniel.json')
    .then(response => response.json())
    .then(jsonObject => bible_book=jsonObject);

// bible_book.notes[chapternumber-1][1][0]
// danbk.notes[11][1][0]
bible_book.notes[chapternumber-1].forEach(allNotesInChapter => {
    //'0' is verse number, while '1' is verse note
    //Check for verse number
    if(allNotesInChapter[0]==verseNumber){
        //Check for verse number
        allNotesInChapter[1]
    }
    console.log(allNotesInChapter[1])
});
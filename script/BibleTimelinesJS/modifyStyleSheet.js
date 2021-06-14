//https://stackoverflow.com/questions/13357515/how-to-dynamically-change-the-style-tag-using-javascript// Change the CSS in the style section.
// Property is the name of the class or id E.G. ".mdc-card" or "#main".
// Style is the name of the CSS style. E.G. "Background".
// Value is the setting that the style will use, E.G. "Red"
// WARNING: STOPS AND EXECUTES ON THE FIRST MATCH DOES NOT PROCESS MORE AFTER THAT!!!
function changeCSS(property, style, value, cssSectionID) {
    if (cssSectionID === undefined) {
        cssSectionID = "mainCSS";
    }
    // Get the current CSS sheet.
    var mainCSS = document.getElementById("mainCSS");
    var changeStatus = false;
    // Refine the stylesheet into a more easily processed form.
    // It is done here as making it part of the variable definition produces issues where you still need to call the sheet property.
    mainCSS = mainCSS.sheet;

    // Only execute if the user has specified values for each of the required parameters.
    if (property !== undefined && style !== undefined && value !== undefined) {
        // Loop through all of the CSS Properties until the specified property is found.
        for (var index = 0; index < mainCSS.cssRules.length; index++) {

            // Only apply the value of the property matches.
            if (mainCSS.cssRules[index].selectorText === property.toString()) {
                // Apply the specified property value to the.
                mainCSS.cssRules[index].style[style.toString()] = value.toString();

                // Sets the exit status and breaks the loop's execution.
                changeStatus = true;
                break;
            }
        }   
    }
    // Returns the result of the operation. True being successful and false being unsuccessful.
    return changeStatus;
}


/*//////////////////////////////////////////////*/
/*/below i have put all css colors with names in the option element ready to be used.
The element can be changed from option to div or button or any other element /////////////////////////////////////////////*/
  <option value="AliceBlue" style="background-color: AliceBlue">AliceBlue</option>
  <option value="AntiqueWhite" style="background-color: AntiqueWhite">AntiqueWhite</option>
  <option value="Aqua" style="background-color: Aqua">Aqua</option>
  <option value="Aquamarine" style="background-color: Aquamarine">Aquamarine</option>
  <option value="Azure" style="background-color: Azure">Azure</option>
  <option value="Beige" style="background-color: Beige">Beige</option>
  <option value="Bisque" style="background-color: Bisque">Bisque</option>
  <option value="Black" style="background-color: Black">Black</option>
  <option value="BlanchedAlmond" style="background-color: BlanchedAlmond">BlanchedAlmond</option>
  <option value="Blue" style="background-color: Blue">Blue</option>
  <option value="BlueViolet" style="background-color: BlueViolet">BlueViolet</option>
  <option value="Brown" style="background-color: Brown">Brown</option>
  <option value="BurlyWood" style="background-color: BurlyWood">BurlyWood</option>
  <option value="CadetBlue" style="background-color: CadetBlue">CadetBlue</option>
  <option value="Chartreuse" style="background-color: Chartreuse">Chartreuse</option>
  <option value="Chocolate" style="background-color: Chocolate">Chocolate</option>
  <option value="Coral" style="background-color: Coral">Coral</option>
  <option value="CornflowerBlue" style="background-color: CornflowerBlue">CornflowerBlue</option>
  <option value="Cornsilk" style="background-color: Cornsilk">Cornsilk</option>
  <option value="Crimson" style="background-color: Crimson">Crimson</option>
  <option value="Cyan" style="background-color: Cyan">Cyan</option>
  <option value="DarkBlue" style="background-color: DarkBlue">DarkBlue</option>
  <option value="DarkCyan" style="background-color: DarkCyan">DarkCyan</option>
  <option value="DarkGoldenRod" style="background-color: DarkGoldenRod">DarkGoldenRod</option>
  <option value="DarkGray" style="background-color: DarkGray">DarkGray</option>
  <option value="DarkGrey" style="background-color: DarkGrey">DarkGrey</option>
  <option value="DarkGreen" style="background-color: DarkGreen">DarkGreen</option>
  <option value="DarkKhaki" style="background-color: DarkKhaki">DarkKhaki</option>
  <option value="DarkMagenta" style="background-color: DarkMagenta">DarkMagenta</option>
  <option value="DarkOliveGreen" style="background-color: DarkOliveGreen">DarkOliveGreen</option>
  <option value="DarkOrange" style="background-color: DarkOrange">DarkOrange</option>
  <option value="DarkOrchid" style="background-color: DarkOrchid">DarkOrchid</option>
  <option value="DarkRed" style="background-color: DarkRed">DarkRed</option>
  <option value="DarkSalmon" style="background-color: DarkSalmon">DarkSalmon</option>
  <option value="DarkSeaGreen" style="background-color: DarkSeaGreen">DarkSeaGreen</option>
  <option value="DarkSlateBlue" style="background-color: DarkSlateBlue">DarkSlateBlue</option>
  <option value="DarkSlateGray" style="background-color: DarkSlateGray">DarkSlateGray</option>
  <option value="DarkSlateGrey" style="background-color: DarkSlateGrey">DarkSlateGrey</option>
  <option value="DarkTurquoise" style="background-color: DarkTurquoise">DarkTurquoise</option>
  <option value="DarkViolet" style="background-color: DarkViolet">DarkViolet</option>
  <option value="DeepPink" style="background-color: DeepPink">DeepPink</option>
  <option value="DeepSkyBlue" style="background-color: DeepSkyBlue">DeepSkyBlue</option>
  <option value="DimGray" style="background-color: DimGray">DimGray</option>
  <option value="DimGrey" style="background-color: DimGrey">DimGrey</option>
  <option value="DodgerBlue" style="background-color: DodgerBlue">DodgerBlue</option>
  <option value="FireBrick" style="background-color: FireBrick">FireBrick</option>
  <option value="FloralWhite" style="background-color: FloralWhite">FloralWhite</option>
  <option value="ForestGreen" style="background-color: ForestGreen">ForestGreen</option>
  <option value="Fuchsia" style="background-color: Fuchsia">Fuchsia</option>
  <option value="Gainsboro" style="background-color: Gainsboro">Gainsboro</option>
  <option value="GhostWhite" style="background-color: GhostWhite">GhostWhite</option>
  <option value="Gold" style="background-color: Gold">Gold</option>
  <option value="GoldenRod" style="background-color: GoldenRod">GoldenRod</option>
  <option value="Gray" style="background-color: Gray">Gray</option>
  <option value="Grey" style="background-color: Grey">Grey</option>
  <option value="Green" style="background-color: Green">Green</option>
  <option value="GreenYellow" style="background-color: GreenYellow">GreenYellow</option>
  <option value="HoneyDew" style="background-color: HoneyDew">HoneyDew</option>
  <option value="HotPink" style="background-color: HotPink">HotPink</option>
  <option value="IndianRed" style="background-color: IndianRed">IndianRed</option>
  <option value="Indigo" style="background-color: Indigo">Indigo</option>
  <option value="Ivory" style="background-color: Ivory">Ivory</option>
  <option value="Khaki" style="background-color: Khaki">Khaki</option>
  <option value="Lavender" style="background-color: Lavender">Lavender</option>
  <option value="LavenderBlush" style="background-color: LavenderBlush">LavenderBlush</option>
  <option value="LawnGreen" style="background-color: LawnGreen">LawnGreen</option>
  <option value="LemonChiffon" style="background-color: LemonChiffon">LemonChiffon</option>
  <option value="LightBlue" style="background-color: LightBlue">LightBlue</option>
  <option value="LightCoral" style="background-color: LightCoral">LightCoral</option>
  <option value="LightCyan" style="background-color: LightCyan">LightCyan</option>
  <option value="LightGoldenRodYellow" style="background-color: LightGoldenRodYellow">LightGoldenRodYellow</option>
  <option value="LightGray" style="background-color: LightGray">LightGray</option>
  <option value="LightGrey" style="background-color: LightGrey">LightGrey</option>
  <option value="LightGreen" style="background-color: LightGreen">LightGreen</option>
  <option value="LightPink" style="background-color: LightPink">LightPink</option>
  <option value="LightSalmon" style="background-color: LightSalmon">LightSalmon</option>
  <option value="LightSeaGreen" style="background-color: LightSeaGreen">LightSeaGreen</option>
  <option value="LightSkyBlue" style="background-color: LightSkyBlue">LightSkyBlue</option>
  <option value="LightSlateGray" style="background-color: LightSlateGray">LightSlateGray</option>
  <option value="LightSlateGrey" style="background-color: LightSlateGrey">LightSlateGrey</option>
  <option value="LightSteelBlue" style="background-color: LightSteelBlue">LightSteelBlue</option>
  <option value="LightYellow" style="background-color: LightYellow">LightYellow</option>
  <option value="Lime" style="background-color: Lime">Lime</option>
  <option value="LimeGreen" style="background-color: LimeGreen">LimeGreen</option>
  <option value="Linen" style="background-color: Linen">Linen</option>
  <option value="Magenta" style="background-color: Magenta">Magenta</option>
  <option value="Maroon" style="background-color: Maroon">Maroon</option>
  <option value="MediumAquaMarine" style="background-color: MediumAquaMarine">MediumAquaMarine</option>
  <option value="MediumBlue" style="background-color: MediumBlue">MediumBlue</option>
  <option value="MediumOrchid" style="background-color: MediumOrchid">MediumOrchid</option>
  <option value="MediumPurple" style="background-color: MediumPurple">MediumPurple</option>
  <option value="MediumSeaGreen" style="background-color: MediumSeaGreen">MediumSeaGreen</option>
  <option value="MediumSlateBlue" style="background-color: MediumSlateBlue">MediumSlateBlue</option>
  <option value="MediumSpringGreen" style="background-color: MediumSpringGreen">MediumSpringGreen</option>
  <option value="MediumTurquoise" style="background-color: MediumTurquoise">MediumTurquoise</option>
  <option value="MediumVioletRed" style="background-color: MediumVioletRed">MediumVioletRed</option>
  <option value="MidnightBlue" style="background-color: MidnightBlue">MidnightBlue</option>
  <option value="MintCream" style="background-color: MintCream">MintCream</option>
  <option value="MistyRose" style="background-color: MistyRose">MistyRose</option>
  <option value="Moccasin" style="background-color: Moccasin">Moccasin</option>
  <option value="NavajoWhite" style="background-color: NavajoWhite">NavajoWhite</option>
  <option value="Navy" style="background-color: Navy">Navy</option>
  <option value="OldLace" style="background-color: OldLace">OldLace</option>
  <option value="Olive" style="background-color: Olive">Olive</option>
  <option value="OliveDrab" style="background-color: OliveDrab">OliveDrab</option>
  <option value="Orange" style="background-color: Orange">Orange</option>
  <option value="OrangeRed" style="background-color: OrangeRed">OrangeRed</option>
  <option value="Orchid" style="background-color: Orchid">Orchid</option>
  <option value="PaleGoldenRod" style="background-color: PaleGoldenRod">PaleGoldenRod</option>
  <option value="PaleGreen" style="background-color: PaleGreen">PaleGreen</option>
  <option value="PaleTurquoise" style="background-color: PaleTurquoise">PaleTurquoise</option>
  <option value="PaleVioletRed" style="background-color: PaleVioletRed">PaleVioletRed</option>
  <option value="PapayaWhip" style="background-color: PapayaWhip">PapayaWhip</option>
  <option value="PeachPuff" style="background-color: PeachPuff">PeachPuff</option>
  <option value="Peru" style="background-color: Peru">Peru</option>
  <option value="Pink" style="background-color: Pink">Pink</option>
  <option value="Plum" style="background-color: Plum">Plum</option>
  <option value="PowderBlue" style="background-color: PowderBlue">PowderBlue</option>
  <option value="Purple" style="background-color: Purple">Purple</option>
  <option value="RebeccaPurple" style="background-color: RebeccaPurple">RebeccaPurple</option>
  <option value="Red" style="background-color: Red">Red</option>
  <option value="RosyBrown" style="background-color: RosyBrown">RosyBrown</option>
  <option value="RoyalBlue" style="background-color: RoyalBlue">RoyalBlue</option>
  <option value="SaddleBrown" style="background-color: SaddleBrown">SaddleBrown</option>
  <option value="Salmon" style="background-color: Salmon">Salmon</option>
  <option value="SandyBrown" style="background-color: SandyBrown">SandyBrown</option>
  <option value="SeaGreen" style="background-color: SeaGreen">SeaGreen</option>
  <option value="SeaShell" style="background-color: SeaShell">SeaShell</option>
  <option value="Sienna" style="background-color: Sienna">Sienna</option>
  <option value="Silver" style="background-color: Silver">Silver</option>
  <option value="SkyBlue" style="background-color: SkyBlue">SkyBlue</option>
  <option value="SlateBlue" style="background-color: SlateBlue">SlateBlue</option>
  <option value="SlateGray" style="background-color: SlateGray">SlateGray</option>
  <option value="SlateGrey" style="background-color: SlateGrey">SlateGrey</option>
  <option value="Snow" style="background-color: Snow">Snow</option>
  <option value="SpringGreen" style="background-color: SpringGreen">SpringGreen</option>
  <option value="SteelBlue" style="background-color: SteelBlue">SteelBlue</option>
  <option value="Tan" style="background-color: Tan">Tan</option>
  <option value="Teal" style="background-color: Teal">Teal</option>
  <option value="Thistle" style="background-color: Thistle">Thistle</option>
  <option value="Tomato" style="background-color: Tomato">Tomato</option>
  <option value="Turquoise" style="background-color: Turquoise">Turquoise</option>
  <option value="Violet" style="background-color: Violet">Violet</option>
  <option value="Wheat" style="background-color: Wheat">Wheat</option>
  <option value="White" style="background-color: White">White</option>
  <option value="WhiteSmoke" style="background-color: WhiteSmoke">WhiteSmoke</option>
  <option value="Yellow" style="background-color: Yellow">Yellow</option>
  <option value="YellowGreen" style="background-color: YellowGreen">YellowGreen</option>
/*//////////////////////////////////////////////*/
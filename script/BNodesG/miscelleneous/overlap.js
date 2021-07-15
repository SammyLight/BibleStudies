var overlaps = (function (){
    function getPositions(elem){
        var width = parseFloat(getComputedStyle(elem,null).width.replace("px", ""));
        var height = parseFloat(getComputedStyle(elem,null).height.replace("px", ""));
        return[
            [elem.offsetLeft, elem.offsetLeft + width],
            [elem.offsetTop, elem.offsetTop + height]
        ]
    }

    function comparePositions(p1,p2){
        var r1 = p1[0]<p2[0] ? p1:p2;
        var r2 = p1[0]<p2[0] ? p2:p1;
        return r1[1]>r2[0] || r1[0]===r2[0]
    }
    return function(a,b){
        var pos1 = getPositions(a),
            pos2 = getPositions(b);
            return comparePositions(pos1[0],pos2[0]) && comparePositions(pos1[1],pos2[1]);
    };
})();
// USE
// overlaps(div1, div2)
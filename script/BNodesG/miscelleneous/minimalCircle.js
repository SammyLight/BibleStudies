function createMinimalCirclePointsArray(nAr) {
    var newArray;
    for (i = 0; i < nAr.length; i++) {
        var A = nAr[i]
        var p = {
            x: getMidPoint(A, A).x,
            y: getMidPoint(A, A).y
        }
        newArray.push(p);
    }
    return newArray
}

makeCircle(createMinimalCirclePointsArray(groupArray))

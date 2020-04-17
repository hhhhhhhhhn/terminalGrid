const squares = [...Array(200).keys()].map(e=>e*e)
const cubes = [...Array(200).keys()].map(e=>e*e*e)
const tesseracts = [...Array(200).keys()].map(e=>e*e*e*e)

function pyth(a, b){
    if(squares.includes(a*a + b*b)) return true
    return false
}
function pythCubes(a, b){
    if(cubes.includes(a*a + b*b)) return true
    return false
}
function pythTess(a, b){
    if(tesseracts.includes(a*a + b*b)) return true
    return false
}

var arr1 = []
for (var i = 1; i <= 100; i++) {
    var row = []
    for (var j = 1; j <= 100; j++) {
        row.push(pyth(i,j))
    }
    arr1.push(row)
}
var arr2 = []
for (var i = 1; i <= 100; i++) {
    var row = []
    for (var j = 1; j <= 100; j++) {
        row.push(pythCubes(i,j))
    }
    arr2.push(row)
}
var arr3 = []
for (var i = 1; i <= 100; i++) {
    var row = []
    for (var j = 1; j <= 100; j++) {
        row.push(pythTess(i,j))
    }
    arr3.push(row)
}

var term = new TerminalGrid("terminal", {height:"100vh"})
term.setSequence([arr1, arr2, arr3], e=>e?"#":" ")

document.addEventListener("keydown", (e)=>{
    if(e.key == "ArrowLeft") term.seqBackwards()
    else if(e.key == "ArrowRight") term.seqForwards()
})
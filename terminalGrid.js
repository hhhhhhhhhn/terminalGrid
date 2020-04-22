class TerminalGrid{
    constructor(id, {x = 100, y = 100, height = "500px", bColor="black",
                fColor="white", fAR=1.8175}={}){ 
        this.element = document.getElementById(id)
        this.element.setAttribute("readonly", true)
        this.x = x
        this.y = y
        var hUnit = height.slice(-2)
        var hValue = Number(height.slice(0, -2))
        this.element.style.cssText = `
        position: absolute;
        background-color: ${bColor};
        color: ${fColor};
        resize: none;
        height: ${100  * y}${hUnit};
        width: ${100 * x / fAR}${hUnit};
        font-size: 100${hUnit};
        line-height: 100${hUnit};
        padding: 0;
        margin: 0;
        overflow: hidden;
        border: none;
        white-space: pre;
        transform-origin: 0px 0px;
        transform: scale(${hValue * fAR / (100 * y)}, ${hValue / (100 * y)});
        `
    }
    reshape(grid){
        if(grid.length == this.y && typeof grid[0] == "object")return grid
        var output = []
        while(grid.length) output.push(grid.splice(0,this.x))
        return output
    }
    setValue(grid, transformer = e=>String(e)){
        grid = this.reshape(grid)
        var string = ""
        for(var row of grid){
            for(var char of row){
                string += transformer(char)
            }
            string += "\n"
        }
        this.element.value = string
    }
    setSequence(grids, transformer = e=>String(e)){
        this.seq = []
        for(var grid of grids){
            grid = this.reshape(grid)
            var string = ""
            for(var row of grid){
                for(var char of row){
                    string += transformer(char)
                }
                string += "\n"
            }
            this.seq.push(string)
        }
        this.displaying = 0
        this.element.value = this.seq[0]
    }
    seqForwards(){
        if(this.displaying < this.seq.length - 1){
            this.displaying ++
            this.element.value = this.seq[this.displaying]
        }
    }
    seqBackwards(){
        if(this.displaying > 0){
            this.displaying --
            this.element.value = this.seq[this.displaying]
        }
    }
    seqJump(index){
        if(index < this.seq.length && index >= 0){
            this.displaying = index
            this.element.value = this.seq[this.displaying]
        }
    }
    setCharacter(x, y, char){
        var index = (this.x + 1) * y + x
        var str = this.element.value
        if(index % (this.x + 1) != this.x && index < str.length)
        this.element.value = str.slice(0, index) + char + str.slice(index + 1)
    }
}

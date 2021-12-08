const screen = document.getElementById('screen');
let selected = false;
const ctx = screen.getContext('2d')

screen.addEventListener('mousedown', (event) => {
    a1OffSet = Math.abs(event.offsetX - a1.x);
    a2OffSet = Math.abs(event.offsetX - a2.x);
    b1OffSet = Math.abs(event.offsetX - b1.x);
    b2OffSet = Math.abs(event.offsetX - b2.x);
    minOffset = Math.min(a1OffSet, a2OffSet, b1OffSet, b2OffSet)
    if (a1OffSet === minOffset) {
        a1.selected = true;
        a1.x = event.offsetX;
        intA.x1 = a1.x;
        drawScreen()
    }
    if (a2OffSet === minOffset) {
        a2.selected = true;
        a2.x = event.offsetX;
        intA.x2 = a2.x;
        drawScreen();
    }
    if (b1OffSet === minOffset) {
        b1.selected = true;
        b1.x = event.offsetX;
        intB.x1 = b1.x;
        drawScreen();
    }
    if (b2OffSet === minOffset) {
        b2.selected = true;
        b2.x = event.offsetX;
        intB.x2 = b2.x;
        drawScreen();
    }
})

screen.addEventListener("mousemove", (event) => {
        //code to draw new vBar object
        if (a1.selected){
            a1.x = event.offsetX;
            intA.x1 = a1.x;
            drawScreen()
        }
        if (a2.selected){
            a2.x = event.offsetX;
            intA.x2 = a2.x;
            drawScreen();
        }
        if (b1.selected){
            b1.x = event.offsetX;
            intB.x1 = b1.x;
            drawScreen()
        }
        if (b2.selected){
            b2.x = event.offsetX;
            intB.x2 = b2.x;
            drawScreen();
        }
})

window.addEventListener('mouseup', (event) => {
        //code to draw new vbar object
        if (a1.selected){
            a1.x = event.offsetX;
            intA.x1 = a1.x;
            drawScreen()
            a1.selected = false;
        }
        if (a2.selected){
            a2.x = event.offsetX;
            intA.x2 = a2.x;
            drawScreen();
            a2.selected = false;
        }
        if (b1.selected){
            b1.x = event.offsetX;
            intB.x1 = b1.x;
            drawScreen()
            b1.selected = false;
        }
        if (b2.selected){
            b2.x = event.offsetX;
            intB.x2 = b2.x;
            drawScreen();
            b2.selected = false;
        }
})

Vbar = function(x, color){
    this.x = x;
    this.selected = false;
    curentX = this.x
    this.draw = function(x) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 200);
        ctx.stroke();
    }
}
let a1 = new Vbar(30, 'purple')
let a2 = new Vbar(130, "purple");

let b1 = new Vbar(80, 'blue')
let b2 = new Vbar(180, 'blue')

Interval = function(x1, x2, y, color1, color2, name) {
    this.x1 = x1;
    this.x2 = x2;
    this.name = name;
    
    
    this.contains = function(a) {
        if ( this.min <= a && a <= this.max ){
            return true
        } else {
            return false
        }
    }
    this.draw = function() {
        if (this.x1 < this.x2) {
            this.min = this.x1;
            this.max = this.x2;
        }
        if(this.x2 < this.x1) {
            this.min = this.x2;
            this.max = this.x1;
        }
        if(this.x1 === this.x2) {
            this.min = this.x1;
            this.max = this.x2;
        }
        ctx.beginPath();
        ctx.strokeStyle = color2;
        ctx.lineWidth = 5;
        ctx.moveTo(0, y);
        ctx.lineTo(this.min, y);
        ctx.moveTo(this.max, y);
        ctx.lineTo(400, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = color1;
        ctx.moveTo(this.min, y);
        ctx.lineTo(this.max, y);
        ctx.stroke();
    }
}

let Intersection = function(int1, int2, y, color1, color2) {
    this.draw = function() {
        let points = [int1.x1, int1.x2, int2.x1, int2.x2];
        let endpoints = []
        points.forEach( function(point) {
            if ( (int1.contains(point)) && (int2.contains(point)) ) {
                endpoints.push(point);
            }
        })
        this.min = Math.min(endpoints[0], endpoints[1])
        this.max = Math.max(endpoints[0], endpoints[1])
        
        ctx.beginPath();
        ctx.strokeStyle = color2;
        ctx.lineWidth = 5;
        ctx.moveTo(0, y);
        ctx.lineTo(this.min, y);
        ctx.moveTo(this.max, y);
        ctx.lineTo(400, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = color1;
        ctx.moveTo(this.min, y);
        ctx.lineTo(this.max, y);
        ctx.stroke();
    }
}

let Union = function(int1, int2, y, color1, color2) {
    this.draw = function() {
        let namedpoints = [[int1.x1, int1.name], [int1.x2, int1.name], [int2.x1, int2.name], [int2.x2, int2.name]];
        let points = [int1.x1, int1.x2, int2.x1, int2.x2]
        points = points.sort(function(a, b){return a-b});
        let namedsorted = []
        points.forEach( (point) => {
            namedpoints.forEach( (name) => {
                if (point === name[0]) {
                    namedsorted.push(name);
                }
            })
        })
        console.log(points)
        console.log(typeof points[0])
        

        if(namedsorted[0][1] === namedsorted[3][1]) {
            this.min = namedsorted[0][0];
            this.max = namedsorted[3][0];
            drawint(this.min, this.max, y, color1, color2)
        }
        else if(namedsorted[0][1] != namedsorted[3][1] && namedsorted[0][1] != namedsorted[1][1]) {
            this.min = namedsorted[0][0];
            this.max = namedsorted[3][0];
            drawint(this.min, this.max, y, color1, color2)
        } else {
            drawint(namedsorted[0][0], namedsorted[1][0], y, color1, color2)
            drawint(namedsorted[2][0], namedsorted[3][0], y, color1, '#00000000')
        }

        // ctx.beginPath();
        // ctx.strokeStyle = color2;
        // ctx.lineWidth = 5;
        // ctx.moveTo(0, y);
        // ctx.lineTo(this.min, y);
        // ctx.moveTo(this.max, y);
        // ctx.lineTo(400, y);
        // ctx.stroke();
        // ctx.beginPath();
        // ctx.lineWidth = 5;
        // ctx.strokeStyle = color1;
        // ctx.moveTo(this.min, y);
        // ctx.lineTo(this.max, y);
        // ctx.stroke();
    }
}

let intA = new Interval(a1.x, a2.x, 20, 'black', '#999', 'A')
let intB = new Interval(b1.x, b2.x, 40, 'black', '#999', 'B')
let intersectionAB = new Intersection(intA, intB, 70, 'black', '#999')
let unionAB = new Union(intA, intB, 80, 'black', '#999')

function drawint(min, max, y, color1, color2) {
        ctx.beginPath();
        ctx.strokeStyle = color2;
        ctx.lineWidth = 5;
        ctx.moveTo(0, y);
        ctx.lineTo(min, y);
        ctx.moveTo(max, y);
        ctx.lineTo(400, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = color1;
        ctx.moveTo(min, y);
        ctx.lineTo(max, y);
        ctx.stroke();
}

function drawScreen() {
    ctx.clearRect(0, 0, 400, 200);
    a1.draw(a1.x)
    a2.draw(a2.x)
    b1.draw(b1.x)
    b2.draw(b2.x)
    intA.draw()
    intB.draw()
    intersectionAB.draw();
    unionAB.draw();
}
drawScreen();
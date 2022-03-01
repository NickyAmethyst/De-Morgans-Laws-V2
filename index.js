//instantiate canvase object
const screen = document.getElementById('screen')
const ctx = screen.getContext('2d')

// initialize state variable for event listener
let selected = false;

// The following event listeners, 'mousedown', 'mousemove',
// and 'mouseup' are used to track curser position data 
// so that the 'Interval' objects that demarkate the intervals
// can be clicked and dragged
screen.addEventListener('mousedown', (event) => {
    ax1_OffSet = Math.abs(event.offsetX - intA.x1);
    ax2_OffSet = Math.abs(event.offsetX - intA.x2);
    bx1_OffSet = Math.abs(event.offsetX - intB.x1);
    bx2_OffSet = Math.abs(event.offsetX - intB.x2);
    minOffset = Math.min(ax1_OffSet, ax2_OffSet, bx1_OffSet, bx2_OffSet)
    if (ax1_OffSet === minOffset) {
        intA.x1_selected = true;
        intA.x1 = event.offsetX;
        //intA.x1 = a1.x;
        drawScreen()
    }
    if (ax2_OffSet === minOffset) {
        intA.x2_selected = true;
        intA.x2 = event.offsetX;
        //intA.x2 = a2.x;
        drawScreen();
    }
    if (bx1_OffSet === minOffset) {
        intB.x1_selected = true;
        intB.x1 = event.offsetX;
        //intB.x1 = b1.x;
        drawScreen();
    }
    if (bx2_OffSet === minOffset) {
        intB.x2_selected = true;
        intB.x2 = event.offsetX;
        //intB.x2 = b2.x;
        drawScreen();
    }
})

screen.addEventListener("mousemove", (event) => {
        //code to draw new vBar object
        if (intA.x1_selected){
            intA.x1 = event.offsetX;
            //intA.x1 = a1.x;
            drawScreen()
        }
        if (intA.x2_selected){
            intA.x2 = event.offsetX;
            //intA.x2 = a2.x;
            drawScreen();
        }
        if (intB.x1_selected){
            intB.x1 = event.offsetX;
            //intB.x1 = b1.x;
            drawScreen()
        }
        if (intB.x2_selected){
            intB.x2 = event.offsetX;
            //intB.x2 = b2.x;
            drawScreen();
        }
})

window.addEventListener('mouseup', (event) => {
        //code to draw new interval object
        if (intA.x1_selected){
            intA.x1 = event.offsetX;
            drawScreen()
            intA.x1_selected = false;
        }
        if (intA.x2_selected){
            intA.x2 = event.offsetX;
            drawScreen();
            intA.x2_selected = false;
        }
        if (intB.x1_selected){
            intB.x1 = event.offsetX;
            drawScreen()
            intB.x1_selected = false;
        }
        if (intB.x2_selected){
            intB.x2 = event.offsetX;
            drawScreen();
            intB.x2_selected = false;
        }
})

//  'Interval' Object constructor function
let Interval = function(x1, x2, y, color1, color2, color_vbar, name) {
    this.x1 = x1;
    this.x2 = x2;
    this.name = name;
    this.x1_selected = false
    this.x2_selected = false
    
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
        drawint(this.min, this.max, y, color1, color2)

        ctx.strokeStyle = color_vbar;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x1, 0);
        ctx.lineTo(this.x1, 150);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x2, 0);
        ctx.lineTo(this.x2, 150);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.strokeText(name, 310, y+2.5)
    }
}

//  'Intersection' Object constructor function
let Intersection = function(int1, int2, y, color1, color2) {
    this.draw = function() {
        // Determine which points are the intersection endpoints
        let points = [int1.x1, int1.x2, int2.x1, int2.x2];
        let endpoints = []
        points.forEach( function(point) {
            if ( (int1.contains(point)) && (int2.contains(point)) ) {
                endpoints.push(point);
            }
        })
        this.min = Math.min(endpoints[0], endpoints[1])
        this.max = Math.max(endpoints[0], endpoints[1])
        drawint(this.min, this.max, y, color1, color2)
        ctx.lineWidth = 1;
        ctx.strokeText("A intersection B", 310, y+2.5)
    }
}

//  'Union' object constructor function
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
        ctx.lineWidth = 1;
        ctx.strokeText("A union B", 310, y+2.5)
    }
}


//  instantiating user interface canvas components
let intA = new Interval(30, 130, 30, 'black', '#999','purple', 'A')
let intB = new Interval(80, 180, 50, 'black', '#999','blue', 'B')
let intersectionAB = new Intersection(intA, intB, 90, 'black', '#999')
let unionAB = new Union(intA, intB, 110, 'black', '#999')

// Function to draw an interval and its complement
function drawint(min, max, y, color1, color2) {
        ctx.beginPath();
        ctx.strokeStyle = color2;
        ctx.lineWidth = 5;
        ctx.moveTo(0, y);
        ctx.lineTo(min, y);
        ctx.moveTo(max, y);
        ctx.lineTo(300, y);
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
    intA.draw()
    intB.draw()
    intersectionAB.draw();
    unionAB.draw();
}

drawScreen();
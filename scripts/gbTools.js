function equationSolver(eq){
	ls = algebra.parse(eq);
	rs = algebra.parse("0");
	let formedEq = new algebra.Equation(ls, rs);
	let sSol = formedEq.solveFor("x").toString();
	if (sSol){
		return formedEq.solveFor("x").toString().split(",").map(function(x){
			return Number(x);
	})
	}
	else return []
}

function getyCut(eq){
	return math.parse(eq).eval({x:0})
}

function draw(targetElem, func) {
	try {
		functionPlot({
        target: targetElem,
		grid:true,
		tip:{
			xLine:true,
			yLine:true
		},
		
        data: [{
			fn: func,
			sampler: 'builtIn', 
			graphType: 'polyline',
			skipTip: false,
			color : 'red'
        }]
      });
    }
    catch (err) {
		console.log(err);
		alert(err);
    }
}

function fnType(fn){
	if(fn.search(/\^/i)>-1){
		return 1
	}
	else return 0
}

function getSlope(fn){
	let slope = null
	try{
		slope = Number(new RegExp(/\-?(\d+)/).exec(fn)[1]);
	}
	catch(err){
		slope = 1
	}
	if(fn[0]=='-'){
		slope *= -1;
	}
	return slope;
}

function getVertex(fn){
	let a = Number(new RegExp(/\-?\d+/).exec(fn)[0]);
	let b = 0;
	try{
		let b = Number(new RegExp(/\^2\+?(\-?\d+)x/).exec(fn)[1]);
	}
	catch(err){
		
	}
	let vertX = -b/(2.0*a);
	let vertY =  math.parse(fn).eval({x:vertX})
	return [vertX, vertY];
}

function randi(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function trickRandi(min, max, act){
	let newRandi = randi(min, max);
	while(newRandi == act){
		newRandi = randi(min, max);
	}
	return newRandi;
}


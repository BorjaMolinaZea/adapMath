let fns = ['x','-x-3','-2x^2', 'x'];
let idDrawArea = "#plot";

var app = new Vue({
	el: '#task3_1',
	phase : 1,
	data: {
		phase : 1,
		cont : 0,
		lvl : 0,
		cEqi : randi(0,fns.length-1),
		uFnType : 0,
		slope : null,
		vertex : [null, null],
		yCut : null,
		xCut : [null, null],
		vertex : [null, null],
		slope : null,
		correct : [0, 0, 0, 0],
		incorrect : [0, 0, 0, 0],
		streak : 0, 
		givenAnsw : false,
		isCorrect : false,
		errorLog : [false, false, false, false, false, false]
	},
	
	methods : {
		isLinear: function(){
			return true;
		},
		getFn : function(){
			return fns[this.cEqi]
		},
		draw : function(){
			draw(idDrawArea, this.getFn())
		},
		isLinear : function(){
			return Number(this.uFnType) ? false : true;
		},
		answ : function(){
			this.isCorrect = false;
			this.givenAnsw = true;
			
			this.xCut.forEach((x)=>{
				x = Number(x)
			})
			
			if(this.uFnType != fnType(this.getFn())){
				if(this.uFnType){
					this.errorLog[0] = true
				}
				else{
					this.errorLog[1] = true
				}
			}
			
			let xResponse = equationSolver(this.getFn());
			if(fnType(this.getFn()) == 0){
				let slopeResponse = getSlope(this.getFn())
				if(xResponse[0]!=this.xCut[0]){
					this.errorLog[2] = true;
				}
				if(slopeResponse != this.slope){
					this.errorLog[4] = true;
				}
			}
			else{
				let vertexResponse = getVertex(this.getFn());
				this.errorLog[2] = this.xCut.every((x)=>{
					return xResponse.indexOf(x) > -1;
				})
				let isVertexCorrect = this.vertex.every((x, i)=>{
					return x == vertexResponse[i];
				})
				if(!isVertexCorrect){
					this.errorLog[5] = true;
				}
			}
			
			if(this.yCut != getyCut(this.getFn())){
				this.errorLog[3] = true
			}
			
			this.isCorrect = !this.errorLog.reduce((x, y)=>{
				return x || y;
			})
			
			if(this.isCorrect){
				this.streak += 1;
				if(this.streak == 4){
					this.streak = 0;
					this.phase += 1;
					this.correct[this.phase-1] += 1
				}
			}
			else{
				this.streak += 0;
				this.incorrect[this.phase-1] += 1
			}
			
			if(this.phase == 1){
				this.draw();
			}
			else if(this.phase == 2){
				
			}
		},
		nextQ : function(){
			this.givenAnsw = false;
			this.cEqi += 1;
		}
	}
})

app.draw();

/*let cPhase = 0;
let selectedFn = 0;

let mData = [
	['-x-1','2x^2-4x'],
	['x+2', 'x'],
	[]
]

function addRootGUI(){
	function getNewID(current){
		return "root"+String(current);
	}
	
	nRoots = nGUIRoots();
	
	if(nRoots == 1){
		let newID = getNewID(nGUIRoots());
		
		let newDiv = document.createElement("DIV");
		newDiv.setAttribute("class", "rootGroup");  
		
		let newSpan2 = document.createElement("SPAN"); 
		newSpan2.innerHTML = "x = 0, ";
		
		let newLabel = document.createElement("LABEL");  
		newLabel.setAttribute("for", newID); 
		newLabel.innerHTML = "y = ";
		
		let newInput = document.createElement("INPUT");  
		newInput.setAttribute("id", newID);
		newInput.setAttribute("class", "form-control input-sm rootInput ipInputPh1");
		newInput.setAttribute("type", "number");

		newDiv.appendChild(newSpan2);
		newDiv.appendChild(newLabel);
		newDiv.appendChild(newInput);
		newDiv.appendChild(document.createElement("BR"));
		
		document.getElementById("roots3_1_ph1").appendChild(newDiv);
	}
}

function deleteRootGUI(){
	let lastIndex = nGUIRoots() - 1;
	if (lastIndex > 0){
		let parent = document.querySelectorAll("div#roots3_1_ph1")[0];
		let elemToRemove =  document.querySelectorAll("div.rootGroup")[lastIndex];
		parent.removeChild(elemToRemove);
	}
}

function nGUIRoots(){
	return document.querySelectorAll("INPUT.rootInput").length;
}

function getSolutions(fn){
	let fType = fnType(fn);;
	let hasVertex = fType == 1 ? true : false;
	let vertexPoints = [null, null];
	if(hasVertex){
		vertexPoints = getVertex(fn);
	}
	let solutions = {
		sType : fnType(fn),
		sRoots : equationSolver(fn),
		syCut : getyCut(fn), 
		vertexX : hasVertex ? vertexPoints[0] : null,
		vertexY : hasVertex ? vertexPoints[1] : null,
	}
	return solutions
}

function areRootsCorrect(cr, ur){
	areCorrect = true;
	for(var i=0, size = cr.length; i<size; i++){
		var elem = cr[i];
		areCorrect = ur.includes(elem) ?  true : false;
	}
	return areCorrect;
}

function feedback(){
	let cFn = mData[cPhase][selectedFn];
	solutions =  getSolutions(cFn);
	let responses = {
		sType : Number($('input[name="tFunc"]:checked').val()),
		sRoots : Array.prototype.slice.call(document.querySelectorAll(".rootInput")).map(function(elem){return elem.value ? Number(elem.value):null}),
		syCut : Number($('input#yCut').val()),
		vertexX  : Number($('input.vertX').val()),
		vertexY : Number($('input.vertY').val())
	}
	
	let correctVertex = false;
	if(solutions.sType!=1){
		correctVertex = true;
		document.querySelector("span#quadraticTip").setAttribute("style", "display:none");
		document.querySelectorAll("span.error5").forEach((elem)=>elem.setAttribute("style", "display:none"));
	}
	else{
		document.querySelector("span#quadraticTip").setAttribute("style", "display:inline");;
		if(responses.vertexX == solutions.vertexX && responses.vertexY == solutions.vertexY){
			correctVertex = true
		}
		else{
			correctVertex = false
		}
	}
	
	let correction = {
		type : responses.sType == solutions.sType ? true : false,
		roots : areRootsCorrect(solutions.sRoots, responses.sRoots),
		yCut : responses.syCut == solutions.syCut ? true : false,
		vertex : correctVertex
	}
	
	document.querySelector(".feedback").setAttribute("style", "display:block");
	isAllCorrect = Object.values(correction).every((x) => {return x});
	
	if(isAllCorrect){
		document.querySelector(".correctFb").setAttribute("style", "display:block");
	}
	else{
		document.querySelector(".incorrectFb").setAttribute("style", "display:block");
		document.querySelector(".errorLog").setAttribute("style", "display:block");
		if(!correction.type){
			if(solutions.sType == 1){
				document.querySelectorAll(".error1").forEach((elem)=>{elem.setAttribute("style", "display:block")});
			}
			else{
				document.querySelectorAll(".error2").forEach((elem)=>{elem.setAttribute("style", "display:block")});
			}
		}
		if(!correction.roots){
			document.querySelectorAll(".error3").forEach((elem)=>{elem.setAttribute("style", "display:block")});
			let xCutText = "";
			solutions.sRoots.forEach((elem, i, arr)=>{
				xCutText = "(";
				xCutText += String(elem) + ", 0)";
				if(i < arr.length-1){
					xCutText += ", ";
				}
			})
			document.querySelector("#xCutFb").innerHTML = xCutText;			
		} 
		if(!correction.yCut){
			document.querySelectorAll(".error4").forEach((elem)=>{elem.setAttribute("style", "display:block")});
			document.querySelector("#yCutFb").innerHTML = "(0, "+String(solutions.syCut)+")";	
		}			
		if(!correction.vertex){
			document.querySelectorAll(".error5").forEach((elem)=>{elem.setAttribute("style", "display:block")});
			document.querySelector("#vertexFb").innerHTML = "("+String(solutions.vertexX)+", "+String(solutions.vertexY)+")";	
		} 
	}
	selectedFn = (selectedFn+1)%2;
	if(selectedFn == 0){
		cPhase += 1;
	}
}

function nextQ(){
	document.querySelector(".feedback").setAttribute("style", "display:none");
	document.querySelector(".correctFb").setAttribute("style", "display:none");
	document.querySelector(".incorrectFb").setAttribute("style", "display:none");
	document.querySelector(".errorLog").setAttribute("style", "display:none");
	document.querySelector(".errorLogLine").setAttribute("style", "display:none");
	document.querySelectorAll(".error1").forEach((elem)=>elem.setAttribute("style", "display:none"));
	document.querySelectorAll(".error2").forEach((elem)=>elem.setAttribute("style", "display:none"));
	document.querySelectorAll(".error3").forEach((elem)=>elem.setAttribute("style", "display:none"));
	document.querySelectorAll(".error4").forEach((elem)=>elem.setAttribute("style", "display:none"));
	document.querySelectorAll(".error5").forEach((elem)=>elem.setAttribute("style", "display:none"));
	
	let fType = fnType(mData[cPhase][selectedFn]);
	if(cPhase==0){
		//draw('#plot', mData[cPhase][selectedFn]);
		if(fType != 1){
			document.querySelector(".vertInput").setAttribute("style", "display:none");
		}
		else{
			document.querySelector(".vertInput").setAttribute("style", "display:block");
		}
	}
	else if(cPhase==1){
		document.querySelector("#plot").setAttribute("style", "display:none");
		document.querySelector("#funcExpr").innerHTML = mData[cPhase][selectedFn];
		if(fType != 1){
			document.querySelector(".vertInput").setAttribute("style", "display:none");
		}
		else{
			document.querySelector(".vertInput").setAttribute("style", "display:block");
		}
	}
}

document.getElementById("addRootGUIPh1").addEventListener("click", addRootGUI);
document.getElementById("deleteRootGUIPh1").addEventListener("click", deleteRootGUI);
document.getElementById("response").addEventListener("click", feedback);
document.getElementById("nextQ").addEventListener("click", nextQ);
draw('#plot', mData[cPhase][selectedFn]);
let fType = fnType(mData[cPhase][selectedFn]);
if(fType != 1){
	document.querySelector(".vertInput").setAttribute("style", "display:none");
}*/

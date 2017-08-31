var app = new Vue({
	el: '#task1_1',
	data: {
		phase : 1,
		cont : 0,
		lvl : 0,
		lvlText : [
			"No identifica funciones",
			"Identifica funciones en al menos una forma",
			"Identifica funciones dadas en forma de gráficas, tabla de valores y expresiones algebraicas pero no dadas en forma de enunciado",
			"Identifica funciones independientemente de su representación"
		],
		iItem : randi(0, 7),
		correct : [0,0,0,0],
		incorrect : [0,0,0,0],
		resp : false,
		isCorrect : false,
		correction : "",
		charts : [true, false, true, false, true, true, false, true],
		chartsPath : "media/1_1/charts/",
		chartsExt : ".png",
		get cImage(){
			return this.chartsPath + String(this.iItem+1) + this.chartsExt
		},
		cExpr : null,
		cTable : null,
		cEnun : ["a", true, "a"],
		enunIndex : 0,
		commonChartTrue : "La gráfica sí representa una función, a cada valor de la variable independiente le corresponde un único valor de la variable dependiente. Podemos comprobar que una gráfica es una función si es imposible trazar una recta paralela al eje OY tal que corte a la gráfica en dos o más puntos.",
		commonChartFalse : "La gráfica no representa una función, hay valores de la variable independinte a los que le corresponde dos valores distintos. Podemos comprobar que una gráfica no es una función si es posible trazar una recta paralela al eje OY tal que corte a la gráfica en dos o más puntos.",
		commonFn : "La expresión si representa una función, ya que para todo valor (dentro de su dominio) de la variable independiente le corresponde un único valor de la variable dependiente. ",
		commonTable : "La tabla de valores si representa una función porque a todo valor de la variable independiente le corresponde único valor de la variable independiente.",
		get exprs(){ return [
			["y = x-x+1", true, this.commonFn+"En este caso se trata de una función lineal"],
			["y^2 + x^2 = 1", false, "La expresión representa la circunferencia de radio 1 y centro en el punto (0,0), hay valores de la varialbe independiente para los que tenemos dos valores de la variable dependiente, por lo tanto no se trata de una función"],
			["y = -x^2-x", true, this.commonFn+"En este caso se trata de una función cuadrática"],
			["y = 1", true, this.commonFn+"En este caso se trata de la función constantemente 1, es decir para cualquier valor de la variable independiente la variable dependiente siempre valdrá 1"],
			["x = 1", false, "La expresión representa el hecho de que la variable dependiente toma infinitos valores en x = 1 (una linea vertical), por lo tanto no se trata de una función"],
			["y = |x|", true, this.commonFn+"En este caso se trata de la función valor absoluto, la cual se define como f(x) = -x si x<0 y f(x) = x si x>=0. Es decir para todo valor de la función tal que f(x) < 0 lo convierte en positivo. El valor absoluto está relacionado con las nociones de magnitud y distancia en diferentes contextos matemáticos y físicos. En general, el valor absoluto de la diferencia de dos números reales es la distancia entre ellos."],
			["|y| = x", false, "La expresión no es una función porque existen valores de la variable dependiente a los cuales les corresponden dos valores posibles de la variable independiente, por ejemplo para x = 1 tenemos que y = 1 o y = -1"],
			["y = -x^3-x", true, this.commonFn+"En este caso se trata de una función cúbica."]
		]},
		get vTables(){return [
			[[1, 2, 3, 4, 5], [1, 2, 3, 4, 5], true, this.commonTable],
			[[1, 2, 3, 4, 5], [1, 2, 2, 1, 1], true, this.commonTable],
			[[1, 2, 3, 4, 5], [1, 1, 1, 1, 1], true, this.commonTable],
			[[1, 1, 1, 1, 1], [1, 2, 3, 4, 5], false, "Al valor 1 de la variable independiente le corresponden multiples valores de dependiente, por lo tanto la tabla no representa una función"],
			[[1, 1, 3, 4, 5], [1, 2, 2, 3, 4], false, "Para el valor x = 1 tenemos que y puede tomar los valores 1 o 2, por lo tanto no se trata de una función"],
		]},
		enunciados : [
			["La relación entre el radio de una circunferencia y su longitud", true, "Sí se trata de una función, en contreto f(r) = 2*PI*r, para un radio 'r' dado tan solo existe un posible valor 'l' de la longitud de la circunferencia y dicho valor siempre es el mismo"],
			["La relación entre el coste de una compra y el número de artículos comprados", false, "El número de artículos comprados determina el coste de la compra, pero la relación no es una función, el coste final dependeráo solo del número de artículos sino también del precio de cada uno de ellos, es facil ver que comprar dos manzanas no cuesta los mismo que comprar dos coches"],
			["La relación entre el volumen de un recipiente y los litros de agua necesarios para llenarlo", true, "Para un recipiente de un volumen 'v' siempre harán falta los mismos litros de agua para rellenarlo, independientemente de su forma."],
			["La temperatura y el número de persona en la playa", false, "Por lo general cuanta mayor sea la temperatura más persona habrá en la playa, pero dicha relación no es una función, dos días con la misma temperatura pueden tener distinto nímero de persona en la playa, por lo tanto la relación, aunuqe existente, no es una función."]
		]
	},
	methods: {
		response: function (uval) {
			if(this.resp) return;
			this.resp = true;
			let fullCorrection = this.getCorrection(uval);
			this.isCorrect = fullCorrection.correct;
			this.correction = fullCorrection.correction;
			if(this.phase < 4){
				if(this.isCorrect){
					this.cont += 1;
					this.correct[this.phase-1] += 1;
				}
				else{
					this.cont = 0;
					this.incorrect[this.phase-1] += 1;
				}				
			}
			else{
				this.cont += 1;
				if(this.isCorrect){
					this.correct[this.phase-1] += 1;
				}
				else{
					this.incorrect[this.phase-1] += 1;
				}	
			}	
		},
		next : function(){
			this.resp = false;
			let phaseChange = false;
			
			if(this.cont == 4){
				this.phase += 1;
				this.cont = 0;
				phaseChange = true;
				if(this.phase == 2){
					this.lvl = 1;
				}
				else if(this.phase == 4){
					this.lvl = 2;
				}
				else if(this.phase == 5){
					clearInterval(borClock.end());
					if(this.correct[3] == this.enunciados.length){
						this.lvl = 3;
					}
				}
			}
			if(this.phase == 1){
				let range = this.charts.length;
				this.iItem = trickRandi(0, range-1, this.iItem);
				this.cImage = this.getImgName();
			}
			else if(this.phase == 2){
				range = this.exprs.length;
				this.iItem = trickRandi(0, range-1, this.iItem);
				this.cExpr = this.exprs[this.iItem];
			}
			else if(this.phase == 3){
				range = this.vTables.length;
				this.iItem = trickRandi(0, range-1, this.iItem);
				this.cTable = this.vTables[this.iItem];
			}
			else if(this.phase == 4){
				if(phaseChange){
					this.enunIndex = 0;
				}
				else{
					this.enunIndex += 1;
				}				
				this.cEnun = this.enunciados[this.enunIndex];
			}
		},
		formatExpr : function (expr){
			return expr.replace(/\^(\d+)/g, "<sup>$1</sup>");
		},
		getImgName : function(){

			return this.chartsPath + String(this.iItem+1) + this.chartsExt;
		},
		getCorrection : function(uval){
			cItem = {
				correct : false,
				correction : ""
			};
			if(this.phase == 1){
				cItem.correct = uval == this.charts[this.iItem] ? true : false;
				cItem.correction = uval ?  this.commonChartFalse : this.commonChartTrue;
			}
			else if(this.phase == 2){
				cItem.correct = uval == this.cExpr[1] ?  true : false;
				cItem.correction = this.cExpr[2] 
			}
			else if(this.phase == 3){
				cItem.correct = uval == this.cTable[2] ?  true : false;
				cItem.correction = this.cTable[3] 
			}
			else if(this.phase == 4){
				cItem.correct = uval == this.cEnun[1] ?  true : false;
				cItem.correction = this.cEnun[2] 
			}
			return cItem;
		},
		getnCorrects : function(){
			return this.correct.reduce((x, y) => {
				return x + y;
			})
		},
		getnIncorrects : function(){
			return this.incorrect.reduce((x, y) => {
				return x + y;
			})
		},
		getnTotal : function(){
			return this.getnCorrects()+ this.getnIncorrects();
		},
		getPercentCorrection : function(){
			return this.getnCorrects()/this.getnTotal()*100;
		}
	}
})
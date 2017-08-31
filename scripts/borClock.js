function formatTime(time){
	let mins = String(parseInt(time/60));
	mins = mins.length == 1 ? "0"+mins : mins;
	let secs = String(time%60);
	secs = secs.length == 1 ? "0"+secs : secs;
	return mins+":"+secs;
}

let borClock = {
	domElement : document.querySelector(".borClock"),
	tickLen : 1,
	time : 15*60,
	idInterval : -1,
	end : function(){
		clearInterval(this.idInterval);
		app.phase = 5;
		this.domElement.innerHTML = "";
	},
	init : function(){
		this.domElement.innerHTML = formatTime(this.time);
		this.idInterval = setInterval(()=>{
			this.time -= this.tickLen;
			this.domElement.innerHTML = formatTime(this.time);
			if(this.time == 0){
				this.end();
			}
		}, this.tickLen*1000);
	}
}

borClock.init();
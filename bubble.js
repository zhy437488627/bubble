window.onload=function(){
	var canva=document.getElementById("bubble");
	
	var w=window.innerWidth;
	var h=window.innerHeight;
	
	canva.width=w;
	canva.height=h;
	
	window.onresize=function(){
		 w=window.innerWidth;
	     h=window.innerHeight;
	     canva.width=w;
	     canva.height=h;
	}
	var canvas=canva.getContext("2d");
	colorArry=["#123456","#653421","#432565","#ff4567","#876578","#733727"];
	function random(min,max){
		return Math.random()*(max-min)+min;
	}
	function Bubble(){};
	Bubble.prototype={
		init:function(){
			this.x=random(0,w);
			this.y=random(0,h);
			this.r=random(0,3);
			this.color=colorArry[Math.floor(random(0,7))];
			this.xr=random(-1,1);
			this.yr=random(-1,1);
			this.biggerR=70;
		},
		draw:function(){
			canvas.beginPath();
			canvas.fillStyle=this.color;
			canvas.arc(this.x,this.y,this.r,0,Math.PI*2);
			canvas.fill();
		},
		update:function(){
			this.x+=this.xr;
			this.y+=this.yr;
			this.Dx=(positionX-this.x)<0?-(positionX-this.x):(positionX-this.x);
			this.Dy=(positionY-this.y)<0?-(positionY-this.y):(positionY-this.y);
			if(this.Dx<this.biggerR&&this.Dy<this.biggerR){
				this.r=this.r>13?13:(this.r+1);
			}
			if(this.x-this.r<0||this.x+this.r>w){
				this.xr=-this.xr;
			}
			if(this.y-this.r<0||this.y+this.r>h){
				this.yr=-this.yr;
			}
			
			else if(this.r>3&&this.Dx>this.biggerR&&this.Dy>this.biggerR){
				this.r-=1;
			}
		
		
			this.draw();
		},
//		update2:function(){
//			this.x+=this.xr;
//			this.y+=this.yr;
//			if(this.x-this.r<0||this.x+this.r>w){
//				this.xr=-this.xr;
//			}
//			if(this.y-this.r<0||this.y+this.r>h){
//				this.yr=-this.yr;
//			}
//			this.Dx=(positionX1-this.x)<0?-(positionX1-this.x):(positionX1-this.x);
//			this.Dy=(positionY1-this.y)<0?-(positionY1-this.y):(positionY1-this.y);
//			if(this.Dx<this.biggerR&&this.Dy<this.biggerR){
//				this.r=this.r>13?13:(this.r+1);
//			}
//			else if(this.r>3&&this.Dx>this.biggerR&&this.Dy>this.biggerR){
//				this.r-=1;
//			}
//		
//			this.draw();
//		};
		
	};
	bubbleArry=[];
	function Create(){
		var bubble=new Bubble();
		bubble.init();
		bubble.draw();
		bubbleArry.push(bubble);
	};
	for(var q=0;q<800;q++){
		Create();
	}
	setInterval(function(){
		canvas.clearRect(0,0,w,h);
		for(var d of bubbleArry){
			d.update();
		}
	},1000/60);
	var positionX;
	var positionY;
	var positionX1;
	var positionY1;
	canva.onmousemove=function(){
		var ev=ev||window.event;
		positionX=ev.clientX;
		positionY=ev.clientY;
	}

}

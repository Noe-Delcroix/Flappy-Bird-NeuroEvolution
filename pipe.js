class Pipe{
  constructor(){
    this.space=175
    this.w=100
    this.pos=createVector(width+this.w/2,random(this.space/2,height-this.space/2))
    
    this.del=false
  }
  
  
  update(){
    this.pos.x-=globalSpeed
    
    if (this.pos.x<-this.w/2){
      this.del=true
    }
  }
  
  render(){
    fill(124, 255, 114)
    noStroke()
    rectMode(CORNER)
    rect(this.pos.x-this.w/2,this.pos.y-this.space/2,this.w,-height)
    rect(this.pos.x-this.w/2,this.pos.y+this.space/2,this.w,height)
  }
}
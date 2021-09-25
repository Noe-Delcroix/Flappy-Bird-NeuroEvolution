class Bird{
  constructor(brain){
    this.pos=createVector(100,height/2)
    this.vel=random(-10,13)
    this.r=20
    
    this.score=0
    
    if (brain instanceof NeuralNetwork){
      this.brain=brain.copy()
    }else{
      this.brain=new NeuralNetwork([5,5,1])
    }
    this.dead=false
  }
  update(){
    
    if (this.dead){
      this.pos.x-=globalSpeed
    }else{
      this.dead=this.collide()
      if (this.getGuess()>0.5){
        this.jump()
      }
      this.vel+=0.7
      this.vel=min(13,this.vel)
      this.pos.y+=this.vel
      this.score++
      if (this.score>maxScore){
        maxScore=this.score
      }
    }  
  }
  getGuess(){
    let nextPipe
      for (let p of pipes){
        if (p.pos.x+p.w/2>this.pos.x){
          nextPipe=p
          break
        }
      }
    
      let inputs=[]
      
      inputs.push(this.pos.y/height)
      inputs.push((nextPipe.pos.y-nextPipe.space/2)/height)
      inputs.push((nextPipe.pos.y+nextPipe.space/2)/height)
      inputs.push((nextPipe.pos.x-nextPipe.w/2)/width)
      inputs.push(map(this.vel,-11,13,0,1))
      let guess=this.brain.guess(inputs)[0]
      return guess
  }
  
  jump(){
    this.vel=-11
  }
  collide(){
    if (this.pos.y>height-this.r || this.pos.y<this.r){
      return true
    }
    
    for (let p of pipes){
      if (collideRectCircle(p.pos.x-p.w/2,p.pos.y-p.space/2-height*10,p.w,height*10,this.pos.x,this.pos.y,this.r*2)){
        return true
      }
      if (collideRectCircle(p.pos.x-p.w/2,p.pos.y+p.space/2,p.w,height,this.pos.x,this.pos.y,this.r*2)){
        return true
      }
    }
    return false
  }
  
  render(){
    if (this.dead){
      fill(255, 160, 160,100)
    }else{
      fill(250, 255, 109,100)
    }
    noStroke()
    circle(this.pos.x,this.pos.y,this.r*2)
  }
  
  
}
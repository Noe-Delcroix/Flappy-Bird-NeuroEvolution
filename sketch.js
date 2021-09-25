const globalSpeed = 5;
const population=300

var birds = []

var pipes = []

var globalScore = 0

var generation=1
var maxScore=0

function setup() {
  createCanvas(800, 600);
  speed=createSlider(1,30,1,1)
  for (let i = 0; i < population; i++) {
    birds.push(new Bird())
  }
}

function draw() {
  let remaining = 0
  for (let n = 0; n < speed.value(); n++) {

    //updating
    if (globalScore % 80 == 0) {
      pipes.push(new Pipe())
    }
    globalScore++
    remaining = 0
    for (let b = birds.length - 1; b >= 0; b--) {
      birds[b].update()
      if (!birds[b].dead) {
        remaining++
      }
    }
    if (remaining == 0) {
      nextGen()
    }

    for (let p = pipes.length - 1; p >= 0; p--) {
      pipes[p].update()
      if (pipes[p].del) {
        pipes.splice(p, 1)
      }
    }
  }
  background(0);
  //rendering
  for (let p of pipes) {
    p.render()
  }
  for (let b of birds) {
    b.render()
  }
  
  fill(255)
  stroke(0)
  strokeWeight(3)
  textAlign(LEFT ,TOP)
  textSize(20)
  text('Generation : '+generation,0,0)
  text('Remaining : '+remaining+'/'+population,0,30)
  text('Current Score : '+globalScore,0,60)
  text('Highest Recorded Score : '+maxScore,0,90)
}

function nextGen() {
  calculateFitness()

  let nextGen = []
  pipes = []
  globalScore = 0
  for (let i = 0; i < birds.length; i++) {
    nextGen.push(pickOne())
  }
  // print(birds)
  // console.log('next generation')
  birds = nextGen.slice()
  generation++
}

function pickOne() {
  var index = 0
  var r = random(1)

  while (r > 0) {
    r = r - birds[index].fitness
    index++
  }
  index--
  let bird = birds[index]
  let child = new Bird(bird.brain)
  child.brain.mutate(0.1)
  return child
}

function calculateFitness() {
  let sum = 0
  for (let b of birds) {
    sum += pow(b.score,4)
  }
  for (let b of birds) {
    b.fitness = pow(b.score,4) / sum
  }


}
//ACTIVATION FUNCTION !
function sigmoid(x){
  return 1/(1+exp(-x))
}

function dsigmoid(y){
  return y*(1-y)
}

class NeuralNetwork {
  constructor(layers, lr) {
    this.layers = layers

    this.weights = []
    this.biases = []
    this.learningRate = 0.1

    for (let i = 0; i < this.layers.length - 1; i++) {
      this.weights.push(new Matrix(this.layers[i + 1], this.layers[i]))
      this.biases.push(new Matrix(this.layers[i + 1], 1))
    }

    for (let b=0;b<this.biases.length;b++){
      this.biases[b]=Matrix.multiply(this.biases[b],0)
    }
    
    // for (let thing of this.biases){
    //   thing.print()
    // }
  }
  guess(input) {
    input=Matrix.arrayToMatrix(input)
    this.savedOutputs = []
    this.savedOutputs.push(input)
    for (let step = 0; step < this.layers.length - 1; step++) {
      input = Matrix.map(Matrix.add(Matrix.multiply(this.weights[step], input), this.biases[step]), sigmoid)
      this.savedOutputs.push(input)
    }
    return Matrix.matrixToArray(this.savedOutputs[this.savedOutputs.length - 1])
  }
  train(input, answer) {
    let guess = Matrix.arrayToMatrix(this.guess(input))
    
    input = Matrix.arrayToMatrix(input)
    answer = Matrix.arrayToMatrix(answer)
    
    
    let errors = []
    errors.push(Matrix.subtract(answer, guess))

    for (let step = this.weights.length - 1; step > 0; step--) {
      let transposedWeight = Matrix.transpose(this.weights[step])
      errors.unshift(Matrix.multiply(transposedWeight, errors[0]))
    }
    
    

    for (let step = this.weights.length - 1; step >= 0; step--) {
      // this.weights[step].print()
      //errors[step].print()
      // //next
      // this.savedOutputs[step+1].print()
      // //prev
      // this.savedOutputs[step].print()
      

      let gradients = Matrix.map(this.savedOutputs[step + 1], dsigmoid)
      gradients = Matrix.hadamard(gradients, errors[step])
      gradients = Matrix.multiply(gradients, this.learningRate)

      let inputT = Matrix.transpose(this.savedOutputs[step])
      let deltas = Matrix.multiply(gradients, inputT)

      this.weights[step] = Matrix.add(this.weights[step], deltas)
      this.biases[step] = Matrix.add(this.biases[step], gradients)
    }


  }
  copy(){
    let copy=new NeuralNetwork(this.layers,this.learningRate)
     
    for (let i=0;i<this.weights.length;i++){
      copy.weights[i]=this.weights[i].copy()
    }
    for (let i=0;i<this.biases.length;i++){
      copy.biases[i]=this.biases[i].copy()
    }
    return copy;
  }
  mutate(rate){
    for (let i=0;i<this.weights.length;i++){
      this.weights[i]=Matrix.map(this.weights[i],function(x){
        if (random(1)<rate){
          return random(-1,1)
        }else{
          return x
        }
      })
    }
    for (let i=0;i<this.biases.length;i++){
      this.biases[i]=Matrix.map(this.biases[i],function(x){
        if (random(1)<rate){
          return random(-1,1)
        }else{
          return x
        }
      })
    } 
    
  }

  render(x, y, w, h, r) {
    textAlign(CENTER, CENTER)
    let m = max(this.layers)
    for (let xx = 0; xx < this.layers.length; xx++) {
      for (let yy = 0; yy < this.layers[xx]; yy++) {
        if (xx != this.layers.length - 1) {
          for (let ii = 0; ii < this.layers[xx + 1]; ii++) {
            let currentWeight = this.weights[xx].data[ii][yy]
            if (currentWeight >= 0) {
              stroke(0, 255, 0)
              strokeWeight(map(currentWeight, 0, this.getAbsoluteMaxWeight(), 1, r / 3))
            } else {
              stroke(255, 0, 0)
              strokeWeight(map(currentWeight, 0, -this.getAbsoluteMaxWeight(), 1, r / 3))
            }
            line(x + xx * w, y + (m / 2 - this.layers[xx] / 2 + yy) * h, x + (xx + 1) * w, y + (m / 2 - this.layers[xx + 1] / 2 + ii) * h)
            
            // fill(0)
            // stroke(255)
            // textSize(32)
            // strokeWeight(2)
            // text(currentWeight.toFixed(2),((x + xx * w)+(x + (xx + 1) * w))/2,((y + (m / 2 - this.layers[xx] / 2 + yy) * h)+( y + (m / 2 - this.layers[xx + 1] / 2 + ii) * h))/2)
            
            
          }
        }
        fill(255)
        noStroke()
        circle(x + xx * w, y + (m / 2 - this.layers[xx] / 2 + yy) * h, r)
        // if (this.savedOutputs) {
        //   textSize(16)
        //   text(this.savedOutputs[xx].data[yy][0].toFixed(3), x + (xx) * w + r, y + (m / 2 - this.layers[xx] / 2 + yy) * h)
        // }
        if (xx != 0) {
          fill(0)
          textSize(32)
          text(this.biases[xx - 1].data[yy][0].toFixed(3), x + xx * w, y + (m / 2 - this.layers[xx] / 2 + yy) * h)
        }

      }
    }
  }
  getAbsoluteMaxWeight() {
    let maximum = 0
    for (let i = 0; i < this.weights.length; i++) {
      for (let y = 0; y < this.weights[i].rows; y++) {
        for (let x = 0; x < this.weights[i].cols; x++) {
          if (abs(this.weights[i].data[y][x])>maximum){
            maximum=abs(this.weights[i].data[y][x])
          }
        }
      }
    }
    return maximum
  }
}
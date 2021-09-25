class Matrix {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.data = []
    this.randomize()
  }
  randomize() {
    for (let y = 0; y < this.rows; y++) {
      this.data[y] = []
      for (let x = 0; x < this.cols; x++) {
        this.data[y][x] = random(-1, 1)
        //this.data[y][x] = int(random(0, 11))
      }
    }
  }
  print() {
    for (let y = 0; y < this.rows; y++) {
      let l = '|'
      for (let x = 0; x < this.cols; x++) {
        l += this.data[y][x] + '|'
      }
      print(l)
    }
    print('__________')
  }

  static add(m, n) {
    let result = new Matrix(m.rows, m.cols)
    if (n instanceof Matrix) {
      for (let y = 0; y < result.rows; y++) {
        result.data[y] = []
        for (let x = 0; x < result.cols; x++) {
          result.data[y][x] = m.data[y][x] + n.data[y][x]
        }
      }
    } else {
      for (let y = 0; y < result.rows; y++) {
        result.data[y] = []
        for (let x = 0; x < result.cols; x++) {
          result.data[y][x] = m.data[y][x] + n
        }
      }
    }
    return result
  }
  static multiply(m, n) {
    let result
    if (n instanceof Matrix) {
      if (m.cols == n.rows) {
        result = new Matrix(m.rows, n.cols)
        for (let y = 0; y < result.rows; y++) {
          result.data[y] = []
          for (let x = 0; x < result.cols; x++) {
            let sum = 0
            for (let i = 0; i < m.cols; i++) {
              sum += m.data[y][i] * n.data[i][x]
            }
            result.data[y][x] = sum
          }
        }
      } else {
        print('cannot multiply')
        return undefined
      }
    } else {
      result = new Matrix(m.rows, m.cols)
      for (let y = 0; y < result.rows; y++) {
        result.data[y] = []
        for (let x = 0; x < result.cols; x++) {
          result.data[y][x] = m.data[y][x] * n
        }
      }
    }
    return result
  }
  static hadamard(m,n){
    let result=new Matrix(m.rows,m.cols)
    for (let y = 0; y < result.rows; y++) {
      result.data[y] = []
      for (let x = 0; x < result.cols; x++) {
        result.data[y][x] = m.data[y][x] * n.data[y][x]
      }
    }
    return result
    
  }
  static subtract(m,n){
    let result
    if (n instanceof Matrix){
      result=Matrix.add(m,Matrix.multiply(n,-1))
    }else{
      result=Matrix.add(m,n*-1)
    }
    return result
  }
  
  static map(m,func) {
    let result = new Matrix(m.rows, m.cols)
    for (let y = 0; y < result.rows; y++) {
      result.data[y] = []
      for (let x = 0; x < result.cols; x++) {
        result.data[y][x] = func(m.data[y][x])
      }
    }
    return result
  }
  static transpose(m){
    let result=new Matrix(m.cols,m.rows)
    for (let y = 0; y < result.rows; y++) {
      result.data[y] = []
      for (let x = 0; x < result.cols; x++) {
        result.data[y][x] = m.data[x][y]
      }
    }
    return result
  }
  
  copy(){
    let result=new Matrix(this.rows,this.cols)
    for (let y = 0; y < result.rows; y++) {
      result.data[y] = []
      for (let x = 0; x < result.cols; x++) {
        result.data[y][x] = this.data[y][x]
      }
    }
    return result
  }
  
  static arrayToMatrix(arr){
    let result=new Matrix(arr.length,1)
    for (let y = 0; y < result.rows; y++) {
      result.data[y] = []
      for (let x = 0; x < result.cols; x++) {
        result.data[y][x] = arr[y]
      }
    }
    return result
  }
  static matrixToArray(m){
    let result=[]
    for (let y = 0; y < m.rows; y++) {
      for (let x = 0; x < m.cols; x++) {
        result.push(m.data[y][x])
      }
    }
    return result
  }
}
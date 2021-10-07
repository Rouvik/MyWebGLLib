window.GLMATH=true; // define key GLMATH for identification

// Vector math
// -----------

// class for 2D vector
function vec2(x, y) {
  if (x instanceof vec3 || x instanceof vec2) {
    this.x = x.x;
    this.y = x.y;
  } else if (typeof x == 'number' && typeof y == 'number') {
    this.x = x;
    this.y = y;
  } else if (x == undefined && y == undefined) {
    this.x = 0;
    this.y = 0;
  } else {
    throwError('No constructor => (' + typeof x + ', ' + typeof y + ') exists for vec2');
  }

  // safely re-initialises the x and y of  vec2
  this.set = (x, y) => {
    if (x instanceof vec3 || x instanceof vec2) {
      this.x = x.x;
      this.y = x.y;
    } else if (typeof x == 'number' && typeof y == 'number') {
      this.x = x;
      this.y = y;
    } else if (x == undefined && y == undefined) {
      this.x = 0;
      this.y = 0;
    } else {
      throwError('Cannot initialise with values => (' + typeof x + ', ' + typeof y + ') in vec2');
    }
    return this;
  }

  // adds a value or vec2 to vector
  this.add = (value) => {
    let v = new vec2(this);
    if (value instanceof vec2) {
      v.x += value.x;
      v.y += value.y;
    } else if (typeof value == 'number') {
      v.x += value;
      v.y += value;
    } else {
      throwError('Cannot add value of type => ' + typeof value);
    }
    return v;
  }

  // subtracts a value or vec2 to vector
  this.subtract = (value) => {
    let v = new vec2(this);
    if (value instanceof vec2) {
      v.x -= value.x;
      v.y -= value.y;
    } else if (typeof value == 'number') {
      v.x -= value;
      v.y -= value;
    } else {
      throwError('Cannot subtract value of type => ' + typeof value);
    }
    return v;
  }

  // multiplies a value or vec2 to vector
  this.multiply = (value) => {
    let v = new vec2(this);
    if (value instanceof vec2) {
      v.x *= value.x;
      v.y *= value.y;
    } else if (typeof value == 'number') {
      v.x *= value;
      v.y *= value;
    } else {
      throwError('Cannot multiply value of type => ' + typeof value);
    }
    return v;
  }

  // divides a value or vec2 to vector
  this.divide = (value) => {
    let v = new vec2(this);
    if (value instanceof vec2) {
      v.x /= value.x;
      v.y /= value.y;
    } else if (typeof value == 'number') {
      v.x /= value;
      v.y /= value;
    } else {
      throwError('Cannot divide value of type => ' + typeof value);
    }
    return v;
  }

  // returns the square of magnitude
  this.magnitudeSquare = () => {
    return this.x ** 2 + this.y ** 2;
  }

  // returns magnitude
  this.magnitude = () => {
    return this.magnitudeSquare() ** 0.5;
  }

  // returns normal of vector
  this.normalize = () => {
    return this.divide(this.magnitude());
  }

  // returns distance between 2 vectors
  this.distance = (v) => {
    return ((this.x - v.x) ** 2 + (this.y - v.y) ** 2) ** 0.5;
  }

  // throws error for vec2 specifically
  function throwError(message) {
    throw new Error('vec2 error: ' + message);
  }

}

// class for 3D vector
function vec3(x, y, z) {
  if (x instanceof vec2 || x instanceof vec3) {
    this.x = x.x;
    this.y = x.y;
    this.z = y || x.z || 0;
  } else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
    this.x = x;
    this.y = y;
    this.z = z;
  } else if (x == undefined && y == undefined && z == undefined) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  } else {
    throwError('No constructor => (' + typeof x + ', ' + typeof y + ', ' + typeof z + ') exists for vec3');
  }

  this.set = (x, y, z) => {
    if (x instanceof vec2) {
      this.x = x.x;
      this.y = x.y;
      this.z = y || 0;
    } else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
      this.x = x;
      this.y = y;
      this.z = z;
    } else if (x == undefined && y == undefined && z == undefined) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    } else {
      throwError('Cannot initialise with values => (' + typeof x + ', ' + typeof y + ', ' + typeof z + ') in vec3');
    }
    return this;
  }

  // adds a value or vec3 to vector
  this.add = (value) => {
    let v = new vec3(this);
    if (value instanceof vec3) {
      v.x += value.x;
      v.y += value.y;
      v.z += value.z;
    } else if (typeof value == 'number') {
      v.x += value;
      v.y += value;
      v.z += value;
    } else {
      throwError('Cannot add value of type => ' + typeof value);
    }
    return v;
  }

  // subtracts a value or vec3 to vector
  this.subtract = (value) => {
    let v = new vec3(this);
    if (value instanceof vec3) {
      v.x -= value.x;
      v.y -= value.y;
      v.z -= value.z;
    } else if (typeof value == 'number') {
      v.x -= value;
      v.y -= value;
      v.z -= value;
    } else {
      throwError('Cannot subtract value of type => ' + typeof value);
    }
    return v;
  }

  // multiplies a value or vec3 to vector
  this.multiply = (value) => {
    let v = new vec3(this);
    if (value instanceof vec3) {
      v.x *= value.x;
      v.y *= value.y;
      v.z *= value.z;
    } else if (typeof value == 'number') {
      v.x *= value;
      v.y *= value;
      v.z *= value;
    } else {
      throwError('Cannot multiply value of type => ' + typeof value);
    }
    return v;
  }

  // divides a value or vec3 to vector
  this.divide = (value) => {
    let v = new vec3(this);
    if (value instanceof vec3) {
      v.x /= value.x;
      v.y /= value.y;
      v.z /= value.z;
    } else if (typeof value == 'number') {
      v.x /= value;
      v.y /= value;
      v.z /= value;
    } else {
      throwError('Cannot divide value of type => ' + typeof value);
    }
    return v;
  }

  // returns the square of magnitude
  this.magnitudeSquare = () => {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }

  // returns magnitude
  this.magnitude = () => {
    return this.magnitudeSquare() ** 0.5;
  }

  // returns normal of vector
  this.normalize = () => {
    return this.divide(this.magnitude());
  }

  // returns distance between 2 vectors
  this.distance = (v) => {
    return ((this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2) ** 0.5;
  }

  // throws error for vec3 specifically
  function throwError(message) {
    throw new Error('vec3 error: ' + message);
  }
}


// ------------
// Matrix math
// -----------

/*
A simple optimised matrix class for mathematical operations---

Accessing matrix: 
•Use this.value to set or access the matrix safely without pollution

•Use this.val to access and set the matrix faster[there are chances of invalid data so check your data or use this.value]

Other properties:
•this.rows
•this.cols

The rows and cols are only set as a beginning data...

Rows and cols can be increased later

*/
class matrix
{
  constructor(rows, cols)
  {
    //variables
    this.val = Array.from(Array(rows), () => Array(cols).fill(0));
  }
  //GETTERS & SETTERS---
  get value() //gets the matrix
  {
    return this.val;
  }
  set value(v) //sets value to matrix
  {
    if (v.length && v[0].length)
    {
      for (let i = 0; i < v.length; i++)
        for (let j = 0; j < v[i].length; j++)
        {
          if (typeof v[i][j] != 'number')
          {
            this.err('Error: The given matrix contains non numeral values');
            return;
          }

        }
      this.val = v;
    } else
    {
      this.err('Error: The given value is not a matrix');
      return;
    }
  }
  
  get rows() //returns no. of rows of the matrix
  {
    return this.val.length;
  }
  
  set rows(value)
  {
  	if(this.rows < value)
  	{
  		for(let i = 0; i < value-this.rows; i++)
  			this.val.push(Array(this.cols).fill(0));
  	}else if (this.rows == value)
  	{
  	  console.warn('Same row size request, not updated');
  	}else
  	{
  		for(let i = 0; i < value-this.rows; i++)
  			this.val.pop();
  	}
  }
  
  get cols() //returns no. of cols of the matrix at row 0
  {
    return this.val[0].length;
  }
  
  set cols(value)
  {
    let diff =  value - this.rows;
  	if(this.rows < value)
  	{
  	  for (let i = 0; i < this.val.length; i++)
  	  {
  	    this.val[i].splice(this.rows - diff - 1, diff);
  	  }
    } else {
  	  for (let i = 0; i < this.val.length; i++)
  	  {
  	    this.val[i].concat(new Array(diff, ()=>0));
  	  }
    }
  }
  //METHODS
  //Special methods---
  sanitize(value = 0) //replaces non numeral values and NaNs from matrix according to argument[by default it is 0]
  {
    if (typeof value != 'number')
    {
      this.err('Error: Only numbers allowed in matrix');
      return;
    }
    for (let i = 0; i < this.val.length; i++)
      for (let j = 0; j < this.val[i].length; j++)
        if (this.val[i][j] == NaN ||
          typeof this.val[i][j] != 'number')
          this.val[i][j] = value;
  }
  check(m) //checks for non numeral values in matrix
  {
    for (let i = 0; i < m.val.length; i++)
      for (let j = 0; j < m.val[i].length; j++)
      {
        if (typeof m.val[i][j] != 'number')
          return false;
      }
    return true;
  }
  fill(value) //fills the matrix with a no.
  {
    if (typeof value != 'number')
    {
      this.err('Error: Only numbers allowed');
      return;
    }
    for (let x of this.val)
      x.fill(value);
  }
  copy() //returns copy of a matrix
  {
    let array = new matrix(this.val.length, this.val[0].length);
    for (let i = 0; i < this.val.length; i++)
      for (let j = 0; j < this.val[i].length; j++)
        array.val[i][j] = this.val[i][j];
    return array;
  }
  toString() //returns string representation of a matrix
  {
    let str = '';
    for (let x of this.val)
    {
      for (let y of x)
        str += y + ' ';
      str += '\n';
    }
    return str;
  }
  toOneDim() //returns array representation of matrix
  {
    let array = [];
    for (let x of this.val)
      for (let y of x)
        array.push(y);
    return array;
  }
  //Mathematical methods---
  sum() //adds up data and returns it
  {
    let sum = 0;
    for (let x of this.val)
      for (let y of x)
        sum += y;
    return sum;
  }
  product() //multiplies up data and returns it
  {
    let product = 1;
    for (let x of this.val)
      for (let y of x)
        product *= y;
    return product;
  }
  add(value) //adds a value or matrix to the matrix
  {

    if (typeof value == 'number')
    {
      for (let i = 0; i < this.val.length; i++)
        for (let j = 0; j < this.val[i].length; j++)
          this.val[i][j] += value;
    } else if (value.val)
    {
      let cols = Math.min(this.val[0].length, value.val[0].length);
      for (let i = 0; i < this.val.length; i++)
        for (let j = 0; j < cols; j++)
          this.val[i][j] += value.val[i][j];
    } else
    {
      this.err('Error: Only numbers or matrixes allowed');
      return;
    }
  }
  subtract(value) //subtracts a value or matrix to the matrix
  {
    if (typeof value == 'number')
    {
      for (let i = 0; i < this.val.length; i++)
        for (let j = 0; j < this.val[i].length; j++)
          this.val[i][j] -= value;
    } else if (value.val)
    {
      let cols = Math.min(this.val[0].length, value.val[0].length);
      for (let i = 0; i < this.val.length; i++)
        for (let j = 0; j < cols; j++)
          this.val[i][j] -= value.val[i][j];
    } else
    {
      this.err('Error: Only numbers or matrixes allowed');
      return;
    }
  }
  multiply(value) //multiplies a value or matrix to the matrix
  {
    if (typeof value == 'number')
    {
      for (let i = 0; i < this.val.length; i++)
        for (let j = 0; j < this.val[i].length; j++)
          this.val[i][j] *= value;
    } else if (value.val)
    {
      let cols = Math.min(this.val[0].length, value.val[0].length);
      for (let i = 0; i < this.val.length; i++)
        for (let j = 0; j < cols; j++)
          this.val[i][j] *= value.val[i][j];
    } else
    {
      this.err('Error: Only numbers or matrixes allowed');
      return;
    }
  }
  divide(value) //divides a value or matrix to the matrix
  {
    if (typeof value == 'number')
    {
      for (let i = 0; i < this.val.length; i++)
        for (let j = 0; j < this.val[i].length; j++)
          this.val[i][j] /= value;
    } else if (value.val)
    {
      let cols = Math.min(this.val[0].length, value.val[0].length);
      for (let i = 0; i < this.val.length; i++)
        for (let j = 0; j < cols; j++)
          this.val[i][j] /= value.val[i][j];
    } else
    {
      this.err('Error: Only numbers or matrixes allowed');
      return;
    }
  }
  matrixMultiply(m) //does matrix multiplication of 2 matrixes and returns a new matrix object
  {
    if (m.val[0].length == this.val.length)
    {
      let m3 = new matrix(m.val.length, this.val[0].length);
      for (let i = 0; i < m.val.length; i++)
      {
        for (let j = 0; j < this.val[0].length; j++)
        {
          let sum = 0;
          for (let k = 0; k < this.val.length; k++)
            sum += m.val[i][k] * this.val[k][j];
          m3.val[i][j] = sum;
        }
      }
      return m3;
    } else
      console.warn('Warn: Rows of m1 != cols of m2...proceeding');
  }
  err(message)
  {
    console.log('%c' + message, 'background:#FF0000;color:#FFFFFF;font-family:courier;font-weight:bold;');
  }
}
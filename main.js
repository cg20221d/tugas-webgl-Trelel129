function main() {
  // Ambil canvas
  var canvas = document.getElementById("myCanvas");
  // Ambil konteks WebGL
  var gl = canvas.getContext("webgl");
  //array 1 dimensi
var vertices = [
  -0.6, 0.7,
  -0.75, 0.5,

  -0.75, 0.5,
  -0.75, 0.7,

  -0.75, 0.7,
  -0.6, 0.9,

  -0.6, 0.9,
  -0.4, 0.9,

  -0.4, 0.9,
  -0.4, 0.2,

  -0.4, 0.2,
  -0.2, 0.2,

  -0.2, 0.2,
  -0.2, 0.1,

  -0.2, 0.1,
  -0.8, 0.1,

  -0.8, 0.1,
  -0.8, 0.2,
  
  -0.8, 0.2,
  -0.6, 0.2,

  -0.6, 0.2,
  -0.6, 0.7,
//1 finished :V

  0.8, 0.1,
  0.8, 0.3,

  0.8, 0.3,
  0.9, 0.3,

  0.9, 0.3,
  0.9, 0.4,
  
  0.9, 0.4,
  0.8, 0.4,

  0.8, 0.4,
  0.8, 0.9,

  0.8, 0.9,
  0.6, 0.9,

  0.6, 0.9,
  0.1, 0.4,

  0.1, 0.4,
  0.1, 0.3,

  0.1, 0.3,
  0.6, 0.3,

  0.6, 0.3,
  0.6, 0.1,

  0.6, 0.1,
  0.8, 0.1,

  0.6, 0.4,
  0.6, 0.7,

  0.6, 0.4,
  0.3, 0.4,

  0.3, 0.4,
  0.6, 0.7,
//4 finished :D

];

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  //posisi
  var vertexShaderCode = `
  attribute vec2 aPosition;
    void main() {
      float x = aPosition.x;
      float y = aPosition.y;
      gl_PointSize = 1.0;
      gl_Position = vec4(aPosition.xy, 0.0, 1.0);
    }
  `;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  //warna
  var fragmentShaderCode = `
    precision mediump float;
    void main() {
      float r = 0.0;
      float g = 0.0;
      float b = 1.0;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `;

  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  //Kita mengajari GPU bagaimana caranya mengoleksi
  // nilai posisi dari ARRAY_BUFFER
  // untuk setiap vertex yang sedang diproses
  var aPosition = gl.getAttribLocation(shaderProgram,"aPosition");
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

  // Set warna background
  gl.clearColor(0.9, 0.65, 0.0, 0.5);
  // Bersihkan buffer warna
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Gambar titik
  gl.drawArrays(gl.LINES, 0, 44);
  gl.drawArrays(gl.LINES, 44, 200);
}

//TRIANGLE FAN --> berdasarkan titik pusat
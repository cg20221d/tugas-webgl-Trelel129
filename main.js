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

-0.9, -0.9,
-0.9, -0.1,
-0.7, -0.9,

-0.7, -0.1,
-0.7, -0.9,
-0.9, -0.1,

-0.9, -0.1,
-0.7, -0.3,
-0.4, -0.1,

-0.7, -0.3,
-0.4, -0.1,
-0.5, -0.3,

-0.4, -0.1,
-0.5, -0.3,
-0.2, -0.3,

-0.5, -0.3,
-0.2, -0.3,
-0.5, -0.5,

// FAN 1
-0.5, -0.5,
-0.2, -0.3,
-0.2, -0.5,
-0.3, -0.6,
-0.4, -0.65,
-0.6, -0.7,
-0.7, -0.7,
-0.7, -0.5,

// STRIP 1
-0.6, -0.7,
-0.4, -0.65,
-0.5, -0.8, 
-0.3, -0.8,
-0.4, -0.9,
-0.2, -0.9,
//"R" Finished

//FAN 2
// 0.5, -0.4,
// 0.7, -0.1,
// 0.9, -0.1,
// 0.6, -0.5,
// 0.6, -0.9,
// 0.4, -0.9,
// 0.4, -0.5,
// 0.1, -0.1,
// 0.3, -0.1,
//"Y" Finished But Wrong letter D:

//STRIP 2
0.1, -0.9,
0.3, -0.9,
0.4, -0.1,
0.6, -0.1,
0.7, -0.9,
0.9, -0.9,
0.5, -0.3,

//STRIP 3
0.6, -0.5,
0.4, -0.5,
0.65, -0.7,
0.35, -0.7
//"A" Finished >///<

// //STRIP A1
// 0.1, -0.9,
// 0.3, -0.9,
// 0.1, -0.1,
// 0.3, -0.1,

// //strip A2
// 0.1, -0.1,
// 0.3, -0.3,
// 0.9, -0.1,
// 0.7, -0.3,

// // STRIP A3
// 0.9, -0.1,
// 0.7, -0.3,
// 0.9, -0.9,
// 0.7, -0.9,

// //STRIP A4
// 0.3, -0.5,
// 0.3, -0.7,
// 0.7, -0.5,
// 0.7, -0.7,
];

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  //posisi
  var vertexShaderCode = `
  varying vec2 pos;
      attribute vec2 aPosition;
  
      void main() {
        pos = aPosition;
        float x = aPosition.x;
        float y = aPosition.y;
        gl_PointSize = 10.0;
        gl_Position = vec4(x, y, 0.0, 1.0);
      }
  // attribute vec2 aPosition;
  //   void main() {
  //     float x = aPosition.x;
  //     float y = aPosition.y;
  //     gl_PointSize = 1.0;
  //     gl_Position = vec4(aPosition.xy, 0.0, 1.0);
  //   }
  `;

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  //warna
  var fragmentShaderCode = `
    precision mediump float;
    varying vec2 pos;

    float map(float value, float min1, float max1, float min2, float max2) {
      return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
    }

    void main() {
      float r = map(pos.x + (pos.y * 0.2) + 0.8, 0.0, 1.5, 0.66, 0.21);
      float g = map(pos.x + (pos.y * 0.2) + 0.8, 0.5, 1.5, 0.81, 0.29);
      float b = map(pos.x + (pos.y * 0.2) + 0.8, 0.9, 1.5, 0.95, 0.30);   
      gl_FragColor = vec4(r, g, b, 1);
    }
    // precision mediump float;
    // void main() {
    //   float r = 0.0;
    //   float g = 0.0;
    //   float b = 1.0;
    //   gl_FragColor = vec4(r, g, b, 1.0);
    // }
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

  // Gambar angka
  gl.drawArrays(gl.LINES, 0, 22);
  gl.drawArrays(gl.LINES, 22, 28);

  // Gambar huruf
  gl.drawArrays(gl.TRIANGLES, 50, 18); //50, 18 is fine? why 50? nvm, 22+28
  gl.drawArrays(gl.TRIANGLE_FAN, 68, 8);
  gl.drawArrays(gl.TRIANGLE_STRIP, 76, 6);

  gl.drawArrays(gl.TRIANGLE_STRIP, 82, 7);
  gl.drawArrays(gl.TRIANGLE_STRIP, 89, 4);

  // //Gambar amogus (pengganti A)
  // gl.drawArrays(gl.TRIANGLE_STRIP, 82, 4);
  // gl.drawArrays(gl.TRIANGLE_STRIP, 86, 4);
  // gl.drawArrays(gl.TRIANGLE_STRIP, 90, 4);
  // gl.drawArrays(gl.TRIANGLE_STRIP, 94, 4);
  
  
}

//TRIANGLE FAN --> berdasarkan titik pusat
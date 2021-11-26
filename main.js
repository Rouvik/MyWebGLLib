// init screen
const win = new GlWindow(window.innerWidth, window.innerWidth);

// handle win.gl scripts
const glh = new GLScriptHandler(win.gl);
let program = glh.makeProgramFromPair(glh.pairShaders());
win.gl.useProgram(program);

// setup gl
win.gl.enable(win.gl.DEPTH_TEST);
win.gl.clearColor(0, 0, 0, 1);
win.gl.enable(win.gl.CULL_FACE);
win.gl.cullFace(win.gl.FRONT);

// init texture
// win.gl.pixelStorei(win.gl.UNPACK_FLIP_Y_WEBGL, true);
GlobalGL.setSamplersWithImages(win.gl, [
  {
    url: './img.png',
    number: 0,
    location: 'texture'
  }
], program);

// init objects
let objects = [];
let globj = new GlObj(win.gl, program, texCube, {
  list:{
    vertices:{
      size: 3,
      name: 'pos'
    },
    texCoord:{
      size: 2,
      name: 'texpos'
    },
    indexes:{
      size: 3,
      index: true
    }
  }
});

for(let i = 0; i < 10; i++) {
  objects.push({
    x: (Math.random() * 30) - 14,
    y: (Math.random() * 30) - 14,
    z: (Math.random() * 100) + 10
  });
}
globj.init();

// controls
var px = 0, py = 0,
    vx = 0, vy = 0,
    angleX = 0, angleY = 0;

win.setCursorListener((event) => {
  vx = px - event.touches[0].clientX;
  vy = py - event.touches[0].clientY;
  let hyp = (vx**2 + vy**2)**0.5;
  vx /= hyp;
  vy /= hyp;
}, (event) => {
  px = event.touches[0].clientX;
  py = event.touches[0].clientY;
}, (event) => {
  vx = vy = 0;
});

let angloc = win.gl.getUniformLocation(program, 'angle'),
    transloc = win.gl.getUniformLocation(program, 'translate'),
    proj = win.gl.getUniformLocation(program, 'projection'),
    fps = {
      disp: document.getElementById('fptxt'),
      value: 0
    };

let fov = GlobalGL.getFOVMatrix(45, win.height / win.width, 500, 1);

// animation loop
function animate()
{
  win.gl.clear(win.gl.COLOR_BUFFER_BIT);
  win.gl.uniformMatrix4fv(proj, false, fov);
  win.gl.uniform2f(angloc, 0, 0);
  for(let obj of objects) {
    win.gl.uniform3f(transloc, obj.x - angleX, obj.y, obj.z - angleY);
    globj.draw();
  }
  angleX += vx;
  angleY += vy;
  fps.value ++;
  requestAnimationFrame(animate);
}

setInterval(()=>{
  fps.disp.value = fps.value;
  fps.value = 0;
}, 1000);

animate();
// init screen
const sc = document.querySelector('canvas'),
      gl = sc.getContext('webgl');
sc.width = sc.height = window.innerWidth;

// handle gl scripts
const glh = new GLScriptHandler(gl);
let program = glh.makeProgramFromPair(glh.pairShaders());
gl.useProgram(program);

// setup gl
gl.viewport(0, 0, sc.width, sc.height);
gl.enable(gl.DEPTH_TEST);
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.FRONT);

// init texture
// gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
GlobalGL.setSamplersWithImages(gl, [
  {
    url: './img.png',
    number: 0,
    location: 'texture'
  }
], program);

// init object
let globj = new GlObj(gl, program, texCube, {
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
globj.init();

// controls
var px = 0, py = 0, vx = 0, vy = 0, angleX = 0, angleY = 0;
document.addEventListener('touchstart',(event)=>
{
  px = event.touches[0].clientX;
  py = event.touches[0].clientY;
});
document.addEventListener('touchmove',(event)=>
{
  vx = px - event.touches[0].clientX;
  vy = py - event.touches[0].clientY;
  let hyp = (vx**2 + vy**2)**0.5;
  vx /= hyp;
  vy /= hyp;
});
document.addEventListener('touchend',()=>
{
  vx = vy = 0;
});
let angloc = gl.getUniformLocation(program, 'angle');

// animation loop
function animate()
{
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform2f(angloc, angleY, angleX);
  globj.draw();
  angleX += vx;
  angleY += vy;
  requestAnimationFrame(animate);
}
animate();
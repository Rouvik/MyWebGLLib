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

let globj = new GlObj(gl, program, basicCube, {
  list:{
    vertices:{
      size: 3,
      name: 'pos'
    },
    indexes:{
      size: 3,
      index: true
    }
  }
});
globj.init();

function animate()
{
  gl.clear(gl.COLOR_BUFFER_BIT);
  globj.draw();
  requestAnimationFrame(animate);
}
animate();
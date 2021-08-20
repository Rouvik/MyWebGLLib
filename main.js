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

function animate()
{
  gl.clear(gl.COLOR_BUFFER_BIT);
  globj.draw();
  requestAnimationFrame(animate);
}
animate();
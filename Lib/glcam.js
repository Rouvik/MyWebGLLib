// check if glmath is present
if(!window.GLMATH) {
  throw new Error('Error: Please include glmath library for glcam to work');
}

/**
* A special class for handling map viewing controls globally
* It uses glmath for all its calculations so glmath is strictly required in this library
* else it might not work
*/

class GlCam {
  
  constructor(pos, rot, options={}) {
    this.pos = pos || new vec3(0, 0, 0);
    this.rot = rot || new vec3(0, 0, 0);
    
    // TODO: Complete the object prpperty and rotation
    // this.options = Object.
  }
  
  // inverted output for calculations
  get rotP() {
    return rot.multiply(-1);
  }
  
  
  
}
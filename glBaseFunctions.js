// manage gl objects effeciently and in an OOP system
class GlobalGL
{
  // compiles vertex shader
  static compileVertShader(gl, code, name='Vertex Shader')
  {
    let vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, code);
    gl.compileShader(vs);
    if(gl.getShaderParameter(vs, gl.COMPILE_STATUS))
    {
      console.log(name + ' compiled sucessfully');
    }else
    {
      console.error(name + ' => ' + gl.getShaderInfoLog(vs));
    }
    return vs;
  }
  
  // compiles fragment shader
  static compileFragShader(gl, code, name='Fragment Shader')
  {
    let fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, code);
    gl.compileShader(fs);
    if(gl.getShaderParameter(fs, gl.COMPILE_STATUS))
    {
      console.log(name + ' compiled sucessfully');
    }else
    {
      console.error(name + ' => ' + gl.getShaderInfoLog(fs));
    }
   return fs;
  }

  // generate shader program
  static makeProgram(gl, vertShader, fragShader)
  {
    let prog = gl.createProgram();
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    return prog;
  }
  
  // returns a FOV matrix for proper object size manipulation
  static getFOVMatrix(angle, aspect, near, far) 
  {
    angle = Math.PI/180*angle;
    let f = Math.tan(Math.PI * 0.5 - 0.5 * angle),
        rangeInv = 1.0 / (near - far);
    
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  }
  
  // sets up animation frame to a callback with an fps @deprecated not preferred instead use requestAnimationFrame() for smoother results
  static setAnimator(fps, callback)
  {
    if (!fps) fps = 55;
    setInterval(callback, Math.trunc(1000/fps));
  }
  
  // checks if a value is power of 2
  static isPowerOf2(value)
  {
    return (value & (value - 1)) == 0;
  }
  
  // generates image textures serially with asynchronous support
  static setSamplersWithImages(gl, imgData, program)
  {
    let getImage = (url, callback) =>
    {
      let img = new Image();
      img.src = url;
      img.onload = () =>
      {
        callback(img);
      };
    },
        getTexture = (img) =>
    {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      if(this.isPowerOf2(img.width) &&
         this.isPowerOf2(img.height))
      {
        gl.generateMipmap(gl.TEXTURE_2D);
      }
      else
      {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    for(let data of imgData)
    {
      getImage(data.url, (image) =>
      {
        gl.activeTexture(gl.TEXTURE0 + data.number);
        getTexture(image);
        gl.uniform1i(gl.getUniformLocation(program, data.location), data.number);
      });
    }
  }
}

// handles all the GL scripts effeciently and avoids ambiguity
// NOTE: Vertex shaders should have type='text/v-shader'
// and fragment shaders should have type='text/f-shader'
class GLScriptHandler
{
  constructor(gl)
  {
    this.gl = gl;
    this.vShaders = document.querySelectorAll('script[type="text/v-shader"]');
    this.fShaders = document.querySelectorAll('script[type="text/f-shader"]');
  }
  
  // get the 1st pair of shaders and return them
  pairShaders()
  {
    return {
      vertShader: GlobalGL.compileVertShader(this.gl, this.vShaders[0].text),
      fragShader: GlobalGL.compileFragShader(this.gl, this.fShaders[0].text)
    };
  }
  
  // get shaders with particular id among many shaders
  pairShadersById(vertId, fragId)
  {
    let data = {
      vertShader: this.vShaders[0].text,
      fragShader: this.fShaders[0].text
    };
    for(let shader of this.vShaders)
    {
      if(shader.id == vertId)
      {
        data.vertShader = shader.text;
        break;
      }
    }
    
    for(let shader of this.fShaders)
    {
      if(shader.id == fragId)
      {
        data.fragShader = shader.text;
        break;
      }
    }
    return {
      vertShader: GlobalGL.compileVertShader(this.gl, data.vertShader, vertId||'Vertex Shader'),
      fragShader: GlobalGL.compileFragShader(this.gl, data.fragShader, fragId||'Fragment Shader')
    };
  }
  
  // get shaders with particular name among many shaders
  pairShadersByName(vertName, fragName)
  {
    let data = {
      vertShader: this.vShaders[0].text,
      fragShader: this.fShaders[0].text
    };
    for(let shader of this.vShaders)
    {
      if(shader.name == vertName)
      {
        data.vertShader = shader.text;
        break;
      }
    }
    
    for(let shader of this.fShaders)
    {
      if(shader.name == fragName)
      {
        data.fragShader = shader.text;
        break;
      }
    }
    return {
      vertShader: GlobalGL.compileVertShader(this.gl, data.vertShader, vertName||'Vertex Shader'),
      fragShader: GlobalGL.compileFragShader(this.gl, data.fragShader, fragName||'Fragment Shader')
    };
  }
  
  // make a program from a shader pair
  makeProgramFromPair(data)
  {
    let prog = this.gl.createProgram();
    this.gl.attachShader(prog, data.vertShader);
    this.gl.attachShader(prog, data.fragShader);
    this.gl.linkProgram(prog);
    return prog;
  }
}

/* defines GL objects with easiness and no ambiguity unlike its old counterparts
 it is expandable and can pass any number of data
 automatic function generation for best performance and reliability
 simple definition for users
 GlObj definition system:
 {
   options:{
     drawType: gl.DYNAMIC_DRAW
     # gets replaced with STATIC_DRAW if not provided
   },
   list:{
     [vertBufferName]:{
       size: 3, # the size of data to be sent
       name: 'coordinates' # name of attribute in program
     },
     [indexBufferName]:{
       size: 3,
       index: true # must be provided to designate as index buffer
     }
   }
 }
*/
class GlObj
{
  constructor(gl, program, obj, prop)
  {
    this.gl = gl;
    this.program = program;
    if(typeof obj == 'object' &&
       typeof obj != 'null')
    {
      this.data = obj;
    }else if(typeof obj == 'string')
    {
      this.data = JSON.parse(json);
    } else
    {
      throw new Error('Object cannot be defined in ' + typeof obj);
    }
    if(!prop.options)
    {
      prop.options = {
        drawType: this.gl.STATIC_DRAW
      };
    }
    prop.options = Object.assign({
      drawType: this.gl.STATIC_DRAW
    }, prop.options);
    this.prop = prop;
    let func = '', i = 0, indexName = '';
    for(let buffer in prop.list)
    {
      if(prop.list[buffer].index == true)
      {
        func += 'this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.gl.createBuffer());this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint8Array(this.data.'+buffer+'),'+prop.options.drawType+');';
        indexName = buffer;
        continue;
      }
      this['a' + i] = this.gl.getAttribLocation(this.program, prop.list[buffer].name);
      func += 'this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.gl.createBuffer());this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(this.data.'+buffer+'),'+prop.options.drawType+');this.gl.vertexAttribPointer(this.a'+i+','+prop.list[buffer].size+',this.gl.FLOAT,false,0,0);this.gl.enableVertexAttribArray(this.a'+i+');';
      i++;
    }
    this.init = new Function(func);
    this.draw = new Function('this.gl.drawElements(this.gl.TRIANGLES,'+this.data[indexName].length+','+this.gl.UNSIGNED_BYTE+',0);');
  }
}
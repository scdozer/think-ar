import * as THREE from "three";
import { extend } from "@react-three/fiber";
// import { noise } from "./noise";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
const Hb2 = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  glsl`
  varying vec2 vUv;
  uniform float time;
  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += cos(modelPosition.z + (time * 1.)) * 0.25;
    modelPosition.x += cos(modelPosition.x + (time * 1.0)) * 0.25;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
    `,
  // fragment shader
  glsl`

  float plot(float r, float pct){
	return  smoothstep( pct-0.2, pct, r) -smoothstep( pct, pct+0.2, r);
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ){
        return a + b*cos( 6.28318*(c*t+d) );
}


      uniform float time;
      uniform vec3 color;
      varying vec2 uv;
      varying vec2 vUv;
      uniform vec2 resolution;
      
      
      void main() {
        vec2 uv = vUv.xy; 
        vec3 col = vec3(1.0);
        vec2 pos = vec2(0.5) - uv;
        pos *= cos(time)*0.5+1.5;


        float r = length(pos)*2.0;
        float a = atan(pos.y,pos.x);
    
        float f = abs(cos(a*2.5+time*0.5))*sin(time*2.0)*0.698+cos(time)-4.0;
        float d = f-r;

        col = (vec3(smoothstep(fract(d),fract(d)+-0.200,0.160))-vec3(smoothstep(fract(d),fract(d)+-1.184,0.160)) ) 
	* pal( f, vec3(0.725,0.475,0.440),vec3(0.605,0.587,0.007),vec3(1.0,1.0,1.0),vec3(0.310,0.410,0.154) );
    float pct = plot(r*0.272,fract(d*(sin(time)*0.45+0.5)));
	
    col += pct*pal( r, vec3(0.750,0.360,0.352),vec3(0.450,0.372,0.271),vec3(0.540,0.442,0.264),vec3(0.038,0.350,0.107) );


        gl_FragColor = vec4(col,pct*0.1); 
      }
    `
);

extend({ Hb2 });

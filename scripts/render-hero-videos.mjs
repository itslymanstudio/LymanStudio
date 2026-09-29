/** Original, deterministic studio motion renders. Re-run with: node scripts/render-hero-videos.mjs */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { once } from 'node:events';
import path from 'node:path';

const width = 480;
const height = 960;
const fps = 24;
const seconds = 8;
const destination = path.resolve('public/_assets/hero');
const previews = path.resolve('qa/hero-videos');
await mkdir(destination, { recursive: true });
await mkdir(previews, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
await page.setContent('<!doctype html><style>html,body{margin:0;overflow:hidden;background:#badb1c}canvas{display:block}</style><canvas></canvas>');
await page.evaluate(({ width, height }) => {
  const canvas = document.querySelector('canvas');
  canvas.width = width; canvas.height = height;
  const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true, antialias: true, alpha: false });
  if (!gl) throw new Error('WebGL required for original motion rendering.');
  const vertex = `
    attribute vec3 position; attribute vec3 normal;
    uniform mat4 projection; uniform float phase; uniform float mode;
    varying vec3 N; varying vec3 P; varying float panel;
    void main(){
      vec3 p = position; vec3 n = normal;
      if(mode > .5){
        float u = position.x; float v = position.y; float k = position.z;
        float wave = v*3.8 + phase + k*.85;
        float bend = u*2.5 + .35*sin(phase+k);
        p = vec3((k-1.0)*.67 + u*.7 + .21*sin(wave), v*3.15, .25*cos(bend) + .18*cos(wave) + (k-1.0)*.05);
        vec3 du=vec3(.7,0.0,-.625*sin(bend));
        vec3 dv=vec3(.798*cos(wave),3.15,-.684*sin(wave));
        n=normalize(cross(du,dv)); panel=k;
      }else{ panel=0.0; }
      float angle = mode > .5 ? .2*sin(phase) : .52*sin(phase);
      mat3 rotation=mat3(cos(angle),0.0,-sin(angle),0.0,1.0,0.0,sin(angle),0.0,cos(angle));
      p=rotation*p; n=rotation*n;
      p.y += .045*sin(phase*2.0);
      P=p;N=n;gl_Position=projection*vec4(p.x,p.y,p.z-5.4,1.0);
    }`;
  const fragment = `
    precision highp float;
    uniform float mode; uniform float phase;
    varying vec3 N; varying vec3 P; varying float panel;
    vec3 studio(vec3 r){
      vec3 col=mix(vec3(.13,.16,.13),vec3(.8,.84,.74), smoothstep(-.55,.85,r.y));
      float strip=pow(max(0.0,1.0-abs(r.x-.26)/.27),.45)*smoothstep(-.55,-.2,r.y);
      float second=pow(max(0.0,1.0-abs(r.x+.78)/.13),.8);
      col=mix(col,vec3(1.0),strip);col+=second*.7;
      col*=1.0-.82*smoothstep(.08,.16,r.x)* (1.0-smoothstep(.22,.28,r.x));
      col=mix(col,vec3(.62,.83,.07),.55*(1.0-smoothstep(-.7,-.12,r.y)));
      return col;
    }
    void main(){
      vec3 n=normalize(N);vec3 view=normalize(vec3(0.0,0.0,5.4)-P);
      if(dot(n,view)<0.0)n=-n;
      vec3 refl=reflect(-view,n);
      float fres=pow(1.0-max(0.0,dot(n,view)),3.0);
      vec3 color;
      if(mode<.5){
        color=studio(refl)*(.68+.34*fres);
        color+=vec3(.9,.94,1.0)*pow(max(0.0,dot(reflect(-normalize(vec3(-2.,4.,3.)),n),view)),90.0)*.5;
        color=pow(color,vec3(.88));
      }else{
        vec3 tint=panel<.5?vec3(.68,.61,.83):(panel<1.5?vec3(.78,.86,.69):vec3(.38,.49,.64));
        float caustic=pow(.5+.5*sin(P.y*17.0+P.x*24.0+phase*2.0+3.0*sin(P.y*3.0+phase)),14.0);
        float ribs=pow(.5+.5*sin(P.x*120.0+P.y*3.0+sin(phase)*2.0),22.0);
        color=mix(tint,studio(refl),.35+.5*fres);
        color+=vec3(.91,.96,.72)*caustic*.43 + ribs*.035;
        color+=pow(max(0.0,dot(reflect(-normalize(vec3(-1.,3.,2.)),n),view)),80.0)*.75;
        color=mix(color,vec3(.93,.91,.89),.18*(1.0-fres));
      }
      gl_FragColor=vec4(color,1.0);
    }`;
  function shader(type, source){ const s=gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s); if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s; }
  function program(v,f){const p=gl.createProgram();gl.attachShader(p,shader(gl.VERTEX_SHADER,v));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));return p;}
  const objectProgram=program(vertex,fragment);
  const bgProgram=program('attribute vec2 p; varying vec2 uv; void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}', `precision highp float;varying vec2 uv;uniform float mode;uniform float phase;void main(){
    vec3 c;
    if(mode<.5)c=mix(vec3(.65,.79,.055),vec3(.82,.95,.19),uv.y*.6+(1.0-uv.x)*.35);
    else c=mix(vec3(.73,.73,.79),vec3(.94,.93,.94),uv.y*.65+(1.0-uv.x)*.25);
    float sh=exp(-pow((uv.x-.5)/.25,2.0)-pow((uv.y-.115)/.025,2.0));c*=1.0-sh*.32;
    c+=.035*exp(-pow((uv.y-.17)/.17,2.0));gl_FragColor=vec4(c,1.0);}`);
  const bgBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bgBuffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  const norm=v=>{const l=Math.hypot(...v);return v.map(x=>x/l);};
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const center=t=>[.62*Math.sin(2*t),1.37*Math.cos(t),.29*Math.sin(t)];
  const chromeP=[],chromeN=[];
  function tube(t,a){const c=center(t);const d=center(t+.001);const tangent=norm(c.map((v,i)=>d[i]-v));const b=norm(cross(tangent,[0,0,1]));const q=norm(cross(tangent,b));const n=b.map((v,i)=>v*Math.cos(a)+q[i]*Math.sin(a));return {p:c.map((v,i)=>v+n[i]*.155),n};}
  const segments=240,sides=28;
  for(let i=0;i<segments;i++)for(let j=0;j<sides;j++){
    for(const [ti,aj] of [[i,j],[i+1,j],[i,j+1],[i,j+1],[i+1,j],[i+1,j+1]]){const a=tube(ti/segments*Math.PI*2,aj/sides*Math.PI*2);chromeP.push(...a.p);chromeN.push(...a.n);}
  }
  const glassP=[],glassN=[];
  for(let k=2;k>=0;k--)for(let i=0;i<32;i++)for(let j=0;j<100;j++){
    for(const [a,b] of [[i,j],[i+1,j],[i,j+1],[i,j+1],[i+1,j],[i+1,j+1]]){glassP.push(a/32-.5,b/100-.5,k);glassN.push(0,0,1);}
  }
  function buffer(data){const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);return b;}
  const meshes=[{p:buffer(chromeP),n:buffer(chromeN),count:chromeP.length/3},{p:buffer(glassP),n:buffer(glassN),count:glassP.length/3}];
  const f=1/Math.tan(39*Math.PI/360),near=.1,far=100;
  const projection=new Float32Array([f/(width/height),0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0]);
  window.drawFrame=(mode,phase)=>{
    gl.viewport(0,0,width,height);gl.disable(gl.DEPTH_TEST);gl.useProgram(bgProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER,bgBuffer);const pa=gl.getAttribLocation(bgProgram,'p');gl.enableVertexAttribArray(pa);gl.vertexAttribPointer(pa,2,gl.FLOAT,false,0,0);
    gl.uniform1f(gl.getUniformLocation(bgProgram,'mode'),mode);gl.uniform1f(gl.getUniformLocation(bgProgram,'phase'),phase);gl.drawArrays(gl.TRIANGLES,0,6);
    gl.enable(gl.DEPTH_TEST);gl.clear(gl.DEPTH_BUFFER_BIT);gl.useProgram(objectProgram);
    for(const [name,key] of [['position','p'],['normal','n']]){const a=gl.getAttribLocation(objectProgram,name);gl.bindBuffer(gl.ARRAY_BUFFER,meshes[mode][key]);gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,3,gl.FLOAT,false,0,0);}
    gl.uniformMatrix4fv(gl.getUniformLocation(objectProgram,'projection'),false,projection);
    gl.uniform1f(gl.getUniformLocation(objectProgram,'mode'),mode);gl.uniform1f(gl.getUniformLocation(objectProgram,'phase'),phase);
    gl.drawArrays(gl.TRIANGLES,0,meshes[mode].count);gl.finish();
  };
}, { width, height });

for (const [mode, name] of [[0, 'chrome-motion'], [1, 'glass-motion']]) {
  const out = path.join(destination, `${name}.mp4`);
  const encoder = spawn('ffmpeg', ['-y','-hide_banner','-loglevel','error','-f','image2pipe','-vcodec','png','-framerate',String(fps),'-i','pipe:0','-an','-c:v','libx264','-preset','slow','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart',out], { windowsHide: true });
  let error=''; encoder.stderr.on('data',data=>{error+=data;});
  const completed=once(encoder,'close');
  for(let frame=0;frame<fps*seconds;frame++){
    await page.evaluate(({mode,phase})=>window.drawFrame(mode,phase),{mode,phase:frame/(fps*seconds)*Math.PI*2});
    const png=await page.screenshot({type:'png'});
    if(frame===0 || frame===fps*seconds/4 || frame===fps*seconds-1)await writeFile(path.join(previews,`${name}-${frame}.png`),png);
    if(!encoder.stdin.write(png))await once(encoder.stdin,'drain');
    if(frame%48===0)process.stdout.write(`${name}: ${frame}/${fps*seconds}\n`);
  }
  encoder.stdin.end();const [code]=await completed;if(code!==0)throw new Error(`FFmpeg: ${error}`);
  console.log(`Created ${out}`);
}
await browser.close();

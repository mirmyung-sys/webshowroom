/* 웹쇼룸 첫 화면 — 실제 홈페이지가 금빛 받침 위에 층층이 조립되는 3D 모형
   벤치마킹: Awwwards 올해의 사이트 Igloo Inc(블록이 하나씩 쌓이는 실시간 3D · 재질 · 반짝이는 입자 · 시네마틱 인트로) */
(function(){
const wrap=document.getElementById('h3d');
if(!wrap||!window.THREE||!window.TEX)return;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const W=()=>wrap.clientWidth,H=()=>wrap.clientHeight;
const mob=()=>W()<860;

const R=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
R.setPixelRatio(Math.min(devicePixelRatio,mob()?1.75:2));R.setSize(W(),H());
R.outputEncoding=THREE.sRGBEncoding;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.08;
R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;
wrap.prepend(R.domElement);

const S=new THREE.Scene();
const pm=new THREE.PMREMGenerator(R);S.environment=pm.fromScene(new THREE.RoomEnvironment(),.04).texture;
const C=new THREE.PerspectiveCamera(28,W()/H(),.1,200);

/* 빛 — 왼쪽 위 창가 햇빛 */
const key=new THREE.DirectionalLight(0xFFF0DA,1.6);key.position.set(-7,13,6);key.castShadow=true;
key.shadow.mapSize.set(mob()?1024:2048,mob()?1024:2048);Object.assign(key.shadow.camera,{left:-8,right:8,top:10,bottom:-4,near:1,far:40});key.shadow.radius=6;key.shadow.bias=-.0004;S.add(key);
S.add(new THREE.HemisphereLight(0xFFF8EE,0xE9D9BF,.35));
const glint=new THREE.PointLight(0xFFD9A0,0,9,2);S.add(glint);

const G=new THREE.Group();S.add(G);
const gold=new THREE.MeshStandardMaterial({color:0xD4AF6A,metalness:1,roughness:.22,envMapIntensity:1.25});
const stone=new THREE.MeshStandardMaterial({color:0xEFE6D8,roughness:.62,metalness:0});
const paper=new THREE.MeshStandardMaterial({color:0xFFFCF6,roughness:.5});
const RB=(w,h,d,r,m)=>{const o=new THREE.Mesh(new THREE.RoundedBoxGeometry(w,h,d,5,r),m);o.castShadow=o.receiveShadow=true;return o};

/* 바닥 그림자 */
const fl=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.ShadowMaterial({opacity:.16}));fl.rotation.x=-Math.PI/2;fl.position.y=-.01;fl.receiveShadow=true;S.add(fl);

/* 받침 — 트래버틴 돌 + 금테 */
const base=RB(8.4,.55,5.2,.12,stone);base.position.y=.275;G.add(base);
const lip=RB(8.55,.07,5.35,.03,gold);lip.position.y=.56;G.add(lip);
const top=RB(8.1,.12,4.9,.05,stone);top.position.y=.63;G.add(top);
const BASEY=.69;

/* 홈페이지 블록 4개 — 아래에서부터 쌓여 한 장의 홈페이지가 선다 */
const SW=4.2,DEP=.42,GAP=.07;
const loader=new THREE.TextureLoader(),texCache={};
function tex(src){if(texCache[src])return texCache[src];const t=loader.load(src);t.encoding=THREE.sRGBEncoding;t.anisotropy=R.capabilities.getMaxAnisotropy();return texCache[src]=t}
const layers=[];
for(let i=0;i<4;i++){
  const g=new THREE.Group();
  const slab=RB(1,1,DEP,.04,paper);g.add(slab);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshStandardMaterial({roughness:.32,metalness:0,envMapIntensity:.6}));
  face.position.z=DEP/2+.002;face.receiveShadow=true;g.add(face);
  const plate=RB(1,.035,DEP+.1,.015,gold);g.add(plate);
  g.userData={slab,face,plate,h:1,y:0};
  G.add(g);layers.push(g);
}
/* 휴대폰 */
const phone=new THREE.Group();
const body=RB(1.5,3.1,.16,.2,new THREE.MeshStandardMaterial({color:0xE7D2AC,metalness:.95,roughness:.28}));phone.add(body);
const scr=new THREE.Mesh(new THREE.PlaneGeometry(1.36,2.94),new THREE.MeshStandardMaterial({roughness:.25,envMapIntensity:.7}));scr.position.z=.083;phone.add(scr);
G.add(phone);
const stand=RB(1.2,.12,.8,.05,gold);stand.position.set(3.35,.75,1.25);stand.rotation.y=-.35;G.add(stand);
const PH={x:3.35,y:2.38,z:1.25};phone.rotation.y=-.35;phone.rotation.x=-.05;

/* 금빛 입자 */
const N=mob()?220:420,pg=new THREE.BufferGeometry(),pp=new Float32Array(N*3),ps=new Float32Array(N);
for(let i=0;i<N;i++){pp[i*3]=(Math.random()-.5)*22;pp[i*3+1]=Math.random()*10;pp[i*3+2]=(Math.random()-.5)*18;ps[i]=Math.random()}
pg.setAttribute('position',new THREE.BufferAttribute(pp,3));pg.setAttribute('seed',new THREE.BufferAttribute(ps,1));
const pmat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms:{t:{value:0},px:{value:R.getPixelRatio()}},
 vertexShader:`attribute float seed;uniform float t;uniform float px;varying float a;void main(){vec3 p=position;p.y=mod(p.y+t*(.12+seed*.18),10.);p.x+=sin(t*.4+seed*20.)*.3;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;a=(.35+.65*sin(t*2.+seed*40.))*smoothstep(0.,1.5,p.y)*smoothstep(10.,7.,p.y);gl_PointSize=(1.6+seed*2.6)*px*(14./-mv.z);}`,
 fragmentShader:`varying float a;void main(){float d=length(gl_PointCoord-.5);float g=smoothstep(.5,0.,d);gl_FragColor=vec4(1.,.82,.5,g*a*.85);}`});
S.add(new THREE.Points(pg,pmat));

/* 업종 순환 */
const KS=['cafe','salon','dining','pilates','photo','shop'];
const NAME={cafe:'카페 · 모닝브루 커피',salon:'헤어 · 라움 헤어',dining:'한식 · 한우 담',pilates:'필라테스 · 코어온',photo:'사진관 · 스튜디오 루멘',shop:'소품샵 · 소소'};
let ki=0;
function layout(k){
  const d=TEX[k];let y=BASEY;
  for(let i=3;i>=0;i--){const g=layers[i],u=g.userData,h=d.r[i]*SW;
    u.slab.scale.set(SW+.08,h,1);u.face.scale.set(SW,h,1);u.plate.scale.set(SW+.2,1,1);u.plate.position.y=-h/2-GAP/2;
    u.face.material.map=tex(d.t[i]);u.face.material.needsUpdate=true;
    u.h=h;u.y=y+GAP+h/2;y+=h+GAP;}
  scr.material.map=tex(d.t[4]);scr.material.needsUpdate=true;
  const cap=document.getElementById('h3dCap');if(cap){cap.classList.remove('on');void cap.offsetWidth;cap.textContent=NAME[k];cap.classList.add('on')}
}
/* 전체를 뒤쪽으로 조금 밀어 균형 */
G.position.set(-.9,0,0);

/* 애니메이션 상태 */
const easeOut=x=>1-Math.pow(1-x,4),back=x=>{const c=1.5;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};
let phase='in',pt=0;  // in → hold → out → in ...
layout(KS[0]);
function setLayer(g,i,p){const u=g.userData;const q=Math.min(1,Math.max(0,p));
  g.position.set(0,u.y+(1-back(q))*7,0);g.visible=q>0;g.rotation.z=(1-easeOut(q))*(i%2?.12:-.12);g.rotation.y=(1-easeOut(q))*.25}
/* 카메라 — 인트로: 금테 가까이에서 뒤로 빠지며 전체가 드러남 */
const camEnd=new THREE.Vector3(),tgtEnd=new THREE.Vector3(),camStart=new THREE.Vector3(),tgtStart=new THREE.Vector3();
function frame(){
  C.aspect=W()/H();
  if(mob()){C.fov=34;camEnd.set(6,5.8,14.3);tgtEnd.set(.35,3.0,0)}
  else{C.fov=27;camEnd.set(7.2,5.4,19.5);tgtEnd.set(-5.1,3.15,0)}
  camStart.set(4.5,1.6,6.5);tgtStart.set(.2,1.2,.5);C.updateProjectionMatrix();
}
frame();
const mouse={x:0,y:0,tx:0,ty:0};
addEventListener('pointermove',e=>{mouse.tx=e.clientX/innerWidth-.5;mouse.ty=e.clientY/innerHeight-.5},{passive:true});
R.domElement.addEventListener('click',()=>window.dispatchEvent(new CustomEvent('pickShop',{detail:KS[ki]})));
R.domElement.style.cursor='pointer';

let t0=performance.now(),last=t0,run=true,T=0;
new IntersectionObserver(es=>{const was=run;run=es[0].isIntersecting;if(run&&!was){last=performance.now();loop()}},{threshold:0}).observe(wrap);
const INTRO=reduce?0:3.6,v=new THREE.Vector3(),tg=new THREE.Vector3();
function loop(){
  if(!run)return;requestAnimationFrame(loop);
  const now=performance.now();const dt=Math.min(.05,(now-last)/1000);last=now;T+=dt;pt+=dt;
  /* 카메라 */
  const ci=reduce?1:easeOut(Math.min(1,T/INTRO||1));
  mouse.x+=(mouse.tx-mouse.x)*.04;mouse.y+=(mouse.ty-mouse.y)*.04;
  v.lerpVectors(camStart,camEnd,ci);tg.lerpVectors(tgtStart,tgtEnd,ci);
  const sway=Math.sin(T*.18)*.6;
  C.position.set(v.x+mouse.x*2.2+sway,v.y-mouse.y*1.2,v.z);C.lookAt(tg);
  /* 층 */
  if(phase==='in'){const delay=T<1?.9:0;layers.forEach((g,i)=>setLayer(g,i,(pt-delay-(3-i)*.34)/.9));
    {const q=easeOut(Math.min(1,Math.max(0,(pt-delay-.2)/1.3)));phone.position.set(PH.x,PH.y-(1-q)*2.4,PH.z);phone.visible=q>.02}
    if(pt>delay+4*.32+1.0){phase='hold';pt=0;document.getElementById('home')?.classList.add('ready')}}
  else if(phase==='hold'){layers.forEach((g,i)=>setLayer(g,i,1));phone.position.set(PH.x,PH.y,PH.z);phone.visible=true;if(pt>5.2&&!reduce){phase='out';pt=0}}
  else if(phase==='out'){layers.forEach((g,i)=>setLayer(g,i,1-(pt-i*.12)/.55));
    if(pt>1.0){ki=(ki+1)%KS.length;layout(KS[ki]);phase='in';pt=0}}
  
  {const c=(T%7)/7;glint.position.set(-6+c*12,3.2+Math.sin(c*3.14)*1.5,2.4);glint.intensity=reduce?0:Math.sin(c*Math.PI)*2.2}
  pmat.uniforms.t.value=T;
  R.render(S,C);
}

loop();
addEventListener('resize',()=>{R.setSize(W(),H());frame()});
})();

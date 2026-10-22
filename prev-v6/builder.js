/* 웹쇼룸 블록 빌더 — 업종을 고르고 블록을 누르면 홈페이지가 한 칸씩 쌓인다
   벤치마킹: Igloo Inc(블록이 쌓여 완성) · 웹쇼룸 확정 가격표(기본 490,000 / 옵션 단가) */
(function(){
const T={
 cafe:{shot:'img/sec/cafe_0.jpg',n:'카페·베이커리',s:'모닝브루 커피',en:'MORNING BREW',bg:'#F6EFE4',ink:'#2B1D14',acc:'#C0622F',soft:'#EAD6BF',
  h:'아침이 달라지는<br>한 잔.',sub:'매일 새벽 직접 볶은 원두로 내리는 동네 로스터리.',cta:'오늘의 메뉴',ml:'메뉴',
  it:[['모닝 라떼','5,500원'],['흑당 크림','6,000원'],['버터 휘낭시에','3,200원'],['핸드드립','6,500원']],
  ab:'로스팅부터 한 잔까지, 한 사람이 끝까지 책임집니다.',hr:'매일 07:00 – 21:00',demo:0,art:'cup'},
 dining:{shot:'img/sec/dining_0.jpg',n:'식당·한식',s:'한우 담',en:'HANWOO DAM',bg:'#F7EFE7',ink:'#3A1F18',acc:'#A8382C',soft:'#EBD3C6',
  h:'담다.',sub:'1++ 한우를, 조용한 룸에서.',cta:'룸 예약',ml:'코스',
  it:[['점심 정식','39,000원'],['저녁 코스','89,000원'],['담 코스','129,000원'],['룸 예약','상견례·접대']],
  ab:'산지 직송 한우만 씁니다. 모든 자리는 룸입니다.',hr:'11:30 – 22:00 · 월 휴무',demo:2,art:'plate'},
 salon:{shot:'img/sec/salon_0.jpg',n:'헤어·뷰티',s:'라움 헤어',en:'RAUM HAIR',bg:'#FBF1EE',ink:'#3B2A2D',acc:'#C9636F',soft:'#F2D6D5',
  h:'LOOK<br>DIFFERENT',sub:'한 번에 한 분만. 원장이 직접 합니다.',cta:'빈 시간 보기',ml:'가격표',
  it:[['여성 컷','25,000원'],['남성 컷','20,000원'],['빌드 펌','90,000원~'],['클리닉','50,000원~']],
  ab:'예약제 1:1 살롱. 상담부터 마무리까지 한 사람이 합니다.',hr:'10:00 – 20:00 · 화 휴무',demo:1,art:'blob'},
 pilates:{shot:'img/sec/pilates_0.jpg',n:'필라테스·요가',s:'코어온 필라테스',en:'CORE ON',bg:'#EEF4EE',ink:'#1F3A2B',acc:'#2F6B55',soft:'#D3E6D8',
  h:'허리가<br>먼저 알아요.',sub:'정원 4명 소그룹. 첫 수업은 자세 측정부터.',cta:'체험 신청',ml:'수업',
  it:[['기구 그룹','정원 4명'],['1:1 개인','체형 교정'],['매트 기초','처음 오시는 분'],['체험 1회','자세 측정']],
  ab:'물리치료 전공 강사가 소그룹으로 진행합니다.',hr:'평일 07:00 – 22:00',demo:3,art:'ring'},
 academy:{n:'학원·교육',s:'브릿지 영어학원',en:'BRIDGE ENGLISH',bg:'#FAF4E8',ink:'#2E2416',acc:'#B8873A',soft:'#EEDFC2',
  h:'말이 먼저<br>트이는 수업.',sub:'레벨 테스트 후 4명 이하 반으로 배정합니다.',cta:'레벨 테스트',ml:'과정',
  it:[['초등 회화','주 2회'],['중등 내신','주 3회'],['성인 회화','새벽·저녁'],['1:1 과외','맞춤 시간']],
  ab:'원어민·한국인 강사가 한 반을 같이 맡습니다.',hr:'평일 14:00 – 22:00',demo:-1,art:'book'},
 photo:{shot:'img/sec/photo_0.jpg',n:'사진관·스튜디오',s:'스튜디오 루멘',en:'STUDIO LUMEN',bg:'#F5EFF1',ink:'#33262C',acc:'#8C6276',soft:'#E6D6DD',
  h:'LIGHT<br>STAYS.',sub:'프로필 · 웨딩 · 브랜드 촬영.',cta:'촬영 문의',ml:'촬영 상품',
  it:[['프로필','1인'],['가족사진','4인 기준'],['웨딩 스냅','야외'],['브랜드','제품·공간']],
  ab:'자연광 스튜디오에서 보정까지 3일 안에 드립니다.',hr:'예약제 10:00 – 19:00',demo:5,art:'lens'},
 shop:{shot:'img/sec/shop_0.jpg',n:'소품샵·쇼핑몰',s:'소소 소품샵',en:'SOSO SHOP',bg:'#FBF5E6',ink:'#3A2E14',acc:'#D49A1E',soft:'#F3E3B8',
  h:'작은 물건이<br>하루를 바꿔요.',sub:'오늘 주문하면 내일 도착.',cta:'신상 보기',ml:'상품',
  it:[['소이 캔들','18,000원'],['미니 화분','12,000원'],['머그컵','15,000원'],['라탄 바구니','22,000원']],
  ab:'직접 써 보고 고른 물건만 들여옵니다.',hr:'온라인 24시간 · 매장 12:00 – 20:00',demo:6,art:'bag'},
 factory:{shot:'img/sec/factory_0.jpg',n:'제조·부품',s:'B2B 부품몰',en:'PARTS MALL',bg:'#F4F3EC',ink:'#2A2B1C',acc:'#B4541E',soft:'#E6E1CC',
  h:'멈춘 라인,<br>부품부터 찾으세요.',sub:'모델명만 보내 주시면 당일 견적.',cta:'부품 찾기',ml:'부품 분류',
  it:[['노즐','규격별'],['히팅호스','길이별'],['펌프','모델별'],['컨트롤러','센서 포함']],
  ab:'재고 부품은 당일 출고, 전국 택배·직송.',hr:'평일 09:00 – 18:00',demo:7,art:'gear'}
};
/* 블록 — 가격은 웹쇼룸 확정 옵션 단가 그대로 */
const B=[
 {k:'hero',n:'첫 화면',d:'가게 이름·한 줄 소개·버튼',p:0},
 {k:'about',n:'소개',d:'우리 가게 이야기',p:0},
 {k:'menu',n:'메뉴·가격',d:'대표 4가지',p:0},
 {k:'map',n:'오시는 길',d:'지도·영업시간',p:0},
 {k:'contact',n:'문의',d:'전화·카톡·문의폼',p:0},
 {k:'gallery',n:'사진 갤러리',d:'페이지 1쪽 추가',p:70000},
 {k:'video',n:'홍보 영상',d:'영상 제작',p:150000},
 {k:'booking',n:'예약',d:'날짜·시간 선택',p:150000},
 {k:'pay',n:'카드 결제',d:'예약금·주문 결제',p:300000},
 {k:'sns',n:'인스타 연결',d:'SNS 피드',p:50000},
 {k:'store',n:'쇼핑몰',d:'장바구니·주문',p:500000},
 {k:'lang',n:'외국어',d:'1개 언어 추가',p:100000},
 {k:'bot',n:'AI 상담봇',d:'24시간 자동 답변',p:300000}
];
const ORDER=['hero','video','about','menu','gallery','store','booking','pay','sns','map','contact'];
const won=n=>n.toLocaleString('ko-KR')+'원';
let ind='cafe',on=new Set(),view='pc',playing=false;

const $=s=>document.querySelector(s);
const gIn=$('#bInd'),gBl=$('#bBlocks'),site=$('#bSite'),scr=$('#bScroll');

gIn.innerHTML=Object.entries(T).map(([k,t])=>`<button type="button" data-k="${k}" style="--a:${t.acc};--s:${t.soft}"><i ${t.shot?`style="background-image:url(img/sec/${k}_m.jpg)"`:''}></i><span>${t.n}</span></button>`).join('');
gBl.innerHTML=B.map(b=>`<button type="button" data-k="${b.k}"><span><b>${b.n}</b><small>${b.d}</small></span><em>${b.p?'+'+won(b.p):'기본 포함'}</em></button>`).join('');

function total(){let s=490000;on.forEach(k=>{s+=B.find(b=>b.k==k).p});const disc=(on.has('booking')&&on.has('pay'))?100000:0;return [s-disc,disc]}
function sumUI(){const [t,d]=total();$('#bTot').textContent=won(t);$('#bDisc').textContent=d?'예약매출팩 묶음 할인 −'+won(d):'';$('#bCnt').textContent=on.size?`블록 ${on.size}개`:'블록 0개';
  gBl.querySelectorAll('button').forEach(b=>b.classList.toggle('on',on.has(b.dataset.k)));
  gIn.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.k==ind));
  const t2=T[ind];$('#bUrl').textContent=t2.en.toLowerCase().replace(/\s/g,'')+'.kr';
  $('#bDemo').style.display=t2.demo>=0?'':'none'}

function art(t){const a=t.acc,s=t.soft;
 const m={cup:`<div class="ar" style="background:radial-gradient(circle,${t.ink} 0 30%,${a} 31% 37%,#fff 38% 56%,${s} 57%)"></div>`,
  plate:`<div class="ar" style="background:radial-gradient(circle,${a} 0 22%,#fff 23% 58%,${s} 59%)"></div>`,
  blob:`<div class="ar" style="border-radius:42% 58% 63% 37%/45% 40% 60% 55%;background:linear-gradient(140deg,${s},${a})"></div>`,
  ring:`<div class="ar" style="background:radial-gradient(circle,transparent 0 46%,${a} 47% 55%,${s} 56% 66%,transparent 67%)"></div>`,
  book:`<div class="ar sq" style="background:linear-gradient(90deg,${a} 0 48%,#fff 48% 52%,${s} 52%)"></div>`,
  lens:`<div class="ar" style="background:radial-gradient(circle,${t.ink} 0 20%,${a} 21% 34%,${s} 35% 60%,#fff 61%)"></div>`,
  bag:`<div class="ar sq" style="border-radius:18px 18px 28px 28px;background:linear-gradient(180deg,${s},${a})"></div>`,
  gear:`<div class="ar" style="background:repeating-conic-gradient(${a} 0 15deg,${s} 15deg 30deg);-webkit-mask:radial-gradient(circle,transparent 0 22%,#000 23% 70%,transparent 71%);mask:radial-gradient(circle,transparent 0 22%,#000 23% 70%,transparent 71%)"></div>`};
 return m[t.art]}

function blk(k,t){
 const ph=(i)=>`<div class="ph" style="background:linear-gradient(${120+i*40}deg,${t.soft},${t.acc}${['55','33','77','44'][i%4]})"></div>`;
 switch(k){
 case 'hero':if(t.shot)return `<img class="x-shot" src="${t.shot}" alt="${t.s} 첫 화면">`;return `<div class="x-hero"><div><small>${t.en}</small><h3>${t.h}</h3><p>${t.sub}</p><a style="background:${t.acc}">${t.cta} →</a></div>${art(t)}</div>`;
 case 'video':return `<div class="x-video" style="background:linear-gradient(120deg,${t.acc},${t.soft})"><span class="pl">▶</span><b>30초 홍보 영상</b></div>`;
 case 'about':return `<div class="x-about"><small>About</small><h4>${t.ab}</h4></div>`;
 case 'menu':return `<div class="x-menu"><small>${t.ml}</small><div>${t.it.map(i=>`<div><i style="background:${t.soft}"></i><b>${i[0]}</b><span style="color:${t.acc}">${i[1]}</span></div>`).join('')}</div></div>`;
 case 'gallery':return `<div class="x-gal"><small>Gallery</small><div>${[0,1,2,3,4,5].map(ph).join('')}</div></div>`;
 case 'store':return `<div class="x-store"><small>Shop</small><div>${t.it.map((i,n)=>`<div>${ph(n)}<b>${i[0]}</b><span>${i[1]}</span><a style="border-color:${t.acc};color:${t.acc}">담기</a></div>`).join('')}</div></div>`;
 case 'booking':return `<div class="x-book"><small>Booking</small><h4>원하는 날짜를 고르세요</h4><div class="cal">${Array.from({length:14},(_,i)=>`<i class="${i==9?'on':''}" style="${i==9?`background:${t.acc};color:#fff`:''}">${i+12}</i>`).join('')}</div><div class="tm">${['11:00','13:30','16:00','19:00'].map((h,i)=>`<i style="${i==1?`border-color:${t.acc};color:${t.acc}`:''}">${h}</i>`).join('')}</div></div>`;
 case 'pay':return `<div class="x-pay"><div><b>결제하기</b><span>카드 · 간편결제</span></div><a style="background:${t.acc}">결제 ${t.it[0][1].includes('원')?t.it[0][1]:''}</a></div>`;
 case 'sns':return `<div class="x-sns"><small>@${t.en.toLowerCase().replace(/\s/g,'')}</small><div>${[0,1,2,3].map(ph).join('')}</div></div>`;
 case 'map':return `<div class="x-map"><div class="mp"><i style="background:${t.acc}"></i></div><div><small>Visit</small><h4>${t.hr}</h4><p>산본로 00 · 주차 가능</p></div></div>`;
 case 'contact':return `<div class="x-con" style="background:${t.ink}0D"><h4>궁금한 점은 바로 물어보세요</h4><div><a style="background:${t.acc}">전화</a><a>카카오톡</a><a>문의 남기기</a></div></div>`;
 }}

function render(newK){
 const t=T[ind];site.style.setProperty('--bg',t.bg);site.style.setProperty('--ink',t.ink);site.style.setProperty('--acc',t.acc);
 const ks=ORDER.filter(k=>on.has(k));
 if(!ks.length){site.innerHTML=`<div class="empty"><b>${t.s}</b><span>왼쪽 블록을 누르면 여기에 한 칸씩 쌓입니다</span></div>`;return}
 const nav=on.has('hero')&&t.shot?'':`<div class="x-nav"><b style="color:${t.acc}">${t.en}</b><span>${[t.ml,'소개','오시는 길'].join(' · ')}${on.has('lang')?' · <em>EN</em>':''}</span></div>`;
 site.innerHTML=nav+ks.map(k=>`<section class="bk ${k==newK?'new':''} ${k=='hero'&&t.shot?'shot':''}" data-k="${k}">${blk(k,t)}</section>`).join('')+`<div class="x-foot">${t.s} · 사업자 정보 · 개인정보처리방침</div>`+(on.has('bot')?`<div class="x-bot ${newK=='bot'?'new':''}" style="background:${t.acc}">AI 상담 <i>●</i></div>`:'');
 if(newK){const el=site.querySelector('.bk.new')||site.querySelector('.x-bot');if(el){const top=el.offsetTop-40;scr.scrollTo({top:Math.max(0,top),behavior:'smooth'})}}
}
function toggle(k,force){const add=force!==undefined?force:!on.has(k);add?on.add(k):on.delete(k);render(add?k:null);sumUI()}
gBl.onclick=e=>{const b=e.target.closest('button');if(!b||playing)return;toggle(b.dataset.k)};
gIn.onclick=e=>{const b=e.target.closest('button');if(!b)return;setInd(b.dataset.k)};
function setInd(k){ind=k;render(null);sumUI();scr.scrollTo({top:0});site.classList.remove('swap');void site.offsetWidth;site.classList.add('swap')}
$('#bAuto').onclick=async()=>{if(playing)return;playing=true;on.clear();render(null);sumUI();scr.scrollTo({top:0});
 for(const k of ['hero','about','menu','map','contact']){await new Promise(r=>setTimeout(r,650));toggle(k,true)}playing=false};
$('#bReset').onclick=()=>{if(playing)return;on.clear();render(null);sumUI()};
document.querySelectorAll('#bView button').forEach(b=>b.onclick=()=>{view=b.dataset.v;document.querySelectorAll('#bView button').forEach(x=>x.classList.toggle('on',x==b));$('#bFrame').classList.toggle('mo',view=='mo')});
$('#bGo').onclick=()=>{const t=T[ind];const am=document.getElementById('askModel'),ac=document.getElementById('askCat');
 if(am){[...am.options].forEach(o=>{if(o.text==t.n)am.value=o.text})}
 const tx=document.querySelector('#askForm textarea');const names=ORDER.concat(['lang','bot']).filter(k=>on.has(k)).map(k=>B.find(b=>b.k==k).n);
 if(tx)tx.value=`[${t.n}] 블록: ${names.join(', ')||'기본'} · 예상 세팅비 ${won(total()[0])}`;};
$('#bDemo').onclick=()=>{const t=T[ind];if(t.demo>=0&&window.openModel)window.openModel(t.demo)};
addEventListener('pickShop',e=>{setInd(e.detail);document.getElementById('build').scrollIntoView({behavior:'smooth'});
 if(!on.size)setTimeout(()=>$('#bAuto').click(),700)});
window.WSB={setInd,toggle,total:()=>total()[0],state:()=>({ind,on:[...on]})};
render(null);sumUI();
})();

(()=>{'use strict';
const cfg=window.STORE_CONFIG;
const $=id=>document.getElementById(id);
const money=n=>Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
let qty=1,idx=0,cartQty=0,toastTimer;
const fallback='assets/lyse-placeholder.svg';
if($('brandName')) $('brandName').textContent=cfg.storeName;
function notification(s){$('toast').textContent=s;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),4000)}
function photoOnError(img){img.onerror=null;img.src=fallback;img.alt+=' (ilustração substituta)'}
function loadPhoto(img,url){img.src=fallback;if(!url||url===fallback)return;const probe=new Image();probe.onload=()=>{img.src=url};probe.onerror=()=>{};probe.src=url}
const photos=Array.isArray(cfg.photos)&&cfg.photos.length?cfg.photos:[fallback];
function displayPhoto(i){idx=(i+photos.length)%photos.length;const big=$('mainImage');big.onerror=()=>photoOnError(big);loadPhoto(big,photos[idx]);big.alt=`Cadeira Pichau Office Lyse, foto ${idx+1}`;[...$('thumbs').children].forEach((b,j)=>b.classList.toggle('current',j===idx))}
for(let i=0;i<photos.length;i++){const b=document.createElement('button');b.type='button';b.title='Ver foto '+(i+1);b.setAttribute('aria-label','Ver foto '+(i+1));const img=document.createElement('img');img.alt='Ângulo '+(i+1)+' da cadeira';img.loading=i<2?'eager':'lazy';img.onerror=()=>photoOnError(img);loadPhoto(img,photos[i]);b.appendChild(img);b.onclick=()=>displayPhoto(i);$('thumbs').appendChild(b)}
displayPhoto(0);
$('prevPhoto').onclick=()=>displayPhoto(idx-1);$('nextPhoto').onclick=()=>displayPhoto(idx+1);
$('zoomPhoto').onclick=()=>{const z=$('zoomImage');z.onerror=()=>photoOnError(z);z.src=photos[idx];$('modalZoom').classList.add('open')};
$('closeZoom').onclick=()=>$('modalZoom').classList.remove('open');$('modalZoom').onclick=e=>{if(e.target.id==='modalZoom')$('modalZoom').classList.remove('open')};document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('modalZoom').classList.remove('open');closeDrawer()}});
function setQty(v){qty=Math.max(1,Math.min(10,Number(v)||1));$('qty').value=qty}
$('minus').onclick=()=>setQty(qty-1);$('plus').onclick=()=>setQty(qty+1);$('qty').oninput=e=>setQty(e.target.value);
$('wasPrice').textContent=money(cfg.productPriceOld);$('cashPrice').textContent=money(cfg.productPricePix);$('cardPrice').textContent=money(cfg.productPriceCard);
$('merchantName').textContent=cfg.merchantLegalName;$('merchantNameFoot').textContent=cfg.merchantLegalName;$('merchantCnpj').textContent=cfg.merchantId;$('merchantEmail').textContent=cfg.supportEmail;
function renderCart(){ $('cartCount').textContent=cartQty; $('drawerTotal').textContent=money(cartQty*cfg.productPricePix);const box=$('drawerItems');box.replaceChildren(); if(!cartQty){box.textContent='Seu carrinho está vazio.';return}const product=document.createElement('div');product.className='drawer-product';product.innerHTML=`<img alt="Produto" src="${fallback}"><div><b>Cadeira Office Lyse, Full Mesh, Cinza</b><p>Quantidade: <strong>${cartQty}</strong></p><p>Subtotal: ${money(cartQty*cfg.productPricePix)}</p><button class="inline-link" id="removeCartItem">Remover do carrinho</button></div>`;box.append(product);$('removeCartItem').onclick=()=>{cartQty=0;renderCart()}}
function openDrawer(){$('cartDrawer').classList.add('open');$('cartDrawer').setAttribute('aria-hidden','false')}
function closeDrawer(){$('cartDrawer').classList.remove('open');$('cartDrawer').setAttribute('aria-hidden','true')}
function addCart(open=true){cartQty=Math.min(10,cartQty+qty);renderCart();if(open)openDrawer()}
$('cartToggle').onclick=openDrawer;$('drawerClose').onclick=closeDrawer;$('drawerCloseBg').onclick=closeDrawer;$('keepShopping').onclick=closeDrawer;
$('addToCart').onclick=()=>addCart();$('buyNow').onclick=()=>{cartQty=qty;renderCart();window.location.href=`checkout.html?qty=${encodeURIComponent(qty)}`};
$('drawerCheckout').onclick=()=>{if(!cartQty){notification('Adicione um produto primeiro.');return}window.location.href=`checkout.html?qty=${encodeURIComponent(cartQty)}`};
$('searchBtn').onclick=()=>notification('A vitrine está configurada com um único produto.');
$('searchInput').addEventListener('keydown',e=>{if(e.key==='Enter'){$('searchBtn').click()}});
$('departmentsToggle').onclick=()=>{const panel=$('departmentsPanel');panel.hidden=!panel.hidden; $('departmentsToggle').setAttribute('aria-expanded', String(!panel.hidden));};
let favored=false;
function changeFavorite(){favored=!favored;for(const id of ['favoriteProduct','favoriteButton']){const el=$(id);if(el){el.setAttribute('aria-pressed',String(favored));if(id==='favoriteProduct')el.textContent=favored?'♥':'♡';}}notification(favored?'Adicionado aos favoritos nesta sessão.':'Removido dos favoritos.');}
$('favoriteProduct').onclick=changeFavorite;
$('favoriteButton').onclick=changeFavorite;
$('shareProduct').onclick=()=>{const url=window.location.href;if(navigator.clipboard && window.isSecureContext){navigator.clipboard.writeText(url).then(()=>notification('Link copiado para compartilhar.')).catch(()=>notification('Copie o endereço da página para compartilhar.'));}else{notification('Copie o endereço da página para compartilhar.');}};

$('zip').addEventListener('input',e=>{let x=e.target.value.replace(/\D/g,'').slice(0,8);e.target.value=x.length>5?x.slice(0,5)+'-'+x.slice(5):x});
$('shipForm').onsubmit=e=>{e.preventDefault();const zip=$('zip').value.replace(/\D/g,'');if(zip.length!==8){notification('Digite um CEP com 8 números.');return}$('deliveryMsg').textContent='O CEP foi informado, mas o cálculo real depende da integração de frete.'};
renderCart();
})();

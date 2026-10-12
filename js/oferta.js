(()=>{"use strict";const p=(window.GAMER_KIDS_PRODUCTS||[]).find(x=>x.slug===document.body.dataset.slug);if(!p){document.getElementById("itemTitle").textContent="Produto não encontrado";return}const money=n=>Number(n).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),get=id=>document.getElementById(id);document.title=p.name+" | Gamer Kids";get("itemTitle").textContent=p.name;get("crumbTitle").textContent=p.name;get("itemPrice").textContent=money(p.price);get("itemSku").textContent=p.id.toUpperCase();get("itemKind").textContent=p.kind==="pc"?"PC GAMER":p.kind==="kit"?"KIT UPGRADE":"MONITOR GAMER";const image=get("itemPhoto");image.src=p.image;image.alt=p.name;image.onerror=()=>{image.onerror=null;image.src="../assets/sem-foto.svg"};for(const [k,v] of p.specs){const wrapper=document.createElement("div"),b=document.createElement("b"),span=document.createElement("span");b.textContent=k;span.textContent=v;wrapper.append(b,span);get("specs").append(wrapper);const pp=document.createElement("p");pp.innerHTML="✓ <b></b>: <span></span>";pp.querySelector("b").textContent=k;pp.querySelector("span").textContent=v;get("keySpecs").append(pp)} 
const gallery=image.closest(".gallery");
if(gallery && typeof HTMLDialogElement!=="undefined"){
 const zoomButton=document.createElement("button");
 zoomButton.type="button";
 zoomButton.className="image-zoom-trigger";
 zoomButton.textContent="Ampliar imagem do produto";
 const dialog=document.createElement("dialog");
 dialog.className="product-zoom-dialog";
 dialog.setAttribute("aria-label","Imagem ampliada do produto");
 const close=document.createElement("button");
 close.type="button";
 close.className="zoom-close";
 close.textContent="Fechar ✕";
 const zoomImage=document.createElement("img");
 zoomImage.alt="Imagem ampliada: "+p.name;
 zoomImage.src=p.image;
 zoomImage.onerror=()=>{zoomImage.onerror=null;zoomImage.src="../assets/sem-foto.svg"};
 close.addEventListener("click",()=>dialog.close());
 dialog.append(close,zoomImage);
 document.body.append(dialog);
 zoomButton.addEventListener("click",()=>dialog.showModal());
 gallery.append(zoomButton);
}
})();

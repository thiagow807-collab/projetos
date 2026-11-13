// Personalize esta constante com o WhatsApp da lanchonete: código do país + DDD + número, somente números.
const WHATSAPP_NUMBER = "5547999999999";
const money = value => value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
const cart = [];
const cartBar = document.querySelector("#cart-bar");
const countEl = document.querySelector("#cart-count");
const totalEl = document.querySelector("#cart-total");
function updateCart(){
  const count = cart.reduce((sum,item)=>sum+item.quantity,0);
  const total = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  countEl.textContent = count + (count===1 ? " item" : " itens");
  totalEl.textContent = "Total: " + money(total);
  cartBar.hidden = count===0;
}
document.querySelectorAll(".add-button").forEach(button=>{
  button.addEventListener("click",()=>{
    const name=button.dataset.product;
    const price=Number(button.dataset.price);
    const found=cart.find(item=>item.name===name);
    if(found) found.quantity++;
    else cart.push({name,price,quantity:1});
    updateCart();
    button.querySelector("span").textContent="✓";
    setTimeout(()=>button.querySelector("span").textContent="+",900);
  });
});
function openWhatsApp(message){
  if(WHATSAPP_NUMBER==="5547999999999"){
    alert("Antes de receber pedidos, configure o número de WhatsApp da lanchonete no arquivo script.js.");
    return;
  }
  window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(message),"_blank","noopener");
}
document.querySelector("#checkout-button").addEventListener("click",()=>{
  if(!cart.length)return;
  const lines=cart.map(item=>item.quantity+"x "+item.name+" — "+money(item.price*item.quantity));
  const total=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  openWhatsApp("Olá! Gostaria de fazer este pedido:\n"+lines.join("\n")+"\nTotal: "+money(total));
});
document.querySelector("#contact-whatsapp").addEventListener("click",event=>{
  event.preventDefault();
  openWhatsApp("Olá! Vim pelo site da Brasa & Pão e gostaria de fazer um pedido.");
});
document.querySelectorAll(".filter-btn").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".filter-btn").forEach(item=>item.classList.remove("active"));
    button.classList.add("active");
    const filter=button.dataset.filter;
    document.querySelectorAll(".product-card").forEach(card=>{
      card.hidden=filter!=="todos" && card.dataset.category!==filter;
    });
  });
});
const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
toggle.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded",String(open));
  toggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu");
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded","false");
}));
document.querySelector("#year").textContent=new Date().getFullYear();
import{a as C,u as I,b as l,j as a,r as p,L as N}from"./index-6b6d889c.js";import{n as k,a as f}from"./toast-7edce97c.js";import{m as z,p as $}from"./plus-9f102ee5.js";const E="_cart_a4yk6_1",y={cart:E,"cart-container":"_cart-container_a4yk6_15","cart-infomation":"_cart-infomation_a4yk6_39","cart-summary":"_cart-summary_a4yk6_41","summary-list":"_summary-list_a4yk6_55","cart-button-home":"_cart-button-home_a4yk6_83","cart-button-checkout":"_cart-button-checkout_a4yk6_121","cart-list":"_cart-list_a4yk6_165"},v={"cart-list":"_cart-list_1nsb2_1","cart-fields":"_cart-fields_1nsb2_27"},w=({cartList:n})=>{const{mutate:d}=C(),{setCurrentUser:t}=I(),m=async(u,_)=>{u.preventDefault();const{productId:h,quantity:b,size:r,isEditQuantity:c}=_;try{const i=await d({variables:{inputProduct:{productId:h,quantity:+b,size:r,isEditQuantity:c}}});t(i.data.addToCart),k("Adjust cart success!")}catch(i){return console.log(i),i.extensions.http.status===401&&setTimeout(()=>navigate("/login"),500),f(i.message),i}};return l("div",{className:v["cart-list"],children:[l("div",{className:v["cart-fields"],children:[a("h4",{children:"Images"}),a("h4",{children:"Name"}),a("h4",{children:"Size"}),a("h4",{children:"Quantity"}),a("h4",{children:"Price"})]}),n.map(u=>a(Q,{item:u,addCart:m},u.id))]})},o={"cart-box":"_cart-box_vmzif_1","cart-box-img":"_cart-box-img_vmzif_27","cart-box-name":"_cart-box-name_vmzif_37","cart-box-size":"_cart-box-size_vmzif_45","cart-box-quantity":"_cart-box-quantity_vmzif_53","cart-box-quantity-flex":"_cart-box-quantity-flex_vmzif_65","btn-quantity":"_btn-quantity_vmzif_75","cart-box-quantity-input":"_cart-box-quantity-input_vmzif_131","cart-box-price":"_cart-box-price_vmzif_147","cart-box-price-sale":"_cart-box-price-sale_vmzif_163","cart-box-price-original":"_cart-box-price-original_vmzif_179","not-sale":"_not-sale_vmzif_195"},Q=({item:n,addCart:d})=>{const[t,m]=p.useState(n.cartInfo),u=Math.round(n.price-n.price*n.discount/100),_=p.useCallback(async(r,c,i)=>{const s=t.findIndex(({sizeProductUser:g})=>g===c);if(s<0)return;let e=+r.target.value;if(e<=0){f(`At least 1 product in cart. Your entered: ${e}`,5);return}else e>i.quantity&&(e=i.quantity,f(`Product in stocks: ${i.quantity}. Your cart is updated.`,5));const x={...t[s],quantity:e},q=[...t];q[s]=x,m(q),await d(r,{productId:n.id,quantity:e,size:c,isEditQuantity:!0})},[t]),h=p.useCallback(async r=>{const c=t.findIndex(({sizeProductUser:e})=>e===r);if(c<0||t[c].quantity===1)return;const i={...t[c],quantity:t[c].quantity-1},s=[...t];s[c]=i,m(s),await d(event,{productId:n.id,quantity:i.quantity,size:r,isEditQuantity:!0})},[t]),b=p.useCallback(async(r,c)=>{const i=t.findIndex(({sizeProductUser:x})=>x===r);if(i<0)return;if(t[i].quantity>c.quantity){f(`Product is maximum quantity. Product in stocks: ${c.quantity}.`,5);return}const s={...t[i],quantity:t[i].quantity+1},e=[...t];e[i]=s,m(e),await d(event,{productId:n.id,quantity:s.quantity,size:r,isEditQuantity:!0})},[t]);return l("div",{className:o["cart-box"],children:[a("div",{className:o["cart-box-img"],children:a("img",{src:n.images[0],alt:n.name})}),a("h4",{className:o["cart-box-name"],children:n.name}),a("div",{className:o["cart-box-size"],children:t.map(({sizeProductUser:r})=>a("p",{children:r},r))}),a("div",{className:o["cart-box-quantity"],children:t.map(({quantity:r,sizeProductUser:c},i)=>{const[s]=n.size.items.filter(({size:e})=>e===c);return l("div",{className:o["cart-box-quantity-flex"],children:[a("button",{className:o["btn-quantity"],onClick:()=>h(c),children:a("img",{src:z,alt:"minus icon"})}),a("input",{type:"tel",className:o["cart-box-quantity-input"],value:r>=s.quantity?s.quantity:r,onChange:e=>_(e,c,s)}),a("button",{className:o["btn-quantity"],onClick:()=>b(c,s),disabled:r>=s.quantity,children:a("img",{src:$,alt:"plus icon"})})]},n.id+i)})}),l("div",{className:o["cart-box-price"],children:[n.discount>0?l("span",{className:o["cart-box-price-sale"],children:["$",u]}):null,l("span",{className:`${o["cart-box-price-original"]} ${n.discount?null:o["not-sale"]}`,children:["$",n.price]})]})]},n.id)},T=()=>{const{currentUser:n}=I();n.wishlist.items.map(({productId:t})=>t);const d=Object.values(n.cart.itemsInfo.reduce((t,m)=>{const{id:u,quantity:_,sizeProductUser:h,...b}=m;return u in t?t[u].cartInfo.push({quantity:_,sizeProductUser:h}):t[u]={id:u,...b,cartInfo:[{quantity:_,sizeProductUser:h}]},t},{}));return a("div",{className:y.cart,children:l("div",{className:`container ${y["cart-container"]}`,children:[l("div",{className:y["cart-infomation"],children:[a("h1",{children:"Shopping cart"}),a(w,{cartList:d}),a(N,{className:y["cart-button-home"],to:"/",children:a("span",{children:"Back to Home"})})]}),l("div",{className:y["cart-summary"],children:[a("h1",{children:"Summary"}),a("div",{className:y["summary-list"]}),a("button",{className:y["cart-button-checkout"],children:"Check out"})]})]})})};export{T as default};

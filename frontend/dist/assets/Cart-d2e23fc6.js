import{a as z,u as g,b as m,j as a,r as p,L as k}from"./index-26733e41.js";import{n as w,a as f}from"./toast-99f67b36.js";import{m as $,p as j}from"./plus-9f102ee5.js";const E="_cart_1jdpm_1",b={cart:E,"cart-container":"_cart-container_1jdpm_15","cart-infomation":"_cart-infomation_1jdpm_39","cart-summary":"_cart-summary_1jdpm_41","summary-list":"_summary-list_1jdpm_55","cart-button-home":"_cart-button-home_1jdpm_83","cart-button-checkout":"_cart-button-checkout_1jdpm_121"},I={"cart-list":"_cart-list_1nsb2_1","cart-fields":"_cart-fields_1nsb2_27"},Q=({cartList:t})=>{const{mutate:d}=z(),{setCurrentUser:n}=g(),u=async(c,y)=>{c.preventDefault();const{productId:_,quantity:h,size:s,isEditQuantity:i}=y;try{const r=await d({variables:{inputProduct:{productId:_,quantity:+h,size:s,isEditQuantity:i}}});n(r.data.addToCart),w("Adjust cart success!")}catch(r){return r.extensions.http.status===401&&setTimeout(()=>navigate("/login"),500),f(r.message),r}};return m("div",{className:I["cart-list"],children:[m("div",{className:I["cart-fields"],children:[a("h4",{children:"Images"}),a("h4",{children:"Name"}),a("h4",{children:"Size"}),a("h4",{children:"Quantity"}),a("h4",{children:"Price"})]}),t.map(c=>a(L,{item:c,addCart:u},c.id))]})},l={"cart-box":"_cart-box_vmzif_1","cart-box-img":"_cart-box-img_vmzif_27","cart-box-name":"_cart-box-name_vmzif_37","cart-box-size":"_cart-box-size_vmzif_45","cart-box-quantity":"_cart-box-quantity_vmzif_53","cart-box-quantity-flex":"_cart-box-quantity-flex_vmzif_65","btn-quantity":"_btn-quantity_vmzif_75","cart-box-quantity-input":"_cart-box-quantity-input_vmzif_131","cart-box-price":"_cart-box-price_vmzif_147","cart-box-price-sale":"_cart-box-price-sale_vmzif_163","cart-box-price-original":"_cart-box-price-original_vmzif_179","not-sale":"_not-sale_vmzif_195"},L=({item:t,addCart:d})=>{const[n,u]=p.useState(t.cartInfo),c=Math.round(t.price-t.price*t.discount/100),y=p.useCallback(async(s,i,r)=>{const e=n.findIndex(({sizeProductUser:C})=>C===i);if(e<0)return;let o=+s.target.value;if(o<=0){f(`At least 1 product in cart. Your entered: ${o}`,5);return}else o>r.quantity&&(o=r.quantity,f(`Product in stocks: ${r.quantity}. Your cart is updated.`,5));const q={...n[e],quantity:o},v=[...n];v[e]=q,u(v),await d(s,{productId:t.id,quantity:o,size:i,isEditQuantity:!0})},[]),_=p.useCallback(async s=>{const i=n.findIndex(({sizeProductUser:o})=>o===s);if(i<0||n[i].quantity===1)return;const r={...n[i],quantity:n[i].quantity-1},e=[...n];e[i]=r,u(e),await d(event,{productId:t.id,quantity:r.quantity,size:s,isEditQuantity:!0})},[]),h=p.useCallback(async(s,i)=>{const r=n.findIndex(({sizeProductUser:q})=>q===s);if(r<0)return;if(n[r].quantity>i.quantity){f(`Product is maximum quantity. Product in stocks: ${i.quantity}.`,5);return}const e={...n[r],quantity:n[r].quantity+1},o=[...n];o[r]=e,u(o),await d(event,{productId:t.id,quantity:e.quantity,size:s,isEditQuantity:!0})},[]);return m("div",{className:l["cart-box"],children:[a("div",{className:l["cart-box-img"],children:a("img",{src:t.images[0],alt:t.name})}),a("h4",{className:l["cart-box-name"],children:t.name}),a("div",{className:l["cart-box-size"],children:n.map(({sizeProductUser:s})=>a("p",{children:s},s))}),a("div",{className:l["cart-box-quantity"],children:n.map(({quantity:s,sizeProductUser:i},r)=>{const[e]=t.size.items.filter(({size:o})=>o===i);return m("div",{className:l["cart-box-quantity-flex"],children:[a("button",{className:l["btn-quantity"],onClick:()=>_(i),children:a("img",{src:$,alt:"minus icon"})}),a("input",{type:"tel",className:l["cart-box-quantity-input"],value:s>=e.quantity?e.quantity:s,onChange:o=>y(o,i,e)}),a("button",{className:l["btn-quantity"],onClick:()=>h(i,e),disabled:s>=e.quantity,children:a("img",{src:j,alt:"plus icon"})})]},t.id+r)})}),m("div",{className:l["cart-box-price"],children:[t.discount>0?m("span",{className:l["cart-box-price-sale"],children:["$",c]}):null,m("span",{className:`${l["cart-box-price-original"]} ${t.discount?null:l["not-sale"]}`,children:["$",t.price]})]})]},t.id)},N={"summary-list":"_summary-list_b1xoy_1","summary-fields":"_summary-fields_b1xoy_27"},S=({cartList:t})=>m("div",{className:N["summary-list"],children:[m("div",{className:N["summary-fields"],children:[a("h4",{children:"Name"}),a("h4",{children:"Size"}),a("h4",{children:"Quantity"}),a("h4",{children:"Total"})]}),t.map(d=>a(T,{item:d},d.id))]}),x={"summary-box":"_summary-box_14w4m_1","summary-box-img":"_summary-box-img_14w4m_27","summary-box-name":"_summary-box-name_14w4m_37","summary-box-size":"_summary-box-size_14w4m_45","summary-box-quantity":"_summary-box-quantity_14w4m_53","summary-box-quantity-flex":"_summary-box-quantity-flex_14w4m_65","summary-box-price":"_summary-box-price_14w4m_75"},T=({item:t})=>{const d=Math.round(t.price-t.price*t.discount/100),n=t.cartInfo.reduce((u,c)=>u+c.quantity,0);return m("div",{className:x["summary-box"],children:[a("h4",{className:x["summary-box-name"],children:t.name}),a("div",{className:x["summary-box-size"],children:t.cartInfo.map(({sizeProductUser:u})=>a("p",{children:u},u))}),a("div",{className:x["summary-box-quantity"],children:t.cartInfo.map(({quantity:u},c)=>a("div",{className:x["summary-box-quantity-flex"],children:a("p",{children:u})},t.id+c))}),m("p",{className:x["summary-box-price"],children:["$",t.discount>0?d*n:t.price*n]})]},t.id)},M=()=>{const{currentUser:t}=g();t.wishlist.items.map(({productId:n})=>n);const d=p.useMemo(()=>Object.values(t.cart.itemsInfo.reduce((n,u)=>{const{id:c,quantity:y,sizeProductUser:_,...h}=u;return c in n?n[c].cartInfo.push({quantity:y,sizeProductUser:_}):n[c]={id:c,...h,cartInfo:[{quantity:y,sizeProductUser:_}]},n},{})),[t.cart.itemsInfo]);return a("div",{className:b.cart,children:m("div",{className:`container ${b["cart-container"]}`,children:[m("div",{className:b["cart-infomation"],children:[a("h1",{children:"Shopping cart"}),a(Q,{cartList:d}),a(k,{className:b["cart-button-home"],to:"/",children:a("span",{children:"Back to Home"})})]}),m("div",{className:b["cart-summary"],children:[a("h1",{children:"Summary"}),a(S,{cartList:d}),a("button",{className:b["cart-button-checkout"],children:"Check out"})]})]})})};export{M as default};
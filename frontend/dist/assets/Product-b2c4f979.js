import{U as i,V as u,j as r,S as l,W as m,b as t,F as p,L as e,P as g}from"./index-6b6d889c.js";import{S as h}from"./SliderImages-3424c2a5.js";const b="_breadcrumb_8ohwd_1",a={breadcrumb:b,"product-container":"_product-container_8ohwd_25"},_=()=>{const{productId:o}=i(),{data:c,loading:s}=u(o);if(s)return r(l,{});const[d]=m.filter(({category:n})=>n===c.product.category);return t(p,{children:[t("div",{className:`${a.breadcrumb}`,children:[r(e,{to:"/",children:"Home"}),r("span",{children:" / "}),r(e,{to:g,children:"Products"}),r("span",{children:" / "}),r(e,{to:`/products?category=${c.product.category}`,children:d.title})]}),r("section",{className:`${a["product-section"]} section`,children:t("div",{className:`container ${a["product-container"]}`,children:[r(h,{productImg:c.product.images,productName:c.product.name}),r("div",{className:"product-details",children:"details"})]})})]})};export{_ as default};

import{m as E,a0 as O,r as k,w as z,C as N,n as b,p as g,o as C,a1 as f,a as _,j as i,L as $,S as w,e as P,k as A,l as I,a2 as y}from"./index-e09b3632.js";import{a as W,b as G,f as F,P as x}from"./ProductCard-c29aefe1.js";import"./toast-1c021ce3.js";import"./plus-9f102ee5.js";import"./SliderImages-5145811e.js";const H=()=>{var m;const{data:s}=E(),[a,t]=O(),[e,o]=k.useState(parseInt(a.get("page"))||1),n=z(),{setCategoryFilter:c,setSortFilter:d}=F;k.useEffect(()=>{const v=Object.values(N).find(({id:u})=>u==a.get("category"));c(v?{...v}:{...N.ALL});const S=Object.values(b).find(({id:u})=>u==a.get("sort"));d(S?{...S}:{...b.DEFAULT}),n(`?category=${g().id}&sort=${C().id}&page=${e}`,{replace:!0}),window.scroll({top:0,left:0,behavior:"smooth"})},[a,e]);const h=v=>{o(v)};return f(s==null?void 0:s.products),((m=f())==null?void 0:m.length)>0&&f(W(C(),G(g(),f()))),{products:f(),pageChangeHandler:h,currentPage:e}},M="_categories_1hulb_13",R="_active_1hulb_105",l={"filter-container":"_filter-container_1hulb_1","categories-sidebar":"_categories-sidebar_1hulb_13",categories:M,"categories-list":"_categories-list_1hulb_51","categories-item":"_categories-item_1hulb_63",active:R,"categories-link":"_categories-link_1hulb_127","products-random":"_products-random_1hulb_147"},T=({productsRandom:s})=>{const{setCategoryFilter:a}=F;return _("div",{className:`${l["filter-container"]}`,children:[i("nav",{className:`${l["categories-sidebar"]}`,children:_("div",{className:`${l.categories}`,children:[i("h1",{children:"Category"}),i("ul",{className:`${l["categories-list"]}`,children:Object.values(N).map(({id:t,displayName:e})=>i("li",{className:`${l["categories-item"]} ${g().id===t?l.active:void 0}`,children:i($,{to:`?category=${t}`,onClick:()=>{a({id:t,displayName:e})},className:`${l["categories-link"]}`,children:e})},t))})]})}),_("div",{className:`${l["products-random"]}`,children:[i("h1",{children:"Random Products"}),i("div",{className:"products-list",children:s?[...s.slice(0,2)].map(t=>i(x,{id:t.id,productImg:t.images,price:t.price,category:t.category,title:t.title,discount:t.discount!=0?t.discount:null,size:t.size,isInCart:t.inCart,isInWishlist:t.inWishlist},t.id)):i(w,{})})]})]})},V="_active_m2t1l_15",j={"pagination-item":"_pagination-item_m2t1l_1",active:V},B=({productsPerPage:s,totalProducts:a,pageChangeHandler:t,currentPage:e})=>{const o=Math.ceil(a/s),n=Array.from({length:o},(h,m)=>m+1),c=3;let d=[];return e!=n.slice(e-1,e-1+c)[Math.floor(c/2)]&&e!==o&&(d=[...n.slice(e-2,e-2+c)]),e===1&&(d=[...n.slice(e-1,e-1+c)]),e===o&&(d=[...n.slice(e-c,e)]),o<=c&&(d=[...n.slice(0,o)]),d.map((h,m)=>i("li",{className:`${j["pagination-item"]} ${e===h?j.active:""}`,children:i("button",{onClick:()=>t(h),children:h})},m))},D="_active_1679p_39",r={"filter-products":"_filter-products_1679p_1","filter-category":"_filter-category_1679p_1","filter-category-link":"_filter-category-link_1679p_15",active:D,"filter-sort":"_filter-sort_1679p_51"},U=()=>{const{setSortFilter:s}=F;return i("div",{className:`${r["filter-products"]}`,children:_("div",{className:`${r["filter-category"]}`,children:[i($,{to:`?category=${P}`,className:`${r["filter-category-link"]} ${g().id===P?r.active:void 0}`,children:"All"}),i($,{to:`?category=${A}`,className:`${r["filter-category-link"]} ${g().id===A?r.active:void 0}`,children:"Featured"}),i($,{to:`?category=${I}`,className:`${r["filter-category-link"]} ${g().id===I?r.active:void 0}`,children:"Hot Sale"}),_("div",{className:`${r["filter-sort"]}`,children:[i("h2",{className:"filter-sort--selected",children:C().displayName}),i("ul",{children:Object.values(b).map(({id:a,displayName:t})=>i($,{to:`?category=${g().id}&sort=${a}`,onClick:()=>{s({id:a,displayName:t})},children:t},a))})]})]})})},p={"products-container":"_products-container_1tf3i_1","products-list":"_products-list_1tf3i_17","filter-pagination":"_filter-pagination_1tf3i_33"},Q=({products:s,pageChangeHandler:a,currentPage:t})=>_("div",{className:`${p["products-container"]}`,children:[i(U,{}),(s==null?void 0:s.length)>0?i("div",{className:`${p["products-list"]}`,children:s.slice((t-1)*y,t*y).map(e=>i(x,{id:e.id,productImg:e.images,price:e.price,category:e.category,name:e.name,description:e.description,discount:e.discount!=0?e.discount:null,isInCart:e.inCart,isInWishlist:e.inWishlist,size:e.size},e.id))}):i(w,{}),i("ul",{className:`${p["filter-pagination"]}`,children:s!=null&&s.length?i(B,{currentPage:t,productsPerPage:y,totalProducts:s.length,pageChangeHandler:a}):null})]}),L={"products-container":"_products-container_1bce3_1"},Z=()=>{const{products:s,currentPage:a,pageChangeHandler:t}=H();return i("section",{className:`${L["products-section"]} section`,children:_("div",{className:`container ${L["products-container"]}`,children:[i(T,{productsRandom:s}),i(Q,{products:s,pageChangeHandler:t,currentPage:a})]})})};export{Z as default};

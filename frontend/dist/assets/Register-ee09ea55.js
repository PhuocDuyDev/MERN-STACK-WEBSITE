import{u as F,r as s,a3 as A,w as j,j as e,a as n,I as m,L as B,a4 as G}from"./index-e09b3632.js";import{v as c}from"./index-cda56c12.js";import{n as R}from"./toast-1c021ce3.js";const D="_option_zqs4k_153",a={"register-page":"_register-page_zqs4k_1","form-input":"_form-input_zqs4k_89","error-server":"_error-server_zqs4k_119","success-server":"_success-server_zqs4k_139",option:D},Y=()=>{const{isAuthenticated:d}=F(),[i,v]=s.useState(""),[o,f]=s.useState(""),[u,w]=s.useState(""),{mutate:_,error:l,loading:y,data:r}=A(),[p,E]=s.useState(null),[g,h]=s.useState(null),[N,I]=s.useState(null),[S,P]=s.useState(null),[b,z]=s.useState(null),C=j();s.useEffect(()=>{d&&(R("You must logout before register!"),C("/products")),r&&!l&&(E(r==null?void 0:r.register.message),h(null)),l&&h(l.message)},[l,r,d]);const L=async t=>{t.preventDefault(),await _({variables:{name:i,email:o,password:u}})},k=t=>{v(t.target.value)},x=t=>{f(t.target.value)},H=t=>{w(t.target.value)},M=()=>{I(c.isLength(i.trim(),{min:3}))},V=()=>{P(c.isEmail(o))},q=()=>{z(c.isLength(u.trim(),{min:6}))};return e("div",{className:a["register-page"],children:n("form",{method:"post",className:a.form,onSubmit:L,children:[n("div",{className:a["form-input"],children:[e("label",{htmlFor:"inputName",children:"Fullname: "}),e(m,{sizeInput:"small",id:"inputName",type:"text",value:i,name:"name",onChange:k,onBlur:M,placeholder:"Enter your fullname..."}),N===!1?e("span",{children:"Fullname is invalid. Please try again!"}):null]}),n("div",{className:a["form-input"],children:[e("label",{htmlFor:"inputEmail",children:"Email: "}),e(m,{sizeInput:"small",id:"inputEmail",type:"email",value:o,name:"email",onChange:x,onBlur:V,placeholder:"Enter your email..."}),S===!1?e("span",{children:"Email is invalid. Please try again!"}):null]}),n("div",{className:a["form-input"],children:[e("label",{htmlFor:"inputPassword",children:"Password: "}),e(m,{sizeInput:"small",id:"inputPassword",type:"password",value:u,name:"password",onChange:H,onBlur:q,placeholder:"Enter your password..."}),b===!1?e("span",{children:"Password is invalid. Please try again!"}):null]}),g?e("span",{className:a["error-server"],children:g}):p?n("span",{className:a["success-server"],children:[p,"! Login now!"]}):null,n("div",{className:a.option,children:[e("p",{children:"Already have an account?"}),e(B,{to:G,children:"Login now!"})]}),e("button",{type:"submit",children:y?"Try register":"Submit"})]})})};export{Y as default};

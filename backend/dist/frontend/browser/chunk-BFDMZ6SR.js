import{a as R,b as j}from"./chunk-MR4OQB62.js";import{a as P,b as l,d as I,e as D,g as G,i as U,j as q,k as A,l as B,m as T,p as V,q as L}from"./chunk-UJIKMQO5.js";import{b as _}from"./chunk-MOBWSTXB.js";import{a as N,b as O}from"./chunk-MFJWH2YW.js";import{h as w,k as E}from"./chunk-OKUQG4XM.js";import{Cb as x,Db as o,Ga as i,W as d,Y as F,Za as t,Zb as y,gb as r,hb as e,ib as h,ob as M,yb as m}from"./chunk-COKKNC63.js";import{d as u,e as f,f as g}from"./chunk-4RCH4JJG.js";var k=()=>["example-form"],H=()=>["header"],v=()=>["example-full-width"],z=()=>["example-button-row"],le=(()=>{var s,n,p;let a=class a{constructor(){f(this,s);f(this,n);f(this,p);g(this,s,d(_)),g(this,n,d(E)),g(this,p,d(w)),this.form=d(A).group({fullname:["",[l.required]],email:["",[l.required,l.email]],password:["",[l.required,l.minLength(5)]]})}OnSignUp(){console.log("Hello from sign up"),u(this,s).userSignup(this.form.value).subscribe(S=>{S.success?(u(this,n).success("Signup Successful!"),u(this,p).navigate(["signin"])):u(this,n).error("Unable to signup!")})}};s=new WeakMap,n=new WeakMap,p=new WeakMap,a.\u0275fac=function(c){return new(c||a)},a.\u0275cmp=F({type:a,selectors:[["app-signup"]],standalone:!0,features:[x],decls:18,vars:14,consts:[[3,"ngSubmit","ngClass","formGroup"],[3,"ngClass"],["type","text","matInput","","formControlName","fullname","placeholder","Ex. suresh bamma"],["type","text","matInput","","formControlName","email","placeholder","Ex. sb@miu.edu"],["type","password","matInput","","formControlName","password","placeholder","Strong password suggested"],["mat-flat-button","","type","submit",3,"disabled"]],template:function(c,C){c&1&&(r(0,"form",0),M("ngSubmit",function(){return C.OnSignUp()}),r(1,"h3",1),m(2,"Please Sign up"),e(),r(3,"mat-form-field",1)(4,"mat-label"),m(5,"Full Name"),e(),h(6,"input",2),e(),r(7,"mat-form-field",1)(8,"mat-label"),m(9,"Email"),e(),h(10,"input",3),e(),r(11,"mat-form-field",1)(12,"mat-label"),m(13,"Password"),e(),h(14,"input",4),e(),r(15,"div",1)(16,"button",5),m(17,"Submit"),e()()()),c&2&&(t("ngClass",o(8,k))("formGroup",C.form),i(),t("ngClass",o(9,H)),i(2),t("ngClass",o(10,v)),i(4),t("ngClass",o(11,v)),i(4),t("ngClass",o(12,v)),i(4),t("ngClass",o(13,z)),i(),t("disabled",C.form.invalid))},dependencies:[B,G,P,I,D,U,q,j,R,V,T,L,y,O,N],styles:[".example-form[_ngcontent-%COMP%]{width:80%;border:1px solid red;border-radius:15px;margin:5%;background-color:#add8e6}.example-full-width[_ngcontent-%COMP%]{width:60%;margin-left:15%;margin-top:5%}.example-button-row[_ngcontent-%COMP%]{margin-top:7%;margin-left:30%;margin-bottom:10%}.header[_ngcontent-%COMP%]{margin-left:25%;color:#4169e1;margin-top:10%}"]});let b=a;return b})();export{le as SignupComponent};

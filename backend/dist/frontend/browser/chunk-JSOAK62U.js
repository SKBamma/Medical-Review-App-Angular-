import{a as O,b as f,d as P,e as T,g as D,h as G,i as V,j as I,k as q,l as $,m as j,p as k,q as B}from"./chunk-UJIKMQO5.js";import{a as H}from"./chunk-VJEXXJ2S.js";import{a as A}from"./chunk-PCOHNBFV.js";import{h as M,k as E}from"./chunk-OKUQG4XM.js";import{Cb as F,Db as v,Ga as l,W as c,Xa as h,Y as x,Za as s,Zb as N,bb as b,gb as d,hb as n,ib as C,ob as y,pb as R,yb as p}from"./chunk-COKKNC63.js";import{a as _,b as S,d as m,e as g,f as w}from"./chunk-4RCH4JJG.js";var W=()=>["example-form"],z=()=>["addReview"],L=()=>["example-full-width"],J=()=>["example-button-row"];function K(r,i){r&1&&(d(0,"p"),p(1,"Review must have meaning"),n())}function Q(r,i){if(r&1&&h(0,K,2,0,"p"),r&2){let t=R();b(t.review.errors!=null&&t.review.errors.revienotstring?0:-1)}}var se=(()=>{var i,t;let u=class u{constructor(){g(this,i);g(this,t);this.reviewService=c(H),w(this,i,c(M)),w(this,t,c(E)),this.medService=c(A),this.medications=m(this,i).getCurrentNavigation()?.extras.state,this.form=c(q).nonNullable.group({review:["",[f.required,this.reviewNotNumber]],rating:[1,[f.required,f.min(1),f.max(5)]]})}get review(){return this.form.controls.review}reviewNotNumber(o){return typeof o.value!="string"?{revienotstring:!0}:null}submitReview(){this.reviewService.addReview(this.medications._id,this.form.value).subscribe({next:o=>{o.success?(this.reviewService.$reviewState.set(this.form.value),this.medService.$medication_state.update(a=>a.map(e=>e._id===this.medications._id?S(_({},e),{reviews:[...e.reviews||[],this.form.value]}):e)),m(this,t).success("Review was addeded successfully!"),m(this,i).navigate(["","medications","list-medications"])):(m(this,t).error("unable to add review"),m(this,i).navigate(["","medications","list-medications"]))},error:o=>{m(this,t).error("unable to add review",o)}})}};i=new WeakMap,t=new WeakMap,u.\u0275fac=function(a){return new(a||u)},u.\u0275cmp=x({type:u,selectors:[["app-add-review"]],standalone:!0,features:[F],decls:15,vars:13,consts:[[3,"ngSubmit","ngClass","formGroup"],[3,"ngClass"],["type","text","matInput","","formControlName","review","placeholder","Ex. Helped to reduce pain!"],["type","number","matInput","","formControlName","rating","placeholder","Ex. 1-5!"],["mat-flat-button","","type","submit",3,"disabled"]],template:function(a,e){a&1&&(d(0,"form",0),y("ngSubmit",function(){return e.submitReview()}),d(1,"h3",1),p(2,"Add Review"),n(),d(3,"mat-form-field",1)(4,"mat-label"),p(5,"Write Review"),n(),C(6,"input",2),h(7,Q,1,1),n(),d(8,"mat-form-field",1)(9,"mat-label"),p(10,"Rating out of 5"),n(),C(11,"input",3),n(),d(12,"div",1)(13,"button",4),p(14,"Submit"),n()()()),a&2&&(s("ngClass",v(8,W))("formGroup",e.form),l(),s("ngClass",v(9,z)),l(2),s("ngClass",v(10,L)),l(4),b(e.review.invalid&&e.review.touched&&e.review.dirty?7:-1),l(),s("ngClass",v(11,L)),l(4),s("ngClass",v(12,J)),l(),s("disabled",e.form.invalid))},dependencies:[$,D,O,G,P,T,V,I,N,B,k,j],styles:[".example-form[_ngcontent-%COMP%]{width:50%;border:1px solid red;border-radius:15px;background-color:#c7e6ad;margin:10% 5% 5% 15%}.example-full-width[_ngcontent-%COMP%]{width:60%;margin-left:15%;margin-top:5%}.example-button-row[_ngcontent-%COMP%]{margin-top:7%;margin-left:30%;margin-bottom:10%}.fileInput[_ngcontent-%COMP%]{margin:15%}.addReview[_ngcontent-%COMP%]{margin-left:35%;margin-top:10%}"]});let r=u;return r})();export{se as AddReviewComponent};

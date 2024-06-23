import{a as ee}from"./chunk-VJEXXJ2S.js";import{b as G}from"./chunk-MOBWSTXB.js";import{a as H,b as L}from"./chunk-523367XX.js";import{a as K,c as Q,d as W,e as X,f as Y}from"./chunk-JX3YJDLC.js";import{a as Z}from"./chunk-PCOHNBFV.js";import{a as q,b as J}from"./chunk-MFJWH2YW.js";import{h as j,k as z}from"./chunk-OKUQG4XM.js";import{Ab as C,Cb as B,Da as F,Db as S,Eb as I,Fb as R,Ga as o,Rb as P,W as u,Xa as D,Y as V,Za as g,Zb as U,ac as O,bb as w,bc as N,cb as A,ea as h,eb as T,fa as v,fb as k,gb as i,hb as a,ib as b,lb as M,ob as f,pb as _,sb as $,yb as r,zb as x}from"./chunk-COKKNC63.js";import{d as s,e as y,f as E}from"./chunk-4RCH4JJG.js";var te=(d,n)=>n._id,ie=()=>["header"],ne=()=>["image"],ae=()=>["button"],oe=()=>["editDelete"];function re(d,n){if(d&1){let e=M();i(0,"button",5),f("click",function(){h(e);let m=_().$implicit,t=_();return v(t.onNavigateToEditReview(m,t.medications))}),r(1,"Edit"),a(),r(2," \xA0 "),i(3,"button",5),f("click",function(){h(e);let m=_().$implicit,t=_();return v(t.onReviewDelete(m._id))}),r(4,"Delete"),a()}}function se(d,n){d&1&&b(0,"mat-icon",4)}function de(d,n){if(d&1&&(i(0,"li")(1,"h5"),r(2),a()(),i(3,"span"),r(4),a(),i(5,"span",1),D(6,re,5,0),a(),i(7,"p"),T(8,se,1,0,"mat-icon",4,A),a(),i(10,"h5"),r(11),I(12,"date"),a(),b(13,"br")),d&2){let e=n.$implicit,c=_();o(2),x(e.review),o(2),x(e.by.fullname),o(),g("ngClass",S(7,oe)),o(),w(c.authService.is_logged_in()&&e.by.user_id===c.authService.$state()._id?6:-1),o(2),k(c.generateStar(e.rating)),o(3),x(R(12,5,e.date))}}function ce(d,n){if(d&1){let e=M();i(0,"button",6),f("click",function(){h(e);let m=_();return v(m.onUpdate(m.medications))}),r(1,"Edit"),a(),i(2,"button",6),f("click",function(){h(e);let m=_();return v(m.ondelete())}),r(3,"Delete"),a()}}function le(d,n){if(d&1){let e=M();i(0,"button",6),f("click",function(){h(e);let m=_();return v(m.goToAddReview(m.medications))}),r(1,"Add Review"),a()}}var De=(()=>{var n,e;let c=class c{constructor(){y(this,n);y(this,e);E(this,n,u(j)),this.medService=u(Z),this.authService=u(G),E(this,e,u(z)),this.reviewService=u(ee),this.medications=s(this,n).getCurrentNavigation()?.extras.state,P(()=>{this.medService.$medication_state()}),this.medications._id!==""?this.medService.getMedicationById(this.medications._id).subscribe(t=>{t.success?this.medications=t.data:s(this,e).error("Something went wong!")}):s(this,e).error("Medicine not found")}ondelete(){console.log("ondeletemedications",this.medications),this.medService.deleteMedicationById(this.medications._id).subscribe(t=>{t.data?(s(this,e).success("Medicine was deleted successfully!"),s(this,n).navigate(["","medications","list-medications"]),this.medService.$medication_state.update(p=>p.filter(l=>l._id!==this.medications._id))):(s(this,e).error("Unauthorized to delete medicine!"),s(this,n).navigate(["","medications","list-medications"]))})}onUpdate(t){this.medications.added_by.user_id===this.authService.$state()._id?s(this,n).navigate(["","medications","update-medication"],{state:t}):(s(this,e).error("Unauthorized to update!"),s(this,n).navigate(["","medications","list-medications"]))}generateStar(t){return Array.from({length:t})}goToAddReview(t){console.log("terst"),s(this,n).navigate(["","medications","medication-details","add-review"],{state:t})}onReviewDelete(t){this.reviewService.deleteReview(this.medications._id,t).subscribe(p=>{p.success?(s(this,e).success("Review was deleted successfully!"),s(this,n).navigate(["","medications"])):s(this,e).success("Unable to delete review!")})}onNavigateToEditReview(t,p){s(this,n).navigate(["","medications","medication-details","update-review"],{state:{review:t,med:p}})}};n=new WeakMap,e=new WeakMap,c.\u0275fac=function(p){return new(p||c)},c.\u0275cmp=V({type:c,selectors:[["app-medication-details"]],standalone:!0,features:[B],decls:26,vars:17,consts:[[1,"example-card"],[3,"ngClass"],[3,"ngClass","src"],["mat-raised-button",""],["aria-hidden","false","fontIcon","star"],["mat-button","",3,"click"],["mat-raised-button","",3,"click"]],template:function(p,l){p&1&&(i(0,"mat-card",0)(1,"mat-card-header")(2,"h2",1),r(3,"Medicine"),a()(),i(4,"mat-card-content")(5,"h5"),b(6,"img",2),a(),i(7,"h5"),r(8),I(9,"uppercase"),a(),i(10,"h5"),r(11),a(),i(12,"h5"),r(13),a(),i(14,"h5"),r(15),a(),i(16,"h5"),r(17),a(),i(18,"h4"),r(19,"Reviews: "),i(20,"ol"),T(21,de,14,8,null,null,te),a()()(),i(23,"mat-card-actions",1),D(24,ce,4,0)(25,le,2,0,"button",3),a()()),p&2&&(o(2),g("ngClass",S(14,ie)),o(4),$("src","http://localhost:3000/api/medications/images/",l.medications.image._id,"",F),g("ngClass",S(15,ne)),o(2),x(R(9,12,l.medications.name)),o(3),C("Generic Name: ",l.medications.generic_name,""),o(2),C("Medication Class: ",l.medications.medication_class,""),o(2),C("Avaliability: ",l.medications.availability,""),o(2),C("Added By: ",l.medications.added_by.fullname,""),o(4),k(l.medications.reviews),o(2),g("ngClass",S(16,ae)),o(),w(l.authService.is_logged_in()&&l.medications.added_by.user_id===l.authService.$state()._id?24:-1),o(),w(l.authService.is_logged_in()?25:-1))},dependencies:[J,q,Y,K,W,Q,X,U,L,H,N,O],styles:[".example-card[_ngcontent-%COMP%]{max-width:450px;margin-left:45px;margin-top:60px}.image[_ngcontent-%COMP%]{max-width:120px;max-height:110px;margin-left:200px;border-radius:15px;border:1px solid red}.button[_ngcontent-%COMP%]{display:flex;justify-content:space-between;margin-bottom:10%}.header[_ngcontent-%COMP%]{margin-left:120px}.example-button-row-2[_ngcontent-%COMP%]{margin-top:10%;margin-bottom:5%;display:flex;justify-content:space-around}.editDelete[_ngcontent-%COMP%]{margin-left:15%}"]});let d=c;return d})();export{De as MedicationDetailsComponent};
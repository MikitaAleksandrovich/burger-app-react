(this["webpackJsonpburger-app"]=this["webpackJsonpburger-app"]||[]).push([[5],{100:function(e,n,r){e.exports={container:"Order_container__2x7fy",ingredient:"Order_ingredient__1xd3e"}},104:function(e,n,r){"use strict";r.r(n);var t=r(7),a=r(8),i=r(9),o=r(10),u=r(0),c=r.n(u),s=r(12),d=r(100),p=r.n(d),l=function(e){var n=[];for(var r in e.ingredients)n.push({name:r,amount:e.ingredients[r]});var t=n.map((function(e){return c.a.createElement("span",{key:e.name,className:p.a.ingredient},e.name," (",e.amount,")")}));return c.a.createElement("div",{className:p.a.container},c.a.createElement("p",null,"Ingredients: ",t),c.a.createElement("p",null,"Price: ",c.a.createElement("strong",null,"USD ",Number.parseFloat(e.price).toFixed(2))))},m=r(37),f=r(17),g=r(38),h=r(13),b=function(e){Object(o.a)(r,e);var n=Object(i.a)(r);function r(){return Object(t.a)(this,r),n.apply(this,arguments)}return Object(a.a)(r,[{key:"componentDidMount",value:function(){var e=this.props,n=e.token,r=e.userId;this.props.onFetchOrders(n,r)}},{key:"render",value:function(){var e=c.a.createElement(m.a,null);return this.props.loading||(e=this.props.orders.map((function(e){return c.a.createElement(l,{key:e.id,ingredients:e.ingredients,price:e.price})}))),c.a.createElement("div",null,e)}}]),r}(u.Component);n.default=Object(s.b)((function(e){return{orders:e.order.orders,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onFetchOrders:function(n,r){return e(h.d(n,r))}}}))(Object(g.a)(b,f.a))}}]);
//# sourceMappingURL=5.38352d4a.chunk.js.map
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,r){},15:function(e,t,r){"use strict";r.r(t);var n=r(0),l=r.n(n),a=r(2),o=r.n(a),c=r(3),i=r(4),u=r(6),s=r(5),v=r(7),d=function(e){function t(e){var r;return Object(c.a)(this,t),(r=Object(u.a)(this,Object(s.a)(t).call(this,e))).cells=r.createGrid(10),r.state={cells:r.cells},r}return Object(v.a)(t,e),Object(i.a)(t,[{key:"createGrid",value:function(e){return new Array(e).fill(void 0).map(function(t){return new Array(e).fill(0)})}},{key:"render",value:function(){return this.renderWorld(this.state.cells)}},{key:"renderWorld",value:function(e){var t=this,r=e.map(function(e,r){return l.a.createElement("div",{className:"world-row"},e.map(function(e,n){var a=0==t.state.cells[r][n]?"dead-cell":"alive-cell";return l.a.createElement("div",{id:r+"_"+n,key:r+"_"+n,onClick:t.handleClick.bind(t),className:a},e)}))});return r.push(l.a.createElement("div",{className:"evoluation-button"},l.a.createElement("button",{onClick:this.startEvoluation.bind(this)},"Start Evolution"))),r}},{key:"handleClick",value:function(e){var t=+e.target.id.split("_")[0],r=+e.target.id.split("_")[1],n=this.state.cells;n[t][r]=1,this.setState({cells:n}),e.target.className="alive-cell"}},{key:"startEvoluation",value:function(){var e=this;setInterval(function(){var t=e.evaluateNextGeneration(e.state.cells);e.setState({cells:t})},1e3)}},{key:"createWorld",value:function(e,t){var r=this.createGrid(t);console.log(e);var n=!0,l=!1,a=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done);n=!0){var i=o.value;r[i.row][i.col]=1}}catch(u){l=!0,a=u}finally{try{n||null==c.return||c.return()}finally{if(l)throw a}}return r}},{key:"evaluateNextGeneration",value:function(e){for(var t=this.createGrid(e.length),r=0;r<e.length;r++)for(var n=0;n<e.length;n++){var l=e[r][n],a=h(l),o=f(r,n,e);t[r][n]=a[o]}return t}}]),t}(l.a.Component),f=function(e,t,r){return function(e,t,r){var n=new Array;return n.push({row:e,col:t+1}),n.push({row:e+1,col:t+1}),n.push({row:e+1,col:t}),n.push({row:e+1,col:t-1}),n.push({row:e,col:t-1}),n.push({row:e-1,col:t-1}),n.push({row:e-1,col:t}),n.push({row:e-1,col:t+1}),n.filter(function(e){return void 0!=r[e.row]&&void 0!=r[e.row][e.col]})}(e,t,r).reduce(function(e,t){return e+r[t.row][t.col]},0)},h=function(e){return[[0,0,0,1,0,0,0,0,0],[0,0,1,1,0,0,0,0,0]][e]};r(14);o.a.render(l.a.createElement(d,null),document.getElementById("root"))},8:function(e,t,r){e.exports=r(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.d4e7aa39.chunk.js.map
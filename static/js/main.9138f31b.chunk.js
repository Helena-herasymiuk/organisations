(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(19)},16:function(e,t,n){},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(9),s=n.n(c);n(16),n(17);var o=function(){return a.a.createElement("header",null,a.a.createElement("h1",null," Organisations "))},u=n(3),i=n(4),l=n(6),m=n(5),h=n(7);var f=function(e){return a.a.createElement("div",{className:"search"},a.a.createElement("h1",null," Search "),a.a.createElement("input",{type:"text",onChange:e.handleSearch,autoFocus:!0}))},p=n(1),d=n.n(p),g=n(2),v="https://api.github.com",b={getAll:function(){var e=Object(g.a)(d.a.mark(function e(){var t,n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(v+"/organizations?page=1&per_page=100");case 3:return n=e.sent,e.next=6,n.json();case 6:t=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t=[];case 12:return e.abrupt("return",t);case 13:case"end":return e.stop()}},e,null,[[0,9]])}));return function(){return e.apply(this,arguments)}}(),getById:function(e){return fetch(v+"/orgs/"+e).then(function(e){return e.json()})},getAllDetails:function(){var e=Object(g.a)(d.a.mark(function e(t){var n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.map(function(e){return b.getById(e.login)});case 2:return n=e.sent,e.next=5,Promise.all(n);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),getMembers:function(){var e=Object(g.a)(d.a.mark(function e(t){var n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(v+"/orgs/"+t+"/members");case 2:return n=e.sent,console.log(v+"/orgs/"+t+"/members"),e.next=6,n.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),getUser:function(e){return fetch(v+"/users/"+e).then(function(e){return e.json()})},getUsersDetails:function(){var e=Object(g.a)(d.a.mark(function e(t){var n;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.map(function(e){return b.getUser(e.login)});case 2:return n=e.sent,e.next=5,Promise.all(n);case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},E=b,O=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(l.a)(this,Object(m.a)(t).call(this,e))).handleSelect=function(e){var t=n.props.searchedOrgs.filter(function(t){return e.target.textContent===(t.name||t.login)})[0].login;n.setState({selectedOrg:t}),E.getMembers(t).then(function(e){n.setState({members:e}),console.log(e)}),console.log(t)},n.renderMembers=function(){return console.log(n.state.members),n.state.members.map(function(e,t){return a.a.createElement("p",null,e.login)})},n.renderSearchedOrgs=function(){return n.props.searchedOrgs.map(function(e,t){return a.a.createElement("div",{className:"organisation",key:t},a.a.createElement("h4",{className:"organisation__name",onClick:n.handleSelect},e.name||e.login),n.state.selectedOrg&&n.state.selectedOrg===e.login?a.a.createElement("div",{className:"org__info"},a.a.createElement("p",{className:"org_description"},e.description),a.a.createElement("div",null,n.renderMembers())):"")})},n.state={selectedOrg:!1,members:[]},n}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"organisations"},a.a.createElement("h1",null," Organisations "),this.renderSearchedOrgs())}}]),t}(a.a.Component);var w=function(){return a.a.createElement("div",null,a.a.createElement("h1",null," User "))},j={debounce:function(e,t){var n=null;return function(){for(var r=this,a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];clearTimeout(n),n=setTimeout(function(){e.call.apply(e,[r].concat(c))},t)}}};var y=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).handleSearch=function(t){var n=t.target.value,r=e.state.orgs.filter(function(e){return e.login.toLowerCase().includes(n.toLowerCase())});E.getAllDetails(r).then(function(t){e.setState({searchedOrgs:t})}).catch(function(e){return[]})},e.state={orgs:[],searchedOrgs:[]},e}return Object(h.a)(t,e),Object(i.a)(t,[{key:"debounceEvent",value:function(){var e=this;return this.debouncedEvent=j.debounce.apply(j,arguments),function(t){return t.persist(),e.debouncedEvent(t)}}},{key:"componentDidMount",value:function(){var e=this;E.getAll().then(function(t){e.setState({orgs:t})})}},{key:"render",value:function(){return a.a.createElement("main",{className:"main"},a.a.createElement(f,{handleSearch:this.debounceEvent(this.handleSearch,500)}),a.a.createElement("div",null," "),a.a.createElement(O,{searchedOrgs:this.state.searchedOrgs}),a.a.createElement(w,null))}}]),t}(a.a.Component);var x=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(o,null),a.a.createElement(y,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.9138f31b.chunk.js.map
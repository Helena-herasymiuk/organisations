(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(19)},16:function(e,t,n){},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),s=n(9),l=n.n(s);n(16),n(17);var c=function(){return a.a.createElement("header",null,a.a.createElement("h1",null," Organisations "))},o=n(2),i=n(3),u=n(5),m=n(4),f=n(6);var h=function(e){return a.a.createElement("div",{className:"search"},a.a.createElement("h1",null," Search "),a.a.createElement("input",{type:"text",onChange:e.handleSearch,autoFocus:!0}))},d=n(1),g=n.n(d),p=n(7),w="https://api.github.com",v={getMembers:function(){var e=Object(p.a)(g.a.mark(function e(t){var n;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(w+"/orgs/"+t+"/members");case 3:return n=e.sent,e.next=6,n.json();case 6:return e.abrupt("return",e.sent);case 9:return e.prev=9,e.t0=e.catch(0),e.abrupt("return",e.t0);case 12:case"end":return e.stop()}},e,null,[[0,9]])}));return function(t){return e.apply(this,arguments)}}(),getFollow:function(){var e=Object(p.a)(g.a.mark(function e(t,n){var r;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(w+"/users/"+t+"/"+n);case 2:return r=e.sent,e.next=5,r.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}},e)}));return function(t,n){return e.apply(this,arguments)}}(),searchOrg:function(){var e=Object(p.a)(g.a.mark(function e(t){var n,r;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(w+"/search/users?q="+t+"%20type:org");case 3:return r=e.sent,e.next=6,r.json();case 6:n=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),n=[];case 12:return e.abrupt("return",n.items);case 13:case"end":return e.stop()}},e,null,[[0,9]])}));return function(t){return e.apply(this,arguments)}}()},b=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).handleSelect=function(e){var t=n.props.searchedOrgs.filter(function(t){return e.target.textContent===t.login})[0].login;n.state.selectedOrg!==t?(n.setState({selectedOrg:t,members:[]}),v.getMembers(t).then(function(e){0===e.length&&(e=""),n.setState({members:e})}).catch(function(e){return["it's error"]})):n.setState({selectedOrg:!1,members:[],selectedUser:!1,followers:!1,follows:!1})},n.handleSelectUser=function(e){var t=n.state.members.filter(function(t){return e.target.textContent===t.login})[0].login;n.state.selectedUser!==t?n.setState({selectedUser:t,followers:!1,follows:!1}):n.setState({selectedUser:!1,followers:!1,follows:!1})},n.hanndleFollowers=function(e){n.state.followers?n.setState({followers:!1}):(v.getFollow(n.state.selectedUser,"followers").then(function(e){0===e.length&&(e=!0),n.setState({followers:e})}).catch(function(e){return["it's error"]}),e.target.nextSibling.textContent=n.searching)},n.hanndleFollows=function(e){n.state.follows?n.setState({follows:!1}):v.getFollow(n.state.selectedUser,"following").then(function(e){0===e.length&&(e=!0),n.setState({follows:e})}).catch(function(e){return["it's error"]})},n.renderFollow=function(e){return Array.isArray(e)?e.map(function(e,t){return a.a.createElement("p",{key:e.id+t},e.login)}):a.a.createElement("p",null,n.notFound)},n.renderMembers=function(){var e=n.state.members;return Array.isArray(e)?0===e.length?a.a.createElement("p",null,n.searching):e.map(function(e,t){return a.a.createElement("div",{className:"member",key:e.id+t},a.a.createElement("div",{className:"member_main"},a.a.createElement("img",{alt:"member avatar",className:"member_avatar",src:e.avatar_url}),a.a.createElement("p",{className:"member_name click",onClick:n.handleSelectUser},e.login)),n.state.selectedUser&&n.state.selectedUser===e.login?a.a.createElement("div",{className:"member_info"},a.a.createElement("div",{className:"member_followers"},a.a.createElement("h4",{className:"member_followers click",onClick:n.hanndleFollowers},"followers:"),n.state.followers?n.renderFollow(n.state.followers):""),a.a.createElement("div",null,a.a.createElement("h4",{className:"member_follows click",onClick:n.hanndleFollows},"follows:"),n.state.follows?n.renderFollow(n.state.follows):"")):" ")}):a.a.createElement("p",null,n.notFound)},n.renderSearchedOrgs=function(){var e=n.props.searchedOrgs;return e?e&&e[0]&&e[0].message?a.a.createElement("p",null,"Sorry, it's error:",a.a.createElement("br",null),e[0].message):0===e.length?a.a.createElement("p",null,n.notFound):e.map(function(e,t){return a.a.createElement("div",{className:"organisation",key:e.id+t},a.a.createElement("h2",{className:"organisation__name click",onClick:n.handleSelect},e.login),n.state.selectedOrg&&n.state.selectedOrg===e.login?a.a.createElement("div",{className:"org__info"},a.a.createElement("p",{className:"org_description"},e.description),a.a.createElement("div",{className:"members"},a.a.createElement("h3",null,"Members :"),n.renderMembers())):"")}):a.a.createElement("p",null,"Please enter name of organisation")},n.state={selectedOrg:!1,members:[],selectedUser:!1,followers:!1,follows:!1},n.notFound="Sorry, i can't find",n.searching="Sorry, i'm searching",n}return Object(f.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"organisations"},this.renderSearchedOrgs())}}]),t}(a.a.Component),E={debounce:function(e,t){var n=null;return function(){for(var r=this,a=arguments.length,s=new Array(a),l=0;l<a;l++)s[l]=arguments[l];clearTimeout(n),n=setTimeout(function(){e.call.apply(e,[r].concat(s))},t)}}};var O=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).handleSearch=function(t){var n=t.target.value.toLowerCase();v.searchOrg(n).then(function(t){e.setState({searchedOrgs:t})}).catch(function(e){return["it's error"]})},e.state={searchedOrgs:!1},e}return Object(f.a)(t,e),Object(i.a)(t,[{key:"debounceEvent",value:function(){var e=this;return this.debouncedEvent=E.debounce.apply(E,arguments),function(t){return t.persist(),e.debouncedEvent(t)}}},{key:"render",value:function(){return a.a.createElement("main",{className:"main"},a.a.createElement(h,{handleSearch:this.debounceEvent(this.handleSearch,500)}),a.a.createElement(b,{searchedOrgs:this.state.searchedOrgs}))}}]),t}(a.a.Component);var S=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(c,null),a.a.createElement(O,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.881857d3.chunk.js.map
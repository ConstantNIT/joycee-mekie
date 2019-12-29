/*! tableSorter 2.8+ widgets - updated 12/16/2013 (v2.14.5) */
;(function(k){
var f=k.tablesorter=k.tablesorter||{};
f.themes={bootstrap:{table:"table table-bordered table-striped",caption:"caption",header:"bootstrap-header",footerRow:"",footerCells:"",icons:"",sortNone:"bootstrap-icon-unsorted",sortAsc:"icon-chevron-up glyphicon glyphicon-chevron-up",sortDesc:"icon-chevron-down glyphicon glyphicon-chevron-down",active:"",hover:"",filterRow:"",even:"",odd:""},jui:{table:"ui-widget ui-widget-content ui-corner-all",caption:"ui-widget-content ui-corner-all",header:"ui-widget-header ui-corner-all ui-state-default", footerRow:"",footerCells:"",icons:"ui-icon",sortNone:"ui-icon-carat-2-n-s",sortAsc:"ui-icon-carat-1-n",sortDesc:"ui-icon-carat-1-s",active:"ui-state-active",hover:"ui-state-hover",filterRow:"",even:"ui-widget-content",odd:"ui-state-default"}};
f.storage=function(b,a,c,e){b=k(b)[0];var d,g,f=!1;d={};g=b.config;var p=k(b);b=e&&e.id||p.attr(e&&e.group||"data-table-group")||b.id||k(".tablesorter").index(p);e=e&&e.url||p.attr(e&&e.page||"data-table-page")||g&&g.fixedUrl||window.location.pathname;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","temp"),f=!0,window.localStorage.removeItem("_tmptest")}catch(q){}k.parseJSON&&(f?d=k.parseJSON(localStorage[a]||"{}"):(g=document.cookie.split(/[;\s|=]/),d=k.inArray(a,g)+1,d=0!==d?k.parseJSON(g[d]||"{}"):{}));if((c||""===c)&&window.JSON&&JSON.hasOwnProperty("stringify"))d[e]||(d[e]={}),d[e][b]=c,f?localStorage[a]=JSON.stringify(d):(c=new Date,c.setTime(c.getTime()+31536E6),document.cookie=a+"="+JSON.stringify(d).replace(/\"/g,'"')+"; expires="+c.toGMTString()+ "; path=/");else return d&&d[e]?d[e][b]:{}};
f.addHeaderResizeEvent=function(b,a,c){var e;c=k.extend({},{timer:250},c);var d=b.config,g=d.widgetOptions,f=function(a){g.resize_flag=!0;e=[];d.$headers.each(function(){var a=k(this),b=a.data("savedSizes")||[0,0],c=this.offsetWidth,d=this.offsetHeight;if(c!==b[0]||d!==b[1])a.data("savedSizes",[c,d]),e.push(this)});e.length&&!1!==a&&d.$table.trigger("resize",[e]);g.resize_flag=!1};f(!1);clearInterval(g.resize_timer);if(a)return g.resize_flag=!1;g.resize_timer= setInterval(function(){g.resize_flag||f()},c.timer)};
f.addWidget({id:"uitheme",priority:10,format:function(b,a,c){var e,d,g,h,p=f.themes,q=a.$table,m=a.$headers,l=a.theme||"jui",n=p[l]||p.jui,s=n.sortNone+" "+n.sortDesc+" "+n.sortAsc;a.debug&&(e=new Date);q.hasClass("tablesorter-"+l)&&a.theme!==l&&b.hasInitialized||(""!==n.even&&(c.zebra[0]+=" "+n.even),""!==n.odd&&(c.zebra[1]+=" "+n.odd),q.find("caption").addClass(n.caption),b=q.removeClass(""===a.theme?"":"tablesorter-"+a.theme).addClass("tablesorter-"+ l+" "+n.table).find("tfoot"),b.length&&b.find("tr").addClass(n.footerRow).children("th, td").addClass(n.footerCells),m.addClass(n.header).not(".sorter-false").bind("mouseenter.tsuitheme mouseleave.tsuitheme",function(a){k(this)["mouseenter"===a.type?"addClass":"removeClass"](n.hover)}),m.find(".tablesorter-wrapper").length||m.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>'),a.cssIcon&&m.find("."+f.css.icon).addClass(n.icons),q.hasClass("hasFilters")&& m.find(".tablesorter-filter-row").addClass(n.filterRow));k.each(m,function(){g=k(this);h=f.css.icon?g.find("."+f.css.icon):g;this.sortDisabled?(g.removeClass(s),h.removeClass(s+" tablesorter-icon "+n.icons)):(d=g.hasClass(f.css.sortAsc)?n.sortAsc:g.hasClass(f.css.sortDesc)?n.sortDesc:g.hasClass(f.css.header)?n.sortNone:"",g[d===n.sortNone?"removeClass":"addClass"](n.active),h.removeClass(s).addClass(d))});a.debug&&f.benchmark("Applying "+l+" theme",e)},remove:function(b,a,c){b=a.$table;a=a.theme|| "jui";c=f.themes[a]||f.themes.jui;var e=b.children("thead").children(),d=c.sortNone+" "+c.sortDesc+" "+c.sortAsc;b.removeClass("tablesorter-"+a+" "+c.table).find(f.css.header).removeClass(c.header);e.unbind("mouseenter.tsuitheme mouseleave.tsuitheme").removeClass(c.hover+" "+d+" "+c.active).find(".tablesorter-filter-row").removeClass(c.filterRow);e.find(".tablesorter-icon").removeClass(c.icons)}});
f.addWidget({id:"columns",priority:30,options:{columns:["primary","secondary","tertiary"]},format:function(b, a,c){var e,d,g,h,p,q,m,l,n=a.$table,s=a.$tbodies,r=a.sortList,v=r.length,w=c&&c.columns||["primary","secondary","tertiary"],x=w.length-1;m=w.join(" ");a.debug&&(e=new Date);for(g=0;g<s.length;g++)d=f.processTbody(b,s.eq(g),!0),h=d.children("tr"),h.each(function(){p=k(this);if("none"!==this.style.display&&(q=p.children().removeClass(m),r&&r[0]&&(q.eq(r[0][0]).addClass(w[0]),1<v)))for(l=1;l<v;l++)q.eq(r[l][0]).addClass(w[l]||w[x])}),f.processTbody(b,d,!1);b=!1!==c.columns_thead?["thead tr"]:[];!1!== c.columns_tfoot&&b.push("tfoot tr");if(b.length&&(h=n.find(b.join(",")).children().removeClass(m),v))for(l=0;l<v;l++)h.filter('[data-column="'+r[l][0]+'"]').addClass(w[l]||w[x]);a.debug&&f.benchmark("Applying Columns widget",e)},remove:function(b,a,c){var e=a.$tbodies,d=(c.columns||["primary","secondary","tertiary"]).join(" ");a.$headers.removeClass(d);a.$table.children("tfoot").children("tr").children("th, td").removeClass(d);for(a=0;a<e.length;a++)c=f.processTbody(b,e.eq(a),!0),c.children("tr").each(function(){k(this).children().removeClass(d)}), f.processTbody(b,c,!1)}});
f.addWidget({id:"filter",priority:50,options:{filter_anyMatch:!1,filter_childRows:!1,filter_columnFilters:!0,filter_cssFilter:"",filter_filteredRow:"filtered",filter_formatter:null,filter_functions:null,filter_hideFilters:!1,filter_ignoreCase:!0,filter_liveSearch:!0,filter_onlyAvail:"filter-onlyAvail",filter_reset:null,filter_saveFilters:!1,filter_searchDelay:300,filter_startsWith:!1,filter_useParsedData:!1,filter_serversideFiltering:!1,filter_defaultAttrib:"data-value"}, format:function(b,a,c){a.$table.hasClass("hasFilters")||(a.parsers||!a.parsers&&c.filter_serversideFiltering)&&f.filter.init(b,a,c)},remove:function(b,a,c){var e,d=a.$tbodies;a.$table.removeClass("hasFilters").unbind("addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search ".split(" ").join(".tsfilter ")).find(".tablesorter-filter-row").remove();for(a=0;a<d.length;a++)e=f.processTbody(b,d.eq(a),!0),e.children().removeClass(c.filter_filteredRow).show(),f.processTbody(b, e,!1);c.filter_reset&&k(document).undelegate(c.filter_reset,"click.tsfilter")}});f.filter={regex:{regex:/^\/((?:\\\/|[^\/])+)\/([mig]{0,3})?$/,child:/tablesorter-childRow/,filtered:/filtered/,type:/undefined|number/,exact:/(^[\"|\'|=]+)|([\"|\'|=]+$)/g,nondigit:/[^\w,. \-()]/g,operators:/[<>=]/g},types:{regex:function(b,a,c,e){if(f.filter.regex.regex.test(a)){var d;b=f.filter.regex.regex.exec(a);try{d=RegExp(b[1],b[2]).test(e)}catch(g){d=!1}return d}return null},exact:function(b,a,c,e){return f.filter.regex.exact.test(a)? a.replace(f.filter.regex.exact,"")==e:null},notMatch:function(b,a,c,e,d,g,f,p){return/^\!/.test(a)?(a=a.replace("!",""),b=e.search(k.trim(a)),""===a?!0:!(p.filter_startsWith?0===b:0<=b)):null},operators:function(b,a,c,e,d,g,h,k,q){if(/^[<>]=?/.test(a)){var m,l;m=h.config;b=f.formatFloat(a.replace(f.filter.regex.operators,""),h);c=m.parsers[g];k=b;if(q[g]||"numeric"===c.type)m=c.format(""+a.replace(f.filter.regex.operators,""),h,m.$headers.eq(g),g),b="number"!==typeof b||""===m||isNaN(m)?b:m;m=!q[g]&& "numeric"!==c.type||isNaN(b)||!d?isNaN(e)?f.formatFloat(e.replace(f.filter.regex.nondigit,""),h):f.formatFloat(e,h):d;/>/.test(a)&&(l=/>=/.test(a)?m>=b:m>b);/</.test(a)&&(l=/<=/.test(a)?m<=b:m<b);l||""!==k||(l=!0);return l}return null},and:function(b,a,c,e){if(/\s+(AND|&&)\s+/g.test(b)){b=a.split(/(?:\s+(?:and|&&)\s+)/g);a=0<=e.search(k.trim(b[0]));for(c=b.length-1;a&&c;)a=a&&0<=e.search(k.trim(b[c])),c--;return a}return null},range:function(b,a,c,e,d,g,h,k,q){if(/\s+(-|to)\s+/.test(a)){b=h.config; var m=a.split(/(?: - | to )/);c=f.formatFloat(m[0].replace(f.filter.regex.nondigit,""),h);k=f.formatFloat(m[1].replace(f.filter.regex.nondigit,""),h);if(q[g]||"numeric"===b.parsers[g].type)a=b.parsers[g].format(""+m[0],h,b.$headers.eq(g),g),c=""===a||isNaN(a)?c:a,a=b.parsers[g].format(""+m[1],h,b.$headers.eq(g),g),k=""===a||isNaN(a)?k:a;a=!q[g]&&"numeric"!==b.parsers[g].type||isNaN(c)||isNaN(k)?isNaN(e)?f.formatFloat(e.replace(f.filter.regex.nondigit,""),h):f.formatFloat(e,h):d;c>k&&(e=c,c=k,k=e); return a>=c&&a<=k||""===c||""===k}return null},wild:function(b,a,c,e,d,f,h){return/[\?|\*]/.test(a)||/\s+OR\s+/.test(b)?(b=h.config,a=a.replace(/\s+OR\s+/gi,"|"),!b.$headers.filter('[data-column="'+f+'"]:last').hasClass("filter-match")&&/\|/.test(a)&&(a="^("+a+")$"),RegExp(a.replace(/\?/g,"\\S{1}").replace(/\*/g,"\\S*")).test(e)):null},fuzzy:function(b,a,c,e){if(/^~/.test(a)){b=0;c=e.length;var d=a.slice(1);for(a=0;a<c;a++)e[a]===d[b]&&(b+=1);return b===d.length?!0:!1}return null}},init:function(b, a,c){var e,d,g,h,p,q;a.debug&&(q=new Date);a.$table.addClass("hasFilters");f.filter.regex.child=RegExp(a.cssChildRow);f.filter.regex.filtered=RegExp(c.filter_filteredRow);!1!==c.filter_columnFilters&&a.$headers.filter(".filter-false").length!==a.$headers.length&&f.filter.buildRow(b,a,c);a.$table.bind("addRows updateCell update updateRows updateComplete appendCache filterReset filterEnd search ".split(" ").join(".tsfilter "),function(c,d){/(search|filterReset|filterEnd)/.test(c.type)||(c.stopPropagation(), f.filter.buildDefault(b,!0));"filterReset"===c.type?f.filter.searching(b,[]):"filterEnd"===c.type?f.filter.buildDefault(b,!0):(d="search"===c.type?d:"updateComplete"===c.type?a.$table.data("lastSearch"):"",f.filter.searching(b,d));return!1});f.filter.bindSearch(b,a.$table.find("input.tablesorter-filter"));c.filter_reset&&k(document).delegate(c.filter_reset,"click.tsfilter",function(){a.$table.trigger("filterReset")});if(c.filter_functions)for(h in c.filter_functions)if(c.filter_functions.hasOwnProperty(h)&& "string"===typeof h)if(g=a.$headers.filter('[data-column="'+h+'"]:last'),e="",!0===c.filter_functions[h]&&!g.hasClass("filter-false"))f.filter.buildSelect(b,h);else if("string"===typeof h&&!g.hasClass("filter-false")){for(d in c.filter_functions[h])"string"===typeof d&&(e+=""===e?'<option value="">'+(g.data("placeholder")||g.attr("data-placeholder")||"")+"</option>":"",e+='<option value="'+d+'">'+d+"</option>");a.$table.find("thead").find('select.tablesorter-filter[data-column="'+h+'"]').append(e)}f.filter.buildDefault(b, !0);a.$table.find("select.tablesorter-filter").bind("change search",function(a,c){f.filter.checkFilters(b,c)});c.filter_hideFilters&&f.filter.hideFilters(b,a);a.showProcessing&&a.$table.bind("filterStart.tsfilter filterEnd.tsfilter",function(c,d){g=d?a.$table.find("."+f.css.header).filter("[data-column]").filter(function(){return""!==d[k(this).data("column")]}):"";f.isProcessing(b,"filterStart"===c.type,d?g:"")});a.debug&&f.benchmark("Applying Filter widget",q);a.$table.bind("tablesorter-initialized pagerInitialized", function(){p=f.filter.setDefaults(b,a,c)||[];p.length&&f.setFilters(b,p,!0);f.filter.checkFilters(b,p)});c.filter_Initialized=!0;a.$table.trigger("filterInit")},setDefaults:function(b,a,c){var e,d=[],g=a.columns;c.filter_saveFilters&&f.storage&&(d=f.storage(b,"tablesorter-filters")||[],(e=k.isArray(d))&&""===d.join("")||!e)&&(d=[]);if(!d.length)for(e=0;e<g;e++)d[e]=a.$headers.filter('[data-column="'+e+'"]:last').attr(c.filter_defaultAttrib)||d[e];k(b).data("lastSearch",d);return d},buildRow:function(b, a,c){var e,d,g,h=a.columns;d='<tr class="tablesorter-filter-row">';for(b=0;b<h;b++)d+="<td></td>";a.$filters=k(d+"</tr>").appendTo(a.$table.find("thead").eq(0)).find("td");for(b=0;b<h;b++)e=a.$headers.filter('[data-column="'+b+'"]:last'),d=c.filter_functions&&c.filter_functions[b]&&"function"!==typeof c.filter_functions[b]||e.hasClass("filter-select"),g=f.getData?"false"===f.getData(e[0],a.headers[b],"filter"):a.headers[b]&&a.headers[b].hasOwnProperty("filter")&&!1===a.headers[b].filter||e.hasClass("filter-false"), d?d=k("<select>").appendTo(a.$filters.eq(b)):(c.filter_formatter&&k.isFunction(c.filter_formatter[b])?((d=c.filter_formatter[b](a.$filters.eq(b),b))&&0===d.length&&(d=a.$filters.eq(b).children("input")),d&&(0===d.parent().length||d.parent().length&&d.parent()[0]!==a.$filters[b])&&a.$filters.eq(b).append(d)):d=k('<input type="search">').appendTo(a.$filters.eq(b)),d&&d.attr("placeholder",e.data("placeholder")||e.attr("data-placeholder")||"")),d&&(d.addClass("tablesorter-filter "+c.filter_cssFilter).attr("data-column", b),g&&(d.addClass("disabled")[0].disabled=!0))},bindSearch:function(b,a){b=k(b)[0];var c,e=b.config.widgetOptions;a.unbind("keyup search filterReset").bind("keyup search",function(d,g){var h=k(this);if(27===d.which)this.value="";else if("number"===typeof e.filter_liveSearch&&this.value.length<e.filter_liveSearch&&""!==this.value||"keyup"===d.type&&(32>d.which&&8!==d.which&&!0===e.filter_liveSearch&&13!==d.which||37<=d.which&&40>=d.which||13!==d.which&&!1===e.filter_liveSearch))return;h.hasClass("tablesorter-filter")&& !h.hasClass("tablesorter-external-filter")?c=g:(c=[],a.each(function(){c[k(this).data("column")||0]=k(this).val()}));f.filter.searching(b,g,c)}).bind("filterReset",function(){a.val("")})},checkFilters:function(b,a){var c=b.config,e=c.widgetOptions,d=k.isArray(a),g=d?a:f.getFilters(b),h=(g||[]).join("");d&&f.setFilters(b,g);e.filter_hideFilters&&c.$table.find(".tablesorter-filter-row").trigger(""===h?"mouseleave":"mouseenter");if(c.lastCombinedFilter!==h||!1===a)if(!1===a&&(c.lastCombinedFilter=null), c.$table.trigger("filterStart",[g]),c.showProcessing)setTimeout(function(){f.filter.findRows(b,g,h);return!1},30);else return f.filter.findRows(b,g,h),!1},hideFilters:function(b,a){var c,e,d;a.$table.find(".tablesorter-filter-row").addClass("hideme").bind("mouseenter mouseleave",function(a){c=k(this);clearTimeout(d);d=setTimeout(function(){/enter|over/.test(a.type)?c.removeClass("hideme"):k(document.activeElement).closest("tr")[0]!==c[0]&&""===f.getFilters(b).join("")&&c.addClass("hideme")},200)}).find("input, select").bind("focus blur", function(a){e=k(this).closest("tr");clearTimeout(d);d=setTimeout(function(){if(""===f.getFilters(b).join(""))e["focus"===a.type?"removeClass":"addClass"]("hideme")},200)})},findRows:function(b,a,c){if(b.config.lastCombinedFilter!==c){var e,d,g,h,p,q,m,l,n,s,r,v,w,x,A,y,B,C,z,E,u=b.config,t=u.widgetOptions,G=u.columns,D=u.$tbodies,H=["range","notMatch","operators"],F=u.$headers.map(function(a){return f.getData?"parsed"===f.getData(u.$headers.filter('[data-column="'+a+'"]:last'),u.headers[a],"filter"): k(this).hasClass("filter-parsed")}).get();u.debug&&(E=new Date);for(p=0;p<D.length;p++)if(!D.eq(p).hasClass(f.css.info)){q=f.processTbody(b,D.eq(p),!0);g=q.children("tr").not("."+u.cssChildRow).not(u.selectorRemove);d=g.length;if(""===c||t.filter_serversideFiltering)q.children().show().removeClass(t.filter_filteredRow);else for(B=!0,x=u.lastSearch||u.$table.data("lastSearch")||[],k.each(a,function(a,b){B=0===(b||"").indexOf(x[a]||"")&&B&&!/(\s+or\s+|\|)/g.test(b||"")}),B&&0===g.filter(":visible").length&& (B=!1),h=0;h<d;h++)if(n=g[h].className,!(f.filter.regex.child.test(n)||B&&f.filter.regex.filtered.test(n))){z=!0;n=g.eq(h).nextUntil("tr:not(."+u.cssChildRow+")");s=n.length&&t.filter_childRows?n.text():"";s=t.filter_ignoreCase?s.toLocaleLowerCase():s;m=g.eq(h).children("td");for(l=0;l<G;l++)if(a[l]||t.filter_anyMatch){e=u.cache[p].normalized[h][l];t.filter_useParsedData||F[l]?r=e:(r=k.trim(m.eq(l).text()),r=u.sortLocaleCompare?f.replaceAccents(r):r);v=!f.filter.regex.type.test(typeof r)&&t.filter_ignoreCase? r.toLocaleLowerCase():r;y=z;if("undefined"===typeof a[l]||null===a[l])a[l]=t.filter_anyMatch?c:a[l];a[l]=u.sortLocaleCompare?f.replaceAccents(a[l]):a[l];w=t.filter_ignoreCase?a[l].toLocaleLowerCase():a[l];t.filter_functions&&t.filter_functions[l]?!0===t.filter_functions[l]?y=u.$headers.filter('[data-column="'+l+'"]:last').hasClass("filter-match")?0<=v.search(w):a[l]===r:"function"===typeof t.filter_functions[l]?y=t.filter_functions[l](r,e,a[l],l,g.eq(h)):"function"===typeof t.filter_functions[l][a[l]]&& (y=t.filter_functions[l][a[l]](r,e,a[l],l,g.eq(h))):(C=null,k.each(f.filter.types,function(c,d){if(!t.filter_anyMatch||t.filter_anyMatch&&0>k.inArray(c,H))if(A=d(a[l],w,r,v,e,l,b,t,F),null!==A)return C=A,!1}),null!==C?y=C:(r=(v+s).indexOf(w),y=!t.filter_startsWith&&0<=r||t.filter_startsWith&&0===r));if(t.filter_anyMatch){if(z=y)break}else z=y?z:!1}g[h].style.display=z?"":"none";g.eq(h)[z?"removeClass":"addClass"](t.filter_filteredRow);if(n.length){if(u.pager&&u.pager.countChildRows||t.pager_countChildRows|| t.filter_childRows)n[z?"removeClass":"addClass"](t.filter_filteredRow);n.toggle(z)}}f.processTbody(b,q,!1)}u.lastCombinedFilter=c;u.lastSearch=a;u.$table.data("lastSearch",a);t.filter_saveFilters&&f.storage&&f.storage(b,"tablesorter-filters",a);u.debug&&f.benchmark("Completed filter widget search",E);u.$table.trigger("applyWidgets");u.$table.trigger("filterEnd")}},buildSelect:function(b,a,c,e){a=parseInt(a,10);var d,g,h;b=b.config;var p=b.widgetOptions,q=b.$tbodies,m=[],l=b.$headers.filter('[data-column="'+ a+'"]:last'),n='<option value="">'+(l.data("placeholder")||l.attr("data-placeholder")||"")+"</option>";for(g=0;g<q.length;g++)for(h=b.cache[g].row.length,d=0;d<h;d++)e&&b.cache[g].row[d][0].className.match(p.filter_filteredRow)||(p.filter_useParsedData?m.push(""+b.cache[g].normalized[d][a]):(l=b.cache[g].row[d][0].cells[a])&&m.push(k.trim(l.textContent||l.innerText||k(l).text())));m=k.grep(m,function(a,b){return k.inArray(a,m)===b});m=f.sortNatural?m.sort(function(a,b){return f.sortNatural(a,b)}): m.sort(!0);d=b.$table.find("thead").find('select.tablesorter-filter[data-column="'+a+'"]').val();for(e=0;e<m.length;e++)g=m[e].replace(/\"/g,"&quot;"),n+=""!==m[e]?'<option value="'+g+'"'+(d===g?' selected="selected"':"")+">"+m[e]+"</option>":"";b.$table.find("thead").find('select.tablesorter-filter[data-column="'+a+'"]')[c?"html":"append"](n)},buildDefault:function(b,a){var c,e,d=b.config,g=d.widgetOptions,h=d.columns;for(c=0;c<h;c++)e=d.$headers.filter('[data-column="'+c+'"]:last'),(e.hasClass("filter-select")|| g.filter_functions&&!0===g.filter_functions[c])&&!e.hasClass("filter-false")&&(g.filter_functions||(g.filter_functions={}),g.filter_functions[c]=!0,f.filter.buildSelect(b,c,a,e.hasClass(g.filter_onlyAvail)))},searching:function(b,a,c){if("undefined"===typeof a||!0===a||c){var e=b.config.widgetOptions;clearTimeout(e.searchTimer);e.searchTimer=setTimeout(function(){f.filter.checkFilters(b,c||a)},e.filter_liveSearch?e.filter_searchDelay:10)}else f.filter.checkFilters(b,a)}};
f.getFilters=function(b){var a= b?k(b)[0].config:{};return a&&a.widgetOptions&&!a.widgetOptions.filter_columnFilters?k(b).data("lastSearch"):a&&a.$filters?a.$filters.map(function(a,b){return k(b).find(".tablesorter-filter").val()||""}).get()||[]:!1};
f.setFilters=function(b,a,c){b=k(b);var e=b.length?b[0].config:{},e=e&&e.$filters?e.$filters.each(function(b,c){k(c).find(".tablesorter-filter").val(a[b]||"")}).trigger("change.tsfilter")||!1:!1;c&&b.trigger("search",[a,!1]);return!!e};
f.addWidget({id:"stickyHeaders",priority:60,options:{stickyHeaders:"", stickyHeaders_attachTo:null,stickyHeaders_offset:0,stickyHeaders_cloneId:"-sticky",stickyHeaders_addResizeEvent:!0,stickyHeaders_includeCaption:!0,stickyHeaders_zIndex:2},format:function(b,a,c){if(!(a.$table.hasClass("hasStickyHeaders")||0<=k.inArray("filter",a.widgets)&&!a.$table.hasClass("hasFilters"))){var e,d=a.$table,g=k(c.stickyHeaders_attachTo),h=d.children("thead:first"),p=g.length?g:k(window),q=h.children("tr").not(".sticky-false").children(),m=d.find("tfoot"),l=isNaN(c.stickyHeaders_offset)? k(c.stickyHeaders_offset):"",n=g.length?0:l.length?l.height()||0:parseInt(c.stickyHeaders_offset,10)||0,s=c.$sticky=d.clone().addClass("containsStickyHeaders").css({position:g.length?"absolute":"fixed",margin:0,top:n,left:0,visibility:"hidden",zIndex:c.stickyHeaders_zIndex?c.stickyHeaders_zIndex:2}),r=s.children("thead:first").addClass("tablesorter-stickyHeader "+c.stickyHeaders),v,w="",x=0,A="collapse"!==d.css("border-collapse")&&!/(webkit|msie)/i.test(navigator.userAgent),y=function(){n=l.length? l.height()||0:parseInt(c.stickyHeaders_offset,10)||0;x=0;A&&(x=2*parseInt(q.eq(0).css("border-left-width"),10));s.css({left:g.length?parseInt(g.css("padding-left"),10)+parseInt(g.css("margin-left"),10)+parseInt(d.css("border-left-width"),10):h.offset().left-p.scrollLeft()-x,width:d.width()});v.filter(":visible").each(function(b){b=q.filter(":visible").eq(b);var c=A&&k(this).attr("data-column")===""+parseInt(a.columns/2,10)?1:0;k(this).css({width:b.width()-x,height:b.height()}).find(".tablesorter-header-inner").width(b.find(".tablesorter-header-inner").width()- c)})};s.attr("id")&&(s[0].id+=c.stickyHeaders_cloneId);s.find("thead:gt(0), tr.sticky-false, tbody, tfoot").remove();c.stickyHeaders_includeCaption?s.find("caption").css("margin-left","-1px"):s.find("caption").remove();v=r.children().children();s.css({height:0,width:0,padding:0,margin:0,border:0});v.find(".tablesorter-resizer").remove();d.addClass("hasStickyHeaders").bind("sortEnd.tsSticky",function(){q.filter(":visible").each(function(b){e=v.filter(":visible").eq(b).attr("class",k(this).attr("class")).removeClass(f.css.processing+ " "+a.cssProcessing);a.cssIcon&&e.find("."+f.css.icon).attr("class",k(this).find("."+f.css.icon).attr("class"))})}).bind("pagerComplete.tsSticky",function(){y()});q.find(a.selectorSort).add(a.$headers.filter(a.selectorSort)).each(function(b){var c=k(this);b=r.children("tr.tablesorter-headerRow").children().eq(b).bind("mouseup",function(a){c.trigger(a,!0)});a.cancelSelection&&b.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"})});d.after(s);p.bind("scroll.tsSticky resize.tsSticky", function(a){if(d.is(":visible")){var b=d.offset(),e=c.stickyHeaders_includeCaption?0:d.find("caption").outerHeight(!0),e=(g.length?g.offset().top:p.scrollTop())+n-e,f=d.height()-(s.height()+(m.height()||0)),b=e>b.top&&e<b.top+f?"visible":"hidden",e={visibility:b};g.length?e.top=g.scrollTop():e.left=h.offset().left-p.scrollLeft()-x;s.removeClass("tablesorter-sticky-visible tablesorter-sticky-hidden").addClass("tablesorter-sticky-"+b).css(e);if(b!==w||"resize"===a.type)y(),w=b}});c.stickyHeaders_addResizeEvent&& f.addHeaderResizeEvent(b);d.hasClass("hasFilters")&&(d.bind("filterEnd",function(){k(document.activeElement).closest("thead")[0]!==r[0]&&r.find(".tablesorter-filter-row").children().each(function(b){k(this).find(".tablesorter-filter").val(a.$filters.find(".tablesorter-filter").eq(b).val())})}),f.filter.bindSearch(d,v.find(".tablesorter-filter").addClass("tablesorter-external-filter")));d.trigger("stickyHeadersInit")}},remove:function(b,a,c){a.$table.removeClass("hasStickyHeaders").unbind("sortEnd.tsSticky pagerComplete.tsSticky").find(".tablesorter-stickyHeader").remove(); c.$sticky&&c.$sticky.length&&c.$sticky.remove();k(".hasStickyHeaders").length||k(window).unbind("scroll.tsSticky resize.tsSticky");f.addHeaderResizeEvent(b,!1)}});
f.addWidget({id:"resizable",priority:40,options:{resizable:!0,resizable_addLastColumn:!1},format:function(b,a,c){if(!a.$table.hasClass("hasResizable")){a.$table.addClass("hasResizable");var e,d,g,h,p={},q=a.$table,m=0,l=null,n=null,s=20>Math.abs(q.parent().width()-q.width()),r=function(){f.storage&&l&&(p[l.index()]=l.width(),p[n.index()]= n.width(),l.width(p[l.index()]),n.width(p[n.index()]),!1!==c.resizable&&f.storage(b,"tablesorter-resizable",p));m=0;l=n=null;k(window).trigger("resize")};if(p=f.storage&&!1!==c.resizable?f.storage(b,"tablesorter-resizable"):{})for(h in p)!isNaN(h)&&h<a.$headers.length&&a.$headers.eq(h).width(p[h]);e=q.children("thead:first").children("tr");e.children().each(function(){var b;b=k(this);h=b.attr("data-column");b="false"===f.getData(b,a.headers[h],"resizable");e.children().filter('[data-column="'+h+'"]')[b? "addClass":"removeClass"]("resizable-false")});e.each(function(){g=k(this).children().not(".resizable-false");k(this).find(".tablesorter-wrapper").length||g.wrapInner('<div class="tablesorter-wrapper" style="position:relative;height:100%;width:100%"></div>');c.resizable_addLastColumn||(g=g.slice(0,-1));d=d?d.add(g):g});d.each(function(){var a=k(this),b=parseInt(a.css("padding-right"),10)+10;a.find(".tablesorter-wrapper").append('<div class="tablesorter-resizer" style="cursor:w-resize;position:absolute;z-index:1;right:-'+ b+'px;top:0;height:100%;width:20px;"></div>')}).bind("mousemove.tsresize",function(a){if(0!==m&&l){var b=a.pageX-m,c=l.width();l.width(c+b);l.width()!==c&&s&&n.width(n.width()-b);m=a.pageX}}).bind("mouseup.tsresize",function(){r()}).find(".tablesorter-resizer,.tablesorter-resizer-grip").bind("mousedown",function(b){l=k(b.target).closest("th");var c=a.$headers.filter('[data-column="'+l.attr("data-column")+'"]');1<c.length&&(l=l.add(c));n=b.shiftKey?l.parent().find("th").not(".resizable-false").filter(":last"): l.nextAll(":not(.resizable-false)").eq(0);m=b.pageX});q.find("thead:first").bind("mouseup.tsresize mouseleave.tsresize",function(){r()}).bind("contextmenu.tsresize",function(){f.resizableReset(b);var a=k.isEmptyObject?k.isEmptyObject(p):!0;p={};return a})}},remove:function(b,a){a.$table.removeClass("hasResizable").children("thead").unbind("mouseup.tsresize mouseleave.tsresize contextmenu.tsresize").children("tr").children().unbind("mousemove.tsresize mouseup.tsresize").find(".tablesorter-resizer,.tablesorter-resizer-grip").remove(); f.resizableReset(b)}});
f.resizableReset=function(b){b.config.$headers.not(".resizable-false").css("width","");f.storage&&f.storage(b,"tablesorter-resizable",{})};
f.addWidget({id:"saveSort",priority:20,options:{saveSort:!0},init:function(b,a,c,e){a.format(b,c,e,!0)},format:function(b,a,c,e){var d,g=a.$table;c=!1!==c.saveSort;var h={sortList:a.sortList};a.debug&&(d=new Date);g.hasClass("hasSaveSort")?c&&b.hasInitialized&&f.storage&&(f.storage(b,"tablesorter-savesort",h),a.debug&&f.benchmark("saveSort widget: Saving last sort: "+ a.sortList,d)):(g.addClass("hasSaveSort"),h="",f.storage&&(h=(c=f.storage(b,"tablesorter-savesort"))&&c.hasOwnProperty("sortList")&&k.isArray(c.sortList)?c.sortList:"",a.debug&&f.benchmark('saveSort: Last sort loaded: "'+h+'"',d),g.bind("saveSortReset",function(a){a.stopPropagation();f.storage(b,"tablesorter-savesort","")})),e&&h&&0<h.length?a.sortList=h:b.hasInitialized&&h&&0<h.length&&g.trigger("sorton",[h]))},remove:function(b){f.storage&&f.storage(b,"tablesorter-savesort","")}})
})(jQuery);
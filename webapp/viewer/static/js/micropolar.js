var micropolar={version:"0.2.2"},µ=micropolar;µ.Axis=function(){function t(t){r=t||r;var u=s.data,c=s.layout;return("string"==typeof r||r.nodeName)&&(r=d3.select(r)),r.datum(u).each(function(t){function r(t){return a(t)%360+c.orientation}var s=t.slice();d={data:µ.util.cloneJson(s),layout:µ.util.cloneJson(c)};var u=0;s.forEach(function(t,e){t.color||(t.color=c.defaultColorRange[u],u=(u+1)%c.defaultColorRange.length),t.strokeColor||(t.strokeColor="LinePlot"===t.geometry?t.color:d3.rgb(t.color).darker().toString()),d.data[e].color=t.color,d.data[e].strokeColor=t.strokeColor,d.data[e].strokeDash=t.strokeDash,d.data[e].strokeSize=t.strokeSize});var g=s.filter(function(t){var e=t.visible;return"undefined"==typeof e||e===!0}),f=!1,p=g.map(function(t){return f=f||"undefined"!=typeof t.groupId,t}),m=[];if(f){var y=d3.nest().key(function(t){return"undefined"!=typeof t.groupId?t.groupId:"unstacked"}).entries(p),h=y.map(function(t){if("unstacked"===t.key)return t.values;var e=t.values[0].r.map(function(){return 0});return t.values.forEach(function(t){t.yStack=[e],m.push(e),e=µ.util.sumArrays(t.r,e)}),t.values});g=d3.merge(h)}g.forEach(function(t){t.t=Array.isArray(t.t[0])?t.t:[t.t],t.r=Array.isArray(t.r[0])?t.r:[t.r]});var v=Math.min(c.width-c.margin.left-c.margin.right,c.height-c.margin.top-c.margin.bottom)/2;v=Math.max(10,v);var x,k=[c.margin.left+v,c.margin.top+v];if(f){var A=d3.max(µ.util.sumArrays(µ.util.arrayLast(g).r[0],µ.util.arrayLast(m)));x=[0,A]}else x=d3.extent(µ.util.flattenArray(g.map(function(t){return t.r})));c.radialAxis.domain!==µ.DATAEXTENT&&(x[0]=0),n=d3.scale.linear().domain(c.radialAxis.domain!==µ.DATAEXTENT&&c.radialAxis.domain?c.radialAxis.domain:x).range([0,v]),d.layout.radialAxis.domain=n.domain();var C,b=µ.util.flattenArray(g.map(function(t){return t.t})),S="string"==typeof b[0];S&&(f&&(b=µ.util.deduplicate(b)),C=b.slice(),b=d3.range(b.length),g=g.map(function(t){var e=t;return t.t=[b],f&&(e.yStack=t.yStack),e}));var w=g.filter(function(t){return"LinePlot"===t.geometry||"DotPlot"===t.geometry}).length===g.length,P=null===c.needsEndSpacing?S||!w:c.needsEndSpacing,E=c.angularAxis.domain&&c.angularAxis.domain!==µ.DATAEXTENT&&!S&&c.angularAxis.domain[0]>=0,L=E?c.angularAxis.domain:d3.extent(b),T=Math.abs(b[1]-b[0]);w&&!S&&(T=0);var M=L.slice();P&&S&&(M[1]+=T);var z=c.angularAxis.ticksCount||4;z>8&&(z=z/(z/8)+z%8),c.angularAxis.ticksStep&&(z=(M[1]-M[0])/z);var O=c.angularAxis.ticksStep||(M[1]-M[0])/(z*(c.minorTicks+1));C&&(O=Math.max(Math.round(O),1)),M[2]||(M[2]=O);var I=d3.range.apply(this,M);if(I=I.map(function(t){return parseFloat(t.toPrecision(12))}),a=d3.scale.linear().domain(M.slice(0,2)).range("clockwise"===c.direction?[0,360]:[360,0]),d.layout.angularAxis.domain=a.domain(),d.layout.angularAxis.endPadding=P?T:0,e=d3.select(this).select("svg.chart-root"),"undefined"==typeof e||e.empty()){var D='<svg xmlns="http://www.w3.org/2000/svg" class="chart-root"><g class="outer-group"><g class="chart-group"><circle class="background-circle"></circle><g class="geometry-group"></g><g class="radial axis-group"><circle class="outside-circle"></circle></g><g class="angular axis-group"></g><g class="guides-group"><line></line><circle r="0"></circle></g></g><g class="legend-group"></g><g class="tooltips-group"></g><g class="title-group"><text></text></g></g></svg>',B=(new DOMParser).parseFromString(D,"application/xml"),V=this.appendChild(this.ownerDocument.importNode(B.documentElement,!0));e=d3.select(V)}e.select(".guides-group").style({"pointer-events":"none"}),e.select(".angular.axis-group").style({"pointer-events":"none"}),e.select(".radial.axis-group").style({"pointer-events":"none"});var N,R,q=e.select(".chart-group"),j={fill:"none",stroke:c.tickColor},J={"font-size":c.font.size,"font-family":c.font.family,fill:c.font.color,"text-shadow":["-1px 0px","1px -1px","-1px 1px","1px 1px"].map(function(t){return" "+t+" 0 "+c.font.outlineColor}).join(",")};if(c.showLegend){N=e.select(".legend-group").attr({transform:"translate("+[v,c.margin.top]+")"}).style({display:"block"});var W=g.map(function(t){var e=µ.util.cloneJson(t);return e.symbol="DotPlot"===t.geometry?t.dotType||"circle":"LinePlot"!==t.geometry?"square":"line",e.visibleInLegend="undefined"==typeof t.visibleInLegend||t.visibleInLegend,e.color="LinePlot"===t.geometry?t.strokeColor:t.color,e}),F=µ.util.deepExtend({},µ.Legend.defaultConfig().legendConfig),X=µ.util.deepExtend(F,{container:N,elements:W,reverseOrder:c.legend.reverseOrder}),_={data:g.map(function(t,e){return t.name||"Element"+e}),legendConfig:X};µ.Legend().config(_)(),R=N.node().getBBox(),v=Math.min(c.width-R.width-c.margin.left-c.margin.right,c.height-c.margin.top-c.margin.bottom)/2,v=Math.max(10,v),k=[c.margin.left+v,c.margin.top+v],n.range([0,v]),d.layout.radialAxis.domain=n.domain(),N.attr("transform","translate("+[k[0]+v,k[1]-v]+")")}else N=e.select(".legend-group").style({display:"none"});e.attr({width:c.width,height:c.height}).style({opacity:c.opacity}),q.attr("transform","translate("+k+")").style({cursor:"crosshair"});var Z=[(c.width-(c.margin.left+c.margin.right+2*v+(R?R.width:0)))/2,(c.height-(c.margin.top+c.margin.bottom+2*v))/2];if(Z[0]=Math.max(0,Z[0]),Z[1]=Math.max(0,Z[1]),e.select(".outer-group").attr("transform","translate("+Z+")"),c.title){var K=e.select("g.title-group text").style(J).text(c.title),G=K.node().getBBox();K.attr({x:k[0]-G.width/2,y:k[1]-v-20})}var H=e.select(".radial.axis-group");if(c.radialAxis.gridLinesVisible){var Q=H.selectAll("circle.grid-circle").data(n.ticks(5));Q.enter().append("circle").attr({"class":"grid-circle"}).style(j),Q.attr("r",n),Q.exit().remove()}H.select("circle.outside-circle").attr({r:v}).style(j);var U=e.select("circle.background-circle").attr({r:v}).style({fill:c.backgroundColor,stroke:c.stroke});if(c.radialAxis.visible){var Y=d3.svg.axis().scale(n).ticks(5).tickSize(5);H.call(Y).attr({transform:"rotate("+c.radialAxis.orientation+")"}),H.selectAll(".domain").style(j),H.selectAll("g>text").text(function(){return this.textContent+c.radialAxis.ticksSuffix}).style(J).style({"text-anchor":"start"}).attr({x:0,y:0,dx:0,dy:0,transform:function(){return"horizontal"===c.radialAxis.tickOrientation?"rotate("+-c.radialAxis.orientation+") translate("+[0,J["font-size"]]+")":"translate("+[0,J["font-size"]]+")"}}),H.selectAll("g>line").style({stroke:"black"})}var $=e.select(".angular.axis-group").selectAll("g.angular-tick").data(I),te=$.enter().append("g").classed("angular-tick",!0);$.attr({transform:function(t,e){return"rotate("+r(t,e)+")"}}).style({display:c.angularAxis.visible?"block":"none"}),$.exit().remove(),te.append("line").classed("grid-line",!0).classed("major",function(t,e){return e%(c.minorTicks+1)===0}).classed("minor",function(t,e){return e%(c.minorTicks+1)!==0}).style(j),te.selectAll(".minor").style({stroke:c.minorTickColor}),$.select("line.grid-line").attr({x1:c.tickLength?v-c.tickLength:0,x2:v}).style({display:c.angularAxis.gridLinesVisible?"block":"none"}),te.append("text").classed("axis-text",!0).style(J);var ee=$.select("text.axis-text").attr({x:v+c.labelOffset,dy:".35em",transform:function(t,e){var n=r(t,e),a=v+c.labelOffset,i=c.angularAxis.tickOrientation;return"horizontal"===i?"rotate("+-n+" "+a+" 0)":"radial"===i?270>n&&n>90?"rotate(180 "+a+" 0)":null:"rotate("+(180>=n&&n>0?-90:90)+" "+a+" 0)"}}).style({"text-anchor":"middle",display:c.angularAxis.labelsVisible?"block":"none"}).text(function(t,e){return e%(c.minorTicks+1)!==0?"":C?C[t]+c.angularAxis.ticksSuffix:t+c.angularAxis.ticksSuffix}).style(J);c.angularAxis.rewriteTicks&&ee.text(function(t,e){return e%(c.minorTicks+1)!==0?"":c.angularAxis.rewriteTicks(this.textContent,e)});var re=d3.max(q.selectAll(".angular-tick text")[0].map(function(t){return t.getCTM().e+t.getBBox().width}));N.attr({transform:"translate("+[v+re,c.margin.top]+")"});var ne=e.select("g.geometry-group").selectAll("g").size()>0,ae=e.select("g.geometry-group").selectAll("g.geometry").data(g);if(ae.enter().append("g").attr({"class":function(t,e){return"geometry geometry"+e}}),ae.exit().remove(),g[0]||ne){var ie=[];g.forEach(function(t,e){var r={};r.radialScale=n,r.angularScale=a,r.container=ae.filter(function(t,r){return r===e}),r.geometry=t.geometry,r.orientation=c.orientation,r.direction=c.direction,r.index=e,ie.push({data:t,geometryConfig:r})});var oe=d3.nest().key(function(t){return"undefined"!=typeof t.data.groupId||"unstacked"}).entries(ie),le=[];oe.forEach(function(t){"unstacked"===t.key?le=le.concat(t.values.map(function(t){return[t]})):le.push(t.values)}),le.forEach(function(t){var e;e=Array.isArray(t)?t[0].geometryConfig.geometry:t.geometryConfig.geometry;var r=t.map(function(t){return µ.util.deepExtend(µ[e].defaultConfig(),t)});µ[e]().config(r)()})}var se=e.select(".guides-group"),ue=e.select(".tooltips-group");i=i||µ.tooltipPanel().config({container:ue,fontSize:8})(),o=o||µ.tooltipPanel().config({container:ue,fontSize:8})(),l=l||µ.tooltipPanel().config({container:ue,fontSize:8})();var de,ce;if(!S){var ge=se.select("line").attr({x1:0,y1:0,y2:0}).style({stroke:"grey","pointer-events":"none"});q.on("mousemove.angular-guide",function(){var t=µ.util.getMousePos(U).angle;ge.attr({x2:-v,transform:"rotate("+t+")"}).style({opacity:.5});var e=(t+180+360-c.orientation)%360;de=a.invert(e);var r=µ.util.convertToCartesian(v+12,t+180);i.text(µ.util.round(de)).move([r[0]+k[0],r[1]+k[1]])}).on("mouseout.angular-guide",function(){se.select("line").style({opacity:0})})}if(c.radialAxis.visible!==!1){var fe=se.select("circle").style({stroke:"grey",fill:"none"});q.on("mousemove.radial-guide",function(){var t=µ.util.getMousePos(U).radius;fe.attr({r:t}).style({opacity:.5}),ce=n.invert(µ.util.getMousePos(U).radius);var e=µ.util.convertToCartesian(t,c.radialAxis.orientation);o.text(µ.util.round(ce)).move([e[0]+k[0],e[1]+k[1]])}).on("mouseout.radial-guide",function(){fe.style({opacity:0}),l.hide(),i.hide(),o.hide()})}e.selectAll(".geometry-group .mark").on("mouseover.tooltip",function(t){var r=d3.select(this),n=r.style("fill"),a="black",i=r.style("opacity")||1;if(r.attr({"data-opacity":i}),"none"!==n){r.attr({"data-fill":n}),a=d3.hsl(n).darker().toString(),r.style({fill:a,opacity:1});var o={t:µ.util.round(t[0]),r:µ.util.round(t[1])};S&&(o.t=C[t[0]]);var s="t: "+o.t+", r: "+o.r,u=this.getBoundingClientRect(),d=e.node().getBoundingClientRect(),c=[u.left+u.width/2-Z[0]-d.left,u.top+u.height/2-Z[1]-d.top];l.config({color:a}).text(s),l.move(c)}else n=r.style("stroke"),r.attr({"data-stroke":n}),a=d3.hsl(n).darker().toString(),r.style({stroke:a,opacity:1})}).on("mousemove.tooltip",function(){return 0!==d3.event.which?!1:void(d3.select(this).attr("data-fill")&&l.show())}).on("mouseout.tooltip",function(){l.hide();var t=d3.select(this),e=t.attr("data-fill");t.style(e?{fill:e,opacity:t.attr("data-opacity")}:{stroke:t.attr("data-stroke"),opacity:t.attr("data-opacity")})})}),g}var e,r,n,a,i,o,l,s={data:[],layout:{}},u={},d={},c=d3.dispatch("hover"),g={};return g.render=function(e){return t(e),this},g.config=function(t){if(!arguments.length)return s;var e=µ.util.cloneJson(t);return e.data.forEach(function(t,e){s.data[e]||(s.data[e]={}),µ.util.deepExtend(s.data[e],µ.Axis.defaultConfig().data[0]),µ.util.deepExtend(s.data[e],t)}),µ.util.deepExtend(s.layout,µ.Axis.defaultConfig().layout),µ.util.deepExtend(s.layout,e.layout),this},g.getLiveConfig=function(){return d},g.getinputConfig=function(){return u},g.radialScale=function(){return n},g.angularScale=function(){return a},g.svg=function(){return e},d3.rebind(g,c,"on"),g},µ.Axis.defaultConfig=function(){var t={data:[{t:[1,2,3,4],r:[10,11,12,13],name:"Line1",geometry:"LinePlot",color:null,strokeDash:"solid",strokeColor:null,strokeSize:"1",visibleInLegend:!0,opacity:1}],layout:{defaultColorRange:d3.scale.category10().range(),title:null,height:450,width:500,margin:{top:40,right:40,bottom:40,left:40},font:{size:12,color:"gray",outlineColor:"white",family:"Tahoma, sans-serif"},direction:"clockwise",orientation:0,labelOffset:10,radialAxis:{domain:null,orientation:-45,ticksSuffix:"",visible:!0,gridLinesVisible:!0,tickOrientation:"horizontal",rewriteTicks:null},angularAxis:{domain:[0,360],ticksSuffix:"",visible:!0,gridLinesVisible:!0,labelsVisible:!0,tickOrientation:"horizontal",rewriteTicks:null,ticksCount:null,ticksStep:null},minorTicks:0,tickLength:null,tickColor:"silver",minorTickColor:"#eee",backgroundColor:"none",needsEndSpacing:null,showLegend:!0,legend:{reverseOrder:!1},opacity:1}};return t},µ.util={},µ.DATAEXTENT="dataExtent",µ.AREA="AreaChart",µ.LINE="LinePlot",µ.DOT="DotPlot",µ.BAR="BarChart",µ.PIE="PieChart",µ.util._override=function(t,e){for(var r in t)r in e&&(e[r]=t[r])},µ.util._extend=function(t,e){for(var r in t)e[r]=t[r]},µ.util._rndSnd=function(){return 2*Math.random()-1+(2*Math.random()-1)+(2*Math.random()-1)},µ.util.dataFromEquation2=function(t,e){var r=e||6,n=d3.range(0,360+r,r).map(function(e){var r=e*Math.PI/180,n=t(r);return[e,n]});return n},µ.util.dataFromEquation=function(t,e,r){var n=e||6,a=[],i=[];d3.range(0,360+n,n).forEach(function(e){var r=e*Math.PI/180,n=t(r);a.push(e),i.push(n)});var o={t:a,r:i};return r&&(o.name=r),o},µ.util.ensureArray=function(t,e){if("undefined"==typeof t)return null;var r=[].concat(t);return d3.range(e).map(function(t,e){return r[e]||r[0]})},µ.util.fillArrays=function(t,e,r){return e.forEach(function(e){t[e]=µ.util.ensureArray(t[e],r)}),t},µ.util.cloneJson=function(t){return JSON.parse(JSON.stringify(t))},µ.util.deepExtend=function(t,e){for(var r in e)e[r]&&e[r].constructor&&e[r].constructor===Object?(t[r]=t[r]||{},arguments.callee(t[r],e[r])):t[r]=e[r];return t},µ.util.validateKeys=function(t,e){"string"==typeof e&&(e=e.split("."));var r=e.shift();return t[r]&&(!e.length||objHasKeys(t[r],e))},µ.util.sumArrays=function(t,e){return d3.zip(t,e).map(function(t){return d3.sum(t)})},µ.util.arrayLast=function(t){return t[t.length-1]},µ.util.arrayEqual=function(t,e){for(var r=Math.max(t.length,e.length,1);r-->=0&&t[r]===e[r];);return-2===r},µ.util.flattenArray=function(t){for(var e=[];!µ.util.arrayEqual(e,t);)e=t,t=[].concat.apply([],t);return t},µ.util.deduplicate=function(t){return t.filter(function(t,e,r){return r.indexOf(t)===e})},µ.util.convertToCartesian=function(t,e){var r=e*Math.PI/180,n=t*Math.cos(r),a=t*Math.sin(r);return[n,a]},µ.util.round=function(t,e){var r=e||2,n=Math.pow(10,r);return Math.round(t*n)/n},µ.util.getMousePos=function(t){var e=d3.mouse(t.node()),r=e[0],n=e[1],a={};return a.x=r,a.y=n,a.pos=e,a.angle=180*(Math.atan2(n,r)+Math.PI)/Math.PI,a.radius=Math.sqrt(r*r+n*n),a},µ.util.duplicatesCount=function(t){for(var e,r={},n={},a=0,i=t.length;i>a;a++)e=t[a],e in r?(r[e]++,n[e]=r[e]):r[e]=1;return n},µ.util.duplicates=function(t){return Object.keys(µ.util.duplicatesCount(t))},µ.util.translator=function(t,e,r,n){if(n){var a=r.slice();r=e,e=a}var i=e.reduce(function(t,e){return"undefined"!=typeof t?t[e]:void 0},t);"undefined"!=typeof i&&(e.reduce(function(t,r,n){return"undefined"!=typeof t?(n===e.length-1&&delete t[r],t[r]):void 0},t),r.reduce(function(t,e,n){return"undefined"==typeof t[e]&&(t[e]={}),n===r.length-1&&(t[e]=i),t[e]},t))},µ.PolyChart=function(){function t(){var t=r[0].geometryConfig,e=t.container;"string"==typeof e&&(e=d3.select(e)),e.datum(r).each(function(e){function r(e){var r=t.radialScale(e[1]),n=(t.angularScale(e[0])+t.orientation)*Math.PI/180;return{r:r,t:n}}function n(t){var e=t.r*Math.cos(t.t),r=t.r*Math.sin(t.t);return{x:e,y:r}}var i=!!e[0].data.yStack,o=e.map(function(t){return i?d3.zip(t.data.t[0],t.data.r[0],t.data.yStack[0]):d3.zip(t.data.t[0],t.data.r[0])}),l=t.angularScale,s=t.radialScale.domain()[0],u={};u.bar=function(r,n,a){var i=e[a].data,o=t.radialScale(r[1])-t.radialScale(0),s=t.radialScale(r[2]||0),u=i.barWidth;d3.select(this).attr({"class":"mark bar",d:"M"+[[o+s,-u/2],[o+s,u/2],[s,u/2],[s,-u/2]].join("L")+"Z",transform:function(e){return"rotate("+(t.orientation+l(e[0]))+")"}})},u.dot=function(t,a,i){var o=t[2]?[t[0],t[1]+t[2]]:t,l=d3.svg.symbol().size(e[i].data.dotSize).type(e[i].data.dotType)(t,a);d3.select(this).attr({"class":"mark dot",d:l,transform:function(){var t=n(r(o));return"translate("+[t.x,t.y]+")"}})};var d=d3.svg.line.radial().interpolate(e[0].data.lineInterpolation).radius(function(e){return t.radialScale(e[1])}).angle(function(e){return t.angularScale(e[0])*Math.PI/180});u.line=function(r,n,a){var i=r[2]?o[a].map(function(t){return[t[0],t[1]+t[2]]}):o[a];if(d3.select(this).each(u.dot).style({opacity:function(){return+e[a].data.dotVisible},fill:h.stroke(r,n,a)}).attr({"class":"mark dot"}),!(n>0)){var l=d3.select(this.parentNode).selectAll("path.line").data([0]);l.enter().insert("path"),l.attr({"class":"line",d:d(i),transform:function(){return"rotate("+(t.orientation+90)+")"},"pointer-events":"none"}).style({fill:function(){return h.fill(r,n,a)},"fill-opacity":0,stroke:function(){return h.stroke(r,n,a)},"stroke-width":function(){return h["stroke-width"](r,n,a)},"stroke-dasharray":function(){return h["stroke-dasharray"](r,n,a)},opacity:function(){return h.opacity(r,n,a)},display:function(){return h.display(r,n,a)}})}};var c=t.angularScale.range(),g=Math.abs(c[1]-c[0])/o[0].length*Math.PI/180,f=d3.svg.arc().startAngle(function(){return-g/2}).endAngle(function(){return g/2}).innerRadius(function(e){return t.radialScale(s+(e[2]||0))}).outerRadius(function(e){return t.radialScale(s+(e[2]||0))+t.radialScale(e[1])});u.arc=function(){d3.select(this).attr({"class":"mark arc",d:f,transform:function(e){return"rotate("+(t.orientation+l(e[0])+90)+")"}})};var p=d3.svg.arc().outerRadius(t.radialScale.range()[1]),m=d3.layout.pie().value(function(t){return t[1]}),y=m(o[0]);u.pie=function(t,e){d3.select(this).attr({"class":"mark arc",d:p(y[e],e)})};var h={fill:function(t,r,n){return e[n].data.color},stroke:function(t,r,n){return e[n].data.strokeColor},"stroke-width":function(t,r,n){return e[n].data.strokeSize+"px"},"stroke-dasharray":function(t,r,n){return a[e[n].data.strokeDash]},opacity:function(t,r,n){return e[n].data.opacity},display:function(t,r,n){return"undefined"==typeof e[n].data.visible||e[n].data.visible?"block":"none"}},v=d3.select(this).selectAll("g.layer").data(o);v.enter().append("g").attr({"class":"layer"});var x=v.selectAll("path.mark").data(function(t){return t});x.enter().append("path").attr({"class":"mark"}),x.style(h).each(u[t.geometryType]),x.exit().remove(),v.exit().remove()})}var e,r=[µ.PolyChart.defaultConfig()],n=d3.dispatch("hover"),a={solid:"none",dash:[5,2],dot:[2,5]};return t.config=function(t){return arguments.length?(t.forEach(function(t,e){r[e]||(r[e]={}),µ.util.deepExtend(r[e],µ.PolyChart.defaultConfig()),µ.util.deepExtend(r[e],t)}),this):r},t.getColorScale=function(){return e},d3.rebind(t,n,"on"),t},µ.PolyChart.defaultConfig=function(){var t={data:{name:"geom1",t:[[1,2,3,4]],r:[[1,2,3,4]],dotType:"circle",dotSize:64,dotVisible:!1,barWidth:20,color:"#ffa500",strokeSize:1,strokeColor:"silver",strokeDash:"solid",opacity:1,index:0,visible:!0,visibleInLegend:!0},geometryConfig:{geometry:"LinePlot",geometryType:"arc",direction:"clockwise",orientation:0,container:"body",radialScale:null,angularScale:null,colorScale:d3.scale.category20()}};return t},µ.BarChart=function(){return µ.PolyChart()},µ.BarChart.defaultConfig=function(){var t={geometryConfig:{geometryType:"bar"}};return t},µ.AreaChart=function(){return µ.PolyChart()},µ.AreaChart.defaultConfig=function(){var t={geometryConfig:{geometryType:"arc"}};return t},µ.DotPlot=function(){return µ.PolyChart()},µ.DotPlot.defaultConfig=function(){var t={geometryConfig:{geometryType:"dot",dotType:"circle"}};return t},µ.LinePlot=function(){return µ.PolyChart()},µ.LinePlot.defaultConfig=function(){var t={geometryConfig:{geometryType:"line"}};return t},µ.PieChart=function(){return µ.PolyChart()},µ.PieChart.defaultConfig=function(){var t={geometryConfig:{geometryType:"pie"}};return t},µ.Legend=function(){function t(){var r=e.legendConfig,n=e.data.map(function(t,e){return[].concat(t).map(function(t,n){var a=µ.util.deepExtend({},r.elements[e]);return a.name=t,a.color=[].concat(r.elements[e].color)[n],a})}),a=d3.merge(n);a=a.filter(function(t,e){return r.elements[e]&&(r.elements[e].visibleInLegend||"undefined"==typeof r.elements[e].visibleInLegend)}),r.reverseOrder&&(a=a.reverse());var i=r.container;("string"==typeof i||i.nodeName)&&(i=d3.select(i));var o=a.map(function(t){return t.color}),l=r.fontSize,s=null===r.isContinuous?"number"==typeof a[0]:r.isContinuous,u=s?r.height:l*a.length,d=i.classed("legend-group",!0),c=d.selectAll("svg").data([0]),g=c.enter().append("svg").attr({width:300,height:u+l,xmlns:"http://www.w3.org/2000/svg","xmlns:xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1"});g.append("g").classed("legend-axis",!0),g.append("g").classed("legend-marks",!0);var f=d3.range(a.length),p=d3.scale[s?"linear":"ordinal"]().domain(f).range(o),m=d3.scale[s?"linear":"ordinal"]().domain(f)[s?"range":"rangePoints"]([0,u]),y=function(t,e){var r=3*e;return"line"===t?"M"+[[-e/2,-e/12],[e/2,-e/12],[e/2,e/12],[-e/2,e/12]]+"Z":-1!==d3.svg.symbolTypes.indexOf(t)?d3.svg.symbol().type(t).size(r)():d3.svg.symbol().type("square").size(r)()};if(s){var h=c.select(".legend-marks").append("defs").append("linearGradient").attr({id:"grad1",x1:"0%",y1:"0%",x2:"0%",y2:"100%"}).selectAll("stop").data(o);h.enter().append("stop"),h.attr({offset:function(t,e){return e/(o.length-1)*100+"%"}}).style({"stop-color":function(t){return t}}),c.append("rect").classed("legend-mark",!0).attr({height:r.height,width:r.colorBandWidth,fill:"url(#grad1)"})}else{var v=c.select(".legend-marks").selectAll("path.legend-mark").data(a);v.enter().append("path").classed("legend-mark",!0),v.attr({transform:function(t,e){return"translate("+[l/2,m(e)+l/2]+")"},d:function(t){var e=t.symbol;return y(e,l)},fill:function(t,e){return p(e)}}),v.exit().remove()}var x=d3.svg.axis().scale(m).orient("right"),k=c.select("g.legend-axis").attr({transform:"translate("+[s?r.colorBandWidth:l,l/2]+")"}).call(x);return k.selectAll(".domain").style({fill:"none",stroke:"none"}),k.selectAll("line").style({fill:"none",stroke:s?r.textColor:"none"}),k.selectAll("text").style({fill:r.textColor,"font-size":r.fontSize}).text(function(t,e){return a[e].name}),t}var e=µ.Legend.defaultConfig(),r=d3.dispatch("hover");return t.config=function(t){return arguments.length?(µ.util.deepExtend(e,t),this):e},d3.rebind(t,r,"on"),t},µ.Legend.defaultConfig=function(){var t={data:["a","b","c"],legendConfig:{elements:[{symbol:"line",color:"red"},{symbol:"square",color:"yellow"},{symbol:"diamond",color:"limegreen"}],height:150,colorBandWidth:30,fontSize:12,container:"body",isContinuous:null,textColor:"grey",reverseOrder:!1}};return t},µ.tooltipPanel=function(){var t,e,r,n={container:null,hasTick:!1,fontSize:12,color:"white",padding:5},a="tooltip-"+µ.tooltipPanel.uid++,i=10,o=function(){t=n.container.selectAll("g."+a).data([0]);var l=t.enter().append("g").classed(a,!0).style({"pointer-events":"none",display:"none"});return r=l.append("path").style({fill:"white","fill-opacity":.9}).attr({d:"M0 0"}),e=l.append("text").attr({dx:n.padding+i,dy:.3*+n.fontSize}),o};return o.text=function(a){var l=d3.hsl(n.color).l,s=l>=.5?"#aaa":"white",u=l>=.5?"black":"white",d=a||"";e.style({fill:u,"font-size":n.fontSize+"px"}).text(d);var c=n.padding,g=e.node().getBBox(),f={fill:n.color,stroke:s,"stroke-width":"2px"},p=g.width+2*c+i,m=g.height+2*c;return r.attr({d:"M"+[[i,-m/2],[i,-m/4],[n.hasTick?0:i,0],[i,m/4],[i,m/2],[p,m/2],[p,-m/2]].join("L")+"Z"}).style(f),t.attr({transform:"translate("+[i,-m/2+2*c]+")"}),t.style({display:"block"}),o},o.move=function(e){return t?(t.attr({transform:"translate("+[e[0],e[1]]+")"}).style({display:"block"}),o):void 0},o.hide=function(){return t?(t.style({display:"none"}),o):void 0},o.show=function(){return t?(t.style({display:"block"}),o):void 0},o.config=function(t){return µ.util.deepExtend(n,t),o},o},µ.tooltipPanel.uid=1,µ.adapter={},µ.adapter.plotly=function(){var t={};return t.convert=function(t,e){var r={};if(t.data&&(r.data=t.data.map(function(t){var r=µ.util.deepExtend({},t),n=[[r,["marker","color"],["color"]],[r,["marker","opacity"],["opacity"]],[r,["marker","line","color"],["strokeColor"]],[r,["marker","line","dash"],["strokeDash"]],[r,["marker","line","width"],["strokeSize"]],[r,["marker","symbol"],["dotType"]],[r,["marker","size"],["dotSize"]],[r,["marker","barWidth"],["barWidth"]],[r,["line","interpolation"],["lineInterpolation"]],[r,["showlegend"],["visibleInLegend"]]];return n.forEach(function(t){µ.util.translator.apply(null,t.concat(e))}),e||delete r.marker,e&&delete r.groupId,e?("LinePlot"===r.geometry?(r.type="scatter",r.dotVisible===!0?(delete r.dotVisible,r.mode="lines+markers"):r.mode="lines"):"DotPlot"===r.geometry?(r.type="scatter",r.mode="markers"):"AreaChart"===r.geometry?r.type="area":"BarChart"===r.geometry&&(r.type="bar"),delete r.geometry):("scatter"===r.type?"lines"===r.mode?r.geometry="LinePlot":"markers"===r.mode?r.geometry="DotPlot":"lines+markers"===r.mode&&(r.geometry="LinePlot",r.dotVisible=!0):"area"===r.type?r.geometry="AreaChart":"bar"===r.type&&(r.geometry="BarChart"),delete r.mode,delete r.type),r}),!e&&t.layout&&"stack"===t.layout.barmode)){var n=µ.util.duplicates(r.data.map(function(t){return t.geometry}));r.data.forEach(function(t,e){var a=n.indexOf(t.geometry);-1!==a&&(r.data[e].groupId=a)})}if(t.layout){var a=µ.util.deepExtend({},t.layout),i=[[a,["plot_bgcolor"],["backgroundColor"]],[a,["showlegend"],["showLegend"]],[a,["radialaxis"],["radialAxis"]],[a,["angularaxis"],["angularAxis"]],[a.angularaxis,["showline"],["gridLinesVisible"]],[a.angularaxis,["showticklabels"],["labelsVisible"]],[a.angularaxis,["nticks"],["ticksCount"]],[a.angularaxis,["tickorientation"],["tickOrientation"]],[a.angularaxis,["ticksuffix"],["ticksSuffix"]],[a.angularaxis,["range"],["domain"]],[a.angularaxis,["endpadding"],["endPadding"]],[a.radialaxis,["showline"],["gridLinesVisible"]],[a.radialaxis,["tickorientation"],["tickOrientation"]],[a.radialaxis,["ticksuffix"],["ticksSuffix"]],[a.radialaxis,["range"],["domain"]],[a.angularAxis,["showline"],["gridLinesVisible"]],[a.angularAxis,["showticklabels"],["labelsVisible"]],[a.angularAxis,["nticks"],["ticksCount"]],[a.angularAxis,["tickorientation"],["tickOrientation"]],[a.angularAxis,["ticksuffix"],["ticksSuffix"]],[a.angularAxis,["range"],["domain"]],[a.angularAxis,["endpadding"],["endPadding"]],[a.radialAxis,["showline"],["gridLinesVisible"]],[a.radialAxis,["tickorientation"],["tickOrientation"]],[a.radialAxis,["ticksuffix"],["ticksSuffix"]],[a.radialAxis,["range"],["domain"]],[a.font,["outlinecolor"],["outlineColor"]],[a.legend,["traceorder"],["reverseOrder"]],[a,["labeloffset"],["labelOffset"]],[a,["defaultcolorrange"],["defaultColorRange"]]];if(i.forEach(function(t){µ.util.translator.apply(null,t.concat(e))}),e?("undefined"!=typeof a.tickLength&&(a.angularaxis.ticklen=a.tickLength,delete a.tickLength),a.tickColor&&(a.angularaxis.tickcolor=a.tickColor,delete a.tickColor)):(a.angularAxis&&"undefined"!=typeof a.angularAxis.ticklen&&(a.tickLength=a.angularAxis.ticklen),a.angularAxis&&"undefined"!=typeof a.angularAxis.tickcolor&&(a.tickColor=a.angularAxis.tickcolor)),a.legend&&"boolean"!=typeof a.legend.reverseOrder&&(a.legend.reverseOrder="normal"!==a.legend.reverseOrder),a.legend&&"boolean"==typeof a.legend.traceorder&&(a.legend.traceorder=a.legend.traceorder?"reversed":"normal",delete a.legend.reverseOrder),a.margin&&"undefined"!=typeof a.margin.t){var o=["t","r","b","l","pad"],l=["top","right","bottom","left","pad"],s={};d3.entries(a.margin).forEach(function(t){s[l[o.indexOf(t.key)]]=t.value}),a.margin=s}e&&(delete a.needsEndSpacing,delete a.minorTickColor,delete a.minorTicks,a.angularaxis&&(delete a.angularaxis.ticksCount,delete a.angularaxis.ticksCount,delete a.angularaxis.ticksStep,delete a.angularaxis.rewriteTicks,delete a.angularaxis.nticks),a.radialaxis&&(delete a.radialaxis.ticksCount,delete a.radialaxis.ticksCount,delete a.radialaxis.ticksStep,delete a.radialaxis.rewriteTicks,delete a.radialaxis.nticks)),r.layout=a}return r},t};
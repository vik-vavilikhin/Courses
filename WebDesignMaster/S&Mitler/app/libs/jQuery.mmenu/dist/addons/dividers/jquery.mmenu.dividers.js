!function(i){var e,t,d="dividers";i.mmenu.addons.dividers={setup:function(){var n=this,s=this.opts.dividers;this.conf.dividers;if(i.mmenu.glbl,"boolean"==typeof s&&(s={add:s,fixed:s}),"object"!=typeof s&&(s={}),(s=this.opts.dividers=i.extend(!0,{},i.mmenu.defaults.dividers,s)).type&&this.bind("initMenu:after",function(){this.$menu.addClass(e.menu+"_"+d+"-"+s.type)}),s.add&&this.bind("initListview:after",function(t){var d;switch(s.addTo){case"panels":d=t;break;default:d=t.filter(s.addTo)}d.length&&(d.children("."+e.listitem+"_divider").remove(),d.find("."+e.listview).each(function(){var t="";n.__filterListItems(i(this).children()).each(function(){var d=i.trim(i(this).children("a, span").text()).slice(0,1).toLowerCase();d!=t&&d.length&&(t=d,i('<li class="'+e.listitem+" "+e.listitem+'_divider">'+d+"</li>").insertBefore(this))})}))}),s.fixed){this.bind("initPanels:before",function(){void 0===this.$fixeddivider&&(this.$fixeddivider=i('<ul class="'+e.listview+" "+e.listview+'_fixeddivider"><li class="'+e.listitem+" "+e.listitem+'_divider"></li></ul>').appendTo(this.$pnls).children())});var l=function(t){if(!(t=t||this.$pnls.children("."+e.panel+"_opened")).is(":hidden")){var d=t.find("."+e.listitem+"_divider").not("."+e.hidden),n=t.scrollTop()||0,s="";d.each(function(){i(this).position().top+n<n+1&&(s=i(this).text())}),this.$fixeddivider.text(s),this.$pnls[s.length?"addClass":"removeClass"](e.panel+"_dividers")}};this.bind("open:start",l),this.bind("openPanel:start",l),this.bind("updateListview",l),this.bind("initPanel:after",function(i){i.off(t.scroll+"-"+d+" "+t.touchmove+"-"+d).on(t.scroll+"-"+d+" "+t.touchmove+"-"+d,function(t){i.hasClass(e.panel+"_opened")&&l.call(n,i)})})}},add:function(){e=i.mmenu._c,i.mmenu._d,(t=i.mmenu._e).add("scroll")},clickAnchor:function(i,e){}},i.mmenu.defaults.dividers={add:!1,addTo:"panels",fixed:!1,type:null}}(jQuery);
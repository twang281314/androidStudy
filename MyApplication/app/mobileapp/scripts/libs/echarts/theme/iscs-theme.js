 /**
  * 网仓自定义echarts主题 
  */
 (function(root, factory) {
     if (typeof define === 'function' && define.amd) {
         // AMD. Register as an anonymous module.
         define(['exports', 'echarts'], factory);
     } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
         // CommonJS
         factory(exports, require('echarts'));
     } else {
         // Browser globals
         factory({}, root.echarts);
     }
 }(this, function(exports, echarts) {
     var log = function(msg) {
         if (typeof console !== 'undefined') {
             console && console.error && console.error(msg);
         }
     };
     if (!echarts) {
         log('ECharts is not Loaded');
         return;
     }
     echarts.registerTheme('iscs', {
         "color": [
             "#0f669e",
             "#1e25ac",
             "#07ac5c",
             "#f78e09",
             "#4297cf"
         ],
         "backgroundColor": "rgba(0, 0, 0, 0)",
         "textStyle": {},
         "title": {
             "textStyle": {
                 "color": "#333"
             },
             "subtextStyle": {
                 "color": "#ffffff"
             }
         },
         "line": {
             "itemStyle": {
                 "normal": {
                     "borderWidth": "1"
                 }
             },
             "lineStyle": {
                 "normal": {
                     "width": "1"
                 }
             },
             "symbolSize": "4",
             "symbol": "emptyCircle",
             //  "smooth": true
         },

         "bar": {
             "itemStyle": {
                 "normal": {
                     "barBorderWidth": 0,
                     "barBorderColor": "#ccc"
                 },
                 "emphasis": {
                     "barBorderWidth": 0,
                     "barBorderColor": "#ccc"
                 }
             }
         },
         "pie": {
             "itemStyle": {
                 "normal": {
                     "borderWidth": 0,
                     "borderColor": "#ccc"
                 },
                 "emphasis": {
                     "borderWidth": 0,
                     "borderColor": "#ccc"
                 }
             }
         },

         "categoryAxis": {
             "axisLine": {
                 "show": false,
                 "lineStyle": {
                     "color": "#f0f0f0"
                 }
             },
             "axisTick": {
                 "show": false,
                 "lineStyle": {
                     "color": "#f0f0f0"
                 }
             },
             "axisLabel": {
                 "show": true,
                 "textStyle": {
                     "color": "#999999"
                 }
             },
             "splitLine": {
                 "show": true,
                 "lineStyle": {
                     "color": [
                         "#f0f0f0"
                     ]
                 }
             },
             "splitArea": {
                 "show": false,
                 "areaStyle": {
                     "color": [
                         "rgba(250,250,250,0.3)",
                         "rgba(200,200,200,0.3)"
                     ]
                 }
             }
         },
         "valueAxis": {
             "axisLine": {
                 "show": false,
                 "lineStyle": {
                     "color": "#333"
                 }
             },
             "axisTick": {
                 "show": false,
                 "lineStyle": {
                     "color": "#333"
                 }
             },
             "axisLabel": {
                 "show": true,
                 "textStyle": {
                     "color": '#999999',
                    //  "align": 'right',
                     "fontFamily": 'Arial'
                 }
             },
             "splitLine": {
                 "show": true,
                 "lineStyle": {
                     "color": [
                         "#f0f0f0"
                     ]
                 }
             },
             "splitArea": {
                 "show": false,
                 "areaStyle": {
                     "color": [
                         "rgba(250,250,250,0.3)",
                         "rgba(200,200,200,0.3)"
                     ]
                 }
             }
         },
         "logAxis": {
             "axisLine": {
                 "show": false,
                 "lineStyle": {
                     "color": "#333"
                 }
             },
             "axisTick": {
                 "show": false,
                 "lineStyle": {
                     "color": "#333"
                 }
             },
             "axisLabel": {
                 "show": false,
                 "textStyle": {
                     "color": "#333"
                 }
             },
             "splitLine": {
                 "show": false,
                 "lineStyle": {
                     "color": [
                         "#ccc"
                     ]
                 }
             },
             "splitArea": {
                 "show": false,
                 "areaStyle": {
                     "color": [
                         "rgba(250,250,250,0.3)",
                         "rgba(200,200,200,0.3)"
                     ]
                 }
             }
         },

         "toolbox": {
             "iconStyle": {
                 "normal": {
                     "borderColor": "#999"
                 },
                 "emphasis": {
                     "borderColor": "#666"
                 }
             }
         },
         "legend": {
             "textStyle": {
                 "color": "#333"
             }
         },
         "tooltip": {
             "axisPointer": {
                 "lineStyle": {
                     "color": "#ffffff",
                     "width": "0.5"
                 },
                 "crossStyle": {
                     "color": "#ffffff",
                     "width": "0.5"
                 }
             }
         }

     });
 }));
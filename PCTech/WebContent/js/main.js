/*jslint browser: true*/
/*global $, jQuery, console, ActiveXObject, alert,request,BMap*/

// 自定义脚本运行在一个匿名函数内，便于文件合并
(function ($) {

    // use strict mode
    "use strict";

    var mtc, map;
    // var request = new LotRequest();
    /**
     *  Html页面加载完毕后执行此函数
     */
    $(document).ready(function () {
        initialize();
        request.baseUrl = "assets/";
        request.lotListSubUrl = "lotlist";
        request.lotInfoSubUrl = "lotinfo-";
        request.spotLayoutSubUrl = "layout-";
        request.spotInfoSubUrl = "spots-";
        request.getLotList().then(function () {
            $(".blockpic").click(onParkinglotSelected);
        });
        $("#lot-map").dragScroll({});
        $("#rtbtn").change(function () {

            console.log("show rt");
            $("#realtimelot").show();
            $("#analysis").hide();

        });
        $("#alybtn").change(function () {

            console.log("show aly");
            $("#realtimelot").hide();
            $("#analysis").show();
            $(window).resize();
        });
    });

    function onParkinglotSelected(event) {
        var lotId = event.target.dataset.id;
        console.log(lotId);
        $(".lotcontent").css("display", "inherit");
        if (lotId === request.lastLotID) {
            console.log(event.target);
            return;
        } else {
            $.when(request.getLotInfo(lotId), request.getSpotsLayout(lotId), request.getSpotsInfo(lotId)).done(function () {
                request.setCars();
            });
            setRefresh(lotId);
        }
    }

    var interval;

    function setRefresh(lotId) {
        clearInterval(interval);
        // 设置周期性更新页面内容
        interval = setInterval(function () {

            $.when(request.getLotInfo(lotId), request.getSpotsInfo(lotId)).done(function () {
                request.setCars();
            });

            $(".barble-box").css("display", "inherit");
            setTimeout(function () {
                $(".barble-box").css("display", "none");
            }, 1500);

        }, 30000);
    }

    function initialize() {
        initBMap();
        initChart();
    }

    // 初始化地图
    function initBMap() {
        // 百度地图API功能
        map = new BMap.Map("allmap", {
            vectorMapLevel: 99,
            enableHighResolution: true
        });
        mtc = new BMap.MapTypeControl({
            type: BMAP_MAPTYPE_CONTROL_HORIZONTAL,
            mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        });
        //        mtc.setAnchor(BMAP_ANCHOR_TOP_LEFT);
        //        mtc.setOffset(new BMap.Size(10, 60));
        map.addControl(mtc); //添加地图类型控件
        //map.centerAndZoom(new BMap.Point(113.558581, 22.259898), 13); //指定地图中心和缩放级别
        map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
        map.enableKeyboard();
        //map.addControl(new BMap.ScaleControl()); // 添加默认比例尺控件
        map.setMapStyle({
            styleJson: [
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                        "color": "#a5c7f2",
                        "saturation": 10
                    }
                  },
                {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                        "saturation": 20
                    }
                  }
        ]
        });

        var start = "天安门";
        var end = "百度大厦";
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        //三种驾车策略：最少时间，最短距离，避开高速
        var routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];
        $("#result").click(function () {
            map.clearOverlays();
            var i = $("#driving_way select").val();
            search(start, end, routePolicy[i]);

            var output;

            function search(start, end, route) {
                var driving = new BMap.DrivingRoute(map, {
                    renderOptions: {
                        map: map,
                        panel: "r-result",
                        autoViewport: true
                    },
                    policy: route,
                    onSearchComplete: function (results) {
                        if (driving.getStatus() != BMAP_STATUS_SUCCESS) {
                            return;
                        }
                        var plan = results.getPlan(0);
                        output = "全程：";
                        output += plan.getDistance(true); //获取距离
                        output += " / ";
                        output += plan.getDuration(true); //获取时间
                    },
                    onPolylinesSet: function () {
                        $("#time-distance span").html(output);
                        //setTimeout(function(){alert(output)},"1000");
                    }
                });
                driving.search(start, end);
            }
        });
    }

    function initChart() {
        $('#linechart').highcharts({
            title: {
                text: '实时车流量统计',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: parking.com',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                    }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                }, {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                }]
        });
    }

}(jQuery));
/*jslint browser: true*/
/*global $, jQuery, console, ActiveXObject, alert,request*/

// 自定义脚本运行在一个匿名函数内，便于文件合并
(function ($) {

    // use strict mode
    "use strict";

    // var request = new LotRequest();
    /**
     *  Html页面加载完毕后执行此函数
     */
    $(document).ready(function () {
        initialize();
//        request.baseUrl = "assets/";
//        request.lotListSubUrl = "lotlist";
//        request.lotInfoSubUrl = "lotinfo-";
//        request.spotLayoutSubUrl = "layout-";
//        request.spotInfoSubUrl = "spots-";
        request.getLotList().then(function () {
            $(".blockpic").click(onParkinglotSelected);
        });
    });

    function onParkinglotSelected(event) {
        var lotId = event.target.dataset.id;
        console.log(lotId);
        $("#lotinfotable,#realtimelot,#analysis").css("display", "inherit");
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

            $("#popup-info").css("display", "inherit");
            setTimeout(function () {
                $("#popup-info").css("display", "none");
            }, 1500);

        }, 30000);
    }

    function initialize() {
        initChart();
        $("#lotinfotable,#realtimelot,#analysis").css("display", "none");
    }

    function initChart() {
        $('#linechart').highcharts({
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: WorldClimate.com',
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
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
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
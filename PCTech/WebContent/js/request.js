/*jslint browser: true*/
/*global $, jQuery, console, ActiveXObject, alert*/

// 自定义脚本运行在一个匿名函数内，便于文件合并
// 本文件主要用于处理向服务器请求信息的工作

var request = (function ($) {

    // use strict mode
    "use strict";

    function LotRequest() {
        this.baseUrl = "localhost:8080/PCTech/";
        this.lotListSubUrl = "getParkingLots";
        this.lotInfoSubUrl = "getParkingLotData？requestDataType=parkingLotInfo&parkingLotID=";
        this.spotLayoutSubUrl = "getSpotsInfoFile?parkingLotID=";
        this.spotInfoSubUrl = "getParkingLotData？requestDataType=parkingSpotnfo&parkingLotID=";
        this.spotPositions = [];
        this.lastLotID = null;
        this.spotsInfo = [];
    }

    LotRequest.prototype = {
        getLotList: function (reqUrl) {
            var req = this;
            return $.getJSON(req.baseUrl + req.lotListSubUrl + reqUrl).done(function (data) {
                var parkinglot_list = [],
                    isAddBR = data.length > 5 ? true : false;
                data.forEach(function (value, index) {
                    parkinglot_list.push('<a class="blockpic" href="#lotinfotable"');
                    parkinglot_list.push(' data-id="' + value[0] + '">');
                    parkinglot_list.push(value[1]);
                    parkinglot_list.push('</a>');
                    if (isAddBR && index > 0 && index % data.length === 0) {
                        parkinglot_list.push('<br/>');
                    }
                });

                // 利用array的join合成html代码后，插入到网页中
                $("#lottable").html(parkinglot_list.join(''));
            }).fail(function () {
                console.log("getLotList error ");
            });
        },
        getLotInfo: function (lotID) {
            var req = this;
            req.lastLotID = lotID;
            return $.getJSON(req.baseUrl + req.lotInfoSubUrl + lotID).done(function (data) {
                $("#lot-name").html(data.name);
                $("#lot-architecture").html(data.architecture);
                $("#lot-businessHours").html(data.businessHours);
                $("#lot-client").html(data.client);
                $("#lot-facility").html(data.facility);
                $("#lot-quantity").html(data.spotQuantity);
                $("#lot-remain").html(data.remain);
                $("#lot-fee").html(data.fee);
                $("#lot-address").html(data.address);
            }).fail(function () {
                console.log("getParkinglot error");
            });
        },
        getSpotsLayout: function (lotID) {
            var req = this;
            return $.get(req.baseUrl + req.spotLayoutSubUrl + lotID + ".lo").done(function (data) {
                req.spotPositions = JSON.parse(data);
            }).fail(function () {
                console.log("getLayout error");
            });
        },
        getSpotsInfo: function (lotID) {
            var req = this;
            return $.getJSON(req.baseUrl + req.spotInfoSubUrl + lotID + ".spots").done(function (data) {
                req.spotsInfo = data;
                $("#lot-img").attr("src", "img/" + lotID + ".png").removeAttr("style").removeAttr("data-src");
            }).fail(function () {
                console.log("getParkingSpots error");
            });
        },
        setCars: function () {
            $("#lot-map").children().remove(".overlay-img");
            console.log(this.spotPositions);
            var req = this;
            req.spotsInfo.forEach(function (info) {
                var pos = req.spotPositions.filter(function (obj) {
                    return obj.id === info.id;
                })[0];
                var array = [];
                array.push('<img class="overlay-img ');
                if (pos.orientation === "left") {
                    array.push('orient-left');
                }
                array.push('" style="top:' + pos.y1 + 'px;left:' + pos.x1 + 'px;width:' + pos.width + 'px;height:' + pos.height + 'px;" src="img/car.png" alt="" />');
                $("#lot-map").append(array.join(''));
            })
        }
    };

    return new LotRequest();
}(jQuery));
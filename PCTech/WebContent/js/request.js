/*jslint browser: true*/
/*global $, jQuery, console, ActiveXObject, alert*/

// 自定义脚本运行在一个匿名函数内，便于文件合并
// 本文件主要用于处理向服务器请求信息的工作

(function ($) {

    // use strict mode
    "use strict";

    var layout_cols, /* 停车场车位列数*/
        layout_rows, /* 停车场车位行数*/
        mydropdown, /* 自定义select控件对象*/
        parkinglot, /* 停车场对象*/
        layout /* 停车场布局二维数组*/ ;

    /**
     *  Html页面加载完毕后执行此函数
     */
    $(document).ready(function () {

        getLotList("getParkingLots");

    });

    /*
     *  select菜单选项html模版
     *  <li role='presentation' value='xxxplot'>
     *      <a role='menuitem' tabindex='1' href='javascript:void(0);'>xxxplot</a>
     *  </li>
     *
     *  利用getJSON获取停车场列表，动态生成下拉列表html代码，并创建自定义select控件实例
     * @param {Type} url
     */
    function getLotList(url) {
        return $.getJSON(url).done(function (data) {
            var parkinglot_list = [];
            data.forEach(function (value, index) {
                parkinglot_list.push("<li role='presentation' value='");
                parkinglot_list.push(value);
                parkinglot_list.push("'><a role='menuitem' tabindex='");
                parkinglot_list.push(index + 1);
                parkinglot_list.push("' href='javascript:void(0);'>");
                parkinglot_list.push(value);
                parkinglot_list.push("</a></li>");
            });

            // 利用array的join合成html代码后，插入到网页中
            $("#parkinglot-list").html(parkinglot_list.join(''));

            // 创建select控件实例
            mydropdown = new CustomDropDown($("#select-dropdown-menu-1"));

        }).fail(function () {
            console.log("getLotList error");
        });
    }

    /**
     *  通过传入的url获取对应停车场的布局文件，并创建对应二维数组布局（暂时）
     * @param {String} url
     */
    function getLayout(url) {
        return $.get(url).done(function (data) {
            layout_rows = parseInt($(data).find('rows').text());
            layout_cols = parseInt($(data).find('cols').text());

            // 创建二维数组，作为停车场布局的标识
            layout = new Array(layout_rows);
            for (var i = 0; i < layout.length; i++) {
                layout[i] = new Array(layout_cols);
            }
        }).fail(function () {
            console.log("getLayout error");
        });
    }

    /**
     * 通过传入的url获取对应的停车场的详细信息设置全局变量
     * @param {String} url
     */
    function getParkinglot(url) {
        return $.getJSON(url).done(function (data) {
            parkinglot = data;

        }).fail(function () {
            console.log("getParkinglot error");
        });
    }

    /**
     * 通过传入的url获取对应停车场的车位信息，进行实时更新（有些许延迟吧）
     * @param {String} url
     */
    function getParkingSpots(url) {
        return $.getJSON(url).done(function (data) {
            data.forEach(function (value, index) {
                var reg = /(\w+\d+)-(\d+)-(\d+)/g,
                    result = reg.exec(value.id),
                    row = parseInt(result[2]),
                    col = parseInt(result[3]);
                layout[row][col] = true;
            });

            // 设置公告板的表格
            setBulletin(data);
            setTableLot();

        }).fail(function () {
            console.log("getParkingSpots error");
        });
    }

    var lastlotname;

    /**
     *  在用户进行点击菜单项时，通过传入的停车场的名称或ID，执行一系列的操作
     * @param {String} lotname
     */
    function onParkinglotSelected(lotname) {
        if (lotname === lastlotname) {
            return;
        } else {
            lastlotname = lotname;
        }
        getLayout("layout/layout_" + lotname + ".xml")
            .then(getParkinglot("getParkingLotData?requestDataType=parkingSpotInfo&parkingLotName=" + lotname))
            .then(getParkingSpots("getParkingLotData?requestDataType=parkingLotInfo&parkingLotName=" + lotname));
        refreshContent(lotname);
    }

    var interval;

    function refreshContent(lotname) {
        clearInterval(interval);
        // 设置周期性更新页面内容
        interval = setInterval(function () {
            getParkingSpots("getParkingLotData?requestDataType=parkingLotInfo&parkingLotName=" + lotname);

            $("#popup-info").css("display", "inherit");
            setTimeout(function () {
                $("#popup-info").css("display", "none");
            }, 1500);

        }, 10000);
    }

    /**
     * tablelot生成如下html代码
     *  <div class="table-responsive">
     *      <table class="table table-striped table-bordered table-hover">
     *          <tbody>
     *              <tr>
     *                  <td class="empty">empty</td>
     *                  <td class="empty">empty</td>
     *                  <td class="empty">empty</td>
     *                  <td class="car car11">busy</td>
     *                  <td class="empty">empty</td>
     *                  <td class="empty">empty</td>
     *              </tr>
     *          </tbody>
     *      </table>
     *  </div>
     *
     *  动态生成停车场车辆分布表格
     */
    function setTableLot() {
        // 设置tablelot
        var table = [];
        table.push("<div class='table-responsive'><table class='table table-striped table-bordered table-hover'><tbody>");
        /*var car_image = "<img src='assets/cars/car4.png' class='parkingspot' alt='car photo'></img>";
        var empty_image = "<img src='assets/cars/empty.png' class='parkingspot' alt='car photo'></img>"*/
        for (var i = 0; i < layout_rows; i++) {
            table.push("<tr>");
            for (var j = 0; j < layout_cols; j++) {
                if (layout[i][j] !== true)
                    table.push("<td class='parkingspot empty'></td>");
                else
                    table.push("<td class='parkingspot car'></td>");
            }
            table.push("</tr>");
        }
        table.push("</tbody></table></div>");
        $("#tablelot").html(table.join(''));
    }

    /* bulletin内html代码模版
        <table class="table table-hover">
        <thead>
            <tr>
                <th colspan="4">名称：
                    <span></span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-md-2">结构型式：</td>
                <td class="col-md-4"></td>
                <td class="col-md-2">营业时间：</td>
                <td class="col-md-4"></td>
            </tr>
            <tr>
                <td>服务对象：</td>
                <td></td>
                <td>主要设施：</td>
                <td></td>
            </tr>
            <tr>
                <td>车位总数：</td>
                <td></td>
                <td>剩余车位数：</td>
                <td></td>
            </tr>
            <tr>
                <td>收费标准：</td>
                <td></td>
                <td>地址：</td>
                <td></td>
            </tr>
        </tbody>
        </table>
    */
    /**
     *  动态生成公告板html代码
     * @param {JSONObject} parkinglot
     */
    function setBulletin(parkingspots) {
        // 设置bulletin
        var bulletin = [];
        bulletin.push("<table class='table table-hover'><thead><tr><th colspan='4'>名称：<span>");
        bulletin.push(parkinglot.name);
        bulletin.push("</span></th></tr></thead><tbody><tr><td class='col-md-2'>结构型式：</td><td class='col-md-4'>");
        bulletin.push(parkinglot.architecture);
        bulletin.push("</td><td class='col-md-2'>营业时间：</td><td class='col-md-4'>");
        bulletin.push(parkinglot.businessHours);
        bulletin.push("</td></tr><tr><td>服务对象：</td><td>");
        bulletin.push(parkinglot.client);
        bulletin.push("</td><td>主要设施：</td><td>");
        bulletin.push(parkinglot.facility);
        bulletin.push("</td></tr><tr><td>车位总数：</td><td>");
        bulletin.push(parkinglot.spotQuantity);
        bulletin.push("</td><td>剩余车位数：</td><td><span class='btn-info badge'>");
        bulletin.push(parkinglot.spotQuantity - parkingspots.length);
        bulletin.push("</span></td></tr><tr><td>收费标准：</td><td>");
        bulletin.push(parkinglot.fee);
        bulletin.push("</td><td>地址：</td><td>");
        bulletin.push(parkinglot.address);
        bulletin.push("</td></tr></tbody></table>");

        $("#bulletin").html(bulletin.join(''));
    }

    /**
     *
     * @param {String} pfx
     * @param {Number} row
     * @param {Number} col
     */
    function ParkingSpot(pfx, row, col) {
        this.pfx = pfx;
        this.row = row;
        this.col = col;
    }

    /* ========================================================================
     * 基于bootstrap按钮式下拉菜单的自定义的类select控件
     *
     * ========================================================================
     *
     * @param {HTMLDocument} element
     */
    function CustomDropDown(element) {
        this.dropdown = element;
        this.placeholder = this.dropdown.find(".placeholder");
        this.options = this.dropdown.find("ul.dropdown-menu>li");
        this.val = '';
        this.index = -1; //默认为-1;
        this.initEvents();
    }
    CustomDropDown.prototype = {
        initEvents: function () {
            var obj = this;
            //这个方法可以不写，因为点击事件被Bootstrap本身就捕获了，显示下面下拉列表
            obj.dropdown.on("click", function (event) {
                $(this).toggleClass("active");
            });

            //点击下拉列表的选项
            obj.options.on("click", function () {
                var opt = $(this);
                obj.text = opt.find("a").text();
                obj.val = opt.attr("value");
                obj.index = opt.index();
                obj.placeholder.text(obj.text);
                onParkinglotSelected(obj.val);
                //selectLot(obj.val);
            });
        },
        getText: function () {
            return this.text;
        },
        getValue: function () {
            return this.val;
        },
        getIndex: function () {
            return this.index;
        }
    };
})(jQuery);
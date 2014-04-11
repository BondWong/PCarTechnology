/*jslint browser: true*/
/*global $, jQuery, console, ActiveXObject, alert*/

// 自定义脚本运行在一个匿名函数内，便于文件合并
(function ($) {
    // use strict mode
    "use strict";

    var promiseA = (function () {
        return $.get("a.txt");
    })();
    // 这里添加promiseA的回调
    promiseA.done(
        function (data) {
            console.log("a done.");
        }
    );

    var promiseB = promiseA.then(function () {
        return $.get("b.txt");
    });
    // 这里添加promiseB的回调
    promiseB.done(
        function () {
            console.log("b done.");
        }
    );

    var promiseC = promiseB.then(function () {
        return $.get("c.txt");
    });
    // 这里添加promiseC的回调
    promiseC.done(
        function () {
            console.log("c done.");
        }
    );

    var promiseD = promiseC.then(function () {
        return $.get("d.txt");
    });
    // 这里添加promiseD的回调
    promiseD.done(
        function () {
            console.log("d done.");
        }
    );
})(jQuery);

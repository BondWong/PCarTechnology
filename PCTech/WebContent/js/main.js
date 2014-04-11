/*jslint browser: true*/
/*global $, jQuery, console, ActiveXObject, alert*/

// 自定义脚本运行在一个匿名函数内，便于文件合并
(function ($) {

    // use strict mode
    "use strict";
    /**
     *  Html页面加载完毕后执行此函数
     */
    $(document).ready(function () {


        $('#flashbox').smallslider({
            switchEffect: 'ease',
            switchEase: 'easeOutBounce',
            switchPath: 'left',
            switchMode: 'hover',
            showText: false,
            buttonPosition: 'rightBottom',
            buttonSpace: 20,
            buttonOffsetY: 10,
        });

        $("#smallslider-btns").css({
            "left": ($('#flashbox').width() - $("#smallslider-btns").width()) / 2
        });

        $('#flashbox').onresize(function () {
            $("#smallslider-btns").css({
                "left": ($('#flashbox').width() - $("#smallslider-btns").width()) / 2
            });
        });
    });

})(jQuery);
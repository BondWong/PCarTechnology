/*jslint browser: true*/
/*global $, jQuery, console, ActiveXObject, alert*/


// use strict mode
"use strict";

$(document).ready(function () {

    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    $(".upload").css("display", "none");
    $("#add").click(addRow);
    testGenformVisible();
    $("#generate").click(download);
    $("#filename").popover({
        placement: 'top',
        content: "filename can't be null!",
        trigger: "manual"
    });

});

function download() {
    if ($("#filename").val() !== "") {
        downloadFile($("#filename").val() + ".json", generatefilecontent());
    } else {
        var obj = $("#filename");
        obj.popover("show");
        setTimeout(function () {
            obj.popover("hide");
        }, 3000);
    }
}

function generatefilecontent() {
    var tableObj = document.getElementById("infotable");
    var contentArray = [];
    for (var i = 1; i < tableObj.rows.length; i++) {
        var obj = {};
        obj.id = tableObj.rows[i].cells[0].innerHTML;
        obj.x1 = tableObj.rows[i].cells[1].innerHTML;
        obj.y1 = tableObj.rows[i].cells[2].innerHTML;
        obj.width = tableObj.rows[i].cells[5].innerHTML;
        obj.height = tableObj.rows[i].cells[6].innerHTML;
        obj.orientation = tableObj.rows[i].cells[7].firstChild.getAttribute("value");
        contentArray[i - 1] = obj;
    }
    return JSON.stringify(contentArray);
}

function downloadFile(fileName, content) {
    //    var aLink = document.createElement('a');
    //    var blob = new Blob([content]);
    //    var evt = document.createEvent("HTMLEvents");
    //    evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
    //    aLink.download = fileName;
    //    aLink.href = URL.createObjectURL(blob);
    //    aLink.dispatchEvent(evt);



    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/json;charset=utf-8, ' + encodeURIComponent(content));
    pom.setAttribute('download', fileName);
    pom.setAttribute("style", "display:none");

    document.body.appendChild(pom);

    if (window.navigator.msSaveOrOpenBlob) {

        blobObject = new Blob(content);
        pom.click((function () {
            window.navigator.msSaveOrOpenBlob(blobObject, fileName);
        })());
    } else {
        pom.click();
    }

    document.body.removeChild(pom);
}

function makeVisiable() {
    $(".upload").css("display", "inherit");
    $("#infotable").css("display", "grid");
}

function addRow() {
    var num = document.getElementById("infotable").rows.length;
    var Tr = document.getElementById("infotable").insertRow(num);
    var addcontent = "<td>" + (num) + "</td>";
    addcontent += "<td>" + $("#dataX1").val() + "</td>";
    addcontent += "<td>" + $("#dataY1").val() + "</td>";
    addcontent += "<td>" + $("#dataX2").val() + "</td>";
    addcontent += "<td>" + $("#dataY2").val() + "</td>";
    addcontent += "<td>" + $("#dataHeight").val() + "</td>";
    addcontent += "<td>" + $("#dataWidth").val() + "</td>";
    addcontent += '<td><input class="orientation form-control" type="text" name="orientation" value="left"></td>';
    addcontent += '<td class="text-center"><button type="button" class="delete btn btn-danger btn-lg" onclick="deleteRow(this)">Delete</button></td>';
    Tr.innerHTML = addcontent;
    $(Tr).find(".orientation").focusin(textFocus).blur(textBlur).popover({
        placement: 'top',
        content: "Only 'left' or 'right' is permitted!",
        trigger: "manual"
    });
    testGenformVisible();
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById('infotable').deleteRow(i);
    testGenformVisible();
}

function testGenformVisible() {
    if ($("#infotable>tbody > tr").length > 1) {
        $("#genform").css("display", "grid");
    } else {
        $("#genform").css("display", "none");
    }
}

function textFocus() {
    if (this.value === "left") {
        this.value = "";
    }
}

function textBlur() {
    if (this.value === "") {
        this.value = "left";
    } else if (this.value !== "left" && this.value !== "right") {
        var obj = $(this);
        obj.popover("show");
        setTimeout(function () {
            obj.popover("hide");
        }, 5000);
        this.value = "left";
    }
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.

    for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = captureImgInfo(f);
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
    makeVisiable();
    initcropper();
}

// Closure to capture the file information.
function captureImgInfo(file) {
    return function (e) {
        $("#imgcrop").attr("src", e.target.result);
        $("#imgcrop").attr("title", escape(file.name));
    };
}

function initcropper() {
    var $cropper = $(".cropper"),
        $dataX1 = $("#dataX1"),
        $dataY1 = $("#dataY1"),
        $dataX2 = $("#dataX2"),
        $dataY2 = $("#dataY2"),
        $dataHeight = $("#dataHeight"),
        $dataWidth = $("#dataWidth"),
        cropper;
    $cropper.cropper({
        //aspectRatio: 1,
        preview: ".extra-preview",
        done: function (data) {
            $dataX1.val(data.x1);
            $dataY1.val(data.y1);
            $dataX2.val(data.x2);
            $dataY2.val(data.y2);
            $dataHeight.val(data.height);
            $dataWidth.val(data.width);
        }
    });
    cropper = $cropper.data("cropper");
    $("#cropper-enable").click(function () {
        $cropper.cropper("enable");
    });
    $("#cropper-disable").click(function () {
        cropper.disable();
    });
}
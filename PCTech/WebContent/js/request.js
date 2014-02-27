var xmlhttp;

function LoadTxt() {

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("hello").innerHTML = xmlhttp.responseText;
        }
    };

    xmlhttp.open("GET", "test.txt", true);
    xmlhttp.send();
}


function selectLot(value) {
    var tablelot = document.getElementById("tablelot");
    if (value <= 0) return;

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var xmlDoc = xmlhttp.responseXML;
            var layoutTag = xmlDoc.getElementsByTagName("layout");
            var width = xmlDoc.getElementsByTagName("layout")[0].getElementsByTagName("width")[0].firstChild.nodeValue;
            var height = xmlDoc.getElementsByTagName("layout")[0].getElementsByTagName("height")[0].firstChild.nodeValue;

            var table = document.createElement("table");
            var tbody = document.createElement("tbody");
            for (var i = 0; i < height; i++) {
                var tr = document.createElement("tr");
                for (var j = 0; j < width; j++) {
                    var td = document.createElement("td");

                    var txt = getRandomStatus();
                    if (txt === "busy") {
                        td.className = "car car" + getRandom(12);
                    } else {
                        td.className = "empty";
                    }

                    td.appendChild(document.createTextNode(txt));
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
            table.appendChild(tbody);
            table.className = "table table-striped table-bordered table-hover";
            tablelot.innerHTML = "";
            var divTag = document.createElement("div");
            divTag.className = "table-responsive";
            divTag.appendChild(table);
            tablelot.appendChild(divTag);
            //  document.getElementById("maincontent").style.height = "auto";
        }
    };

    // 提取停车场号码
    var lotnum = value.substr(3);

    xmlhttp.open("GET", "layout/layout_" + lotnum + ".xml", true);
    xmlhttp.send();
}

function getRandom(scope) {
    return Math.ceil(Math.random() * 10000) % scope + 1;
}

function getRandomStatus() {
    return Math.ceil(Math.random() * 1000) % 2 === 0 ? "empty" : "busy";
}
function calc(idx, iscallTotalit) {
    var cost = parseFloat(document.getElementById("cost" + idx).value || 0);
    var qty = parseFloat(document.getElementById("qty" + idx).value || 0);
    var sub_total = cost * qty;
    var vat = parseFloat(document.getElementById("vat" + idx).value || 0);
    var price =  (vat/100 *sub_total) + sub_total;;

    document.getElementById("price" + idx).value = isNaN(price) ? "0.00" : price.toFixed(3);

    if (!iscallTotalit)
        totalIt();
}

function totalIt() {
    var vats = document.getElementsByName("vat[]");
    var total = 0;
    for (var i = 1; i <= vats.length; i++) {
        calc(i, true);
        var price = parseFloat(document.getElementById("price" + i).value || 0);
        total += isNaN(price) ? 0 : price;
    }

    document.getElementById("total").value = isNaN(total) ? "0.00" : total.toFixed(3);
}


window.onload = function () {
    document.getElementsByName("vat[]")[0].onkeyup = function () {
        calc(1)
    };
    document.getElementsByName("cost[]")[0].onkeyup = function () {
        calc(1)
    };
    document.getElementsByName("qty[]")[0].onkeyup = function () {
        calc(1)
    };
};

var rowCount = 0;

function addRow(tableID) {
    var table = document.getElementById(tableID);

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "checkbox";
    element1.name = "chk[]";
    cell1.appendChild(element1);

    var cell2 = row.insertCell(1);
    cell2.innerHTML = rowCount;

    var cell3 = row.insertCell(2);
    var element3 = document.createElement("input");
    element3.type = "text";
    element3.name = "item[]";
    element3.required = "required";
    cell3.appendChild(element3);

    var cell4 = row.insertCell(3);
    var element4 = document.createElement("input");
    element4.type = "text";
    element4.name = "cost[]";
    element4.placeholder = 0;
    element4.id = "cost" + rowCount;
    element4.onkeyup = function () {
        calc(rowCount);
    };
    cell4.appendChild(element4);

    var cell5 = row.insertCell(4);
    var element5 = document.createElement("input");
    element5.type = "text";
    element5.name = "qty[]";
    element5.placeholder = 0;
    element5.id = "qty" + rowCount;
    element5.onkeyup = function () {
        calc(rowCount);
    };
    
    cell5.appendChild(element5);

    var cell6 = row.insertCell(5);
    var element6 = document.createElement("input");
    element6.type = "text";
    element6.placeholder = 0;
    element6.name = "vat[]";
    element6.id = "vat" + rowCount;
    element6.onkeyup = function () {
        calc(rowCount);
    };
    cell6.appendChild(element6);

    var cell7 = row.insertCell(6);
    var element7 = document.createElement("input");
    element7.type = "text";
    element7.name = "price[]";
    element7.id = "price" + rowCount
    cell7.appendChild(element7);
}

function deleteRow(tableID) {
    try {
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;

        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            var chkbox = row.cells[0].childNodes[0];
            if (null != chkbox && true == chkbox.checked) {
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    } catch (e) {
        alert(e);
    }
}
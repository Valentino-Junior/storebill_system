function calc(idx, iscallTotalit) {
	var cost = 0;
	var vat = 0;
	var del = 0;

	var price =   parseFloat(document.getElementById("vat" + idx).value || 0) 
		* parseFloat(document.getElementById("del" + idx).value || 0)
		+ parseFloat(document.getElementById("cost" + idx).value || 0);

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
	document.getElementsByName("del[]")[0].onkeyup = function () {
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
	element4.name = "vat[]";
	element4.defaultValue = 0;
	element4.id = "vat" + rowCount;
	element4.onkeyup = function () {
		calc(rowCount);
	};
	cell4.appendChild(element4);

	var cell5 = row.insertCell(4);
	var element5 = document.createElement("input");
	element5.type = "text";
	element5.name = "cost[]";
	element5.value = 0;
	element5.id = "cost" + rowCount;
	element5.onkeyup = function () {
		calc(rowCount);
	};
	cell5.appendChild(element5);

	var cell5 = row.insertCell(4);
	var element5 = document.createElement("input");
	element5.type = "text";
	element5.value = 0;
	element5.name = "del[]";
	element5.id = "del" + rowCount;
	element5.onkeyup = function () {
		calc(rowCount);
	};
	cell5.appendChild(element5);

	var cell6 = row.insertCell(6);
	var element6 = document.createElement("input");
	element6.type = "text";
	element6.name = "price[]";
	element6.id = "price" + rowCount
	cell6.appendChild(element6);
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

// reusable table
function fillTable(show, data, props, buttons) {
  show.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const datum = data[i];
    // display.innerHTML += `<tr><td>${employee['name']}</td><td>${employee['age']}</td><td>${employee['gender']["name"]}</td></tr>`;

    var tr = document.createElement("tr");

    for (let j = 0; j < props.length; j++) {
      if (typeof props[j] == "function") {
        var text = document.createTextNode(props[j](datum));
      } else {
        var text = document.createTextNode(datum[[props[j]]]);
      }

      var td = document.createElement("td");
      td.appendChild(text);
      tr.appendChild(td);
    }

    if (buttons.length != 0) {
      for (let k = 0; k < buttons.length; k++) {
        const button = buttons[k];
        const {btnText,func, btnColor, icon} = button;

        var tdModify = document.createElement("td");
        tdModify.innerHTML = `<button class="btn btn-${btnColor}" data-bs-target="#modifyModal" data-bs-toggle="modal" onclick="${func()}"><i class="fa-solid fa-${icon}"></i><span>${btnText}</span></button>`
        tr.appendChild(tdModify);
      }
    }
    show.appendChild(tr);
  }
}

// reusable combo box
function fillCombo(combo, data, hint) {
  var optionHint = document.createElement("option");
  optionHint.value = null;
  optionHint.innerHTML = hint;
  optionHint.setAttribute("disabled", "disabled");
  optionHint.setAttribute("selected", "selected");
  combo.appendChild(optionHint);

  for (let i = 0; i < data.length; i++) {
    const datum = data[i];
    var option = document.createElement("option");
    option.value = JSON.stringify(datum);
    option.innerHTML = datum["name"];
    combo.appendChild(option);
  }
}

export {fillTable, fillCombo}
    window.addEventListener("load", initialize);

    var ajax;
    var genders;
    var employees;
    var array;

    function Employee(name, age, gender) {
      this.name = name;
      this.age = age;
      this.gender = gender;
    }

    function initialize() {
      btnClear.addEventListener("click", clearForm);
      btnSearch.addEventListener("click", search);
      btnSearchClear.addEventListener("click", clearSearch);
      btnAdd.addEventListener("click", btnAddMC);

      employees = get("./../server/controller/employeeController.php");
      genders = get("./../server/controller/genderController.php");
      loadView();
      loadForm();
    }

    function loadView() {
      fillEmployeeTable();
      fillCombo(cmbSearchGender, genders, "Select a Gender");
    }

    function fillEmployeeTable() {
      var modifyFunc = function (datum) {
        var userConfirm = window.confirm(
          "Are you sure to modify " + datum.name
        );
        userConfirm ? alert("HI") : "";
      };

      fillTable(
        display,
        employees,
        [
          "name",
          "age",
          function (e) {
            return e.gender.name;
          },
        ],
        [
          { btnText: "Modify", func: modifyFunc, btnColor: "btn-primary" },
          { btnText: "Delete", func: modifyFunc, btnColor: "btn-danger" },
        ]
      );
    }

    function loadForm() {
      fillCombo(cmbGender, genders, "Select a Gender");
    }

    function get(url) {
      var http = new XMLHttpRequest();

      // asynchronus way

      // http.onreadystatechange = function () {
      //   if (this.readyState == 4 && this.status == 200) {
      //     var data = JSON.parse(this.responseText);
      //     fillCombo()
      //   }
      // };

      // synchronous way
      http.open("GET", url, false);
      http.send();
      var data = JSON.parse(http.responseText);
      return data;
    }

    function add(url, data) {
      var http = new XMLHttpRequest();

      http.open("POST", url, false);
      http.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      http.send(data);
    }

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

            var tdModify = document.createElement("td");
            var btnModify = document.createElement("button");

            btnModify.type = "button";
            btnModify.innerHTML = button.btnText;
            btnModify.classList.add("btn", button.btnColor);
            btnModify.addEventListener("click", function () {
              button.func(datum);
            });
            tdModify.appendChild(btnModify);
            tr.appendChild(tdModify);
          }
        }
        show.appendChild(tr);
      }
    }

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

    function clearForm() {
      txtName.value = "";
      txtAge.value = "";
      cmbGender.value = null;
    }

    function search() {
      var qry;
      var tname = txtSearchName.value;
      var tgen =
        cmbSearchGender.value != null ? JSON.parse(cmbSearchGender.value) : "";
      tname && !tgen ? (qry = "name=" + tname) : "";
      !tname && tgen ? (qry = "gender=" + tgen["id"]) : "";
      tname && tgen ? (qry = "name=" + tname + "&gender=" + tgen["id"]) : "";

      employees = get("./../server/controller/employeeController?" + qry);
      fillEmployeeTable();
    }

    function clearSearch() {
      txtSearchName.value = "";
      cmbSearchGender.value = null;
    }

    function btnAddMC() {
      var name = txtName.value;
      var age = txtAge.value;
      var gender = cmbGender.value != "null" ? JSON.parse(cmbGender.value) : "";
      if (name != "" && age != "" && gender != "") {
        var userConfirm = window.confirm(
          "Are you sure to your want to Add this Employee ? \nName : " +
            name +
            "\nAge : " +
            age +
            "\nGender : " +
            gender["name"]
        );
        if (userConfirm) {
          var employee = new Employee();

          employee.name = name;
          employee.age = age;
          employee.gender = gender;
          data = "employee=" + JSON.stringify(employee);
          add("./../server/controller/employeeController", data);
          fillEmployeeTable();
          clearForm();
        }
      } else {
        alert("error ... ");
      }
    }
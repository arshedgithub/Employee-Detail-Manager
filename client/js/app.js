import { get, add, deleteEmp } from "./http.js";
import { fillTable, fillCombo } from "./components.js";

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
    modalBtn.classList.add("btn-primary")
    modalBtn.innerHTML = 'Modify'
    confirmTxt.innerHTML = `Are you sure you want to modify this employee as \nName = <span>${datum.name}</span>\n<span>${datum.age}</span>`
    // var userConfirm = window.confirm("Are you sure to modify " + datum.name);
    // userConfirm ? alert("HI") : "";
  };  

  var deleteFunc = function (datum) {
    modalBtn.classList.add("btn-danger")
    modalBtn.innerHTML = 'Delete'
    confirmTxt.innerHTML = `Are you sure you want to delete this employee \nName = <span>${datum.name}</span>\n<span>${datum.age}</span>`
    // deleteEmp(
    //   "./../server/controller/employeeController.php?id=" + datum.id
    // );
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
      { btnText: " Modify", func: modifyFunc, btnColor: "primary", icon: 'pen-to-square' },
      { btnText: "", func: deleteFunc, btnColor: "danger", icon: 'trash-can' },
    ]
  );
}

function loadForm() {
  fillCombo(cmbGender, genders, "Select a Gender");
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
      var data = "employee=" + JSON.stringify(employee);
      add("./../server/controller/employeeController", data);
      fillEmployeeTable();
      clearForm();
    }
  } else {
    alert("error ... ");
  }
}

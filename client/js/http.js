// GET request 
function get(url) {
  var http = new XMLHttpRequest();

  // synchronous way
  http.open("GET", url, false);
  http.send();
  var data = JSON.parse(http.responseText);
  return data;

  // asynchronus way

  // http.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     var data = JSON.parse(this.responseText);
  //     fillCombo()
  //   }
  // };
}

// POST request 
function add(url, data) {
  var http = new XMLHttpRequest();

  http.open("POST", url, false);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.send(data);
}

// DELETE request 
function deleteEmp(url) {
  var http = new XMLHttpRequest();

  http.open("DELETE", url, false);
  http.send(null);
}

export {get, add, deleteEmp }

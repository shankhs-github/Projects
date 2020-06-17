// var first = [{
//   complaint_no : 'Masai/2020-21/1',
//   name : 'Shankhadeep Dhar',
//   date : '2020-06-17',
//   department : 'Current Student Issue',
//   issue : 'Python and Back-end Curriculum needs to be in focus more.',
//   status : 'Open',
// }]
// localStorage.setItem('all_complaints',JSON.stringify(first))

var data = JSON.parse(localStorage.getItem('all_complaints'))
var total_issue = data.length
var current_page = 1;
var per_page = 6;
var total_pages = Math.ceil(total_issue / per_page);

window.onload = function () {
    render_table();
  };

function complaint_no(){
    var current_complaint = total_issue + 1
    var temp = document.getElementById('complaint_no')
    temp.innerText = 'Ticket No : Masai/2020-21/'+ current_complaint
}
  
function add_issue() {

    var current_complaint = total_issue + 1
    var new_issue = {
      complaint_no: 'Masai/2020-21/'+ current_complaint,  
      name: document.getElementById("name").value,
      date: document.getElementById("date").value,
      department: document.getElementById("department").value,
      issue: document.getElementById("issue").value,
      status: 'Open',
      
    };
  
    var temp = localStorage.getItem("all_complaints");
    var data = JSON.parse(temp);
  
    data.push(new_issue);
    localStorage.setItem("all_complaints", JSON.stringify(data));
  
    total_issue++;
    total_pages = Math.ceil(total_issue / per_page);
    render_table();
  }
  
function render_table() {
    var table = document.getElementById("table");
    table.innerHTML = "";
  
    var render_data = JSON.parse(localStorage.getItem("all_complaints"));
  
    var to_item_no = current_page * per_page;
    if (to_item_no > total_issue) {
      to_item_no = total_issue;
    }
    
  
    for (var i = (current_page - 1) * per_page; i < to_item_no; i++) {
      var row = document.createElement("tr");
  
      var col1 = document.createElement("th");
      col1.setAttribute("scope", "row");
      col1.innerText = i + 1;
  
      var col2 = document.createElement("td");
      col2.innerText = render_data[i].complaint_no;
  
      var col3 = document.createElement("td");
      col3.innerText = render_data[i].name;
  
      var col4 = document.createElement("td");
      col4.innerText = render_data[i].date;
  
      var col5 = document.createElement("td");
      col5.innerText = render_data[i].department;

      var col6 = document.createElement("td");
      col6.innerText = render_data[i].issue;

      var col7 = document.createElement("td");
      col7.innerText = render_data[i].status;

      var col8 = document.createElement("td")
      var col8_2 = document.createElement("button")
      col8_2.setAttribute('class','btn btn-outline-primary btn-sm')
      col8_2.innerText = 'EDIT'
      col8.appendChild(col8_2)
  
      row.append(col1, col2, col3, col4, col5, col6, col7, col8);
      table.append(row);
    }
  
   //render_page_index();
  }
  
  function render_page_index() {
    var left_extreme = current_page - 2;
    var right_extreme = current_page + 2;
  
    if (left_extreme < 1) {
      left_extreme = 1;
      if (total_pages >= left_extreme + 4) {
        right_extreme = left_extreme + 4;
      } else {
        right_extreme = total_pages;
      }
    }
    if (right_extreme > total_pages) {
      right_extreme = total_pages;
      left_extreme = total_pages - 4;
    }
  
    var page_list = document.getElementById("pagination");
    page_list.innerHTML = "";
  
    var temp = document.createElement("li");
    temp.setAttribute("class", "page-item page-link");
    temp.setAttribute("id", "pre");
    temp.innerText = "Previous";
  
    page_list.append(temp);
  
    for (var i = left_extreme; i <= right_extreme; i++) {
      var temp = document.createElement("li");
  
      if (current_page == i) {
        temp.setAttribute("class", "page-item page-link colo");
      } else {
        temp.setAttribute("class", "page-item page-link");
      }
      temp.setAttribute("id", i);
      temp.innerText = i;
  
      page_list.append(temp);
    }
  
    var temp = document.createElement("li");
    temp.setAttribute("class", "page-item page-link");
    temp.setAttribute("id", "nex");
    temp.innerText = "Next";
  
    page_list.append(temp);
  
    page_list.addEventListener("click", page_form);
  }
  
  function page_form() {
    var page_number = event.target.id;
  
    if (page_number == "pre" && current_page == 1) {
      page_number = 1;
    } else if (page_number == "pre" && current_page > 1) {
      page_number = current_page - 1;
    } else if (page_number == "nex" && current_page == total_pages) {
      page_number = total_pages;
    } else if (page_number == "nex" && current_page < total_pages) {
      page_number = current_page + 1;
    } else {
      page_number = Number(page_number);
    }
  
    current_page = Number(page_number);
  
    render_table();
  }
  
  function sort() {
    var local_sort = JSON.parse(localStorage.getItem("all_data"));
  
    var sort = document.getElementById("sort_by").value;
  
    local_sort = local_sort.sort(function (a, b) {
      if (a[sort] > b[sort]) {
        return 1;
      } else {
        return -1;
      }
    });
  
    localStorage.setItem("all_data", JSON.stringify(local_sort));
  
    render_table();
  }
  
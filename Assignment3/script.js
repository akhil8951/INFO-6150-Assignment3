//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");


function addRecord(){
  var table = document.getElementById("myTable");
  var tbody = document.getElementsByTagName("tbody")[0];
  console.log(tbody);
  var studentName = tbody?.lastElementChild?.previousElementSibling?.cells[1]?.innerHTML || 'Student 0' ;
  var studentNameIndex = studentName.split(" ")[1];

  // var studentNameX = tbody.lastElementChild.lastElementChild
  // console.log(studentNameX);

  var trNode = document.createElement("tr");
  var tdFirstCell = document.createElement("td");
  tdFirstCell.innerHTML = '<input type="checkbox" onClick="onClickCheckbox(this)" /><br /><br /><img onclick="dropDown(this)" id="downArrow" src="down.png" width="25px" />';
  var tdStudentCell = document.createElement("td");
  tdStudentCell.innerHTML = 'Student ' + (parseInt(studentNameIndex) + 1); 
  var tdTeacherCell = document.createElement("td");
  tdTeacherCell.innerHTML = 'Teacher ' + (parseInt(studentNameIndex) + 1); 
  var awardCell = document.createElement("td");
  awardCell.innerHTML = 'Approved';
  var semCell = document.createElement('td');
  semCell.innerHTML = 'Fall'
  var typeCell = document.createElement('td');
  typeCell.innerHTML = 'TA';
  var budgetCell = document.createElement('td')
  
  var firstNumber = parseInt(studentNameIndex);
  var patternLength = 5;
  var budget = ''
  for(var i = 1; i <= patternLength; i++ ){
    budget += firstNumber + i;
  }

  budgetCell.innerHTML = budget;
  var percentCell = document.createElement('td');
  percentCell.innerHTML = '100%';

  var trSecondNode = document.createElement('tr');
  trSecondNode.classList.add("dropDownTextArea")
  var secRowFirstCell = document.createElement('td');
  secRowFirstCell.colSpan = 8;
  secRowFirstCell.innerHTML = 'Advisor:<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br />';
  

  trNode.appendChild(tdFirstCell);
  trNode.appendChild(tdStudentCell);
  trNode.appendChild(tdTeacherCell);
  trNode.appendChild(awardCell);
  trNode.appendChild(semCell);
  trNode.appendChild(typeCell)
  trNode.appendChild(budgetCell);
  trNode.appendChild(percentCell);
  tbody.appendChild(trNode);
  trSecondNode.appendChild(secRowFirstCell);
  tbody.appendChild(trSecondNode);

  if(studentNameIndex > 0){
    alert('Student '+ (parseInt(studentNameIndex) + 1)+ ' Record added Successfully' );
  }
  else if(studentNameIndex == 0){
    alert('Student 1 Record added Successfully' );
  }else{
    alert('Student '+ (parseInt(studentNameIndex) + 1)+ ' Record failed to add' );
  }
}


function dropDown(image){
  var rowDropDown = image.parentElement.parentElement;
  var nextRow = rowDropDown.nextElementSibling;
  var Index = nextRow.rowIndex;
  //console.log(Index)
  nextRow.style.display = nextRow.style.display === 'none' ? 'table-row' : 'none';
  console.log('operation working');
}

var tableHeaderFlag = false;
var count = 0;

var delColumnHead = document.createElement('th')
delColumnHead.innerHTML = '<th>DELETE</th>';

var editColumnHead = document.createElement('th')
editColumnHead.innerHTML = '<th>EDIT</th>';

var table = document.getElementById("myTable")
var headRow = table.rows[0]
console.log(headRow);

var submitButton = document.getElementById('button')

function onClickCheckbox(checkbox){
  var rowSelected = checkbox.parentElement.parentElement;
  console.log(rowSelected);

  
  

  if(checkbox.checked == true){
    count++;
    rowSelected.style.backgroundColor ="yellow"
    var delButton = document.createElement('td')

    delButton.innerHTML = '<button onClick="onClickDelete(this)">Delete</button>'
    rowSelected.appendChild(delButton);

    var editButton = document.createElement('td')
    editButton.innerHTML = '<button data-modal-target="#modal" onClick="onClickEdit(this) ">Edit</button>'
    rowSelected.appendChild(editButton)

    if(!tableHeaderFlag){
      headRow.appendChild(delColumnHead)
      headRow.appendChild(editColumnHead)
      tableHeaderFlag = true
    }

    submitButton.style.backgroundColor = "Orange";
    console.log("count in if block " + count);
  }else{
    count--;
    if(count <1 ){
      submitButton.style.backgroundColor = "";
      if(tableHeaderFlag == true){
        headRow.deleteCell(9)
        headRow.deleteCell(8)
      }
      tableHeaderFlag = false
    }
    rowSelected.style.backgroundColor = ""
    rowSelected.deleteCell(9)
    rowSelected.deleteCell(8)
    
    

    console.log("count in else block: " + count);
  }
  // console.log('you are clicking checkbox');
}

function onClickDelete(rowDelete){
  var tbody = document.getElementsByTagName("tbody")[0];
  var table = document.getElementById('myTable');
  var rowToDelete = rowDelete.parentElement.parentElement;
  index = rowToDelete.rowIndex;
  var studentName = rowToDelete.cells[1].innerHTML;
  var studentNameIndex = studentName.split(" ")[1];
  count--;

  if(count < 1){
    submitButton.style.backgroundColor = "";
    if(tableHeaderFlag == true){
      headRow.deleteCell(9)
      headRow.deleteCell(8)
    }
    tableHeaderFlag = false
  }

  console.log('count after deleting: ' + count);
  table.deleteRow(index);
  table.deleteRow(index);

  alert('Student '+ studentNameIndex + ' record has been deleted.')
  
}

function onClickEdit(editButton){
  var rowToEdit = editButton.parentElement.parentElement;
  index = rowToEdit.rowIndex;
  var studentName = rowToEdit.cells[1].innerHTML;
  var studentNameIndex = studentName.split(" ")[1];


  var modalTitle = "Edit the details of student " + studentNameIndex;
  document.getElementById('modalTitle').innerHTML = modalTitle;
  modal = document.getElementById('modal');
  modal.style.display = 'block';
  var studentNameField = document.getElementById('studentName');
  studentNameField.value = studentName;

  var teacherNameField = document.getElementById('teacherName')
  var teacherName = rowToEdit.cells[2].innerHTML;
  teacherNameField.value = teacherName

  var awardStatusField = document.getElementById('awardStatus')
  var awardStatus = rowToEdit.cells[3].innerHTML;
  awardStatusField.value = awardStatus;

  var semesterField = document.getElementById('semester')
  var semester = rowToEdit.cells[4].innerHTML;
  semesterField.value = semester;

  var typeField = document.getElementById('type')
  var type = rowToEdit.cells[5].innerHTML;
  typeField.value = type;

  var budgetField = document.getElementById('budget')
  var budget = rowToEdit.cells[6].innerHTML;
  budgetField.value = budget;

  var percentField = document.getElementById('percentage')
  var percent = rowToEdit.cells[7].innerHTML;
  percentField.value = percent;


}

function onClickUpdate(){

  modalTitle = document.getElementById('modalTitle')
  studentNameIndex = modalTitle.innerHTML.split(" ")[5];
  alert("Student " + studentNameIndex + " data updated successfully!")
  modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function onClickCancel(){
  modal = document.getElementById('modal')
  modal.style.display = 'none';
}
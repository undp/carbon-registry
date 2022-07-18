<script>

function createHiddenField(name, value, formName){
	if(document.getElementsByName(name).length != 0) { //already exist
		
	}else{
	var input = document.createElement("input");
	input.setAttribute("type", "hidden");
	input.setAttribute("name", name);
	input.setAttribute("value", value); 
	document.getElementById(formName).appendChild(input);
	}
}

//Making the table row editable
function editableRow(tableName) {
	var table = document.getElementById(tableName);
	var rowLength = table.rows.length;
	for (i = 1; i < rowLength; i++){
	    var cells = table.rows.item(i).cells;
	    for(var j = 0; j < cells.length; j++){
	        var cell = cells.item(j);
	        cell.setAttribute("contenteditable", true);
	        cell.setAttribute("style", 'color:black');
	    }
	}
	
}

function selectRow(tableName) {
	var table = document.getElementById(tableName);
	var rowLength = table.rows.length;
	for (i = 0; i < rowLength; i++){
	    var cells = table.rows.item(i).cells;
	    var cell = cells.item(cells.length-1);
	  	cell.style.display = "none";	
 	}
}

function deleteRow(tableName) {
	var table = document.getElementById(tableName);
	var rowLength = table.rows.length;
    for (i = rowLength-1; i > 0; i--){
       var cells = table.rows.item(i).cells;
       var cell = cells.item(4);
       if (cell.getElementsByTagName('input')[0].checked==true)
       {
    	   table.deleteRow(i);
       } 
    } 

}

function insertRow(tableName) {
	var table = document.getElementById(tableName);
    var length = table.rows.length;
    var x = table.insertRow(length);
    var cells = table.rows.item(0).cells;
    var cellLength = cells.length;
    for(var j = 0; j < cellLength; j++){
    	var e = x.insertCell(j);
    	if(j==cellLength-1){
    		var element = document.createElement('input');
    	    element.type = 'checkbox';
    	    e.appendChild(element);		
    	}
    }
    editableRow(tableName);
    

}


function handleButtons(fromApproval, selectedProjectId){
	 
	if(fromApproval!='null'){
		 var submitButton = document.getElementById('submitButton');
		 submitButton.style.display = "none"; 
		 
		 var button = document.getElementById('approvalButton');
		 button.style.display = "block";
		 
		 var button2 = document.getElementById('rejectionButton');
		 button2.style.display = "block";
		 
		 var element = document.getElementById('commentButton');
		 element.style.display = "block";

		 var projectSelect = document.getElementById('projectId');
		 projectSelect.options[0] = new Option(selectedProjectId, selectedProjectId);
		
		 /* var element = document.getElementById('insertRow');
		 element.style.display = "none";

		 var element = document.getElementById('deleteRow');
		 element.style.display = "none"; 
		 
		 selectRow(tableName);*/
		 
	 }
	
}

function handleButtonsGHG(fromApproval, selectedProjectId){
	 
	if(fromApproval!='null'){
		 var submitButton = document.getElementById('submitButton');
		 submitButton.style.display = "none"; 
		 
		 var button = document.getElementById('approvalButton');
		 button.style.display = "block";
		 
		 var button2 = document.getElementById('rejectionButton');
		 button2.style.display = "block";
		 
		 var element = document.getElementById('commentButton');
		 element.style.display = "block";
		 
		 var element2 = document.getElementById('add');
		 element2.style.display = "none";
		 
	 }
	
}

function handleButtonsGHG1(fromApproval, selectedProjectId){
	 
	if(fromApproval!='null'){
		 var submitButton = document.getElementById('submitButton');
		 submitButton.style.display = "none"; 
		 
		 var button = document.getElementById('approvalButton');
		 button.style.display = "block";
		 
		 var button2 = document.getElementById('rejectionButton');
		 button2.style.display = "block";
		 
		 var element = document.getElementById('commentButton');
		 element.style.display = "block";
		 
		 var element2 = document.getElementById('add');
		 element2.style.display = "none";
		 
		 var element3 = document.getElementById('add2');
		 element3.style.display = "none";
		 
	 }
	
}

function handleButtonsGHG2(fromApproval, selectedProjectId){
	 
	if(fromApproval!='null'){
		 var submitButton = document.getElementById('submitButton');
		 submitButton.style.display = "none"; 
		 
		 var button = document.getElementById('approvalButton');
		 button.style.display = "block";
		 
		 var button2 = document.getElementById('rejectionButton');
		 button2.style.display = "block";
		 
		 var element = document.getElementById('commentButton');
		 element.style.display = "block";
		 
	 }
	
}


</script>
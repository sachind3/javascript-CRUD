let selectedIndex = null;
let empForm = document.getElementById('empForm');
empForm.addEventListener('submit', submitForm)
let submitBtn = document.getElementById('submitBtn');
let resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', clearForm)
function clearForm() {
    resetForm();
    submitBtn.innerHTML = 'Submit'

}
showTable();

function submitForm(e) {
    e.preventDefault();

    let formData = readFormData();
    if (validate()) {
        insertNewRecord(formData)
        console.log(formData)
    } else {
    }
    resetForm();
}

function readFormData() {
    let formData = {
        userName: document.getElementById('userName').value,
        userCode: document.getElementById('userCode').value,
        userSalary: document.getElementById('userSalary').value
    }
    return formData;
}

function insertNewRecord(data) {
    let info = localStorage.getItem('info');
    let infoData;

    if (info == null) {
        infoData = [];
        alert();
    } else {
        infoData = JSON.parse(info);
    }
    if (selectedIndex == null) {
        infoData.push(data);
    } else {
        infoData.splice(selectedIndex, 1, data)
    }
    localStorage.setItem('info', JSON.stringify(infoData));
    showTable();
}

function resetForm() {
    selectedIndex = null;
    empForm.reset();
}

function validate() {
    isValid = true;
    if (document.getElementById('userName').value == '') {
        isValid = false;
        alert('Please enter name')
    } else {
        isValid = true;
    }
    return isValid;
}


function showTable() {
    let info = localStorage.getItem('info');
    let infoData;
    if (info == null) {
        infoData = [];

    } else {
        infoData = JSON.parse(info);
    }
    console.log(info)
    let table = document.getElementById('table').getElementsByTagName('tbody')[0];
    let uiString = '';

    infoData.forEach(function (elem, index) {
        uiString += `
                        <tr>
                            <td>${elem.userName}</td>
                            <td>${elem.userCode}</td>
                            <td>${elem.userSalary}</td>
                            <td>
                                <a href="javascript:void(0)" id="${index}" onclick="onEdit(this.id)">Edit<a>
                                <a href="javascript:void(0)" id="${index}" onclick="onDelete(this.id)">Delete<a>
                            </td>
                        </tr>
        `
    });
    if (infoData != 0) {
        table.innerHTML = uiString
    } else {
        table.innerHTML = `<tr><td colspan="4">No data found</td></tr>`
    }
    submitBtn.innerHTML = 'Submit'
}
function onDelete(index) {
    let info = localStorage.getItem('info');
    let infoData;
    if (info == null) {
        infoData = [];
    } else {
        infoData = JSON.parse(info);
    }
    if (confirm('Are you sure to delete this record ?')) {
        infoData.splice(index, 1)
        localStorage.setItem('info', JSON.stringify(infoData));
        showTable();
    }
}

function onEdit(index) {
    selectedIndex = index;
    let info = localStorage.getItem('info');
    let infoData;
    if (info == null) {
        infoData = [];
    } else {
        infoData = JSON.parse(info);
    }
    document.getElementById('userName').value = infoData[index].userName;
    document.getElementById('userCode').value = infoData[index].userCode;
    document.getElementById('userSalary').value = infoData[index].userSalary;

    submitBtn.innerHTML = 'Update'
}
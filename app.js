console.log('js is working normal')

let myForm = document.getElementById('myForm');
myForm.addEventListener('submit', submitForm);
let resetBtn = document.getElementById('resetBtn');
let userRole = document.getElementById('userRole');
let roles = ['Accountant', 'Developer', 'Sales', 'Designer', 'Manager', 'Other'];
roles.forEach(function (elem, index) {
    let option = document.createElement('option');
    option.textContent = elem;
    option.value = elem;
    userRole.appendChild(option);
});

showData();
let selectIndex = null;
class Fields {
    constructor(name, email, phone, gender, dob, role) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.dob = dob;
        this.role = role;
    }
}
class Lead extends Fields {
    addData(fields) {
        let info = localStorage.getItem('info');
        let infoData;
        if (info == null) {
            infoData = []
        } else {
            infoData = JSON.parse(info);
        }
        let infoObj = {
            name: fields.name,
            email: fields.email,
            phone: fields.phone,
            gender: fields.gender,
            dob: fields.dob,
            role: fields.role,
        }
        if (selectIndex == null) {
            infoData.unshift(infoObj);
        } else {
            infoData.splice(selectIndex, 1, infoObj);
        }
        localStorage.setItem('info', JSON.stringify(infoData));
    }
    validate(fields) {
        if (fields.name.length > 0 && fields.role != 'Select Role') {
            return true;
        } else {
            return false
        }
    }
    resetForm() {
        myForm.reset();
    }
}

function submitForm(e) {
    e.preventDefault();
    let userName = document.getElementById('userName').value;
    let userEmail = document.getElementById('userEmail').value;
    let userPhone = document.getElementById('userPhone').value;
    let userGender;
    if (document.getElementById('male').checked) {
        userGender = 'M'
    } else if (document.getElementById('female').checked) {
        userGender = 'F'
    }
    let userDOB = document.getElementById('userDOB').value;
    let userRole = document.getElementById('userRole');
    let myRole = userRole.options[userRole.selectedIndex].value;
    console.log(myRole)

    let fields = new Fields(userName, userEmail, userPhone, userGender, userDOB, myRole);
    console.log(fields);
    let lead = new Lead();
    if (lead.validate(fields)) {
        lead.addData(fields)
        showData();
        alert('Data has been successfully added to the database')
    } else {
        alert('Please enter valid value')
    }
    submitBtn.innerHTML = "Submit"
    lead.resetForm();
}
function showData() {
    let info = localStorage.getItem('info');
    let infoData;
    if (info == null) {
        infoData = []
    } else {
        infoData = JSON.parse(info);
    }
    console.log(infoData)
    let tbody = document.getElementById('tbody');
    let uiString = '';
    infoData.forEach(function (elem, index) {
        uiString += `
                    <tr>
                        <td>${elem.name}</td>
                        <td>${elem.email}</td>
                        <td>${elem.phone}</td>
                        <td>${elem.gender}</td>
                        <td>${elem.dob}</td>
                        <td>${elem.role}</td>
                        <td>
                            <a href="javascript:void(0);" data-edit="${index}" onclick="editData(this.getAttribute('data-edit'))">Edit</a>
                            <a href="javascript:void(0);" data-delete="${index}" onclick="deleteData(this.getAttribute('data-delete'))">Delete</a>
                        </td>
                    </tr>
        `
    });
    if (infoData != 0) {
        tbody.innerHTML = uiString
    } else {
        tbody.innerHTML = `<tr><td colspan="7">No data found</td></tr>`
    }
    document.getElementById('rowCounts').innerHTML = infoData.length;
}
function deleteData(index) {
    console.log(index)
    let info = localStorage.getItem('info');
    let infoData;
    if (info == null) {
        infoData = []
    } else {
        infoData = JSON.parse(info);
    }
    if (confirm('Are you sure to delete this data?')) {
        infoData.splice(index, 1);
        localStorage.setItem('info', JSON.stringify(infoData))
        showData();
    }
}

function editData(index) {
    selectIndex = index;
    console.log(index)
    let info = localStorage.getItem('info');
    let infoData;
    if (info == null) {
        infoData = []
    } else {
        infoData = JSON.parse(info);
    }

    document.getElementById('userName').value = infoData[index].name;
    document.getElementById('userEmail').value = infoData[index].email;
    document.getElementById('userPhone').value = infoData[index].phone;
    if (infoData[index].gender == 'M') {
        document.getElementById('male').checked = true;
    } else if (infoData[index].gender == 'F') {
        document.getElementById('female').checked = true;
    }
    document.getElementById('userDOB').value = infoData[index].dob;
    document.getElementById('userRole').value = infoData[index].role;

    submitBtn.innerHTML = "Update";

}
resetBtn.addEventListener('click', resetFormData)
function resetFormData() {
    selectIndex = null;
    let lead = new Lead();
    lead.resetForm();
}
let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', searchMagic)
function searchMagic() {
    let searchKey = searchInput.value.toUpperCase();
    let tbody = document.getElementById('tbody');
    let tr = tbody.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(searchKey) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}
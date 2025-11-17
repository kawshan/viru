window.addEventListener('load', function () {

    refreshStudentMasterForm();

    refreshStudentMasterTable();


})


const refreshStudentMasterForm = () => {

    studentMaster = new Object();


    selectSchool.style.border = "2px solid #ced4da";
    textStudentFullName.style.border = "2px solid #ced4da";
    textStudentAdmissionNumber.style.border = "2px solid #ced4da";
    selectGrade.style.border = "2px solid #ced4da";
    textPermanentAddress.style.border = "2px solid #ced4da";
    textGuardianFullName.style.border = "2px solid #ced4da";
    textGuardianNic.style.border = "2px solid #ced4da";
    textMobileNumber.style.border = "2px solid #ced4da";
    textHomeNumber.style.border = "2px solid #ced4da";
    selectStudentStatus.style.border = "2px solid #ced4da";

    textStudentFullName.value = "";
    textPermanentAddress.value = "";
    textStudentAdmissionNumber.value = "";
    textGuardianFullName.value = "";
    textGuardianNic.value = "";
    textMobileNumber.value = "";
    textHomeNumber.value = "";
    selectStudentStatus.value = "";

    schoolList = ajaxGetRequest("/school-master/findAll");
    fillDataIntoSelect(selectSchool, 'Select School', schoolList, 'school_master_name');


    gradeList = ajaxGetRequest("/grade/findall");
    fillDataIntoSelect(selectGrade, 'Select Grade', gradeList, 'name');

    buttonSaveStudentMaster.disabled=false;
    buttonSaveStudentMaster.style.cursor="default";

    buttonUpdateStudentMaster.disabled = true
    buttonUpdateStudentMaster.style.cursor="not-allowed";

}


const refreshStudentMasterTable = () => {

    const resultList = ajaxGetRequest("student/findall");

    const displayProperty = [
        {dataType: 'function', propertyName: getSchoolName},
        {dataType: 'text', propertyName: 'student_master_full_name'},
        {dataType: 'function', propertyName: getGrade},
        {dataType: 'text', propertyName: 'student_master_permenent_residence'},
        {dataType: 'text', propertyName: 'student_master_guardian_full_name'},
        {dataType: 'text', propertyName: 'student_master_guardian_contact_no_mobile'},
        {dataType: 'text', propertyName: 'student_master_guardian_contact_no_home'},

    ];

    if ($.fn.DataTable.isDataTable("#tableStudentMaster")) {
        $("#tableStudentMaster").DataTable().destroy();
    }

    fillDataIntoTable2(tableStudentMaster, resultList, displayProperty, true, divModifyButton);
    $("#tableStudentMaster").dataTable();

}


const getSchoolName = (ob) => {
    return ob.school_master_id.school_master_name;

}

const getGrade = (ob) => {
    return ob.grade_id.name;
}


const checkErrors = () => {
    let errors = "";


    if (studentMaster.school_master_id == null) {
        errors = errors + "School cannot be empty \n"
    }

    if (studentMaster.student_master_full_name == null) {
        errors = errors + "Student full name cannot be empty \n"
    }

    if (studentMaster.grade_id == null) {
        errors = errors + "Grade Cannot Be Empty \n"
    }

    if (studentMaster.student_master_permenent_residence == null) {
        errors = errors + "Permanent residence cannot be empty \n"
    }

    if (studentMaster.student_master_guardian_full_name == null) {
        errors = errors + "Guardian cannot be empty \n";
    }

    if (studentMaster.student_master_guardian_contact_no_mobile == null) {
        errors = errors + "Contact number cannot be empty \n"
    }

    if (studentMaster.student_master_status == null) {
        errors = errors + "Status Cannot Be Empty \n"
    }


    return errors;
}


const saveStudentMaster = () => {

    const errors = checkErrors();
    if (errors === "") {
        const userConfirm = confirm(`Are you sure to add following Student\n
        Full name is ${studentMaster.student_master_full_name}
        School name is ${studentMaster.school_master_id.school_master_name}
        Grade is ${studentMaster.grade_id.name}
        Permanent Residence is ${studentMaster.student_master_permenent_residence} 
        Guardian name is ${studentMaster.student_master_guardian_full_name}
        Guardian contact number ${studentMaster.student_master_guardian_contact_no_mobile}
        Status is ${studentMaster.student_master_status}
        `);
        if (userConfirm) {
            const postServerResponse = ajaxPostRequest("/student", studentMaster);
            if (postServerResponse === "ok") {
                alert("save successful");
                refreshStudentMasterForm();
                refreshStudentMasterTable();
            } else {
                alert(`something went wrong \n ${postServerResponse}`)
            }
        }
    } else {
        alert(`you have following errors \n ${errors}`);
    }
}


const refillStudent = (ob) => {
    studentMaster = JSON.parse(JSON.stringify(ob));
    oldStudentMaster = JSON.parse(JSON.stringify(ob));

    textStudentFullName.value = studentMaster.student_master_full_name
    textStudentAdmissionNumber.value = studentMaster.student_master_addmission_no
    textPermanentAddress.value = studentMaster.student_master_permenent_residence
    textGuardianFullName.value = studentMaster.student_master_guardian_full_name
    textGuardianNic.value = studentMaster.student_master_guardian_nic
    textMobileNumber.value = studentMaster.student_master_guardian_contact_no_mobile
    textHomeNumber.value = studentMaster.student_master_guardian_contact_no_home
    selectStudentStatus.value = studentMaster.student_master_status

    schoolList = ajaxGetRequest("/school-master/findAll");
    fillDataIntoSelect(selectSchool, 'Select School', schoolList, 'school_master_name', studentMaster.school_master_id.school_master_name);


    gradeList = ajaxGetRequest("/grade/findall");
    fillDataIntoSelect(selectGrade, 'Select Grade', gradeList, 'name', studentMaster.grade_id.name);

    buttonSaveStudentMaster.disabled=true;
    buttonSaveStudentMaster.style.cursor="not-allowed";

    buttonUpdateStudentMaster.disabled = false;
    buttonUpdateStudentMaster.style.cursor="default";
}


const checkUpdates = () => {
    let updates = "";

    if (studentMaster.school_master_id.school_master_name !== oldStudentMaster.school_master_id.school_master_name) {
        updates = updates + "School is updated \n"
    }

    if (studentMaster.student_master_full_name !== oldStudentMaster.student_master_full_name) {
        updates = updates = "Full Name Is updated \n";
    }

    if (studentMaster.grade_id.name !== oldStudentMaster.grade_id.name) {
        updates = updates + "Grade is updated \n"
    }

    if (studentMaster.student_master_addmission_no !== oldStudentMaster.student_master_addmission_no) {
        updates = updates + "Admission no is updated \n"
    }

    if (studentMaster.student_master_permenent_residence !== oldStudentMaster.student_master_permenent_residence) {
        updates = updates + "Permanent residence is updated \n"
    }
    if (studentMaster.student_master_guardian_full_name !== oldStudentMaster.student_master_guardian_full_name) {
        updates = updates + "guardian is updated \n";
    }

    if (studentMaster.student_master_guardian_nic !== oldStudentMaster.student_master_guardian_nic) {
        updates = updates + "Guardian NIC is updated \n"
    }

    if (studentMaster.student_master_guardian_contact_no_mobile !== oldStudentMaster.student_master_guardian_contact_no_mobile) {
        updates = updates + "Guardian's contact number is updated \n"
    }

    if (studentMaster.student_master_guardian_contact_no_home !== oldStudentMaster.student_master_guardian_contact_no_home) {
        updates = updates + "Land No is updated \n"
    }

    if (studentMaster.student_master_status !== oldStudentMaster.student_master_status) {
        updates = updates + "Status is updated \n"
    }
    return updates;
}


const updateStudent = () => {
    const errors = checkErrors();
    if (errors === "") {
        const updates = checkUpdates();
        if (updates !== "") {
            const userConfirm = confirm(`Are you sure to update following changes \n ${updates}`);
            if (userConfirm) {
                const putServerResponse = ajaxPutRequest("/student", studentMaster);
                if (putServerResponse === "ok") {
                    alert("update successful");
                    refreshStudentMasterForm();
                    refreshStudentMasterTable();
                } else {
                    alert(`something went wrong \n ${putServerResponse}`);
                }
            }
        } else {
            alert("nothing to update");
        }


    } else {
        alert(`you have following errors \n ${errors}`);
    }
}


const deleteStudent = (ob) => {
    const userConfirm = confirm(`Are you sure to delete following Student\n
        Full name is ${ob.student_master_full_name}
        School name is ${ob.school_master_id.school_master_name}
        Grade is ${ob.grade_id.name}
        Permanent Residence is ${ob.student_master_permenent_residence} 
        Guardian name is ${ob.student_master_guardian_full_name}
        Guardian contact number ${ob.student_master_guardian_contact_no_mobile}
        Status is ${ob.student_master_status}
        `);

    if (userConfirm) {
        const deleteServerResponse = ajaxDeleteRequest("/student", ob);
        if (deleteServerResponse === "ok") {
            alert("delete Successful");
            refreshStudentMasterForm();
            refreshStudentMasterTable();
        } else {
            alert(`Something went wrong \n ${deleteServerResponse}`);
        }
    }
}









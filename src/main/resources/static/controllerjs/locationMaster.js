window.addEventListener('load', () => {

    refreshLocationForm();


    refreshLocationTable();

    loadLocationPrintTable();
})


const refreshLocationForm = () => {

    locationMaster = new Object();


    textLocationName.style.border = "2px solid #ced4da";
    textLocationCode.style.border = "2px solid #ced4da";
    selectLocationStatus.style.border = "2px solid #ced4da";

    textLocationName.value = "";
    textLocationCode.value = "";
    selectLocationStatus.value = "";


    buttonLocationUpdate.disabled = true;
    buttonLocationSave.disabled = false;


    buttonLocationUpdate.style.cursor = "not-allowed"
    buttonLocationSave.style.cursor = "default"

}


const refreshLocationTable = () => {

    const result = ajaxGetRequest("/location-master/findall");


    const displayProperties = [
        {dataType: "text", propertyName: "location_master_name"},
        {dataType: "text", propertyName: "location_master_code"},
        {dataType: "function", propertyName: getLocationMasterStatus}
    ];

    // Check if DataTable is already initialized and destroy it
    if ($.fn.DataTable.isDataTable("#tableItemMaster")) {
        $("#tableItemLocationMaster").DataTable().destroy();
    }


    fillDataIntoTable2(tableItemLocationMaster, result, displayProperties, true, divModifyButton);

    $("#tableItemLocationMaster").dataTable();

}


const getLocationMasterStatus = (ob) => {
    if (ob.location_master_status === true) {
        return `<p>Active</p>`
    } else {
        return `<p>Inactive</p>`
    }
}

const checkError = () => {
    let errors = "";

    if (locationMaster.location_master_code == null) {
        errors = errors + "Code Cannot Be Empty \n"
    }

    if (locationMaster.location_master_name == null) {
        errors = errors + "Name Cannot Be Empty \n"
    }

    if (locationMaster.location_master_status == null) {
        errors = errors + "Status Cannot Be Empty \n"
    }


    return errors;
}


const submitLocationMaster = () => {

    const errors = checkError();
    if (errors === "") {
        const userConfirm = confirm(`Are You Sure To Add Following Information 
        \n name is ${locationMaster.location_master_name}
        \n code is ${locationMaster.location_master_code}
        \n status is ${locationMaster.location_master_status}
        `);
        if (userConfirm) {
            const serverResponse = ajaxPostRequest("/location-master", locationMaster);
            if (serverResponse === "ok") {
                alert("Save Successful");
                refreshLocationTable();
                refreshLocationForm();
            } else {
                alert(`save Unsuccessful \n ${serverResponse}`)
            }
        }
    } else {
        alert(`You Have Following Errors \n ${errors}`)
    }
}


const refillLocation = (ob) => {
    locationMaster = JSON.parse(JSON.stringify(ob));
    oldLocationMaster = JSON.parse(JSON.stringify(ob));

    textLocationName.value = ob.location_master_name
    textLocationCode.value = ob.location_master_code
    selectLocationStatus.value = ob.location_master_status


    buttonLocationUpdate.disabled = false;
    buttonLocationSave.disabled = true;


    buttonLocationUpdate.style.cursor = "default"
    buttonLocationSave.style.cursor = "not-allowed"

}


const checkUpdates = () => {
    let updates = "";

    if (oldLocationMaster.location_master_name !== locationMaster.location_master_name) {
        updates = updates + "name is updated \n"
    }

    if (oldLocationMaster.location_master_code !== locationMaster.location_master_code) {
        updates = updates + "code is updated \n"
    }

    if (oldLocationMaster.location_master_status !== locationMaster.location_master_status) {
        updates = updates + "status is updated \n"
    }
    return updates;
}


const updateLocation = () => {

    const updates = checkUpdates();
    if (updates !== "") {
        const userConfirm = confirm(`are you sure to update following information \n ${updates}`);
        if (userConfirm) {
            const serverResponse = ajaxPutRequest("/location-master", locationMaster);
            if (serverResponse === "ok") {
                alert(`update successful`);
                refreshLocationTable();
                refreshLocationForm();
                divModifyButton.classList.add('d-none');

            } else {
                alert(`update unsuccessful \n ${serverResponse}`)
            }
        }
    } else {
        alert(`nothing to update`)
    }


}

const deleteLocation = (ob) => {
    const userConfirm = confirm(`Are You Sure To delete Following Information 
        \n name is ${ob.location_master_name}
        \n code is ${ob.location_master_code}
        \n status is ${ob.location_master_status}
        `);

    if (userConfirm) {
        const serverResponse = ajaxDeleteRequest("/location-master", ob);
        if (serverResponse === "ok") {
            alert(`delete success`);
            refreshLocationTable();
            refreshLocationForm();
            divModifyButton.classList.add('d-none');
        } else {
            alert(`delete unsuccessful`);
            refreshLocationTable();
            refreshLocationForm();
        }
    }
}


const loadLocationPrintTable = () => {
    const result = ajaxGetRequest("/location-master/findall");


    const displayProperties = [
        {dataType: "text", propertyName: "location_master_name"},
        {dataType: "text", propertyName: "location_master_code"},
        {dataType: "function", propertyName: getLocationMasterStatus}
    ];


    fillDataIntoTable2(tableLocationPrint, result, displayProperties, false);

}


const printLocationTable = async () => {
    const newWindow = window.open();
    await newWindow.document.write(
        `
                <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Location print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body style="font-family: Verdana; font-size: 11px">
<div class="container-fluid">

    <div class="row text-center">
        <p style="font-size: 14px; font-weight: bolder">Location Details</p>
    </div>
<div>
${tableLocationPrint.outerHTML}
</div>
</div>
</body>
</html>
        `
    );
    newWindow.stop();
    newWindow.print();
    newWindow.close();

}








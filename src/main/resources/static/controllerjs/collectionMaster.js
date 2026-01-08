window.addEventListener('load', function () {

    refreshCollectionMasterDetailsForm();

    refreshCollectionMasterForm();

    refreshCollectionHeaderTable();

    refreshPendingCollections();


    refreshPendingCollectionsForPrint();
})


const refreshCollectionMasterForm = () => {

    collectionHeader = new Object();

    selectCustomer.style.border = "2px solid #ced4da";
    textHeaderDate.style.border = "2px solid #ced4da";
    textHeaderNumber.style.border = "2px solid #ced4da";
    textProHeaderKey.style.border = "2px solid #ced4da";

    selectCustomer.value = "";
    textHeaderDate.value = "";
    textHeaderNumber.value = "";
    textProHeaderKey.value = "";


    customersList = ajaxGetRequest("/customer-master/findall");
    fillDataIntoDataListWithTwoValues(dataListCustomer, customersList, 'customer_name', 'customer_mobile');


    buttonCollectionDetailsAdd.disabled=true;
    buttonCollectionDetailsAdd.style.cursor="not-allowed";

    buttonCollectionDetailsUpdate.disabled=true;
    buttonCollectionDetailsUpdate.style.cursor="not-allowed";


}

const refreshColorsCollectionMasterFrom = () => {
    selectCustomer.style.border = "2px solid #ced4da";
    textHeaderDate.style.border = "2px solid #ced4da";
    textHeaderNumber.style.border = "2px solid #ced4da";
    textProHeaderKey.style.border = "2px solid #ced4da";
}

const refreshCollectionHeaderTable = () => {

    headersList = ajaxGetRequest("/collection-master/findall");

    displayProperty = [
        {dataType: 'function', propertyName: getCustomerName},
        {dataType: 'text', propertyName: 'collection_master_header_date'},
        {dataType: 'text', propertyName: 'collection_master_header_added_user'},
        {dataType: 'text', propertyName: 'collection_master_header_key'},
        {dataType: 'text', propertyName: 'collection_master_header_number'},
    ];

    // Check if DataTable is already initialized and destroy it
    if ($.fn.DataTable.isDataTable("#tableCollectionHeader")) {
        $("#tableCollectionHeader").DataTable().destroy();
    }


    fillDataIntoTable2(tableCollectionHeader, headersList, displayProperty, true, divModifyButton2);
    $("#tableCollectionHeader").dataTable();

}


const getCustomerName = (ob) => {
    return ob.customer_master_id.customer_name;
}


const checkErrorsInCollectionHeaderForm = () => {
    let errors = ""

    if (collectionHeader.customer_master_id === null) {
        errors = errors + "Customer Name Cannot Be Empty \n"
    }

    if (collectionHeader.collection_master_header_date === null) {
        errors = errors + "Date Cannot Be Empty \n"
    }
    return errors;
}


const saveOrUpdateCollectionHeader = async () => {

    const user = JSON.parse(localStorage.getItem('loggedUser'));
    collectionHeader.collection_master_header_added_user = user.username;


    if (textProHeaderKey.value == "") {
        console.log(`save part`);
        let errors = checkErrorsInCollectionHeaderForm();
        if (errors == "") {
            const userConfirm = confirm(`Are you sure to add following Collection Information?
            Customer name is ${collectionHeader.customer_master_id.customer_name}
            Date is ${collectionHeader.collection_master_header_date}
            Added user is ${collectionHeader.collection_master_header_added_user}

            `);
            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/collection-master", collectionHeader);
                if (postServerResponse && postServerResponse.collection_master_header_key) {
                    alert(`Save Success`);
                    textHeaderNumber.value = postServerResponse.collection_master_header_number;
                    textProHeaderKey.value = postServerResponse.collection_master_header_key;
                    refreshColorsCollectionMasterFrom();
                    refreshCollectionHeaderTable();
                    refreshCollectionMasterDetailsForm();
                } else {
                    alert(`Error occurred \n ${postServerResponse}`);
                }
            }
        } else {
            alert(`You have following errors \n ${errors}`)
        }
    } else {
        console.log(`update part`);
        const errors = checkErrorsInCollectionHeaderForm();
        if (errors == "") {
            const getIdFromHeaderKey = await ajaxGetRequest(`/collection-master/findIdByHeaderKey/${textProHeaderKey.value}`);
            collectionHeader.id = Number(getIdFromHeaderKey);
            collectionHeader.collection_master_header_key = textProHeaderKey.value;
            collectionHeader.collection_master_header_number = textHeaderNumber.value;
            const userConfirm = confirm(`Are you sure to update following information
            Customer name is ${collectionHeader.customer_master_id.customer_name}
            Date is ${collectionHeader.collection_master_header_date}
            Code is ${collectionHeader.collection_master_header_key}
            Number is ${collectionHeader.collection_master_header_number}
            `);
            if (userConfirm) {
                const putServerResponse = ajaxPutRequest("/collection-master", collectionHeader);
                if (putServerResponse == "ok") {
                    alert(`Update Success`)
                    refreshColorsCollectionMasterFrom();
                    refreshCollectionHeaderTable();
                    divModifyButton2.classList.add('d-none');
                    refreshCollectionMasterDetailsForm();
                } else {
                    alert(`Update Unsuccessful ${putServerResponse}`);
                }
            }

        } else {
            alert(`you have following errors \n ${errors}`);
        }
    }
}

const refillCollectionHeader = (ob) => {

    const user = JSON.parse(localStorage.getItem('loggedUser'));

    if (user.role == "admin"){
        collectionHeader = JSON.parse(JSON.stringify(ob));
        oldCollectionHeader = JSON.parse(JSON.stringify(ob));

        selectCustomer.value = collectionHeader.customer_master_id.customer_name
        textHeaderDate.value = collectionHeader.collection_master_header_date
        textHeaderNumber.value = collectionHeader.collection_master_header_number
        textProHeaderKey.value = collectionHeader.collection_master_header_key

        refreshCollectionMasterDetailsTable();
        refreshCollectionMasterDetailsForm();
    }else {
        alert(`You have no privileges to perform this task`);
    }

}


const deleteCollectionHeader = (ob) => {

    const user = JSON.parse(localStorage.getItem('loggedUser'));

    if (user.role == "admin"){
        const userConfirm = confirm(`Are you sure to delete following information
            Customer name is ${ob.customer_master_id.customer_name}
            Date is ${ob.collection_master_header_date}
            Code is ${ob.collection_master_header_key}
            Number is ${ob.collection_master_header_number}
            `);
        if (userConfirm) {
            const deleteServerResponse = ajaxDeleteRequest("/collection-master", ob);
            if (deleteServerResponse == "ok") {
                alert('Delete successful');
            } else {
                alert(`Delete unsuccessful \n ${deleteServerResponse}`);
            }
            refreshCollectionMasterForm();
            refreshCollectionHeaderTable();
            divModifyButton2.classList.add('d-none');
        }
    }else {
        alert(`You have no privileges to perform this task`);
    }



}


// finished collection master header and start collection master details

const refreshCollectionMasterDetailsForm = () => {

    collectionMasterDetails = new Object();

    textColDetailsInvNO.style.border = "2px solid #ced4da";
    textColDetailsAmount.style.border = "2px solid #ced4da";
    textColDetailsChequeNo.style.border = "2px solid #ced4da";
    textColDetailsBank.style.border = "2px solid #ced4da";
    textColDetailsBranch.style.border = "2px solid #ced4da";

    textColDetailsInvNO.value = "";
    textColDetailsAmount.value = "";
    textColDetailsChequeNo.value = "";
    textColDetailsBank.value = "";
    textColDetailsBranch.value = "";

    //payment type tika uncheck karanwa.
    document.querySelectorAll('input[name=paymentType]').forEach(rb => rb.checked = false);


    buttonCollectionDetailsUpdate.disabled=true;
    buttonCollectionDetailsUpdate.style.cursor="not-allowed";

    buttonCollectionDetailsAdd.disabled=false;
    buttonCollectionDetailsAdd.style.cursor="default";


}

const refreshCollectionMasterDetailsTable = () => {

    divCollectionDetails.classList.remove('d-none');

    const detailsList = ajaxGetRequest(`/collection-details/findByHeaderKey/${textProHeaderKey.value}`);

    const displayProperty = [
        {dataType: "text", propertyName: 'collection_master_details_invoice_number'},
        {dataType: "text", propertyName: 'collection_master_details_amount'},
        {dataType: "text", propertyName: 'collection_master_details_type'},
        {dataType: "text", propertyName: 'collection_master_details_check_no'},
        {dataType: "text", propertyName: 'collection_master_details_bank'},
        {dataType: "text", propertyName: 'collection_master_details_branch'},
    ];

    // Check if DataTable is already initialized and destroy it
    if ($.fn.DataTable.isDataTable("#tableCollectionDetails")) {
        $("#tableCollectionDetails").DataTable().destroy();
    }


    fillDataIntoTable2(tableCollectionDetails, detailsList, displayProperty, true, divModifyButton3);
    $("#tableCollectionDetails").dataTable();


}


const checkErrorsCollectionDetailsForm = () => {
    let errors = "";

    if (collectionMasterDetails.collection_master_details_invoice_number == null) {
        errors = errors + "Invoice number cannot be empty \n"
    }

    if (collectionMasterDetails.collection_master_details_amount == null) {
        errors = errors + "Amount Cannot be empty \n";
    }

    if (collectionMasterDetails.collection_master_details_type == null) {
        errors = errors + "Payment type cannot be empty \n";
    }


    if (collectionMasterDetails.collection_master_details_type == "cheque") {
        if (collectionMasterDetails.collection_master_details_check_no == null) {
            errors = errors + "Cheque no cannot be empty \n"
        }

        if (collectionMasterDetails.collection_master_details_bank == null) {
            errors = errors + "Bank Cannot be empty \n"
        }

        if (collectionMasterDetails.collection_master_details_branch == null) {
            errors = errors + "Branch cannot be empty \n"
        }
    }


    return errors;
}


const saveCollectionMasterDetails = () => {

    collectionMasterDetails.collection_master_details_header_key = textProHeaderKey.value

    const errors = checkErrorsCollectionDetailsForm();
    if (errors == "") {
        const userConfirm = confirm(`Are you sure to add following details \n 
            Invoice number is ${collectionMasterDetails.collection_master_details_invoice_number}
            Amount is ${collectionMasterDetails.collection_master_details_amount}
            Payment Type ${collectionMasterDetails.collection_master_details_type}
            `);
        if (userConfirm) {
            const serverResponse = ajaxPostRequest("/collection-details", collectionMasterDetails);
            if (serverResponse == "ok") {
                alert(`Save Successful`);
                refreshCollectionMasterDetailsForm();
                refreshCollectionMasterDetailsTable();
            }else {
                alert(`something went wrong \n ${serverResponse}`)
            }
        }
    } else {
        alert(`You have some errors \n ${errors}`);
    }
}


const refillCollectionDetails = (ob) => {
    collectionMasterDetails = JSON.parse(JSON.stringify(ob));
    oldCollectionMasterDetails = JSON.parse(JSON.stringify(ob));


    textColDetailsInvNO.value = collectionMasterDetails.collection_master_details_invoice_number;
    textColDetailsAmount.value = collectionMasterDetails.collection_master_details_amount;
    textColDetailsChequeNo.value = collectionMasterDetails.collection_master_details_check_no;
    textColDetailsBank.value = collectionMasterDetails.collection_master_details_bank;
    textColDetailsBranch.value = collectionMasterDetails.collection_master_details_branch;


    if (collectionMasterDetails.collection_master_details_type == "cash") {
        radioPayTypeCash.checked = true;
    } else if (collectionMasterDetails.collection_master_details_type == "cheque") {
        radioPayTypeCheque.checked = true;
    }else if (collectionMasterDetails.collection_master_details_type == "online-transfer") {
        radioPayTypeOnlineTransfer.checked = true;
    }


    buttonCollectionDetailsUpdate.disabled=false;
    buttonCollectionDetailsUpdate.style.cursor="default";

    buttonCollectionDetailsAdd.disabled=true;
    buttonCollectionDetailsAdd.style.cursor="not-allowed";


}


const checkUpdatesCollectionDetails = () => {
    let updates = "";

    if (collectionMasterDetails.collection_master_details_invoice_number != oldCollectionMasterDetails.collection_master_details_invoice_number) {
        updates = updates + "Invoice number Is Updated \n"
    }

    if (collectionMasterDetails.collection_master_details_amount != oldCollectionMasterDetails.collection_master_details_amount) {
        updates = updates + "Amount is updated \n"
    }

    if (collectionMasterDetails.collection_master_details_type != oldCollectionMasterDetails.collection_master_details_type) {
        updates = updates + "Payment type is updated \n"
    }

    if (collectionMasterDetails.collection_master_details_check_no != oldCollectionMasterDetails.collection_master_details_check_no) {
        updates = updates + "Cheque no is updated \n"
    }

    if (collectionMasterDetails.collection_master_details_bank != oldCollectionMasterDetails.collection_master_details_bank) {
        updates = updates + "Bank is updated \n";
    }

    if (collectionMasterDetails.collection_master_details_branch != oldCollectionMasterDetails.collection_master_details_branch) {
        updates = updates + "Branch is updated \n"
    }

    return updates;
}


const updateCollectionDetails = () => {
    const updates = checkUpdatesCollectionDetails();
    if (updates != "") {
        const userConfirm = confirm(`Are you sure to update following details \n 
            Invoice number is ${collectionMasterDetails.collection_master_details_invoice_number}
            Amount is ${collectionMasterDetails.collection_master_details_amount}
            Payment Type ${collectionMasterDetails.collection_master_details_type}
            `);
        if (userConfirm) {
            const putServerResponse = ajaxPutRequest("/collection-details", collectionMasterDetails);
            if (putServerResponse == "ok") {
                alert("update successful");
                refreshCollectionMasterDetailsForm();
                refreshCollectionMasterDetailsTable();
                divModifyButton3.classList.add('d-none');
            } else {
                alert(`something went wrong ${putServerResponse}`)
            }
        }

    } else {
        alert(`Nothing to update \n`)
    }
}


const deleteCollectionMasterDetails = (ob) => {
    const userConfirm = confirm(`Are you sure to delete following details \n 
            Invoice number is ${ob.collection_master_details_invoice_number}
            Amount is ${ob.collection_master_details_amount}
            Payment Type ${ob.collection_master_details_type}
            `);

    if (userConfirm) {
        const deleteServerResponse = ajaxDeleteRequest("/collection-details", ob);
        if (deleteServerResponse == "ok") {
            alert("delete successful");
            refreshCollectionMasterDetailsForm();
            refreshCollectionMasterDetailsTable();
            divModifyButton3.classList.add('d-none');
        } else {
            alert(`Something went wrong \n ${deleteServerResponse}`);
        }
    }


}




//pending collection refresh function
const refreshPendingCollections = () => {

    headersList = ajaxGetRequest("/collection-report");

    displayProperty = [
        {dataType: 'function', propertyName: getCustomerNameForPendingCollection},
        {dataType: 'function', propertyName: getInvoiceNumber},
        {dataType: 'function', propertyName: getInvoiceDate},
        {dataType: 'function', propertyName: getInvoiceValue},
        {dataType: 'function', propertyName: getCollectionValue},
        {dataType: 'function', propertyName: getRemainingAmount},
    ];

    // Check if DataTable is already initialized and destroy it
    if ($.fn.DataTable.isDataTable("#collectionsTable")) {
        $("#collectionsTable").DataTable().destroy();
    }


    fillDataIntoTable2(collectionsTable, headersList, displayProperty, false);
    $("#collectionsTable").dataTable();

}

const getCustomerNameForPendingCollection = (ob) => {
    return ob.customer_name;
}

const getInvoiceNumber = (ob) => {
    return `<p class="text-end">${ob.invoice_number}</p>`;
}


const getInvoiceDate = (ob) => {
    return `<p class="text-center">${ob.invoice_date}</p>`;
}

const getInvoiceValue = (ob) => {
    return `<p class="text-end">${Number(ob.invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}

const getCollectionValue = (ob) => {
    return `<p class="text-end">${Number(ob.collection_amount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}



const getRemainingAmount = (ob) => {
    return `<p class="text-end">${Number(ob.remaining_amount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}





const refreshCustomerPendingCollections = (fieldId)=>{

    const selectedValue = fieldId.value;
    const parts = selectedValue.split(" ");
    const namePart = parts.slice(0,-1);
    const joinedPart = namePart.join(" ");

    console.log(joinedPart);

    divCollectionsTableForCustomer.classList.remove('d-none');

    const resultList = ajaxGetRequest(`/collection-report/customerVise/${joinedPart}`)

    displayProperty = [
        {dataType: 'function', propertyName: getCustomerNameForPendingCollection},
        {dataType: 'function', propertyName: getInvoiceNumber},
        {dataType: 'function', propertyName: getInvoiceDate},
        {dataType: 'function', propertyName: getInvoiceValue},
        {dataType: 'function', propertyName: getCollectionValue},
        {dataType: 'function', propertyName: getRemainingAmount},
    ];

    fillDataIntoTable2(collectionsTableForCustomer, resultList, displayProperty, false);
}




const printInvoiceForBill = async (ob) => {

    await refreshCollectionMasterDetailsTableForBill(ob.collection_master_header_key);
    getTotalFromServer = await ajaxGetRequest(`/collection-details/getTotalAmountByHeaderkey/${ob.collection_master_header_key}`)

    const now = new Date();
    const formatted = now.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });


    const newWindow = window.open();
    newWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Collection Bill</title>
    <link rel="stylesheet" href="css/bill.css">

    <!--    bootstrap cdn links-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body style="margin-right: 30px">
<div class="billDiv">

<div class="text-center" style="display: flex; align-items: center; justify-content: start;">
    <img src="/images/Viru_Logo.jpg" alt="viru" width="100" height="40">
    <div style="margin-left: 15px; text-align: left; font-size: 10px; font-family: Verdana">
        <div>619/1/2 Waragoda Rd, Kelaniya</div>
        <div>viruworld621@gmail.com</div>
        <div>071-488-9973</div>
    </div>
    <hr>
</div>


    <div type="button" class="rounded-2 text-center" style="background-color: black; color: white; height: 30px; margin-top: 3px">
        Collection Recipt
    </div>


<div>

<p style="font-size: 12px; display: flex; justify-content: space-between; font-weight: bold; margin: 0; margin-bottom: 2px;">
    <span>Customer Name</span>
    <span>${ob.customer_master_id.customer_name}</span>
</p>

<p style="font-size: 12px; display: flex; justify-content: space-between; font-weight: bold; margin: 0; margin-bottom: 2px;">
    <span>Collection No</span>
    <span>${ob.collection_master_header_number}</span>
</p>


<p style="font-size: 12px; display: flex; justify-content: space-between; font-weight: bold; margin: 0; margin-bottom: 2px;">
    <span>Date</span>
    <span>${new Date(ob.collection_master_header_date).toLocaleString('en-GB', {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    })}</span>
</p>

</div>

    <div>
    ${billTable.outerHTML}
    </div>

        <p style="font-size: 12px; display: flex; justify-content: space-between; margin: 0; margin-bottom: 2px;">
        <span>Total Value</span>
        <span>${Number(getTotalFromServer).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</span>
    </p>

    <p style="font-size: 12px; display: flex; justify-content: space-between; font-weight: bold; margin: 0;">Printed at ${formatted}</p>




</div>
</body>
</html>

    `)

    setTimeout(function () {
        newWindow.stop();
        newWindow.print();
        newWindow.close();
        divModifyButton2.classList.add('d-none');
    }, 3000)

}

// refresh bill table
const refreshCollectionMasterDetailsTableForBill = (headerKey) => {

    const detailsList = ajaxGetRequest(`/collection-details/findByHeaderKey/${headerKey}`);

    const displayProperty = [
        {dataType: "text", propertyName: 'collection_master_details_invoice_number'},
        {dataType: "text", propertyName: 'collection_master_details_type'},
        {dataType: "function", propertyName: getCollectionDetailsAmount},
    ];


    fillDataIntoTable2(billTable, detailsList, displayProperty, false);


}

const getCollectionDetailsAmount = (ob)=>{
    return `<P class="text-end">${Number(ob.collection_master_details_amount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</P>`
}


const refreshPendingCollectionsForPrint = () => {

    const headersList = ajaxGetRequest("/collection-report");

    const displayProperty = [
        {dataType: 'function', propertyName: getCustomerNameForPendingCollection},
        {dataType: 'function', propertyName: getInvoiceNumber},
        {dataType: 'function', propertyName: getInvoiceDate},
        {dataType: 'function', propertyName: getInvoiceValueForCollectionPrint},
        {dataType: 'function', propertyName: getCollectionValue},
        {dataType: 'function', propertyName: getRemainingAmount},
    ];

    fillDataIntoTable2(printCollectionsTable, headersList, displayProperty, false);

}

let runningInvoiceValue = 0
const getInvoiceValueForCollectionPrint = (ob) => {
    runningInvoiceValue+=Number(ob.invoice_value);
    return `<p class="text-end">${Number(ob.invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}

const printPendingReport = ()=>{

    tfootTotalInvoiceValue.innerText = runningInvoiceValue.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Outstanding Report</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <style>
    #printCollectionsTable{
    line-height: 5px !important;
    height: 5px !important;
    }
</style>
    
</head>
<body style="font-family: Verdana">


<div style=" top: 1cm">

    <div class="row" style="margin-bottom: 0; padding-bottom: 0">
            <p class="text-center" style="font-size: 14px; font-weight: bold;">Outstanding report</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${printCollectionsTable.outerHTML}
</div>

</body>
</html>
    `);


    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },3000);


}






window.addEventListener('load', () => {

    refreshVpsDetailsForm();

    refreshVpsHeaderForm();
    refreshVpsHeaderTable();

});

const refreshVpsHeaderForm = () => {

    vpsHeader = new Object();

    textInvoiceNumber.value = "";
    textTotalInvoiceValue.value = "";
    textVpsNo.value = "";
    textVpsCode.value = "";


    textInvoiceNumber.style.border = "2px solid #ced4da";
    textTotalInvoiceValue.style.border = "2px solid #ced4da";
    textVpsNo.style.border = "2px solid #ced4da";
    textVpsCode.style.border = "2px solid #ced4da";


    buttonVpsDetailsUpdate.disabled = true;
    buttonVpsDetailsUpdate.style.cursor = "not-allowed";


    buttonVpsDetailsAdd.disabled = true;
    buttonVpsDetailsAdd.style.cursor = "not-allowed";


}


const refreshColorsVpsHeader = () => {
    textInvoiceNumber.style.border = "2px solid #ced4da";
    textTotalInvoiceValue.style.border = "2px solid #ced4da";
    textVpsNo.style.border = "2px solid #ced4da";
    textVpsCode.style.border = "2px solid #ced4da";
}


const refreshVpsHeaderTable = () => {

    const result = ajaxGetRequest("/vps/findall");


    const displayProperty = [
        {dataType: 'text', propertyName: 'vps_header_invoice_number'},
        {dataType: 'text', propertyName: 'vps_header_total_invoice_value'},
        {dataType: 'text', propertyName: 'vps_header_saved_date'},
        {dataType: 'text', propertyName: 'vps_header_added_user'},
        {dataType: 'text', propertyName: 'vps_header_number'},
    ];

    divVpsFullHeader.classList.add('d-none');


    // Check if DataTable is initialized before trying to destroy it
    if ($.fn.DataTable.isDataTable("#tableVpsHeader")) {
        // Destroy the existing DataTable instance
        $("#tableVpsHeader").DataTable().destroy();
    }
    fillDataIntoTable2(tableVpsHeader, result, displayProperty, true, divModifyButton2);
    $("#tableVpsHeader").DataTable();
}


const checkErrorsVpsHeader = () => {
    let errors = '';

    if (vpsHeader.vps_header_invoice_number == null) {
        errors = errors + "Invoice number cannot be null \n";
    }

    if (vpsHeader.vps_header_total_invoice_value == null) {
        errors = errors + "Invoice value cannot be empty \n"
    }
    return errors;
}

const saveOrUpdateVpsHeader = () => {

    const user = JSON.parse(localStorage.getItem('loggedUser'));
    vpsHeader.vps_header_added_user = user.username;

    if (textVpsCode.value == "") {
        console.log('save part');
        let errors = checkErrorsVpsHeader();
        if (errors == "") {
            const userConfirm = confirm(`Are you sure to add following VPS  \n
            Invoice number is ${vpsHeader.vps_header_invoice_number}
            Total invoice value is ${vpsHeader.vps_header_total_invoice_value}
            Added user is ${vpsHeader.vps_header_added_user}

            `);
            if (userConfirm) {
                console.log(vpsHeader);
                const postServerResponse = ajaxPostRequest("/vps", vpsHeader);
                if (postServerResponse) {
                    alert(`Save Successful`);
                    textVpsNo.value = postServerResponse.vps_header_number;
                    textVpsCode.value = postServerResponse.vps_header_key;
                    refreshColorsVpsHeader();
                    refreshVpsHeaderTable();
                    refreshVpsDetailsForm();
                } else {
                    alert(`Something went wrong! \n ${postServerResponse}`);
                }
            }
        } else {
            alert(`you have following errors \n ${errors}`);
        }
    } else {
        console.log('update part');
        const getIDFromServer = ajaxGetRequest(`/vps/getIdFromHeaderKey/${textVpsCode.value}`);
        vpsHeader.id_vps_header = Number(getIDFromServer);
        vpsHeader.vps_header_key = textVpsCode.value;
        vpsHeader.vps_header_number = textVpsNo.value;

        let errors = checkErrorsVpsHeader();
        if (errors == "") {
            const userConfirm = confirm(`Are you sure to update following VPS details \n
            Invoice number is ${vpsHeader.vps_header_invoice_number}
            Total invoice value is ${vpsHeader.vps_header_total_invoice_value}
            Code is ${vpsHeader.vps_header_key}
            No is ${vpsHeader.vps_header_number}
            `);
            if (userConfirm) {
                let putServerResponse = ajaxPutRequest("/vps", vpsHeader);
                if (putServerResponse === "ok") {
                    alert(`Update successful`);
                    divModifyButton2.classList.add('d-none');
                    refreshColorsVpsHeader();
                    refreshVpsHeaderTable();
                    refreshVpsDetailsForm();
                } else {
                    alert(`Something went wrong \n ${putServerResponse}`)
                }
            }
        } else {
            alert(`You have following errors \n ${errors}`)
        }
    }
}


const refillVpsHeader = (ob) => {

    vpsHeader = JSON.parse(JSON.stringify(ob));
    oldVpsHeader = JSON.parse(JSON.stringify(ob));

    textInvoiceNumber.value = vpsHeader.vps_header_invoice_number;
    textTotalInvoiceValue.value = vpsHeader.vps_header_total_invoice_value;
    textVpsNo.value = vpsHeader.vps_header_number;
    textVpsCode.value = vpsHeader.vps_header_key;


    refreshVpsDetailsForm();
    refreshVpsDetailsTable();
    getBalance(textVpsCode.value);
}

const deleteVpsHeader = (ob) => {
    const userConfirm = confirm(`Are you sure to delete following VPS details \n
            Invoice number is ${ob.vps_header_invoice_number}
            Total invoice value is ${ob.vps_header_total_invoice_value}
            Code is ${ob.vps_header_key}
            No is ${ob.vps_header_number}
            `);
    if (userConfirm) {
        const deleteServerResponse = ajaxDeleteRequest("/vps", ob);
        if (deleteServerResponse === "ok") {
            alert("delete successful");
            refreshVpsHeaderTable();
            divModifyButton2.classList.add('d-none');
        } else {
            alert(`delete unsuccessful \n ${deleteServerResponse}`);
            refreshVpsHeaderTable();
        }
    }

}


const getTotalInvoiceValue = async (fieldId) => {
    const invoiceNumber = fieldId.value;
    const headerKey = await ajaxGetRequest(`/invoice-header/getHeaderKeyByHeaderNumber/${invoiceNumber}`)

    const getNetValueFromServer = ajaxGetRequest(`/invoiceDetail/getNetValue/${headerKey}`);
    const getAdditionalDiscountFromServer = ajaxGetRequest(`/invoiceDetail/getAdditionalDiscountValue/${headerKey}`);


    textTotalInvoiceValue.value = Number(Number(getNetValueFromServer) - Number(getAdditionalDiscountFromServer));

    vpsHeader.vps_header_total_invoice_value = textTotalInvoiceValue.value;
}


//vps details area starts from here


const refreshVpsDetailsForm = () => {

    vpsDetails = new Object();


    textType.style.border = "2px solid #ced4da";
    textAmount.style.border = "2px solid #ced4da";
    textDate.style.border = "2px solid #ced4da";

    textType.value = "";
    textAmount.value = "";
    textDate.value = "";


    buttonVpsDetailsUpdate.disabled = true;
    buttonVpsDetailsUpdate.style.cursor = "not-allowed";


    buttonVpsDetailsAdd.disabled = false;
    buttonVpsDetailsAdd.style.cursor = "default";


}


const refreshVpsDetailsTable = () => {
    divVpsDetails.classList.remove('d-none');

    resultList = ajaxGetRequest(`/vpsDetails/getByHeaderKey/${textVpsCode.value}`);

    const displayProperty = [
        {dataType: 'text', propertyName: 'vps_details_payment_type'},
        {dataType: 'function', propertyName: getVpsDetailsAmount},
        {dataType: 'text', propertyName: 'vps_details_date'},

    ];

    fillDataIntoTable2(tableVpsDetails, resultList, displayProperty, true, divModifyButton3);
    $("#tableVpsDetails").DataTable();

}

const getVpsDetailsAmount = (ob) => {
    return `<p class="text-end">${Number(ob.vps_details_amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}</p>`
}


const checkErrorsVpsDetailsForm = () => {
    let errors = "";

    if (vpsDetails.vps_details_payment_type == null) {
        errors = errors + "Payment type cannot be empty \n";
    }

    if (vpsDetails.vps_details_amount == null) {
        errors = errors + "Amount cannot be empty \n"
    }

    if (vpsDetails.vps_details_date == null) {
        errors = errors + "Date cannot be empty \n"
    }
    return errors;
}


const saveVpsDetails = () => {

    vpsDetails.vps_details_header_key = textVpsCode.value;



    const errors = checkErrorsVpsDetailsForm();
    if (errors === "") {
        const userConfirm = confirm(`Are you sure to add following Info 
        Payment type is ${vpsDetails.vps_details_payment_type}
        Amount is ${vpsDetails.vps_details_amount}
        Date is ${vpsDetails.vps_details_date}
        `);
        if (userConfirm) {
            const postServerResponse = ajaxPostRequest("/vpsDetails", vpsDetails);
            if (postServerResponse === "ok") {
                alert(`Save success`);
                refreshVpsDetailsTable();
                refreshVpsDetailsForm();
                getBalance(textVpsCode.value);
            }
        }
    } else {
        alert(`You have following errors \n ${errors}`)
    }
}

const refillVpsDetails = (ob) => {
    vpsDetails = JSON.parse(JSON.stringify(ob));
    oldVpsDetails = JSON.parse(JSON.stringify(ob));


    textType.value = vpsDetails.vps_details_payment_type;
    textAmount.value = vpsDetails.vps_details_amount;
    textDate.value = vpsDetails.vps_details_date;


    buttonVpsDetailsUpdate.disabled = false;
    buttonVpsDetailsUpdate.style.cursor = "default";


    buttonVpsDetailsAdd.disabled = true;
    buttonVpsDetailsAdd.style.cursor = "not-allowed";


}


const checkUpdatesVpsDetails = () => {
    let updates = ""

    if (vpsDetails.vps_details_payment_type !== oldVpsDetails.vps_details_payment_type) {
        updates = updates + "payment type Updated \n"
    }

    if (vpsDetails.vps_details_amount !== oldVpsDetails.vps_details_amount) {
        updates = updates + "Amount is updated \n"
    }

    if (vpsDetails.vps_details_date !== oldVpsDetails.vps_details_date) {
        updates = updates + "Date is updated \n"
    }

    return updates;
}


const updateVpsDetails = () => {
    let updates = checkUpdatesVpsDetails();
    if (updates !== "") {
        const userConfirm = confirm(`Are you sure to update following updates \n ${updates}`);
        if (userConfirm) {
            const putServerResponse = ajaxPutRequest("/vpsDetails", vpsDetails);
            if (putServerResponse === "ok") {
                alert("update Successful");
                refreshVpsDetailsForm();
                refreshVpsDetailsTable();
                divModifyButton3.classList.add('d-none');
                getBalance(textVpsCode.value);
            } else {
                alert(`Something went wrong \n ${putServerResponse}`);
            }
        }
    } else {
        alert(`nothing to update`);
    }
}


const deleteVpsDetails = (ob) => {
    const userConfirm = confirm(`Are you sure to delete following Info 
        Payment type is ${ob.vps_details_payment_type}
        Amount is ${ob.vps_details_amount}
        Date is ${ob.vps_details_date}
        `);
    if (userConfirm) {
        const deleteServerResponse = ajaxDeleteRequest("/vpsDetails", ob);
        if (deleteServerResponse === "ok") {
            alert("Delete successful");
            refreshVpsDetailsForm();
            refreshVpsDetailsTable();
            divModifyButton3.classList.add('d-none');
        } else {
            alert(`Something went wrong \n ${deleteServerResponse}`);
        }
    }
}

const printVps = async (ob) => {

    await refreshVpsDetailsTableForPrint(ob.vps_header_key)

    const newWindow = window.open();
    newWindow.document.write(`
    
        <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>VPS</title>


    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>
<div class="container-fluid" style="position: relative">

    <div class="row">
        <div class="col-12 text-center"><h4>Vps Details</h4></div>
    </div>

    <div class="row mt-2">
        <div class="col-4">

        </div>
        
        <div class="col-4"></div>
        <div class="col-4">
            <table class="table table-bordered" style="border: 1px solid black; height: 50%">
                <tbody>
                
                <tr>
                    <td style="font-size: 11px; width: 50%">Invoice Value</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${Number(ob.vps_header_total_invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                </tr>
                
                <tr>
                    <td style="font-size: 11px; width: 50%">Vps No</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${ob.vps_header_number}</td>
                </tr>
                
                <tr>
                    <td style="font-size: 11px; width: 50%">Vps Code</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${ob.vps_header_key}</td>
                </tr>

                <tr>
                    <td style="font-size: 11px; width: 50%">Date</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${new Date(ob.vps_header_saved_date).toLocaleString('en-GB', {
        day: "2-digit",
        month: "short",
        year: "2-digit"
    })}</td>
                </tr>

                </tbody>
            </table>

        </div>
    </div>
    
    <div class="row" style="margin-left: 3px; margin-right: 1px">
    ${tableVpsDetailPrint.outerHTML}
    </div>



</div>

<div style="position: absolute; bottom: 1%; width: 100%" >
    <!--  prepared by, checked by, recieved by area start   -->
    <div class="row">
        <div class="col-4 text-start">
            _____________
            <p style="font-size: 11px">Prepared By</p>
        </div>
        <div class="col-4 text-center">
            _____________
            <p style="font-size: 11px">Received By</p>
        </div>
        <div class="col-4 text-end">
            _____________
            <p style="font-size: 11px; margin-right: 3px">Checked By</p>
        </div>
    </div>
    <!--  prepared by, checked by, recieved by area end   -->
</div>



</body>
</html>
    `);
    setTimeout(() => {
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    }, 500)

    divModifyButton2.classList.add('d-none');
}


const refreshVpsDetailsTableForPrint = (headerKey) => {

    resultList = ajaxGetRequest(`/vpsDetails/getByHeaderKey/${headerKey}`);

    const displayProperty = [
        {dataType: 'text', propertyName: 'vps_details_payment_type'},
        {dataType: 'function', propertyName: getVpsDetailsAmount},
        {dataType: 'text', propertyName: 'vps_details_date'},
    ];

    fillDataIntoTable2(tableVpsDetailPrint, resultList, displayProperty, false);

}


const getBalance = (headerKey) => {
    const result = ajaxGetRequest(`/vpsDetails/getBalance/${headerKey}`);
    lblRemainingBalance.innerText="";
    lblRemainingBalance.innerText=`Remaining Balance is ${Number(result).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
}








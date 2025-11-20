window.addEventListener('load', () => {

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


}


const refreshColorsVpsHeader = ()=>{
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


const checkErrorsVpsHeader = ()=>{
    let errors = '';

    if (vpsHeader.vps_header_invoice_number == null){
        errors=errors+"Invoice number cannot be null \n";
    }

    if (vpsHeader.vps_header_total_invoice_value == null){
        errors=errors+"Invoice value cannot be empty \n"
    }
    return errors;
}

const saveOrUpdateVpsHeader = ()=>{
    if (textVpsCode.value==""){
        console.log('save part');
        let errors = checkErrorsVpsHeader();
        if (errors==""){
            const userConfirm =confirm(`Are you sure to add following VPS  \n
            Invoice number is ${vpsHeader.vps_header_invoice_number}
            Total invoice value is ${vpsHeader.vps_header_total_invoice_value}
            `);
            if (userConfirm){
                console.log(vpsHeader);
                const postServerResponse = ajaxPostRequest("/vps",vpsHeader);
                if (postServerResponse){
                    alert(`Save Successful`);
                    textVpsNo.value = postServerResponse.vps_header_number;
                    textVpsCode.value = postServerResponse.vps_header_key;
                    refreshColorsVpsHeader();
                    refreshVpsHeaderTable();
                }else {
                    alert(`Something went wrong! \n ${postServerResponse}`);
                }
            }
        }else {
            alert(`you have following errors \n ${errors}`);
        }
    }else {
        console.log('update part');
        const getIDFromServer = ajaxGetRequest(`/vps/getIdFromHeaderKey/${textVpsCode.value}`);
        vpsHeader.id_vps_header = Number(getIDFromServer);
        vpsHeader.vps_header_key = textVpsCode.value;
        vpsHeader.vps_header_number = textVpsNo.value;

        let errors = checkErrorsVpsHeader();
        if (errors==""){
            const userConfirm = confirm(`Are you sure to update following VPS details \n
            Invoice number is ${vpsHeader.vps_header_invoice_number}
            Total invoice value is ${vpsHeader.vps_header_total_invoice_value}
            Code is ${vpsHeader.vps_header_key}
            No is ${vpsHeader.vps_header_number}
            `);
            if (userConfirm){
                let putServerResponse = ajaxPutRequest("/vps",vpsHeader);
                if (putServerResponse === "ok"){
                    alert(`Update successful`);
                    divModifyButton2.classList.add('d-none');
                    refreshColorsVpsHeader();
                    refreshVpsHeaderTable();
                }else {
                    alert(`Something went wrong \n ${putServerResponse}`)
                }
            }
        }else {
            alert(`You have following errors \n ${errors}`)
        }
    }
}


const refillVpsHeader = (ob) =>{

    vpsHeader = JSON.parse(JSON.stringify(ob));
    oldVpsHeader = JSON.parse(JSON.stringify(ob));

    textInvoiceNumber.value = vpsHeader.vps_header_invoice_number;
    textTotalInvoiceValue.value = vpsHeader.vps_header_total_invoice_value;
    textVpsNo.value = vpsHeader.vps_header_number;
    textVpsCode.value = vpsHeader.vps_header_key;
}

const deleteVpsHeader = (ob)=>{
    const userConfirm =  confirm(`Are you sure to delete following VPS details \n
            Invoice number is ${ob.vps_header_invoice_number}
            Total invoice value is ${ob.vps_header_total_invoice_value}
            Code is ${ob.vps_header_key}
            No is ${ob.vps_header_number}
            `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/vps",ob);
        if (deleteServerResponse === "ok"){
            alert("delete successful");
            refreshVpsHeaderTable();
            divModifyButton2.classList.add('d-none');
        }else {
            alert(`delete unsuccessful \n ${deleteServerResponse}`);
            refreshVpsHeaderTable();
        }
    }

}


const getTotalInvoiceValue = async (fieldId)=>{
    const invoiceNumber = fieldId.value;
    const headerKey = await ajaxGetRequest(`/invoice-header/getHeaderKeyByHeaderNumber/${invoiceNumber}`)

    const getNetValueFromServer = ajaxGetRequest(`/invoiceDetail/getNetValue/${headerKey}`);
    const getAdditionalDiscountFromServer = ajaxGetRequest(`/invoiceDetail/getAdditionalDiscountValue/${headerKey}`);


    textTotalInvoiceValue.value=Number(Number(getNetValueFromServer)-Number(getAdditionalDiscountFromServer));

    vpsHeader.vps_header_total_invoice_value = textTotalInvoiceValue.value;
}

















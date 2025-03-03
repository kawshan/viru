window.addEventListener('load',function (){

    refreshInvoiceMasterHeaderForm();


    refreshInvoiceMasterHeaderTable();



})


const refreshInvoiceMasterHeaderForm = ()=>{

    invoiceHeader = new Object();

    selectCustomer.style.border="2px solid #ced4da";
    textInvoiceHeaderKey.style.border="2px solid #ced4da";
    textInvoiceNO.style.border="2px solid #ced4da";
    textInvoiceDate.style.border="2px solid #ced4da";
    textPoNumber.style.border="2px solid #ced4da";
    textDispatchKey.style.border="2px solid #ced4da";



    selectCustomer.value="";
    textInvoiceHeaderKey.value="";
    textInvoiceNO.value="";
    textInvoiceDate.value="";
    textPoNumber.value="";
    textDispatchKey.value="";


    customersList = ajaxGetRequest("/customer-master/findall")
    fillDataIntoDataList(dataListCustomer,customersList,'customer_mobile');

    getNextInvoiceNumber();
}


const getNextInvoiceNumber = ()=>{
    const nextInvoiceNumber = ajaxGetRequest("/invoice-header/getNextInvoiceNumber");

    textInvoiceNO.value=Number(nextInvoiceNumber);
    textInvoiceNO.style.border="2px solid green";
    invoiceHeader.invoice_header_number=textInvoiceNO.value;
}


const changeColoursToDefault = ()=>{
    selectCustomer.style.border="2px solid #ced4da";
    textInvoiceHeaderKey.style.border="2px solid #ced4da";
    textInvoiceNO.style.border="2px solid #ced4da";
    textInvoiceDate.style.border="2px solid #ced4da";
    textPoNumber.style.border="2px solid #ced4da";
    textDispatchKey.style.border="2px solid #ced4da";
}


const refreshInvoiceMasterHeaderTable = ()=>{


    invoiceHeadersList = ajaxGetRequest("/invoice-header/findall");

    displayProperty=[
        {dataType:'function', propertyName:getCustomerName},
        {dataType:'text', propertyName:'invoice_header_number'},
        {dataType:'text', propertyName:'invoice_header_date'},
        {dataType:'text', propertyName:'invoice_header_po_number'},
        {dataType:'text', propertyName:'invoice_header_dispatch_number'},
    ];


    // Check if DataTable is already initialized and destroy it
    if ($.fn.DataTable.isDataTable("#tableItemMaster")) {
        $("#tableInvoiceHeader").DataTable().destroy();
    }


    fillDataIntoTable2(tableInvoiceHeader,invoiceHeadersList,displayProperty,true,divModifyButton2);
    $("#tableInvoiceHeader").dataTable();

}


const handelResetInvoiceMaster = ()=>{


    refreshInvoiceMasterHeaderForm();
    refreshInvoiceMasterHeaderTable();
    divModifyButton2.classList.add('d-none');
}




const getCustomerName = (ob)=>{
    return ob.customer_master_id.customer_name;
}




const checkErrorsInvoiceMasterHeader = ()=>{
    let errors = ''

    if (invoiceHeader.customer_master_id == null){
        errors=errors+"Customer Cannot Be Empty \n"
    }
    if (invoiceHeader.invoice_header_number == null){
        errors=errors+"Invoice Number Cannot Be Empty \n"
    }
    if (invoiceHeader.invoice_header_date == null){
        errors=errors+"Date Cannot Be Empty \n"
    }
    return errors;
}




const saveInvoiceHeader = async ()=>{

    if (textInvoiceHeaderKey.value==""){
        console.log(`save part`);

        let errors = checkErrorsInvoiceMasterHeader();
        if (errors==""){
            const userConfirm = confirm(`Are You Sure To Add Following Invoice Details
            Customer Is ${invoiceHeader.customer_master_id.customer_name}
            Invoice Number Is ${invoiceHeader.invoice_header_number}
            Customer Mobile Is ${invoiceHeader.customer_master_id.customer_mobile}
            Invoice Date Is ${invoiceHeader.invoice_header_date}
            `);
            if (userConfirm){
                const postServerResponse = ajaxPostRequest("/invoice-header",invoiceHeader);
                if (postServerResponse && postServerResponse.invoice_header_key){
                    alert(`Save Successful`);
                    console.log(postServerResponse.responseText)
                    textInvoiceHeaderKey.value=postServerResponse.invoice_header_key;
                    changeColoursToDefault();
                    refreshInvoiceMasterHeaderTable();
                }else {
                    alert(`Save Unsuccessful \n ${postServerResponse.responseText}`)
                }
            }
        }else {
            alert(`You Have Some Errors \n ${errors}`)
        }
    }else {
        console.log(`update part`);

        const errors =checkErrorsInvoiceMasterHeader();

        if (errors==""){

            //need to get id

            const getIdFromHeaderKey =await ajaxGetRequest(`/invoice-header/findIdByHeaderKey/${textInvoiceHeaderKey.value}`);
            invoiceHeader.id=Number(getIdFromHeaderKey);
            invoiceHeader.invoice_header_key = textInvoiceHeaderKey.value //key eka set karanne mokada upate ekedi key ekek set wenne na ne eka set venne save eke nisa methanath bind karanna one

            const userConfirm = confirm(`Are You Sure To Update Following Invoice \n
            Customer Is ${invoiceHeader.customer_master_id.customer_name}
            Customer Mobile Is ${invoiceHeader.customer_master_id.customer_mobile}
            Invoice Number Is ${invoiceHeader.invoice_header_number}
            Invoice Date Is ${invoiceHeader.invoice_header_date}
            `);
            if (userConfirm){
                const putServerResponse = await ajaxPutRequest("/invoice-header",invoiceHeader);
                if (putServerResponse=="ok"){
                    alert(`Update Successful`);
                    changeColoursToDefault();
                    refreshInvoiceMasterHeaderTable();
                    divModifyButton2.classList.add('d-none');
                }else {
                    alert(`Update Unsuccessful ${putServerResponse}`);
                }
            }
        }else {
            alert(`You Have Following Errors \n ${errors}`)
        }
    }
}



const refillInvoiceMaster = (ob)=>{

    invoiceHeader=JSON.parse(JSON.stringify(ob));
    oldinvoiceHeader=JSON.parse(JSON.stringify(ob));

    selectCustomer.value=invoiceHeader.customer_master_id.customer_mobile
    textInvoiceHeaderKey.value=invoiceHeader.invoice_header_key
    textInvoiceNO.value=invoiceHeader.invoice_header_number
    textInvoiceDate.value=invoiceHeader.invoice_header_date
    textPoNumber.value=invoiceHeader.invoice_header_po_number
    textDispatchKey.value=invoiceHeader.invoice_header_dispatch_number
}


const deleteInvoiceHeader = (ob)=>{

    const userConfirm =confirm(`Are You Sure To Delete Following Invoice \n
            Customer Is ${ob.customer_master_id.customer_name}
            Customer Mobile Is ${ob.customer_master_id.customer_mobile}
            Invoice Number Is ${ob.invoice_header_number}
            Invoice Date Is ${ob.invoice_header_date}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/invoice-header",ob);
        if (deleteServerResponse=="ok"){
            alert(`Delete Successful`)
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }
        refreshInvoiceMasterHeaderForm();
        refreshInvoiceMasterHeaderTable();
        divModifyButton2.classList.add('d-none');
    }
}










































































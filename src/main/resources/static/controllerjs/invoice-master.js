window.addEventListener('load',function (){

    refreshInvoiceMasterHeaderForm();


    refreshInvoiceMasterHeaderTable();

    refreshInvoiceDetailsForm();

    buttonInvoiceDetailAdd.disabled=true;
    buttonInvoiceDetailAdd.style.cursor='not-allowed';


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
    divModifyButton3.classList.add('d-none');
    divInvoiceDetail.classList.add('d-none');
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
                    refreshInvoiceDetailsForm();
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
    textDispatchKey.value=invoiceHeader.invoice_header_dispatch_number;


    refreshInvoiceDetailsForm();
    refreshInvoiceDetailsTable();


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



// finished invoice header section



// start invoice details section

const refreshInvoiceDetailsForm = ()=>{


    invoiceDetail = new Object();

    selectItem.style.border=`2px solid #ced4da`;
    textQuantity.style.border=`2px solid #ced4da`;
    textRate.style.border=`2px solid #ced4da`;
    textValue.style.border=`2px solid #ced4da`;

    selectItem.value="";
    textQuantity.value="";
    textRate.value="";
    textValue.value="";


    itemList = ajaxGetRequest("/item-master/findall")
    fillDataIntoDataList(dataListItem,itemList,'item_short_name');


    buttonInvoiceDetailAdd.disabled=false;
    buttonInvoiceDetailAdd.style.cursor='default';

    buttonInvoiceDetailUpdate.disabled=true;
    buttonInvoiceDetailUpdate.style.cursor="not-allowed";
}



const refreshInvoiceDetailsTable =  ()=>{

    divInvoiceDetail.classList.remove('d-none');

    invoiceDetailsList = ajaxGetRequest(`/invoiceDetail/getFromHeaderKey/${textInvoiceHeaderKey.value}`)

    displayProperty = [
        {dataType:'function',propertyName:getItemName},
        {dataType:'function',propertyName:getItemQuantity},
        {dataType:'function',propertyName:getItemRate},
        {dataType:'function',propertyName:getItemValue},
    ];

    fillDataIntoTable2(tableInvoiceDetail,invoiceDetailsList,displayProperty,true,divModifyButton3)
}


const getItemName = (ob)=>{
    return ob.item_master_id.item_name
}

const getItemQuantity = (ob)=>{
    return `<p class="text-end">${Number(ob.invoice_detail_quantity).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}

const getItemRate = (ob)=>{
    return `<p class="text-end">${Number(ob.invoice_detail_rate).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}

const getItemValue = (ob)=>{
    return `<p class="text-end">${Number(ob.invoice_detail_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}




const checkErrorsInvoiceDetails = ()=>{
    let errors = '';

    if (invoiceDetail.item_master_id == null){
        errors=errors+"Item Cannot Be Empty \n"
    }

    if (invoiceDetail.invoice_detail_quantity == null){
        errors=errors+"Quantity Cannot Be Empty"
    }
    if (invoiceDetail.invoice_detail_rate == null){
        errors=errors+"Rate Cannot Be Empty \n"
    }
    if (invoiceDetail.invoice_detail_value == null){
        errors=errors+"Value Cannot Be Empty \n"
    }
    return errors;
}


const submitInvoiceDetails = ()=>{

    invoiceDetail.invoice_detail_header_key = textInvoiceHeaderKey.value;

    let errors = checkErrorsInvoiceDetails();
    if (errors==''){
        const userConfirm = confirm(`Are You Sure To Add Following Invoice Details
        Item Short Name Is ${invoiceDetail.item_master_id.item_short_name}
        Header Is ${invoiceDetail.invoice_detail_header_key}
        Quantity Is ${invoiceDetail.invoice_detail_quantity}
        Rate Is ${invoiceDetail.invoice_detail_rate}
        Value Is ${invoiceDetail.invoice_detail_value}
        `);

        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/invoiceDetail",invoiceDetail);
            if (postServerResponse=="ok"){
                alert(`Save Successful`);
                refreshInvoiceDetailsForm();
                refreshInvoiceDetailsTable();
            }else {
             alert(`Save Unsuccessful ${postServerResponse}`);
            }
        }
    }else {
        alert(`You Have Some Errors \n`)
    }
}


const refillInvoiceDetails = (ob)=>{

    invoiceDetail = JSON.parse(JSON.stringify(ob));
    oldinvoiceDetail = JSON.parse(JSON.stringify(ob));


    selectItem.value=invoiceDetail.item_master_id.item_name
    textQuantity.value=invoiceDetail.invoice_detail_quantity
    textRate.value=invoiceDetail.invoice_detail_rate
    textValue.value=invoiceDetail.invoice_detail_value


    buttonInvoiceDetailAdd.disabled=true;
    buttonInvoiceDetailAdd.style.cursor='not-allowed';

    buttonInvoiceDetailUpdate.disabled=false;
    buttonInvoiceDetailUpdate.style.cursor="default";

}



const checkUpdatesInvoiceDetails = ()=>{
    let updates = ''

    if (invoiceDetail.item_master_id.item_short_name != oldinvoiceDetail.item_master_id.item_short_name){
        updates=updates+"Item Short Name Is Updated \n"
    }
    if (invoiceDetail.invoice_detail_quantity != oldinvoiceDetail.invoice_detail_quantity){
        updates=updates+"Quantity Is Updated \n"
    }
    if (invoiceDetail.invoice_detail_rate != oldinvoiceDetail.invoice_detail_rate){
        updates=updates+"Rate Is Updated \n"
    }
    if (invoiceDetail.invoice_detail_value != oldinvoiceDetail.invoice_detail_value){
        updates=updates+"Value Is Updated \n"
    }
    return updates;
}


const updateInvoiceDetails = ()=>{

    const updates = checkUpdatesInvoiceDetails();

    if (updates!=''){
        const userConfirm  = confirm(`Are You Sure To Update Following Changes \n ${updates}`);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/invoiceDetail",invoiceDetail);
            if (putServerResponse=="ok"){
                alert(`Update Successful`);
                refreshInvoiceDetailsForm();
                refreshInvoiceDetailsTable();
                divModifyButton3.classList.add('d-none');
            }else {
                alert(`Update Unsuccessful \n ${putServerResponse}`);
            }
        }
    }else {
        alert(`Nothing To Update`)
    }
}




const deleteInvoiceDetail = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Invoice Detail \n 
        Item Short Name Is ${ob.item_master_id.item_short_name}
        Header Is ${ob.invoice_detail_header_key}
        Quantity Is ${ob.invoice_detail_quantity}
        Rate Is ${ob.invoice_detail_rate}
        Value Is ${ob.invoice_detail_value}
    `);
    if (userConfirm){
     const deleteServerResponse = ajaxDeleteRequest("/invoiceDetail",ob);
     if (deleteServerResponse=="ok"){
         alert(`Delete Successful`);
         refreshInvoiceDetailsForm();
         refreshInvoiceDetailsTable();
         divModifyButton3.classList.add('d-none');
     }else {
      alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
     }
    }
}


















































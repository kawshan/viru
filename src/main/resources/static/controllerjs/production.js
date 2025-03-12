window.addEventListener('load',function (){
    refreshProductionDetailsForm();

    refreshProductionHeaderTable()

    refreshProductionHeaderForm();

    getNextProductionNumber();
})

const refreshProductionHeaderForm = ()=>{

    productionHeader = new Object();

    textProHeaderDate.style.border="2px solid #ced4da";
    textProHeaderNumber.style.border="2px solid #ced4da";
    textProHeaderKey.style.border="2px solid #ced4da";

    textProHeaderDate.value="";
    textProHeaderNumber.value="";
    textProHeaderKey.value="";


    buttonProductionDetailsUpdate.disabled=true;
    buttonProductionDetailsUpdate.style.cursor="not-allowed";

    buttonProductionDetailsAdd.disabled=true;
    buttonProductionDetailsAdd.style.cursor="not-allowed";
}

const refreshProductionHeaderTable = ()=>{

    divProductionHeaderTable.classList.remove('d-none');
    divProductionFullHeader.classList.add('d-none');

    prductionHeadersList = ajaxGetRequest("/production-header/getLastHundredRows");


    displayProperty=[
        {dataType:'text',propertyName:'production_header_date'},
        {dataType:'text',propertyName:'production_header_number'},
        {dataType:'text',propertyName:'production_header_key'},
    ];

    // Check if DataTable is initialized before trying to destroy it
    if ($.fn.DataTable.isDataTable("#tableProductionHeader")) {
        // Destroy the existing DataTable instance
        $("#tableProductionHeader").DataTable().destroy();
    }

    fillDataIntoTable2(tableProductionHeader,prductionHeadersList,displayProperty,true,divModifyButton2)
    $("#tableProductionHeader").DataTable();

}

const productionHeaderColorsReset = ()=>{
    textProHeaderDate.style.border="2px solid #ced4da";
    textProHeaderNumber.style.border="2px solid #ced4da";
    textProHeaderKey.style.border="2px solid #ced4da";
}




const checkErrorProductionHeaderForm = ()=>{

    let errors = '';

    if (productionHeader.production_header_date == null){
        errors=errors+"Date Cannot Be Empty \n"
    }

    if (productionHeader.production_header_number == null){
        errors=errors+"Number Cannot Be Empty \n"
    }
    return errors;
}


const saveOrUpdateProductionHeader = async ()=>{
    if (textProHeaderKey.value==''){
        console.log('save part');
        let errors = checkErrorProductionHeaderForm();
        if (errors==''){
            const userConfirm = confirm(`Are You Sure To Update Following Production header
            Date Is ${productionHeader.production_header_date}
            Number Is ${productionHeader.production_header_number}
            `)
            if (userConfirm){
                const postServerResponse = ajaxPostRequest("/production-header",productionHeader);
                if (postServerResponse){
                    alert(`Save Successful ${postServerResponse.production_header_key}`);
                    textProHeaderKey.value=postServerResponse.production_header_key;
                    productionHeaderColorsReset();
                    refreshProductionHeaderTable()
                    refreshProductionDetailsForm()
                }else {
                    alert(`Save Unsuccessful`);
                }
            }


        }else {
            alert(`You Have Following Errors \n ${errors}`);
        }
    }else {
        console.log('update part');

        const getIdFromServer = ajaxGetRequest(`/production-header/getIdFromHeaderKey/${textProHeaderKey.value}`)
        productionHeader.id = Number(getIdFromServer);
        productionHeader.production_header_key = textProHeaderKey.value;

        let errors = checkErrorProductionHeaderForm();
        if (errors==""){

            const userConfirm = confirm(`Are You Sure To Update Following Production header
            Date Is ${productionHeader.production_header_date}
            Number Is ${productionHeader.production_header_number}
            `);
            if (userConfirm){
                let putServerResponse = ajaxPutRequest("/production-header",productionHeader);
                if (putServerResponse=="ok"){
                    alert(`Update Successful`);
                    productionHeaderColorsReset();
                    refreshProductionHeaderTable();
                    divModifyButton2.classList.add('d-none');
                    buttonProductionDetailsUpdate.disabled=true;
                    buttonProductionDetailsUpdate.style.cursor="not-allowed";

                    buttonProductionDetailsAdd.disabled=true;
                    buttonProductionDetailsAdd.style.cursor="not-allowed";
                }else {
                    alert(`update unsuccessful \n ${putServerResponse}`)
                }
            }
        }else {
            alert(`You Have Following Errors \n`)
        }
    }
}


const refillProductHeader = (ob)=>{

    productionHeader = JSON.parse(JSON.stringify(ob));
    oldproductionHeader = JSON.parse(JSON.stringify(ob));


    textProHeaderDate.value=ob.production_header_date;
    textProHeaderNumber.value=ob.production_header_number;
    textProHeaderKey.value=ob.production_header_key;

    refreshProductionDetailsTable();

    refreshProductionDetailsForm();
}


const deleteProductHeader = (ob)=>{
    const userConfirm = confirm(`Are You Sure to delete following product 
            Date Is ${ob.production_header_date}
            Number Is ${ob.production_header_number}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/production-header",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful \n");
            refreshProductionHeaderTable();
            divModifyButton2.classList.add('d-none');
        }else {
            alert(`delete unsuccessful`);
            refreshProductionHeaderTable();
        }
    }
}



const getNextProductionNumber = ()=>{
    const nextProductionNumberFromServer = ajaxGetRequest("/production-header/getNextProductionNumber");
    textProHeaderNumber.value=Number(nextProductionNumberFromServer);
    textProHeaderNumber.style.border="2px solid green";
    productionHeader.production_header_number = Number(nextProductionNumberFromServer);

}




const handelResetProductionHeader = ()=>{

    divModifyButton2.classList.add('d-none');
    divModifyButton3.classList.add('d-none');
    divProductionDetails.classList.add('d-none');

    refreshProductionHeaderForm();
    refreshProductionHeaderTable();

    getNextProductionNumber();


}

const loadFullProductionTable = ()=>{


    divProductionHeaderTable.classList.add('d-none');
    divProductionFullHeader.classList.remove('d-none');

    prductionHeadersList = ajaxGetRequest("/production-header/findall");

    displayProperty=[
        {dataType:'text',propertyName:'production_header_date'},
        {dataType:'text',propertyName:'production_header_number'},
        {dataType:'text',propertyName:'production_header_key'},
    ];

    if ($.fn.DataTable.isDataTable("#tableFullProductionHeader")){
        $("#tableFullProductionHeader").DataTable.destroy();
    }

    fillDataIntoTable2(tableFullProductionHeader,prductionHeadersList,displayProperty,true,divModifyButton2)
    $("#tableFullProductionHeader").DataTable();



}


// finished header section from here we have production details section


const refreshProductionDetailsForm = ()=>{


    productionDetails = new Object();

    textProDetailsItem.style.border="2px solid #ced4da";
    textProDetailsQuantity.style.border="2px solid #ced4da";
    textProDetailsDescription.style.border="2px solid #ced4da";

    textProDetailsItem.value="";
    textProDetailsQuantity.value="";
    textProDetailsDescription.value="";

    itemsList = ajaxGetRequest("/item-master/findall")
    fillDataIntoDataList(dataListItem,itemsList,'item_short_name')

    buttonProductionDetailsUpdate.disabled=true;
    buttonProductionDetailsUpdate.style.cursor="not-allowed";

    buttonProductionDetailsAdd.disabled=false;
    buttonProductionDetailsAdd.style.cursor="default";


}

const refreshProductionDetailsTable = ()=>{

    divProductionDetails.classList.remove('d-none');

    const productionDetailsList = ajaxGetRequest(`/production-details/findByHeaderKey/${textProHeaderKey.value}`);

    const displayProperty = [
        {dataType:'function',propertyName:getItemName},
        {dataType:'text',propertyName:'production_details_description'},
        {dataType:'function',propertyName:getItemQuantity},
    ];



    fillDataIntoTable2(tableProductionDetails,productionDetailsList,displayProperty,true,divModifyButton3);

}

const getItemName = (ob)=>{
    return ob.item_master_id.item_name
}

const getItemQuantity = (ob)=>{
    return `<p class="text-end">${Number(ob.production_details_quantity).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}


const checkErrorsInProductionDetailsForm = ()=>{
    let errors = '';

    if (productionDetails.item_master_id == null){
        errors=errors+"Item Cannot Be Empty \n"
    }
    if (productionDetails.production_details_quantity == null){
        errors=errors+"Quantity Cannot Be Empty \n"
    }
    if (productionDetails.production_details_header_key == null){
        errors=errors+"Header Cannot Be Empty \n"
    }
    return errors;
}

const saveProductionDetails = ()=>{

    productionDetails.production_details_header_key = textProHeaderKey.value;

    let errors = checkErrorsInProductionDetailsForm();
    if (errors==''){
        const userConfirm = confirm(`Are You Sure To Add Following Production Details \n
        Item Is ${productionDetails.item_master_id.item_short_name}
        Quantity Is ${productionDetails.production_details_quantity}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/production-details",productionDetails)
            if (postServerResponse=="ok"){
                alert(`Save Successful`);
                refreshProductionDetailsForm();
                refreshProductionDetailsTable();
            }else {
                alert(`Save unsuccessful \n ${postServerResponse}`);
            }
        }
    }else {
        alert(`You Have Following Errors \n ${errors}`)
    }
}


const refillProductionDetails = (ob)=>{
    productionDetails = JSON.parse(JSON.stringify(ob));
    oldproductionDetails = JSON.parse(JSON.stringify(ob));

    textProDetailsItem.value=productionDetails.item_master_id.item_short_name
    textProDetailsQuantity.value=productionDetails.production_details_quantity
    textProDetailsDescription.value=productionDetails.production_details_description

    buttonProductionDetailsUpdate.disabled=false;
    buttonProductionDetailsUpdate.style.cursor="default";

    buttonProductionDetailsAdd.disabled=true;
    buttonProductionDetailsAdd.style.cursor="not-allowed";
}


const checkUpdateProductionDetails = ()=>{

    let updates = ''

    if (productionDetails.item_master_id.item_short_name != oldproductionDetails.item_master_id.item_short_name){
        updates=updates+"Item Is Updated \n"
    }

    if (productionDetails.production_details_quantity != oldproductionDetails.production_details_quantity){
        updates=updates+"Quantity Is Updated \n"
    }

    if (productionDetails.production_details_description != oldproductionDetails.production_details_description){
        updates=updates+"Description Is Updated \n"
    }
    return updates;
}



const updateProductionDetails = ()=>{

    let updates = checkUpdateProductionDetails();

    if (updates!=''){
        const userConfirm = confirm(`Are You Sure to Update Following Changes \n ${updates}`);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/production-details",productionDetails);
            if (putServerResponse=="ok"){
                alert(`Update Successful`);
                refreshProductionDetailsForm();
                refreshProductionDetailsTable();
                divModifyButton3.classList.add('d-none');
            }else {
                alert(`Update unsuccessful ${putServerResponse}`)
            }
        }
    }else {
        alert(`nothing to update`)
    }
}



const deleteProductionDetails = (ob)=>{
    const userConfirm = confirm(`Are You Sure To Delete Following Production Details 
        Item Is ${ob.item_master_id.item_short_name}
        Quantity Is ${ob.production_details_quantity}
    `);

    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/production-details",ob);
        if (deleteServerResponse=="ok"){
            alert(`Delete Success`);
            refreshProductionDetailsTable();
            refreshProductionDetailsForm();
            divModifyButton3.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }
    }
}












































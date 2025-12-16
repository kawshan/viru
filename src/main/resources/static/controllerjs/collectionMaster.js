window.addEventListener('load', function () {

    refreshCollectionMasterForm();

    refreshColorsCollectionMasterFrom();

    refreshCollectionHeaderTable();
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
    if (textProHeaderKey.value == "") {
        console.log(`save part`);
        let errors = checkErrorsInCollectionHeaderForm();
        if (errors == "") {
            const userConfirm = confirm(`Are you sure to add following Collection Information?
            Customer name is ${collectionHeader.customer_master_id.customer_name}
            Date is ${collectionHeader.collection_master_header_date}
            `);
            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/collection-master", collectionHeader);
                if (postServerResponse && postServerResponse.collection_master_header_key) {
                    alert(`Save Success`);
                    textHeaderNumber.value = postServerResponse.collection_master_header_number;
                    textProHeaderKey.value = postServerResponse.collection_master_header_key;
                    refreshColorsCollectionMasterFrom();
                    refreshCollectionHeaderTable();
                    //call refresh details form
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
            if (userConfirm){
                const putServerResponse = ajaxPutRequest("/collection-master",collectionHeader);
                if (putServerResponse=="ok"){
                    alert(`Update Success`)
                    refreshColorsCollectionMasterFrom();
                    refreshCollectionHeaderTable();
                    divModifyButton2.classList.add('d-none');
                }else {
                    alert(`Update Unsuccessful ${putServerResponse}`);
                }
            }

        } else {
            alert(`you have following errors \n ${errors}`);
        }
    }
}

const refillCollectionHeader = (ob)=>{

    collectionHeader = JSON.parse(JSON.stringify(ob));
    oldCollectionHeader = JSON.parse(JSON.stringify(ob));

    selectCustomer.value = collectionHeader.customer_master_id.customer_name
    textHeaderDate.value = collectionHeader.collection_master_header_date
    textHeaderNumber.value = collectionHeader.collection_master_header_number
    textProHeaderKey.value = collectionHeader.collection_master_header_key
}



const deleteCollectionHeader = (ob)=>{
    const userConfirm = confirm(`Are you sure to delete following information
            Customer name is ${ob.customer_master_id.customer_name}
            Date is ${ob.collection_master_header_date}
            Code is ${ob.collection_master_header_key}
            Number is ${ob.collection_master_header_number}
            `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/collection-master",ob);
        if (deleteServerResponse=="ok"){
            alert('Delete successful');
        }else {
            alert(`Delete unsuccessful \n ${deleteServerResponse}`);
        }
        refreshCollectionMasterForm();
        refreshCollectionHeaderTable();
        divModifyButton2.classList.add('d-none');
    }
}










































































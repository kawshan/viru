window.addEventListener('load', () => {

    refreshStockTransferDetailsForm()
    refreshStockTransferHeader();
    refreshStockTransferTable();


})


const refreshStockTransferHeader = () => {

    stockTransfer = new Object();

    textStockTransferDate.value = "";
    textStockTransferNumber.value = "";
    textStockTransferCode.value = "";


    textStockTransferDate.style.border = "2px solid #ced4da";
    textStockTransferNumber.style.border = "2px solid #ced4da";
    textStockTransferCode.style.border = "2px solid #ced4da";



    buttonStockTransferDetailsUpdate.disabled=true
    buttonStockTransferDetailsAdd.disabled=true


}


const stockTransferHeaderColorRest = () => {
    textStockTransferDate.style.border = "2px solid #ced4da";
    textStockTransferNumber.style.border = "2px solid #ced4da";
    textStockTransferCode.style.border = "2px solid #ced4da";
}


const refreshStockTransferTable = () => {

    divStockTransferFullHeader.classList.add('d-none');
    divProductionHeaderTable.classList.remove('d-none');

    result = ajaxGetRequest("/stock-transfer/last-hundred-records")


    const displayProperties = [
        {dataType: 'text', propertyName: 'stock_transfer_header_date'},
        {dataType: 'text', propertyName: 'stock_transfer_header_number'},
        {dataType: 'text', propertyName: 'stock_transfer_header_key'},
    ];


    fillDataIntoTable2(tableStockTransferHeader, result, displayProperties, true, divModifyButton2)
    $("#tableStockTransferHeader").DataTable();

}


const checkErrorsStockTransferHeader = () => {
    let errors = "";

    if (stockTransfer.stock_transfer_header_date == null) {
        errors = errors + "Date Cannot Be Empty \n"
    }

    return errors;
}


const saveOrUpdateStockTransferHeader = async () => {

    if (textStockTransferCode.value === "") {
        //     save part
        let errors = checkErrorsStockTransferHeader();
        if (errors === "") {
            const userConfirm = confirm(`Are you sure to add following information
            \n date is ${stockTransfer.stock_transfer_header_date}
            `);

            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/stock-transfer", stockTransfer);
                if (postServerResponse) {
                    alert(`Save successful`);
                    textStockTransferNumber.value = postServerResponse.stock_transfer_header_number;
                    textStockTransferCode.value = postServerResponse.stock_transfer_header_key;
                    stockTransferHeaderColorRest();
                    refreshStockTransferTable();
                    refreshStockTransferDetailsForm()
                } else {
                    alert(`Error happened \n ${postServerResponse}`)
                }
            }
        }else {
            alert(`You Have Following Errors \n ${errors}`)
        }

    } else {
        //    update part
        const getIdFromServer = await ajaxGetRequest(`/stock-transfer/get_stock_transfer_from_header_key/${textStockTransferCode.value}`);
        stockTransfer.id = Number(getIdFromServer.id);
        stockTransfer.stock_transfer_header_number = textStockTransferNumber.value;
        stockTransfer.stock_transfer_header_key = textStockTransferCode.value;

        let errors = checkErrorsStockTransferHeader();
        if (errors === "") {
            const userConfirm = confirm(`Are You Sure To update Following Information
            date is ${stockTransfer.stock_transfer_header_date}
            number is ${stockTransfer.stock_transfer_header_number}
            code is ${stockTransfer.stock_transfer_header_key}
            `);

            if (userConfirm) {
                const putServerResponse = ajaxPutRequest("/stock-transfer", stockTransfer);
                if (putServerResponse == "ok") {
                    alert(`update successful`);
                    divModifyButton2.classList.add('d-none');
                    stockTransferHeaderColorRest();
                    refreshStockTransferTable();
                }
            }


        }


    }
}


const refillStockTransfer = (ob) => {

    stockTransfer = JSON.parse(JSON.stringify(ob));
    oldStockTransfer = JSON.parse(JSON.stringify(ob));


    textStockTransferDate.value = stockTransfer.stock_transfer_header_date;
    textStockTransferNumber.value = stockTransfer.stock_transfer_header_number;
    textStockTransferCode.value = stockTransfer.stock_transfer_header_key;

    refreshStockTransferDetailsForm();
    refreshStockTransferDetailsTable();

}


const deleteStockTransfer = (ob) => {

    const userConfirm = confirm(`Are you sure to delete following information
           \n date is ${ob.stock_transfer_header_date}
           \n number is ${ob.stock_transfer_header_number}
           \n code is ${ob.stock_transfer_header_key}
    `);


    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/stock-transfer",ob);
        if (deleteServerResponse==="ok"){
            alert("delete successful");
            refreshStockTransferTable();
            divModifyButton2.classList.add('d-none');
        }
    }




}

const refreshStockTransferFullTable = () => {

    divProductionHeaderTable.classList.add('d-none');
    divStockTransferFullHeader.classList.remove('d-none');


    const result = ajaxGetRequest("/stock-transfer/findall")


    const displayProperties = [
        {dataType: 'text', propertyName: 'stock_transfer_header_date'},
        {dataType: 'text', propertyName: 'stock_transfer_header_number'},
        {dataType: 'text', propertyName: 'stock_transfer_header_key'},
    ];


    fillDataIntoTable2(tableFullStockTransferHeader, result, displayProperties, true, divModifyButton2)
    $("#tableFullStockTransferHeader").DataTable();

}


// stock transfer details section start


const refreshStockTransferDetailsForm = ()=>{
    buttonStockTransferDetailsUpdate.disabled=true;

    buttonStockTransferDetailsAdd.disabled=false;



    stockTransferDetails = new Object();

    textStockTransferDetailsItem.style.border="2px solid #ced4da";
    textStockTransferDetailsQuantity.style.border="2px solid #ced4da";
    selectStockTransferDetailsFromLocation.style.border="2px solid #ced4da";
    selectStockTransferDetailsToLocation.style.border="2px solid #ced4da";
    selectStockTransferDetailsDescription.style.border="2px solid #ced4da";


    textStockTransferDetailsItem.value="";
    textStockTransferDetailsQuantity.value="";
    selectStockTransferDetailsDescription.value="";


    itemsList = ajaxGetRequest("/item-master/findall")
    fillDataIntoDataList(dataListItem,itemsList,'item_short_name')

    locationList = ajaxGetRequest("/location-master/findall");
    fillDataIntoSelect(selectStockTransferDetailsFromLocation,"Select Location",locationList,'location_master_name');
    fillDataIntoSelect(selectStockTransferDetailsToLocation,"Select Location",locationList,'location_master_name');




}



const refreshStockTransferDetailsTable = ()=>{

    divStockTransferDetails.classList.remove('d-none');

    const result  = ajaxGetRequest(`/stock_transfer_details/get_by_header_key/${textStockTransferCode.value}`); //need to insert url here

    const displayProperty = [
        {dataType:'function',propertyName:getItemShortName},
        {dataType:'text',propertyName:'stock_transfer_details_quantity'},
        {dataType:'function',propertyName:getFromLocation},
        {dataType:'function',propertyName:getToLocation},
        {dataType:'text',propertyName:'stock_transfer_details_description'},

    ];

    fillDataIntoTable2(tableStockTransferDetails,result,displayProperty,true,divModifyButton3);
    $("#tableStockTransferDetails").DataTable();

}



const getItemShortName = (ob)=>{
    return `<p>${ob.item_master_id.item_short_name}</p>`;
}


const getFromLocation = (ob)=>{
    return `<p>${ob.from_location.location_master_name}</p>`;
}



const getToLocation = (ob)=>{
   return  `<p>${ob.to_location.location_master_name}</p>`;
}


const checkErrorsInStockTransferDetails = ()=>{

    let errors = "";


    if (stockTransferDetails.item_master_id == null){
        errors=errors+"Item Cannot Be Empty \n"
    }

    if (stockTransferDetails.from_location == null){
        errors = errors="From Location Cannot Be Empty \n"
    }

    if (stockTransferDetails.to_location == null){
        errors = errors="To Location Cannot Be Empty \n"
    }
    if (stockTransferDetails.stock_transfer_details_header_key == null){
        errors=errors+"Code Cannot Be empty \n"
    }

    if (stockTransferDetails.stock_transfer_details_quantity == null){
        errors=errors+"Quantity Cannot Be Empty \n"
    }


    return errors;
}




const saveStockTransferDetails = ()=>{

    stockTransferDetails.stock_transfer_details_header_key = textStockTransferCode.value;
    let errors = checkErrorsInStockTransferDetails();
    if (errors === ""){
        const userConfirm = confirm(`Are you sure to add following details
        \n item name is ${stockTransferDetails.item_master_id.item_short_name}
        \n quantity is ${stockTransferDetails.stock_transfer_details_quantity}
        \n from location is ${stockTransferDetails.from_location.location_master_name}
        \n to location is ${stockTransferDetails.to_location.location_master_name}
        \n code is ${stockTransferDetails.stock_transfer_details_header_key}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/stock_transfer_details",stockTransferDetails);
            if (postServerResponse==="ok"){
                alert("save successful");
                refreshStockTransferDetailsForm();
                refreshStockTransferDetailsTable();
            }else {
                alert(`save unsuccessful \n ${postServerResponse}`);
            }
        }
    }else {
        alert(`you have some errors \n ${errors}`)
    }
}


const refillStockTransferDetailsFrom = (ob)=>{
    stockTransferDetails = JSON.parse(JSON.stringify(ob));
    oldStockTransferDetails = JSON.parse(JSON.stringify(ob));

    textStockTransferDetailsItem.value = stockTransferDetails.item_master_id.item_short_name;
    textStockTransferDetailsQuantity.value = stockTransferDetails.stock_transfer_details_quantity;
    selectStockTransferDetailsDescription.value = stockTransferDetails.stock_transfer_details_description;

    fillDataIntoSelect(selectStockTransferDetailsFromLocation,"Select Location",locationList,'location_master_name', stockTransferDetails.from_location.location_master_name);
    fillDataIntoSelect(selectStockTransferDetailsToLocation,"Select Location",locationList,'location_master_name', stockTransferDetails.to_location.location_master_name);


    buttonStockTransferDetailsUpdate.disabled=false
    buttonStockTransferDetailsAdd.disabled=true


}

const checkUpdatesStockTransferDetailsForm = ()=>{
    let updates = ""

    if (stockTransferDetails.item_master_id !== oldStockTransferDetails.item_master_id){
        updates = updates+"Item Is Changed \n";
    }

    if (stockTransferDetails.from_location !== oldStockTransferDetails.from_location){
        updates = updates+"from location is changed \n"
    }

    if (stockTransferDetails.to_location !== oldStockTransferDetails.to_location){
        updates = updates+"to location is changed \n"
    }

    if (stockTransferDetails.stock_transfer_details_description !== oldStockTransferDetails.stock_transfer_details_description){
        updates = updates+"description is changed \n"
    }

    if (stockTransferDetails.stock_transfer_details_quantity !== oldStockTransferDetails.stock_transfer_details_quantity){
        updates = updates+"Quantity is Changed \n"
    }
    return updates
}



const updateStockTransferDetails = ()=>{
    let updates = checkUpdatesStockTransferDetailsForm();
    if (updates !== ""){
        const userConfirm = confirm(`Are you sure to update following details
        \n item name is ${stockTransferDetails.item_master_id.item_short_name}
        \n quantity is ${stockTransferDetails.stock_transfer_details_quantity}
        \n from location is ${stockTransferDetails.from_location.location_master_name}
        \n to location is ${stockTransferDetails.to_location.location_master_name}
        \n code is ${stockTransferDetails.stock_transfer_details_header_key}
        `);
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/stock_transfer_details",stockTransferDetails);
            if (putServerResponse==="ok"){
                alert(`update successful`);
                refreshStockTransferDetailsForm();
                refreshStockTransferDetailsTable();
                divModifyButton3.classList.add('d-none');
            }else {
                alert(`update unsuccessful`);
            }
        }
    }else {
        alert(`nothing to update`)
    }
}



const deleteStockTransferDetails = (ob)=>{
    const userConfirm = confirm(`Are you sure to delete following details
        \n item name is ${ob.item_master_id.item_short_name}
        \n quantity is ${ob.stock_transfer_details_quantity}
        \n from location is ${ob.from_location.location_master_name}
        \n to location is ${ob.to_location.location_master_name}
        \n code is ${ob.stock_transfer_details_header_key}
        `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/stock_transfer_details",ob);
        if (deleteServerResponse==="ok"){
            alert(`delete successful`);
            refreshStockTransferDetailsForm();
            refreshStockTransferDetailsTable();
            divModifyButton3.classList.add('d-none');
        }else {
            alert(`delete unsuccessful`);
        }
    }
}



const printStockTransfer = async (ob)=>{

    await loadStockTransferPrintTable(ob.stock_transfer_header_key);


    const newWindow = window.open();
    newWindow.document.write(`
    
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Stock Transfer Details</title>


    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>
<div class="container-fluid" style="position: relative">

    <div class="row">
        <div class="col-12 text-center"><h4>Stock Transfer Details</h4></div>
    </div>

    <div class="row mt-2">
        <div class="col-4">

        </div>
        
        <div class="col-4"></div>
        <div class="col-4">
            <table class="table table-bordered" style="border: 1px solid black; height: 50%">
                <tbody>
                <tr>
                    <td style="font-size: 11px; width: 50%">Transfer No</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${ob.stock_transfer_header_number}</td>
                </tr>
                
                <tr>
                    <td style="font-size: 11px; width: 50%">Transfer Code</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${ob.stock_transfer_header_key}</td>
                </tr>

                <tr>
                    <td style="font-size: 11px; width: 50%">Transfer Date</td>
                    <td class="text-end" style="font-size: 12px; width: 50%">${new Date(ob.stock_transfer_header_date).toLocaleString('en-GB', { day: "2-digit", month: "short", year: "2-digit" })}</td>
                </tr>

                </tbody>
            </table>

        </div>
    </div>
    
    <div class="row" style="margin-left: 3px; margin-right: 1px">
    ${tableStockTransferDetailsPrint.outerHTML}
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
    setTimeout(function () {
        newWindow.stop();
        newWindow.print();
        newWindow.close();
        divModifyButton2.classList.add('d-none');
    }, 1000)
}



const loadStockTransferPrintTable =async (headerKey)=>{


    const result  =await ajaxGetRequest(`/stock_transfer_details/get_by_header_key/${headerKey}`);

    const displayProperty = [
        {dataType:'function',propertyName:getItemShortName},
        {dataType:'text',propertyName:'stock_transfer_details_quantity'},
        {dataType:'text',propertyName:'stock_transfer_details_description'},
        {dataType:'function',propertyName:getFromLocation},
        {dataType:'function',propertyName:getToLocation},


    ];

    fillDataIntoTable2(tableStockTransferDetailsPrint,result,displayProperty,false);

}

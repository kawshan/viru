window.addEventListener('load', () => {


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

}


const stockTransferHeaderColorRest = () => {
    textStockTransferDate.style.border = "2px solid #ced4da";
    textStockTransferNumber.style.border = "2px solid #ced4da";
    textStockTransferCode.style.border = "2px solid #ced4da";
}


const refreshStockTransferTable = () => {

    result = ajaxGetRequest("/stock-transfer/last-hundred-records")


    const displayProperties = [
        {dataType: 'text', propertyName: 'stock_transfer_header_date'},
        {dataType: 'text', propertyName: 'stock_transfer_header_number'},
        {dataType: 'text', propertyName: 'stock_transfer_header_key'},
    ];


    fillDataIntoTable2(tableStockTransferHeader, result, displayProperties, true, divModifyButton2)


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
                } else {
                    alert(`Error happened \n ${postServerResponse}`)
                }
            }
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
























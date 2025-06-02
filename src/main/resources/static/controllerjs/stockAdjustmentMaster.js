window.addEventListener("load", function () {

    refreshStockAdjustmentHeaderForm();
    refreshStockAdjustmentHeaderTable();


})


const refreshStockAdjustmentHeaderForm = () => {

    stockAdjustmentHeader = new Object();

    textStockAdjustmentNumber.style.color = "2px solid #ced4da";
    textStockAdjustmentKey.style.color = "2px solid #ced4da";
    textStockAdjustmentDate.style.color = "2px solid #ced4da";


    textStockAdjustmentNumber.value = "";
    textStockAdjustmentKey.value = "";
    textStockAdjustmentDate.value = "";


}

const stockAdjustmentHeaderResetColorsToDefault = () => {
    textStockAdjustmentNumber.style.color = "2px solid #ced4da";
    textStockAdjustmentKey.style.color = "2px solid #ced4da";
    textStockAdjustmentDate.style.color = "2px solid #ced4da";
}


const refreshStockAdjustmentHeaderTable = () => {

    stockAdjustmentHeadersList = ajaxGetRequest("/stockAdjustmentHeader/recent1000StockAdjustments")

    displayProperty = [
        {dataType: 'text', propertyName: 'stock_adjustment_header_no'},
        {dataType: 'text', propertyName: 'stock_adjustment_header_key'},
        {dataType: 'text', propertyName: 'stock_adjustment_header_date'},
    ];

    // Check if DataTable is already initialized and destroy it
    if ($.fn.DataTable.isDataTable("#tableStockAdjustmentHeader")) {
        $("#tableStockAdjustmentHeader").DataTable().destroy();
    }

    fillDataIntoTable2(tableStockAdjustmentHeader, stockAdjustmentHeadersList, displayProperty, true, divModifyButton2)
    $("#tableStockAdjustmentHeader").dataTable();


}


const checkErrorsInStockAdjustmentHeaderForm = () => {
    let errors = "";

    if (stockAdjustmentHeader.stock_adjustment_header_date == null) {
        errors = errors + "Date Cannot Be Empty \n"
    }

    return errors;
}

const saveOrUpdateStockAdjustmentHeader = async () => {

    if (textStockAdjustmentKey.value == "") {
        console.log("save part");
        let errors = checkErrorsInStockAdjustmentHeaderForm();
        if (errors == "") {
            const userConfirm = confirm(`Are You sure to Add Following Stock Adjustment Details 
             Date Is ${stockAdjustmentHeader.stock_adjustment_header_date}
             `);
            if (userConfirm) {
                const postServerResponse = ajaxPostRequest("/stockAdjustmentHeader", stockAdjustmentHeader);
                if (postServerResponse) {
                    alert("save successful")
                    textStockAdjustmentNumber.value = postServerResponse.stock_adjustment_header_no;
                    textStockAdjustmentKey.value = postServerResponse.stock_adjustment_header_key;
                    stockAdjustmentHeaderResetColorsToDefault();
                    refreshStockAdjustmentHeaderTable();
                }
            }
        } else {
            alert(`You Have Following Errors \n ${errors}`)
        }


    } else {
        console.log("update part");
        // need to get id from server
        const getIdFromHeaderKey = await ajaxGetRequest(`/stockAdjustmentHeader/getIdFromHeaderKey/${textStockAdjustmentKey.value}`);
        stockAdjustmentHeader.id = Number(getIdFromHeaderKey);
        stockAdjustmentHeader.stock_adjustment_header_key = textStockAdjustmentKey.value;
        stockAdjustmentHeader.stock_adjustment_header_no = Number(textStockAdjustmentNumber.value);

        const userConfirm = confirm(`Are You Sure To Update Following Stock Adjustment Header 
        ID is ${stockAdjustmentHeader.id}
        Code is ${stockAdjustmentHeader.stock_adjustment_header_key}
        Number is ${stockAdjustmentHeader.stock_adjustment_header_no}
        Date is ${stockAdjustmentHeader.stock_adjustment_header_date}
        `);
        if (userConfirm) {
            const putServerResponse = ajaxPutRequest("/stockAdjustmentHeader", stockAdjustmentHeader);
            if (putServerResponse == "ok") {
                alert("update successful");
                refreshStockAdjustmentHeaderTable();
                stockAdjustmentHeaderResetColorsToDefault();
            } else {
                alert(`Update unsuccessful \n ${putServerResponse}`);
            }
        }


    }


}


const refillStockAdjustmentMaster = (ob) => {

    stockAdjustmentHeader = JSON.parse(JSON.stringify(ob));
    oldstockAdjustmentHeader = JSON.parse(JSON.stringify(ob));

    textStockAdjustmentNumber.value = stockAdjustmentHeader.stock_adjustment_header_no;
    textStockAdjustmentKey.value = stockAdjustmentHeader.stock_adjustment_header_key;
    textStockAdjustmentDate.value = stockAdjustmentHeader.stock_adjustment_header_date;

}


const deleteStockAdjustmentHeader = (ob) => {
    const userConfirm = confirm(`Are You Sure To Delete Following Stock Adjustment
        Code is ${ob.stock_adjustment_header_key}
        Number is ${ob.stock_adjustment_header_no}
        Date is ${ob.stock_adjustment_header_date}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/stockAdjustmentHeader",ob);
        if(deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshStockAdjustmentHeaderTable();
            divModifyButton2.classList.add('d-none');
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }
    }





}






































































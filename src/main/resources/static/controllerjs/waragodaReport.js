window.addEventListener('load',function (){

    refreshProductionReportForm();




})

const refreshProductionReportForm = ()=>{

    waragodaReport = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";

    selectFromDate.value="";
    selectToDate.value="";


}

const refreshProductionReportTable = ()=>{

    const waragodaStockList = ajaxGetRequest(`/stock-report/waragodaStock/${waragodaReport.fromdate}/${waragodaReport.todate}`);

    const displayColumns = [
        {dataType: 'function', propertyName: getItemCategoryName},
        {dataType: 'function', propertyName: getItemCode},
        {dataType: 'function', propertyName: getItemShortName},
        {dataType: 'function', propertyName: stockQuantity},
    ];
    fillDataIntoTable2(tableWaragodaReportPrint,waragodaStockList,displayColumns,false);
}


let runningItemCategoryName = "";

const getItemCategoryName = (ob) => {
    if (runningItemCategoryName === ob.item_category_name) {
        return " "
    } else {
        runningItemCategoryName = ob.item_category_name;
        return ob.item_category_name;
    }
}


const getItemShortName = (ob) => {
    return ob.item_short_name;
}

const getItemCode = (ob) => {
    return ob.item_code;
}

const stockQuantity = (ob) => {
    return Number(ob.stock_quantity).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
}


const printProductionReport = async ()=>{

    await refreshProductionReportTable();


    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Stock Report Waragoda</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    
    <style>
    #tableStockReportPrint{
    line-height: 5px !important;
    height: 5px !important;
    }
</style>
    
</head>
<body style="font-family: Verdana">


<div style=" top: 1cm">

    <div class="row" style="margin-bottom: 0; padding-bottom: 0">
            <p class="text-center" style="font-size: 14px; font-weight: bold;">Stock Report Waragoda</p>
            <p class="text-center" style="font-size: 11px">${waragodaReport.fromdate} To ${waragodaReport.todate}</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${tableWaragodaReportPrint.outerHTML}
</div>

</body>
</html>
    `);


    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },3000)



}


// prasad request to put datatable.
const viewWaragodaStock = ()=>{
    const waragodaStockList = ajaxGetRequest(`/stock-report/waragodaStock/${waragodaReport.fromdate}/${waragodaReport.todate}`);

    divWaragodaReportPrint2.classList.remove("d-none");

    const displayColumns = [
        {dataType: 'function', propertyName: getItemCategoryName},
        {dataType: 'function', propertyName: getItemShortName},
        {dataType: 'function', propertyName: stockQuantity},
    ];


    fillDataIntoTable2(tableWaragodaReportPrint2,waragodaStockList,displayColumns,false);
    $("#tableWaragodaReportPrint2").dataTable();
}































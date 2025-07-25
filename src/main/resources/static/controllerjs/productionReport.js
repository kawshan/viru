window.addEventListener('load',function (){

    refreshProductionReportForm();




})

const refreshProductionReportForm = ()=>{

    productionReport = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";

    selectFromDate.value="";
    selectToDate.value="";


}

const refreshProductionReportTable = ()=>{

    const productionReportList = ajaxGetRequest(`/production-report/${productionReport.fromdate}/${productionReport.todate}`);

    const displayColumns = [
        {dataType:'function',propertyName:getDate},
        {dataType:'text',propertyName:'production_header_key'},
        {dataType:'text',propertyName:'production_header_number'},
        {dataType:'text',propertyName:'item_short_name'},
        {dataType:'function',propertyName:getTotalQuantity},
    ]


    fillDataIntoTable2(tableProductionReportPrint,productionReportList,displayColumns,false);


}


const getDate = (ob)=>{
    return ob.production_header_date
}


const getTotalQuantity = (ob)=>{
    return `<div class="text-end">${Number(ob.total_quantity).toLocaleString('en-US')}</div>`
}


const printProductionReport = async ()=>{

    await refreshProductionReportTable();


    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Production Report</title>
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
            <p class="text-center" style="font-size: 14px; font-weight: bold;">Production report</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${tableProductionReportPrint.outerHTML}
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



































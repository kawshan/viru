window.addEventListener('load',()=>{

    refreshStockTransferForm();


});

const refreshStockTransferForm = ()=>{


    stockTransferReport = new Object();

    selectFromDate.style.border= "2px solid #ced4da";
    selectToDate.style.border= "2px solid #ced4da";

    selectFromDate.value = "";
    selectToDate.value = "";
}


const refreshStockTransferTable = ()=>{

    const result = ajaxGetRequest("") //need to inset link

    const displayProperties = [
        {dataType:'',propertyName:''}
    ]


    fillDataIntoTable2(tableStockTransferReportPrint,result,displayProperties,false);

}


const printStockTransferReport = async ()=>{

    await refreshStockTransferTable();


    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Stock Transfer Report</title>
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
            <p class="text-center" style="font-size: 14px; font-weight: bold;">Stock Transfer report</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${tableStockTransferReportPrint.outerHTML}
</div>

</body>
</html>
    `);


    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },1500)



}






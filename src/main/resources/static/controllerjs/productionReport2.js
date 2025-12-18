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
        {dataType:'function',propertyName:getProductionNumber},
        {dataType:'text',propertyName:'item_short_name'},
        {dataType:'function',propertyName:getTotalQuantity},
    ]


    fillDataIntoTable2(tableProductionReportPrint,productionReportList,displayColumns,false);


}

let productionDate = "";
const getDate = (ob)=>{
    // return ob.production_header_date
    if (ob.production_header_date==productionDate){
        return "";
    }else {
        productionDate=ob.production_header_date;
        return ob.production_header_date;
    }


}
let productionNumber = ""
const getProductionNumber = (ob)=>{
    if (ob.production_header_number==productionNumber){
        return ""
    }else {
        productionNumber=ob.production_header_number
        return `<div class="text-end">${Number(ob.production_header_number)}</div>`
    }
}

const getTotalQuantity = (ob)=>{
    return `<div class="text-end">${Number(ob.total_quantity).toLocaleString('en-US')}</div>`
}


const printProductionReport = async ()=>{

    await refreshProductionReportTable();

    const now = new Date();
    const formatted = now.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

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
            <p class="text-center" style="font-size: 11px">${productionReport.fromdate} To ${productionReport.todate}</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${tableProductionReportPrint.outerHTML}
</div>

<p style="font-size: 12px; display: flex; justify-content: space-between; font-weight: bold; margin: 0;">Printed at ${formatted}</p>

</body>
</html>
    `);


    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
    },3000)



}



































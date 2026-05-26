window.addEventListener('load',function (){

    refreshProductionReportForm();




})

const refreshProductionReportForm = ()=>{

    deleteStockReport = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";

    selectFromDate.value="";
    selectToDate.value="";


}

const refreshProductionReportTable = ()=>{

    const productionReportList = ajaxGetRequest(`/delete-sales-report/report/${deleteStockReport.fromdate}/${deleteStockReport.todate}`);

    const displayColumns = [
        {dataType:'function',propertyName:getCustomerName},
        {dataType:'function',propertyName:getDate},
        {dataType:'function',propertyName:getInvoiceNumber},
        {dataType:'text',propertyName:'item_short_name'},
        {dataType:'function',propertyName:getNetInvoiceValue},
        {dataType:'text',propertyName:'deleted_user_name'},
        {dataType:'text',propertyName:'delete_date'},
    ]


    fillDataIntoTable2(tableDeletedSalesReportPrint,productionReportList,displayColumns,false);


}


const getCustomerName = (ob) => {
    return ob.customer_name;
}



let invoiceDate = " ";
const getDate = (ob)=>{
    if (invoiceDate==ob.invoice_header_date){
        return " "
    }else {
        invoiceDate=ob.invoice_header_date;
        return ob.invoice_header_date
    }
}



let invoiceNumber = 0;
const getInvoiceNumber = (ob) => {
    if (invoiceNumber==ob.invoice_header_number){
        return ""
    }else {
        invoiceNumber=ob.invoice_header_number;
        return `<p class="text-end">${ob.invoice_header_number}</p>`;
    }
}


const getNetInvoiceValue = (ob) => {
    return `<p class="text-end">${Number(ob.net_invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}


const printProductionReport = async ()=>{

    await refreshProductionReportTable();


    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Deleted Sales Report</title>
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
            <p class="text-center" style="font-size: 14px; font-weight: bold;">Deleted Sales report</p>
                <p class="text-center" style="font-size: 11px">${deleteStockReport.fromdate} To ${deleteStockReport.todate}</p>

    </div>
</div>

<div class="row" style="margin: 5px">
${tableDeletedSalesReportPrint.outerHTML}
</div>

</body>
</html>
    `);


    setTimeout(()=>{
        newWindow.stop();
        newWindow.print();
        newWindow.close();
        window.location.reload();
    },3000)



}



































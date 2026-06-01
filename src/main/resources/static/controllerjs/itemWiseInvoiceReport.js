window.addEventListener('load',function (){

    refreshProductionReportForm();




})

const refreshProductionReportForm = ()=>{

    itemWiseInvoiceReport = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";

    selectFromDate.value="";
    selectToDate.value="";


}

const refreshItemWiseReportTable = ()=>{

    const itemWiseInvoiceList = ajaxGetRequest(`/item-wise-sales-report/report/${itemWiseInvoiceReport.fromdate}/${itemWiseInvoiceReport.todate}`);

    const displayColumns = [
        {dataType:'text',propertyName:'customer_name'},
        {dataType:'function',propertyName:getLocationName},
        {dataType:'text',propertyName:'invoice_date'},
        {dataType:'function',propertyName:getInvoiceNumber},
        {dataType:'function',propertyName:getInvoiceCode},
        {dataType:'function',propertyName:getItemShortName},
        {dataType:'function',propertyName:getAmount},
    ]


    fillDataIntoTable2(tableItemWiseInvoiceReportPrint,itemWiseInvoiceList,displayColumns,false);


}

let invoiceNumber =0;
let invoiceCode ="";
let locationName = "";

const getInvoiceNumber = (ob)=>{
    if (invoiceNumber == ob.invoice_number){
        return " ";
    }else {
        invoiceNumber=ob.invoice_number;
        return `<div class="text-end">${Number(ob.invoice_number)}</div>`
    }
}



const getInvoiceCode = (ob)=>{
    if (invoiceCode == ob.header_key){
        return " ";
    }else {
        invoiceNumber=ob.header_key;
        return `<div class="text-end">${ob.header_key}</div>`
    }
}





const getItemRate = (ob)=>{
    return `<p class="text-end">${Number(ob.rate).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}

const getItemShortName = (ob)=>{
    return `<p style="font-size: 9px">${ob.item_short_name}</p>`;
}


const getQuantity = (ob)=>{
    return `<p class="text-end">${Number(ob.invoice_detail_quantity).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}

const getAmount = (ob)=>{
    return `<div class="text-end">${Number(ob.invoice_value_final).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
}

const getLocationName = (ob)=>{
    if (locationName==ob.location_name){
        return " "
    }else {
        locationName=ob.location_name;
        return ob.location_name;
    }
}

const printItemWiseInvoiceReport = async ()=>{

    await refreshItemWiseReportTable();


    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Item Wise Invoice Report</title>
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
            <p class="text-center" style="font-size: 14px; font-weight: bold;">Item Wise Invoice report</p>
            <p class="text-center" style="font-size: 11px">${itemWiseInvoiceReport.fromdate} To ${itemWiseInvoiceReport.todate}</p>

    </div>
</div>

<div class="row" style="margin: 5px">
${tableItemWiseInvoiceReportPrint.outerHTML}
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



































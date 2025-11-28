window.addEventListener('load',function (){

    refreshProductionReportForm();




})

const refreshProductionReportForm = ()=>{

    vpsReport = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";

    selectFromDate.value="";
    selectToDate.value="";


}

const refreshProductionReportTable = ()=>{

    const productionReportList = ajaxGetRequest(`/vpsReport/${vpsReport.fromdate}/${vpsReport.todate}`);

    const displayColumns = [
        {dataType:'text',propertyName:'vps_header_saved_date'},
        {dataType:'function',propertyName:getInvoiceNumber},
        {dataType:'function',propertyName:getVpsCode},
        {dataType:'function',propertyName:getVpsNumber},
        {dataType:'text',propertyName:'vps_details_date'},
        {dataType:'function',propertyName:getVpsAmount},
        {dataType:'text',propertyName:'vps_details_payment_type'},
    ]


    fillDataIntoTable2(tableVpsReportPrint,productionReportList,displayColumns,false);


}

let invoiceNumber = ""
const getInvoiceNumber = (ob)=>{
    if (invoiceNumber == ob.vps_header_invoice_number){
        return "";
    }else {
        invoiceNumber = ob.vps_header_invoice_number
        return `<p class="text-end">${ob.vps_header_invoice_number}</p>`
    }

}



let vpsCode = ""
const getVpsCode =(ob)=>{
    if (vpsCode == ob.vps_header_key){
        return "";
    }else {
        vpsCode = ob.vps_header_key;
        return ob.vps_header_key;
    }
}




let vpsNumber = ""
const getVpsNumber = (ob)=>{

    if (vpsNumber==ob.vps_header_number){
        return "";
    }else {
        vpsNumber=ob.vps_header_number
        return `<p class="text-end">${ob.vps_header_number}</p>`
    }
}



const getVpsAmount = (ob)=>{
    return `<p class="text-end">${Number(ob.vps_details_amount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`
}




const printVpsReport = async ()=>{

    await refreshProductionReportTable();


    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vps Report</title>
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
            <p class="text-center" style="font-size: 14px; font-weight: bold;">Vps report</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${tableVpsReportPrint.outerHTML}
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



































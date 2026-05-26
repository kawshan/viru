window.addEventListener('load',function (){

    refreshSalesReportForm();




})

const refreshSalesReportForm = ()=>{

    salesReport = new Object();

    selectFromDate.style.border="2px solid #ced4da";
    selectToDate.style.border="2px solid #ced4da";

    selectFromDate.value="";
    selectToDate.value="";


    locationList = ajaxGetRequest("/location-master/withoutProduction");
    fillDataIntoSelect(selectBranch,'Select Branch',locationList,'location_master_name');

}

const refreshSalesReportTable = ()=>{

    const selectedBranch = JSON.parse(selectBranch.value);
    console.log(selectedBranch);

    const branchID = selectedBranch.id;


    const salesReportList = ajaxGetRequest(`/sales-report/${salesReport.fromdate}/${salesReport.todate}/${branchID}`);

    const displayColumns = [
        {dataType:'function',propertyName:getDate},
        {dataType:'text',propertyName:'invoice_key'},
        {dataType:'text',propertyName:'customer_name'},
        {dataType:'function',propertyName:getCash},
        {dataType:'function',propertyName:getCredit},
        {dataType:'function',propertyName:getOnlineTransfer},
        {dataType:'function',propertyName:getVpsAmount},
    ]


    fillDataIntoTable2(tableSalesReportPrint,salesReportList,displayColumns,false);


}

let totalCashAmount = 0;
let totalCreditAmount = 0;
let totalOnlineTransfer = 0;
let totalVpsAMount = 0;


const getDate = (ob)=>{
    return ob.invoice_date
}


const getCash = (ob)=>{
    if(ob.additional_discount==null){
        if (ob.payment_type==="cash"){
            totalCashAmount=totalCashAmount+Number(ob.total_invoice_value);
            return `<div class="text-end">${Number(ob.total_invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
        }else if (ob.payment_type==="credit"){
            return " "
        }else if (ob.payment_type==="online-transfer"){
            return " "
        }else if (ob.payment_type==="vps"){
            return " "
        }
    }else {

        // additional discount ekak thiyenawa nam

        if (ob.payment_type==="cash"){
            totalCashAmount=totalCashAmount+Number(ob.total_invoice_value)-(Number(ob.total_invoice_value)/100)*Number(ob.additional_discount);
            return `<div class="text-end">${(Number(ob.total_invoice_value)-(Number(ob.total_invoice_value)/100)*Number(ob.additional_discount)).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
        }else if (ob.payment_type==="credit"){
            return " "
        }else if (ob.payment_type==="online-transfer"){
            return " "
        }else if (ob.payment_type==="vps"){
            return " "
        }
    }
}


const getCredit = (ob)=>{

    if (ob.additional_discount==null){
        if (ob.payment_type==="credit"){
            totalCreditAmount=totalCreditAmount+Number(ob.total_invoice_value);
            return `<div class="text-end">${Number(ob.total_invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
        }else if (ob.payment_type==="cash"){
            return " "
        }else if (ob.payment_type==="online-transfer"){
            return " "
        }else if (ob.payment_type==="vps"){
            return " "
        }
    }else{

        // additonal discount credit

        if (ob.payment_type==="credit"){
            totalCreditAmount=totalCreditAmount+Number(ob.total_invoice_value)-(Number(ob.total_invoice_value)/100)*Number(ob.additional_discount);
            return `<div class="text-end">${(Number(ob.total_invoice_value)-(Number(ob.total_invoice_value)/100)*Number(ob.additional_discount)).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
        }else if (ob.payment_type==="cash"){
            return " "
        }else if (ob.payment_type==="online-transfer"){
            return " "
        }else if (ob.payment_type==="vps"){
            return " "
        }
    }
}



const getVpsAmount= (ob)=>{

    if(ob.additional_discount==null){
        if (ob.payment_type==="vps"){
            totalVpsAMount=totalVpsAMount+Number(ob.total_invoice_value);
            return `<div class="text-end">${Number(ob.total_invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
        }else if (ob.payment_type==="cash"){
            return " "
        }else if (ob.payment_type==="credit"){
            return " "
        }else if (ob.payment_type==="online-transfer"){
            return " "
        }
    }else{
        if (ob.payment_type==="vps"){
            totalVpsAMount=totalVpsAMount+Number(ob.total_invoice_value)-(Number(ob.total_invoice_value)/100)*Number(ob.additional_discount);
            return `<div class="text-end">${(Number(ob.total_invoice_value)-(Number(ob.total_invoice_value)/100)*Number(ob.additional_discount)).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
        }else if (ob.payment_type==="cash"){
            return " "
        }else if (ob.payment_type==="credit"){
            return " "
        }else if (ob.payment_type==="online-transfer"){
            return " "
        }
    }






}


const getOnlineTransfer = (ob)=>{

    if (ob.additional_discount==null){
        if (ob.payment_type==="online-transfer"){
            totalOnlineTransfer=totalOnlineTransfer+Number(ob.total_invoice_value);
            return `<div class="text-end">${Number(ob.total_invoice_value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
        }else if (ob.payment_type==="cash"){
            return " "
        }else if (ob.payment_type==="credit"){
            return " "
        }else if (ob.payment_type==="vps"){
            return " "
        }
    }else {
        if (ob.payment_type==="online-transfer"){
            totalOnlineTransfer=totalOnlineTransfer+Number(ob.total_invoice_value)-(Number(ob.total_invoice_value)/100)*Number(ob.additional_discount);
            return `<div class="text-end">${(Number(ob.total_invoice_value)-(Number(ob.total_invoice_value)/100)*Number(ob.additional_discount)).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</div>`
        }else if (ob.payment_type==="cash"){
            return " "
        }else if (ob.payment_type==="credit"){
            return " "
        }else if (ob.payment_type==="vps"){
            return " "
        }
    }


}


const printSalesReport = async ()=>{

    const selectedBranch = JSON.parse(selectBranch.value);
    console.log(selectedBranch);

    const branchName = selectedBranch.location_master_name


    await refreshSalesReportTable();

    tfootCash.innerText=totalCashAmount.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2});
    tfootCredit.innerText=totalCreditAmount.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2});
    tfootOnlineTransfer.innerText=totalOnlineTransfer.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2});
    tfootVps.innerText=totalVpsAMount.toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2});

    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sales Report</title>
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
            <u class="text-center" style="font-size: 14px; font-weight: bold;">Sales report</u>
            <p class="text-center" style="font-size: 11px">${salesReport.fromdate} To ${salesReport.todate}</p>
            <p class="text-center" style="font-size: 11px; font-weight: bold">${branchName}</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${tableSalesReportPrint.outerHTML}
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



































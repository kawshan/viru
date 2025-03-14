window.addEventListener('load',function (){

    refreshStockReportForm();






});



const refreshStockReportForm = ()=>{
    stockReport = new Object();

    selectItem.style.border='2px solid #ced4da';
    selectFromDate.style.border='2px solid #ced4da';
    selectToDate.style.border='2px solid #ced4da';


    selectFromDate.value="";
    selectToDate.value="";

    itemsList = ajaxGetRequest("/item-master/findall")
    fillDataIntoSelect(selectItem,'Select Item',itemsList,'item_short_name');
}

const LoadDataIntoTableForPrint = ()=>{

    selectedItem = JSON.parse(selectItem.value)
    console.log(selectedItem.id);



    reportList = ajaxGetRequest(`/stock-report/${selectedItem.id}/${selectFromDate.value}/${selectToDate.value}`);


    displayProperty=[
        {dataType:'function',propertyName:getDate},
        {dataType:'function',propertyName:getProductionCode},
        {dataType:'function',propertyName:getInvoiceNumber},
        {dataType:'function',propertyName:getIn},
        {dataType:'function',propertyName:getOut},
        {dataType:'function',propertyName:getBalance},
    ];

    fillDataIntoTableForStockReportPrint(tableStockReportPrint,reportList,displayProperty,false);


}



let runningValue = 0;


const getPreviousValues = ()=>{

    let rawMaterialId = selectedItem.id;
    let fromDate = selectFromDate.value

    const serverResponse = ajaxGetRequest(`/stock-report/getPreviousValue/${rawMaterialId}/${fromDate}`);
    const previousValue =  Number(serverResponse);
    console.log(`previous value as a number ${previousValue}`);
    runningValue=previousValue;
    return `<p class="text-end">${Number(previousValue).toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;

}




const getDate = (ob)=>{
    return ob.dates;
}


const getProductionCode = (ob)=>{
        if (ob.colType=="production"){
            return `<p class="text-end">${ob.code}</p>`;
        }else if (ob.colType=="invoice"){
            return " "
        }
}


const getInvoiceNumber = (ob)=>{
    if (ob.colType=="invoice"){
        return `<p class="text-end">${ob.code}</p>`;
    }else if (ob.colType=="production"){
        return " ";
    }
}


const getIn = (ob)=>{
    if (ob.colType=="production"){
        runningValue=runningValue+Number(ob.itemQuantity);
        return `<p class="text-end">${Number(ob.itemQuantity).toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
    }else if (ob.colType=="invoice"){
        return " "
    }
}


const getOut = (ob)=>{
    if (ob.colType=="invoice"){
        runningValue=runningValue-Number(ob.itemQuantity);
        return `<p class="text-end">${Number(ob.itemQuantity).toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
    }else if (ob.colType=="production"){
        return " ";
    }
}


const getBalance = () =>{
    return `<p class="text-end">${Number(runningValue).toLocaleString('en-us',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`;
}



const printStockReport = async ()=>{

    await LoadDataIntoTableForPrint()

    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice Print</title>
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
            <p class="text-center" style="font-size: 14px; font-weight: bold;">Stock report</p>
    </div>
</div>

<div class="row" style="margin: 5px">
${tableStockReportPrint.outerHTML}
</div>

</body>
</html>
    
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();




}












































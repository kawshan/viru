window.addEventListener('load',function (){

    refreshPdcMasterForm();


    refreshPdcMasterTable();


})

const refreshPdcMasterForm = ()=>{
    PdcMaster = new Object();

    textPdcCreateDate.style.border="2px solid #ced4da";
    textPdcBankName.style.border="2px solid #ced4da";
    textPdcBranchName.style.border="2px solid #ced4da";
    textPdcChequeNo.style.border="2px solid #ced4da";
    textPdcAmount.style.border="2px solid #ced4da";
    textPdcDate.style.border="2px solid #ced4da";
    selectPdcStatus.style.border="2px solid #ced4da";


    textPdcCreateDate.value="";
    textPdcBankName.value="";
    textPdcBranchName.value="";
    textPdcChequeNo.value="";
    textPdcAmount.value="";
    textPdcDate.value="";


    pdcStatusesList= ajaxGetRequest("/pdc_status/findall");
    fillDataIntoSelect(selectPdcStatus,'Select Pdc Status',pdcStatusesList,'name');


    buttonPdcUpdate.style.cursor="not-allowed";
    buttonPdcUpdate.disabled=true;

    buttonPdcSave.style.cursor="default"
    buttonPdcSave.disabled=false;


}


const refreshPdcMasterTable = ()=>{

    const pdcList = ajaxGetRequest("/pdc_master/findall");


    const displayProperty = [
        {dataType:'text',propertyName:'pdc_master_created_date'},
        {dataType:'text',propertyName:'pdc_master_bank_name'},
        {dataType:'text',propertyName:'pdc_master_branch_name'},
        {dataType:'text',propertyName:'pdc_master_cheque_no'},
        {dataType:'function',propertyName:getPdcMasterAmount},
        {dataType:'text',propertyName:'pdc_master_pdc_date'},
        {dataType:'function',propertyName:getPdcStatus}
    ];

    // if ($.fn.DataTable.isDataTable("#tablePDCMaster")){
    //     $("#tablePDCMaster").DataTable.destroy();
    // }


    fillDataIntoTable2(tablePDCMaster,pdcList,displayProperty,true,divModifyButton);
    $("#tablePDCMaster").dataTable();

}

const getPdcMasterAmount = (ob)=>{
    return `<p class="text-end">${Number(ob.pdc_master_amount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</p>`
}

const getPdcStatus = (ob)=>{
    return ob.pdc_status_id.name;
}


const checkErrorsPdc = ()=>{
    let errors = '';

    if (PdcMaster.pdc_master_created_date == null){
        errors=errors+"Created Date Cannot Be Empty \n"
    }

    if (PdcMaster.pdc_master_bank_name == null){
        errors=errors+"Bank Name Cannot Be Empty \n"
    }

    if (PdcMaster.pdc_master_branch_name == null){
        errors=errors+"Branch Name Cannot Be Empty \n"
    }

    if (PdcMaster.pdc_master_cheque_no == null){
        errors=errors+"Cheque No Cannot Be Empty \n"
    }

    if (PdcMaster.pdc_master_amount == null){
        errors=errors+"Amount Cannot Be Empty \n"
    }

    if (PdcMaster.pdc_status_id == null){
        errors=errors+"Status Cannot Be Empty \n"
    }


    return errors;
}



const submitPdcMaster = ()=>{
    let errors = checkErrorsPdc();

    if (errors==""){

        const userConfirm = confirm(`Are You Sure To Add Following PDC \n
        Created date Is ${PdcMaster.pdc_master_created_date}
        Bank Name Is ${PdcMaster.pdc_master_bank_name}
        Branch is ${PdcMaster.pdc_master_branch_name}
        Cheque No ${PdcMaster.pdc_master_cheque_no}
        Amount ${PdcMaster.pdc_master_amount}
        `);
        if (userConfirm){
            const postServerResponse = ajaxPostRequest("/pdc_master",PdcMaster);
            if (postServerResponse=="ok"){
                alert("Save Successful");
                refreshPdcMasterForm();
                refreshPdcMasterTable();
            }else {
                alert(`Save Unsuccessful ${postServerResponse}`);
            }
        }
    }else {
        alert(`You Have Following Errors \n ${errors}`);
    }
}


const refillPdc = (ob)=>{
    PdcMaster=JSON.parse(JSON.stringify(ob))
    oldPdcMaster=JSON.parse(JSON.stringify(ob))

    textPdcCreateDate.value = PdcMaster.pdc_master_created_date
    textPdcBankName.value = PdcMaster.pdc_master_bank_name
    textPdcBranchName.value = PdcMaster.pdc_master_branch_name
    textPdcChequeNo.value = PdcMaster.pdc_master_cheque_no
    textPdcAmount.value = PdcMaster.pdc_master_amount
    textPdcDate.value = PdcMaster.pdc_master_pdc_date


    pdcStatusesList= ajaxGetRequest("/pdc_status/findall");
    fillDataIntoSelect(selectPdcStatus,'Select Pdc Status',pdcStatusesList,'name',PdcMaster.pdc_status_id.name);


    buttonPdcUpdate.style.cursor="default";
    buttonPdcUpdate.disabled=false;


    buttonPdcSave.style.cursor="not-allowed"
    buttonPdcSave.disabled=true;


}


const checkUpdatesPDC = ()=>{

    let updates= ''

    if (PdcMaster.pdc_master_created_date!=oldPdcMaster.pdc_master_created_date){
        updates=updates+"Created Date Is Updated \n"
    }

    if (PdcMaster.pdc_master_bank_name!=oldPdcMaster.pdc_master_bank_name){
        updates=updates+"Bank Is Updated \n"
    }


    if (PdcMaster.pdc_master_branch_name!=oldPdcMaster.pdc_master_branch_name){
        updates=updates+"Branch Is Updated \n"
    }


    if (PdcMaster.pdc_master_cheque_no!=oldPdcMaster.pdc_master_cheque_no){
        updates=updates+"Cheque No Is Updated \n"
    }


    if (PdcMaster.pdc_master_amount!=oldPdcMaster.pdc_master_amount){
        updates=updates+"Amount Is Updated \n"
    }

    if (PdcMaster.pdc_master_pdc_date!=oldPdcMaster.pdc_master_pdc_date){
        updates=updates+"PDC Date Is Updated \n"
    }

    if (PdcMaster.pdc_status_id.name!=oldPdcMaster.pdc_status_id.name){
        updates=updates+"Status Is Updated \n"
    }

    return updates;
}



const updatePDC = ()=>{

let errors = checkErrorsPdc();
if (errors==""){

    let updates = checkUpdatesPDC();
    if (updates!=""){
        const userConfirm = confirm(`Are You Sure To Update Following Changes \n ${updates}`)
        if (userConfirm){
            const putServerResponse = ajaxPutRequest("/pdc_master",PdcMaster);
            if (putServerResponse=="ok"){
                alert(`Update Successful`);
                refreshPdcMasterForm();
                refreshPdcMasterTable();
                divModifyButton.classList.add('d-none')
            }else {
                alert(`Update Unsuccessful ${putServerResponse}`);
            }
        }else {
            alert(`user cancelled the operation`)
        }
    }else {
        alert("nothing to Update")
    }


}else {
    alert(`You Have Following Errors ${errors}`)
}
}


const deletePdc = (ob)=>{

    const userConfirm = confirm(`Are You Sure To Confirm Following PDC \n
        Created date Is ${ob.pdc_master_created_date}
        Bank Name Is ${ob.pdc_master_bank_name}
        Branch is ${ob.pdc_master_branch_name}
        Cheque No ${ob.pdc_master_cheque_no}
        Amount ${ob.pdc_master_amount}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/pdc_master",ob);
        if (deleteServerResponse=="ok"){
            alert("Delete Successful");
            refreshPdcMasterForm();
            refreshPdcMasterTable();
            divModifyButton.classList.add('d-none')
        }else {
            alert(`Delete Unsuccessful \n ${deleteServerResponse}`);
        }
    }
}



const printPdcFullTable = async ()=>{
    await fillDataIntoTablePrint();
    const newWindow = window.open();
    await newWindow.document.write(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PDC Details</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body style="font-family: Verdana,serif">

<div class="container-fluid" style="position: relative">

    <div class="row mb-2 text-center" style="margin-top: 1cm">
        <p style="font-size: 14px; font-weight: bold;">All PDC Details</p>
    </div>

    <div class="row" style="padding: 3px">
       ${tablePDCMasterPrint.outerHTML} 
    </div>
</div>
</body>
</html>
    
    `)
    newWindow.stop();
    newWindow.print();
    newWindow.close();
}


const fillDataIntoTablePrint = ()=>{
    const pdcList = ajaxGetRequest("/pdc_master/findall");


    const displayProperty = [
        {dataType:'text',propertyName:'pdc_master_created_date'},
        {dataType:'text',propertyName:'pdc_master_bank_name'},
        {dataType:'text',propertyName:'pdc_master_branch_name'},
        {dataType:'text',propertyName:'pdc_master_cheque_no'},
        {dataType:'function',propertyName:getPdcMasterAmount},
        {dataType:'text',propertyName:'pdc_master_pdc_date'},
        {dataType:'function',propertyName:getPdcStatus}
    ];


    fillDataIntoTable2(tablePDCMasterPrint,pdcList,displayProperty,false);
}

const printOnePdc =async (ob)=>{
    const newWindow = window.open();
    newWindow.document.write(`
    <!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PDC Print</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body style="font-family: Verdana">
<div class="container-fluid">

    <div class="row text-center">
        <p style="font-size: 14px; font-weight: bolder">PDC Details</p>
    </div>

    <table class="table table-bordered" style="font-size: 12px">
        <thead>
        <th style="width: 30%">Properties</th>
        <th>Description</th>
        </thead>

        <tbody>

        <tr>
            <td>Created Date</td>
            <td>${ob.pdc_master_created_date}</td>
        </tr>

        <tr>
            <td>Bank name</td>
            <td>${ob.pdc_master_bank_name}</td>
        </tr>


        <tr>
            <td>Branch Name</td>
            <td>${ob.pdc_master_branch_name}</td>
        </tr>
        
        <tr>
            <td>Cheque No</td>
            <td>${ob.pdc_master_cheque_no}</td>
        </tr>

        <tr>
            <td>Amount</td>
            <td>${ob.pdc_master_amount}</td>
        </tr>


        <tr>
            <td>PDC Date</td>
            <td>${ob.pdc_master_pdc_date}</td>
        </tr>
        
        <tr>
            <td>Status</td>
            <td>${ob.pdc_status_id.name}</td>
        </tr>
        
        </tbody>

    </table>
</div>
</body>
</html>
    
    `);

    newWindow.stop();
    newWindow.print();
    newWindow.close();
}






































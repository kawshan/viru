window.addEventListener('load',function (){

    refreshProductionHeaderTable()

    refreshProductionHeaderForm();

    getNextProductionNumber();
})

const refreshProductionHeaderForm = ()=>{

    productionHeader = new Object();

    textProHeaderDate.style.border="2px solid #ced4da";
    textProHeaderNumber.style.border="2px solid #ced4da";
    textProHeaderKey.style.border="2px solid #ced4da";

    textProHeaderDate.value="";
    textProHeaderNumber.value="";
    textProHeaderKey.value="";
}

const refreshProductionHeaderTable = ()=>{

    prductionHeadersList = ajaxGetRequest("/production-header/getLastHundredRows");

    divProductionHeaderTable.classList.remove('d-none');
    divProductionFullHeader.classList.add('d-none');

    displayProperty=[
        {dataType:'text',propertyName:'production_header_date'},
        {dataType:'text',propertyName:'production_header_number'},
        {dataType:'text',propertyName:'production_header_key'},
    ];

    if ($.fn.DataTable.isDataTable("#tableProductionHeader")){
        $("#tableProductionHeader").DataTable.destroy();
    }

    fillDataIntoTable2(tableProductionHeader,prductionHeadersList,displayProperty,true,divModifyButton2)
    $("#tableProductionHeader").DataTable();

}

const productionHeaderColorsReset = ()=>{
    textProHeaderDate.style.border="2px solid #ced4da";
    textProHeaderNumber.style.border="2px solid #ced4da";
    textProHeaderKey.style.border="2px solid #ced4da";
}




const checkErrorProductionHeaderForm = ()=>{

    let errors = '';

    if (productionHeader.production_header_date == null){
        errors=errors+"Date Cannot Be Empty \n"
    }

    if (productionHeader.production_header_number == null){
        errors=errors+"Number Cannot Be Empty \n"
    }
    return errors;
}


const saveOrUpdateProductionHeader = async ()=>{
    if (textProHeaderKey.value==''){
        console.log('save part');
        let errors = checkErrorProductionHeaderForm();
        if (errors==''){
            const userConfirm = confirm(`Are You Sure To Update Following Production header
            Date Is ${productionHeader.production_header_date}
            Number Is ${productionHeader.production_header_number}
            `)
            if (userConfirm){
                const postServerResponse = ajaxPostRequest("/production-header",productionHeader);
                if (postServerResponse){
                    alert(`Save Successful ${postServerResponse.production_header_key}`);
                    textProHeaderKey.value=postServerResponse.production_header_key;
                    productionHeaderColorsReset();
                    refreshProductionHeaderTable()
                }else {
                    alert(`Save Unsuccessful`);
                }
            }


        }else {
            alert(`You Have Following Errors \n ${errors}`);
        }
    }else {
        console.log('update part');

        const getIdFromServer = ajaxGetRequest(`/production-header/getIdFromHeaderKey/${textProHeaderKey.value}`)
        productionHeader.id = Number(getIdFromServer);
        productionHeader.production_header_key = textProHeaderKey.value;

        let errors = checkErrorProductionHeaderForm();
        if (errors==""){

            const userConfirm = confirm(`Are You Sure To Update Following Production header
            Date Is ${productionHeader.production_header_date}
            Number Is ${productionHeader.production_header_number}
            `);
            if (userConfirm){
                let putServerResponse = ajaxPutRequest("/production-header",productionHeader);
                if (putServerResponse=="ok"){
                    alert(`Update Successful`);
                    productionHeaderColorsReset();
                    refreshProductionHeaderTable();
                    divModifyButton2.classList.add('d-none');
                }else {
                    alert(`update unsuccessful \n ${putServerResponse}`)
                }
            }
        }else {
            alert(`You Have Following Errors \n`)
        }
    }
}


const refillProductHeader = (ob)=>{

    productionHeader = JSON.parse(JSON.stringify(ob));
    oldproductionHeader = JSON.parse(JSON.stringify(ob));


    textProHeaderDate.value=ob.production_header_date;
    textProHeaderNumber.value=ob.production_header_number;
    textProHeaderKey.value=ob.production_header_key;
}


const deleteProductHeader = (ob)=>{
    const userConfirm = confirm(`Are You Sure to delete following product 
            Date Is ${ob.production_header_date}
            Number Is ${ob.production_header_number}
    `);
    if (userConfirm){
        const deleteServerResponse = ajaxDeleteRequest("/production-header",ob);
        if (deleteServerResponse=="ok"){
            alert("delete successful \n");
            refreshProductionHeaderTable();
            divModifyButton2.classList.add('d-none');
        }else {
            alert(`delete unsuccessful`);
            refreshProductionHeaderTable();
        }
    }
}



const getNextProductionNumber = ()=>{
    const nextProductionNumberFromServer = ajaxGetRequest("/production-header/getNextProductionNumber");
    textProHeaderNumber.value=Number(nextProductionNumberFromServer);
    textProHeaderNumber.style.border="2px solid green";
    productionHeader.production_header_number = Number(nextProductionNumberFromServer);

}




const handelResetProductionHeader = ()=>{

    divModifyButton2.classList.add('d-none');

    refreshProductionHeaderForm();
    refreshProductionHeaderTable();

    getNextProductionNumber();

}

const loadFullProductionTable = async ()=>{

    buttonLoadFullTable.disabled=true;
    divProductionHeaderTable.classList.add('d-none');
    divProductionFullHeader.classList.remove('d-none');

    prductionHeadersList = ajaxGetRequest("/production-header/findall");

    displayProperty=[
        {dataType:'text',propertyName:'production_header_date'},
        {dataType:'text',propertyName:'production_header_number'},
        {dataType:'text',propertyName:'production_header_key'},
    ];

    if ($.fn.DataTable.isDataTable("#tableFullProductionHeader")){
        $("#tableFullProductionHeader").DataTable.destroy();
    }

    fillDataIntoTable2(tableFullProductionHeader,prductionHeadersList,displayProperty,true,divModifyButton2)
    $("#tableFullProductionHeader").DataTable();

    buttonLoadFullTable.disabled=false;

}










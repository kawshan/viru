const fillDataIntoSelect = (fieldId,message,dataList,property,selectedValue)=>{
    fieldId.innerHTML='';
    const optionMsj = document.createElement('option');
    optionMsj.innerText =message;
    optionMsj.selected='selected';
    optionMsj.disabled='disabled';
    fieldId.appendChild(optionMsj);


    dataList.forEach(element=>{
        const option = document.createElement('option');
        option.innerText=element[property];
        option.value=JSON.stringify(element); // json string ekak set kararanna one nisa meka dynamic dropdown mewa data base eken gannn one
        if (selectedValue == element[property]){
            option.selected='selected';
            console.log("ok")
        }
        fieldId.appendChild(option);
    })
}

const fillDataIntoDataList = (fieldId,dataList,property,selectedValue) =>{
    console.log("fill into data list")
    fieldId.innerHTML='';
    for (const ob of dataList){
        let option = document.createElement('option');
        option.value=ob[property];
        fieldId.appendChild(option);
    }
}































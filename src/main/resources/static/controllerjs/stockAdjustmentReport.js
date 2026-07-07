window.addEventListener('load',()=>{

    refreshStockTransferForm();


});

const refreshStockTransferForm = ()=>{


    stockTransferReport = new Object();

    selectFromDate.style.border= "2px solid #ced4da";
    selectToDate.style.border= "2px solid #ced4da";

    selectFromDate.value = "";
    selectToDate.value = "";


    branchesList = ajaxGetRequest("/location-master/findall");
    fillDataIntoSelectWithValueAll(selectBranch,'Select Branch',branchesList,'location_master_name');

}


// const print = ()=>{
//
//     const selectedLocation = JSON.parse(stockTransferReport.branch)
//     const fromDate = stockTransferReport.fromdate;
//     const toDate = stockTransferReport.todate;
//
//     const serverResponse = ajaxGetRequest(`/stock-adjustment-report/${selectedLocation.id}/${fromDate}/${toDate}`);
//
//     const newWindow = window.open();
//     newWindow.document.write(``)
//
//
//
// }



const print = () => {

    // const selectedLocation = JSON.parse(stockTransferReport.branch);
    // const fromDate = stockTransferReport.fromdate;
    // const toDate = stockTransferReport.todate;

    const serverResponse = ajaxGetRequest(
        `/stock-adjustment-report/${stockTransferReport.branch.id}/${selectFromDate.value}/${selectToDate.value}`
    );

    const rows = serverResponse.map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.key}</td>
            <td>${item.number}</td>
            <td>${item.item_short_name}</td>
            <td>${item.quantity}</td>
        </tr>
    `).join("");

    const newWindow = window.open();

    newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Stock Adjustment Report</title>

            <style>
                body {
                    font-family: Verdana, sans-serif;
                    font-size: 11px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th, td {
                    border: 1px solid black;
                    padding: 5px;
                    font-size: 11px;
                    font-family: Verdana, sans-serif;
                }

                th {
                    text-align: center;
                }

                td {
                    text-align: left;
                }

                .quantity {
                    text-align: right;
                }
            </style>

        </head>

        <body>

<h3 style="font-size:14px; font-family:Verdana; text-align:center;">
    Stock Adjustment Report
</h3>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Code</th>
                        <th>Number</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>

                <tbody>
                    ${rows}
                </tbody>

            </table>

        </body>
        </html>
    `);

    newWindow.document.close();
};


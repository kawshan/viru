window.addEventListener('load', function () {

    refreshStockReportForm();


});


const refreshStockReportForm = () => {
    stockReport = new Object();

    selectItem.style.border='2px solid #ced4da';
    selectFromDate.style.border = '2px solid #ced4da';
    selectToDate.style.border = '2px solid #ced4da';


    selectFromDate.value = "";
    selectToDate.value = "";

    itemsList = ajaxGetRequest("/item-master/findall")
    fillDataIntoSelectWithValueAll(selectItem,'Select Item',itemsList,'item_short_name');


    branchesList = ajaxGetRequest("/location-master/findall");
    fillDataIntoSelectWithValueAll(selectBranch,'Select Branch',branchesList,'location_master_name');


}


// const printReport =()=>{
//
//     console.log(stockReport.branch.id);
//     console.log(stockReport.item.id);
//     console.log(stockReport.fromdate);
//     console.log(stockReport.todate);
//
//
//     const getPreviousValueFromServer = ajaxGetRequest(
//         `stock-report-item-vise/get-previous-quantity?locationId=${stockReport.branch.id}&itemId=${stockReport.item.id}&fromDate=${stockReport.fromdate}`
//     );
//
//     console.log(`previous value ${Number(getPreviousValueFromServer)}`)
//
//
//     // in here we request our stock report from server.
//     const getQueryResultFromServer = ajaxGetRequest(
//         `stock-report-item-vise/get-stock-report?locationId=${stockReport.branch.id}&itemId=${stockReport.item.id}&fromDate=${stockReport.fromdate}&toDate=${stockReport.todate}`
//     );
//     console.log('Query result',getQueryResultFromServer);
//
//
//     const newWindow = window.open();
//     newWindow.document.write(``)
//
//
//
//
// }







const printReport = () => {

    const previousBalance = Number(
        ajaxGetRequest(
            `stock-report-item-vise/get-previous-quantity?locationId=${stockReport.branch.id}&itemId=${stockReport.item.id}&fromDate=${stockReport.fromdate}`
        )
    );

    const getQueryResultFromServer = ajaxGetRequest(
        `stock-report-item-vise/get-stock-report?locationId=${stockReport.branch.id}&itemId=${stockReport.item.id}&fromDate=${stockReport.fromdate}&toDate=${stockReport.todate}`
    );

    let runningBalance = previousBalance;

    // Opening Balance Row
    let tableRows = `
        <tr style="font-weight:bold;background:#f3f3f3;">
            <td colspan="4">Previous Balance</td>
            <td style="text-align:right">${runningBalance.toFixed(3)}</td>
        </tr>
    `;

    getQueryResultFromServer.forEach(item => {

        const qty = Number(item.item_quantity);

        if (item.code.startsWith("ADJ")) {
            // Can be + or -
            runningBalance += qty;
        }
        else if (item.code.startsWith("IN")) {
            runningBalance -= qty;
        }
        else if (item.code.startsWith("STTR")) {
            runningBalance += qty;
        }

        tableRows += `
            <tr>
                <td>${item.date}</td>
                <td>${item.code}</td>
                <td>${item.item_name}</td>
                <td style="text-align:right">${qty.toFixed(3)}</td>
                <td style="text-align:right">${runningBalance.toFixed(3)}</td>
            </tr>
        `;
    });

    const newWindow = window.open();

    newWindow.document.write(`
        <html>
        <head>
            <title>Stock Report Item Wise</title>
            <style>
                body{
                    font-family:Arial;
                    margin:20px;
                }

                table{
                    width:100%;
                    border-collapse:collapse;
                }

                th,td{
                    border:1px solid #000;
                    padding:8px;
                }

                th{
                    background:#eee;
                }

                td:nth-child(4),
                td:nth-child(5){
                    text-align:right;
                }
            </style>
        </head>

        <body>

            <h2 style="text-align:center;">Stock Report Item Wise</h2>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Code</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Balance</th>
                    </tr>
                </thead>

                <tbody>
                    ${tableRows}
                </tbody>
            </table>

        </body>
        </html>
    `);

    newWindow.document.close();
}



































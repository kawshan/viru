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








const printReport = () => {

    const getQueryResultFromServer = ajaxGetRequest(
        `stock-report-item-vise/get-stock-report?locationId=${stockReport.branch.id}&itemId=${stockReport.item.id}&fromDate=${stockReport.fromdate}&toDate=${stockReport.todate}`
    );

    let runningBalance = 0;
    let tableRows = "";

    getQueryResultFromServer.forEach(item => {

        const qty = Number(item.item_quantity);

        if (item.code.startsWith("ADJ")) {
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
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }

                h2{
                    text-align: center;
                }

                table{
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th, td{
                    border: 1px solid #000;
                    padding: 8px;
                }

                th{
                    background: #eee;
                }

                td:nth-child(4),
                td:nth-child(5){
                    text-align: right;
                }
            </style>
        </head>

        <body>

            <h2>Stock Report Item Wise</h2>

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

































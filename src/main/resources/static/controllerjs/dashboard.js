window.addEventListener('load',function (){

    const user = JSON.parse(localStorage.getItem('loggedUser'));

    if (!user) {
        window.location.href = '/login'; // Redirect if not logged in
    } else {
        document.getElementById('lblUserName').innerText = `Welcome ${user.username} `;
        document.getElementById('lblUserRole').innerText = `Role : ${user.role} `;



        // Role-based UI
        if (user.role == 'admin') {

            // item section eka
            document.getElementById('itemCategoryButton').style.display = 'block';
            document.getElementById('itemButton').style.display = 'block';
            document.getElementById('productionButton').style.display = 'block';
            document.getElementById('stockAdjustmentButton').style.display = 'block';
            document.getElementById('locationButton').style.display = 'block';
            document.getElementById('stockTransferButton').style.display = 'block';

            // customer section
            document.getElementById('customerButton').style.display = 'block';
            document.getElementById('schoolButton').style.display = 'block';
            document.getElementById('studentButton').style.display = 'block';
            document.getElementById('vpsButton').style.display = 'block';

            // invoice section
            document.getElementById('invoiceButton').style.display = 'block';

            // collection button
            document.getElementById('collectionButton').style.display = 'block';

            //stock report button
            document.getElementById('stockReportButton').style.display = 'block';
            document.getElementById('salesReportButton').style.display = 'block';
            document.getElementById('productionReportButton').style.display = 'block';
            document.getElementById('newProductionReportButton').style.display = 'block';
            document.getElementById('stockTransferReportButton').style.display = 'block';
            document.getElementById('vpsReportButton').style.display = 'block';
            document.getElementById('deleteStockReport').style.display = 'block';

            //per forma button
            document.getElementById('performaButton').style.display = 'block';


        }
        else if (user.role === 'production'){
            // item section eka
            document.getElementById('itemCategoryButton').style.display = 'none';
            document.getElementById('itemButton').style.display = 'none';
            document.getElementById('productionButton').style.display = 'block';
            document.getElementById('stockAdjustmentButton').style.display = 'none';
            document.getElementById('locationButton').style.display = 'none';
            document.getElementById('stockTransferButton').style.display = 'block';

            // customer section
            document.getElementById('customerButton').style.display = 'none';
            document.getElementById('schoolButton').style.display = 'none';
            document.getElementById('studentButton').style.display = 'none';
            document.getElementById('vpsButton').style.display = 'none';

            // invoice section
            document.getElementById('invoiceButton').style.display = 'none';

            // collection button
            document.getElementById('collectionButton').style.display = 'none';

            //stock report button
            document.getElementById('stockReportButton').style.display = 'none';
            document.getElementById('salesReportButton').style.display = 'none';
            document.getElementById('productionReportButton').style.display = 'none';
            document.getElementById('newProductionReportButton').style.display = 'none';
            document.getElementById('stockTransferReportButton').style.display = 'none';
            document.getElementById('vpsReportButton').style.display = 'none';
            document.getElementById('deleteStockReport').style.display = 'none';


            //per forma button
            document.getElementById('performaButton').style.display = 'none';

        }
        else if (user.role === 'invoice'){
            // item section eka
            document.getElementById('itemCategoryButton').style.display = 'block';
            document.getElementById('itemButton').style.display = 'block';
            document.getElementById('productionButton').style.display = 'none';
            document.getElementById('stockAdjustmentButton').style.display = 'none';
            document.getElementById('locationButton').style.display = 'none';
            document.getElementById('stockTransferButton').style.display = 'none';

            // customer section
            document.getElementById('customerButton').style.display = 'block';
            document.getElementById('schoolButton').style.display = 'block';
            document.getElementById('studentButton').style.display = 'block';
            document.getElementById('vpsButton').style.display = 'block';

            // invoice section
            document.getElementById('invoiceButton').style.display = 'block';

            // collection button
            document.getElementById('collectionButton').style.display = 'block';

            //stock report button
            document.getElementById('stockReportButton').style.display = 'none';
            document.getElementById('salesReportButton').style.display = 'none';
            document.getElementById('productionReportButton').style.display = 'none';
            document.getElementById('newProductionReportButton').style.display = 'none';
            document.getElementById('stockTransferReportButton').style.display = 'none';
            document.getElementById('vpsReportButton').style.display = 'none';
            document.getElementById('deleteStockReport').style.display = 'none';


            //per forma button
            document.getElementById('performaButton').style.display = 'block';
        }
        else if (user.role === 'manager'){
            // item section eka
            document.getElementById('itemCategoryButton').style.display = 'block';
            document.getElementById('itemButton').style.display = 'block';
            document.getElementById('productionButton').style.display = 'block';
            document.getElementById('stockAdjustmentButton').style.display = 'block';
            document.getElementById('locationButton').style.display = 'block';
            document.getElementById('stockTransferButton').style.display = 'block';

            // customer section
            document.getElementById('customerButton').style.display = 'block';
            document.getElementById('schoolButton').style.display = 'block';
            document.getElementById('studentButton').style.display = 'block';
            document.getElementById('vpsButton').style.display = 'block';

            // invoice section
            document.getElementById('invoiceButton').style.display = 'block';

            // collection button
            document.getElementById('collectionButton').style.display = 'block';

            //stock report button
            document.getElementById('stockReportButton').style.display = 'block';
            document.getElementById('salesReportButton').style.display = 'block';
            document.getElementById('productionReportButton').style.display = 'block';
            document.getElementById('newProductionReportButton').style.display = 'block';
            document.getElementById('stockTransferReportButton').style.display = 'block';
            document.getElementById('vpsReportButton').style.display = 'block';
            document.getElementById('deleteStockReport').style.display = 'block';

            //per forma button
            document.getElementById('performaButton').style.display = 'block';
        }

    }

})


function logoutHandler(){
    const userConfirm = confirm(`Are You Sure To Logout`);
    if (userConfirm){
        localStorage.removeItem("loggedUser");
        window.location.href = '/login';
    }else {

    }
}













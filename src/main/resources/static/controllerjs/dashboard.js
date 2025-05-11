window.addEventListener('load',function (){


    const user = JSON.parse(localStorage.getItem('loggedUser'));

    if (!user) {
        window.location.href = '/login'; // Redirect if not logged in
    } else {
        document.getElementById('lblUserName').innerText = `Welcome ${user.username} `;
        document.getElementById('lblUserRole').innerText = `Role : ${user.role} `;

        // Role-based UI
        // if (user.role === 'admin') {
        //     document.getElementById('adminSection').style.display = 'block';
        // } else {
        //     document.getElementById('adminSection').style.display = 'none';
        // }
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


















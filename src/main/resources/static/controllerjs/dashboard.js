window.addEventListener('load',function (){


    const user = JSON.parse(localStorage.getItem('loggedUser'));

    if (!user) {
        window.location.href = 'login.html'; // Redirect if not logged in
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
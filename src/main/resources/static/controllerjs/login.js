const users = [
    {username: 'admin', password: 'xnjfuna9654', role: 'admin'},
    {username: 'packleaf', password: 'packleaf689@@', role: 'admin'},
    {username: 'kawshan', password: 'kawshan6358@@AA', role: 'admin'},
    {username: 'umesh', password: 'umesh1234', role: 'production'},
    {username: 'pravindi', password: 'pravindi1234', role: 'invoice'},
    {username: 'vihaga', password: 'vihaga4893', role: 'invoice'},
    {username: 'prasad', password: 'prasad1454', role: 'manager'}
];


function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('loggedUser', JSON.stringify(user)); // Save user data
        window.location.href = '/dashboard';
    } else {
        alert('Invalid username or password');
    }
}






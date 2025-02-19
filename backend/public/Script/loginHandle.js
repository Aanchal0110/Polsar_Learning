// const settings = require("../../src/config/settings");
console.log("working...")
console.clear();

const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
const login_button = document.getElementById("login_button");

login_button.onclick = function () {
    fetch("http://localhost:3000/" + 'auth/login', {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: login_email.value,
            password: login_password.value,
        })
    }).then(response => response.json()).then(data => console.log(data)).catch(error => console.error("Error", error))
}
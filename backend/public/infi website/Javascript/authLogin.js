import { setData } from "./context.js";
const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
const login_button = document.getElementById("login_button");

login_button.addEventListener("click", async () => {
    const res = await fetch(`${window.location.origin}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: login_email.value,
            password:login_password.value
        })
    })
    const data = await res.json()
    setData("user", data);
    if (res.status == 200) {
        window.location.href = "/"
    }
})

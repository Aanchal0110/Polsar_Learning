const first_name = document.getElementById("signup_first_name");
const last_name = document.getElementById("signup_last_name");
const email = document.getElementById("signup_email");
const password = document.getElementById("signup_password_1");
const btn = document.getElementById("signup_btn");

btn.addEventListener("click", async () => {
    const res = await fetch("http://localhost:3000/auth/SignIn", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            UserName: first_name.value + " " + last_name.value,
            Email: email.value,
            Occupation: "NaN",
            Password:password.value
        })
    });
    const data = await res.json();
    if (res.status == 200) {
        const res_1 = await fetch("http://localhost:3000/auth/send-otp", {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: email.value,
        })
    })
        window.location.herf = "/login";
    }
})

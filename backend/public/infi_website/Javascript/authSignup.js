import { setData } from "./context.js";

const first_name = document.getElementById("signup_first_name");
const last_name = document.getElementById("signup_last_name");
const email = document.getElementById("signup_email");
const password = document.getElementById("signup_password_1");
const btn = document.getElementById("signup_btn");

btn.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log({
        username: first_name.value + " " + last_name.value,
        email: email.value,
        password: password.value,
      })
    fetch(`${window.location.origin}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: first_name.value + " " + last_name.value,
            email: email.value,
            password: password.value,
          }),
      })
        .then((res) => res.json())
        .then((res) => {
          const a = res.success
            ? alert("Registered!")
                : alert(res.message);
            
            if (res.success) {
                // document.getElementById("signupForm").classList.remove("active");
                // document.getElementById("loginForm").classList.add("active");
              // document.getElementById("formTitle").innerText = "Login";
              localStorage.setItem("email", email.value);
              window.location.href = "/infi_website/HTML/otpVerify.html";
              fetch(`/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.value, })
              });
        }
        });
    // window.location.href = "/infi"
})

import { setData } from "./context.js";
const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
const login_button = document.getElementById("login_button"); 

login_button.addEventListener("click", async () => {
    // console.log(login_email.value);
    fetch(`${window.location.origin}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: login_email.value,
            password: login_password.value
        }),
      })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
          if (res.success) {
            let jwtToken = res["token"];
              // localStorage.setItem("token", jwtToken);
              setData("token", jwtToken);
              alert("Logged in! Token saved.");
            window.location.href = "/infi website/HTML/home.html";
        //       document.getElementById("signupForm").classList.remove("active");
        //   document.getElementById("loginForm").classList.add("active");
        //   document.getElementById("formTitle").innerText = "Login";
          } else {
            alert(res.message);
          }
        });
})

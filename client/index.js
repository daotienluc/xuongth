//xử lí chuyển trang trong phần trang chủ
//đăng nhập
const loginLink = document.getElementById("login-link");
loginLink.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
  window.location.href = "./login.html";
});

//đăng kí
const signupLink = document.getElementById("signup-link");
signupLink.addEventListener("click", function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết
  window.location.href = "./signup.html";
});

// AOSjs

AOS.init({
  duration: 2000,
  once: true,
});

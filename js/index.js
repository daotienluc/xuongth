//xử lí chuyển trang trong phần trang chủ
//đăng nhập
const loginLink = document.getElementById("login-link");
loginLink.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/login.html";
});

//đăng kí
const signupLink = document.getElementById("signup-link");
signupLink.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/signup.html";
});

// bài viết
const postLink = document.getElementById("Blog");
postLink.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/components/post.html";
});
// AOSjs

AOS.init({
  duration: 1500,
  once: true,
});

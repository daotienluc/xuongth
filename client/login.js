document
  .getElementById("login-btn")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("username", result.user.username); // Lưu tên người dùng từ response
        localStorage.setItem("accessToken", result.token); // Lưu token
        window.location.href = "./loginsuccess.html";
      } else {
        alert(`Đăng nhập thất bại: ${result.message}`);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng nhập:", error);
      alert("Đã xảy ra lỗi khi đăng nhập, vui lòng thử lại sau.");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  // Đảm bảo rằng sự kiện click chỉ được đăng ký một lần
  const loginButton = document.getElementById("login-btn");
  if (loginButton) {
    loginButton.addEventListener("click", async function (e) {
      e.preventDefault();

      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      try {
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (result.success) {
          alert("Đăng nhập thành công!");
          // Kiểm tra xem result.user có tồn tại không trước khi truy cập thuộc tính username
          if (result.user && result.user.username) {
            localStorage.setItem("username", result.user.username); // Lưu tên người dùng từ response
          } else {
            console.error(
              "Lỗi: Phản hồi từ server không chứa thông tin người dùng."
            );
            alert("Lỗi: Phản hồi từ server không chứa thông tin người dùng.");
            return;
          }
          localStorage.setItem("accessToken", result.accessToken); // Lưu token
          window.location.href = "./loginsuccess.html";
        } else {
          alert(`Đăng nhập thất bại: ${result.message}`);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi đăng nhập:", error);
        alert("Đã xảy ra lỗi khi đăng nhập, vui lòng thử lại sau.");
      }
    });
  }

  // Xử lý đăng ký
  const handleSignUp = () => {
    window.location.href = "./signup.html";
  };
  const signupLink = document.getElementById("signup-link");
  if (signupLink) {
    signupLink.addEventListener("click", handleSignUp);
  }

  // Xử lý logo click
  const logo = document.getElementById("logo");
  if (logo) {
    logo.addEventListener("click", function () {
      window.location.href = "./index.html";
    });
  }
});

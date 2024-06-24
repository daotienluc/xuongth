async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "/loginsuccess.html";
    } else {
      console.error("Đăng nhập không thành công:", data.message);
      alert(data.message);
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
    alert("Đã xảy ra lỗi khi đăng nhập, vui lòng thử lại sau.");
  }
}

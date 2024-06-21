document.addEventListener("DOMContentLoaded", function () {
  // Lấy thông tin người dùng đã đăng nhập
  fetch("/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Lấy token từ local storage
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Debug thông tin nhận được từ server
      if (data.success) {
        // Cập nhật tên người dùng nếu DOM đã tải hoàn tất
        const userNameElement = document.getElementById("user-name");
        if (userNameElement) {
          userNameElement.textContent = data.user.username;
        } else {
          console.error("#user-name không tồn tại trong DOM.");
        }
      } else {
        console.error("Lỗi khi lấy thông tin người dùng:", data.message);
      }
    })
    .catch((error) => console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error));
});

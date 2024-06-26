document
  .getElementById("signup-btn")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    let isWalletConnected =
      localStorage.getItem("isWalletConnected") === "true";
    let walletAddress = localStorage.getItem("walletAddress") || "";

    if (!isWalletConnected) {
      alert("Vui lòng kết nối ví Phantom trước khi đăng ký.");
      return;
    }

    console.log("Đăng ký với:", { username, password, walletAddress });

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, walletAddress }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Đăng ký thành công!");
        window.location.href = "./login.html";
      } else {
        alert(`Đăng ký thất bại: ${result.message}`);
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi đăng ký:", error);
      alert("Đã xảy ra lỗi khi đăng ký, vui lòng thử lại sau.");
    }
  });

async function connectWallet() {
  try {
    if (window.solana && window.solana.isPhantom) {
      const resp = await window.solana.connect();
      console.log("Kết nối ví thành công:", resp.publicKey.toString());
      localStorage.setItem("isWalletConnected", "true");
      localStorage.setItem("walletAddress", resp.publicKey.toString());
      alert("Kết nối ví thành công!");
    } else {
      alert("Vui lòng cài đặt Phantom Wallet");
      window.open("https://phantom.app/", "_blank");
    }
  } catch (err) {
    console.error("Kết nối ví thất bại:", err);
    alert("Kết nối ví thất bại. Vui lòng thử lại.");
  }
}

document
  .getElementById("connectWalletButton")
  .addEventListener("click", connectWallet);

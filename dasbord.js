/* ==========================================================
     GANTI SESUAI NAMA FILE HALAMAN LOGIN / DAFTAR KAMU
     KALAU LOKASI/NAMA FILENYA BERBEDA.
  ========================================================== */
  const LOGIN_PAGE_URL = "login.html";
  const DAFTAR_PAGE_URL = "daftar.html";

  /* =========== 1. DATA USER (dibaca dari localStorage, hasil dari daftar.html/login.html) =========== */
  // Kalau field belum ada di localStorage (misal user lama sebelum ada field ini),
  // dipakai nilai dummy di belakang tanda || sebagai fallback.
  const dashboardData = {
    username: localStorage.getItem("userUsername") || "Username",
    fullname: localStorage.getItem("userFullname") || "Nama lengkap user",
    headline: localStorage.getItem("userHeadline") || "Headline",
    achievements: 5,          // jumlah achievement yang sudah didapat
    achievementTotal: 5,      // total slot achievement yang ditampilkan
    rekamBelajar: [
      "Materi 1", "Materi 2",
      "Materi 3", "Materi 4",
      "Materi 5", "Materi 6"
    ],
    weeklyActivity: {
      labels: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
      values: [8, 16, 16, 7, 9, 13, 21]
    }
  };

  /* =========== 2. ID USER OTOMATIS (8 digit angka) =========== */
  function getOrCreateUserId(){
    let id = localStorage.getItem("userId");
    if(!id){
      id = String(Math.floor(10000000 + Math.random() * 90000000)); // selalu 8 digit
      localStorage.setItem("userId", id);
    }
    return id;
  }

  /* =========== 3. CEK STATUS LOGIN =========== */
  // isLoggedIn disimpan di localStorage oleh halaman login setelah user berhasil masuk.
  // Ganti logika ini sesuai sistem auth kamu (misal cek token/session dari backend).
  function isUserLoggedIn(){
    return localStorage.getItem("isLoggedIn") === "true";
  }

  function lockDashboard(){
    document.body.classList.add("locked");
  }

  function unlockDashboard(){
    document.body.classList.remove("locked");
  }

  /* =========== 4. RENDER DATA KE HALAMAN =========== */
  function renderProfile(){
    document.getElementById("pUsername").textContent = "Hai, " + dashboardData.username;
    document.getElementById("pFullname").textContent = dashboardData.fullname;
    document.getElementById("pId").textContent = getOrCreateUserId();
    document.getElementById("pHeadline").textContent = dashboardData.headline;

    // isi data yang sama di sidebar profil
    document.getElementById("sbUsername").textContent = "Hai, " + dashboardData.username;
    document.getElementById("sbId").textContent = getOrCreateUserId();
  }

  function renderAchievements(){
    const wrap = document.getElementById("achievementIcons");
    wrap.innerHTML = "";
    for(let i = 0; i < dashboardData.achievementTotal; i++){
      const dot = document.createElement("div");
      dot.className = "dot" + (i < dashboardData.achievements ? "" : " locked");
      dot.title = i < dashboardData.achievements ? "Achievement diraih" : "Belum diraih";
      wrap.appendChild(dot);
    }
  }

  function renderRekamBelajar(){
    const grid = document.getElementById("rekamGrid");
    grid.innerHTML = "";
    dashboardData.rekamBelajar.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = item;
      grid.appendChild(card);
    });
  }

  function renderChart(){
    const ctx = document.getElementById('weeklyChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dashboardData.weeklyActivity.labels,
        datasets: [{
          data: dashboardData.weeklyActivity.values,
          backgroundColor: '#0F2854',
          borderRadius: 2,
          maxBarThickness: 60
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F2854',
            padding: 10,
            titleFont: { family: 'Poppins' },
            bodyFont: { family: 'Poppins' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 24,
            ticks: {
              stepSize: 6,
              color: '#1E1E1E',
              font: { family: 'Poppins', size: 13 }
            },
            grid: { color: '#c9c9c9' }
          },
          x: {
            ticks: {
              color: '#1E1E1E',
              font: { family: 'Poppins', size: 13 }
            },
            grid: { display: false }
          }
        }
      }
    });
  }

  /* =========== 5. INISIALISASI =========== */
  document.addEventListener("DOMContentLoaded", () => {
    renderProfile();
    renderAchievements();
    renderRekamBelajar();
    renderChart();

    // Kalau belum login (dashboard dianggap "kosong"), otomatis kunci
    // halaman dan tampilkan popup suruh login.
    if(!isUserLoggedIn()){
      lockDashboard();
    }
  });

  document.getElementById("btnGoLogin").addEventListener("click", () => {
    window.location.href = LOGIN_PAGE_URL;
  });

  document.getElementById("btnGoDaftar").addEventListener("click", () => {
    window.location.href = DAFTAR_PAGE_URL;
  });

  /* =========== 6. SIDEBAR PROFIL =========== */
  function openSidebar(){
    document.body.classList.add("sidebar-open");
  }

  function closeSidebar(){
    document.body.classList.remove("sidebar-open");
  }

  document.getElementById("btnOpenSidebar").addEventListener("click", openSidebar);
  document.getElementById("btnCloseSidebar").addEventListener("click", closeSidebar);
  document.getElementById("sidebarOverlay").addEventListener("click", closeSidebar);

  // Menu di dalam sidebar (Profil Saya, Pengaturan, Koleksi Saya)
  // Sekarang masih placeholder — ganti dengan redirect halaman terpisah
  // kalau halamannya sudah dibuat, contoh: window.location.href = "profil.html";
  document.querySelectorAll(".sidebar-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      console.log("Menu diklik:", target);
      // window.location.href = target + ".html";
    });
  });

  // Tombol Log out: hapus status login lalu kembali munculkan popup login
  document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    closeSidebar();
    showToast("Berhasil logout. Sampai jumpa lagi!");
    lockDashboard();
  });

  /* =========== 8. HAPUS AKUN =========== */
  document.getElementById("btnOpenDeleteAccount").addEventListener("click", () => {
    closeSidebar();
    document.getElementById("deleteAccountOverlay").classList.add("show");
  });

  document.getElementById("btnCancelDelete").addEventListener("click", () => {
    document.getElementById("deleteAccountOverlay").classList.remove("show");
  });

  document.getElementById("btnConfirmDelete").addEventListener("click", () => {
    // Hapus semua data akun dari perangkat ini
    localStorage.removeItem("userFullname");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userUsername");
    localStorage.removeItem("userHeadline");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accountRegistered");

    document.getElementById("deleteAccountOverlay").classList.remove("show");

    // Arahkan ke halaman daftar karena akun sudah tidak ada
    window.location.href = DAFTAR_PAGE_URL;
  });

  /* =========== 7. TOAST NOTIFIKASI =========== */
  function showToast(message){
    const toast = document.getElementById("toastNotif");
    document.getElementById("toastNotifText").textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
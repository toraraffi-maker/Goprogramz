 // Modal Handlers

 
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('hidden');
            }
        }

        // Show course details in modal
        function showCourseDetail(title, description) {
            document.getElementById('courseDetailTitle').innerText = title;
            document.getElementById('courseDetailDesc').innerText = description;
            openModal('modalCourseDetail');
        }

        // Toast notifications replacement for alert()
        function alertNotification(msg) {
            closeModal('modalCourseDetail');
            const toast = document.getElementById('toastNotification');
            const toastMsg = document.getElementById('toastMessage');
            toastMsg.innerText = msg;
            toast.classList.remove('hidden');
            toast.classList.add('flex');

            setTimeout(() => {
                toast.classList.add('hidden');
                toast.classList.remove('flex');
            }, 3500);
        }

        function handleFormSubmit(e, message) {
            e.preventDefault();
            const modalId = e.target.closest('.fixed').id;
            closeModal(modalId);
            alertNotification(message);
        }

        // Mini Code Execution Demo
        function runCodeDemo() {
            const codeInput = document.getElementById('codeCodeArea').value;
            const outputArea = document.getElementById('consoleOutput');
            outputArea.innerHTML = '<p class="text-yellow-400">> Mengeksekusi kode...</p>';
            
            setTimeout(() => {
                try {
                    // Capture console logs safely
                    let logs = [];
                    const customConsole = {
                        log: (msg) => logs.push(msg)
                    };
                    
                    const runFn = new Function('console', codeInput);
                    runFn(customConsole);

                    if (logs.length > 0) {
                        outputArea.innerHTML = logs.map(l => `<p class="text-emerald-400">> ${l}</p>`).join('');
                    } else {
                        outputArea.innerHTML = '<p class="text-emerald-400">> Kode berhasil dijalankan (tanpa output log).</p>';
                    }
                } catch (err) {
                    outputArea.innerHTML = `<p class="text-red-400">> Error: ${err.message}</p>`;
                }
            }, 400);
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                ['modalLogin', 'modalDaftar', 'modalProfile', 'modalCourseDetail'].forEach(id => closeModal(id));
            }
        });

        // Horizontal Slider Functions for Materi Cards
        function scrollMateriCards(direction) {
            const container = document.getElementById('materiCardContainer');
            if (container) {
                const scrollAmount = 310;
                container.scrollBy({
                    left: direction * scrollAmount,
                    behavior: 'smooth'
                });
            }
        }

        // Auto Scroll Feature
        let autoPlayInterval = null;
        let isAutoPlaying = true;

        function startAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                const container = document.getElementById('materiCardContainer');
                if (container) {
                    const maxScroll = container.scrollWidth - container.clientWidth;
                    if (container.scrollLeft >= maxScroll - 15) {
                        container.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        container.scrollBy({ left: 310, behavior: 'smooth' });
                    }
                }
            }, 3000);
        }

        function toggleAutoPlay() {
            const icon = document.getElementById('autoPlayIcon');
            const text = document.getElementById('autoPlayText');
            if (isAutoPlaying) {
                clearInterval(autoPlayInterval);
                isAutoPlaying = false;
                icon.className = 'fa-solid fa-play text-sky-500';
                text.innerText = 'Putar Geser Otomatis';
            } else {
                startAutoPlay();
                isAutoPlaying = true;
                icon.className = 'fa-solid fa-pause text-sky-500';
                text.innerText = 'Jeda Geser Otomatis';
            }
        }

        // Initialize auto play on load
        window.addEventListener('load', () => {
            startAutoPlay();
        });

        // Scroll listener to replace Daftar & Login buttons with Search Bar on scroll
        window.addEventListener('scroll', () => {
            const authButtons = document.getElementById('authButtons');
            const searchBar = document.getElementById('navbarSearchBar');

            if (window.scrollY > 60) {
                if (authButtons) {
                    authButtons.classList.add('hidden');
                    authButtons.classList.remove('flex');
                }
                if (searchBar) {
                    searchBar.classList.remove('hidden', 'opacity-0', 'scale-95');
                    searchBar.classList.add('flex', 'opacity-100', 'scale-100');
                }
            } else {
                if (authButtons) {
                    authButtons.classList.remove('hidden');
                    authButtons.classList.add('flex');
                }
                if (searchBar) {
                    searchBar.classList.add('hidden', 'opacity-0', 'scale-95');
                    searchBar.classList.remove('flex', 'opacity-100', 'scale-100');
                }
            }
        });

        // Clear search input and restore filter
        function clearSearch() {
            const searchInput = document.getElementById('navbarSearchInput');
            if (searchInput) {
                searchInput.value = '';
                handleNavbarSearch('');
            }
        }

        // Filter course cards dynamically based on navbar search input
        function handleNavbarSearch(query) {
            const cards = document.querySelectorAll('#materiCardContainer > div');
            const q = query.toLowerCase().trim();

            cards.forEach(card => {
                const text = card.innerText.toLowerCase();
                if (q === '' || text.includes(q)) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                    card.style.filter = 'none';
                } else {
                    card.style.opacity = '0.3';
                    card.style.transform = 'scale(0.92)';
                    card.style.filter = 'grayscale(80%)';
                }
            });

            // Automatically smooth-scroll to materi section when user types
            if (q.length > 0 && window.scrollY < 300) {
                const materiSection = document.getElementById('materi');
                if (materiSection) {
                    materiSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }

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

  
   
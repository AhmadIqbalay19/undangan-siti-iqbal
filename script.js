/* =========================================================
   COUNTDOWN
========================================================= */

// GANTI TANGGAL PERNIKAHAN DI SINI

const weddingDate =
    new Date("2026-12-26T08:00:00+07:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    if (distance <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
            (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
            (1000 * 60)) /
            1000
        );


    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);



/* =========================================================
   MUSIK — FLOATING NAVIGATION
========================================================= */

const music = document.getElementById("weddingMusic");

const musicButton = document.getElementById("musicButton");

const musicIcon = musicButton.querySelector("use");


/* UPDATE STATUS MUSIK */

function updateMusicButton() {

    if (music.paused) {

        musicIcon.setAttribute("href", "#icon-volume-off");

        musicButton.setAttribute("aria-label", "Putar musik");

        musicButton.classList.remove("is-playing");

    } else {

        musicIcon.setAttribute("href", "#icon-volume-on");

        musicButton.setAttribute("aria-label", "Matikan musik");

        musicButton.classList.add("is-playing");

    }

}


/* KLIK TOMBOL MUSIK */

musicButton.addEventListener("click", async () => {

    if (music.paused) {

        try {

            await music.play();

        } catch (error) {

            console.log("Musik gagal dimainkan:", error);

        }

    } else {

        music.pause();

    }

});


/* PERUBAHAN STATUS */

music.addEventListener("play", updateMusicButton);

music.addEventListener("pause", updateMusicButton);

updateMusicButton();

/* =========================================================
   PERSONALISASI NAMA TAMU UNDANGAN
========================================================= */

const guestNameElement =
    document.getElementById("guest-name");

const urlParams =
    new URLSearchParams(window.location.search);

const guestName =
    urlParams.get("to");

if (guestNameElement) {

    guestNameElement.textContent =
        guestName
            ? guestName.replace(/\+/g, " ").trim()
            : "Tamu Undangan";

}

/* =========================================================
   HALAMAN PEMBUKA UNDANGAN
========================================================= */


const welcomeScreen =
    document.getElementById("welcome-screen");

const openInvitationButton =
    document.getElementById("open-invitation");


if (welcomeScreen && openInvitationButton) {

    openInvitationButton.addEventListener("click", async () => {

        // TUTUP WELCOME SCREEN
        welcomeScreen.classList.add("is-hidden");

        // AKTIFKAN SCROLL
        document.body.style.overflow = "";

        // AKTIFKAN ANIMASI CINEMATIC
        startCinematicAnimations();

        // MULAI MUSIK
        try {

            await music.play();

        } catch (error) {

            console.log("Musik belum dapat dimainkan:", error);

        }

    });

}


// KUNCI SCROLL SEBELUM UNDANGAN DIBUKA

if (
    welcomeScreen &&
    !welcomeScreen.classList.contains("is-hidden")
) {

    document.body.style.overflow = "hidden";

}

const invitationContainer =
    document.querySelector(".invitation");

/* =========================================================
   CINEMATIC ELEGANCE — REVEAL OBSERVER
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

        });

    },

    {
        root: invitationContainer,
        threshold: 0.15
    }

);


// AKTIFKAN ANIMASI SETELAH UNDANGAN DIBUKA

function startCinematicAnimations() {

    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

}


/* =========================================================
   GALLERY — DRAG & LIGHTBOX
========================================================= */

const gallerySliders =
    document.querySelectorAll(".gallery-slider");

const galleryPhotos = Array.from(
    document.querySelectorAll(".gallery .gallery-photo")
).sort((a, b) => {
    const getPhotoNumber = (photo) => {
        const photoClass = Array.from(photo.classList)
            .find(className => /^photo-\d+$/.test(className));

        return Number(photoClass.replace("photo-", ""));
    };

    return getPhotoNumber(a) - getPhotoNumber(b);
});

const lightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxCounter =
    document.getElementById("lightboxCounter");

let currentPhotoIndex = 0;


/* =========================================================
   DRAG FOTO DENGAN MOUSE
========================================================= */

gallerySliders.forEach((slider) => {

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let hasDragged = false;

    slider.addEventListener("mousedown", (event) => {

        isDragging = true;
        hasDragged = false;

        startX = event.pageX;
        startScrollLeft = slider.scrollLeft;

        slider.style.cursor = "grabbing";
        slider.style.scrollSnapType = "none";

    });

    window.addEventListener("mousemove", (event) => {

        if (!isDragging) return;

        const distance = event.pageX - startX;

        if (Math.abs(distance) > 5) {
            hasDragged = true;
        }

        slider.scrollLeft =
            startScrollLeft - distance;

    });

    window.addEventListener("mouseup", () => {

        if (!isDragging) return;

        isDragging = false;

        slider.style.cursor = "grab";
        slider.style.scrollSnapType = "x mandatory";

    });

    slider.addEventListener("mouseleave", () => {

        if (!isDragging) return;

        isDragging = false;

        slider.style.cursor = "grab";
        slider.style.scrollSnapType = "x mandatory";

    });

    slider.addEventListener("click", (event) => {

        if (hasDragged) {

            event.stopPropagation();

            hasDragged = false;

        }

    }, true);

    slider.style.cursor = "grab";

});


/* =========================================================
   MEMBUKA LIGHTBOX
========================================================= */

function openLightbox(index) {

    currentPhotoIndex = index;

    showLightboxPhoto();

    lightbox.classList.add("is-open");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   MENAMPILKAN FOTO
========================================================= */

function showLightboxPhoto() {

    const selectedPhoto =
        galleryPhotos[currentPhotoIndex];

    const backgroundImage =
        getComputedStyle(selectedPhoto).backgroundImage;

    const imageUrl =
        backgroundImage
            .replace(/^url\(["']?/, "")
            .replace(/["']?\)$/, "");

    lightboxImage.src = imageUrl;

    lightboxCounter.innerText =
        String(currentPhotoIndex + 1).padStart(2, "0")
        + " / " +
        String(galleryPhotos.length).padStart(2, "0");

}


/* =========================================================
   FOTO BERIKUTNYA
========================================================= */

function nextPhoto() {

    currentPhotoIndex++;

    if (currentPhotoIndex >= galleryPhotos.length) {
        currentPhotoIndex = 0;
    }

    showLightboxPhoto();

}


/* =========================================================
   FOTO SEBELUMNYA
========================================================= */

function previousPhoto() {

    currentPhotoIndex--;

    if (currentPhotoIndex < 0) {
        currentPhotoIndex = galleryPhotos.length - 1;
    }

    showLightboxPhoto();

}

/* =========================================================
   SWIPE FOTO LIGHTBOX
========================================================= */

const lightboxWrapper =
    document.querySelector(".lightbox-image-wrapper");

let touchStartX = 0;
let touchStartY = 0;


/* MEMULAI GERAKAN */

lightboxWrapper.addEventListener("pointerdown", (event) => {

    touchStartX = event.clientX;
    touchStartY = event.clientY;

    lightboxWrapper.setPointerCapture(event.pointerId);

});


/* MENYELESAIKAN GERAKAN */

lightboxWrapper.addEventListener("pointerup", (event) => {

    const differenceX =
        event.clientX - touchStartX;

    const differenceY =
        event.clientY - touchStartY;

    // Abaikan gerakan kecil atau gerakan vertikal
    if (
        Math.abs(differenceX) < 50 ||
        Math.abs(differenceX) < Math.abs(differenceY) * 1.2
    ) {
        return;
    }

    // Geser ke kiri = foto berikutnya
    if (differenceX < 0) {

        nextPhoto();

    }

    // Geser ke kanan = foto sebelumnya
    else {

        previousPhoto();

    }

});


/* RESET JIKA GERAKAN DIBATALKAN */

lightboxWrapper.addEventListener("pointercancel", () => {

    touchStartX = 0;
    touchStartY = 0;

});

/* =========================================================
   MENUTUP LIGHTBOX
========================================================= */

function closeLightbox() {

    lightbox.classList.remove("is-open");

    lightbox.setAttribute("aria-hidden", "true");

    lightboxImage.src = "";

    document.body.style.overflow = "";

}


/* =========================================================
   EVENT KLIK FOTO
========================================================= */

galleryPhotos.forEach((photo, index) => {

    photo.style.cursor = "zoom-in";

    photo.addEventListener("click", () => {

        openLightbox(index);

    });

});


/* =========================================================
   EVENT TOMBOL
========================================================= */

lightboxClose.addEventListener(
    "click",
    closeLightbox
);



/* KLIK AREA GELAP UNTUK MENUTUP */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("is-open")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextPhoto();
    }

    if (event.key === "ArrowLeft") {
        previousPhoto();
    }

});


/* =========================================================
   FLOATING NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(".nav-icon");

const invitationSlides =
    document.querySelectorAll(".invitation .slide");


/* =========================================================
   KLIK ICON — NAVIGASI SLIDE
========================================================= */

navigationLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const targetId =
            link.getAttribute("href").substring(1);

        const targetSlide =
            document.getElementById(targetId);

        if (!targetSlide) return;


        // HITUNG POSISI SLIDE

        const targetPosition =
            targetSlide.getBoundingClientRect().top
            - invitationContainer.getBoundingClientRect().top
            + invitationContainer.scrollTop;


        // PINDAH SLIDE

        invitationContainer.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   MENANDAI ICON SLIDE YANG SEDANG AKTIF
========================================================= */

const slideObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const activeSlideId =
                entry.target.id;

            navigationLinks.forEach((link) => {

                const isActive =
                    link.getAttribute("href") === "#" + activeSlideId;

                link.classList.toggle(
                    "is-active",
                    isActive
                );

                if (isActive) {

                    link.setAttribute(
                        "aria-current",
                        "location"
                    );

                } else {

                    link.removeAttribute("aria-current");

                }

            });

        });

    },

    {

        root: invitationContainer,

        threshold: 0.55

    }

);


invitationSlides.forEach((slide) => {

    slideObserver.observe(slide);

});

/* =========================================================
   RSVP — PILIH KONTAK WHATSAPP
========================================================= */

// NOMOR WHATSAPP
// Gunakan format 62, tanpa tanda +, spasi, atau strip.

const rsvpNumbers = {

    siti: "6283897653992",

    iqbal: "6285374169553"

};


// PESAN OTOMATIS WHATSAPP

const rsvpMessage =
    "Assalamualaikum, saya ingin mengonfirmasi kehadiran pada acara pernikahan Siti & Iqbal tanggal 26 Desember 2026.";


// ELEMEN PANEL

const rsvpModal =
    document.getElementById("rsvpModal");

const openRsvpPanel =
    document.getElementById("openRsvpPanel");

const closeRsvpPanel =
    document.getElementById("closeRsvpPanel");

const contactSiti =
    document.getElementById("contactSiti");

const contactIqbal =
    document.getElementById("contactIqbal");


// MEMBUAT LINK WHATSAPP

contactSiti.href =
    `https://wa.me/${rsvpNumbers.siti}?text=${encodeURIComponent(rsvpMessage)}`;

contactIqbal.href =
    `https://wa.me/${rsvpNumbers.iqbal}?text=${encodeURIComponent(rsvpMessage)}`;


// MEMBUKA PANEL

openRsvpPanel.addEventListener("click", () => {

    rsvpModal.classList.add("is-open");

    rsvpModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

});


// MENUTUP PANEL

function closeRsvpModal() {

    rsvpModal.classList.remove("is-open");

    rsvpModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


// KLIK TOMBOL SILANG

closeRsvpPanel.addEventListener("click", closeRsvpModal);


// KLIK AREA LUAR PANEL

rsvpModal.addEventListener("click", (event) => {

    if (event.target === rsvpModal) {

        closeRsvpModal();

    }

});


// TOMBOL ESCAPE

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        rsvpModal.classList.contains("is-open")
    ) {

        closeRsvpModal();

    }

});

/* =========================================================
   LOCATION — MINI MAP PANEL
========================================================= */

const mapsModal = document.getElementById("mapsModal");
const openMapsPanel = document.getElementById("openMapsPanel");
const closeMapsPanel = document.getElementById("closeMapsPanel");


// PERIKSA ELEMEN HTML

if (mapsModal && openMapsPanel && closeMapsPanel) {

    // MEMBUKA PANEL

    openMapsPanel.addEventListener("click", () => {

        mapsModal.classList.add("is-open");
        mapsModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

    });


    // MENUTUP PANEL

    function closeMapsModal() {

        mapsModal.classList.remove("is-open");
        mapsModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    closeMapsPanel.addEventListener(
        "click",
        closeMapsModal
    );


    // KLIK AREA LUAR PANEL

    mapsModal.addEventListener("click", (event) => {

        if (event.target === mapsModal) {
            closeMapsModal();
        }

    });


    // TOMBOL ESCAPE

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            mapsModal.classList.contains("is-open")
        ) {
            closeMapsModal();
        }

    });

} else {

    console.error("Elemen panel lokasi tidak ditemukan!");

}
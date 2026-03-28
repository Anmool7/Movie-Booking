/* =========================================================
   MOVIEBOOK PRO - PREMIUM CINEMATIC FRONTEND JS
   LocalStorage based demo logic
   Backend-ready structure
   Fully aligned with cinematic movie card UI
   ========================================================= */

/* =========================================================
   DEFAULT MOVIE DATA
   ========================================================= */

const DEFAULT_MOVIES = [
  {
    id: 1,
    title: "Avengers Endgame",
    genre: "Action",
    language: "English",
    rating: "8.4",
    poster: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    description:
      "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    year: "2019",
    runtime: "3h 1m",
    theater: "PVR Cinemas",
    showTime: "7:30 PM",
    price: 200,
    popularity: 98,
    timings: ["10:00", "1:30", "4:00", "7:30"]
  },
  {
    id: 2,
    title: "Joker",
    genre: "Drama",
    language: "English",
    rating: "8.5",
    poster: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg",
    description:
      "A psychological story of Arthur Fleck and his transformation into Joker.",
    year: "2019",
    runtime: "2h 2m",
    theater: "INOX Theater",
    showTime: "6:00 PM",
    price: 180,
    popularity: 96,
    timings: ["11:00", "2:00", "5:30", "9:00"]
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi",
    language: "English",
    rating: "8.6",
    poster: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    description:
      "A team travels through a wormhole in search of a new home for humanity.",
    year: "2014",
    runtime: "2h 49m",
    theater: "Cinepolis",
    showTime: "9:30 PM",
    price: 220,
    popularity: 97,
    timings: ["9:30", "12:30", "3:30", "8:30"]
  },
  {
    id: 4,
    title: "Batman",
    genre: "Action",
    language: "English",
    rating: "8.0",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    description:
      "Batman fights crime and corruption in Gotham City.",
    year: "2022",
    runtime: "2h 56m",
    theater: "PVR Cinemas",
    showTime: "6:00 PM",
    price: 210,
    popularity: 94,
    timings: ["10:30", "2:30", "6:00", "9:30"]
  }
];

/* =========================================================
   STORAGE KEYS
   ========================================================= */

const STORAGE_KEYS = {
  movies: "moviebook_movies",
  selectedMovie: "moviebook_selected_movie",
  selectedSeats: "moviebook_selected_seats",
  bookings: "moviebook_bookings",
  paymentMethod: "moviebook_payment_method"
};

/* =========================================================
   SAFE PARSE + STORAGE HELPERS
   ========================================================= */

function safeParse(value, fallback) {
  try {
    return JSON.parse(value) ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function getMovies() {
  return safeParse(localStorage.getItem(STORAGE_KEYS.movies), []);
}

function saveMovies(movies) {
  localStorage.setItem(STORAGE_KEYS.movies, JSON.stringify(movies));
}

function getSelectedMovie() {
  return safeParse(localStorage.getItem(STORAGE_KEYS.selectedMovie), null);
}

function saveSelectedMovie(movie) {
  localStorage.setItem(STORAGE_KEYS.selectedMovie, JSON.stringify(movie));
}

function getSelectedSeats() {
  return safeParse(localStorage.getItem(STORAGE_KEYS.selectedSeats), []);
}

function saveSelectedSeats(seats) {
  localStorage.setItem(STORAGE_KEYS.selectedSeats, JSON.stringify(seats));
}

function getBookings() {
  return safeParse(localStorage.getItem(STORAGE_KEYS.bookings), []);
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
}

function getPaymentMethod() {
  return localStorage.getItem(STORAGE_KEYS.paymentMethod) || "Card";
}

function savePaymentMethod(method) {
  localStorage.setItem(STORAGE_KEYS.paymentMethod, method);
}

/* =========================================================
   APP UTILITY HELPERS
   ========================================================= */

function seedMovies() {
  const existing = getMovies();
  if (!existing || existing.length === 0) {
    saveMovies(DEFAULT_MOVIES);
  }
}

function formatCurrency(amount) {
  return `₹${amount}`;
}

function generateBookingId() {
  const random = Math.floor(Math.random() * 90000000) + 10000000;
  return `MB${random}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   MOVIE CARD TEMPLATE - CINEMATIC
   ========================================================= */

function createMovieCard(movie) {
  return `
    <div class="col-lg-3 col-md-6 movie-item"
         data-title="${escapeHtml(movie.title)}"
         data-genre="${escapeHtml(movie.genre)}"
         data-language="${escapeHtml(movie.language || "English")}"
         data-rating="${escapeHtml(movie.rating)}"
         data-year="${escapeHtml(movie.year || "0")}"
         data-popularity="${escapeHtml(String(movie.popularity || 0))}">

      <div class="movie-card" onclick="selectMovie(${movie.id})">

        <img src="${escapeHtml(movie.poster)}"
             alt="${escapeHtml(movie.title)} Poster"
             class="movie-img">

        <div class="movie-card-overlay">
          <h3 class="movie-title">${escapeHtml(movie.title).toUpperCase()}</h3>
          <p class="movie-genre">${escapeHtml(movie.genre)} | ${escapeHtml(movie.language || "English")}</p>

          <div class="movie-rating">
            <span class="star">⭐</span>
            <span>${escapeHtml(movie.rating)}</span>
          </div>
        </div>

      </div>

    </div>
  `;
}

/* =========================================================
   RENDER MOVIES
   ========================================================= */

function renderMovies(containerId, movies) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!movies.length) {
    container.innerHTML = `
      <div class="col-12">
        <div class="admin-card text-center">
          <h3>No movies found</h3>
          <p class="text-muted mb-0">Try another search or filter, or add movies from admin panel.</p>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = movies.map(createMovieCard).join("");
}

/* =========================================================
   HOME PAGE MOVIES
   ========================================================= */

function initHomeMovies() {
  const container = document.getElementById("movieContainer");
  if (!container) return;

  const movies = getMovies().slice(0, 4);
  renderMovies("movieContainer", movies);
}

/* =========================================================
   MOVIE SELECTION
   ========================================================= */

function selectMovie(movieId) {
  const movie = getMovies().find(m => m.id === Number(movieId));
  if (!movie) return;

  saveSelectedMovie(movie);
  saveSelectedSeats([]);
  window.location.href = "movie-detail.html";
}

/* =========================================================
   MOVIES PAGE - SEARCH / FILTER / SORT
   ========================================================= */

function initMoviesPage() {
  const container = document.getElementById("movieGrid") || document.getElementById("movieContainer");
  if (!container) return;

  const searchInput = document.getElementById("searchInput") || document.querySelector(".search-input");
  const genreFilter = document.getElementById("genreFilter");
  const languageFilter = document.getElementById("languageFilter");
  const sortFilter = document.getElementById("sortFilter");

  let allMovies = getMovies();
  renderMovies(container.id, allMovies);

  function applyFilters() {
    const searchValue = (searchInput?.value || "").trim().toLowerCase();
    const selectedGenre = (genreFilter?.value || "all").toLowerCase();
    const selectedLanguage = (languageFilter?.value || "all").toLowerCase();
    const selectedSort = (sortFilter?.value || "rating").toLowerCase();

    let filteredMovies = [...allMovies];

    /* ---------- SEARCH ---------- */
    if (searchValue) {
      filteredMovies = filteredMovies.filter(movie => {
        const title = movie.title.toLowerCase();
        const genre = movie.genre.toLowerCase();
        const language = (movie.language || "english").toLowerCase();

        return (
          title.includes(searchValue) ||
          genre.includes(searchValue) ||
          language.includes(searchValue)
        );
      });
    }

    /* ---------- GENRE FILTER ---------- */
    if (selectedGenre !== "all") {
      filteredMovies = filteredMovies.filter(movie =>
        movie.genre.toLowerCase() === selectedGenre
      );
    }

    /* ---------- LANGUAGE FILTER ---------- */
    if (selectedLanguage !== "all") {
      filteredMovies = filteredMovies.filter(movie =>
        (movie.language || "English").toLowerCase() === selectedLanguage
      );
    }

    /* ---------- SORT ---------- */
    if (selectedSort === "rating") {
      filteredMovies.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (selectedSort === "new") {
      filteredMovies.sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
    } else if (selectedSort === "popularity") {
      filteredMovies.sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0));
    }

    renderMovies(container.id, filteredMovies);
  }

  searchInput?.addEventListener("input", applyFilters);
  genreFilter?.addEventListener("change", applyFilters);
  languageFilter?.addEventListener("change", applyFilters);
  sortFilter?.addEventListener("change", applyFilters);
}

/* =========================================================
   MOVIE DETAIL PAGE
   ========================================================= */

function initMovieDetailPage() {
  const titleEl = document.querySelector(".movie-detail-title");
  if (!titleEl) return;

  const movie = getSelectedMovie() || getMovies()[0];
  if (!movie) return;

  const poster = document.querySelector(".detail-poster");
  const desc = document.querySelector(".movie-detail-desc");
  const meta = document.querySelector(".movie-detail-meta");
  const primaryBtn = document.querySelector(".primary-btn");
  const banner = document.querySelector(".movie-banner");
  const slots = document.querySelectorAll(".slot");

  if (banner && movie.backdrop) {
    banner.style.background = `url("${movie.backdrop}") center/cover no-repeat`;
  }

  if (poster) {
    poster.src = movie.poster;
    poster.alt = `${movie.title} Poster`;
  }

  titleEl.textContent = movie.title;

  if (desc) {
    desc.textContent = movie.description;
  }

  if (meta) {
    meta.innerHTML = `
      <span>${escapeHtml(movie.year)}</span>
      <span>${escapeHtml(movie.runtime)}</span>
      <span class="rating">⭐ ${escapeHtml(movie.rating)}</span>
    `;
  }

  if (primaryBtn) {
    primaryBtn.addEventListener("click", () => {
      saveSelectedMovie(movie);
    });
  }

  slots.forEach(slot => {
    if (slot.classList.contains("sold")) return;

    slot.addEventListener("click", () => {
      const selectedTime = slot.textContent.trim();
      const updatedMovie = {
        ...movie,
        showTime: selectedTime
      };
      saveSelectedMovie(updatedMovie);
    });
  });
}

/* =========================================================
   SEAT SELECTION PAGE
   ========================================================= */

let liveSelectedSeats = [];

function initSeatsPage() {
  const seatInfoBar = document.querySelector(".seat-info-bar");
  if (!seatInfoBar) return;

  const movie = getSelectedMovie() || getMovies()[0];
  if (!movie) return;

  liveSelectedSeats = getSelectedSeats();

  const title = seatInfoBar.querySelector("h5");
  const meta = seatInfoBar.querySelector("p");
  const selectedSeatsEl = document.querySelector(".selected-seats");
  const totalTextEl = document.querySelector(".summary-box .text-muted:last-of-type");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const allSeats = document.querySelectorAll(".seat");

  if (title) {
    title.textContent = movie.title;
  }

  if (meta) {
    meta.textContent = `${movie.theater || "PVR Cinemas"} • ${movie.showTime || "7:30 PM"}`;
  }

  allSeats.forEach(seat => {
    if (seat.classList.contains("booked")) return;

    const rowLabel = seat.parentElement.querySelector(".row-label")?.textContent?.trim() || "";
    const seatNumber = seat.textContent.trim();
    const seatId = `${rowLabel}${seatNumber}`;

    if (liveSelectedSeats.includes(seatId)) {
      seat.classList.add("selected");
    } else {
      seat.classList.remove("selected");
    }

    seat.addEventListener("click", () => {
      const existingIndex = liveSelectedSeats.indexOf(seatId);

      if (existingIndex > -1) {
        liveSelectedSeats.splice(existingIndex, 1);
        seat.classList.remove("selected");
      } else {
        liveSelectedSeats.push(seatId);
        seat.classList.add("selected");
      }

      saveSelectedSeats(liveSelectedSeats);
      updateSeatSummary(movie, selectedSeatsEl, totalTextEl, checkoutBtn);
    });
  });

  updateSeatSummary(movie, selectedSeatsEl, totalTextEl, checkoutBtn);
}

function updateSeatSummary(movie, selectedSeatsEl, totalTextEl, checkoutBtn) {
  const selectedText = liveSelectedSeats.length ? liveSelectedSeats.join(", ") : "None";
  const subtotal = liveSelectedSeats.length * (movie.price || 0);
  const fee = liveSelectedSeats.length ? 40 : 0;
  const total = subtotal + fee;

  if (selectedSeatsEl) {
    selectedSeatsEl.textContent = selectedText;
  }

  if (totalTextEl) {
    totalTextEl.textContent = `Total: ${formatCurrency(total)}`;
  }

  if (checkoutBtn) {
    if (liveSelectedSeats.length === 0) {
      checkoutBtn.classList.add("disabled");
      checkoutBtn.setAttribute("aria-disabled", "true");
    } else {
      checkoutBtn.classList.remove("disabled");
      checkoutBtn.removeAttribute("aria-disabled");
    }
  }
}

/* =========================================================
   PAYMENT PAGE
   ========================================================= */

function initPaymentPage() {
  const paymentSection = document.querySelector(".payment-section");
  if (!paymentSection) return;

  const movie = getSelectedMovie() || getMovies()[0];
  const seats = getSelectedSeats();

  const tabs = document.querySelectorAll(".payment-tab");
  const payBtn = document.querySelector(".pay-btn");
  const summary = document.querySelector(".order-summary");
  const form = document.querySelector(".payment-form");

  tabs.forEach(tab => {
    const tabText = tab.textContent.trim();

    if (tabText.toLowerCase() === getPaymentMethod().toLowerCase()) {
      tab.classList.add("active");
    }

    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      savePaymentMethod(tabText);
    });
  });

  if (summary && movie) {
    const ticketPrice = (movie.price || 0) * seats.length;
    const fee = seats.length ? 40 : 0;
    const total = ticketPrice + fee;

    summary.innerHTML = `
      <h4>Order Summary</h4>

      <div class="movie-summary">
        <img src="${escapeHtml(movie.poster)}" alt="${escapeHtml(movie.title)}">
        <div>
          <h5>${escapeHtml(movie.title)}</h5>
          <p>${escapeHtml(movie.theater || "PVR Cinemas")}</p>
          <p>${escapeHtml(movie.showTime || "7:30 PM")}</p>
        </div>
      </div>

      <p class="mt-3">Seats: <strong>${seats.length ? escapeHtml(seats.join(", ")) : "None"}</strong></p>

      <div class="price-table">
        <div class="price-row">
          <span>Ticket Price</span>
          <span>${formatCurrency(movie.price || 0)} x ${seats.length}</span>
        </div>

        <div class="price-row">
          <span>Convenience Fee</span>
          <span>${formatCurrency(fee)}</span>
        </div>

        <div class="price-row total">
          <span>Total</span>
          <span>${formatCurrency(total)}</span>
        </div>
      </div>
    `;

    if (payBtn) {
      payBtn.textContent = `Pay ${formatCurrency(total)}`;
    }
  }

  payBtn?.addEventListener("click", event => {
    event.preventDefault();

    if (!movie || seats.length === 0) {
      alert("Please select a movie and seats before proceeding.");
      return;
    }

    const bookings = getBookings();
    const ticketPrice = (movie.price || 0) * seats.length;
    const fee = 40;
    const total = ticketPrice + fee;

    bookings.unshift({
      id: generateBookingId(),
      status: "confirmed",
      title: movie.title,
      poster: movie.poster,
      theater: movie.theater || "PVR Cinemas",
      time: movie.showTime || "7:30 PM",
      seats: seats,
      total: total,
      bookedAt: new Date().toLocaleString()
    });

    saveBookings(bookings);
    window.location.href = "confirmation.html";
  });

  if (form) {
    form.addEventListener("submit", e => e.preventDefault());
  }
}

/* =========================================================
   CONFIRMATION PAGE
   ========================================================= */

function initConfirmationPage() {
  const card = document.querySelector(".confirmation-card");
  if (!card) return;

  const booking = getBookings()[0];
  if (!booking) return;

  const ticketInfo = card.querySelector(".ticket-info");
  const qr = card.querySelector(".qr-box img");

  if (ticketInfo) {
    ticketInfo.innerHTML = `
      <h4>${escapeHtml(booking.title)}</h4>
      <p>${escapeHtml(booking.theater)}</p>
      <p>${escapeHtml(booking.time)}</p>
      <p>Seats: ${escapeHtml(booking.seats.join(", "))}</p>
      <p class="booking-id">Booking ID: ${escapeHtml(booking.id)}</p>
    `;
  }

  if (qr) {
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(booking.id)}`;
  }

  const downloadBtn = document.querySelector(".download-btn");
  downloadBtn?.addEventListener("click", () => {
    alert("Ticket download feature can be connected later with backend or PDF generation.");
  });
}

/* =========================================================
   BOOKINGS PAGE
   ========================================================= */

function createBookingCard(booking) {
  const badgeClass = booking.status === "cancelled" ? "cancelled" : "confirmed";
  const buttonLabel = booking.status === "cancelled" ? "Cancelled" : "View Ticket";
  const disabledClass = booking.status === "cancelled" ? "disabled" : "";

  return `
    <div class="col-lg-4 col-md-6">
      <div class="booking-card">
        <span class="status ${badgeClass}">
          ${booking.status === "cancelled" ? "Cancelled" : "Confirmed"}
        </span>

        <img src="${escapeHtml(booking.poster)}" alt="${escapeHtml(booking.title)}">

        <h4>${escapeHtml(booking.title)}</h4>
        <p>${escapeHtml(booking.theater)}</p>
        <p>${escapeHtml(booking.time)}</p>
        <p>Seats: ${escapeHtml(booking.seats.join(", "))}</p>
        <p class="booking-id">Booking ID: ${escapeHtml(booking.id)}</p>

        <button class="btn ticket-btn ${disabledClass}" data-booking-id="${escapeHtml(booking.id)}">
          ${buttonLabel}
        </button>
      </div>
    </div>
  `;
}

function initBookingsPage() {
  const bookingSection = document.querySelector(".booking-section .row");
  if (!bookingSection) return;

  const tabs = document.querySelectorAll(".booking-tab");
  const allBookings = getBookings();

  function renderByStatus(filter) {
    let filtered = allBookings;

    if (filter === "active") {
      filtered = allBookings.filter(booking => booking.status === "confirmed");
    } else if (filter === "cancelled") {
      filtered = allBookings.filter(booking => booking.status === "cancelled");
    }

    if (!filtered.length) {
      bookingSection.innerHTML = `
        <div class="col-12">
          <div class="admin-card text-center">
            <h3>No bookings found</h3>
            <p class="text-muted mb-0">Your booked tickets will appear here.</p>
          </div>
        </div>
      `;
      return;
    }

    bookingSection.innerHTML = filtered.map(createBookingCard).join("");

    bookingSection.querySelectorAll(".ticket-btn").forEach(btn => {
      if (btn.classList.contains("disabled")) return;

      btn.addEventListener("click", () => {
        window.location.href = "confirmation.html";
      });
    });
  }

  renderByStatus("active");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const tabText = tab.textContent.trim().toLowerCase();

      if (tabText.includes("active")) {
        renderByStatus("active");
      } else if (tabText.includes("cancelled")) {
        renderByStatus("cancelled");
      } else {
        renderByStatus("history");
      }
    });
  });
}

/* =========================================================
   ADMIN PAGE
   ========================================================= */

function initAdminPage() {
  const form = document.getElementById("movieForm");
  const movieList = document.querySelector(".admin-movie-list");
  if (!form || !movieList) return;

  function renderAdminMovies() {
    const movies = getMovies();

    if (!movies.length) {
      movieList.innerHTML = `<p class="text-muted mb-0">No movies available.</p>`;
      return;
    }

    movieList.innerHTML = movies.map(movie => `
      <div class="admin-movie-item" data-id="${movie.id}">
        <img src="${escapeHtml(movie.poster)}" alt="${escapeHtml(movie.title)}">
        <div class="admin-movie-info">
          <h5>${escapeHtml(movie.title)}</h5>
          <p>${escapeHtml(movie.genre)} • ${escapeHtml(movie.rating)}</p>
        </div>
        <div class="admin-actions">
          <button class="btn edit-btn" data-edit-id="${movie.id}">Edit</button>
          <button class="btn delete-btn" data-delete-id="${movie.id}">Delete</button>
        </div>
      </div>
    `).join("");

    /* ---------- DELETE ---------- */
    movieList.querySelectorAll("[data-delete-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.deleteId);
        const updatedMovies = getMovies().filter(movie => movie.id !== id);
        saveMovies(updatedMovies);
        renderAdminMovies();
      });
    });

    /* ---------- EDIT ---------- */
    movieList.querySelectorAll("[data-edit-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.editId);
        const movie = getMovies().find(m => m.id === id);
        if (!movie) return;

        const inputs = form.querySelectorAll("input");
        inputs[0].value = movie.title || "";
        inputs[1].value = movie.poster || "";
        inputs[2].value = movie.genre || "";
        inputs[3].value = movie.rating || "";
        inputs[4].value = (movie.timings || []).join(", ");

        form.dataset.editingId = id;

        const submitBtn = form.querySelector(".admin-btn");
        if (submitBtn) {
          submitBtn.textContent = "Update Movie";
        }
      });
    });
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const inputs = form.querySelectorAll("input");

    const title = inputs[0].value.trim();
    const poster = inputs[1].value.trim();
    const genre = inputs[2].value.trim();
    const rating = inputs[3].value.trim();
    const timingsRaw = inputs[4].value.trim();

    if (!title || !poster || !genre || !rating || !timingsRaw) {
      alert("Please fill all movie fields.");
      return;
    }

    const timings = timingsRaw.split(",").map(item => item.trim()).filter(Boolean);
    const movies = getMovies();
    const editingId = Number(form.dataset.editingId || 0);

    if (editingId) {
      const movieIndex = movies.findIndex(movie => movie.id === editingId);

      if (movieIndex > -1) {
        movies[movieIndex] = {
          ...movies[movieIndex],
          title,
          poster,
          genre,
          rating,
          timings,
          showTime: timings[0] || movies[movieIndex].showTime
        };
      }

      delete form.dataset.editingId;

      const submitBtn = form.querySelector(".admin-btn");
      if (submitBtn) {
        submitBtn.textContent = "Add Movie";
      }
    } else {
      movies.unshift({
        id: Date.now(),
        title,
        genre,
        language: "English",
        rating,
        poster,
        backdrop: poster,
        description: "New movie added from admin panel.",
        year: "2026",
        runtime: "2h 15m",
        theater: "PVR Cinemas",
        showTime: timings[0] || "7:30 PM",
        price: 200,
        popularity: 90,
        timings
      });
    }

    saveMovies(movies);
    form.reset();
    renderAdminMovies();
  });

  renderAdminMovies();
}

/* Movie detailes Tabs */

function initMovieDetailTabs() {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;

      tabs.forEach(item => item.classList.remove("active"));
      contents.forEach(content => content.classList.remove("active"));

      tab.classList.add("active");

      const activeContent = document.getElementById(targetId);
      if (activeContent) {
        activeContent.classList.add("active");
      }
    });
  });
}

/*Date Selecter*/
function initDateSelector() {
  const dateCards = document.querySelectorAll(".date-card");

  if (!dateCards.length) return;

  dateCards.forEach(card => {
    card.addEventListener("click", () => {

      // active remove
      dateCards.forEach(c => c.classList.remove("active"));

      // active add
      card.classList.add("active");

      const selectedDate = card.dataset.date;

      // store for backend future
      localStorage.setItem("selectedDate", selectedDate);

      // UI update trigger
      updateShowtimesByDate(selectedDate);
    });
  });
}

/*Update Showtimes*/

function updateShowtimesByDate(date) {

  const allSlots = document.querySelectorAll(".time-slots .slot");

  if (!allSlots.length) return;

  // simple demo logic (future backend ready)
  const seed = new Date(date).getDate();

  allSlots.forEach((slot, index) => {

    // reset
    slot.classList.remove("sold");

    // random-ish pattern based on date
    if ((index + seed) % 3 === 0) {
      slot.classList.add("sold");
    }

  });

}


function initShowtimesPage() {
  const poster = document.getElementById("showtimePoster");
  const title = document.getElementById("showtimeTitle");
  const meta = document.getElementById("showtimeMeta");
  const dateCards = document.querySelectorAll(".date-card");

  if (!poster || !title || !meta) return;

  const movie = getSelectedMovie() || getMovies()[0];
  if (!movie) return;

  poster.src = movie.poster;
  poster.alt = `${movie.title} Poster`;
  title.textContent = movie.title;
  meta.textContent = `${movie.runtime} • ${movie.genre} • ${movie.language || "English"}`;

  dateCards.forEach(card => {
    card.addEventListener("click", () => {
      dateCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      const selectedDate = card.dataset.date;
      localStorage.setItem("selectedDate", selectedDate);

      updateShowtimesByDate(selectedDate);
    });
  });

  const savedDate = localStorage.getItem("selectedDate");
  if (savedDate) {
    dateCards.forEach(card => {
      if (card.dataset.date === savedDate) {
        card.click();
      }
    });
  }
}

function updateShowtimesByDate(date) {
  const allSlots = document.querySelectorAll(".time-slots .slot");

  if (!allSlots.length) return;

  const seed = new Date(date).getDate();

  allSlots.forEach((slot, index) => {
    if (slot.tagName.toLowerCase() !== "button") return;

    slot.classList.remove("sold");

    if ((index + seed) % 4 === 0) {
      slot.classList.add("sold");
    }
  });
}

function selectShowtime(theater, time) {
  const movie = getSelectedMovie();
  if (!movie) return;

  const selectedDate = localStorage.getItem("selectedDate") || "2026-03-12";

  const updatedMovie = {
    ...movie,
    theater: theater,
    showTime: time,
    selectedDate: selectedDate
  };

  saveSelectedMovie(updatedMovie);
  window.location.href = "seats.html";
}


/* =========================================================
   APP INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  seedMovies();

  initHomeMovies();
  initMoviesPage();
  initMovieDetailPage();
  initSeatsPage();
  initPaymentPage();
  initConfirmationPage();
  initBookingsPage();
  initAdminPage();
  initMovieDetailTabs();
  initDateSelector();
  initShowtimesPage();
});

let username = "";
let city = "";
let selectedShow = "";
let selectedSeats = [];

// Sample movies and theatres data
const moviesData = [
  {name: "Dhurandhar The Revenge", poster:"https://m.media-amazon.com/images/M/MV5BNzdkNjAxNWMtNWY3My00NTI1LTg2YWQtOGI3MDA0NzdhMjEyXkEyXkFqcGc@._V1_.jpg"},
  {name: "Spider-Man Brand New Day", poster:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSioFLm4hfWkUEO0q_OvuruhEVcWwom1QBaqQ&s"},
  {name: "Evil Dead Burn ", poster:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9EZx-s9MBql4U3MXstBt9N3prduDB7C2NHg&s"}
];
const theatresData = [
  {name: "PVR Cinemas", shows:["10:00 AM", "1:00 PM", "5:00 PM"]},
  {name: "INOX", shows:["11:00 AM", "2:00 PM", "6:00 PM"]},
  {name: "Cinepolis", shows:["12:00 PM", "3:00 PM", "7:00 PM"]}
];

// ===== LOGIN FUNCTION =====
function loginUser() {
  username = document.getElementById("username").value;
  city = document.getElementById("city").value;
  if(!username){
    alert("Enter your name!");
    return;
  }
  document.getElementById("login").classList.add("d-none");
  document.getElementById("movies").classList.remove("d-none");
  document.getElementById("userCity").innerText = city;
  showMovies();
}

// ===== MOVIES =====
function showMovies() {
  const grid = document.getElementById("movieGrid");
  grid.innerHTML = "";
  moviesData.forEach(movie => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card">
        <img src="${movie.poster}" class="card-img-top rounded-top">
        <div class="card-body text-center">
          <h5 class="card-title">${movie.name}</h5>
          <button class="btn btn-primary" onclick="goToTheatre('${movie.name}')">Book Now</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// ===== THEATRE & SHOW =====
function goToTheatre(movieName) {
  selectedShow = "";
  document.getElementById("movies").classList.add("d-none");
  document.getElementById("theatre").classList.remove("d-none");
  const grid = document.getElementById("theatreGrid");
  grid.innerHTML = "";
  theatresData.forEach(theatre => {
    let showButtons = theatre.shows.map(show => 
      `<button class="btn btn-outline-primary m-1" onclick="selectShow('${movieName}','${theatre.name}','${show}')">${show}</button>`
    ).join('');
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4 theatre-card";
    card.innerHTML = `
      <div class="card p-3 shadow-sm">
        <h5>${theatre.name}</h5>
        ${showButtons}
      </div>`;
    grid.appendChild(card);
  });
}

// ===== SELECT SHOW =====
function selectShow(movie,theatre,showtime) {
  selectedShow = `${movie} - ${theatre} - ${showtime}`;
  document.getElementById("theatre").classList.add("d-none");
  document.getElementById("seat").classList.remove("d-none");
  document.getElementById("selectedShowName").innerText = selectedShow;
  generateSeats();
}

// ===== SEAT SELECTION =====
function generateSeats() {
  const container = document.getElementById("seatGrid");
  container.innerHTML = "";
  selectedSeats = [];
  for(let row=0; row<4; row++){
    for(let col=1; col<=6; col++){
      const seatNum = String.fromCharCode(65+row) + col;
      const seat = document.createElement("div");
      seat.className = "seat";
      seat.innerText = seatNum;
      // Random booked seats
      if(Math.random()<0.2) seat.classList.add("booked");
      seat.onclick = () => {
        if(seat.classList.contains("booked")) return;
        seat.classList.toggle("selected");
        if(selectedSeats.includes(seatNum)) selectedSeats = selectedSeats.filter(s=>s!==seatNum);
        else selectedSeats.push(seatNum);
        updateSelectedSeatsText();
      };
      container.appendChild(seat);
    }
  }
}

function updateSelectedSeatsText() {
  document.getElementById("selectedSeatsText").innerText =
    selectedSeats.length>0 ? "Selected Seats: " + selectedSeats.join(", ") : "Selected Seats: None";
}

// ===== CONFIRM =====
function confirmBooking(){
  if(selectedSeats.length==0){ alert("Select at least 1 seat!"); return;}
  document.getElementById("seat").classList.add("d-none");
  const confirmDiv = document.getElementById("confirm");
  confirmDiv.classList.remove("d-none");
  confirmDiv.innerHTML = `
    <h2>🎉 Booking Confirmed!</h2>
    <p>${selectedShow}</p>
    <p>Seats: ${selectedSeats.join(", ")}</p>
    <p class="mt-3">Enjoy Your Movie, ${username}!</p>
  `;
  confirmDiv.scrollIntoView({behavior:"smooth"});
}

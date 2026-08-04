// ================== Utilities (Functional Programming) ==================
const saveToStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

// ================== OOP: Room Class ==================
class Room {
  constructor(type, price, facilities, image) {
    this.type = type;
    this.price = price;
    this.facilities = facilities;
    this.image = image;
  }
  render() {
    return `
      <div class="bg-white shadow p-4 rounded">
        <img src="${this.image}" class="w-full h-40 object-cover mb-2">
        <h3 class="font-bold">${this.type}</h3>
        <p>Ksh ${this.price} / night</p>
        <p class="text-sm text-gray-500">${this.facilities}</p>
      </div>`;
  }
}

// ================== Rooms Page ==================
const rooms = [
  new Room("Deluxe", 4500, "WiFi, TV, AC", "assets/delux.jpg"),
  new Room("Executive Suite", 7800, "WiFi, TV, Lounge", "assets/executive.jpg"),
  new Room("Family Room", 6200, "WiFi, Kitchenette", "assets/family.jpg")
];
function showRooms() {
  const container = document.getElementById("roomsContainer");
  if (!container) return;
  rooms.forEach(r => container.innerHTML += r.render());
}

// ================== Booking Page ==================
function calculateCost() {
  const checkin = new Date(document.getElementById("checkin").value);
  const checkout = new Date(document.getElementById("checkout").value);
  const roomType = document.getElementById("roomType").value;
  if (checkout > checkin) {
    const nights = (checkout - checkin) / (1000*60*60*24);
    const price = rooms.find(r => r.type === roomType).price;
    document.getElementById("totalCost").textContent = "Total: Ksh " + (nights * price);
  }
}
function setupBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;
  form.addEventListener("change", calculateCost);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const booking = {
      name: document.getElementById("name").value,
      checkin: document.getElementById("checkin").value,
      checkout: document.getElementById("checkout").value,
      guests: document.getElementById("guests").value,
      roomType: document.getElementById("roomType").value,
      total: document.getElementById("totalCost").textContent
    };
    let bookings = getFromStorage("bookings");
    bookings.push(booking);
    saveToStorage("bookings", bookings);
    document.getElementById("confirmationMessage").innerHTML =
      `<p class="bg-green-100 p-3">Booking saved for ${booking.name}!</p>`;
    loadBookings(); // refresh admin table
  });
}

// ================== Restaurant Page ==================
const menu = [
  { name:"Nyama Choma", price:1000, image:"assets/nyama choma.jpg" },
  { name:"Pilau", price:800, image:"assets/pilau.jpg" },
  { name:"Chapati & Beans", price:500, image:"assets/chapati-beans.jpg" },
  { name:"Fresh Juice", price:300, image:"assets/fresh-juice.jpg" }
];

function showMenu() {
  const container = document.getElementById("menuContainer");
  if (!container) return;
  menu.forEach(item => {
    container.innerHTML += `
      <div class="border p-4 bg-white shadow">
        <img src="${item.image}" class="w-full h-32 object-cover mb-2" alt="${item.name}">
        <p class="font-bold">${item.name}</p>
        <p>Ksh ${item.price}</p>
      </div>`;
  });
}

// ================== Admin Dashboard ==================
function loadBookings() {
  const bookings = getFromStorage("bookings");
  const table = document.getElementById("bookingsTable");
  if (!table) return;
  table.querySelectorAll("tr:not(:first-child)").forEach(r => r.remove());
  bookings.forEach((b, i) => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${b.name}</td><td>${formatDate(b.checkin)}</td><td>${formatDate(b.checkout)}</td>
      <td>${b.guests}</td><td>${b.roomType}</td><td>${b.total}</td>
      <td>
        <button class="bg-red-500 text-white px-2" onclick="deleteBooking(${i})">Delete</button>
        <button class="bg-blue-500 text-white px-2" onclick="editBooking(${i})">Edit</button>
      </td>`;
  });
}
function deleteBooking(i) {
  let bookings = getFromStorage("bookings");
  bookings.splice(i,1);
  saveToStorage("bookings", bookings);
  loadBookings();
}
function editBooking(i) {
  let bookings = getFromStorage("bookings");
  const b = bookings[i];
  const newName = prompt("Edit name:", b.name);
  if (newName) b.name = newName;
  saveToStorage("bookings", bookings);
  loadBookings();
}

// ================== Fake API Simulation ==================
async function fakeAPIGetBookings() {
  return new Promise(resolve => setTimeout(() => resolve(getFromStorage("bookings")), 500));
}
async function loadFromAPI() {
  const bookings = await fakeAPIGetBookings();
  console.log("API returned:", bookings);
}

// ================== Init ==================
document.addEventListener("DOMContentLoaded", () => {
  showRooms();
  showMenu();
  setupBookingForm();
  loadBookings();
});

function showNotification(message, type="success") {
  const notif = document.createElement("div");
  notif.textContent = message;
  notif.className = `fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white 
    ${type === "success" ? "bg-green-600" : "bg-red-600"}`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

function handleAdminLogin(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    showNotification("Admin logged in successfully", "success");
    // Redirect only if not already on admin.html
    if (!window.location.href.includes("admin.html")) {
      window.location.href = "admin.html";
    }
  } else {
    showNotification("Invalid username or password", "error");
  }
}

function adminLogout() {
  showNotification("Admin logged out", "error");
  window.location.href = "index.html";
}

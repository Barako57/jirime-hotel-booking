// ================== Utilities (Functional Programming) ==================

const saveToStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const getFromStorage = (key) =>
  JSON.parse(localStorage.getItem(key)) || [];

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString();


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

        <img
          src="${this.image}"
          class="w-full h-40 object-cover mb-2"
          alt="${this.type}"
        >

        <h3 class="font-bold">
          ${this.type}
        </h3>

        <p>
          Ksh ${this.price} / night
        </p>

        <p class="text-sm text-gray-500">
          ${this.facilities}
        </p>

      </div>
    `;

  }
}


// ================== Rooms Page ==================

const rooms = [

  new Room(
    "Deluxe",
    4500,
    "WiFi, TV, AC",
    "assets/delux.jpg"
  ),

  new Room(
    "Executive Suite",
    7800,
    "WiFi, TV, Lounge",
    "assets/executive.jpg"
  ),

  new Room(
    "Family Room",
    6200,
    "WiFi, Kitchenette",
    "assets/family.jpg"
  )

];


function showRooms() {

  const container =
    document.getElementById("roomsContainer");

  if (!container) return;

  container.innerHTML = "";

  rooms.forEach(room => {

    container.innerHTML += room.render();

  });

}


// ================== Booking Calculation ==================

function calculateCost() {

  const checkinValue =
    document.getElementById("checkin").value;

  const checkoutValue =
    document.getElementById("checkout").value;

  const roomType =
    document.getElementById("roomType").value;

  const totalElement =
    document.getElementById("totalCost");


  if (
    !checkinValue ||
    !checkoutValue ||
    !roomType
  ) {

    totalElement.textContent =
      "Total: Ksh 0";

    return 0;

  }


  const checkin =
    new Date(checkinValue);

  const checkout =
    new Date(checkoutValue);


  if (checkout <= checkin) {

    totalElement.textContent =
      "Total: Ksh 0";

    return 0;

  }


  const nights = Math.ceil(

    (checkout - checkin) /
    (1000 * 60 * 60 * 24)

  );


  const selectedRoom =
    rooms.find(
      room => room.type === roomType
    );


  if (!selectedRoom) {

    totalElement.textContent =
      "Total: Ksh 0";

    return 0;

  }


  const total =
    nights * selectedRoom.price;


  totalElement.textContent =
    "Total: Ksh " + total;


  return total;

}


// ================== Booking Form ==================

function setupBookingForm() {

  const form =
    document.getElementById(
      "bookingForm"
    );

  if (!form) return;


  // Calculate total when
  // date or room changes

  form.addEventListener(
    "change",
    calculateCost
  );


  form.addEventListener(
    "submit",
    function(e) {

      e.preventDefault();


      // ==================
      // CHECK LOGIN FIRST
      // ==================

      const loggedIn =
        localStorage.getItem(
          "loggedIn"
        );


      if (loggedIn !== "true") {

        document.getElementById(
          "confirmationMessage"
        ).innerHTML = `

          <p
            class="bg-red-100 text-red-700 p-3 rounded"
          >

            You must create an account
            and login before making
            a booking.

            <br><br>

            <a
              href="register.html"
              class="text-blue-700 font-bold underline"
            >
              Create Account
            </a>

            &nbsp; or &nbsp;

            <a
              href="login.html"
              class="text-blue-700 font-bold underline"
            >
              Login
            </a>

          </p>

        `;

        return;

      }


      // ==================
      // CALCULATE TOTAL
      // ==================

      const total =
        calculateCost();


      if (total === 0) {

        document.getElementById(
          "confirmationMessage"
        ).innerHTML = `

          <p
            class="bg-red-100 text-red-700 p-3 rounded"
          >

            Please select a valid room
            and valid dates.

          </p>

        `;

        return;

      }


      // ==================
      // GET BOOKING DATA
      // ==================

      const booking = {

        name:
          document.getElementById(
            "name"
          ).value,

        checkin:
          document.getElementById(
            "checkin"
          ).value,

        checkout:
          document.getElementById(
            "checkout"
          ).value,

        guests:
          document.getElementById(
            "guests"
          ).value,

        roomType:
          document.getElementById(
            "roomType"
          ).value,

        total:
          "Ksh " + total

      };


      // ==================
      // SAVE BOOKING
      // ==================

      let bookings =
        getFromStorage(
          "bookings"
        );


      bookings.push(
        booking
      );


      saveToStorage(
        "bookings",
        bookings
      );


      // ==================
      // CONFIRMATION
      // ==================

      document.getElementById(
        "confirmationMessage"
      ).innerHTML = `

        <p
          class="bg-green-100 text-green-700 p-3 rounded"
        >

          <strong>
            Booking successful!
          </strong>

          <br><br>

          Customer:
          ${booking.name}

          <br>

          Room:
          ${booking.roomType}

          <br>

          Check-in:
          ${formatDate(booking.checkin)}

          <br>

          Check-out:
          ${formatDate(booking.checkout)}

          <br>

          Total:
          ${booking.total}

        </p>

      `;


      // Update admin dashboard
      loadBookings();

    }
  );

}


// ================== Restaurant Page ==================

const menu = [

  {
    name: "Nyama Choma",
    price: 1000,
    image: "assets/nyama choma.jpg"
  },

  {
    name: "Pilau",
    price: 800,
    image: "assets/pilau.jpg"
  },

  {
    name: "Chapati & Beans",
    price: 500,
    image: "assets/chapati-beans.jpg"
  },

  {
    name: "Fresh Juice",
    price: 300,
    image: "assets/fresh-juice.jpg"
  }

];


function showMenu() {

  const container =
    document.getElementById(
      "menuContainer"
    );

  if (!container) return;

  container.innerHTML = "";


  menu.forEach(item => {

    container.innerHTML += `

      <div
        class="border p-4 bg-white shadow rounded"
      >

        <img
          src="${item.image}"
          class="w-full h-32 object-cover mb-2"
          alt="${item.name}"
        >

        <p class="font-bold">
          ${item.name}
        </p>

        <p>
          Ksh ${item.price}
        </p>

      </div>

    `;

  });

}


// ================== Admin Login ==================

function showAdminLogin() {

  const loginSection =
    document.getElementById(
      "adminLoginSection"
    );

  const dashboard =
    document.getElementById(
      "adminDashboard"
    );


  if (loginSection) {

    loginSection.classList.remove(
      "hidden"
    );

  }


  if (dashboard) {

    dashboard.classList.add(
      "hidden"
    );

  }


  if (loginSection) {

    loginSection.scrollIntoView({
      behavior: "smooth"
    });

  }

}


// ================== Admin Login Form ==================

const adminLoginForm =
  document.getElementById(
    "adminLoginForm"
  );


if (adminLoginForm) {

  adminLoginForm.addEventListener(
    "submit",
    function(e) {

      e.preventDefault();


      const username =
        document.getElementById(
          "username"
        ).value;


      const password =
        document.getElementById(
          "adminPassword"
        ).value;


      if (
        username === "admin" &&
        password === "1234"
      ) {

        showNotification(
          "Admin logged in successfully",
          "success"
        );


        document
          .getElementById(
            "adminLoginSection"
          )
          .classList.add(
            "hidden"
          );


        document
          .getElementById(
            "adminDashboard"
          )
          .classList.remove(
            "hidden"
          );


        loadBookings();


        document
          .getElementById(
            "adminDashboard"
          )
          .scrollIntoView({
            behavior: "smooth"
          });


      } else {

        showNotification(
          "Invalid username or password",
          "error"
        );

      }

    }
  );

}


// ================== Admin Dashboard ==================

function loadBookings() {

  const bookings =
    getFromStorage(
      "bookings"
    );


  const table =
    document.getElementById(
      "bookingsTable"
    );


  if (!table) return;


  // Remove old booking rows

  table
    .querySelectorAll(
      "tr:not(:first-child)"
    )
    .forEach(
      row => row.remove()
    );


  // Add bookings

  bookings.forEach(
    (booking, index) => {

      const row =
        table.insertRow();


      row.innerHTML = `

        <td class="border p-2">
          ${booking.name}
        </td>

        <td class="border p-2">
          ${formatDate(
            booking.checkin
          )}
        </td>

        <td class="border p-2">
          ${formatDate(
            booking.checkout
          )}
        </td>

        <td class="border p-2">
          ${booking.guests}
        </td>

        <td class="border p-2">
          ${booking.roomType}
        </td>

        <td
          class="border p-2 font-bold"
        >
          ${booking.total}
        </td>

        <td class="border p-2">

          <button
            class="bg-red-500 text-white px-2 py-1 rounded"
            onclick="deleteBooking(${index})"
          >
            Delete
          </button>

          <button
            class="bg-blue-500 text-white px-2 py-1 rounded"
            onclick="editBooking(${index})"
          >
            Edit
          </button>

        </td>

      `;

    }
  );

}


// ================== Delete Booking ==================

function deleteBooking(index) {

  let bookings =
    getFromStorage(
      "bookings"
    );


  bookings.splice(
    index,
    1
  );


  saveToStorage(
    "bookings",
    bookings
  );


  loadBookings();


  showNotification(
    "Booking deleted",
    "success"
  );

}


// ================== Edit Booking ==================

function editBooking(index) {

  let bookings =
    getFromStorage(
      "bookings"
    );


  const booking =
    bookings[index];


  const newName =
    prompt(
      "Edit customer name:",
      booking.name
    );


  if (newName) {

    booking.name =
      newName;


    saveToStorage(
      "bookings",
      bookings
    );


    loadBookings();

  }

}


// ================== Admin Logout ==================

function adminLogout() {

  document
    .getElementById(
      "adminDashboard"
    )
    .classList.add(
      "hidden"
    );


  showNotification(
    "Admin logged out",
    "success"
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ================== Notification ==================

function showNotification(
  message,
  type = "success"
) {

  const notification =
    document.createElement(
      "div"
    );


  notification.textContent =
    message;


  notification.className = `

    fixed
    top-5
    right-5
    px-4
    py-2
    rounded
    shadow-lg
    text-white
    z-50

    ${
      type === "success"
        ? "bg-green-600"
        : "bg-red-600"
    }

  `;


  document.body.appendChild(
    notification
  );


  setTimeout(
    () => notification.remove(),
    3000
  );

}
// ================== CREATE ACCOUNT ==================

const registerForm =
  document.getElementById(
    "registerForm"
  );


if (registerForm) {

  registerForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const name =
        document.getElementById(
          "name"
        ).value;


      const email =
        document.getElementById(
          "email"
        ).value;


      const phone =
        document.getElementById(
          "phone"
        ).value;


      const password =
        document.getElementById(
          "password"
        ).value;


      const confirmPassword =
        document.getElementById(
          "confirmPassword"
        ).value;


      const message =
        document.getElementById(
          "message"
        );


      if (
        password !==
        confirmPassword
      ) {

        message.textContent =
          "Passwords do not match.";

        message.style.color =
          "red";

        return;

      }


      const user = {

        name: name,

        email: email,

        phone: phone,

        password: password

      };


      localStorage.setItem(
        "jirimeUser",
        JSON.stringify(user)
      );


      message.textContent =
        "Account created successfully!";


      message.style.color =
        "green";


      setTimeout(
        function() {

          window.location.href =
            "login.html";

        },
        1500
      );

    }
  );

}


// ================== LOGIN ==================

const loginForm =
  document.getElementById(
    "loginForm"
  );


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const email =
        document.getElementById(
          "loginEmail"
        ).value;


      const password =
        document.getElementById(
          "loginPassword"
        ).value;


      const message =
        document.getElementById(
          "loginMessage"
        );


      const savedUser =
        JSON.parse(
          localStorage.getItem(
            "jirimeUser"
          )
        );


      if (!savedUser) {

        message.textContent =
          "Account not found. Please create an account.";

        message.style.color =
          "red";

        return;

      }


      if (
        email === savedUser.email &&
        password === savedUser.password
      ) {

        // IMPORTANT:
        // This allows booking

        localStorage.setItem(
          "loggedIn",
          "true"
        );


        message.textContent =
          "Login successful!";


        message.style.color =
          "green";


        setTimeout(
          function() {

            window.location.href =
              "index.html";

          },
          1000
        );


      } else {

        message.textContent =
          "Incorrect email or password.";

        message.style.color =
          "red";

      }

    }
  );

}


// ================== CUSTOMER LOGOUT ==================

function logout() {

  localStorage.removeItem(
    "loggedIn"
  );


  alert(
    "You have logged out successfully."
  );


  window.location.href =
    "login.html";

}


// ================== INITIALIZE ==================

document.addEventListener(
  "DOMContentLoaded",
  function() {

    showRooms();

    showMenu();

    setupBookingForm();

    loadBookings();

  }
);


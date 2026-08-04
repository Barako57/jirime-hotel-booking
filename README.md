# Jirime Resort Booking System

A web-based resort management system built with **HTML, CSS, and JavaScript**.  
It demonstrates **functional programming, OOP, DOM manipulation, and API simulation**.

---

## Features
- **Homepage (index.html)**: Hero banner, About section, navigation to other pages.
- **Rooms (rooms.html)**: Dynamic room listing using a `Room` class (OOP).
- **Booking (booking.html)**: Interactive booking form with cost calculation, confirmation message, and Local Storage persistence.
- **Restaurant (restaurant.html)**: Menu items displayed dynamically with images.
- **Admin Dashboard (admin.html)**: View, edit, and delete bookings. Data loaded from Local Storage and simulated API.

---

## Technologies
- **HTML5** for structure
- **CSS3** (custom `style.css` + Tailwind utility classes) for styling
- **JavaScript** for logic:
  - Functional helpers (`saveToStorage`, `getFromStorage`, `formatDate`)
  - OOP (`Room` class)
  - DOM manipulation (`showRooms`, `setupBookingForm`, `showMenu`, `loadBookings`)
  - API simulation (`fakeAPIGetBookings`)

---

## How to Run
1. Clone or download the project folder.
2. Place images in the `images/` directory:
   - `hero.jpg`, `about.jpg`, `deluxe.jpg`, `executive.jpg`, `family.jpg`
   - `nyama_choma.jpg`, `pilau.jpg`, `chapati_beans.jpg`, `fresh_juice.jpg`
3. Open `index.html` in your browser.
4. Navigate between pages using the navbar.

---

## Demo Flow
1. Go to **Rooms** → see dynamic room cards.
2. Go to **Booking** → fill form, calculate cost, confirm booking.
3. Go to **Restaurant** → view menu with images.
4. Go to **Admin** → see all bookings, edit/delete entries.

---

## Author
Created by **Baharez** for presentation and learning purposes.

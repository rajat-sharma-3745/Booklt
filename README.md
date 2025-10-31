# 📘 Booklt  
> **Booklt** is a full-stack booking platform built with the **MERN (MongoDB, Express, React, Node.js)** stack.  
> It allows users to explore unique experiences, view details, book available slots, and apply promotional codes — all with a smooth and responsive interface powered by **React + Vite**.

---

## 🧩 Overview
**Booklt** provides a seamless way to browse and book experiences across different categories.  
Users can view experience details, select available slots, and proceed with checkout using promo codes for discounts.  

The **backend** powers the booking system with APIs for managing experiences, bookings, and promotional codes.  
The **frontend** delivers an engaging, fast, and responsive user experience built using modern React best practices.

---

## ✨ Features

### 🎯 User Features
- 🧭 Explore all available experiences  
- 📄 View detailed experience information (description, pricing, slots)  
- 🗓️ Book available time slots instantly  
- 🎟️ Apply promo codes for discounts  
- ⚡ Real-time loading states with shimmer effects  
- 📱 Responsive design for all devices  

### ⚙️ System Features
- 🚀 RESTful API for experiences, bookings, and promo codes  
- 🧱 MongoDB for data storage  
- 🧩 MVC architecture for maintainability  
- 🧰 Seeder script to populate database with sample data  
- 🔒 Centralized database connection and routing  
- 💬 Modular code structure separating controllers, routes, and models  

---

## 🧰 Tech Stack

### 🖥️ Frontend
- ⚛️ **React (Vite)**
- 🧭 **React Router**
- 💅 **CSS / Tailwind CSS**
- 🧩 **Context API** for global state management
- 📦 **Axios** for API integration

### 🧮 Backend
- 🟢 **Node.js / Express.js**
- 🍃 **MongoDB + Mongoose**
- ⚙️ **RESTful API Architecture**
- 🧰 **Seeder Script** for populating initial data
- 🔐 **dotenv** for environment configuration

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/rajat-sharma-3745/booklt.git
cd booklt
```
 ## 2️⃣ Backend setup
 ```bash
cd backend
npm install
node seeder.js // Run the database seeder
```
3️⃣ Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```
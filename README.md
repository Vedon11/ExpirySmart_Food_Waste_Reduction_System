# 📦 ExpirySmart

ExpirySmart is a smart web application designed to help users track product expiry dates, manage inventory efficiently, and reduce waste through timely alerts and organized data handling.

---

## 🎥 Demo Video

👉 [Watch Demo](C:\Users\Vedika\Downloads\expiry-smart-github\expiry-smart-github\Screen Recording 2026-04-21 230210.mp4)

---

## 🌐 Live Project

👉 https://expirysmart.lovable.app/

---

## 🚀 Features

- 📋 Add, update, and delete items easily
- ⏰ Track expiry dates in real-time
- 🔔 Smart alerts for expiring items
- 📊 Clean dashboard for inventory overview
- 📁 CSV import support for bulk data
- 🗂️ Categorization of items
- 🧠 Smart state handling (Active, Used, Thrown)

---

## 🛠️ Tech Stack

- **Frontend:** React / TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Local Storage / React State
- **Utilities:** UUID (for unique IDs), CSV Parser
- **Development Tool:** VS Code

---

## 📂 Project Structure

src/
│── components/ # UI Components
│── utils/ # Helper functions (CSV parser, storage)
│── data/ # Sample / demo data
│── types/ # TypeScript interfaces
│── App.tsx # Main app logic

---

## ⚙️ How It Works

### 🧾 Data Handling

- Each item is stored with:
  - Unique ID (using UUID)
  - Name, category, quantity
  - Purchase date & expiry date
  - Notes and state (active/used/thrown)

- Data is stored in **local storage**, so:
  - No backend required
  - Fast performance
  - Persistent data in browser

---

### 📥 CSV Import System

- Users can upload a CSV file with columns:
  Item Name, Category, Quantity, Purchase Date, Expiry Date, Notes
  - Custom CSV parser:
- Handles commas inside quotes
- Converts rows into structured objects
- Automatically assigns IDs and timestamps

---

### 🔄 State Management

Each item has a lifecycle:

- **Active** → Currently usable
- **Used** → Already consumed
- **Thrown** → Expired or discarded

---

### ⏳ Expiry Tracking Logic

- Compares current date with expiry date
- Highlights:
- Expired items
- Items close to expiry
- Enables smarter decision-making

---

## 🧠 Key Concepts Used

- Component-based architecture
- Reusable utility functions
- Data transformation (CSV → JSON)
- Browser storage (localStorage)
- Unique ID generation
- Basic date comparison logic

---

## 📌 Future Improvements

- 🔔 Email / push notifications
- ☁️ Cloud database integration
- 📱 Mobile responsiveness improvements
- 🤖 AI-based consumption prediction

---

## 💡 Conclusion

ExpirySmart simplifies everyday inventory management by combining smart tracking, clean UI, and efficient data handling. It is especially useful for reducing waste and improving organization in daily life.

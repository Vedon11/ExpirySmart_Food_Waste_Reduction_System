# 📦 ExpirySmart

ExpirySmart is an AI-powered inventory and expiry tracking system that helps users manage items, monitor expiry dates, and reduce waste through smart alerts and efficient organization.

---

## 🎥 Demo Video

👉 (Add your video link here)

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
- **State Management:** React State / Local Storage
- **Utilities:** UUID, Custom CSV Parser
- **Development Tool:** VS Code

---

## 📂 Project Structure

src/
│── components/ # UI Components
│── utils/ # Helper functions
│── data/ # Sample data
│── types/ # TypeScript interfaces
│── App.tsx # Main app logic

---

## ⚙️ How It Works

### 🧾 Data Handling

Each item contains:

- Unique ID (UUID)
- Name, category, quantity
- Purchase & expiry date
- Notes and state

Data is stored in **localStorage**, so:

- No backend required
- Fast and lightweight
- Persistent in browser

---

### 📥 CSV Import System

- Upload CSV with columns:
  - Item Name, Category, Quantity, Purchase Date, Expiry Date, Notes
- Custom parser:
  - Handles quoted values
  - Converts CSV → structured data
  - Auto-generates IDs

---

### 🔄 State Management

Each item lifecycle:

- **Active** → usable
- **Used** → consumed
- **Thrown** → expired

---

### ⏳ Expiry Tracking

- Compares current date with expiry date
- Highlights:
  - Expired items
  - Near-expiry items

---

## 📌 Future Improvements

- 🔔 Notifications (email/push)
- ☁️ Cloud database
- 📱 Better mobile UI
- 🤖 AI predictions

---

## 💡 Conclusion

ExpirySmart makes inventory tracking simple, smart, and efficient—helping reduce waste and improve daily organization.

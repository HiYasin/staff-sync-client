# Staff Sync

A web-based **Employee Management System** that streamlines HR processes, including **employee records management, payroll processing, and performance evaluation**. This platform enhances productivity, facilitates efficient communication, and ensures **secure record-keeping**.

## 🌐 Live Demo  
🔗 [Staff Sync](https://staff-sync-9fbf6.web.app/)  
 
---

## 🚀 Technologies Used  
The project is built with the following technologies:  

- **React** – Frontend framework  
- **React Router** – For dynamic routing  
- **Firebase** – Authentication & database  
- **Tailwind CSS & Material Tailwind** – UI styling  
- **TanStack Query & TanStack Table** – Data fetching & table UI  
- **Axios** – API requests  
- **Recharts** – Salary graph visualization  
- **Swiper** – Testimonial slider  
- **React Hook Form** – Form management  
- **SweetAlert2** – Smooth toast notifications  

---

## 🔑 Key Features  

✅ **Secure Login System** with Firebase & JWT  
✅ **Role-Based Access** (Admin, HR, Employee)  
✅ **User-Friendly Dashboard** for employees and HR  
✅ **Employee Management** (Add, update, delete work history)  
✅ **Payment Tracking** (Employees can view salary records)  
✅ **HR Features:** View employees, verify accounts, request salary payments  
✅ **Admin Features:** Promote employees to HR, fire employees  
✅ **Payment Gateway Integration**  

---

## 📦 Dependencies  

```json
{
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@material-tailwind/react": "^2.1.10",
    "@smastrom/react-rating": "^1.5.0",
    "@stripe/react-stripe-js": "^3.1.1",
    "@stripe/stripe-js": "^5.5.0",
    "@tanstack/react-query": "^5.64.2",
    "@tanstack/react-table": "^8.20.6",
    "axios": "^1.7.9",
    "date-fns": "^4.1.0",
    "firebase": "^11.2.0",
    "localforage": "^1.10.0",
    "lucide-react": "^0.473.0",
    "match-sorter": "^8.0.0",
    "react": "^18.3.1",
    "react-day-picker": "^9.5.0",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.54.2",
    "react-rating": "^2.0.5",
    "react-router-dom": "^7.1.3",
    "recharts": "^2.15.0",
    "sort-by": "^1.2.0",
    "sweetalert2": "^11.15.10",
    "swiper": "^11.2.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.17.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "globals": "^15.14.0",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.5"
  }
}
```

---

## 🛠️ How to Run Locally  

1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/your-repo/staff-sync.git
cd staff-sync
```

2️⃣ **Install Dependencies**  
```sh
npm install
```

3️⃣ **Set Up environment file**  
Here’s the `.env.local` configuration formatted in Markdown:

# Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
VITE_apiKey=your_firebase_apiKey
VITE_authDomain=your_firebase_authDomain
VITE_projectId=your_firebase_projectId
VITE_storageBucket=your_firebase_storageBucket
VITE_messagingSenderId=your_firebase_messagingSenderId
VITE_appId=your_firebase_appId
VITE_imageUploadKey=your_imageUploadKey
VITE_baseUrl=your_server_baseUrl
VITE_stripe_key=your_stripe_key
```
> **Note:** Replace `your_firebase_apiKey`, `your_imageUploadKey`, etc., with your actual keys.

Make sure to add `.env.local` to your `.gitignore` file to keep your credentials secure.

4️⃣ **Run the Application**  
```sh
npm run dev
```

---

## 🔐 Admin Credentials  
**Email:** admin@staff.com  
**Password:** Admin@123  

> Admin can promote employees to HR, while HR can verify employees.  

---

## 📂 Relevant Resources  
📘 **Firebase Docs** - [https://firebase.google.com/docs](https://firebase.google.com/docs)  
📘 **React Router** - [https://reactrouter.com](https://reactrouter.com)  
📘 **Tailwind CSS** - [https://tailwindcss.com](https://tailwindcss.com)  

---

💡 *Contributions & feedback are welcome!* 🚀  
Let me know if you need any modifications! 🚀

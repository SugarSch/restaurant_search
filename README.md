# Restaurant Search
A responsive web application that allows users to search for restaurants by name or district, featuring a real-time map and database caching for optimized performance.

## ✨ Key Features
- Smart Filter: Search by name or district.
- Database Caching: Stores search results in the database to reduce file I/O.
- Responsive Design: Mobile-friendly layout.
- Interactive Map: Uses Leaflet.js to display restaurant locations with auto-zoom.

## 🛠️ Frameworks used

- Backend: Laravel
- Frontend: React +  Tailwind CSS
- Map: Leaflet

## 📂 Data Management

The application fetches restaurant data from `database/data/restaurants.json`.

## 🚀 Setup instructions

1. copy /backend/.env.example to /backend/.env
2. change FRONTEND_URL={your frontend url} in backend/.env
3. install libraries
   ```
   cd backend
   ```
   ```
   composer install
   ```
4. use this command to create table
   ```
   php artisan migrate
   ```
5. copy /fontend/.env.example to /fontend/.env
6. change VITE_BASE_URL={your backend url} in frontend/.env
7. install libraries
   ```
   cd forntend
   ```
   ```
   npm install
   ```


## ▶️ How to run and test the app

<b>For Backend</b>
```
cd backend
```
```
php artisan serve
```

<b>For Frontend</b>
```
cd forntend
```
```
npm run dev
```



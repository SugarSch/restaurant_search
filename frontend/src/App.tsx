import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Search from './components/Search';
import List from './components/List';
import MapSection from './components/MapSection';

const base_url = import.meta.env.VITE_BASE_URL;

function App() {

    const [keyword, setKeyword] = useState('Bang Sue');
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, [])

    const fetchRestaurants = async () => {
        try {
            const res = await axios.get(`${base_url}/api/restaurant?keyword=${keyword}`);
            if (res.data && res.data.data) {
                setRestaurants(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching restaurants:", err);
        }
    };

    return (
      <div className="flex flex-col h-screen w-screen font-sans">
        <Search keyword={keyword} setKeyword={setKeyword} fetchData={fetchRestaurants}/>
        <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <List places={restaurants}/>
          <MapSection places={restaurants}/>
        </main>
      </div>
    )
}

export default App

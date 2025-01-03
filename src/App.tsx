import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store.ts";
import Navbar from "./components/navbar/Navbar.tsx";
import CoronaUpdates from "./pages/coronaUpdates/CoronaUpdates.tsx";
import Politics from "./pages/politics/Politics.tsx";
import Business from "./pages/business/Business.tsx";
import Sports from "./pages/sports/Sports.tsx";
import World from "./pages/world/World.tsx";
import Travel from "./pages/travel/Travel.tsx";
import Podcasts from "./pages/podcasts/Podcasts.tsx";
import Search from "./pages/search/Search.tsx";
import Footer from "./components/footer/Footer.tsx";
import Profile from "./pages/profile/Profile.tsx";
import Home from "./pages/home/Home.tsx";

function App() {
  const loading = useSelector((state: RootState) => state.news.loading);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corona-updates" element={<CoronaUpdates />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/business" element={<Business />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/world" element={<World />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!loading && <Footer />}
    </>
  );
}

export default App;

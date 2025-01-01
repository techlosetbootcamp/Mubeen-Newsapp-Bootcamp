import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store.ts";
import Navbar from "./components/navbar/Navbar.tsx";
import Home from "./pages/Home.tsx";
import CoronaUpdates from "./pages/CoronaUpdates.tsx";
import Politics from "./pages/Politics.tsx";
import Business from "./pages/Business.tsx";
import Sports from "./pages/Sports.tsx";
import World from "./pages/World.tsx";
import Travel from "./pages/Travel.tsx";
import Podcasts from "./pages/Podcasts.tsx";
import Search from "./pages/Search.tsx";
import Footer from "./components/Footer.tsx";
import Profile from "./pages/Profile.tsx";

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

// Updated Home.tsx
import React, { useState } from "react";
import Hero from "../../components/hero/Hero.tsx";
import BreakingNews from "../../components/breakingNews/BreakingNews.tsx";
import EditorsPicks from "../../components/editorsPicks/EditorsPicks.tsx";
import NewsCardContainer from "../../components/newsCardContainer/NewsCardContainer.tsx";
import Header from "../../components/header/Header.tsx";
import Podcasts from "../podcasts/Podcasts.tsx";
import CoronaUpdates from "../coronaUpdates/CoronaUpdates.tsx";

function Home() {
  const [activeTab, setActiveTab] = useState("Latest Stories");

  const renderContent = () => {
    if (activeTab === "Opinion") return <Podcasts />;
    if (activeTab === "Health") return <CoronaUpdates />;
    return <NewsCardContainer />; // Default is "Latest Stories"
  };

  return (
    <div className="bg-[#f1f2f3] min-h-screen w-full flex flex-col items-center justify-center gap-3">
      <Hero />
      <BreakingNews />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
      <EditorsPicks />
    </div>
  );
}

export default Home;

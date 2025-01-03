import React from "react";
import Hero from "../../components/hero/Hero.tsx";
import BreakingNews from "../../components/breakingNews/BreakingNews.tsx";
import EditorsPicks from "../../components/editorsPicks/EditorsPicks.tsx";
import NewsCardContainer from "../../components/newsCardContainer/NewsCardContainer.tsx";
import Header from "../../components/header/Header.tsx";
import Podcasts from "../podcasts/Podcasts.tsx";
import CoronaUpdates from "../coronaUpdates/CoronaUpdates.tsx";
import useHome from "./useHome.ts";

function Home() {
  const { activeTab, setActiveTab } = useHome();
  return (
    <div className="bg-PrimaryBackground min-h-screen w-full flex flex-col items-center justify-center gap-3">
      <Hero />
      <BreakingNews />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "Opinion" ? (
        <Podcasts />
      ) : activeTab === "Health" ? (
        <CoronaUpdates />
      ) : (
        <NewsCardContainer />
      )}
      <EditorsPicks />
    </div>
  );
}

export default Home;

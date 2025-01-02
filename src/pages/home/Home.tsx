import React from "react";
import Hero from "../../components/hero/Hero.tsx";
import BreakingNews from "../../components/breakingNews/BreakingNews.tsx";
import EditorsPicks from "../../components/editorsPicks/EditorsPicks.tsx";
import NewsCardContainer from "../../components/newsCardContainer/NewsCardContainer.tsx";

function Home() {
  return (
    <div className="bg-gray-200 min-h-screen w-full flex flex-col gap-3 lg:px-20">
      <Hero />
      <BreakingNews />
      <NewsCardContainer />
      <EditorsPicks />
    </div>
  );
}

export default Home;

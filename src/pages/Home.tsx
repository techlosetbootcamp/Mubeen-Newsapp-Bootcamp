import React from 'react';
import Hero from '../components/Hero.tsx';
import BreakingNews from '../components/BreakingNews.tsx';
import NewsCard from '../components/NewsCard.tsx';
import EditorsPicks from '../components/EditorsPicks.tsx';

function Home() {
  return (
    <div className="bg-gray-200 min-h-screen w-full flex flex-col gap-3 lg:px-20">
      {/* Components */}
      <Hero />
      <BreakingNews />
      <NewsCard />
      <EditorsPicks />
    </div>
  );
}

export default Home;



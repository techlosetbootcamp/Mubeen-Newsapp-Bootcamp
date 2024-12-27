import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import axios from "axios";
import Header from "./childComponents/Header.tsx";
import NewsCard1 from "./childComponents/NewsCard1.tsx";
import PopupModal from "./childComponents/PopupModal.tsx";
import ViewMoreButton from "./childComponents/ViewMoreButton.tsx"




interface IconState {
    heart: boolean;
    share: boolean;
    save: boolean;
}


const NewsCardContainer: React.FC = () => {
    const [articles, setArticles] = useState([]);
    const [visibleCards, setVisibleCards] = useState(6);
    const [iconStates, setIconStates] = useState<IconState[]>([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const topStoriesKey = useSelector((state: RootState) => state.news.apiKeys.topStories);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get(
                `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${topStoriesKey}`
            );
            const formattedArticles = response.data.results.map((article: any) => ({
                image: article.multimedia?.[0]?.url || "",
                title: article.title,
                description: article.abstract,
                time: new Date(article.published_date).toLocaleTimeString(),
                author: article.byline || "Unknown Author",
            }));
            setArticles(formattedArticles);
            setIconStates(formattedArticles.map(() => ({ heart: false, share: false, save: false })));
        };

        fetchNews();
    }, [topStoriesKey]);

    const handleViewMore = () => setVisibleCards((prev) => prev + 6);

    const toggleIconState = (index, icon) => {
        setIconStates((prev) => {
            const newStates = [...prev];
            newStates[index][icon] = !newStates[index][icon];
            return newStates;
        });
    };

    const handleStoryClick = (article) => {
        setSelectedArticle(article);
    };

    const closePopup = () => setSelectedArticle(null);

    return (
        <div>
            <Header />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2">
                {articles.slice(0, visibleCards).map((article, index) => (
                    <NewsCard1
                        key={index}
                        article={article}
                        iconState={iconStates[index]}
                        onToggleIcon={(icon) => toggleIconState(index, icon)}
                        onClick={() => handleStoryClick(article)}
                    />
                ))}
            </div>
            <ViewMoreButton onClick={handleViewMore} isVisible={visibleCards < articles.length} />
            {selectedArticle && <PopupModal article={selectedArticle} onClose={closePopup} />}
        </div>
    );
};

export default NewsCardContainer;

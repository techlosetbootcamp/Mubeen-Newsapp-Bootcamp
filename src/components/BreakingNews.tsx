import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store.ts";
import { fetchBreakingNews } from "../redux/breakingNewsSlice.ts";

const BreakingNews: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { breakingNews, loading, error } = useSelector(
    (state: RootState) => state.breakingNews
  );

  useEffect(() => {
    dispatch(fetchBreakingNews());
  }, []);

  return (
    <div className="bg-red-700 w-full md:h-auto h-[181px] py-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 px-4">
      <div className="bg-white text-red-700 font-semibold text-sm md:text-lg px-6 py-3 rounded-md shadow hover:bg-gray-100">
        Breaking News
      </div>
      <h2 className="text-white text-center md:text-left text-sm md:text-lg">
        {loading
          ? "Fetching breaking news..."
          : error
          ? "Unable to fetch breaking news. Please try again later."
          : breakingNews || "No breaking news available."}
      </h2>
    </div>
  );
};

export default BreakingNews;

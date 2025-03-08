import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../components/home/card";
import Pagination from "react-js-pagination";
import ShimmerCard from "../../components/common/cardShimmer";
import SentimentTrendChart from "../../components/home/sentimentTrend";
import SentimentDistributionChart from "../../components/home/sentimentDis";
import SentimentCompoundChart from "../../components/home/sentimentCompound";
import PositiveSentimentDominanceChart from "../../components/home/sentimentBar";

const Home = () => {
  const [sentimentData, setSentimentData] = useState([]);
  const [totalNews, setTotalNews] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    fetchSentiment();
  }, [page]);

  function UpdateSearchparams(newParams) {
    const updatedSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(newParams)) {
      updatedSearchParams.set(key, value);
    }

    setSearchParams(updatedSearchParams);
  }

  async function fetchSentiment() {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:5000/sentiment?page=${page}`
      );
      setSentimentData(response.data.paginated_results);
      setTotalNews(response.data.totalItems);
    } catch (error) {
      console.log("Error fetching sentiment", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handlePageChange = (newPage) => {
    UpdateSearchparams({ page: newPage });
  };

  return (
    <main className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
      <h1 className="text-center font-medium text-2xl sm:text-3xl mx-auto my-2 py-4 sm:py-6 border-b border-b-gray-500 max-w-[1280px] w-full">
        AI-Powered Crypto Market Analyzer
      </h1>
      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-6">
        <SentimentCompoundChart sentimentData={sentimentData} />
        <SentimentTrendChart sentimentData={sentimentData} />
        <PositiveSentimentDominanceChart sentimentData={sentimentData} />
        <SentimentDistributionChart sentimentData={sentimentData} />
      </div>
      <h3 className="font-medium text-xl sm:text-2xl mx-auto my-2 pb-3 sm:pb-4 border-b border-b-gray-500 max-w-[1280px] w-full">
        Today's Insights
      </h3>
      <section className="max-w-[1280px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 sm:p-4">
        {isLoading
          ? [...Array(8)].map((_, idx) => (
              <ShimmerCard key={`shimmer-${idx}`} />
            ))
          : sentimentData &&
            sentimentData.length > 0 &&
            sentimentData.map((card, cidx) => (
              <Card
                key={`card-${cidx}`}
                image={card.image}
                date={card.published_on}
                title={card.title}
                sentiment={card.sentiment}
                url={card.view_more}
                theme="blue"
              />
            ))}
      </section>
      <div className="my-6 sm:my-8 flex justify-center">
        <Pagination
          activePage={page}
          itemsCountPerPage={8}
          totalItemsCount={totalNews && totalNews}
          onChange={handlePageChange}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="First"
          lastPageText="Last"
          itemClass="flex justify-center items-center bg-[linear-gradient(315deg,#2b4162_0%,#12100e_74%)] list-none border border-white px-3 py-2 sm:px-6 sm:py-4 transition-all duration-300 cursor-pointer text-sm sm:text-base"
          linkClass="no-underline text-white transition-all"
          activeClass="active"
          activeLinkClass="text-white"
        />
      </div>
    </main>
  );
};

export default Home;

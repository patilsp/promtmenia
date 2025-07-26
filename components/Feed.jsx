"use client";

import { useState, useEffect, useRef } from "react";
import PromptCard from "./PromptCard";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
      {data.map((post, index) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: "easeOut" 
          }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <PromptCard
            post={post}
            handleTagClick={handleTagClick}
          />
        </motion.div>
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  
  // Filter states
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("Most Recent");



  const scrollRef = useRef(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/prompt");
    const data = await response.json();

    // Replace posts instead of appending to avoid duplicates
    setAllPosts(data);
    setIsLoading(false);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading) {
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const filterPrompts = (searchtext) => {
    if (!searchtext) return allPosts;
    
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.category) ||
        regex.test(item.title) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);

      }, 300)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const displayData = searchText ? searchedResults : allPosts;

  // Apply filters
  const filteredData = displayData.filter((post) => {
    // Platform filter
    if (selectedPlatform && selectedPlatform !== '' && post.platform !== selectedPlatform) return false;
    
    // Category filter
    if (selectedCategory && selectedCategory !== '' && post.category !== selectedCategory) return false;
    
    return true;
  });

  // Apply sort
  const sortedData = filteredData.sort((a, b) => {
    switch (sortOption) {
      case "Most Recent":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "Most Popular":
        return b.likes - a.likes;
      case "Highest Rated":
        return b.rating - a.rating;
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
      {/* Clean Search Interface */}
      <div className="mb-6 sm:mb-8">
        {/* Main Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type='text'
              placeholder='Find the perfect prompt...'
              value={searchText}
              onChange={handleSearchChange}
              className='w-full pl-12 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base shadow-sm'
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-5 justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 pt-1">
            AI Platform:
          </span>
          {["ChatGPT", "Midjourney", "DALL-E", "Claude", "Stable Diffusion"].map(
            (platform) => (
              <button
                key={platform}
                onClick={() => handlePlatformChange(platform)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  selectedPlatform === platform
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {platform}
              </button>
            )
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 pt-1">
            Category:
          </span>
          {["Writing", "Image", "Code", "Business", "Education"].map(
            (category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

    
    

      {/* Main Feed */}
      <div ref={scrollRef}>
          {sortedData.length > 0 ? (
            <PromptCardList
              data={sortedData}
              handleTagClick={handleTagClick}
            />
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-10 h-10 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No prompts found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {searchText ? 'Try adjusting your search terms' : 'No prompts available in this category'}
              </p>
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading more prompts...</span>
            </div>
          )}
      </div>
    </section>
  );
};

export default Feed;

import { useEffect, useState } from "react";
import { useFilter } from "./filterContext";

interface Product {
  category: string;
}

interface fetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "Apple",
    "Watch",
    "Fashion",
    "Trend",
    "Shoes",
    "Shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: fetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full sm:w-64 p-5 bg-gray-100 rounded-lg shadow-md space-y-4">
      {/* Title */}
      <h1 className="text-lg font-bold text-center sm:text-left">
        Online Store
      </h1>

      {/* Search Input */}
      <input
        type="text"
        className="border rounded-md w-full px-3 py-2 text-sm"
        placeholder="Search Product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Price Filters */}
      <div className="flex flex-col sm:flex-row sm:space-x-3">
        <input
          type="number"
          className="border rounded-md px-3 py-2 w-full text-sm"
          placeholder="Min Price"
          value={minPrice ?? ""}
          onChange={(e) =>
            setMinPrice(e.target.value ? parseFloat(e.target.value) : undefined)
          }
        />
        <input
          type="number"
          className="border rounded-md px-3 py-2 w-full text-sm"
          placeholder="Max Price"
          value={maxPrice ?? ""}
          onChange={(e) =>
            setMaxPrice(e.target.value ? parseFloat(e.target.value) : undefined)
          }
        />
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-md font-semibold mb-2">Categories</h2>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => setSelectedCategory(category)}
                className="w-4 h-4"
                checked={selectedCategory === category}
              />
              <span className="text-sm">{category.toUpperCase()}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div>
        <h2 className="text-md font-semibold mb-2">Keywords</h2>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
          {keywords.map((keyword, index) => (
            <button
              key={index}
              className="px-1 py-3 border rounded-md bg-white text-sm hover:bg-gray-200"
              onClick={() => setKeyword(keyword)}
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
        {keyword && (
          <p className="mt-2 text-sm text-gray-600">Selected: {keyword}</p>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setSelectedCategory("");
          setSearchQuery("");
          setMinPrice(undefined);
          setMaxPrice(undefined);
          setKeyword("");
        }}
        className="w-full py-2 bg-black text-white rounded-md text-sm"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;

import React, { useState, useEffect } from "react";

const CategorySearch = ({ onSelect, initialValue = "" }) => {
  const [category, setcategory] = useState([]);
  const [showCategoyList, setshowCategoyList] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const fetchcategory = async (name) => {
    const response = await fetch(
      `http://localhost:3001/api/category?search=${name}`,

      {
        headers: {
          "Content-Type": "application/json",

          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await response.json();

    setcategory(data?.data?.categories);
  };

  useEffect(() => {
    if (searchTerm && isFocused) {
      fetchcategory(searchTerm);
      setshowCategoyList(true);
    } else {
      setshowCategoyList(false);
    }
    console.log(category);
  }, [searchTerm, isFocused]);

  // Delay hiding the list to allow time for click event
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 1000);
  };

  return (
    <div>
      <input
        type="text"
        className="bg-white border  rounded-xl py-2 px-4 block w-full   outline-none"
        placeholder="Categoy"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
      />
      {showCategoyList && (
        <div className="shadow-lg rounded-lg absolute z-1000 bg-white">
          {category?.map((category) => (
            <div
              key={category.id}
              className="outline-none py-3 px-3 border-b bordexr-gray-200 cursor-pointer"
              onClick={() => {
                onSelect(category);
                setSearchTerm(category.name);
                setshowCategoyList(false);
              }}
            >
              <p className="text-xl">{category.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySearch;

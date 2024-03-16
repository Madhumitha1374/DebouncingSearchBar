import { useEffect, useState } from "react";

const Debouncing = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async () => {
    const YOUTUBE_SEARCH_API =
      "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" +
      searchInput;

    const data = await fetch(YOUTUBE_SEARCH_API);
    const json = await data.json();
    console.log(json[1]);
    setSearchResults(json[1]);
  };

  const onChangeSearchInput = (e) => {
    // console.log(e.target.value);
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      fetchData();
    }, 200);
    return () => clearTimeout(id);
  }, [searchInput]);

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        // value={searchInput}
        onChange={onChangeSearchInput}
      />
      <ul className="list">
        {searchResults.map((each) => {
          return <li>{each}</li>;
        })}
      </ul>
    </div>
  );
};

export default Debouncing;

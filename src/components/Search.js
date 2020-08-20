import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programming");
  // const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  console.log(results);

  // checks whether user has stopped writing and after 1sec it gives results
  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setDebouncedTerm(term);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timerId);
  //   };
  // }, [term]);

  // useEffect(() => {
  //   const search = async () => {
  //     const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
  //       params: {
  //         action: "query",
  //         list: "search",
  //         origin: "*",
  //         format: "json",
  //         srsearch: debouncedTerm,
  //       },
  //     });
  //     setResults(data.query.search);
  //   };
  //   search();
  // }, [debouncedTerm]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term, results.length]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            // href={"https://en.wikipedia.org?curid=" + result.pageid}
          >
            GO
          </a>
        </div>

        <div className="content">
          <div className="header">{result.title}</div>
        </div>
        <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term here</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          ></input>
        </div>
        <div className="ui celled list">{renderedResults}</div>
      </div>
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from "react";
import axios from "axios";

const DataFetching = () => {
  const [results, setResults] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    axios
      .get("https://randomuser.me/api")
      .then((res) => {
        console.log(res);
        setResults(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="ui list">
        {results.map((data) => (
          <div className="ui grid container" key={data.id.value}>
            <div className="four wide column">
              <div className="item">
                <img
                  className="ui avatar image"
                  alt={data.name.first}
                  src={data.picture.large}
                />
                {data.name.first}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataFetching;

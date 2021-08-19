import React from "react";
import { useState, useEffect, useRef } from "react";
import { colors } from "./color";
import {
  faFacebookSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {
  const [newQuote, setNewQuote] = useState(true);
  const [quote, setQuote] = useState({ text: "", author: "" });
  const setColor = useRef(null);
  const randomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((results) => results.json())
      .then((data) => {
        let max = data.length;
        setQuote({
          text: data[randomInt(max)].text,
          author: data[randomInt(max)].author,
        });
      });
  };

  useEffect(() => {
    setColor.current.style.backgroundColor =
      colors[randomInt(colors.length)].color;
    console.log(setColor.current.style.backgroundColor);
    getQuote();
  }, [newQuote]);

  return (
    <div className="app" ref={setColor}>
      <div
        id="quote-box"
        style={{
          color: colors[randomInt(colors.length)].color,
          margin: "auto",
          padding: "10px 40px 20px 40px",
          display: "block",
          borderRadius: "5px",
        }}
      >
        <p
          id="text"
          style={{
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          "{quote.text}"
        </p>
        <p
          id="author"
          style={{
            fontSize: "1.5rem",
            marginTop: "0px",
            textAlign: "end",
          }}
        >
          -{quote.author === null ? "Unknown" : quote.author}
        </p>
        <div id="buttons">
          <div>
            <a
              href="twitter.com/intent/tweet"
              style={{ backgroundColor: "none", color: "none" }}
            >
              <FontAwesomeIcon
                icon={faTwitterSquare}
                style={{
                  fontSize: "55px",
                  marginRight: "10px",
                  color: quote.color,
                }}
              />
            </a>
            <FontAwesomeIcon
              icon={faFacebookSquare}
              style={{ fontSize: "55px" }}
            />
          </div>
          <button
            id="newQuote"
            onClick={() => setNewQuote(!newQuote)}
            style={{
              color: "white",
              backgroundColor: quote.color,
              padding: "15px 30px",
              fontSize: "20px",
              textDecoration: "none",
              border: "none",
              borderRadius: "5px",
              alignSelf: "flex-end",
            }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

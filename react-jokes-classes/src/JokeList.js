import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

const JokeList = ({ numJokesToGet = 5 }) => {
  const [jokes, setJokes] = useState(() => {
    const savedJokes = localStorage.getItem("jokes");
    return savedJokes ? JSON.parse(savedJokes) : [];
  });
  const [lockedJokes, setLockedJokes] = useState(() => {
    const savedLockedJokes = localStorage.getItem("lockedJokes");
    return savedLockedJokes ? JSON.parse(savedLockedJokes) : [];
  });
  const [isLoading, setIsLoading] = useState(!jokes.length);

  useEffect(() => {
    if (jokes.length === 0) {
      getJokes();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jokes", JSON.stringify(jokes));
    localStorage.setItem("lockedJokes", JSON.stringify(lockedJokes));
  }, [jokes, lockedJokes]);

  const getJokes = async () => {
    try {
      setJokes(lockedJokes);
      let newJokes = [];
      let seenJokes = new Set(lockedJokes.map((j) => j.id));

      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let joke = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          newJokes.push({ ...joke, likes: 0, dislikes: 0, isLocked: false });
        }
      }

      setJokes([...lockedJokes, ...newJokes]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const voteLike = (id) => {
    setJokes((jokes) =>
      jokes.map((j) => (j.id === id ? { ...j, likes: j.likes + 1 } : j))
    );
  };

  const voteDislike = (id) => {
    setJokes((jokes) =>
      jokes.map((j) => (j.id === id ? { ...j, dislikes: j.dislikes + 1 } : j))
    );
  };

  const toggleLock = (id) => {
    setJokes((jokes) =>
      jokes.map((j) =>
        j.id === id ? { ...j, isLocked: !j.isLocked } : j
      )
    );
    setLockedJokes((lockedJokes) => {
      const joke = jokes.find((j) => j.id === id);
      if (lockedJokes.some((j) => j.id === id)) {
        return lockedJokes.filter((j) => j.id !== id);
      } else {
        return [...lockedJokes, { ...joke, isLocked: true }];
      }
    });
  };

  const resetVotes = () => {
    const resetJokes = jokes.map((j) => ({ ...j, likes: 0, dislikes: 0 }));
    setJokes(resetJokes);
    localStorage.setItem("jokes", JSON.stringify(resetJokes));
  };

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  }

  let sortedJokes = [...jokes].sort((a, b) => b.likes - a.likes);
  return (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={getJokes}>
        Get New Jokes
      </button>
      <button className="JokeList-resetvotes" onClick={resetVotes}>
        Reset Votes
      </button>
      {sortedJokes.map((j) => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          likes={j.likes}
          dislikes={j.dislikes}
          isLocked={j.isLocked}
          voteLike={voteLike}
          voteDislike={voteDislike}
          toggleLock={toggleLock}
        />
      ))}
    </div>
  );
};

export default JokeList;

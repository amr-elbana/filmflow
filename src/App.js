import React, { useEffect, useState, createContext } from "react";
import ReactSwitch from "react-switch";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

export const ThemeContext = createContext(null);

const API_URL = "http://www.omdbapi.com?apikey=fd28c03e";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      
      setMovies(data.Search);
    };
  const[theme, setTheme] = useState("light");
  const toggleTheme = () =>{
    setTheme((curr)=> (curr === "light" ? "dark" :"light"));
  }

  useEffect(() => {
    searchMovies("spiderman");
  }, []);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div className="app" id={theme}>
      <h1>FilmFlow</h1>
      <div className="theme-switch">
        <span>Dark Mode</span>    
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"}/>
      </div>
      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        <img src={SearchIcon} 
        alt="search" 
        onClick={() => searchMovies(searchTerm)} />
      </div>
      {movies?.length > 0 ? (
          <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
        ))}
        </div>
      ) : (
          <div className="empty">
          <h2>No Movie found</h2>
        </div>
      )}
    </div>
    </ThemeContext.Provider>
    
  );
};

export default App;

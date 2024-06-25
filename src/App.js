import React, { useEffect, useState, createContext } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";
import CustomSwitch from './CustomSwitch'; // Adjust the path if necessary



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
    searchMovies("Batman");
  }, []);

  return (
    <div className="app" id={theme}>
      <h1>FilmFlow</h1>
      <div className="theme-switch"> 
        <span><h3>Mode</h3></span> 
        <CustomSwitch  onChange={toggleTheme} />
        
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
    
  );
};

export default App;

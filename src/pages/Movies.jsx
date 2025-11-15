import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "../components/MovieComponents";
import MovieInfoComponent from "../components/MovieInfoComponent";

const Container = styled.div
  `display: flex;
  flex-direction: column;
  `;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  `;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #3272a7ff;
  color: white;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
  `;
const SearchBox= styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
  align-item: center;
  `;

  const SearchIcon = styled.img `
  width:32px;
  height: 32px;
  `;
  const MovieImage = styled.img`
    width: 48px;
    height: 48px;
    margin: 15px;
  `;
  const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
  `;

  const MovieListContainer =styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
  `;

  const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;


function Movies() {
  const [searchQuery, updateSearchQuery] = useState();

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState([]);

  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString) => {
    const response = await Axios.get(`https://omdbapi.com/?s=${searchString}&page=1&apikey=fde10d57`

    );
    console.log(response)
    updateMovieList(response.data.Search)
  };
  

  const onTextChange = (event) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(()=> fetchData (event.target.value), 500);
    updateTimeoutId(timeout);
};
  return (
      <Container>
        <Header>
          <AppName>
            <MovieImage src="/moviecamera.jpeg"></MovieImage>
            React Movie App Library</AppName>
            <SearchBox>
              <SearchIcon src="/search-icon.svg">
              </SearchIcon>
              <SearchInput 
              placeholder="Search Movie" 
              value={searchQuery}
              onChange={onTextChange}/>
            </SearchBox>
          </Header>
          {selectedMovie && <MovieInfoComponent 
            selectedMovie ={selectedMovie}
            onMovieSelect={onMovieSelect}/>}
          <MovieListContainer>
            {movieList?.length
            ? (movieList.map((movie, index)=> (
            <MovieComponent 
              key={index} 
              movie={movie}
              onMovieSelect={onMovieSelect}
              />
            ))
          ): (
            <Placeholder src="/moviecamera.jpeg"/>
          )}
          </MovieListContainer>
      </Container>
  );
}

export default Movies;

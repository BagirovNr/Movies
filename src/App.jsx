import React, { useState } from 'react';
import { Footer } from './Form/Footer/Footer';
import { Main } from './Form/Main/Main';
import { Navbar } from './Form/Navbar/Navbar';
import Example from './Form/offCanvass/offCanvass';
import Example2 from './Form/modal/modal';
import UncontrolledExample from './Form/carusel/karusel';

function App(prevPage, currentPage, setCurrentPage) {
  const [movieId, setMovieId] = useState(0);
  const [show, setShow] = React.useState(false);

  const [search, setSearch] = useState('');
  const [addMovie, setAddMovie] = useState({
    img: "",
    title: "",
    year: "",
  });
  const [fetchMovies, setFetchMovies] = useState([]);

  // Определите функцию fetchData
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/movies?q=${search}`);
      const data = await response.json();
      if (data?.length) {
        setFetchMovies(data);
      }
    } catch (error) {
      console.error("Произошла ошибка при загрузке данных:", error);
    }
  };

  return (
    <>
      <Navbar Example={Example} setSearch={setSearch} Example2={Example2} addMovie={addMovie} setAddMovie={setAddMovie} fetchData={fetchData} movieId={movieId} setMovieId={setMovieId} show={show} setShow={setShow} />
      <UncontrolledExample />
      <Main search={search} addMovie={addMovie} fetchMovies={fetchMovies} setFetchMovies={setFetchMovies} fetchData={fetchData} movieId={movieId} setMovieId={setMovieId} show={show} setShow={setShow} />
      <Footer />

    </>
  );
}

export default App;

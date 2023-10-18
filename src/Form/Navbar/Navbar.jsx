import { useState } from "react";
import style from "../Navbar/Navbar.module.scss"
export function Navbar({ Example, setSearch, Example2, addMovie, setAddMovie, fetchData, setMovieId, movieId, show, setShow }) {

    const [inputValue, setInputValue] = useState("");

    const inputSearch = (e) => {
        const name = e.target.value;
        setSearch(name);
    };



    return (
        <>
            <div className={style.container}>
                <div className={style.leftContainer}>
                    <div className={style.logo}>
                        <span> <a href="#"><img src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png" alt="logo" />ENJOY</a> </span>
                    </div>
                </div>
                <div className={style.searchbar}>
                    <input id="searchText" type="search" name="search" required onChange={inputSearch} />
                </div>
                <Example2 setAddMovie={setAddMovie} addMovie={addMovie} fetchData={fetchData} setMovieId={setMovieId} movieId={movieId} show={show} setShow={setShow} />
                < Example />


            </div >


        </>
    );
}

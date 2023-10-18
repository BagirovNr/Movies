import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import main from '../Main/main.module.scss';

export function Main({ search, fetchMovies, setFetchMovies, setMovieId, movieId, show, setShow }) {
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [handleMovie, setHandleMovie] = useState({
        img: '',
        title: '',
        description: '',
        year: '',
        categori: '',
    });

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const handleShow = () => {
        setShow(true);
    };

    const resetForm = () => {
        setHandleMovie({
            img: '',
            title: '',
            description: '',
            year: '',
            categori: '',
        });
    };

    useEffect(() => {
        setError(true);
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/movies?q=${search}&_page=${currentPage}&_limit=${itemPerPage}`);
                const data = await response.json();
                if (data?.length) {
                    setFetchMovies(data);
                }
                const totalMoviesResponse = await fetch(`http://localhost:3000/movies?q=${search}`);
                const totalMoviesData = await totalMoviesResponse.json();
                const totalPageCount = Math.ceil(totalMoviesData.length / itemPerPage);
                setTotalPages(totalPageCount);
            } catch (error) {
                console.log(error);
            } finally {
                setError(false);
            }
        }
        fetchData();
    }, [search, currentPage, setFetchMovies]);

    const searchMovies = async () => {
        setError(true);
        try {
            const response = await fetch(`http://localhost:3000/movies?q=${search}&_page=${currentPage}&_limit=${itemPerPage}`);
            const data = await response.json();
            if (data?.length) {
                setFetchMovies(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setError(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        searchMovies();
    }, [search]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDelete = async (id) => {
        const deleteConfirm = window.confirm('Вы уверены?');
        if (deleteConfirm) {
            try {
                const deleteResponse = await fetch(`http://localhost:3000/movies/${id}`, {
                    method: 'DELETE',
                });

                if (deleteResponse.ok) {
                    const updatedMovies = fetchMovies.filter(movie => movie.id !== id);
                    setFetchMovies(updatedMovies);
                } else {
                    console.log('Не удалось удалить');
                }
            } catch (error) {
                console.error('Произошла ошибка при удалении фильма:', error);
            }
        }
    };

    const handleEdit = (id) => {
        setMovieId(id);
        fetchMovieDetails(id);
        handleShow();
    };

    const fetchMovieDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/movies/${id}`);
            const data = await response.json();
            setHandleMovie(data);
        } catch (error) {
            console.log(error);
        }
    };

    const editMovie = async () => {
        try {
            const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(handleMovie),
            });

            if (response.ok) {
                setShow(false);
                resetForm();
                const updatedMovies = fetchMovies.map(movie => (movie.id === movieId ? handleMovie : movie));
                setFetchMovies(updatedMovies);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHandleMovie({
            ...handleMovie,
            [name]: value,
        });
    };

    return (
        <>
            <section>
                <div className={main.sectionMovies}>
                    {fetchMovies?.map((prev, index) => (
                        <ul className={main.ulContainer} key={index}>
                            <li className={main.liElement}>
                                <a href="">
                                    <img className="image" src={prev.img} alt="error" />
                                    <p className="title">{prev.title} <br /></p>
                                    <p className="year">{prev.year}</p>
                                    <button onClick={(e) => { e.preventDefault(); handleDelete(prev.id); }}>Удалить фильм</button>
                                    <button onClick={(e) => { e.preventDefault(); handleEdit(prev.id); }}>Редактировать</button>
                                </a>
                            </li>
                        </ul>
                    ))}
                </div>
            </section>
            <div className={main.pagination}>
                <button className={main.paginationBtn1} onClick={prevPage}>Пред.</button>
                <p className={main.paginationBtn} > {currentPage} из {totalPages}</p>
                <button className={main.paginationBtn2} onClick={nextPage}>След.</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать фильм</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>URL изображения:</label>
                            <input type="text" name="img" value={handleMovie.img || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Название:</label>
                            <input type="text" name="title" value={handleMovie.title || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Описание:</label>
                            <input type="text" name="description" value={handleMovie.description || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Год выпуска:</label>
                            <input type="text" name="year" value={handleMovie.year || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Категория:</label>
                            <input type="text" name="categori" value={handleMovie.categori || ''} onChange={handleInputChange} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={editMovie}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

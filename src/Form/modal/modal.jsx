import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import modal from '../modal/modal.module.scss';

function Example2({ addMovie, setAddMovie, fetchData }) {
    const [formData, setFormData] = useState({
        img: '',
        title: '',
        year: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setAddMovie(null);
        setShowModal(false);
    };

    const handleShow = () => {
        setAddMovie({ img: '', title: '', year: '' });
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchData();
                handleClose();
            }
        } catch (error) {
            console.error('Произошла ошибка при отправке данных:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <>
            <Button className={modal.modalBtn} onClick={handleShow}>
                Add Movie
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>URL изображения:</label>
                            <input type="text" name="img" value={formData.img} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Название:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Год выпуска:</label>
                            <input type="text" name="year" value={formData.year} onChange={handleInputChange} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Movie
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example2;

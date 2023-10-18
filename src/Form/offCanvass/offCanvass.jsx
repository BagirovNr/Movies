import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "bootstrap/dist/css/bootstrap.min.css"
import offCanvass from "./offCanvass.module.scss"

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className={offCanvass.btn} variant="primary:--bs-btn-active-bg:#333;" onClick={handleShow}>
                Profile
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className={offCanvass.container}>

                            <div className={offCanvass.profileImage}>
                                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="profile" />
                            </div>
                            <div>
                                <h3>Nadir Bagirov</h3>
                            </div>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={offCanvass.ds}>
                    <p>hey</p>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Example;

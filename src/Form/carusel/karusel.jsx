import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
    return (
        <Carousel>
            <Carousel.Item>
                <img src="https://druidogham.files.wordpress.com/2019/03/16.png" width="100%" height="200px" alt="error" />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img src="https://druidogham.files.wordpress.com/2019/03/16.png" width="100%" height="200px" alt="error" />
                <Carousel.Caption>

                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <img src="https://druidogham.files.wordpress.com/2019/03/16.png" width="100%" height="200px" alt="error" />

            <Carousel.Item>
                <img src="https://druidogham.files.wordpress.com/2019/03/16.png" width="100%" height="200px" alt="error" />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default UncontrolledExample;
import React from "react";
import { Row, ButtonGroup, Button, Col } from 'react-bootstrap';


const SpriteButtons = (props) => {
    return (
        <>
            <Row >
                <Col xs={12} md={4}>
                    <div>FRONT: <br />
                        <ButtonGroup aria-label="Front">
                            {props.sprites.front_default &&
                                <Button variant="success"
                                    onClick={props.changeImage.bind(this,props.sprites.front_default)}
                                >front_default
                                    </Button>
                            }
                            {props.sprites.front_shiny &&
                                <Button variant="success"
                                    onClick={props.changeImage.bind(this,props.sprites.front_shiny)}
                                >front_shiny
                                </Button>}
                            {props.sprites.front_shiny_female &&
                                <Button variant="success"
                                    onClick={props.changeImage.bind(this,props.sprites.front_shiny_female)}
                                >front_shiny_female
                                </Button>}
                        </ButtonGroup>
                    </div>

                </Col>
            </Row>
            {
                (props.sprites.back_female || props.sprites.back_shiny_female) && <Row>
                    <Col xs={12} md={4}>
                        <div>BACK_FEMALE: <br />
                            <ButtonGroup aria-label="back_female">
                                {props.sprites.back_female && <Button variant="success"
                                    onClick={props.changeImage.bind(this,props.sprites.back_female)}
                                >back_female</Button>}
                                {props.sprites.back_shiny_female && <Button variant="success"
                                    onClick={props.changeImage.bind(this,props.sprites.back_shiny_female)}
                                >back_shiny_female</Button>}
                            </ButtonGroup>
                        </div>
                    </Col>
                </Row>
            }
            <Row >

                <Col xs={12} md={4}>
                    <div>BACK: <br />
                        <ButtonGroup aria-label="Back">
                            {props.sprites.back_default &&
                                <Button variant="success"
                                    onClick={props.changeImage.bind(this,props.sprites.back_default)}
                                >back_default</Button>}
                            {props.sprites.back_shiny &&
                                <Button variant="success"
                                    onClick={props.changeImage.bind(this,props.sprites.back_shiny)}
                                >back_shiny</Button>}
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
        </>
    );
}


export default SpriteButtons;
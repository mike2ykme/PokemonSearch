import React, { Component } from 'react';
import unknown from './question-mark.jpg';
import { Row, Col } from 'react-bootstrap';
import SpriteButtons from './SpriteButtons';
import PokemonContext from '../context/PokemonContext';
import PokemonHeader from './PokemonHeader';

class PokemonDisplay extends Component {

    static contextType = PokemonContext;

    componentDidMount() {
        console.log("PKCONTEXT", this.context);
        const pokemonName = this.context.name;
        this.context.updateDisplayedPokemon(pokemonName)


    }
    // componentWillUnmount() {
        // console.log("[pokemondisplay.js", "componentWillUnmount()")
    // }


    render() {

        return (
            <>
                <Row>
                    <Col>
                        <br />
                        {this.context.error ? <div>{this.context.errorText}</div> :
                            this.context.isLoaded ? <PokemonHeader
                                id={this.context.id}
                                image={this.context.selectedImage ? this.context.selectedImage : unknown}
                                name={this.context.name}
                                weight={this.context.weight}
                                flavorText={this.context.flavorText}
                            /> : "Loading..."}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {(this.context.isLoaded && !this.context.error) &&
                            <SpriteButtons
                                sprites={this.context.sprites}
                                changeImage={this.context.updateSelectedImageHandler}
                            />
                        }
                    </Col>
                </Row>
                <Row>
                    <br />
                </Row>
            </>
        )
    }


}

export default PokemonDisplay;
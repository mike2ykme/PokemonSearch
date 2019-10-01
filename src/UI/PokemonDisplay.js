import React, { Component } from 'react';
import unknown from './question-mark.jpg';
import { Row, Col } from 'react-bootstrap';
import SpriteButtons from './SpriteButtons';
import Axios from 'axios';
import PokemonContext from '../context/PokemonContext';
import PokemonHeader from './PokemonHeader';

class PokemonDisplay extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         name: this.props.pokemonSearch ? this.props.pokemonSearch : "mew",
    //         id: 15,
    //         weight: '40',
    //         flavorText: 'Here is some flavor text for this entry',
    //         isLoaded: false,
    //         sprites: {},
    //         selectedImage: null,
    //         error: false,
    //         errorText: "",
    //         // pokemonName: this.props.pokemonSearch ? this.props.pokemonSearch : "mew",
    //     }
    // }

    static contextType = PokemonContext;


    // processPokemonResult = (data) => {

    //     const { sprites, name, stats, weight, id, base_experience } = data;

    //     this.setState({
    //         sprites: sprites,
    //         isLoaded: true,
    //         selectedImage: sprites.front_default,
    //         name: name,
    //         id: id,
    //         weight: weight,
    //         baseExperience: base_experience,
    //         stats: stats,
    //         error: false,
    //         errorText: "",
    //     });
    // }


    // updateDisplayedPokemon = (pokemonName) => {

    //     const pokemon = localStorage.getItem(pokemonName);

    //     if (pokemon === null) {
    //         console.log("NOT IN CACHE");

    //         const localhostPokemon = `http://localhost:8080/pokemon/${pokemonName}`
    //         this._asyncRequest = Axios.get(localhostPokemon)
    //             .then(response => {

    //                 localStorage.setItem(pokemonName, JSON.stringify(response.data));

    //                 // this.processPokemonResult(response.data);
    //                 this.context.processPokemonResult(response.data);

    //             })
    //             .catch(err => {
    //                 console.log("[pokemondisplay.js", err);
    //                 this.setState({
    //                     error: true,
    //                     errorText: `Unable to find a Pokemon named/numbered ${pokemonName}`,
    //                     isLoaded: false,
    //                     name: pokemonName,
    //                 });
    //             });
    //     } else {
    //         console.log("POKEMON is CACHED");
    //         // this.processPokemonResult(JSON.parse(pokemon));
    //         this.context.processPokemonResult(JSON.parse(pokemon));
    //     }
    // }


    componentDidMount() {
        // console.log("[pokemondisplay.js", "componentDidMount()")
        console.log("PKCONTEXT", this.context);
        // const pokemonName = this.state.name;
        const pokemonName = this.context.name;
        this.context.updateDisplayedPokemon(pokemonName)


    }
    componentWillUnmount() {
        // console.log("[pokemondisplay.js", "componentWillUnmount()")
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.pokemonSearch &&
            (this.props.pokemonSearch !== prevProps.pokemonSearch) &&
            (this.props.pokemonSearch !== prevState.name) &&
            (
                isNaN(this.props.pokemonSearch) ||
                (!isNaN(this.props.pokemonSearch) &&
                    (parseInt(this.props.pokemonSearch) !== prevState.id))
            )
        ) {
            this.updateDisplayedPokemon(this.props.pokemonSearch);
        } else {
        }
    }


    // updateSelectedImageHandler = (image) => {
    //     this.setState({
    //         selectedImage: image
    //     });
    // }


    render() {

        const header = null;


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
                        {this.context.isLoaded &&
                            <SpriteButtons
                                sprites={this.context.sprites}
                                // changeImage={this.context.updateDisplayedPokemon}
                                // changeImage={this.context.searchButtonHandler}
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






    // render() {
    //     return (
    //         <>
    //             <Row>
    //                 <Col>
    //                     <br />
    //                     {this.state.error ? <div>{this.state.errorText}</div> :
    //                         this.state.isLoaded ? <PokemonHeader
    //                             id={this.state.id}
    //                             image={this.state.selectedImage ? this.state.selectedImage : unknown}
    //                             name={this.state.name}
    //                             weight={this.state.weight}
    //                             flavorText={this.state.flavorText}
    //                         /> : "Loading..."}
    //                 </Col>
    //             </Row>
    //             <Row>
    //                 <Col>
    //                     {this.state.isLoaded &&
    //                         <SpriteButtons
    //                             sprites={this.state.sprites}
    //                             changeImage={this.updateSelectedImageHandler}
    //                         />
    //                     }
    //                 </Col>
    //             </Row>
    //             <Row>
    //                 <br />
    //             </Row>
    //         </>
    //     )
    // }
}

export default PokemonDisplay;
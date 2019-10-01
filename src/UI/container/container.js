import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../footer/Footer';
import Header from '../navbar/Header';
import PokemonContext from '../../context/PokemonContext';
import ColumnContainer from '../columns/ColumnContainer';
import Axios from 'axios';

class Box extends React.Component {

    // state = {
    //     footerText: "Place Footer Text Here",
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    //     pokemonName: "mew",

    // }
    state = {
        name: this.props.pokemonSearch ? this.props.pokemonSearch : "mew",
        footerText: "Place Footer Text Here",
        width: window.innerWidth,
        height: window.innerHeight,
        pokemonName: "mew",
        id: 151,
        weight: '40',
        flavorText: 'Here is some flavor text for this entry',
        isLoaded: false,
        sprites: {},
        selectedImage: null,
        error: false,
        errorText: "",
        updateDisplayedPokemon: this.updateDisplayedPokemon,
        searchButtonHandler: this.searchButtonHandler,
        processPokemonResult: this.processPokemonResult
    }

    processPokemonResult = (data) => {

        const { sprites, name, stats, weight, id, base_experience } = data;

        this.setState({
            sprites: sprites,
            isLoaded: true,
            selectedImage: sprites.front_default,
            name: name,
            id: id,
            weight: weight,
            baseExperience: base_experience,
            stats: stats,
            error: false,
            errorText: "",
        });
    }

    updateDisplayedPokemon = (pokemonName) => {

        const pokemon = localStorage.getItem(pokemonName);

        if (pokemon === null) {
            console.log("NOT IN CACHE");

            const localhostPokemon = `http://localhost:8080/pokemon/${pokemonName}`
            this._asyncRequest = Axios.get(localhostPokemon)
                .then(response => {

                    localStorage.setItem(pokemonName, JSON.stringify(response.data));

                    // this.processPokemonResult(response.data);
                    // this.context.processPokemonResult(response.data);
                    this.processPokemonResult(response.data);

                })
                .catch(err => {
                    console.log("[pokemondisplay.js", err);
                    this.setState({
                        error: true,
                        errorText: `Unable to find a Pokemon named/numbered ${pokemonName}`,
                        isLoaded: false,
                        name: pokemonName,
                    });
                });
        } else {
            console.log("POKEMON is CACHED");
            // this.processPokemonResult(JSON.parse(pokemon));
            // this.context.processPokemonResult(JSON.parse(pokemon));
            this.processPokemonResult(JSON.parse(pokemon));
        }
    }

    updateDimensions = (e) => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    componentDidMount() {
        console.log("checking context", this.context);
        window.addEventListener("resize", this.updateDimensions);
    }

    searchButtonHandler = (searchText) => {
        if (searchText !== "") {
            console.log("[container.js] searchButtonHandler: ", searchText);
            // this.setState({
            //     pokemonSearch: searchText,
            // });
            // this.setState({
            //     name: searchText,
            // });
            this.updateDisplayedPokemon(searchText);

        } else {
            console.log("EMPTY STRING");
        }
    }

    processPokemonResult = (data) => {

        const { sprites, name, stats, weight, id, base_experience } = data;

        this.setState({
            sprites: sprites,
            isLoaded: true,
            selectedImage: sprites.front_default,
            name: name,
            id: id,
            weight: weight,
            baseExperience: base_experience,
            stats: stats,
            error: false,
            errorText: "",
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("CMD", this.context);
        console.log("COMPONENT DID UPDATE IN CONTAINER", this.context.height);
    }

    static contextType = PokemonContext;

    updateSelectedImageHandler = (image) => {
        this.setState({
            selectedImage: image
        });
    }

    updateDisplayedPokemon = (pokemonName) => {

        const pokemon = localStorage.getItem(pokemonName);

        if (pokemon === null) {
            console.log("NOT IN CACHE");

            const localhostPokemon = `http://localhost:8080/pokemon/${pokemonName}`
            this._asyncRequest = Axios.get(localhostPokemon)
                .then(response => {

                    localStorage.setItem(pokemonName, JSON.stringify(response.data));

                    this.processPokemonResult(response.data);

                })
                .catch(err => {
                    console.log("[pokemondisplay.js", err);
                    this.setState({
                        error: true,
                        errorText: `Unable to find a Pokemon named/numbered ${pokemonName}`,
                        isLoaded: false,
                        name: pokemonName,
                    });
                });
        } else {
            console.log("POKEMON is CACHED");
            this.processPokemonResult(JSON.parse(pokemon));
        }
    }

    render() {

        return (
            <PokemonContext.Provider value={{ width: this.state.width, height: this.state.height }}>
                <Header click={this.searchButtonHandler} />
                <Container fluid="true">
                    <PokemonContext.Provider value={{
                        id: this.state.id,
                        weight: this.state.weight,
                        name: this.state.name,
                        flavorText: this.state.flavorText,
                        selectedImage: this.state.selectedImage,
                        isLoaded: this.state.isLoaded,
                        sprites: this.state.sprites,
                        error: false,
                        errorText: this.state.errorText,
                        height: this.state.height,
                        width: this.width,
                        searchButtonHandler: this.searchButtonHandler,
                        processPokemonResult: this.processPokemonResult,
                        updateDisplayedPokemon: this.updateDisplayedPokemon,
                        updateSelectedImageHandler: this.updateSelectedImageHandler,
                    }}>
                        <ColumnContainer />
                        <Footer text={this.state.footerText} />
                    </PokemonContext.Provider>
                </Container>
            </PokemonContext.Provider>
        );
    }
}

export default Box;
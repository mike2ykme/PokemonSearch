import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../footer/Footer';
import Header from '../navbar/Header';
import PokemonContext from '../../context/PokemonContext';
import ColumnContainer from '../columns/ColumnContainer';
import Axios from 'axios';

class Box extends React.Component {

    state = {
        name: this.props.pokemonSearch ? this.props.pokemonSearch : "mew",
        footerText: "Data retrieved from <a href='https://pokeapi.co'>https://pokeapi.co</a>",
        width: window.innerWidth,
        height: window.innerHeight,
        pokemonName: "mew",
        id: 151,
        weight: '40',
        flavorText: '',
        isLoaded: false,
        sprites: {},
        selectedImage: null,
        error: false,
        errorText: "",
        updateDisplayedPokemon: this.updateDisplayedPokemon,
        searchButtonHandler: this.searchButtonHandler,
        processPokemonResult: this.processPokemonResult,
        storedPokemon: [{}],
        baseHappiness: null,
        captureRate: null,
        searchHistory: [],
        useLocalApi: true,
    }

    apiSourceHandler = () => {
        this.setState((state, props) => {
            return { useLocalApi: !state.useLocalApi };
        });
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


    // This seems to be adding just a number instead of an object to the array
    addPokemonToState = (pokemon) => {
        this.setState((state, props) => {
            const newPokemonNames = state.storedPokemon.slice()
            newPokemonNames.push({
                name: pokemon.name,
                id: pokemon.id,
            });
            return { storedPokemon: newPokemonNames };
        });
    }

    updateDisplayedPokemon = (pokemonName) => {

        const pokemonSearch = pokemonName;
        if (!isNaN(pokemonSearch)) {
            // if it's a number
            const idx = this.state.storedPokemon.findIndex((pkmn) => {
                return pkmn.id === Number(pokemonSearch);
            });

            if (idx >= 0) {
                pokemonName = this.state.storedPokemon[idx].name;
            }
        }
        this.updateSearchHistory(pokemonName);
        const pokemon = localStorage.getItem(pokemonName);

        this.updatePokemonSpecies(pokemonName);

        if (pokemon === null) {
            console.log("NOT IN CACHE");

            // const localhostPokemon = `http://localhost:8080/pokemon/${pokemonName}`
            // const pokeApi = `https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`;
            const apiHost = (this.state.useLocalApi) ?
                `http://localhost:8080/pokemon/${pokemonName}` :
                `https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`;
            Axios.get(apiHost)
                .then(response => {

                    this.addPokemonToState(response.data);
                    this.processPokemonResult(response.data);

                    // Now we need to update this to include both the pokemon
                    // Removed local storage because we might run into quota issues
                    // localStorage.setItem(pokemonName, JSON.stringify(response.data));

                })
                .catch(err => {
                    console.log("[pokemondisplay.js", err);
                    this.setState({
                        error: true,
                        errorText: `Unable to find a Pokemon named/numbered ${pokemonName}.`,
                        isLoaded: false,
                        name: pokemonName,
                    });
                });
        } else {
            console.log("POKEMON is CACHED");
            this.processPokemonResult(JSON.parse(pokemon));
        }
    }

    updatePokemonSpecies = (pokemonSearch) => {

        // const localhostPokemon = `http://localhost:8080/pokemon-species/${pokemonSearch}`

        // const pokeApi = `https://pokeapi.co/api/v2/pokemon-species/${pokemonSearch}`;
        const apiHost = (this.state.useLocalApi) ?
        `http://localhost:8080/pokemon-species/${pokemonSearch}` :
            `https://pokeapi.co/api/v2/pokemon-species/${pokemonSearch}`;
        Axios.get(apiHost)
            .then(response => {
                console.log("species", response.data);
                // 3c41cc3d4

                //Handle if it's a baby/evolution of something

                // Update the flavor Text
                let zerothElement = response.data.flavor_text_entries.filter(flavorText => {
                    return flavorText.language.name.toLowerCase() === "en";
                })[0];


                console.log("capture_Rate", response.data.capture_rate);

                this.setState({
                    flavorText: zerothElement.flavor_text,
                    baseHappiness: response.data.base_happiness,
                    captureRate: response.data.capture_rate
                });
            });
    }

    componentDidMount() {
        const newPokemonNames = Object.keys(localStorage).map((key, index) => {
            const pokemon = JSON.parse(localStorage.getItem(key));
            return ({
                name: pokemon.name,
                id: pokemon.id,
            });
        });
        this.setState((state, props) => {
            return { storedPokemon: newPokemonNames };
        });

        // window.addEventListener("resize", this.updateDimensions);
    }

    searchButtonHandler = (searchText) => {
        if (searchText !== "") {
            console.log("[container.js] searchButtonHandler: ", searchText);
            this.updateDisplayedPokemon(searchText.toLowerCase());


        } else {
            console.log("EMPTY STRING");
        }
    }

    updateSearchHistory = (searchText) => {
        const newSearch = this.state.searchHistory.slice(0, 10);

        if (newSearch.length > 9) {
            newSearch.shift();
        }
        if (!newSearch.includes(searchText)) {
            newSearch.push(searchText);

            this.setState((state, props) => {
                console.log("newSearch", newSearch);
                return { searchHistory: newSearch }

            });

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

    static contextType = PokemonContext;

    updateSelectedImageHandler = (image) => {
        this.setState({
            selectedImage: image
        });
    }


    render() {

        return (
            <PokemonContext.Provider value={{ width: this.state.width, height: this.state.height }}>
                <Header
                    click={this.searchButtonHandler}
                    apiSwitchHandler={this.apiSourceHandler}
                    isApiLocal={this.state.useLocalApi}
                />
                <Container fluid="true">
                    <PokemonContext.Provider value={{
                        id: this.state.id,
                        weight: this.state.weight,
                        name: this.state.name,
                        stats: this.state.stats,
                        flavorText: this.state.flavorText,
                        selectedImage: this.state.selectedImage,
                        isLoaded: this.state.isLoaded,
                        sprites: this.state.sprites,
                        error: this.state.error,
                        errorText: this.state.errorText,
                        height: this.state.height,
                        width: this.width,
                        searchButtonHandler: this.searchButtonHandler,
                        processPokemonResult: this.processPokemonResult,
                        updateDisplayedPokemon: this.updateDisplayedPokemon,
                        updateSelectedImageHandler: this.updateSelectedImageHandler,
                        storedPokemon: this.storedPokemon,
                        captureRate: this.captureRate,
                        baseHappiness: this.baseHappiness,
                        searchHistory: this.state.searchHistory,
                        // apiSourceHandler: this.apiSourceHandler,

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
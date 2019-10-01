import React from 'react';

const PokemonContext = React.createContext({
    id: null,
    name: null,
    weight: null,
    baseStats: null,
    sprites: null,
    flavorText: null,
    isLoaded: false,
    hasError: false,
    errorText: null,
    selectedImage: null,
});


export default PokemonContext;
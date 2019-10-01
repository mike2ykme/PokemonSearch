import React from 'react';
import Media from 'react-bootstrap/Media';
// import unknown from './question-mark.jpg';

const PokemonHeader = (props) => {




    return (
        <Media className="border border-dark">
            <img
                width={75}
                height={75}
                className="mr-3 rounded"
                src={props.image}
                alt="Pokemon"
            />
            <Media.Body>
                <table>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>
                                Name:
                                    </td>
                            <td>
                                {props.name}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>
                                ID:
                                    </td>
                            <td>
                                {props.id}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold' }}>
                                Weight:
                                    </td>
                            <td>
                                {props.weight}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p>{props.flavorText}</p>
            </Media.Body>
        </Media>
    );
}


export default PokemonHeader;
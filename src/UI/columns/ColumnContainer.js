import React from 'react';
import LeftColumn from './LeftColumn';
import MiddleColumn from './MiddleColumn';
import RightColumn from './RightColumn';
import PokemonDisplay from '../PokemonDisplay';
import { Row, Col } from 'react-bootstrap';
import PokemonContext from '../../context/PokemonContext';


class ColumnContainer extends React.Component {

    static contextType = PokemonContext;

    
    componentDidMount(){
        console.log("CDM",this.context);
    }
    render() {
        return (
            <>
                <Row>
                    {/* width:{this.state.width} */}
                    <LeftColumn>
                        <Col className="col-md-3 d-none d-md-block" style={{ backgroundColor: 'blue' }}>
                            Left Column
                        </Col>
                    </LeftColumn>


                    {/* height:{this.state.height} */}
                    <MiddleColumn >
                        <Col style={{ backgroundColor: 'red' }}>
                            {/* <PokemonDisplay pokemonSearch={this.state.pokemonSearch} /> */}
                            <PokemonDisplay />
                        </Col>
                    </MiddleColumn>


                    <RightColumn >
                        <Col className="col-md-3 d-none d-md-block" style={{ backgroundColor: 'green' }}>
                            Right Column
                        </Col>
                    </RightColumn>
                </Row>
                <Row>
                    <Col>
                        NEW ROW
                    </Col>
                </Row>
            </>
        )
    }
}
export default ColumnContainer;
import React from 'react';
import LeftColumn from './LeftColumn';
import MiddleColumn from './MiddleColumn';
import RightColumn from './RightColumn';
import PokemonDisplay from '../PokemonDisplay';
import { Row, Col } from 'react-bootstrap';
import PokemonContext from '../../context/PokemonContext';
import StatsDisplay from '../StatsDisplay';

class ColumnContainer extends React.Component {

    static contextType = PokemonContext;


    // componentDidMount() {
    //     console.log("CDM", this.context);
    // }
    render() {
        return (
            <React.Fragment>
                <Row>
                    <LeftColumn>
                        <Col className="col-md-3 d-none d-md-block" >
                            <br />
                            Search History:
                            <ul>
                                {this.context.searchHistory.map((searchElement) => (
                                    <li key={searchElement} style={{ cursor: 'pointer' }} onClick={() => this.context.searchButtonHandler(searchElement)}>
                                        {searchElement}
                                    </li>
                                ))
                                }
                            </ul>
                        </Col>
                    </LeftColumn>

                    <MiddleColumn >
                        < Col className="col-12 col-sm-12 col-xs-12 col-md-6" >
                            <PokemonDisplay />
                        </Col>
                    </MiddleColumn>

                    <RightColumn >
                        <Col className="col-12 col-sm-12 col-md-3" >
                            {this.context.isLoaded && <StatsDisplay a="TEST_VALUE" />}
                        </Col>
                    </RightColumn>
                </Row>
                {/* <Row>
                    <Col>
                        NEW ROW
                    </Col>
                </Row> */}
            </React.Fragment>
        )
    }
}
export default ColumnContainer;
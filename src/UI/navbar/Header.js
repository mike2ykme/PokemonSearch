import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Form, FormControl, Button } from 'react-bootstrap';


// className="d-none d-lg-block"
class Header extends React.Component {
    state = {
        searchText: "",
    }

    searchChangeHandler = (e) => {
        this.setState({
            searchText: e.target.value,
        });
    }

    onKeyChangeHandler = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            console.log('value', e.target.value);
            this.props.click(this.state.searchText);
            this.setState((state, props) => {
                return { searchText: "" }
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar bg="dark" variant="dark" >
                    <Navbar.Brand href="#home" >Navbar</Navbar.Brand>
                    <Nav className="mr-auto" >

                    </Nav>
                    <Form inline>
                        <FormControl onKeyDown={this.onKeyChangeHandler} type="text" onChange={this.searchChangeHandler} value={this.state.searchText} placeholder="Search" className="mr-sm-2" />
                        <Button onClick={() => {
                            this.props.click(this.state.searchText);
                            this.state.searchText = "";
                        }
                        } variant="outline-info">Search</Button>
                        <div style={{width:"8px"}}></div>
                        <Button
                            onClick={this.props.apiSwitchHandler}
                            variant="outline-info"
                        >
                            use {this.props.isApiLocal ? 'PokeAPI' : 'LocalApi'} API
                        </Button>
                    </Form>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default Header;


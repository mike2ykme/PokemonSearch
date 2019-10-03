import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Form, FormControl, Button } from 'react-bootstrap';

// className="d-none d-lg-block"
class Header extends React.Component {
    state = {
        searchText: "",
    }

    searchChangeHandler = (e) => {
        // console.log(e.target.value);
        this.setState({
            searchText: e.target.value,
        });
    }
    onKeyChangeHandler = (e) => {
        // e.preventDefault();
        if (e.keyCode === 13) {
            e.preventDefault()
            console.log('value', e.target.value);
            this.props.click(this.state.searchText);
            this.setState((state, props)=>{
                return {searchText:""}
            });
        }
    }
    render() {
        return (
            <React.Fragment>
                <Navbar bg="dark" variant="dark" >
                    <Navbar.Brand href="#home" >Navbar</Navbar.Brand>
                    <Nav className="mr-auto" >
                        {/* <Nav.Link href="#home" >Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    <Form inline>
                        <FormControl onKeyDown={this.onKeyChangeHandler} type="text" onChange={this.searchChangeHandler} value={this.state.searchText} placeholder="Search" className="mr-sm-2" />
                        <Button onClick={() => {
                            this.props.click(this.state.searchText);
                            this.state.searchText = "";
                        }
                        } variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default Header;
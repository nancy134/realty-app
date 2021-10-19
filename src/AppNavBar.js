import React from 'react';
import {
    Nav,
    Navbar,
    Button
} from 'react-bootstrap';
import AccountButton from './components/AccountButton';
import AccountButtonSpark from './components/AccountButtonSpark';

class AppNavBar extends React.Component {
    render(){
        var logo = process.env.REACT_APP_IMAGES + "FindingCRELogo.png";
        var spark = process.env.REACT_APP_SPARK;
        return(
        <Navbar>
            <Navbar.Brand href="./home">
                <img
                alt="logo" 
                src={logo}
                className="p-0 d-inline-block align-top"
                />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                { spark === 'true' ?
                null
                :
                <Nav.Item>
                    <Nav.Link eventKey="link-2">
                        <Button
                            id="button-add-listing"
                            onClick={this.props.onAddListing}
                            variant="outline-primary"
                        >
                            <span>Add a Listing</span>
                        </Button>
                    </Nav.Link> 
                </Nav.Item>
                }
                <Nav.Item>
                    <Nav.Link eventKey="link-1">
                        { spark === 'true' ?
                        <AccountButtonSpark
                            onLogin={this.props.onSparkLogin}
                            accessToken={this.props.sparkAccessToken}
                            refreshToken={this.props.sparkRefreshToken}
                        />
                        :
                        <AccountButton 
                            loggedIn={this.props.loggedIn}
                            isAdmin={this.props.isAdmin}
                            onLogin={this.props.onLogin} 
                            onLogout={this.props.onLogout} 
                            onConfirm={this.props.onConfirm}
                            onRegister={this.props.onRegister}
                        />
                        }
                    </Nav.Link>
                </Nav.Item>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}

export default AppNavBar;

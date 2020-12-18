import React from 'react';
import AdminToolbar from '../components/AdminToolbar';
import AdminUsers from '../components/AdminUsers';
import AdminListings from '../components/AdminListings';

export class AdminPage extends React.Component {
    constructor(props){
        super(props);
        this.handleSwitchTab = this.handleSwitchTab.bind(this);
        this.state = {
            tab: "users"
        };
    }

    handleSwitchTab(key){
        this.setState({
            tab: key
        });
    }

    render(){
        var tab = this.state.tab;
        return(
            <React.Fragment>
                <AdminToolbar
                    onSwitchTab={this.handleSwitchTab}
                />
                {tab === "users" ? 
                <AdminUsers />
                : null }
                {tab === "listings" ?
                <AdminListings />
                : null }
            </React.Fragment>
        );
    }
}

export default AdminPage; 

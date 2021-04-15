import React from 'react';
import AdminToolbar from '../components/AdminToolbar';
import AdminUsers from '../components/AdminUsers';
import AdminListings from '../components/AdminListings';
import AdminBilling from '../components/AdminBilling';
import AdminPromotions from '../components/AdminPromotions';
import AdminCodes from '../components/AdminCodes';

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
                <div
                    className="m-3"
                >
                <AdminToolbar
                    onSwitchTab={this.handleSwitchTab}
                />
                {tab === "users" ? 
                <AdminUsers />
                : null }
                {tab === "listings" ?
                <AdminListings />
                : null }
                {tab === "billing" ?
                <AdminBilling />
                : null }
                {tab === "promotions" ?
                <AdminPromotions />
                : null }
                {tab === "codes" ?
                <AdminCodes />
                : null }
                </div>
            </React.Fragment>
        );
    }
}

export default AdminPage; 

import React from 'react';
import PDFSingleDetail from '../components/PDFSingleDetail';
import listingService from '../services/listings';

export class ReportPage extends React.Component {
    constructor(props){
        super(props);
        var id = null;
        if (props.match.params.id){
            id = props.match.params.id;
        }
        this.state = {
            id: id,
            listing: null
        }
    }

    componentDidMount(){
        var that = this;
        listingService.get(this.state.id).then(function(data){
            console.log(data);
            that.setState({
                listing: data.listing
            });
        }).catch(function(err){
            console.log("err:");
            console.log(err);
        });
    }

    render() {
        if (this.state.listing){
        return (
        <div>
            <PDFSingleDetail
                listing={this.state.listing}
            />
        </div>
        );
        } else {
        return(
        <div>
            Loading listing...
        </div>
        );
        }
    }
}

export default ReportPage;

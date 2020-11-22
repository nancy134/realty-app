import React from 'react';
import PDFListDetail from '../components/PDFListDetail';
import listItemService from '../services/listItems';

export class ReportListPage extends React.Component {
    constructor(props){
        super(props);
        var id = null;
        if (props.match.params.id){
            id = props.match.params.id;
        }
        this.state = {
            id: id,
            listItems: null
        }
    }

    componentDidMount(){
        var that = this;
        var query="perPage=20&page=1&ListId="+this.state.id;
        listItemService.getAll(query).then(function(data){
            that.setState({
                listItems: data.listItems.rows
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    render() {
        console.log(this.state.listItems);
        if (this.state.listItems){
        return (
        <div>
            <PDFListDetail
                listItems={this.state.listItems}
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

export default ReportListPage;

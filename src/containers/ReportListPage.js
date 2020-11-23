import React from 'react';
import PDFListDetail from '../components/PDFListDetail';
import PDFListSummary from '../components/PDFListSummary';
import listItemService from '../services/listItems';

export class ReportListPage extends React.Component {
    constructor(props){
        super(props);
        var id = null;
        if (props.match.params.id){
            id = props.match.params.id;
        }
        const params = new URLSearchParams(props.location.search);
        var reportType = params.get('reportType');
        console.log("reportType: "+reportType);
        this.state = {
            id: id,
            listItems: null,
            reportType: reportType
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
        if (this.state.listItems){
        return (
        <div>
            {this.state.reportType === "detail" ?
            <PDFListDetail
                listItems={this.state.listItems}
            />
            : null}
            {this.state.reportType === "summary" ?
            <PDFListSummary
                listItems={this.state.listItems}
            />
            : null}
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

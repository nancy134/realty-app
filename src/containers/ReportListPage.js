import React from 'react';
import PDFListDetail from '../components/PDFListDetail';
import PDFListSummary from '../components/PDFListSummary';
import listItemService from '../services/listItems';
import withRouter from '../helpers/withRouter';

export class ReportListPage extends React.Component {
    constructor(props){
        super(props);

        var id = null;
        if (props.router && props.router.params && props.router.params.id){
            id = props.router.params.id;
        }

        var params = null;
        var reportType = null;
        if (props.router && props.router.location){
            params = new URLSearchParams(props.router.location.search);
            reportType = params.get('reportType');
        }
        this.state = {
            id: id,
            listItems: null,
            reportType: reportType
        }
    }

    componentDidMount(){
        var that = this;
        listItemService.getAll(this.state.id).then(function(data){
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

export default withRouter(ReportListPage);

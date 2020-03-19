import React from 'react';
import {
   Pagination 
} from 'react-bootstrap';

class ListingPagination extends React.Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        
    }
    onClick(goToPage){
        console.log("onClick: goToPage: "+goToPage);
        this.props.onNewPage(goToPage);
    }
    render(){
        var totalPages = 0;
        var paginationItems = [];
        if (this.props.perPage){
            totalPages = Math.ceil(this.props.count/this.props.perPage);
        } else {
            totalPages = 0;
        }
        var pg = parseInt(this.props.page);
        if (totalPages === 0 || totalPages === 1){
            return null;
        } else if (totalPages === 2){
            for (let i = 1; i <= totalPages; i++){
                if (i === pg) {
                    paginationItems.push(<Pagination.Item key={i} active="true">{i}</Pagination.Item>);
                } else {
                    paginationItems.push(<Pagination.Item key={i} onClick={() => this.onClick(i)}>{i}</Pagination.Item>);
                }
            }
        }
        return (
        <React.Fragment>
             <Pagination size="sm" className="justify-content-end">
                 {paginationItems}
             </Pagination>
        </React.Fragment>
        );
        
    }
}
export default ListingPagination;

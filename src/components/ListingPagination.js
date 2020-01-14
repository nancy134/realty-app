import React from 'react';
import {
   Pagination 
} from 'react-bootstrap';

class ListingPagination extends React.Component {
    render(){
        return (
            <Pagination size="sm" className="justify-content-end">
                <Pagination.Item key="1" active="true">1</Pagination.Item>
                <Pagination.Item key="2" >2</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item key="6" >6</Pagination.Item>
            </Pagination>
        );
    }
}
export default ListingPagination;

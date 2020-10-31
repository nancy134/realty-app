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
        this.props.onNewPage(goToPage);
    }

    pagination(c, m) {
        var current = c,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || (i >= left && i < right)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }

    render(){
        var totalPages = 0;
        var paginationItems = [];
        if (this.props.perPage){
            totalPages = Math.ceil(this.props.count/this.props.perPage);
        } else {
            totalPages = 0;
        }
        if (totalPages === 0 || totalPages === 1){
            return null;
        }
        var pg = parseInt(this.props.page);
        var pgnItems = this.pagination(pg, totalPages);
        for (let i=0; i<pgnItems.length; i++){


            let goToPage = null;
            if (pgnItems[i] === "..."){
                goToPage = pgnItems[i-1];
            } else {
                goToPage = pgnItems[i];
            }
            var active = false;
            if (pgnItems[i] === pg){
                active = true;
            }
            if (active){
                paginationItems.push(
                <Pagination.Item
                     key={i}
                     active
                     onClick={() => this.onClick(goToPage)}
                >
                    {pgnItems[i]}
                </Pagination.Item>
                );

            } else {
                paginationItems.push(
                <Pagination.Item 
                     key={i}
                     onClick={() => this.onClick(goToPage)}
                >
                    {pgnItems[i]}
                </Pagination.Item>
                );
            }
        }
        return (
        <React.Fragment>
             <Pagination size="sm" className="m-0 justify-content-end">
                 {paginationItems}
             </Pagination>
        </React.Fragment>
        );
        
    }
}
export default ListingPagination;

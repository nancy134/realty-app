import React, {
    useState,
    useEffect,
} from 'react';
import {
    useParams
} from 'react-router-dom';

import PDFSingleDetail from '../components/PDFSingleDetail';
import listingService from '../services/listings';

function ReportPage(){
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        listingService.get(id).then(function(data){
            setListing(data.listing);
        }).catch(function(err){
            setError("An error has occurred");
        });
    }, [id]);

    if (listing){
        return (
            <div>
                <PDFSingleDetail
                    listing={listing}
                />
            </div>
        );
    } else if (error){
        return(
            <div>{error}</div>
        );
    } else {
        return(
            <div>Loading brochure...</div>
        );
    }

}

export default ReportPage;

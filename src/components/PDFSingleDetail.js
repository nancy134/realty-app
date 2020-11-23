import React from 'react';
import {
    Document,
    PDFViewer,
    Font
} from '@react-pdf/renderer';
import {
    ListingDetail
} from '../helpers/PDF';

Font.register({
    family: 'Open Sans',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
    ]
});

export class PDFSingleDetail extends React.Component{
    render(){
        var listing = this.props.listing;

        return(
        <PDFViewer
            style={{
                position: 'absolute',
                height: '100%',
                width: '95%' 
            }}
        >
            <Document>
                <ListingDetail
                    listing={listing}
                />
            </Document>
        </PDFViewer>
        );
    }
};
export default PDFSingleDetail;

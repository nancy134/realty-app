import React from 'react';
import {
    Document,
    PDFViewer,
    Font
} from '@react-pdf/renderer';
import {
    ListingDetail,
} from '../helpers/PDF';

Font.register({
family: 'Open Sans',
fonts: [
{ src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
{ src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
]
});

export class PDFListDetail extends React.Component{
    render(){
        var listItems = this.props.listItems;

        return(
        <PDFViewer
            style={{
                position: 'absolute',
                height: '100%',
                width: '95%' 
            }}
        >
            <Document>
                {listItems.map((listItem, index) =>
                ( 
                <ListingDetail
                    key={index}
                    listing={listItem.listing.versions[0]}
                />
                ))}
            </Document>
        </PDFViewer>
        );
    }
};
export default PDFListDetail;

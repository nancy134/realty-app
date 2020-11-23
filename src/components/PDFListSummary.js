import React from 'react';
import {
    Document,
    PDFViewer,
    Font
} from '@react-pdf/renderer';
import {
    ListingSummary,
} from '../helpers/PDF';

Font.register({
family: 'Open Sans',
fonts: [
{ src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
{ src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
]
});

export class PDFListSummary extends React.Component{
    render(){
        var listItems = this.props.listItems;

        var perPage = 4;
        var count = listItems.length;
        var numPages = Math.floor(count/perPage);
        numPages += 1;
        var pages = [];
        for (var i=0; i<numPages; i++){
           var index1 = i*perPage;
           var index2 = (i+1)*perPage;
           var pageItems = listItems.slice(index1,index2); 
           pages.push(pageItems);
        }
        
        return(
        <PDFViewer
            style={{
                position: 'absolute',
                height: '100%',
                width: '95%' 
            }}
        >
            <Document>
                {pages.map((listItems, index) =>
                ( 
                <ListingSummary
                    key={index}
                    listItems={listItems}
                />
                ))}
            </Document>
        </PDFViewer>
        );
    }
};
export default PDFListSummary;

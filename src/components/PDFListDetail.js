import React from 'react';
import {
    Page,
    View,
    Document,
    PDFViewer,
    Font
} from '@react-pdf/renderer';
import {
    ListItems
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
                <Page
                    size="A4"
                >
                    <View
                        style={{
                            fontFamily: "Open Sans",
                            margin: 10,
                            fontSize: 12,
                            flexDirection: 'column'
                        }}
                    >
                    <ListItems
                        listItems={listItems}
                    />
                    </View>
                </Page>
            </Document>
        </PDFViewer>
        );
    }
};
export default PDFListDetail;

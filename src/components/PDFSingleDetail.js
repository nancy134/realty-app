import React from 'react';
import {
    Page,
    View,
    Document,
    PDFViewer,
    Font
} from '@react-pdf/renderer';
import {generalNameValuePairs} from '../helpers/utilities';
import {
    Header,
    Overview,
    SabreImages,
    Spaces,
    General,
    Broker
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
        var generalNvps = generalNameValuePairs(listing);

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
                        <Header
                            listing={listing}
                        />
                        <Overview
                            listing={listing}
                        />
                        {listing.images.length ?
                        <SabreImages
                            listing={listing}
                        />
                        : null}
                        {listing.spaces.length ?
                        <Spaces
                            spaces={listing.spaces}
                        />
                        : null}
                        {generalNvps.length ?
                        <General
                            listing={listing}
                            nvps={generalNvps}
                        />
                        : null}
                        <Broker
                            listing={listing}
                        />
                    </View>
                </Page>
            </Document>
        </PDFViewer>
        );
    }
};
export default PDFSingleDetail;

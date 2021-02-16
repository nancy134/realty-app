import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Font,
    Page
} from '@react-pdf/renderer';
import {generalNameValuePairs} from '../helpers/utilities';

Font.register({
    family: 'Open Sans',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
    ]
});

const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COL1_WIDTH = 20
const COLN_WIDTH = 100/4

const styles = StyleSheet.create({
    body: {
        padding: 10
    },
    table: { 
        display: "table", 
        width: "auto", 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderWidth: 1, 
        borderRightWidth: 0, 
        borderBottomWidth: 0,
        marginTop: 10,
        //marginLeft: 20,
        marginRight: 20
    }, 
    tableNoBorder: {
        display: "table",
        width: "auto",
        marginTop: 10,
        marginRight: 20
    },
    tableRow: { 
        margin: 'auto',
        flexDirection: "row" 
    }, 
    tableCol1Header: { 
        width: COL1_WIDTH + '%', 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0
    },     
    tableColHeader: { 
        width: COLN_WIDTH + "%", 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0
    },   
    tableCol1: { 
        width: COL1_WIDTH + '%', 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    },   
    tableCol: { 
        width: COLN_WIDTH + "%", 
        borderStyle: BORDER_STYLE, 
        borderColor: BORDER_COLOR,
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
    },
    tableColNoBorder: {
        width: COLN_WIDTH + "%"
    },
    tableCellHeader: {
        margin: 5, 
        fontSize: 12,
        fontWeight: 500
    },  
    tableCellNoBorder: {
        fontSize: 10
    },
    tableCell: { 
        margin: 5, 
        fontSize: 10 
    }
});

export function Header(props){
    var listing = props.listing;
    var title = listing.address + ", " + listing.city + ", " + listing.zip;
    return(
        <Text
            style={{
                margin: 20,
                fontSize: 16,
                textAlign: 'center',
                textTransform: 'uppercase',
                borderBottom: 1
            }}
        >
            {title}
        </Text>
    );
}

export function Overview(props){
    var listing = props.listing;
    return(
        <View
            style={{
                flexDirection: 'column'
            }}
        >
        <Text
            style={{
                marginLeft: 20,
                marginRight: 20,
                fontSize: 14,
                backgroundColor: '#e4e4e4'
            }}
        >
            Overview
        </Text>
        <Text
            style={{
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 10,
            }}
        >
            {listing.shortDescription}
        </Text>
        <Text
            style={{
                marginTop: 10,
                fontSize: 10,
                marginLeft: 20,
                marginRight: 20
            }}
        >
            {listing.longDescription}
        </Text>
        </View>
    );
}

export function SabreImage(props){
    var image = props.image;
    return(
        <Image
            style={{
                width: '20%',
                marginTop: 10,
                marginRight: 10
            }}
            src={image.url + '?noCache=' + Math.random().toString()}
            source={{
                header: {
                    'Access-Control-Allow-Origin': '*'
                }
            }}
        />
    );

}

export function SabreImages(props){
    var listing = props.listing;
    return(
        <View
            style={{
                flexDirection: 'column',
                marginLeft: 20
            }}
        >
            <Text
                style={{
                    marginTop: 10,
                    marginRight: 20,
                    fontSize: 14,
                    backgroundColor: '#e4e4e4'
                }}
            >
                Images
            </Text>

            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                {listing.images.map((image, index) =>
                (
                    <SabreImage
                        key={index}
                        image={image}
                    />
                ))}
            </View>
        </View>
    );
}

export function Spaces(props){
      var spaces = props.spaces;
      return(
      <View
          style={{
              flexDirection: 'column',
              marginLeft: 20
          }}
      >
            <Text
                style={{
                    marginTop: 10,
                    marginRight: 20,
                    fontSize: 14,
                    backgroundColor: '#e4e4e4'
                }}
            >
                Available Space 
            </Text>
            <View style={styles.table}> 
                <View style={styles.tableRow}> 
                    <View style={styles.tableColHeader}> 
                        <Text style={styles.tableCellHeader}>Name</Text> 
                    </View> 
                    <View style={styles.tableColHeader}> 
                        <Text style={styles.tableCellHeader}>Size</Text> 
                    </View> 
                    <View style={styles.tableColHeader}> 
                        <Text style={styles.tableCellHeader}>Type</Text> 
                    </View> 
                    <View style={styles.tableColHeader}> 
                        <Text style={styles.tableCellHeader}>Use</Text> 
                    </View> 
                </View>
                {spaces.map((space, index) => (
                    <View key={index} style={styles.tableRow}> 
                        <View style={styles.tableCol}> 
                            <Text style={styles.tableCell}>{space.unit}</Text> 
                        </View> 
                       <View style={styles.tableCol}> 
                           <Text style={styles.tableCell}>{space.size}</Text> 
                       </View> 
                       <View style={styles.tableCol}>
                           <Text style={styles.tableCell}>{space.price}</Text> 
                       </View>
                       <View style={styles.tableCol}> 
                           <Text style={styles.tableCell}>{space.use}</Text> 
                       </View> 
                   </View>
               ))} 
           </View>
      </View>
      );
}

export function NameValueRows(props){

    var nvps = props.nvps;
    var length = props.nvps.length;
    var rows = Math.ceil(length/2);
    var tableRows = [];
    for (var i=0; i<rows; i++){

        var colValue1 = "";
        var prefix1 = nvps[i*2].prefix ? nvps[i*2].prefix : "";
        var unit1 = nvps[i*2].unit ? nvps[i*2].unit : "";
        var value1 = nvps[i*2].value;

        colValue1 = prefix1+value1+" "+unit1;

        var label2 = "";
        var prefix2 = "";
        var unit2 = "";
        var value2 = "";
        var colValue2 = "";
        var index = i*2+1;
        if (index < length){
            label2 = nvps[index].label;
            prefix2 = nvps[index].prefix ? nvps[index].prefix : "";
            unit2 = nvps[index].unit ? nvps[index].unit : "";
            value2 = nvps[index].value;
            colValue2 = prefix2+value2+" "+unit2; 
        } 
        var row = {
            col1: nvps[i*2].label,
            col2: colValue1,
            col3: label2,
            col4: colValue2
        };
        tableRows.push(row);
    }
    console.log(tableRows);

    return(
        <View>
        {tableRows.map((row, index) => (

            <View key={index} style={styles.tableRow}>
                <View
                    style={{
                        width: COLN_WIDTH + "%"
                    }}
                >
                    <Text style={styles.tableCellNoBorder}>{row.col1}</Text>
                </View>
                <View
                    style={{
                        width: COLN_WIDTH + "%",
                        fontWeight: "bold" 
                    }}
                >
                    <Text style={styles.tableCellNoBorder}>{row.col2}</Text>
                </View>
                <View
                    style={{
                        width: COLN_WIDTH + "%"
                    }}>
                    <Text style={styles.tableCellNoBorder}>{row.col3}</Text>
                </View>
                <View
                    style={{
                        width: COLN_WIDTH + "%",
                        fontWeight: "bold"
                    }}
                >
                    <Text style={styles.tableCellNoBorder}>{row.col4}</Text>
                </View>
            </View>
        ))}
        </View>
    );
}

export function General(props){
    //var nvps = generalNameValuePairs(props.listing);
    return(
    <View
        style={{
            flexDirection: 'column',
            marginLeft: 20
        }}
    >
        <Text
            style={{
                marginTop: 10,
                marginRight: 20,
                fontSize: 14,
                backgroundColor: '#e4e4e4'
            }}
        >
            Building Detail 
        </Text>
   
        <View style={styles.tableNoBorder}>
            <NameValueRows
                nvps={props.nvps}
            />
        </View>
    </View>
    );
}

export function Broker(props){
    var listing = props.listing;
    return(
        <View
            style={{
                marginTop: 20,
                flexDirection: 'column'
            }}
        >
        <Text
            style={{
                marginLeft: 20,
                marginRight: 20,
                fontSize: 14,
                backgroundColor: '#e4e4e4'
            }}
        >
            Broker 
        </Text>
        <Text
            style={{
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 10,
            }}
        >
            {listing.owner.email}
        </Text>
        </View>
    );
}
export function ListingSummary(props){
    var listItems = props.listItems;
    var count = props.listItems.length;
    return(
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
                <View>
                    <Text
                        style={{
                            marginLeft: 20,
                            marginRight: 20,
                            fontSize: 14,
                            backgroundColor: '#e4e4e4'
                        }}
                    >
                    Summary Report
                    </Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        {listItems.map((listItem, index) => (
                            <View key={index} style={styles.tableCol}>
                                <Text style={styles.tableCell}>{listItem.listing.versions[0].address}</Text>
                            </View>
                         ))}
                         { count < 4 ?
                            <View key={1} style={styles.tableCol}>
                            </View>
                         : null}
                         { count < 3 ?
                            <View key={1} style={styles.tableCol}>
                            </View>
                         : null} 
                         { count < 2 ?
                            <View key={1} style={styles.tableCol}>
                            </View>
                         : null} 
                    </View>
                    <View style={styles.tableRow}>
                        {listItems.map((listItem, index) => (
                            <View key={index} style={styles.tableCol}>
                                <Text style={styles.tableCell}>{listItem.listing.versions[0].city}, {listItem.listing.versions[0].state}</Text>
                            </View>
                         ))}
                         { count < 4 ?
                            <View key={1} style={styles.tableCol}>
                            </View>
                         : null}
                         { count < 3 ?
                            <View key={1} style={styles.tableCol}>
                            </View>
                         : null}
                         { count < 2 ?
                            <View key={1} style={styles.tableCol}>
                            </View>
                         : null}
                    </View>

                    <View style={styles.tableRow}>
                        {listItems.map((listItem, index) => (
                            <View key={index} style={styles.tableCol}>
                                <Text style={styles.tableCell}>{listItem.listing.versions[0].listingType}</Text>
                            </View>
                         ))}
                         { count < 4 ?
                            <View key={1} style={styles.tableCol}>
                            </View>
                         : null}
                         { count < 3 ?
                            <View key={1} style={styles.tableCol}>
                            </View>
                         : null}
                         { count < 2 ?
                            <View key={1} style={styles.tableCol}>
                            </View>
                         : null}
                    </View>

                </View>
            </View>
        </Page>
    );
}
export function ListingDetail(props){

    var listing = props.listing;
    var generalNvps = generalNameValuePairs(listing);

    return(
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
                {listing.images && listing.images.length ?
                    <SabreImages
                        listing={listing}
                    />
                : null}
                {listing.spaces && listing.spaces.length ?
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
    );
}

const PDFHelper = {
    Header,
    Overview,
    SabreImage,
    SabreImages,
    Spaces,
    NameValueRows,
    General,
    Broker,
    ListingSummary
};

export default PDFHelper;

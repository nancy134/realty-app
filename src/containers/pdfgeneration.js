import React from 'react';
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    Image
} from '@react-pdf/renderer';

const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COL1_WIDTH = 20
const COLN_WIDTH = (100 - COL1_WIDTH) / 3

// Create styles
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
  tableCellHeader: {
    margin: 5, 
    fontSize: 12,
    fontWeight: 500
  },  
  tableCell: { 
    margin: 5, 
    fontSize: 10 
  }

});

//        <PDFDownloadLink document={MyDocument} fileName="somename.pdf">
//          {({ blob, url, loading, error }) =>
//            loading ? "Loading document..." : "Download now!"
//          }
//        </PDFDownloadLink>

function Header(props){
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

function Overview(props){
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
                fontWeight: 'bold'
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

function SabreImage(props){
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

function SabreImages(props){
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

function Spaces(props){
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
                    <View style={styles.tableCol1Header}> 
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
                        <View style={styles.tableCol1}> 
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

function Broker(props){
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
            Broker 
        </Text>
        <Text
            style={{
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20,
                fontSize: 10,
                fontWeight: 'bold'
            }}
        >
            {listing.owner}
        </Text>
        </View>
    );

}

export class PDF extends React.Component{
/*
    render(){
        return (
        <div >
            <PDFViewer style={newstyles.viewer}>
                <Document>
                    <Page size="A4" style={newstyles.page}>
                        <View style={newstyles.section}>
                            <Text>Section #1</Text>
                        </View>
                        <View style={newstyles.section}>
                            <Text>Section #2</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
        );
    }
*/
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
                <Page
                    size="A4"
                >
                    <View
                        style={{
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
export default PDF;

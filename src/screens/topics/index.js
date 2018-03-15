
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image, Alert, ActivityIndicator,
    Text, Dimensions, TouchableOpacity, FlatList, TouchableHighlight, Linking, TouchableWithoutFeedback
} from 'react-native';
import Constants from '../../constants';
import { api } from '../../helpers';
import styles from './topicStyle';
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

import GridView from 'react-native-super-grid';
export default class Topic extends Component {
    constructor(props) {
        super(props);

        console.log(' inside Topic ' + JSON.stringify(this.props));

        this.state = {
            loaded: false,
            topics: [],
            routes: []
        }
    }

    componentDidMount() {
        console.log(' componentDidMount Topic ' + JSON.stringify(this.props), this.props.route.key);

        this.getTopic(this.props.route.key).then((data) => {
            console.log('liked_products data ' + JSON.stringify(data.liked.liked_products));
            this.setState({
                loaded: true,
                topics: data.liked.liked_products,

            });

        });
    }
    async getTopic(catId) {
        console.log("getTopicList ", catId);
        try {
            var param = {
                "parent_category_id": catId,
                "type": "both",
                "page": 1,
                "per_page": 20
            }
            let response = await api.get(Constants.url.liked_topics_detail, { params: param });
            //console.log("response getTopic " + JSON.stringify(response));



            //let responseJson = await response.json();

            return response.data;
        }

        catch (error) {
            console.log("HERE IS PROBLEM", JSON.stringify(error))

            this.setState({
                loaded: true,

            });

        }
    }

    render() {


        if (this.state.loaded) {


            if (this.state.topics.length > 0) {
                return (

                    <GridView
                        itemDimension={130}
                        items={this.state.topics}
                        style={gridStyles.gridView}
                        renderItem={topic => (
                            <View style={[gridStyles.itemContainer, { backgroundColor: '#FFFFFF' }]}>
                                <Image style={gridStyles.imageStyle} source={{ uri: topic.image_url }} />
                                
                                    <Text style={gridStyles.itemName}>{topic.title}</Text>
                                 

                            </View>
                        )}
                    />

                );
            }

            return (
                <View style={{
                    flex: 1,
                    padding: 25,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'flex-start', height: Dimensions.get('window').height / 2
                }}>
                    <Text style={gridStyles.itemCode}>{"No data availale"}</Text>
                </View>

            )
        }

        return (
            <View style={{
                flex: 1,
                padding: 25,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'flex-start', height: Dimensions.get('window').height / 2
            }}>
                <ActivityIndicator size="large" />
            </View>

        )

    }



}

const gridStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gridView: {
        paddingTop: 5,
        flex: 1,
    },
    itemContainer: {
         flex:1,
        borderRadius: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
    },
    imageStyle: {
        width: '100%',
        height: 160,
    },
    itemName: {
        padding: 10,
        fontSize: 10,
        color: '#303030',


    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#000',
    },
});
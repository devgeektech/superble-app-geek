import React, { Component } from 'react';
import { Container, Header, Button, Icon, Fab, Content, } from 'native-base';
import { Image, View, TouchableWithoutFeedback, StyleSheet, Text, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Constants from '../../constants';
import { api } from '../../helpers';
//import styles from './profileStyle';
import Account from '../account/index';
import Topic from '../topics'
import Avatar from '../../components/avatar'
const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

const FirstRoute = () => <View style={[styles.container, { backgroundColor: '#ff4081' }]} />;
const SecondRoute = () => <View style={[styles.container, { backgroundColor: '#673ab7' }]} />;


export default class Profile extends Component {
    constructor(props) {
        super(props);
        console.log("Profile props " + JSON.stringify(props));
        this.state = {
            active: false,
            index: 0,
            userData:[],
            routes: [],
        };

        this.renderScenceFromArray = this.renderScenceFromArray.bind(this)
        //  this.renderScenceFromArray();
        this.doMount();
    }

    state = {
        loaded: false,
        topics: [],

    }
    async getTopicList() {
        console.log("getTopicList ");
        try {

            //?parent_category_id=4765&type=both&page=1&per_page=20
            let response = await api.get(Constants.url.user_profiles);
            console.log("response getTopicList " + JSON.stringify(response));
            //let responseJson = await response.json();

            return response.data.profile_object;
        }

        catch (error) {
            console.log("HERE IS PROBLEM", JSON.stringify(error))



        }
    }
    doMount() {
        console.log("response componentWillMount ");
        this.getTopicList().then((data) => {
            console.log('doMount data ' + JSON.stringify(data.user_topics));

            var myr = []
            for (var i = 0; i < data.user_topics.length; i++) {
                myr.push({ key: data.user_topics[i].id, title: data.user_topics[i].name });
            }
            this.setState({
                userData:data,
                loaded: true,
                topics: data.user_topics,
                routes: myr
            });

        });
    }
    _handleIndexChange = index => this.setState({ index });


    _renderHeader = props => <TabBar {...props}
        scrollEnabled
   //   indicatorStyle={styles.activeTab}
   //  style={styles.tabBar}
     //tabStyle={styles.tabBar}
    />;

    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    renderScenceFromArray(routes) {

        console.log('routes data ', JSON.stringify(routes.route));
        //   return sm;

        return <Topic {...routes} />;
    }
    userInfoHeader() {
let userData=this.state.userData;

        let pic = {
            uri:userData.url
        };
        return (
            <View style={{   flexDirection: 'column', height: 180, padding: 10, backgroundColor: '#fafafa' }}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ flex: 0.2, flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar img={pic} size={50} />
                    </View>
                    <View style={{ flex: 0.8 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 0.2, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.largeText}>
                                    {userData.likes_count} </Text>
                                <Text style={{ fontSize: 15, color: '#404042', }}> {"Views"}</Text>
                            </View>
                            <View style={{ flex: 0.2, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.largeText}>
                                    {userData.points} </Text>
                                <Text style={{ fontSize: 15, color: '#404042', }}> {"Points"}</Text>
                            </View>
                            <View style={{ flex: 0.2, flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={styles.largeText}>
                                    {userData.draft_count} </Text>
                                <Text style={{ fontSize: 15, color: '#404042', }}> {"Draft"}</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', alignContent: 'flex-start', marginTop: 10, marginRight: 5,marginLeft: 10 }}>

                    <Text style={styles.largeText}>{userData.user_name}</Text>
                    <Text style={styles.largeText}>{userData.bio}</Text>

                </View>
             
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', alignContent: 'flex-start', marginTop: 15, marginRight: 5 ,marginLeft: 10 }}>
                    <View style={styles.mainAccountView}>
                        <View style={styles.mainAccountSubView}>
                            <Image source={require('../../assets/p_facebook.png')} style={styles.mainAccountIconList} resizeMode='contain' />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../assets/p_instagram.png')} style={styles.mainAccountIconList} resizeMode='contain' />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../assets/p_pinterest.png')} style={styles.mainAccountIconList} resizeMode='contain' />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../assets/p_twitter.png')} style={styles.mainAccountIconList} resizeMode='contain' />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require('../../assets/p_ic-web.png')} style={styles.mainAccountIconList} resizeMode='contain' />
                        </View>
                    </View>
                </View>

            </View>)
    }

    render() {
        if (this.state.loaded) {
            return (
                <View style={styles.container}>

                    {this.userInfoHeader()}
                    <TabViewAnimated
                        style={styles.tabContainer}
                        navigationState={this.state}
                        renderScene={this.renderScenceFromArray}
                        renderHeader={this._renderHeader}
                        onIndexChange={this._handleIndexChange}
                        initialLayout={initialLayout}
                    />

                </View>

            );
        }


        return (
            <View style={{
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'flex-start', height: Dimensions.get('window').height / 2
            }}>
                <ActivityIndicator size="large" />
            </View>

        )
    }
};
const styles = StyleSheet.create({
    tabContainer: {
        flex: 1,
       
    },

    container: {
        flex: 1,
    },

    headerTitle: {
        height: 50,
        width: 100,
        color: '#484848',
        fontSize: 15,
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontFamily: 'Lato-Regular'
    },

    tabBar: {
        backgroundColor: 'white',
    },
    labelStyle: {
        flex: 1,
        color: 'black'
    },
    activeTab: {
        flex: 1,
        backgroundColor: 'white',
        color: '#404042'
    }, fullWidthButton: {
        backgroundColor: '#133457',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    }, fullWidthButtonText: {
        fontSize: 10,
        color: 'white',

    }, text: {
        marginTop: 10,
        color: '#5D5D5D',
        fontSize: 7,

    },
    largeText: {
        fontSize: 20,
        color: '#404042',

    },


    mainAccountView: {
        flexDirection: 'row',
    },
    mainAccountSubView: {
        flexDirection: 'row',
    },
    mainAccountIconList: {
        width: 30,
        height: 30,
        marginLeft: "5%",

    }, subHeadingList: {
        color: "#000",
        fontSize: 17,

    },
});
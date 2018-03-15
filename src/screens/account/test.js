import React from 'react';
import {Dimensions, Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { Button, Container, Content, Form, H1, H2, Header, Item, Input, Label, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './accountStyle';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
import { Switch } from 'react-native-switch';
import InstagramLogin from 'react-native-instagram-login';
import Ins from 'react-native-instagram-login';

var ImagePicker = require('react-native-image-picker');
// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


const deviceWidth  = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const API = 'https://api-dev.superble.com/api/v1';

export default class Account extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  getPhotos = () => {
    // Open Image Library:
    ImagePicker.launchImageLibrary(options, (response)  => {
      // Same code as in above section!
    });
  }

 fbAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile','email','user_birthday']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          console.log('Login was successful with permissions: '
            + result.grantedPermissions.toString());
             this.setState({isLoggedIn: true});
  
        }
      },
      function (error) {
        console.log('Login failed with error: ' + error);
      }
    );
  }
  constructor(props){
    super(props);
    this.state = {
      syncData: true,
      token: null,
      syncDataScreen2: false,
       photos: [],
     
    }
  
  }
  loggedOutUser = () => {
   alert(LoginManager.logOut());
    alert('logoutUser');
  }
  setModalVisibleSyncData(visible) {
    this.setState({syncData: visible});
  } 
  setModalVisibleSyncDataScreen2(visible) {
    this.setState({syncData: false});
    this.setState({syncDataScreen2: visible});
  } 
  render() {
 
    return (
    <Container>
        <View style={{flex:1,flexDirection: 'column'}}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.syncData}
              presentationStyle={'overFullScreen'}
              onRequestClose={() => {this.setModalVisibleSyncData(!this.state.syncData)}}
            >
              <TouchableWithoutFeedback onPress={() => { this.setModalVisibleSyncData(!this.state.syncData) }}>
                <View style={styles.syncDatatMainView}>
                  <TouchableWithoutFeedback>
                    <View style={styles.syncDataStyle}>
                      <Container>
                      <H2 style={styles.syncDataHeader}>Sync your accounts and start earning now</H2>
                        <Content >
                          <View style={styles.imageCommentWrap}>                          
                              <View style={styles.avatarContainer}>
                                <Image style={styles.facebookIcon} source={require('../../assets/facebook1.png')} />
                              </View>                         
                              <View style={styles.contentContainer}>
                                <Text>Facebook</Text>
                              </View>
                              <View style={styles.likeImgContainer}>
                                   <Switch
                                      value={false}
                                      onValueChange={(val) => this.fbAuth(val)}
                                      disabled={false}
                                      activeText={'On'}
                                      inActiveText={'Off'}
                                      circleSize={20}
                                      barHeight={1}
                                      circleBorderWidth={3}
                                      backgroundActive={'gray'}
                                      backgroundInactive={'gray'}
                                      circleActiveColor={'green'}
                                      circleInActiveColor={'#ffffff'}
                                    />
                              </View> 

                          </View>
                          <View style={styles.imageCommentWrap}>                          
                              <View style={styles.avatarContainer}>
                                <Image style={styles.facebookIcon} source={require('../../assets/instagram1.png')} />
                              </View>                         
                              <View style={styles.contentContainer}>
                                <Text>Instagram</Text>
                              </View>
                              <View style={styles.likeImgContainer}>
                                  
                                  <Switch
                                      value={false}
                                      onValueChange={(val) => this.refs.ins.show()}
                                      disabled={false}
                                      activeText={'On'}
                                      inActiveText={'Off'}
                                      circleSize={20}
                                      barHeight={1}
                                      circleBorderWidth={3}
                                      backgroundActive={'gray'}
                                      backgroundInactive={'gray'}
                                      circleActiveColor={'green'}
                                      circleInActiveColor={'#ffffff'}
                                    />
                                    <Ins
                                      ref='ins'
                                      clientId='0656207d48c64a98b6dcdaac4fa8b8b1'
                                      scopes={['public_content+follower_list']}
                                      onLoginSuccess={(token) => {alert(token);}}
                                      onLoginFailure={(data)  => {alert('fail-'+data);}}
                                    />
                                    
                              </View> 

                          </View>
                          <View style={styles.imageCommentWrap}>                          
                              <View style={styles.avatarContainer}>
                               <Image style={styles.facebookIcon} source={require('../../assets/pinterest1.png')} />
                              </View>                         
                              <View style={styles.contentContainer}>
                                <Text>Pinterest</Text>
                              </View>
                              <View style={styles.likeImgContainer}>
                                  <Switch
                                      value={false}
                                      onValueChange={(val) => console.log(val)}
                                      disabled={false}
                                      activeText={'On'}
                                      inActiveText={'Off'}
                                      circleSize={20}
                                      barHeight={1}
                                      circleBorderWidth={3}
                                      backgroundActive={'gray'}
                                      backgroundInactive={'gray'}
                                      circleActiveColor={'green'}
                                      circleInActiveColor={'#ffffff'}
                                      style={{ fontSize:22,padding:20 }}
                                    />
                              </View> 

                          </View>

                          <View style={styles.nextButtonWrap}>    
                            <View style={styles.buttonContainer}>     
                              <Button
                                  style={styles.buttonStyleNext}
                                  onPress={() => { this.setModalVisibleSyncDataScreen2(!this.state.syncDataScreen2) }}
                                ><Text style={styles.buttonStyleText}>Next</Text>
                              </Button>
                            </View>
                          </View>
                            
                        </Content>
                      </Container>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.syncDataScreen2}
              presentationStyle={'overFullScreen'}
              onRequestClose={() => {this.setModalVisibleSyncDataScreen2(!this.state.syncDataScreen2)}}
            >
              <TouchableWithoutFeedback onPress={() => { this.setModalVisibleSyncDataScreen2(!this.state.syncDataScreen2) }}>
                <View style={styles.syncDatatMainView}>
                  <TouchableWithoutFeedback>
                    <View style={styles.syncDataStyle}>
                      <Container>
                      <H2 style={styles.syncDataHeader}>Screen 2</H2>

                     
                              <Button
                                  style={styles.buttonStyleNext}
                                  onPress={() => { this.getPhotos() }}
                                ><Text style={styles.buttonStyleText}>View photo</Text>
                              </Button>


                          <View style={styles.nextButtonWrap}>    
                            <View style={styles.buttonContainer}>     
                              <Button
                                  style={styles.buttonStyleNext}
                                  onPress={() => { this.setModalVisibleSyncDataScreen2(!this.state.syncDataScreen2) }}
                                ><Text style={styles.buttonStyleText}>Next</Text>
                              </Button>
                            </View>
                          </View>
                      </Container>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>




        </View>
    </Container>
    );
  }

}

import React from 'react';
import {Dimensions, Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button, Container, Content, Form, H1, H2, Header, Item, Input, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './accountStyle';
import {LoginManager, LoginButton, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from 'react-native-google-signin';
import settings from '../../../private/data/settings.json';
//import DeviceInfo from 'react-native-device-info';
var DeviceId = '12345'; //Temp device id

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const API = 'https://api-dev.superble.com/api/v1';

export default class Account extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  googleAuth() {
    // GoogleSignin.signIn()
    //   .then((user) => {
    //     console.log(user);
    //   })
    //   .catch((err) => {
    //     console.log('WRONG SIGNIN', err);
    //   })
    //   .done();
    this.setupGoogleSignin();
  }

  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: settings.iOSClientId,
        webClientId: settings.webClientId,
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);

      // this.setState({user});
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }
  
  fbAuth = () => {
    LoginManager.logInWithReadPermissions(['public_profile','email','user_birthday']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
         
            AccessToken.getCurrentAccessToken().then((data) => {
             this.initFbUser(data.accessToken);
              console.log('Login was successful with permissions: '
            + data.accessToken);
            })
             //this.props.navigation.navigate('Home');    
  
        }
      },
      function (error) {
        console.log('Login failed with error: ' + error);
      }
    );
  }

  initFbUser = (token) => {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      let timeStamp   = Math.floor(Date.now() / 1000);
      let email       = json.email;
      let username    = json.name;
      let newusername = username.replace(/\s/g,'')+timeStamp;
      let pass        = 'TechAdmin911';
      this.setState({UName: newusername});
      this.setState({UEmail: email});
      this.setState({UPass: pass});
      this.setState({isFbLogin: true});
      this.createAccount(); // register user
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  loggedOutUser = () => {
    alert(1);
   LoginManager.logOut();

  }
  setModalVisible(visible) {
    this.setState({createAccount: visible});
  }

  setModalVisibleForgotPswd(visible) {
    this.setState({forgotPswdAccount: visible});
  }

  setModalVisibleForgotPswdCloseLogin(arg1, arg2) {
    this.setState({ loginAccount: arg2, forgotPswdAccount: arg1, });
  }

  setModalVisibleLogin(visible) {
    this.setState({loginAccount: visible});
  }  
  
  handleModalClick() {
    if (this.props.isKeyboardOpened) {
      return this.refs.form.blur();
    }
    this.props.onClose(false);
  }
  
  createAccount = () => {
    //alert(JSON.stringify(DeviceInfo));
    var FName  = this.state.FName;
    var LName  = this.state.LName;
    var UName  = this.state.UName;
    var UEmail = this.state.UEmail;
    var UPass  = this.state.UPass;

      

    var isError = false;
    var imgUrl  = 'cdn.shopify.com/s/files/1/2312/3313/products/Trio-Kit_SM_large.png';

    if(UName == null || UName.trim() == ''){
        this.setState({registerUnameError: true});
        this.setState({registerUname: 'Username must be at least 4 characters'});   
        isError = true;
    }else if(UName.length < 4){
        this.setState({registerUnameError: true});
        this.setState({registerUname: 'Username must be at least 4 characters'});   
        isError = true;
    }else{
        this.setState({registerUnameError: false});
        this.setState({registerUname: ''});  
    }

    if(UEmail == null || UEmail.trim() == ''){
        this.setState({registerEmailError: true});
        this.setState({registerEmail: 'Required'});            
        isError = true;
    }else if(!this.validateEmail(UEmail)){
        this.setState({registerEmailError: true});
        this.setState({registerEmail: 'Invalid Email'});      
        isError = true;
    }else{
        this.setState({registerEmailError: false});
        this.setState({registerEmail: ''}); 
    }
    if(UPass == null || UPass.trim() == '' || UPass.length < 6){
        this.setState({registerPassError: true});
        this.setState({registerPass: 'Password must be at least 6 characters'});        
        isError = true;
    }else{
        this.setState({registerPassError: false});
        this.setState({registerPass: ''});        
    }

    if(isError){
      return false;
    }
    var signupFormData = JSON.stringify({
            first_name: FName,
            last_name : LName,
            user_name : UName,
            email     : UEmail,
            password  : UPass,
            imgFile   : imgUrl,
            device_id : DeviceId,
            
    });

    /*var signupFormData = JSON.stringify({
            first_name: 'Techinfini1',
            last_name : 'test1',
            user_name : 'techinfini12',
            email     : 'mohit.tiwari12@techinfini.com',
            password  : 'TechAdmin911',
            imgFile   : 'cdn.shopify.com/s/files/1/2312/3313/products/Trio-Kit_SM_large.png',
            public_id :'123',
            phash     :'test',
            device_id :'123',
            referral_code :'321'
    });*/
    
    fetch(API + '/sessions/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: signupFormData
    })
    .then(response => response.json())
    .then(responseData => {
      console.log("checkme="+JSON.stringify(responseData));
      if(responseData.message){
        if(this.state.isFbLogin){

        }else{
          alert(responseData.message);  
        }        
      }else{
        alert("User successfully registered");
        this.setState({createAccount: false});
        // Reset states
        this.setState({FName: ''});
        this.setState({LName: ''});
        this.setState({UName: ''});
        this.setState({UEmail: ''});
        this.setState({UPass: ''});
        console.log("check="+JSON.stringify(responseData));
        //this.props.navigation.navigate('Home');    
      }
    });

  }

  loginAccount = () => {
      var FName = this.state.UName;
      var UPass = this.state.UPass;
      if(FName == null || FName.trim() == ''){
        this.setState({loginEmailShowError: true});
        this.setState({loginEmailError: 'Email or user name required'});        
        return false;
        
      }else if(UPass == null || UPass.trim() == ''){
        this.setState({loginEmailShowError: false});
        this.setState({loginEmailError: ''});  
        this.setState({loginPassShowError: true});
        this.setState({loginPassError: 'Password required'});        
        return false;
      }else{
        this.setState({loginEmailShowError: false});
        this.setState({loginEmailError: ''});  
        this.setState({loginPassShowError: false});
        this.setState({loginPassError: ''});   
      }


      var signinFormData = JSON.stringify({
            email     : FName,
            password  : UPass,
            device_id : '123',
      });
      fetch(API + '/sessions/sign_in/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: signinFormData
      })
      .then(response => response.json())
      .then(responseData => {
        if(responseData.message){
          alert(responseData.message);
        }else{
          //alert(JSON.stringify(responseData));
          this.setState({loginAccount: false});
          setTimeout(() => {
            //alert("User loggedIn");
           
            this.setState({isLoggedIn: responseData.session_token});
            this.setState({FName: ''});
            this.setState({UPass: ''});
            AsyncStorage.setItem('isLoggedIn', responseData.session_token);
            this.props.navigation.navigate('Home');    
          }, 500);
        }
      });
  }

  errorStyle = function(options) {
   return {
     height: '83%',
   }
  }

  forgotPswdAccount = () => {
    var UEmail = this.state.UEmail;
    if(UEmail == null || UEmail.trim() == ''){
        this.setState({showPassError: true});
        this.setState({forgotPassErrorText: 'Required'});        
        return false;
    }else{
        this.setState({showPassError: false});
        this.setState({forgotPassErrorText: ''}); 
    }
    if (!this.validateEmail(UEmail)) {
      var data = JSON.stringify({
          user_name     : UEmail,
      });      
    } else {
      var data = JSON.stringify({
          email     : UEmail,
      });
    }
    
      fetch(API + '/sessions/forgot_password/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: data
      })
      .then(response => response.json())
      .then(responseData => {
         let msg = responseData.message;
    
         if(msg.search('ERROR') == 0){
            let error = (msg.split(':')[1].trim())
            this.setState({showPassError: true});
            this.setState({forgotPassErrorText: error}); 
         }else{
            this.setState({showPassError: false});
            this.setState({forgotPassErrorText: ''}); 
            alert(msg);
         }
        
      });
    
  }

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  };

  constructor(props){
    super(props);
    this.state = {
      createAccount: false,
      forgotPswdAccount: false,
      loginAccount: false,
      isFbLogin: false,
      FName: null,
      LName: null,
      UName: null,
      UEmail: null,
      UPass: null,
      Test: 'welcome',
      isLoggedIn: null,
      loginEmailError: '',
      loginPassError: '',
      loginEmailShowError: false,
      loginPassShowError: false,
      showPassError: false,
      forgotPassErrorText: '',
      registerUnameError: false,
      registerUname: '',
      registerEmailError: false,
      registerEmail: '',
      registerPassError: false,
      registerPass: '',
    }
  
  }


 
  render =() => {
    return (
    <Container>
    {/* header logo */}    

      <Header style={styles.header} >
        <Item style={styles.imgItem}  >
          <Image
            style={styles.imgStyle}
            source={require('../../assets/logo.png')}
            resizeMode="center"
            underlineColorAndroid='transparent'
          />
        </Item>
      </Header>

     {/* main page content and ( create a/c or login ) with the Facebook */}

      <View style={styles.container}>
        <View style={styles.headingH1}>
          <H1 style={styles.heading}>Discover new products and experiences on Superble</H1>
        </View>
        <View style={styles.mainAccountView}>
          <View style={styles.mainAccountSubView}>
            <Image source={require('../../assets/icon1.png')} style={styles.mainAccountIconList} resizeMode='contain' /><Text style={styles.subHeadingList} >Ask who you want for an opinion</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../../assets/icon2.png')} style={styles.mainAccountIconList} resizeMode='contain' /><Text style={styles.subHeadingList} >Build your own collection</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../../assets/icon3.png')} style={styles.mainAccountIconList} resizeMode='contain' /><Text style={styles.subHeadingList} >Collect points and build trust</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../../assets/icon4.png')} style={styles.mainAccountIconList} resizeMode='contain' /><Text style={styles.subHeadingList} >Help others and earn credits</Text>
          </View>
        </View>
        <View style={styles.secondryViewFb}>
          <View style={styles.viewFbLogin}>         
            <Button 
              block
              transparent
              style={styles.buttonFbLogin}
              onPress={this.fbAuth.bind(this)}
            >
              <Text style={styles.loginButtonFB}>Login with facebook</Text>
            </Button>
          {/* <LoginButton
              publishPermissions={["publish_actions"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        alert(data.accessToken.toString())
                      }
                    )
                  }
                }
              }
              onLogoutFinished={() => alert("logout.")}/> */}
        
            <Button 
              block
              transparent
              style={styles.buttonGLogin}
              onPress={this.googleAuth.bind(this)}
            >
              <Text style={styles.loginButtonG}>Log in with Google</Text>
            </Button>
              
          </View>
          <View style={styles.logincreateAccount}>
            <View style={styles.lcAccount}>
              <Button
                transparent
                onPress={ () => {this.setModalVisibleLogin(!this.state.loginAccount)} }
              >
                <Text style={styles.lcAccountText}>Login with email</Text>
              </Button>
            </View>
            <View style={styles.lcAccountA}>
              <Button
                transparent
                onPress={ () => {this.setModalVisible(!this.state.createAccount)} }
              >
                <Text style={styles.lcAccountAText}>Create account</Text>
              </Button>
            </View>
          </View>
        </View>

{/* create account with signup modal */}

        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.createAccount}
          presentationStyle={'overFullScreen'}
          onPressBackdrop={() =>  {this.handleModalClick()}}
          onRequestClose={() =>  {this.setModalVisible(!this.state.createAccount)}}
        >
          <TouchableWithoutFeedback onPress={() => { this.setModalVisible(!this.state.createAccount) }}>
            <View style={styles.createAccountMainView}>
              <TouchableWithoutFeedback>   
                 <View style={styles.createAccountStyle}>
                  <Container>
                  <H1 style={styles.createAccountHeader}>Create Account</H1>
                    <Content>
                      <Form>
                        <Grid>
                          <Col>                             
                            <Item floatingLabel>
                              <Label style={styles.createAccountLable}>First Name</Label>                        
                              <Input
                                onChangeText={(FName) => {this.setState({FName}); }}
                                value={this.state.FName}
                              />   
                            </Item>
                             
                            <Item floatingLabel>
                              <Label style={styles.createAccountLable}>Last Name</Label>
                              <Input 
                                onChangeText={(LName) => {this.setState({LName}); }}
                                value={this.state.LName}
                              />
                            </Item>
                          </Col>
                          <Col>
                            <Row style={{ elevation: 1, borderColor: '#ccc', shadowOpacity: 1, shadowColor: '#ccc', marginTop: 15, marginRight: 10, marginLeft: 10,  }}>
                              <Image
                                source={require('../../assets/camera.png')}
                                resizeMode='contain'
                                style={{width:'30%', height: '30%', position: 'absolute', top: '35%', left: '35%'}}
                              />
                            </Row>
                          </Col>
                        </Grid>
                        <Item floatingLabel>
                          <Label style={styles.createAccountLable}>Username</Label>
                          <Input 
                                onChangeText={(UName) => {this.setState({UName}); }}
                                value={this.state.UName}
                          />
                        </Item>
                        {this.state.registerUnameError == true && 
                            <View>
                                <Text style={{marginLeft:13,color:'red',marginTop:5}}>{this.state.registerUname}</Text>
                            </View>
                        }  
                        <Item floatingLabel>
                          <Label style={styles.createAccountLable}>Email</Label>
                          <Input 
                                onChangeText={(UEmail) => {this.setState({UEmail}); }}
                                value={this.state.UEmail}
                                placeholderTextColor="#ACBC4E"
                          />
                        </Item>
                        {this.state.registerEmailError == true && 
                            <View>
                                <Text style={{marginLeft:13,color:'red',marginTop:5}}>{this.state.registerEmail}</Text>
                            </View>
                        }  
                        <Item floatingLabel>
                          <Label style={styles.createAccountLable}>Password</Label>
                          <Input 
                              onChangeText={(UPass) => {this.setState({UPass}); }}
                              value={this.state.UPass}
                              secureTextEntry={true}
                              placeholderTextColor="#ACBC4E"
                          />
                        </Item>
                        {this.state.registerPassError == true && 
                            <View>
                                <Text style={{marginLeft:13,color:'red',marginTop:5}}>{this.state.registerPass}</Text>
                            </View>
                        }  
                        
                        <Button block transparent style={styles.createAccountButton} onPress={() => this.createAccount()}><Text style={styles.createAccountButtonText} >Sign up</Text></Button>
                      </Form>
                    </Content>
                  </Container>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

{/* login with email modal */}

        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.loginAccount}
          presentationStyle={'overFullScreen'}
          onRequestClose={() => {this.setModalVisibleLogin(!this.state.loginAccount)}}
        >
          <TouchableWithoutFeedback onPress={() => { this.setModalVisibleLogin(!this.state.loginAccount) }}>
            <View style={styles.loginAccountMainView}>
              <TouchableWithoutFeedback>
                <View style={styles.loginAccountStyle}>
                  <Container>
                  <H2 style={styles.loginAccountHeader}>Log In</H2>
                    <Content>
                      <Form>
                        <Item floatingLabel>
                          <Label style={styles.loginAccountLable}>Username or Email</Label>
                          <Input
                              onChangeText={(FName) => {this.setState({FName}); }}
                              value={this.state.FName}
                           />
                        </Item>
                        {this.state.loginEmailShowError == true && 
                            <View>
                                <Text style={{marginLeft:13,color:'red',marginTop:5}}>{this.state.loginEmailError}</Text>
                            </View>
                        }  
                        
                        <Item floatingLabel>
                          <Label style={styles.loginAccountLable}>Password</Label>
                          <Input
                              onChangeText={(UPass) => {this.setState({UPass}); }}
                              value={this.state.UPass}
                              secureTextEntry={true}
                           />
                        </Item>
                        {this.state.loginPassShowError == true && 
                            <View>
                                <Text style={{marginLeft:13,color:'red',marginTop:5}}>{this.state.loginPassError}</Text>
                            </View>
                        }  
                        
                        <Button block transparent style={styles.loginAccountButton} onPress={() => this.loginAccount()}><Text style={styles.loginAccountButtonText} >Log In</Text></Button>
                        <View style={styles.forgotPasswordView}>
                          <Button transparent onPress={ () => {this.setModalVisibleForgotPswdCloseLogin(!this.state.forgotPswdAccount, !this.state.loginAccount)}}><Text style={styles.forgotButtonText}>Forgot Password</Text></Button>
                        </View>

                      </Form>
                    </Content>
                  </Container>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

{/* forgot password modal */}

        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.forgotPswdAccount}
          presentationStyle={'overFullScreen'}
          onRequestClose={() => {this.setModalVisibleForgotPswd(!this.state.forgotPswdAccount)}}
        >
          <TouchableWithoutFeedback onPress={() => { this.setModalVisibleForgotPswd(!this.state.forgotPswdAccount) }}>
            <View style={styles.forgotPswdAccountMainView}>
              <TouchableWithoutFeedback>
                <View style={styles.forgotPswdAccountStyle}>
                  <Container>
                  <H1 style={styles.forgotPswdAccountHeader}>Forgot password</H1>
                    <Content>
                      <Form>
                        <Item floatingLabel>
                          <Label style={styles.forgotPswdAccountLable}>Username or Email</Label>
                          <Input
                            onChangeText={(UEmail) => {this.setState({UEmail}); }}
                            value={this.state.UEmail}
                          />   
                          
                        </Item>
                        {this.state.showPassError == true && 
                            <View>
                                <Text style={{marginLeft:13,color:'red',marginTop:5}}>{this.state.forgotPassErrorText}</Text>
                            </View>
                        }  
                        
                        <Button block transparent style={styles.forgotPswdAccountButton} onPress={() => this.forgotPswdAccount()}><Text style={styles.forgotPswdAccountButtonText} >Send me link</Text></Button>
                      </Form>
                    </Content>
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
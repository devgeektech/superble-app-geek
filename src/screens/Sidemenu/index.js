// import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Image, StyleSheet, TouchableOpacity, TouchableHighlight, AsyncStorage} from 'react-native';
import {DrawerNavigator, addNavigationHelpers, StackNavigator} from 'react-navigation';
import { 
    Container,
    Header, 
    Left, 
    Body, 
    Right, 
    Button, 
    Icon,
    Content,
    Footer,

} from 'native-base';

export default class SideMenu extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
          header: null,
          headerMode: 'none',
        }
    }

    //   navigateToScreen = (route) => () => {
    //     const navigateAction = NavigationActions.navigate({
    //       routeName: route
    //     });
    //     this.props.navigation.dispatch(navigateAction);
    //   }
  signOutUser = () => {
    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('loggedinUserData', '');   
    this.setState({isLoggedIn: null});
    this.props.navigation.navigate('Home',{ item: '1' });    
  }

  signInUser = () => {
  	  this.setState({ pressStatus: true });
     this.props.navigation.navigate('Account');    
     this.setState({ pressStatus: false });
  }
  userProfile = () => {
    this.setState({ pressStatus: true });
 this.props.navigation.navigate('Profile');    
 this.setState({ pressStatus: false });
}
  forceUpdateHandler(){
    this.forceUpdate();
  };
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: null,
      pressStatus: false,
      firstName: '',
      imgUrl: null,
    }
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  
  }
  
  componentDidMount(){
      AsyncStorage.getItem('isLoggedIn')
          .then( (value) => {
              if(value === null) {
                this.setState({isLoggedIn: null});
              } else {
                this.setState({isLoggedIn: value});
              }
      });
       
      AsyncStorage.getItem('loggedinUserData')
          .then( (value) => {
              if(value === null) {
                
              } else {
                var dataJson = JSON.parse(value);
                imgUrl = (dataJson.profile_object.url);
                this.setState({imgUrl: imgUrl});
                firstName = (dataJson.profile_object.first_name);
                this.setState({firstName: firstName});
              }
     });
  }

  render () {

    const isLoggedIn = this.state.isLoggedIn;
    var imgUrl = firstName ='';
    if(this.state.imgUrl != null){
      imgUrl = this.state.imgUrl;
    }else{
      imgUrl = 'https://forums.iboats.com/user/avatar?userid=503684&type=large';
    }
    AsyncStorage.getItem('isLoggedIn')
          .then( (value) => {
              if(value === null) {
                this.setState({isLoggedIn: null});
              } else {
                this.setState({isLoggedIn: value});
              }
    });
    
    return (
        <Container>
           
                { /*<Left>
                    <Image
                        resizeMode='contain'
                        source={require('../../assets/main.png')}
                        style={{height:70, width:50, paddingLeft:20}}
                    />
                </Left>

                <Body>
                    <Text style={{fontSize:15,color:'#666666'}}> Guest </Text>
                </Body>
                <Right>
                </Right> */}
              
								
									
							
			 {isLoggedIn !== null ? (	
                 <Header style={styles.header}>
	               <View style={styles.avatarWrap1}>	
	               												
								 <Image 
									style={styles.avatarWrap}
									resizeMode='cover'
									source={{uri : imgUrl}}
								/> 				
							
					</View>	
	                <Body>
	                	<View style={{width:'100%',paddingLeft:15}}>
	                    	<Text style={{fontSize:15,color:'#666666'}}> {this.state.firstName} </Text>
	                    </View>
	                    <View style={{flexDirection:'row',padding:10,marginTop:5}}>
	                    	<Image 
									style={{width:20,height:20}}
									resizeMode='cover'
									 source={require('../../assets/diamond.png')}
								/> 		
							<Text style={{fontSize:15,color:'#666666'}}> 0 </Text>
							<Image 
									style={{width:20,height:20}}
									resizeMode='cover'
									 source={require('../../assets/visibility.png')}
								/> 		
							<Text style={{fontSize:15,color:'#666666'}}> 1 </Text>
	                    </View>
	                </Body>
	                <Right>
	                	<Icon name="ios-notifications-outline" style={{top:-30}} />
	                </Right>
	                </Header>
                ) : (
                    <TouchableOpacity 
                	onPress={()=>this.userProfile()}>
                 <Header style={styles.header}>
	                	<Left>
		                    <Image
		                        resizeMode='contain'
		                        source={require('../../assets/main.png')}
		                        style={{height:70, width:50, paddingLeft:20}}
		                    />
		                </Left>

		                <Body>
		                    <Text style={{fontSize:15,color:'#666666'}}> Guest </Text>
		                </Body>
		                <Right>
		                </Right> 
	                </Header>
                    </TouchableOpacity>
                )}
            
       
        

	        
      
            {isLoggedIn !== null ? (
             <Content style={{flexDirection:'column',top:350}}>
	            <TouchableOpacity

              >
		            <Text style={styles.footerText}> How to Win Points </Text>
		        </TouchableOpacity>
		        <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Mybadges')}
            >
		            <Text style={styles.footerText}> My Badges </Text>
		        </TouchableOpacity>
		        <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Settings')}
            >
		            <Text style={styles.footerText}> Account Settings </Text>
		        </TouchableOpacity>
		        <TouchableOpacity>
		            <Text style={styles.footerText}> Invite Friends </Text>
		        </TouchableOpacity>
	           { /*  <TouchableOpacity onPress={()=>this.signOutUser()}>
	                <Text style={styles.footerText}> Sign Out </Text>   
	             </TouchableOpacity>   */}          
            </Content>
            ) : (
            <Container>
            <Content>
            </Content>
            <Footer style={styles.footer}>
            	<TouchableOpacity>
		            <Text style={styles.footerText}> How to Win Points </Text>
		        </TouchableOpacity>
                <TouchableOpacity 
                	onPress={()=>this.signInUser()}
                	style={ this.state.pressStatus ? styles.footerTextAreaHover : styles.footerTextArea }
                >
                    <Text style={styles.footerTextBottom}> Sign In </Text>   
                </TouchableOpacity>   
            </Footer> 
            </Container>
            )}
                        
        

        </Container>
    );
  }
}

// SideMenu.propTypes = {
//   navigation: PropTypes.object
// };

const styles = StyleSheet.create({
    header:{
        height:100,
        backgroundColor:'#fff',
    },
    footer:{
        flexDirection: 'column',
        backgroundColor:'#fff',
        top: -10,
        borderTopColor: 'transparent'
    },
    footerText:{
        color:'black',
        fontSize:16,
        paddingTop: 15,
        paddingBottom:15,
        paddingLeft: 15,
        fontWeight:'400',
    },
    footerTextArea:{
        backgroundColor: '#ffffff',
    },
    footerTextAreaHover:{
        backgroundColor: 'red',
    },
    footerTextBottom:{
    	color:'black',
        fontSize:16,
        paddingTop: 15,
        paddingBottom:35,
        paddingLeft: 15,
        fontWeight:'400',
    	marginBottom: 10,
    },
    avatarWrap1:{
		width: 60,
		height: 60,
		borderRadius: 50,
		zIndex:99,
		overflow: 'hidden',
		marginTop: 10,
	},
	avatarWrap:{
		width: 60,
		height: 60,
		zIndex:0,
	},
});
import React, { Component } from 'react';
import { Container, Header, View, Button, Icon, Fab, Content  } from 'native-base';
import { Image, TouchableWithoutFeedback,  } from 'react-native';
import styles from './fabStyleCss';
export default class FABExample extends Component {
  constructor(props) {
      super(props);
    this.state = {
      active: false
    };
  }
  render() {
    return (  
        // <View  style={styles.createAccountMainView}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{marginRight:15 }}
            style={{backgroundColor:'#ffffff'}}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            
                    <Image 
                        source={require('../../assets/main.png')}
                        style={{height:30, width:30}}
                    />
                    <Button style={{ backgroundColor: '#F6BE11' }}>
                    <Icon name="ios-add-circle-outline" />
                    </Button>
                    <Button style={{ backgroundColor: '#F6BE11' }}>
                    <Icon name="ios-chatbubbles-outline" />
                    </Button>
            
          </Fab>
        // </View> 
    );
  }
};

import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { StackNavigator,DrawerNavigator } from 'react-navigation';
import { Root, Fab } from "native-base";
import Account from './src/screens/account/index';
import Home from './src/screens/home/index';
import Product from './src/screens/product/index';
import Profile from './src/screens/profile/index';
import Article from './src/screens/article/index';
import Test from './src/screens/account/test';

import SideMenu from './src/screens/Sidemenu/index.js';

const deviceWidth  = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const headerHeight = (deviceWidth >= 375 ? 55 : 48 );

const ElementsDesign = StackNavigator({
    Home: {
        screen: Home    
    },
    Account: {
        screen: Account
    },
    Product: {
        screen: Product
    },
    Article:{
        screen: Article
    },
    Test: {
        screen: Home
    },
    Profile: {
        screen: Profile
    }
});
//export default ElementsDesign;


const MyDrawerNavigator = DrawerNavigator({
    ElementsDesign: { 
      screen: ElementsDesign,
    }
  },{      
    contentComponent: SideMenu,
    drawerWidth: 300,
});
  
  const AppNavigator = StackNavigator({
    Drawer: { screen: MyDrawerNavigator },
  }, {
    headerMode: 'none',
  });

export default () =>
  <Root>
    <AppNavigator />
  </Root>;


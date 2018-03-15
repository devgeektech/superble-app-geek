import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Container, Header, Left, View, Body, Right, Button, Icon, Title, H1, H2, H3, Label, Content,  Card, CardItem, Spinner} from 'native-base';
//import Hyperlink from 'react-native-hyperlink';
import Swiper from 'react-native-swiper';
import styles from './homeStyle';

const API = 'https://api-dev.superble.com/api/v1';
export default class RobotItem extends React.Component {
  constructor(props) {
    super(props);
    this.recordContent = this.props.record.content;
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  likePost(event){
    this.props.navigate('Account');
  }

  disLikePost(event){
    this.props.navigate('Account');
  }

  followLink(event){
    this.props.navigate('Account');
  }

  productClick(event){
    this.props.navigate('Product',{ item: event });
  }
  articleClick(event){
    this.props.navigate('Article',{ item: event });
  }
  render() {
    let title = desc = img = tags = '';

    /* Render titles */
    if(this.recordContent.type == 'product') {
      title = this.recordContent.title;
      desc  = this.recordContent.description;
      tags  = (this.recordContent.tags);
    }else{
      title = this.recordContent.product_titles[0];
    }

    /* Render images */
    if(this.recordContent.image_urls !== undefined) {
      img = this.recordContent.image_urls[0];
    }else{
      img = this.recordContent.image_url;
    }

    
    return (     

      <Card style={[styles.cardContainer, this.props.style]}>
          {/* Product top text */}
          {this.recordContent.type == 'product' &&
            <CardItem style={styles.parentCat}>
                <Text style={styles.topWrap}>
                  <H3 style={styles.catName}>{this.recordContent.parent_category_name}</H3>
                  <H3  style={styles.followLink} onPress={ () => this.followLink(this.recordContent.product_id) }>Follow</H3>
                </Text>
            </CardItem>
          }

          {/* Product images */}
          {this.recordContent.type == 'product' &&
              <TouchableOpacity onPress={()=>this.productClick(this.recordContent.product_id)}>
                  <Image style={styles.cardImage} source={require('../../assets/test1.jpg')} />
              </TouchableOpacity>
              // <Swiper style={styles.wrapper} onPress={ () => this.productClick(this.recordContent.product_id) } showsButtons={false}>
              //   <Image style={styles.cardImage} source={require('../../assets/test1.jpg')} />
              //   <Image style={styles.cardImage} source={require('../../assets/test.jpg')} />
              //   <Image style={styles.cardImage} source={require('../../assets/test1.jpg')} />
              // </Swiper>
              
          }
          {this.recordContent.type != 'product' &&
              <TouchableOpacity onPress={()=>this.articleClick(this.recordContent.product_id)}>
                <Image style={styles.cardImage} source={require('../../assets/test1.jpg')} />
              </TouchableOpacity>
          }

          {/* Product content */}
          {this.recordContent.type == 'product' &&
            <CardItem style={styles.socialSection}>
                <TouchableOpacity activeOpacity = { .5 } onPress={ () => this.likePost(this.recordContent.product_id) }>
                    <Image style={styles.heartImg} source={require('../../assets/heart1.png')}  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity = { .5 } onPress={ () => this.disLikePost(this.recordContent.product_id) }>
                    <Image style={styles.crossImg} source={require('../../assets/cross3.png')} />
                </TouchableOpacity>
            </CardItem>
          }
          {this.recordContent.type == 'product'? <CardItem><Text><H3>{title}</H3></Text></CardItem>: <CardItem style={styles.discoverText}><Text><H1 style={styles.discoverTextFormat}>{title}</H1></Text></CardItem>}
          {this.recordContent.type == 'product' &&
            <CardItem >
              <Text style={styles.subTitleProduct}>{desc}</Text>
            </CardItem>
          }

          {/* Product tags */}
          {this.recordContent.type == 'product' &&
            <CardItem >
              <Text style={styles.tags}>{tags}</Text>
            </CardItem>
          }
          {/* End */}
      </Card>

    );
  }
}

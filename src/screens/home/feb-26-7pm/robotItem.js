import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Container, Header, Left, View, Body, Right, Button, Icon, Title, H1, H2, H3, Label, Content,  Card, CardItem, Spinner} from 'native-base';
//import Hyperlink from 'react-native-hyperlink';
import Swiper from 'react-native-swiper';
import styles from './homeStyle';

// const API = 'https://api-dev.superble.com/api/v1';
const API = 'https://api-staging.superble.com/api/v1/';
export default class RobotItem extends React.Component { 
  constructor(props) {
    super(props);
    this.recordContent = this.props.record.content;
    this.state={
      status: true
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }
  likePost(event){
    this.props.navigate('Account');
  }

  RemovePost(itemID){
    this.setState({status: false});
    
    fetch(API+'products/'+itemID+'/delete_draft',{
      method:'POST',
      headers:{
        'Authorization':'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id=Y2QzZjJjNjU5N2YxNzM=',
				'Content-Type':'application/json'
      }
    }).then(function(res){
      if(res.ok){
        alert('Done')
      }
    }).catch(function(e){
      alert(e)
    })
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
    let title = desc = img = singleImg =tags = '';
    let imgArr=[];

    /* Render titles */
    if(this.recordContent.type == 'product') {
      title = this.recordContent.title;
      desc  = this.recordContent.description;
      tags  = (this.recordContent.tags);
      // this.recordContent.likes_count ? likes_count = this.recordContent.likes_count : likes_count=0
    }else{
      title = this.recordContent.product_titles[0];
    }

    /* Render images */
    singleImg = this.recordContent.first_image_url;
    if(this.recordContent.image_urls !== undefined) {
      imgArr.push(this.recordContent.image_urls);
    }else{
      // img = this.recordContent.image_url;
      imgArr.push(this.recordContent.image_url);
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
          {(this.recordContent.type == 'product' && this.state.status !== false ) &&         
              <ScrollView horizontal={true} pagingEnabled={true}>
              {
                imgArr.map((item, index)=>(
                  <TouchableOpacity key = {item} onPress={()=>this.productClick(this.recordContent.product_id)}>
                  <Image style={styles.cardImage} source={{uri : item}} />
                </TouchableOpacity> 
                ))
              }
              </ScrollView>
          }
          {this.recordContent.type != 'product' &&
               <TouchableOpacity onPress={()=>this.articleClick(this.recordContent.product_id)}>
                <Image style={styles.cardImage} source={{uri: singleImg}} />
              </TouchableOpacity> 
          }

          {/* Product content */}
          {(this.recordContent.type == 'product' && this.state.status !== false ) &&
            <CardItem style={styles.socialSection}>
              
                <TouchableOpacity style={{flexDirection:'row'}} activeOpacity = { .5 } onPress={ () => this.likePost(this.recordContent.product_id) }>
                  <Image style={styles.heartImg} source={require('../../assets/heart1.png')}  />
                </TouchableOpacity>
                {/* <Text style={{fontSize:25, paddingRight:15}}>{likes_count}</Text> */}
              
                <TouchableOpacity activeOpacity = { .5 } onPress={ () => this.RemovePost(this.recordContent.product_id) }>
                    <Image style={styles.crossImg} source={require('../../assets/cross3.png')} />
                </TouchableOpacity>
            </CardItem>
          }
          {this.recordContent.type == 'product'  && this.state.status !== false ? <CardItem><Text><H3>{title}</H3></Text></CardItem>: <CardItem style={styles.discoverText}><Text><H1 style={styles.discoverTextFormat}>{title}</H1></Text></CardItem>}
          {(this.recordContent.type == 'product'  && this.state.status !== false) &&
            <CardItem >
              <Text style={styles.subTitleProduct}>{desc}</Text>
            </CardItem>
          }

          {/* Product tags */}
          {(this.recordContent.type == 'product'  && this.state.status !== false) &&
            <CardItem >
              <Text style={styles.tags}>{tags}</Text>
            </CardItem>
          }
          {/* End */}
      </Card>

    );
  }
}

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
  articleClick(event){
    this.props.navigate('Article',{ item: event });
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
    alert('hi')
  }

  productClick(event){
    this.props.navigate('Product',{ item: event });
  }

  render() {
    let title = desc = img = singleImg =tags = '';
    let imgArr=[];
    // alert(this.recordContent.product_id);

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
                <Text
                  style={{color:'black',marginLeft:5, fontSize:18}}
                > {this.recordContent.parent_category_name} </Text>
                <Text
                  style={styles.followLink, {color:'black', marginLeft:200, fontSize:18}}
                  onPress={ () => this.followLink(this.recordContent.product_id) }>
                   Follow </Text>
            </CardItem>
          }

          {/* Product images */}
          {(this.recordContent.type == 'product' && this.state.status !== false ) &&         
              <ScrollView horizontal={true} pagingEnabled={true}>
              {
                imgArr.map((item, index)=>(
                  <TouchableOpacity key = {item} onPress={()=>this.productClick(this.recordContent.product_id)}>
                    <Image style={[styles.cardImage,  {marginTop: 20}]} source={{uri : item}} />
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
                  <Icon style={{margin:20,fontSize:30}} name="md-heart-outline" />
                </TouchableOpacity>
                {/* <Text style={{fontSize:25, paddingRight:15}}>{likes_count}</Text> */}
              
                <TouchableOpacity activeOpacity = { .5 } onPress={ () => this.RemovePost(this.recordContent.product_id) }>
                   <Icon name="md-close" style={{fontSize:30}}/>
                </TouchableOpacity>
            </CardItem>
          }
          {this.recordContent.type == 'product'  && this.state.status !== false ? 
            <CardItem>
              <Text style={{fontSize:20, color:'black'}}>
                  {title.length>40 &&(title.slice(0,40)+"...") }
                  {title.length<=40 &&(title)}
              </Text>
            </CardItem>
            : 
            <CardItem style={styles.discoverText}>
              {title.length <= 50 &&
                <Text style={styles.discoverTextFormat}>
                {title}
            </Text>
              }
              
              {title.length > 50 &&
                <Text style={{color:'#fff', fontSize:28, fontWeight:'bold'}}>
                {title}
            </Text>
              }

            </CardItem>}
          
          {(this.recordContent.type == 'product'  && this.state.status !== false) &&
            <CardItem style={{marginTop:-10}} >
              <Text style={styles.subTitleProduct}>
                {desc.length > 92 &&(desc.slice(0 , 92)+"...") }
                {desc.length <= 92 && (desc) }
              </Text>
            </CardItem>
          }

          {/* Product tags */}
          {(this.recordContent.type == 'product'  && this.state.status !== false) &&
            <CardItem style={{marginTop:-14}}>
              <Text style={styles.tags}>{tags}</Text>
            </CardItem>
          }
          {/* End */}
      </Card>
    );
  }
}

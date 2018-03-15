import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
   Dimensions,
   Animated
} from 'react-native';
import { Container, Header, Left, View, Body, Right, Button, Icon, Title, H1, H2, H3, Label, Content,  Card, CardItem, Spinner} from 'native-base';
//import Hyperlink from 'react-native-hyperlink';
import Swiper from 'react-native-swiper';
import styles from './homeStyle';
const { width } = Dimensions.get('window');
// const API = 'https://api-dev.superble.com/api/v1';
const API = 'https://api-staging.superble.com/api/v1/';
export default class RobotItem extends React.Component { 
    scrollX = new Animated.Value(0);
  constructor(props) { 
    super(props);
    this.recordContent = this.props.record.content;
    var count = this.props.count;
    this.state={
      status: true,
      likedHeart: false,
    }
  }
  
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  likePost(itemID){
    // this.props.navigate('Account');
    let { likedHeart } = this.state
    this.setState({likedHeart: !likedHeart})

    if(likedHeart == false){

      let statusData = JSON.stringify({ status: 'like' });
      fetch(API+'products/'+itemID+'/likes',{ 
        method:'POST',
        headers:{
          'Authorization':'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id=Y2QzZjJjNjU5N2YxNzM=',
          'Content-Type':'application/json'
        },
        body: statusData
      }).then(function(res){
        if(res.ok){
          alert('Product liked')
        }
      }).catch(function(e){
        alert(e)
      })
    
    }else{
      let statusData = JSON.stringify({ status: 'nolike' });
      fetch(API+'products/'+itemID+'/likes',{ 
        method:'POST',
        headers:{
          'Authorization':'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id=Y2QzZjJjNjU5N2YxNzM=',
          'Content-Type':'application/json'
        },
        body: statusData
      }).then(function(res){
        if(res.ok){
          alert('Product Noliked')
        }
      }).catch(function(e){
        alert(e)
      })
    }
  }
  articleClick(event){
    this.props.navigate('Article',{ item: event });
  }
  RemovePost(itemID){
    this.setState({status: false});
    let statusData = JSON.stringify({ status: 'unlike' });
    fetch(API+'products/'+itemID+'/likes',{ 
      method:'POST',
      headers:{
        'Authorization':'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id=Y2QzZjJjNjU5N2YxNzM=',
				'Content-Type':'application/json'
      },
      body: statusData
    }).then(function(res){
      if(res.ok){
        alert('Product Unliked')
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

  render() {
    let title = desc = img = singleImg =tags = '';
    let imgArr=[];

    let heart, heartIconColor;	
		if(this.state.likedHeart == true) {
			heart = 'ios-heart';
			heartIconColor= 'red'; 
		}else{ 
			heart = 'ios-heart-outline';
			heartIconColor='black';
    }

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
    var showDots = false;
    singleImg = this.recordContent.first_image_url;
    if(this.recordContent.image_urls !== undefined) {
      imgArr.push(this.recordContent.image_urls);
      showDots = true;
    }else{
      // img = this.recordContent.image_url;
      imgArr.push(this.recordContent.image_url);
    }
    let position = Animated.divide(this.scrollX, width);
    return (   
     
      <Card style={[styles.cardContainer]}>
        
     
          {/* Product top text */}
          {this.recordContent.type == 'product' &&
            <CardItem style={styles.parentCat}>
                <Left>
                    <Text
                      style={{color:'black',marginLeft:5, fontSize:18}}>
                        {this.recordContent.parent_category_name} 
                    </Text>
                </Left>
                <Right>
                    <Text
                      style={[styles.followLink, {color:'#000', fontSize:18, paddingRight:13, marginTop:-11}]}
                      onPress={ () => this.followLink(this.recordContent.product_id) }>
                       Follow 
                    </Text>
                </Right>
            </CardItem>
          }
          <CardItem style={{alignItems: 'center',marginHorizontal:-8.5,paddingHorizontal:-8.5,shadowColor: '#000',shadowOffset: { height: 4 },shadowOpacity: 0.8,shadowRadius: 5, }}>
            {/* Product images */}
            {(this.recordContent.type == 'product' && this.state.status !== false ) &&         
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> 
                <View style={{ width, height: width }}>       
                  <ScrollView horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event( 
                    [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] 
                    )}
                    scrollEventThrottle={16}
                  >
                  {
                    imgArr.map((item, index)=>(
                      <TouchableOpacity key = {item} onPress={()=>this.productClick(this.recordContent.product_id)}>
                        <Image style={[styles.cardImage,  {marginTop: 5}]} source={{uri : item}} />
                    </TouchableOpacity> 
                    ))
                  }
                  </ScrollView>
                  </View>
                  {showDots == true &&
                  <View style={{ flexDirection: 'row', position:'absolute', zIndex:999, bottom:18 }}>
                  
                    {imgArr.map((_, i) => {
                      let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1], 
                        outputRange: [0.3, 1, 0.3], 
                        extrapolate: 'clamp'
                      });
                      return (
                        <Animated.View
                          key={i}
                          style={{opacity, height: 10, width: 10, backgroundColor: '#ffffff', margin: 8, borderRadius: 5 }}
                        />
                      );
                    })}
                 
                  </View>
                }
                </View>
            }
            
            {this.recordContent.type != 'product' &&
                <ScrollView>
                  <TouchableOpacity onPress={()=>this.articleClick(this.recordContent.product_id)}>
                    <Image style={styles.cardImage} source={{uri: singleImg}} />
                  </TouchableOpacity> 
                </ScrollView>
            }
          </CardItem>
          {/* Product content */}
          {(this.recordContent.type == 'product' && this.state.status !== false ) &&
            <CardItem style={styles.socialSection}>
              
                <TouchableOpacity style={{flexDirection:'row'}} activeOpacity = { .5 } onPress={ () => this.likePost(this.recordContent.product_id) }>
                  <Icon style={{marginLeft:20,marginBottom:20,marginRight:10,fontSize:25, color:heartIconColor}} name={heart} />
                </TouchableOpacity>
                {/* <Text style={{fontSize:25, paddingRight:15}}>{likes_count}</Text> */}
              
                <TouchableOpacity activeOpacity = { .5 } onPress={ () => this.RemovePost(this.recordContent.product_id) }>
                   <Icon name="md-close" style={{marginBottom:20,fontSize:25,}}/>
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

import React from 'react';
import {Dimensions, Image, Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity, View, ScrollView, Picker } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, H1, H3, H2, Item, Input, Label, Content,  Card, CardItem, Spinner} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {DrawerNavigator, addNavigationHelpers, StackNavigator} from 'react-navigation';
import styles from './productStyle';
const API = `https://api-dev.superble.com/api/v1/`;
export default class Product extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
	      dataShow: false,
            record: null,
            commentData: null,
            productId: null,
            searchText: '',
            commentHtml: '',
            saveCommentText: '',
        };
        
	}
	static navigationOptions = ({ navigation, screenProps }) => ({
        header:null
	});	
//https://api-dev.superble.com/api/v1/products/1732/questions
    componentDidMount() {
		const { params } = this.props.navigation.state;
		//let productId    = params.item;
		let productId    = 1752;
		this.setState({ productId: productId});
		// Get comments data
        fetch(API+"products/"+productId+"/questions")
		.then(response => response.json())
		.then(record => {
			//alert(JSON.stringify(record.questions));
			this.setState({ commentData: record});
			this.commentLaps();
        });
        

		// Get product data
		fetch(API+"products/"+productId)
		.then(response => response.json())
		.then(record => {
			this.setState({ record });
        });   

    }

    commentLaps = (commentDataNew = null) => { 
    	var commentData  = this.state.commentData;
    	if(commentDataNew != null){
    		var commentData  = commentDataNew;
    	}
    	
    	let articles     = null;
    	if(commentData !== null){
    		var comments = (commentData.questions);
		    articles     = comments.map((articleData, index) => {		    
                return (
                  <View style={styles.imageCommentWrap}>
                  				
							<View style={styles.avatarContainer}>
								<View style={styles.avatarWrap1}>
									{ articleData.user.image_url != null &&
										 <Image 
											style={styles.avatarWrap}
											resizeMode='contain'
											source={{uri: articleData.user.image_url}} 
										/> 
									}
								</View>	
							</View>													
							<View style={styles.contentContainer}>
								<Text style={{lineHeight:0}}>
									<H1 style={[styles.text, styles.name]}>{articleData.user.user_name}</H1>
									{'\n'}
									<Text style={styles.commentText}>{articleData.question_text}</Text>
								</Text>
							</View>
							<View style={styles.likeImgContainer}>
								<TouchableHighlight onPress={() => this.searchComment('for')}>
									<Image 
										style={styles.likeImage}
										resizeMode='contain'
										source={require('../../assets/main.png')} 
									/>
								</TouchableHighlight>
									<Text style={styles.likeText}>{articleData.likes} like</Text>
							</View>	

					</View>
                )
            });
		}

		//return articles;
		this.setState({ commentHtml: articles});
    }

    likeComment = (value) =>{
    	alert(value);
    }
  	
  	searchComment = (text) => {
  	  this.setState({ searchText: text});
  	  let productId = this.state.productId;
	  	  fetch(API+`search/question_search?product_id=${productId}&text=${text}`)
	      .then(response => response.json())
	      .then(responseData => {
	      		if(responseData.message){
	      			//alert(responseData.message)
	      			this.commentLaps(null);
	      		}else{
	      			this.commentLaps(responseData);
	      		}
		   });
  	}

  	syncComment = () => {
  		let productId = this.state.productId;
  		fetch(API+"products/"+productId+"/questions")
		.then(response => response.json())
		.then(record => {
			//alert(JSON.stringify(record.questions));
			this.setState({ commentData: record});
			this.commentLaps();
        });
  	}

  	saveComment = () => {
  		let text 	  = this.state.saveCommentText;
  		let productId = this.state.productId;
  		var data =  JSON.stringify({
          				text  	: text,
	      		    });
	   	    
	      fetch("https://api-staging.superble.com/api/v1/products/"+productId+"/questions/comment", {
	          method: 'POST',
	          headers: {
	          	'Authorization': 'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id=Y2QzZjJjNjU5N2YxNzM=',
	            'Content-Type': 'application/json',
	          },
	          body: data
	      })
	      .then(response => response.json())
	      .then(responseData => {
	      			
	      			alert(responseData.message)	      		
	      			this.syncComment();
	      			this.setState({ saveCommentText: ''});
	      		        
	      });
  	}

	render() {
		const { record } = this.state;		
		const { commentHtml } = this.state;	
		//alert(commentHtml)
        return (
	    	<View style={styles.pageContainer}>
	    	
			{record !== null ? (
				<ScrollView	> 
				
							<Content style={{height:300}}>
								<View style={{height:300}}>
										<View style={styles.productImg}>
											<Image style={{width: 432, height: 300}} source={{uri: record.product.image_urls[0]}} />
										</View>
										<View style={styles.backArrow}>
											
											<View style={styles.backArrowWrap}><TouchableOpacity style={styles.backArrow} onPress={ () => { this.props.navigation.goBack() }}><Image style={styles.backArrowImg} source={require('../../assets/left-arrow.png')} /></TouchableOpacity></View>
											<View style={styles.dotsWrap}><Image style={styles.settingArrowImg} source={require('../../assets/dots.png')} /></View>
											
										</View>
								</View>
							</Content>					
							<View style={styles.viewIcon}>
								<View style={styles.viewPro}><Image style={styles.backArrowImg} source={require('../../assets/visibility.png')} /></View><Text style={styles.viewProText}>3</Text>
								<View style={styles.heartPro}><Image style={styles.settingArrowImg} source={require('../../assets/heart2.png')} /></View><Text style={styles.heartProText}>4</Text>
							</View>
							<View style={styles.proDetailWrap}>
								<View><Text style={styles.proTitle}>{record.product.title}</Text></View>
							</View>
							<View style={styles.askBtnWrap}>
								<View style={styles.askBtn}>
									<Button 
										block
										transparent
										style={styles.askBtn1}
									>
										<Text style={styles.askBtnText}>ASK HERE!</Text>
									</Button>					
								</View>									
							</View>
						
							<View style={styles.commentWrap}>
								<View style={styles.commentContainer}>
												                          
									<View style={styles.inputContainer}>
										<TextInput underlineColorAndroid='transparent' placeholder="Search" style={styles.searchInput} onChangeText={(searchText) => {this.searchComment(searchText); }} value={this.state.searchText}														
										/>
							
									</View>												
									
									<View style={{maxHeight:500,overflow:'hidden'}}>
										<ScrollView	> 										
											{commentHtml}									
										</ScrollView> 
									</View>	
									
									<View style={styles.imageCommentWrap}>
										<View style={styles.writeCommentWrap}>
											<TextInput placeholder="Write a comment" style={styles.commentInput} underlineColorAndroid='transparent' onChangeText={(saveCommentText) => {this.setState({saveCommentText}); }} value={this.state.saveCommentText}/>
										</View>
										<View style={styles.sendButtonWrap}>
											<Button style={styles.sendButton} onPress={ () => { this.saveComment() }}><Text style={styles.sendBtnText}>SEND</Text></Button>	
										</View>
									</View>										
											
											
								</View>
								
							</View>
							{ /* Related article section */ }
						 
							<View style={styles.relatedArticleSection}>
								<View style={styles.relatedArticleWrap1}>
									{ /*<View style={styles.relatedArticleWrap}>
										<View style={styles.relatedLeftTitle}>
											<Text style={styles.relatedTitle}>Related Articles</Text>
										</View>
										<View style={styles.relatedRightLink}>
											<Text style={styles.relatedTitleLeft, styles.relatedTitle}>View All</Text>
										</View>
									</View>
									<View style={styles.articleList}>
										<View><Text>First imageCommentWrap</Text></View>
										<View><Text>First imageCommentWrap</Text></View>
										<View><Text>First imageCommentWrap</Text></View>
										<View><Text>First imageCommentWrap</Text></View>
										<View><Text>First imageCommentWrap</Text></View>
									</View>
									*/ }
								</View>
							</View>
						
							
							
					</ScrollView>
				
				) : (
					<View style={{flex:1, flexDirection: 'column',justifyContent: 'center',alignItems: 'center',}}>
						<Spinner color="#00C497" key={Math.random()}/>
					</View>
				)}
		    </View>
			
		);
	}

}
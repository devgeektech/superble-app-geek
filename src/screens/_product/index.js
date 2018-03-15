import React from 'react';
import {Dimensions, 
		Image, 
		Modal, 
		StyleSheet, 
		Text, 
		TextInput, 
		TouchableWithoutFeedback, 
		TouchableHighlight, 
		TouchableOpacity, 
		View, 
		ScrollView, 
		Picker,
		FlatList,
		Linking,
	} from 'react-native';

import { Container,
		Header, 
		Left, 
		Body, 
		Right, 
		Button, 
		Icon, 
		Title, 
		H1, 
		H3, 
		H2, 
		Item, 
		Input, 
		Thumbnail,
		Label, 
		Content,  
		Card, 
		CardItem, 
		Toast,
		Spinner,
		CheckBox
	} from 'native-base';
import GridView from "react-native-super-grid";
import { Col, Row, Grid } from 'react-native-easy-grid';
import {DrawerNavigator, addNavigationHelpers, StackNavigator} from 'react-navigation';
import styles from './productStyle';

// import DeviceInfo from 'react-native-device-info';
// const deviceId = DeviceInfo.getUniqueID();
	
// const API = `https://api-dev.superble.com/api/v1/`;
const API = `https://api-staging.superble.com/api/v1/`;
const device_id ='Y2QzZjJjNjU5N2YxNzM=';
const token = 'bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3';
let selectedFriendsList = [];
let selectAllFriendsList= [];

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
			relatedArticles:[],
			similerProductsCategories:[],
			similerProductsBrands:[],
			contry:'',
			modalVisible: false,
			friendsData:[],
			selectAllCheckBoxes: false,
			showToast: false,
			likedHeart: false
        };
	}
	static navigationOptions = ({ navigation, screenProps }) => ({
        header:null
	});	
	
//https://api-dev.superble.com/api/v1/products/1732/questions
    componentDidMount() {
		const { params } = this.props.navigation.state;
		let productId    = params.item;
		this.setState({ productId: productId});
		// Get comments data
        fetch(API+"products/"+productId+"/questions")
		.then(response => response.json())
		.then(record => {
			this.setState({ commentData: record});
			this.commentLaps();
		});

		// Get product data
		fetch(API+"products/"+productId)
		.then(response => response.json())
		.then(record => {
			this.setState({ record });
		});   
		
		this.fetchRelatedArticles(productId);
		this.getSimilerProductsCategories(productId);
		this.getSimilerProductsBrands(productId);

	}

	getSimilerProductsCategories = (productId) =>{
		fetch("https://api-staging.superble.com/api/v1/products/"+productId+"/related_products?type=category_id",{
			method:"GET"
		})
		.then((res)=>res.json())
		.then(resdata=>{
			this.setState({similerProductsCategories: resdata.data})
		})
	}

	getSimilerProductsBrands = (productId) =>{
		fetch("https://api-staging.superble.com/api/v1/products/"+productId+"/related_products?type=brand_id",{
			method:"GET"
		})
		.then((responce)=>responce.json())
		.then(responcedata=>{
			this.setState({similerProductsBrands: responcedata.data})
		})
	}
	
	fetchRelatedArticles=(productId)=>{
		fetch(`https://api-dev.superble.com/api/v1/discoveries/${productId}/related_articles`,{
			method:'GET'
		})
		.then((ress)=>ress.json())
		.then(resDataa =>{
			this.setState({relatedArticles: resDataa.data})
		})
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
                  <View key={articleData.id} style={styles.imageCommentWrap}>
                  				
							<View style={styles.avatarContainer}>
								
									{ articleData.user.image_url != null &&
										 <Image 
											style={styles.avatarWrap}
											resizeMode='contain'
											source={{uri: articleData.user.image_url}} 
										/> 
									}
							
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
  	  //alert(text)
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
				// 'Authorization': 'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id='+device_id,
	            'Content-Type': 'application/json',
	          },
	          body: data
	      })
	      .then(response => response.json())
	      .then(responseData => {
	      			// alert(responseData.message)	      		
	      			this.syncComment();
	      			this.setState({ saveCommentText: ''});
	      });
  	}

	openModal() {
		let productId = this.state.productId;
		this.setState({modalVisible:true});
		fetch("https://api-staging.superble.com/api/v1/friends?product_id="+productId,{
			headers:{
				'Authorization':'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id=Y2QzZjJjNjU5N2YxNzM=',
				// 'Authorization':'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id='+deviceId,
				'Content-Type':'application/json'
			}
		})
		.then((responce)=>responce.json())
		.then((resData)=>{
			let modifiedData = [];
			for(i=0; i<resData.friends.length; i++){
				let item = resData.friends[i];
				item.index = i;
				item.isSelect = false;
				modifiedData.push(item);
			}
			this.setState({friendsData:modifiedData});
		})
	}
	
	closeModal = () => {
		this.setState({modalVisible:false});
		// Toast.show({
		// 	text: 'Invited successfully!',
		// 	position: 'bottom'
		//   })
		// alert('Invited successfully!')
	}

	checkAllBoxes = () =>{
		const { friendsData, selectAllCheckBoxes } = this.state;
		friendsData.map(i =>{
			selectAllFriendsList.push(i.user.id)
			i.isSelect = !selectAllCheckBoxes;
		})
		this.setState(friendsData);
		this.setState({ selectAllCheckBoxes: !selectAllCheckBoxes })
	} 

	clickOnSingleCheckbox = (item) =>{
		const { friendsData }= this.state;
		selectedFriendsList.push(item.user.id);
		// alert(JSON.stringify(selectedFriendsList))
		friendsData[item.index]['isSelect'] = !friendsData[item.index]['isSelect'];
 		this.setState(friendsData);
	}

	sendAPItoPostFriendsList= () =>{
		let mainArray=[]
		let productId = this.state.productId;
		selectedFriendsList.length>=1  ? mainArray = selectedFriendsList  : null;
		selectAllFriendsList.length>=1 ? mainArray = selectAllFriendsList : null;

		selectedFriendsList = []
		selectAllFriendsList= []

		var arrString = mainArray.join('&user_ids[]='); 
		arrString = '&user_ids[]=' + arrString;

		fetch(`https://api-staging.superble.com/api/v1/requests?product_id=${productId}${arrString}`,{
			method: 'POST',		
			headers:{
				'Authorization':'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id=Y2QzZjJjNjU5N2YxNzM=',
				// 'Authorization':'Token token=bb6b2728-ceb4-4b19-b9ec-833b0e66a7d3;device_id='+deviceId,
				'Content-Type':'application/json'
			}
		}).then(function(responce){
			if(responce.ok){
					alert('Invited successfully !')
					// this.closeModal();
			}
		}).catch(function() {
			alert('Some error occured!')
			// this.closeModal();
		});

		mainArray=[]
	}

	likeProduct = ()=>{
		this.setState({likedHeart: !this.state.likedHeart})
	}

	render() {
		const { record } = this.state;		
		const { commentHtml } = this.state;
		let heart, heartIconColor;	
		
		if(this.state.likedHeart == true) {
			heart = 'ios-heart';
			heartIconColor= 'red'; 
		}else{ 
			heart = 'ios-heart-outline';
			heartIconColor='black';
		}
			
        return (
	    	<View style={styles.pageContainer}>
	    	
			{record !== null && commentHtml !== null ? (
				<ScrollView	> 
					<Modal
						visible={this.state.modalVisible}
						animationType={'fade'}
						presentationStyle="overFullScreen"
						onRequestClose={() => this.closeModal()}
          			>
      			  <TouchableWithoutFeedback onPress={() => { this.closeModal() }}>
		            <View style={styles.createAccountMainView}>
		              <TouchableWithoutFeedback>  
					  <ScrollView>
						<Card style={{maxHeight: 470, marginTop:70, marginLeft:15, marginRight:15}}>
							<CardItem>
								<Left>
									<Text style={{color:'#000'}}>Select All</Text>
								</Left>
								<Right>
									<CheckBox style={{marginRight:3}} checked={this.state.selectAllCheckBoxes} onPress={()=>{this.checkAllBoxes()}} />
								</Right>
							</CardItem>
							<View style={{marginTop: 5, marginBottom: 5,backgroundColor: 'gray',height: 1,width: '100%'}} />
							<FlatList
								data={this.state.friendsData}
								extraData={this.state}
								keyExtractor={(item, index) => index}
								renderItem={({item}) =>								
								<CardItem>
									<Left>
										<Thumbnail small source={{uri: item.user.profile_pic_url}} />

										<View style={{flexDirection:'column', marginLeft:17}}>
											<Text style={{color:'#000', fontSize:15}}> {item.user.name} </Text>
											<View style={{flexDirection:'row', paddingTop:4}}>
												<Image
													source={require('../../assets/diamond.png')} 
													style={{height:22, width:22}}
												/>
												<Text style={{color:'#333333'}}> {item.points} </Text>
											</View>
										</View>
									</Left>

									<Right style={{flexDirection:'row', marginRight:-170}}>
										<Thumbnail
											small
											source={{uri : item.badge.image_url}}
										/>
										<View> 
											<CheckBox style={{top:-8}} checked={item.isSelect} onPress={()=> this.clickOnSingleCheckbox(item)} />
										</View>
									</Right>
								</CardItem>
								}
							/>
							<View>
								<Button
									transparent
									block
									style={{borderRadius: 10, borderWidth: 1, borderColor: 'black', marginBottom:10, marginHorizontal:12}}
									onPress={()=>this.sendAPItoPostFriendsList() } >
									<Text> Invite to chat </Text>
								</Button>
							</View>
						</Card>	
						</ScrollView>	
						
						</TouchableWithoutFeedback>
			            </View>
			          </TouchableWithoutFeedback>
					</Modal>

					<Content style={{height:300}}>
						<View style={{height:300}}>
							<View style={styles.productImg}>
							
								<Image 
									style={{width: 432, height: 300}} 
									source={{uri: record.product.image_urls[0]}} 
								/>
							</View>
							<View style={styles.backArrow}>	
								<View style={styles.backArrowWrap}>
									<TouchableOpacity 
										style={styles.backArrow} 
										onPress={ () => { this.props.navigation.goBack() }}>
										<Icon name='md-arrow-back' />
									</TouchableOpacity>
								</View>
								<View style={styles.dotsWrap}>
									{/* <Image 
										style={styles.settingArrowImg} 
										source={require('../../assets/dots.png')} 
									/> */}
									<Icon name='ios-more' style={styles.settingArrowImg}  />
								</View>
							</View>
						</View>
					</Content>					
							<View style={styles.viewIcon}>
								<View style={styles.viewPro}>
									<Image 
										style={styles.backArrowImg} 
										source={require('../../assets/visibility.png')} />
								</View>
								<Text style={styles.viewProText}> {record.product.view_count} </Text>

								<View style={styles.heartPro}>
								<TouchableHighlight onPress={() => this.likeProduct()}>
										<Icon name={heart} style={{color:heartIconColor}} />
								</TouchableHighlight>
								</View>
								
								<Text style={styles.heartProText}> {record.product.like_count} </Text>
							</View>
							
							<View style={styles.proDetailWrap}>
								<View>
									<Text style={styles.proTitle}>{record.product.title}</Text>
								</View>
							</View>
							
							<View style={styles.askBtnWrap}>
								<View style={styles.askBtn}>
									<Button 
										block
										transparent
										style={styles.askBtn1}
										onPress={()=>this.openModal()}
									>
										<Text
											style={styles.askBtnText}											
											>ASK HERE!</Text>
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
											 {/* {commentHtml} */}
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

							<View>
								<Card>
										<Picker
											style={{width:'70%'}}
											selectedValue={this.state.contry}
											onValueChange={(itemValue, itemIndex) => this.setState({contry: itemValue})}>
											<Picker.Item label="United States" value="usa" />
											<Picker.Item label="Singapore" value="singapore" />
										</Picker>

									<CardItem 
										style={{borderBottomWidth:1, borderBottomColor:'gray', borderRadius: 1, paddingBottom:30, paddingTop:20}}
									>
										<Left>
											<Image 
												source={require('../../assets/logo.png')}
												resizeMode="contain"
												style={{width:120, height:50}}/>
										</Left>
										
											<Text style={{fontSize:13, paddingLeft:15, fontWeight:'bold'}}>ONLY {record.product.points} POINTS !!!</Text>
										<Right>		
												<Text style={{color: '#40c4ff',fontSize:15}}
													onPress={() => alert(item.id)}>
													BUY NOW
												</Text>
										</Right>
									</CardItem>

									{record.product.multi_url.map((e)=>(
										<View key={e.url}>
											<CardItem style={{paddingTop:27, paddingBottom:27}}>
												<Left>
													<Image 
														source={{uri: e.url_img}}
														resizeMode="contain"
														style={{width:120, height:50}}/>
												</Left>
											<Right>
												<Text style={{color: '#40c4ff',fontSize:15}}
													onPress={() => Linking.openURL(e.url)}>
													BUY NOW
												</Text>
											</Right>
											</CardItem>
									</View>
									))}
								</Card>
							</View>

							<View style={{marginTop: 10, marginBottom: 10,backgroundColor: 'gray',height: 1,width: '100%'}} />

							<View>
								<Card style={{paddingBottom:15, paddingTop:15}} >
									{record.product.category.name !== undefined && (
										<Text style={{color:'black', fontSize:15, paddingBottom:10, paddingTop:15, paddingLeft:20}}>
										Others from {record.product.category.name}</Text>
									)}
									
									<GridView
										itemDimension={1000}
										horizontal={true}
										items={this.state.similerProductsCategories}
										renderItem={item => (
										<Image
											resizeMode="contain"	
											source={{ uri: item.image_url }} 
											style={{ height: 100, width: 150 }} />
									)}
									/>
								</Card>
							</View>

							<View>
								<Card>
									<Text style={{color:'black', fontSize:15, paddingBottom:10, paddingTop:15, paddingLeft:20}}>
										Others from {this.state.similerProductsCategories[0].brand_name}</Text>
									<GridView
										itemDimension={1000}
										horizontal={true}
										items={this.state.similerProductsBrands}
										renderItem={item => (
										<Image 
											resizeMode="contain" 
											source={{ uri: item.image_url }} 
											style={{ height: 100, width: 150 }} />
									)}
									/>
								</Card>
							</View>


							{ /* Related article section */ }
							<View>
								<Card style={{paddingBottom:18, marginBottom:30}}>
									<View style={{flexDirection:'row', 
										justifyContent:'space-between',
										paddingVertical :20,
										paddingHorizontal:10}}>
										<Text style={{color:'#000'}}> Related Articles </Text>
										<Text style={{color: '#40c4ff'}}> View All </Text>
									</View>
									
									<FlatList
										data={this.state.relatedArticles}
										keyExtractor={(item, index) => index}
										renderItem={({item}) =>
											<Text style={{color: '#40c4ff',fontSize:15, paddingBottom:15, paddingHorizontal :10}}
												onPress={() => alert(item.id)}>
												{item.title}
											</Text>
										}
									/>
								</Card>
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

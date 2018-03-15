const React = require("react-native");
const { Dimensions, Platform } = React;
import color from "color";
const deviceWidth  = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const headerHeight = (deviceWidth >= 375 ? 55 : 48 );
const widthEighty  = (deviceWidth*90/100);
export default {
	/* header */
	header: {
	      backgroundColor: "#fff",
	      elevation: 0,
	},
	backArrow:{
		zIndex: 100,
		top:5,
		left:5,
		right:5,
	},
	productImg:{
		position: 'absolute',
	},
	pageContainer:{
		margin:3,
		width: deviceWidth,
		backgroundColor:"#f2f2f2",
		flex:1
	},
	belowWrap:{
		backgroundColor:"#fff",
	},
	backArrowImg:{
		
	},
	settingArrowImg:{
	},
	backArrowWrap:{
		width:25
	},
	dotsWrap:{
		width:25,
		right:15,
		top:-12,
		flexDirection: 'row',
		alignSelf: 'flex-end',  
	},
	flexWrapper:{
		flex: 1,
		flexDirection:'column',
		marginLeft:5,
		marginTop:30,
		height:20		
	},
	viewIcon:{
		flex: 1,
		flexDirection:'row',
		marginLeft:5,
		marginTop:30,
	},
	viewPro:{
		margin:10
	},
	viewProText:{
		margin:10,
		fontSize: 20
	},
	heartPro:{
		margin:10,		
	},
	heartProText:{
		margin:10,
		fontSize: 20
	},
	proDetailWrap:{
		flexDirection:'row',
		marginLeft:5,
	},
	proTitle:{
		marginLeft:5,
		fontSize:23
	},
	askBtnWrap:{
		alignItems: 'center',
		justifyContent:'center',
		width:'100%',
		marginTop: 15,
		marginBottom: 15,
		
	},
	askBtn:{		
		borderWidth: 1,
		borderColor: '#B1BC44',
		width: '90%',
		backgroundColor: '#ffffff'
	},
	askBtnText:{
		color:'#B1BC44',
		fontSize:13,
		fontWeight: 'bold',
	},
	commentWrap:{
		alignItems: 'center',
	},
	commentContainer:{
		width:"90%",
		backgroundColor: "#fff",
	
	},
	commentContentWrap:{
		padding:10
	},

	searchInput:{
		height: 50,
		backgroundColor: '#ffffff',
		fontSize:15,
		padding:10,		
		borderBottomWidth: 0.5,
		borderLeftWidth: 0.5,
		borderRightWidth: 0.5,
		borderTopWidth: 0.5,
		borderTopColor: '#996633',
		borderBottomColor: '#996633',
		borderLeftColor: '#996633',
		borderRightColor: '#996633',
	},
	inputContainer:{
		height: 50,
	},
	imageCommentWrap:{
		flex: 1,
		flexDirection:'row',
		backgroundColor: '#ffffff',
		width: 'auto',
		marginTop: 20,
	},

	avatarContainer:{
		alignItems: 'center',
		width:"30%",
		top:20,

	},

	contentContainer:{
		width:"50%",
			
	},

	likeImgContainer:{
		width: '20%',
		alignItems: 'center',
		top:20,
	},

	writeCommentWrap:{
		width:"70%",
	},
	sendButtonWrap:{
		width:"30%",
	},

	avatarWrap1:{
		width: 60,
		height: 60,
		borderRadius: 50,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderTopWidth: 1,
		zIndex:99,
		overflow: 'hidden'
	},
	avatarWrap:{
		width: 60,
		height: 60,
		zIndex:0,
	},
	name:{
		color: '#666666',
		fontSize:15,
		fontWeight:'bold'
	},
	commentText:{
		color: '#666666',
		fontSize: 12,
		textAlign: 'justify',
    	lineHeight: 0,
	},
	likeImage:{
		width: 30,
		height: 30,
	},
	
	likeText:{
		paddingLeft:10,
		fontSize:12,
	},
	commentInput:{
		height: 50,
		backgroundColor: '#ffffff',
		fontSize:15,
		padding:10,		
		borderBottomWidth: 0.5,
		borderLeftWidth: 0.5,
		borderRightWidth: 0.5,
		borderTopWidth: 0.5,
		borderTopColor: '#996633',
		borderBottomColor: '#996633',
		borderLeftColor: '#996633',
		borderRightColor: '#996633',
	},
	sendButton:{
		height: 50,
		backgroundColor: '#B1BC44',
		width:'100%',
		justifyContent:'center',
		borderRadius:0,
	},
	sendBtnText:{
		color: '#ffffff',
		fontSize:15,
	},
	countrySelectWrap:{
		padding:10,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderTopColor: '#666666',
		borderBottomColor: '#666666',
		borderLeftColor: '#666666',
		borderRightColor: '#666666',
		
	},
	// Related article section
	relatedArticleSection:{
		alignItems: 'center',

	},

	relatedArticleWrap:{
		width:"90%",
		backgroundColor: "#fff",
		flex: 1,
		flexDirection:'row',
		backgroundColor: '#ffffff',
		top: 20,
	
	},
	relatedLeftTitle:{
		width: '70%',
	},
	relatedRightLink:{
		width: '30%',		
	},	
	relatedTitleLeft:{
		color: '#74bced',
	},
	relatedTitle:{
		fontSize:20,
		fontWeight:'500',
		color:'#666666',
		paddingLeft: 10,
	},
	articleList:{
		width: '100%'
	}
	
};
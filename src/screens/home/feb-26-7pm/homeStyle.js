const React = require("react-native");
const { Dimensions, Platform } = React;
import color from "color";

const deviceWidth  = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
	/* header */
	header: {
	      backgroundColor: "#fff",
	      elevation: 0,
	      height: 100,

	},
	menuIcon:{
		color: "#000",
	},
	homeMenu:{
		backgroundColor: "#fff",
		
	},
	searchBtn:{
		backgroundColor: "#fff"
	},
	searchIcon:{
		color: "#000"
	},
	title:{
		textAlign: 'center',
	
	},
	titleText:{
		textAlign: 'center',
		color: "#000",
		fontSize: 24,
		fontWeight: "bold",
	},
	subTitleText:{
		color: "#000",
		fontSize: 10,
		fontWeight: "normal",
	},
	titleBody:{
		width: "100%",
		alignItems: 'center'
	},
	/* body */
	container: {    
	    backgroundColor: '#fff',
	    flex: 1, 
	    marginTop: 3,
	},
	containerPost:{
		flex: 1,
		marginBottom: 5
	},
	imgWrapper:{
		height:"100%",
		width:"100%",
	},
	/* Cards*/
	cardOuterContainer:{
		backgroundColor:"#000"
	},
	/* products and articles body */	
	cardContainer: {
		marginBottom:1,
		backgroundColor: 'rgba(52, 52, 52, 0.8)'
	},
	cardImage:{
	  resizeMode: 'cover',
	  margin:3,
	  flexGrow:1,
	  alignItems: 'center',
	  justifyContent:'center',
	  height: 400,
	  width:400
	},
	discoverText: {
	  top:' 24%',
	  position: 'absolute',
	  width: '100%',
	  backgroundColor: 'transparent',
	  alignItems: 'center',
	  justifyContent:'center',
	  
	},
	discoverTextFormat:{
	  color: "#ffffff",
	  fontSize: 25,
	  fontWeight: "bold",
	},
	socialSection:{
	  marginBottom: -20,
	  marginLeft: -10,
	},
	heartImg:{
	  margin:20,
	},
	catName:{
	  alignContent: 'flex-start',
	},
	followLink:{    
	  alignContent: 'flex-end',
	},
	topWrap:{
	  width:'100%',
	  flex:1,
	},
	parentCat:{
	  position:'absolute',
	  top:'5%',
	  width:'100%',
	  backgroundColor:'transparent'
	},
	subTitleProduct:{
	  color:'#000',
	},
	wrapper: {
	   width:450,
	   height:350
	},
	slide1: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#9DD6EB',
	  position:'absolute'
	},
	slide2: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#97CAE5',
	},
	slide3: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#92BBD9',
	},
	text: {
	  color: '#fff',
	  fontSize: 30,
	  fontWeight: 'bold',
	},
	syncDatatMainView: { 
	    backgroundColor: "rgba(0, 0, 0, 0.5)", 
	    height: deviceHeight, 
	    width:deviceWidth 
	},
};
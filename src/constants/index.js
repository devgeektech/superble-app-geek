import {Dimensions} from 'react-native';

var userId = 34;
export default {
    margin: 15,
    width: Dimensions.get('window').width,
    url: {
        'base1': 'https://api-dev.superble.com/api/v1/',
        'base': ' https://api-staging.superble.com/api/v1/',
        'user_topics': 'profiles/${userId}/get_topics',
        'profiles_topics': 'profiles/524/get_topics',
        'liked_topics_detail': 'profiles/524/get_products',
        'user_profiles': 'profiles/524/info',
  
        
    }
}

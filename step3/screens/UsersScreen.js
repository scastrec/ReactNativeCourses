import React from 'react';
import { StyleSheet, View, AsyncStorage, ActivityIndicator, Alert, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements'

export default class MessagesScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Users',
        /*drawerIcon: ({ tintColor }) => (
          <Image
            source={require('./chats-icon.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),*/
      };
    

    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        AsyncStorage.getItem('@MySuperStore:Token', (err, result) => { 
            console.log("received token " + result);
            this.state.token = JSON.parse(result);
            console.log('Token loaded');
            this.loadUsers();
        });
        this.state = {
            isLoading:true
          };
    }

    loadUsers(){
        fetch('https://cesi.cleverapps.io/users', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
              'token' :  this.state.token.token                     
            }           
          }).then((response) => response.json()) 
            .then((responseJson) => { 
            console.log('succeed users - ' + JSON.stringify(responseJson));
            this.state.users = responseJson;           
            this.setState({
              isLoading: false
            });
            //navigation
            return responseJson;
          })
          .catch((error) => {
            console.log('loggin err - ' + JSON.stringify(error));
            this.setState({
              isLoading: false
            });
            Alert.alert('Error au chargement des users!');
          });
    }

    _renderItem = ({item}) => ( 
      <ListItem
        roundAvatar
        avatar={{uri:item.urlPhoto}}
        key={item.date}
        subtitle={item.date}
        title={item.username}
      />                
    );

    _keyExtractor = (item, index) => item.date + index;

    render() {
        if (this.state.isLoading) {
           return (
             <View style={{flex: 1, paddingTop: 20}}>
               <ActivityIndicator />
             </View>
           );
        }
      return (
        <List>
          <FlatList
            data={this.state.users}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor} 
            />
        </List>
        
      );
    }

  }
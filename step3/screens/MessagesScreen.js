import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, AsyncStorage, Alert, FlatList, MyListItem } from 'react-native';
import { List, ListItem } from 'react-native-elements'

export default class MessagesScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Messages',
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
        this.state = {
          messages : [],
          isLoading:true
        };
        console.log('Ctor MessagessScreen');
        AsyncStorage.getItem('@MySuperStore:Token', (err, result) => { 
            console.log("received token " + result);
            this.state.token = JSON.parse(result);
            console.log('Token loaded');
            this.loadMessages();
        });
    }

    postMessage(message){
      fetch('https://cesi.cleverapps.io/messages', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
          'token' :  this.state.token.token                     
        },
        body: 'message='+message            
      }).then((response) => { 
        console.log('succeed messages - ' + JSON.stringify(response));
        this.state.message = "";           
        this.loadMessages();
        //navigation
        return response;
      })
      .catch((error) => {
        console.log('posteMessage err - ' + JSON.stringify(error));
        this.setState({
          isLoading: false
        });
        Alert.alert('Error au chargement des messages!');
      });
    }

    loadMessages(){
        fetch('https://cesi.cleverapps.io/messages', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
              'token' :  this.state.token.token                     
            }
          }).then((response) => response.json()) 
            .then((responseJson) => { 
            console.log('succeed messages - ' + JSON.stringify(responseJson));
            this.state.messages = responseJson;           
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
            Alert.alert('Error au chargement des messages!');
          });
    }

    _onSend = () => {
      //todo send message
      this.postMessage(this.state.message);
    }

    _renderItem = ({item}) => (
      <ListItem
        key={item.date}
        subtitle={item.username}
        title={item.message}
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
        <View style={{flex: 1, paddingTop: 20}}>        
          <TextInput
            style={styles.input}
            onChangeText={(message) => this.setState({message})}
            value={this.state.message}
            />
          <Button
              style={styles.btn}
              onPress={this._onSend}
              title="Send"
              accessibilityLabel="Send"
            />
          <FlatList
            data={this.state.messages}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor} 
            />
      </View>
        
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      padding: 10,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    input: {
      height: 40,
    },
    btn: {
      backgroundColor: '#c7096d',
      paddingTop: 5,
      marginTop : 5
    },
    txt : {
      flexDirection: 'row'
    }
  });
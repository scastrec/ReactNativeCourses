import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';

export default class LoginScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: "test",
      password:"test",
      errorUser:false,
      errorPwd:false,
      isLoading:false
    };
  }

  _onSignup = () => {
    this.props.navigation.navigate('Signup', {});
  }

  _onConnect = () => {    
    if(!this.state.username){
      console.log("username error");      
      this.state.errorUser = true;
    } else {
      this.state.errorUser = false;
    }
    if(!this.state.password){
      console.log("pwd error");            
      this.state.errorPwd = true;
    } else {
      this.state.errorPwd = false;      
    }
    if(!this.state.errorUser && !this.state.errorPwd){
      console.log("connection with " + this.state.username + '-' + this.state.password);   
      this.setState({
        isLoading: true
      });   
      // no error
      // Do login
      fetch('https://cesi.cleverapps.io/signin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: 'username='+this.state.username+'&pwd='+this.state.password
      }).then((response) => response.json()) 
        .then((responseJson) => { 
        console.log('succeed authentication - ' + JSON.stringify(responseJson));
        //saving data 
        try {
          console.log('Lets try storing data');
          AsyncStorage.setItem('@MySuperStore:Token', JSON.stringify(responseJson));
          this.props.navigation.navigate('Main', {})                  
        } catch (error) {
          // Error saving data
          Alert.alert('SMI!');          
        }
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
        Alert.alert('Identifiant ou mot de passe inccorrect!');
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={{height: 50}}></View>
        <View style={{flex:1}}>
          <TextInput placeholder="username" value={this.state.username} 
              style={styles.input}
              onChangeText={(username)=> this.setState({username})}/>
          <TextInput  placeholder="pwd" value={this.state.password} 
              style={styles.input}
              onChangeText={(password)=> this.setState({password})}/>
          <Button
              style={styles.btn}
              onPress={this._onConnect}
              title="Se connecter"
              accessibilityLabel="Connexion"
            />
        </View>
        <View style={{height: 50}}>
          <Button
                  style={styles.btn}
                  onPress={this._onSignup}
                  title="Signup"
                  accessibilityLabel="Signup"
                />
          </View>
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

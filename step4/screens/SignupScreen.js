import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, Alert, AsyncStorage } from 'react-native';

export default class SignupScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password:"",
      errorUser:false,
      errorPwd:false,
      isLoading:false
    };
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
      fetch('https://cesi.cleverapps.io/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: 'username='+this.state.username+'&pwd='+this.state.password+'&urlPhoto='+this.state.urlPhoto
      }).then((response) => { 
        console.log('succeed signup - ');
        this.setState({
          isLoading: false
        });
        //navigation
        return response;
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
            <TextInput style={styles.input} placeholder="username" value={this.state.username} onChangeText={(username)=> this.setState({username})}/>
            <TextInput style={styles.input} placeholder="pwd" value={this.state.password} onChangeText={(password)=> this.setState({password})}/>
            <TextInput style={styles.input} placeholder="urlPhoto" value={this.state.urlPhoto} onChangeText={(urlPhoto)=> this.setState({urlPhoto})}/>

              <Button
                  style="{styles.btn}"
                  onPress={this._onConnect}
                  title="Se connecter"
                  accessibilityLabel="Connexion"
                />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    flex: 1
  },
  input: {
    height: 40,
  }
});

import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, Button } from 'react-native';

export default class PingScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Ping',
      };
  constructor(props){
    super(props);
    this.state = {
      isLoading:false
    };
  }

  _onPing = () => {    
      console.log("do ping ");   
      this.setState({
        isLoading: true
      });   
      // no error
      // Do login
      fetch('https://cesi.cleverapps.io/ping', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',        
        },
        body: ''
      }).then((response) => { 
        return response.text();
     }).then((responseTxt) => { 
        console.log('received pong - ');
        this.state.answer = responseTxt;
        this.setState({
          isLoading: false
        });
        //navigation
        return responseTxt;
      })
      .catch((error) => {
        console.log('error calling ping');
        this.setState({
          isLoading: false
        });
        Alert.alert('Error calling ping!');
      });
    
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
      <Text>{this.state.answer}</Text>
      <Button
        style="{styles.btn}"
        onPress={this._onPing}
        title="ping"
        accessibilityLabel="Ping"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  btn: {
    backgroundColor: '#c7096d'
  }
});

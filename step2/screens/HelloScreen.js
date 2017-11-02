import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, Button, TextInput } from 'react-native';

export default class HelloScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Hello',
      };
  constructor(props){
    super(props);
    this.state = {
      username:'',
      isLoading:false
    };
  }

  _onHello = () => {    
      console.log("do hello ");   
      this.setState({
        isLoading: true
      });   
      // no error
      // Do login
      fetch('https://cesi.cleverapps.io/hello?name='+this.state.username, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-type':'application/x-www-form-urlencoded;charset=UTF-8',        
        }
      }).then((response) => { 
          return response.text();
       })
       .then((responseTxt) => {
        this.state.answer = responseTxt;
        console.log('received hello - ' + this.state.answer);
        
        this.setState({
          isLoading: false
        });
        //navigation
        return responseTxt;
      })
      .catch((error) => {
        console.log('error calling hello' + JSON.stringify(error));
        this.setState({
          isLoading: false
        });
        Alert.alert('Error calling hello!');
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
        <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                />
        <Button
            style="{styles.btn}"
            onPress={this._onHello}
            title="Hello"
            accessibilityLabel="Hello"
            />
        <Text>{this.state.answer}</Text>

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

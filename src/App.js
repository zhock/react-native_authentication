import React, {Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {

  state = { loggedIn: null };

  componentWillMount(){
    firebase.initializeApp({
      apiKey: 'AIzaSyApPozAnsRgJpjSWOis8tPHKvZOMS2-7Io',
      authDomain: 'authentication-ac261.firebaseapp.com',
      databaseURL: 'https://authentication-ac261.firebaseio.com',
      projectId: 'authentication-ac261',
      storageBucket: 'authentication-ac261.appspot.com',
      messagingSenderId: '546697030004'
    });

    firebase.auth().onAuthStateChanged((user) =>{
      if (user){
        this.setState({ loggedIn: true });
      }else{
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent(){

    switch (this.state.loggedIn){
      case true:
        return (
          <CardSection>
            <Button onPress={ () => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>        
        );
      case false:
        return <LoginForm />;
      default: 
        return <Spinner size="large" />
    }

  }
  render() {
    return (
      <View >
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>
    );
  }
}

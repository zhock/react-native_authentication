import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password:'', error:'', loading: false };

    onButtonPress(){

        const {email, password} = this.state;

        this.setState({ error: '', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSucess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSucess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }
    onLoginFail(){
        this.setState({ error:'Authentication Failed', loading: false})
    }
    onLoginSucess(){
        this.setState({
            email:'',
            password:'',
            loading:false,
            error: ''
        });
    }

    renderButton(){
        if (this.state.loading){
            return <Spinner size="small" />
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }
    render() {

        
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
                        label="Email" 
                        value = { this.state.email }
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        value = { this.state.password }
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errortextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

            </Card>
        )
    }
}

const styles = {
    errortextStyle:{
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
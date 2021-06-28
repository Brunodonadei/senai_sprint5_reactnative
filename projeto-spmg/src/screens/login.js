import React, { Component } from 'react';
import { ActivityIndicator, View, TouchableOpacity, Text, TextInput, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            senha : ''
        }
    }

    fazerLogin = async () => {
        const resposta = await api.post('/login', {
            email : this.state.email,
            senha : this.state.senha
        })

        const token = resposta.data.token
        
        await AsyncStorage.setItem('teste', token)

        console.warn(token)

        this.props.navigation.navigate('Main')
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                    style={styles.input}
                    placeholder="email"
                    keyboardType="email-address"
                    onChangeText={email => this.setState({email})}                
                />
                <TextInput 
                    style={styles.input}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={senha => this.setState({senha})}                
                />

                <TouchableOpacity
                onPress={this.fazerLogin} 
                style={styles.btn}
                >
                    <Text>Login</Text>
                </TouchableOpacity>

                <ActivityIndicator size="large" color="#06418A"/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06418A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        // borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    btn: {
        width:'80%',
        height: 40,
        backgroundColor: 'white',
        // borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    }
})
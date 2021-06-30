import React, { Component } from 'react';
import { ActivityIndicator, View, TouchableOpacity, Text, TextInput, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import api from '../services/api';

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email : '',
            senha : '',
            isLoading : false
        }
    }

    fazerLogin = async () => {

        try{
            
            this.setState({ isLoading : true })

            const resposta = await api.post('/login', {
            email : this.state.email,
            senha : this.state.senha

        })

        const token = resposta.data.token
        
        await AsyncStorage.setItem('spmgToken', token)

        console.warn(token)

        // this.props.navigation.navigate('Main')

        if (jwtDecode(token).role === '2'){
            setInterval ( async () => {
                this.props.navigation.navigate('Main')
            }, 1500)
        }
        if(jwtDecode(token).role === '3'){
            setInterval ( async () => {
                this.props.navigation.navigate('Main2')
            }, 1500)
        }



        }catch (error) {
            this.setState({ isLoading : false })
            
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <Image style={styles.image}
                        source={require('../../assets/logo.png')}
                    />
                    <Text style={styles.text}>Bem vindo(a) ao<br></br>Sp Medical Group</Text>
                </View>
                <View style={styles.containerInput}>
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

                {
                    this.state.isLoading === true && <ActivityIndicator size='large' color='white' style={styles.loading}/>
                }
                
    

                </View>

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
    containerInput:{
        flex: 4,
        // backgroundColor: 'yellow',
        width: '80%'
    },
    input: {
        height: 40,
        backgroundColor: 'white',
        // borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingLeft: 10
    },
    btn: {
        height: 40,
        backgroundColor: 'white',
        // borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    loading: {
        marginTop: 40,
    },
    containerImg: {
        flex: 3,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center'
    }
})
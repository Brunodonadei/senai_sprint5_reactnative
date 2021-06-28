import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import api from '../services/api'

export default class Consultas extends Component {
  constructor(props){
    super(props)
    this.state = {
      listaConsultas : []
    }
  }

  buscarConsultas = async () => {

    const valorToken = await AsyncStorage.getItem('teste')

    const resposta = await api.get('/Consulta/minhas', {
      headers : {
        'Access-Control-Allow-Origin': '*',
        'Authorization' : 'Bearer ' + valorToken
      }
    })
    const dadosDaApi = resposta.data
    this.setState({ listaConsultas : dadosDaApi })
  }

  componentDidMount(){
    this.buscarConsultas()
  }

  render(){
    return(
      <View>
          <View style={styles.main}>
            <Text>{"Consultas".toUpperCase()}</Text>
          </View>

        <View>
          <FlatList 
            contentContainerStyle={styles.mainBodyContent}
            data={this.state.listaConsultas}
            keyExtractor={item => (item.idConsulta).toString()}
            renderItem={this.renderItem}
          />
        </View>

      </View>


    )
  }

  renderItem = ({ item }) => (
    <View style={styles.flatItemRow}>
      <Text>Médico: {item.idMedicoNavigation.nomeMedico}</Text>
      <Text>Especialidade: {item.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</Text>
      <Text>Situação: {item.idSituacaoNavigation.situacao1}</Text>
      <Text>Data: {item.dataConsulta}</Text>
      <Text>Descrição: {item.descricao}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  mainHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainHeaderRow: {
    flexDirection: 'row'
  },
  mainHeaderText: {
    fontSize: 16,
    letterSpacing: 5,
    color: '#999',
    fontFamily: 'Open Sans'
  },
  mainHeaderLine: {
    width: 220,
    paddingTop: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 1
  },
  mainBody: {
    flex: 4
  },
  mainBodyContent: {
    paddingTop: 30,
    paddingRight: 50,
    paddingLeft: 50
  },
  flatItemRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 30,
  },
})


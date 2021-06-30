import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import api from '../services/api'

export default class Agendamentos extends Component {
  constructor(props){
    super(props)
    this.state = {
      listaConsultas : []
    }
  }

  buscarConsultas = async () => {

    const valorToken = await AsyncStorage.getItem('spmgToken')

    const resposta = await api.get('/Consulta/minhas/medico', {
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
      <View style={styles.main}>
          <View style={styles.content}>
            <Text style={styles.consulta}>{"Meus Agendamentos"}</Text>
          </View>
          <View>
              <FlatList 
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
      <Text>Paciente: {item.idPacienteNavigation.nomePaciente}</Text>
      <Text>Telefone: {item.idPacienteNavigation.telefone}</Text>
      <Text>CPF: {item.idPacienteNavigation.cpf}</Text>
      <Text>Situação: {item.idSituacaoNavigation.situacao1}</Text>
      <Text>Data: {item.dataConsulta}</Text>
      <Text>Descrição: {item.descricao}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#06418A',
    alignItems: 'center',
    marginTop: 10
  },
  content: {
     flex: 0.1,
    //  backgroundColor: 'red',
     justifyContent: 'center',
     marginTop: 30
  },
  mainBodyContent: {
    paddingTop: 30,
    paddingRight: 50,
    paddingLeft: 50
  },
  flatItemRow: {
    margin: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset:{
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 25
  },
  consulta: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
})



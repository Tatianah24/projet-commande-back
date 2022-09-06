import React, {Component, useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    Modal,
    View,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Alert
  } from "react-native";

import { getChiffreList } from '../services/APIS/ChiffreAPI';


class Chiffre extends Component{
  constructor(props){
    super(props);
    this.state={
        chiffreLists:[],
        showEdit:false,
        num_cli:'',
        nom_cli:'',
        chiffre:0
    };
    this.timer = null;
    //this.callGetChiffreList();
}

componentDidMount(){
  this.callGetChiffreList();
}

componentWillUnmount() {
  clearInterval(this.timer);
}

callGetChiffreList = () => {
  getChiffreList()
  .then(response => {
    console.log("Response fonction:", response?.data)
    this.setState({
      chiffreLists: response?.data
    })
    console.log("CHIFFRE: ", this.state.chiffreLists);
  })
  .catch(error => {
   console.log('Error:', error);
  })

}

renderItem = ({item, index}) => {
    console.log(item.nom_cli)
      return(
          <View style={{
            width:"100%",
            justifyContent:'center',
            alignItems:'center'
        }}>
            <View style={styles.itemCard}>
                <Text style={{fontWeight:'bold',fontSize:16,marginLeft:15,marginTop:15}}>Numéro client:{item.num_cli}</Text>
                <Text style={styles.itemText}>Nom: {item.nom_cli}</Text>
                <Text style={styles.itemText}>Chiffre: {item.chiffre}</Text>
            </View>
    </View>
      )
}
  render(){

    return(
      <View style={styles.container}>
            <View style={{width:'100%'}}>
                   <FlatList
                            data={this.state.chiffreLists}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            onPressItem={()=>{
                                console.log("pressed");
                    }}/>
            </View> 
      </View>
    );
      
    }
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
  },
    itemText:{
        marginLeft:15,
        marginTop:5
    },
    itemCard:{
        height:110,
        width:"85%",
        marginHorizontal:10,
        marginBottom:10,
        marginTop:15,
        borderRadius:15,
        elevation:13,
        backgroundColor:'white',
      },
      txt:{
        color:'white',
      },
    buttonCont:{
        backgroundColor:'black',
        width:'45%',
        borderWidth:1,
        borderRadius:30,
        borderBottomWidth:2,
        borderTopWidth:2,
        borderLeftWidth:2,
        borderRightWidth:2,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        height:'100%'
      },
      footer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:50,
        paddingHorizontal:20,
        marginTop:25
    },
    infoContainer:{
      height:60,
      borderRadius:30,
      backgroundColor:'#F1F1F1',
      width:"90%",
      marginTop:20,
      fontSize:18,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    },
})
export default Chiffre;



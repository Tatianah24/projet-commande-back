import React, {Component, useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Button,
    Image,
    Platform,
    TouchableOpacity,
    SafeAreaView,
  } from "react-native";



class Accueil extends Component{
  render()
  {
    return(
      <View style={styles.container}>
            <View style={styles.footer}>
              <View style={styles.fr}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate("Client")} 
                style={{
                  justifyContent:'center',
                  alignItems:'center',
                }}>
                    <Text style={styles.txt}>Clients</Text>

                </TouchableOpacity>
              </View>
            
              <View style={styles.fr}>
                <TouchableOpacity onPress={()=>
                  this.props.navigation.navigate("Produit")}
                  style={{
                    justifyContent:'center',
                    alignItems:'center',
                  }}>
                    <Text style={styles.txt}>Produits</Text>
                </TouchableOpacity>
              </View>
           </View>
           <View style={styles.footer}>
              <View style={styles.fr}>
                    <TouchableOpacity onPress={()=>
                      this.props.navigation.navigate("Chiffre")}
                      style={{
                        justifyContent:'center',
                        alignItems:'center',
                      }}>
                        <Text style={styles.txt}>Chiffre d'affaire</Text>
                    </TouchableOpacity>
                  </View>
           </View>
           
      </View>
    );  
    }
  }

  const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
 
    },
    fr:{
      height:"85%",
      width:"45%",
      borderRadius:30,
      borderColor:'white',
      alignItems:'center',
      shadowOpacity:1,
      shadowColor:'black',
      shadowRadius:4,
      elevation:10,
      shadowOffset:{width:0,height:0},
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'center',
    },
    txt:{
      fontSize:15,
      alignItems:'center',
      justifyContent:'center',
      color:'grey',
      //marginTop:10
    },
    footer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width:"80%",
      marginHorizontal:30,
  }
})
export default Accueil;



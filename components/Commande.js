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
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {getProduitList, updateProduit, deleteProduit} from '../services/APIS/ProduitAPI';
import { getCommandeByCli, getCommandeList } from '../services/APIS/CommandeAPI';
import { ModalProduit } from './ModalProduit';
import { ModalCommande } from './ModalCommande';

class Commande extends Component{
  constructor(props){
    super(props);
    this.state={
        commandeLists:[],
        showEdit:false,
        num_pro:'',
        num_cli:'',
        qte:'',
       
    };
    
    this.timer = null;
    //this.callGetCommandeList();
}

componentDidMount(){
  this.callGetCommandeList();
}

componentWillUnmount() {
  clearInterval(this.timer);
}

callGetCommandeList = () => {
  getCommandeByCli(this.props.route.params.num_cli)
  .then(response => {
    console.log("Response fonction:", response?.data)
    this.setState({
      commandeLists: response?.data
    })
    console.log("COMMANDE: ", this.state.commandeLists);
  })
  .catch(error => {
   console.log('Error:', error);
  })
}

renderItem = ({item, index}) => {
      return(
          <View style={{
            width:"100%",
            justifyContent:'center',
            alignItems:'center'
        }}>
            <View style={styles.itemCard}>
                <Text style={{fontWeight:'bold',fontSize:16,marginLeft:15,marginTop:15}}>Désignation:{item.num_pro}</Text>
                <Text style={styles.itemText}>Qte: {item.qte}</Text>

                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                        <TouchableOpacity onPress={()=>{
                                            this.setState({showEdit:true,
                                            num_pro:item.num_pro,
                                            design:item.design,
                                            pu:item.pu,
                                            })}}>
                                            <Ionicons name="ios-pencil" size={20} color="black" style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>{
                                              Alert.alert(
                                                  "Attention",
                                                  'Etes-vous sûr de supprimer ce produit?',
                                              [
                                                  {
                                                      text:'Non', onPress:()=>{ },//Do nothing
                                                      style:'Annuler'
                                                  },
                                                  {
                                                      text:'Oui', onPress:()=>{ 
                                                      deleteProduit(item.num_pro)
                                                      .then(response => {
                                                        console.log("Response delete:", response?.data)
                                                      }).catch(error => {
                                                      alert(`Failed to delete produit with num_pro=${item.num_pro}, error=${error}`);
                                                  })
                                                  },
                                                  },
                                              ],{cancelable:true}
                                              );}}>
                                            <Ionicons name="trash-sharp" size={20} color="black" style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                    </View> 
            </View>

            <Modal
                  animationType={'fade'}
                  transparent={true}
                  visible={this.state.showEdit}
                  title="Modifier un produit">
                <View style={{
                           flex:1,
                           backgroundColor:'#000000AA',
                           justifyContent:'center'
                }}>   
                    <View style={{
                               backgroundColor:'#FFFFFF',
                               borderTopRightRadius: 10,
                               borderTopLeftRadius:10,
                               borderBottomLeftRadius:10,
                               borderBottomRightRadius:10,
                               margin:30,
                               padding:30,
                               marginTop:0
                    }}>
                        <View style={{
                                   justifyContent:'center',
                                   alignItems:'center',
                                   width:'100%'
                        }}>
                            <Text style={{fontWeight:'bold'}}>Modifier un produit</Text>
                          <View style={styles.infoContainer}>
                            <View style={{ width:"30%",
                                justifyContent:'center',
                                alignItems:"center"}
                            }>
                                <Ionicons name="pricetag-outline" size={20} color="#03999C"/>
                            </View>
                            <View style={
                                {width:"70%",
                                overflow:"hidden",}
                            }>
                            <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({design :text})} 
                            value={this.state.design} autoCorrect={false}/>
                            </View>
                          </View>
                          <View style={styles.infoContainer}>
                            <View style={{ width:"30%",
                                justifyContent:'center',
                                alignItems:"center"}
                            }>
                                <MaterialCommunityIcons name="currency-usd" size={20} color="#03999C"/>
                            </View>
                            <View style={
                                {width:"70%",
                                overflow:"hidden",}
                            }>
                            <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({pu :text})} 
                            value={this.state.pu} autoCorrect={false}/>
                            </View>
                          </View>
                        </View>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonCont} onPress={() => {
                            const pro = {
                                num_pro:this.state.num_pro,
                                design:this.state.design,
                                pu: this.state.pu
                            }
                            updateProduit(pro)
                            .then(response => {
                              console.log('Response update produit:', response?.data)
                            })
                            .catch(error=>{
                            console.log('Error update',error)
                            });
                            this.setState({showEdit:false});
                            }}>
                                <Text style={styles.txt}>Modifier</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonCont,{backgroundColor:"white",borderColor:"#03999C"}]} onPress={()=> this.setState({showEdit:false})}>
                              <Text style={{color:"#03999C"}}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
              </View>
        </Modal>
    </View>
      )
}
  render(){
    let params = this.props.route.params.num_cli;
    console.log("PARAMETRE: ",params)

    let popupRef = React.createRef()

        const onShowPopup = () => {
            popupRef.show()
        }
        const onClosePopup = () => {
            popupRef.close()
        }

    return(
      <View style={styles.container}>
            <View>
              <TouchableWithoutFeedback onPress={onShowPopup}>
                <AntDesign name="pluscircle" size={30} color="black" />
              </TouchableWithoutFeedback>
              <ModalCommande
                        title='Commander un produit'
                        ref={(target) => popupRef = target}
                        onTouchOutside={onClosePopup}
                        num_cli={params}
                    />
            </View>
            <View style={{flex:2,width:'100%'}}>
                   <FlatList
                            data={this.state.commandeLists}
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
        backgroundColor:'#03999C',
        width:'45%',
        borderWidth:1,
        borderRadius:30,
        borderBottomWidth:2,
        borderTopWidth:2,
        borderLeftWidth:2,
        borderRightWidth:2,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#03999C',
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
})
export default Commande;



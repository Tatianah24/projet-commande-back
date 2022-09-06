import React, {Component} from 'react';
import {Modal, 
        TouchableWithoutFeedback, 
        StyleSheet, 
        View, 
        Text,
        TextInput,
        TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {createProduit} from '../services/APIS/ProduitAPI';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

export class ModalProduit extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            num_pro:0,
            design:'',
            pu:'',
            pro_isAddnew:true
        }
    }

    show = () =>{
        this.setState({show:true}); 
    }

    close = () => {
        this.setState({show:false})
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex:1, width:'100%'}}/>
        if(!onTouch) return view

        return(
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width:'100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return(
            <View style={{
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text style={{
                    color:'#182E44',
                    fontSize:18,
                    fontWeight:'bold',
                    }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props
        return(
            <View>
                    <View style={styles.contenu}>
                        <View style={styles.infoContainer}>
                            <View style={{ width:"30%",
                                justifyContent:'center',
                                alignItems:"center"}
                            }>
                                <Ionicons name="pricetag-outline" size={20} color="black"/>
                            </View>
                            <View style={
                                {width:"70%",
                                overflow:"hidden",}
                            }>
                            <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({design :text})} 
                            value={this.state.design} autoCorrect={false} placeholder='Désignation'/>
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={{ width:"30%",
                                justifyContent:'center',
                                alignItems:"center"}
                            }>
                                <MaterialCommunityIcons name="currency-usd" size={20} color="black"/>
                            </View>
                            <View style={
                                {width:"70%",
                                overflow:"hidden",}
                            }>
                            <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({pu :text})} 
                            value={this.state.pu} autoCorrect={false} placeholder='Prix unitaire'/>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonCont} onPress={() => {
                            if(this.state.design.trim()=="" && this.state.pu.trim()==""){
                                alert("Veuillez remplir les champs");
                                return;
                            }
                            if(this.state.pro_isAddnew==true){
                                const newPro = {
                                    design:this.state.design,
                                    pu:this.state.pu
                                };
                                createProduit(newPro)
                                .then(response =>{
                                    console.log('Response create produit:', response?.data)
                                })
                                .catch(error => {
                                    console.log('Error: ', error)
                                })
                                {/*axios
                                .post('http://10.0.2.2/php_rest_commande/api/client/createClient.php', newCli)
                                .then(response =>{
                                    console.log('Response create: ', response?.data)
                                })
                                .catch(error =>{
                                    console.log('Error create: ', error)
                                })*/}
                                {this.close(), this.setState({
                                    design:'',
                                    pu:''
                                })}                  
                            }
                        }}>
                            <Text style={styles.txt}>Ajouter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonCont,{backgroundColor:"white",borderColor:"black"}]} onPress={()=> this.close()}>
                            <Text style={{color:"black"}}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
            </View>   
        )}
    render(){
        let {show} = this.state
        const {onTouchOutside, title} = this.props

        return(
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{
                    flex:1,
                    backgroundColor:'#000000AA',
                    justifyContent:'center'
                }}>
                    {this.renderOutsideTouchable(onTouchOutside)}
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
                       {this.renderTitle()}
                       {this.renderContent()} 
                    </View>
                </View>
            </Modal>
        )
    }
}

export const styles=StyleSheet.create({
    textinput:{
        height:70,
        marginLeft:0,
        borderBottomWidth:3,
        borderColor:'#116BFF',
        width:'100%',
        marginTop:10,
        fontSize:16,
        alignItems:'center',
        justifyContent:'center',
    },
    contenu:{
        justifyContent:'center',
        alignItems:'center'
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
      txt:{
        color:'white',
      },
      footer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:50,
        paddingHorizontal:20,
        marginTop:20
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
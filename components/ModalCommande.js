import React, {Component} from 'react';
import {Modal, 
        TouchableWithoutFeedback, 
        StyleSheet, 
        View, 
        Text,
        TextInput,
        TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {getProduitList} from '../services/APIS/ProduitAPI';
import { createCommande } from '../services/APIS/CommandeAPI';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

export class ModalCommande extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            num_co:'',
            num_cli:this.props.num_cli,
            qte:'',
            num_pro:'',
            design:'',
            pu:'',
            produitList:[],
            co_isAddnew:true
        }
        this.timer = null;
        //this.callGetProduitList();
    }

    componentDidMount(){
        this.callGetProduitList();
      }
      
      componentWillUnmount() {
        clearInterval(this.timer);
      }
      
      callGetProduitList = () => {
        getProduitList()
        .then(response => {
         // console.log("Response fonction:", response?.data)
          this.setState({
            produitList: response?.data
          })
          //console.log("PRODUIT: ", this.state.produitList);
        })
        .catch(error => {
         console.log('Error:', error);
        })
      }

    show = () =>{
        this.setState({show:true}); 
        console.log('Num cli',this.state.num_cli)
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
                            {/* Picker Monnaie */}
                            <View style={{width:'45%', }}> 

                                    <Picker style={{width:'100%',}}
                                    selectedValue={this.state.num_pro}
                                    onValueChange={(itemValue)=>{this.setState({num_pro:itemValue})}}>
                                {
                                    this.state.produitList.map( (v,i)=>{
                                    var design=v.design
                                    var num_pro = v.num_pro
                                    //console.log(money)
                                return (
                                    <Picker.Item label={design} value={num_pro} key="{v.num_pro}" />
                                    )
                                }
                            )}
                                    </Picker>
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
                             returnKeyType="next" onChangeText={(text) => this.setState({qte :text})} 
                            value={this.state.qte} autoCorrect={false} placeholder='Quantité'/>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonCont} onPress={() => {
                            if(this.state.design.trim()=="" && this.state.qte.trim()==""){
                                alert("Veuillez remplir les champs");
                                return;
                            }
                            if(this.state.co_isAddnew==true){
                                const newCo = {
                                    num_cli:this.state.num_cli,
                                    num_pro:this.state.num_pro,
                                    qte:this.state.qte
                                };
                                createCommande(newCo)
                                .then(response =>{
                                    console.log('Response create commande:', response?.data)
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
                            <Text style={styles.txt}>Commander</Text>
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
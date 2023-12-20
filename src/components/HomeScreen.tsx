/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View ,TextInput, FlatList } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import { Formik } from 'formik';
// import {firebaseApp} from '../config';
import { firebase } from '@react-native-firebase/database';
// import { database } from '@react-native-firebase/database';

export const HomeScreen = ({navigation, route} : {navigation : any,route: any}) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null >(null);
    const [dataList ,setDatalist]  = useState('');
    const [datamessage, setDataMessage] = useState([]);
    const [search, setSearch] = useState('');
    const [users ,setUsers] = useState({
        id :'',
        name :'',
        phone: '',
        address: '',
    });
    
    // const {param}  = route.params as { param: Route_to};
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((userss) => {
            setUser(userss);
            console.log('ussssssssssssssssssssss',userss);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    // console.log('++++++++++++++++++++++++++++++++++++++', Object.keys(dataList).map((key) => ({ [key]: dataList[key] })));

    // console.log('//////////////////' , JSON.stringify(user?.uid));
    console.log('astttttttttttttttttttttttttt',datamessage);
    
    const getData_test = async () => {
        await firebase
            .app()
            .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref('/uses/')
            // .on(')
            .on('value', snapshot => {
                setDatalist(snapshot.val());
                // setDatalist(JSON.parse((snapshot.val()).toString()));
                console.log('========================',snapshot.val());
            });
    };
    const getData_Friend = async (id : string) => {
        // const u_id = id.slice(1,id.length - 1);
        await firebase
            .app()
            .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/messgae/${id}`)
            // .on(')
            .on('value', snapshot => {
                setDataMessage(snapshot.val());
                // setDatalist(JSON.parse((snapshot.val()).toString()));
                console.log('messssssssssss', snapshot.val());
                // console.log(u_id);
            });
    };
    
    useEffect(() => {
        getData_test();
    }, []);

    useEffect(() => {
        getData_Friend(route.params.u_id);
    }, []);
    console.log(route);
    
    const getData_Uid = async (u_id : string) => {
        await firebase
            .app()
            .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/uses/${u_id}`)
            .once('value', snapshot => {
                const d = JSON.stringify(snapshot.val());
                setUsers({ ...users,
                            id: u_id,
                        });
                console.log('User data: ', snapshot.val());
            });
    };
    const getData_Delete = async (u_id: string) => {
        await firebase
            .app()
            .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/uses/${u_id}`)
            .remove();
    };
    const getData_Write = async (u_id : string,obj : {}) => {
            const newReference = await firebase
                .app()
                .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
                .ref(`/uses/${u_id}`)
                .update(obj);
    };
    const Search_ = async (str : string) =>{
        await firebase
            .app()
            .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref('/uses/')
            .orderByChild('phone')
            .equalTo(str)
            .once('value', (result)=>{
                setDataMessage(result.val()[Object.keys(result.val())[0]]);
                // console.log('111111111111111', typeof (result.val()[Object.keys(result.val())[0]]));
                
            });
    };
    const Add_data = async(item: {}) =>{
         const newReference = await firebase
                .app()
                .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
                .ref('/uses')
                .push();
            console.log('Auto generated key: ', newReference.key);

            newReference
                .set(item)
                .then(() => console.log('Data updated.'));
    };
    // console.log('Jsom aaaaaaaaaaaa', JSON.parse(dataList.toString()));
    
    const Render_Item = (({item} : {item : any}) => {
        const keys = Object.keys(item);
        const firstKey = keys[0];
        // console.log('kkyyyyyyyyyyyyy' , firstKey)
        const firstValue = item[firstKey];
        console.log(firstValue);

        return (
            <View style={{ backgroundColor: 'pink', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => { getData_Uid(firstKey);}}>
                    <View>
                        <Text>Name :{firstValue.name}</Text>
                        <Text>Phone : {firstValue.phone}</Text>
                        <Text>Address: {firstValue.address}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    getData_Delete(firstKey);
                }}>
                    <Text>Xóa</Text>
                </TouchableOpacity>
            </View>
        );
    });
    const Render_Friend = ({item} :{item : any}) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('message', { name: item.name, user_id: item.u_id , user_friend : item.user_friend});
            }}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
                {/* <Text>{item}</Text> */}
                <Text>Name id : {item.user_friend}</Text>
                <Text>Name message: {item.name} </Text>
            </View>
            <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
        </TouchableOpacity>
    );
    return (
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-around',gap:5,alignItems:'center',backgroundColor:'blue',paddingHorizontal:10}}>
                <View style={{width:30,height:30,backgroundColor:'green'}}>
                    <TouchableOpacity onPress={()=>{
                        Search_(search);
                    }}>
                        <Text>Tìm</Text>
                    </TouchableOpacity>
                </View>
                <TextInput placeholder="Tìm kiếm" style={{ flex:1 }}
                    onChangeText={(e)=>{setSearch(e);}}
                    value= {search}
                />
                <View style={{ width: 30, height: 30, backgroundColor: 'green' }} />
                <View style={{ width: 30, height: 30, backgroundColor: 'green' }} />
            </View>
            <View>
                <FlatList
                    data={datamessage}
                    renderItem={Render_Friend}
                />
            </View>
        </View>

    );
};

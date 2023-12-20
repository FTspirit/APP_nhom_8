/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions, Keyboard } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useRoute } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
 
export const MessageScreen = ({route} : {route : any}) => {
    const [dataList, setDatalist] = useState([]);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [name,setName] = useState('');
    // const [nameuser, setNameuser] = useState<any>();
    const [text , setText] = useState({
        content : '',
        date: '',
        from : '',
    });
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((userss) => {
            setUser(userss);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const GetData = async (str : string) =>{
        await firebase
            .app()
            .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/messgae/${str}`)
            // .on(')
            .once('value', snapshot => {
                setDatalist(snapshot.val());
                // setDatalist(JSON.parse((snapshot.val()).toString()));
                console.log('========================', snapshot.val());
            });
    };
    useEffect(() => {
        // GetData('thuong_to_thuong123');
        GetData(route.params.name);
    }, []);
    // console.log('00000000000000000000000',dataList);
//     const getData_Uid = async () => {
//         await firebase
//             .app()
//             .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
//             .ref('/uses/bUalwqfmx5eq0jQ9RFGCClZTXAV2/')
//             .on('value', snapshot => {
//                 setName(snapshot.val().name);
//             });
//     };
//    useEffect(()=>{
//        getData_Uid();
//    },[]);
    const SendData = async (u_id: string,node : string, obj : {}) => {
        await firebase
            .app()
            .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
            .ref(`/messgae/${node}/${u_id}`)
            .update(obj);
    };
    // const Render_Account = ({item} : {item : any}) => (
    //     <View style={{padding:8}}>
    //         <TouchableOpacity onPress={() => { GetData('thuong_to_thuong123'); setIsOpen(false);}}>
    //             <Text>Name : {item}</Text>
    //         </TouchableOpacity>
    //     </View>
    // );
    const Render_Message = ({ item }: { item: any }) => (
        <View style={{ display:'flex',marginHorizontal:16,marginVertical:5}}>
            <View style={(item.from === user?.uid) ? {alignItems: 'flex-end'} : { alignItems: 'flex-start' }}>
                <View style={(item.from === user?.uid) ? { display: 'flex', backgroundColor: '#66B2FF', padding: 10, borderRadius: 6 } : { display: 'flex', backgroundColor: 'white', padding: 10, borderRadius: 6 }}>
                    <Text style={{ display: 'flex',paddingBottom:5}}>{item.content}</Text>
                    <Text style={{ display: 'flex',fontSize:10}}>{item.date}</Text>
                </View>
            </View>
        </View>
    );
    const flatListRef = useRef<any>();
    const onContentSizeChange = () => {
        flatListRef.current.scrollToEnd({ animated: true });
    };
  return (
      <View style={{flex:1,backgroundColor:'#0066CC' }}>
        <View style={{ backgroundColor:'#CCE5FF',flex:1}} >
                <View style={{backgroundColor:'blue',padding:6}}>
                  <Text>Name : {route.params.user_friend} </Text>
                    <Text>Status</Text>
                </View>
                <View style={{flex:1}}>
                    <FlatList
                        ref={flatListRef}
                        data={dataList}
                        renderItem={Render_Message}
                        // initialNumToRender={5}
                        keyExtractor={(item,index) => index.toString()}
                        onContentSizeChange={onContentSizeChange}
                        showsVerticalScrollIndicator ={false}
                        onLayout={onContentSizeChange}
                    />
                </View>
                <View style={{ flexDirection: 'row', borderWidth: 1, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10,backgroundColor:'white' }}>
                    <TextInput placeholder='Tin nhắn ' value= {text.content} onChangeText={(e) => { setText({ ...text, content: e, date: '20222', from: `${user?.uid}` }); }} style={{flex:1}}/>
                  <TouchableOpacity onPress={() => {
                      SendData(dataList.length.toString(), route.params.name, text); GetData(route.params.name); setText({
                          content: '',
                          date: '',
                          from: '',
                        });}} >
                        <Text>Gửi</Text>
                    </TouchableOpacity>
                </View>
        </View>
    </View>
  );
};
{/* :
                <View>
                    <View>
                        <TextInput placeholder='Tìm kiếm ' />
                    </View>
                    <View>
                        <FlatList
                            data={dataList}
                            renderItem={Render_Account}
                        />
                    </View>
                </View> */}
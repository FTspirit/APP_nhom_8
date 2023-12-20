import React, { useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { firebase } from '@react-native-firebase/database';
import { useSelector } from 'react-redux'

export const MessageZalo = () => {

  const u_friend = useSelector((state: any) => state.appReducer.userName);

  const [datalist, setData] = useState([]);
  const [text, setText] = useState({
    content: '',
    date: '',
    from: '',
  })
  const GetData = async () => {
    await firebase
      .app()
      .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('/messgae/thuong_to_thuong123/')
      // .on(')
      .once('value', snapshot => {
        setData(snapshot.val());
        // setDatalist(JSON.parse((snapshot.val()).toString()));
        console.log('========================', snapshot.val());
      });
  }


  useEffect(() => {
    GetData();
  }, [])
  console.log('llllllllllllllllll', datalist);

  const SendData = async (u_id: string, node: string, obj: {}) => {
    await firebase
      .app()
      .database('https://test-login-8c7d4-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref(`/messgae/${node}/${u_id}`)
      .update(obj);
  };
  const Render_Mess = ({ item }: { item: any }) =>
  (
    <View style={(item?.from === u_friend) ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }}>
      <View style={(item?.from === u_friend) ? { backgroundColor: 'green', alignItems: 'flex-end', padding: 12, borderRadius: 6, marginVertical: 5 } : { backgroundColor: 'green', padding: 12, borderRadius: 6, marginVertical: 5 }}>
        <Text>{item.content}</Text>
        <Text>{item.date}</Text>
      </View>
    </View>
  );
  const flatListRef = useRef<any>();
  const onContentSizeChange = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList style={{ paddingHorizontal: 16, flex: 1 }}
          ref={flatListRef}
          keyExtractor={(item, index) => index.toString()}
          data={datalist}
          renderItem={Render_Mess}
          onLayout={onContentSizeChange}
          onContentSizeChange={onContentSizeChange}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'space-between', paddingHorizontal: 16 }}>
        <View style={{ width: 35, height: 35, backgroundColor: 'green' }} />
        <TextInput placeholder='Tin nhắn ....' value={text.content} style={{ flex: 1 }}
          onChangeText={(e) => setText({ ...text, content: e, date: '20222', from: `${u_friend}` })}
        />
        <TouchableOpacity onPress={() => {
          SendData(datalist.length.toString(), 'thuong_to_thuong123', text);
          GetData();
          setText({
            content: '',
            date: '',
            from: '',
          });
        }}>
          <Text>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

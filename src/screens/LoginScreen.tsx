/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput  } from 'react-native';
import auth from '@react-native-firebase/auth';

export const LoginScreen = ({navigation} :{navigation : any}) => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWork] = useState('');
  const [message, setMessage] = useState('');
  const handleOnchangeTextName = (value : string) =>{
      setUserName(value);
  };
  const handleOnchangeTextPass = (value: string) => {
    setPassWork(value);
  };
  console.log('name',userName);
  console.log('pass', passWord);
  const handleLogin = async() =>{
    try {
      // const isUserNameCreate = await auth().createUserWithEmailAndPassword(userName, passWord);
      const isUserNameLogin = await auth().signInWithEmailAndPassword(userName,passWord);
      navigation.navigate('home',{u_id : isUserNameLogin.user.uid});
      console.log(isUserNameLogin.user);
      
      
    } catch (error : any) {
      // console.log(error);
      if (error.code === 'auth/wrong-password') {
        setMessage('Sai mật khẩu');
      }

      if (error.code === 'auth/user-not-found') {
        console.log('Sai tên đăng nhập');
        setMessage('Sai tên đăng nhập');
      }
      setMessage(error.message);
      // console.log(error);
      
    }
  };
  const handleRegister = async () => {
    try {
      const isUserNameCreate = await auth().createUserWithEmailAndPassword(userName, passWord);
      console.log(isUserNameCreate);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View>
      <View>
        <View>
          <View>
            <Text>Username</Text>
            <TextInput
              placeholder= "Nhập tên đăng nhập..."
              style={{ borderWidth:1 ,borderRadius:6, padding:5 }}
              value= {userName}
              onChangeText={(value)=>{ handleOnchangeTextName(value); }}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              placeholder= "Nhập mật khẩu..."
              style={{ borderWidth: 1, borderRadius: 6, padding: 5 }}
              secureTextEntry={true}
              value={passWord}
              onChangeText={(value) => { handleOnchangeTextPass(value); }}
            />
          </View>
          <Text>{message}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => {handleLogin();}} style={{alignItems:'center',paddingVertical:10}}>
        <Text style={{ backgroundColor: 'green', padding: 10, }}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => { handleRegister(); }} style={{ alignItems: 'center', paddingVertical: 10 }}>
        <Text style={{ backgroundColor: 'green', padding: 10, }}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

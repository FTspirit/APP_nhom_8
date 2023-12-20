import React, { useState } from 'react'
import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import { useDispatch } from 'react-redux';

export const LoginZalo = ({ navigation }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [textName, setTextName] = useState('');
    const [textPass, setTextPass] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const handleLogin = async () => {
        if (textName === '098765415' && textPass === '123456') {
            navigation.navigate('message')
        } else
            Alert.alert('Thông báo', 'Thông tin tài khoản không chính xác', [
                {
                    text: 'OK',
                    onPress: () => console.log('xong')
                },

            ],
                { cancelable: false })
    };
    return (
        <View style={{ flex: 1, position: 'relative' }} onLayout={() => { setIsOpen(!isOpen) }} >
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View>
                    {/* <View style={{ flexDirection: 'row', paddingVertical: 16, backgroundColor: 'blue' }}>
                      <Text>{'<'}</Text>
                      <Text style={{color:'white',fontSize:16}}> {'<<'} Đăng nhập</Text>
                  </View> */}
                    <Text style={{ padding: 6 }}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 16, }}>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5 }}>
                            <TextInput placeholder='Số điện thoại' style={{ flex: 1 }} value={textName} onChangeText={(e) => setTextName(e)} />
                            <Text>X</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5 }}>
                            <TextInput placeholder='Mật khẩu' secureTextEntry={!show} style={{ flex: 1 }} value={textPass} onChangeText={(e) => setTextPass(e)} />
                            <TouchableOpacity
                                onPress={()=>setShow(!show)}
                            >
                                <Text>{!show ? 'Hiện' :'Ẩn'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <Text>Lấy lại mật khẩu</Text> */}
                    <TouchableOpacity style={{ alignItems: 'flex-end', position: 'absolute', bottom: 16, right: 16, flexDirection: 'row', backgroundColor: '#FAA338', padding: 10, borderRadius: 100 }}
                        onPress={() => { handleLogin() }}
                    >
                        <Text
                            style={{ color: 'white', fontWeight: '500' }}
                        >Next</Text>
                    </TouchableOpacity>
                </View>
                {!isOpen ?
                    <View style={{ alignItems: 'flex-end', position: 'absolute', bottom: 16, left: 16, flexDirection: 'row', flex: 2, }}>
                        <Text>Câu hỏi thường gặp {'>'} </Text>
                    </View>
                    : null
                }
            </KeyboardAvoidingView>
        </View>
    )
}

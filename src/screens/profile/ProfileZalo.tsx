import React from 'react'
import { View, Text, Image, SafeAreaView, Button, TouchableOpacity, StatusBar } from 'react-native'
import { ICON } from '../../assets'
import { ItemSelection } from './ItemSelection'
export const ProfileZalo = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ gap: 10, backgroundColor: 'white', flex: 1 }}>
            <StatusBar
                backgroundColor={'white'}
                barStyle={'dark-content'}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center', gap: 16 }}>
                {/* <View style={{ width: 50, height: 50, backgroundColor: 'green', borderRadius: 50 }} /> */}
                <Image
                    source={ICON.BANNER}
                    style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 100, borderWidth: 2, borderColor:'#FAA338' }}
                />
                <View style={{ flex: 1 }}>
                    <Text>Vũ Minh Thưởng</Text>
                    {/* <Image source={require('')}/> */}
                    <Text>098765410</Text>
                </View>
                {/* <View style={{ width: 30, height: 30, backgroundColor: 'green', borderRadius: 50 }} /> */}
                <Image
                    source={ICON.USER}
                    style={{ width: 30, height: 30, resizeMode: 'contain', borderRadius: 100,}}
                />
            </View>
            <ItemSelection list={[{ content: 'Thông tin cá nhân',icon : ICON.USER }]} onPress={() => { navigation.navigate('ProfileUser') }} title={'Tài khoản'} />
            <ItemSelection list={[{ content: 'Lịch sử giao dịch', icon: ICON.PAY }]} onPress={() => { navigation.navigate('History') }} title={'Khác'} />
            <TouchableOpacity
                onPress={() => { navigation.navigate('flash') }}
                style={{ paddingHorizontal: 16 ,marginTop:32}}>
                <Text style={{ backgroundColor:'#FAA338',paddingHorizontal:16,paddingVertical:10,fontSize:16,borderRadius:6,textAlign:'center',color:'white',fontWeight:'600'}}>
                    Đăng xuất
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

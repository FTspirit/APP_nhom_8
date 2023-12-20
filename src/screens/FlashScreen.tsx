import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import { Button } from '../components/Button';
import { ICON } from '../assets';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export const FlashScreen = ({ navigation } :any) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsOpen(true);
        }, 3000);
    }, []);
    return (
        <View style={isOpen ? styles.container_1 : styles.container}>
            <View>
                <Text style={isOpen ? styles.text_logo_1 : styles.text_logo}>
                    HRM HAPPY
                </Text>
            </View>
            {isOpen ?
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: windowWidth, height: windowHeight * 0.35 }}>
                        <View style={{ backgroundColor: 'blue', flex: 1 }} />
                        <Image 
                            source={ICON.BANNER}
                            style={{width:'100%',height:'100%', resizeMode:'contain'}}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', marginTop: 10, paddingHorizontal: 16 }}>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600' }}>
                            Tư vấn tận tình
                        </Text>
                        <Text style={{ textAlign: 'center', fontSize: 14 }}>
                           Hàng ngon chất lượng cao,
                           Ngon bổ rẻ
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, paddingVertical: 10 }}>
                            <View style={{ backgroundColor: 'gray', width: 8, height: 8, borderRadius: 50 }} />
                            <View style={{ backgroundColor: 'gray', width: 8, height: 8, borderRadius: 50 }} />
                            <View style={{ backgroundColor: 'gray', width: 8, height: 8, borderRadius: 50 }} />
                            <View style={{ backgroundColor: 'gray', width: 8, height: 8, borderRadius: 50 }} />
                        </View>
                        <View style={{ gap: 5, marginVertical: 60 }}>
                            {/* <TouchableOpacity onPress={() => { navigation.navigate('home') }}>
                                <Text>đâsdasdsadasds</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => { navigation.navigate('login') }}>
                                <Button color='white' text='Đăng nhập' backgroundColor='#FAA338' />
                            </TouchableOpacity>
                            {/* <TouchableOpacity>
                                <Button backgroundColor='gray' text="Đăng ký" opacity={0.3} />
                            </TouchableOpacity> */}
                        </View>

                    </View>
                    {/* <View style={{ flexDirection: 'row', gap: 5, position: 'absolute', bottom: 5, }}>
                        <Text style={{ padding: 8 }}>
                            Tiếng Anh
                        </Text>
                        <Text style={{ padding: 8 }}>
                            Tiếng Việt
                        </Text>
                    </View> */}
                </View>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAA338',
        height: windowHeight,
        width: '100%'
    },
    container_1:
    {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        height: windowHeight,
        width: '100%',
        paddingTop:16
        
        // paddingHorizontal: 25
    },
    text_logo:
    {
        fontSize: 60,
        color: 'white'
    },
    text_logo_1:
    {
        fontSize: 35,
        color: '#FAA338'
    }
});

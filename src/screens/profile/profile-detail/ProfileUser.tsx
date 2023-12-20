import React from 'react'
import { Button, Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { ItemInput } from './ItemInput'
import { ICON } from '../../../assets'
export const ProfileUser = () => {
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: 'white', }}
        >
            <ScrollView 
                showsVerticalScrollIndicator={false}
            style={{ flex: 1}}>
                <View style={{ flex: 1,  padding: 16, gap: 16,marginBottom:32 }}>
                    <View style={{ alignItems: 'center' }}>
                        <View>
                            <Image
                                source={ICON.BANNER}
                                style={{ width: 100, height: 100, resizeMode: 'contain', borderRadius: 100 }}
                            />
                            <View style={{ width: 18, height: 18, borderRadius: 100, position: 'absolute', bottom: 2, right: 10 }}>
                                <Image
                                    source={ICON.FILTER}
                                    style={{ width: 18, height: 18, resizeMode: 'contain', borderRadius: 100 }}
                                />
                            </View>
                        </View>

                    </View>
                    <ItemInput
                        placeholder='Họ và tên'
                        title='Nhập họ và tên'
                    />
                    <ItemInput
                        placeholder='Số điện thoại'
                        title='Nhập số điện thoại'
                    />

                    <ItemInput
                        placeholder='20/01/2023'
                        title='Ngày sinh'
                    />
                    <ItemInput
                        placeholder='Email'
                        title='Nhập email'
                    />
                    <ItemInput
                        placeholder='Địa chỉ'
                        title='Nhập địa chỉ'
                    />
                    <Button
                        title='Cập nhật'
                        color={'#FAA338'}
                
                    />
                    {/* <ItemInput
              placeholder=''
              title='Ngày sinh'
          /> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

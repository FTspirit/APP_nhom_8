import React, { useEffect, useState } from 'react'
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ICON } from '../../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage'
const type = ['Chưa xác nhận', 'Chờ hàng', 'Đang giao', 'Hoàn thành']
export const History = () => {
    const [isStatus, setIsStatus] = useState(0)
    const [list, setList] = useState<any[]>([])
    async function fake() {
        var listCart = await AsyncStorage.getItem('list_cart_history')
        if (listCart) {
            setList(JSON.parse(listCart))
        }
    }
    const filer = () =>{
        return(list?.filter((item)=>(item?.order === isStatus)))
    }
    useEffect(() => {
        fake()

    }, [])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, backgroundColor: '#EFF2F5', paddingTop: 16, gap: 16 }}>
                <View>
                    <FlatList
                        data={type}
                        horizontal
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => setIsStatus(index)}
                                style={{ borderBottomWidth: isStatus === index ? 2 : 0, borderColor: '#FAA338', flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 10, backgroundColor: 'white' }}>
                                <Text style={{ fontWeight: '500' }}>
                                    {item}
                                </Text>

                            </TouchableOpacity>
                        )}
                    />
                </View>
                <FlatList
                    data={filer()}
                    contentContainerStyle={{ gap: 8, paddingHorizontal: 8 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <View style={{ gap: 12, backgroundColor: 'white', paddingHorizontal: 16, borderRadius: 14, elevation: 2, paddingVertical: 12 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>
                                   {item?.id}
                                </Text>
                                <Text style={{ color: '#83AFA8' }}>
                                   {type[item?.order]}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                                <Image
                                    source={{ uri: item?.img }}
                                    style={{ width: 72, height: 72, resizeMode: 'center', borderWidth: 1, borderColor: 'red' }}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text>
                                        {item?.name}
                                    </Text>
                                    <Text
                                        numberOfLines={3}
                                        ellipsizeMode='tail'
                                    >
                                        {item?.mota}
                                    </Text>
                                    <Text style={{ textAlign: 'right' }}>
                                        x1 {item?.gia}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderTopWidth: 0.5, borderColor: '#C1D7D4' }}>
                                <Text>
                                    {item?.total} sản phẩm
                                </Text>
                                <Text style={{ color: '#FAA338' }}>
                                    {/* Thành tiền */}
                                </Text>
                            </View>
                        </View>
                    )}
                />

            </View>
        </SafeAreaView>
    )
}

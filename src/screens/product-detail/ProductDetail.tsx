import React, { isValidElement, useState } from 'react'
import { Alert, Dimensions, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ICON } from '../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ProductDetail = ({ navigation, route }: any) => {
    const size = Dimensions.get('screen').width
    const {
        data
    } = route?.params
    const [total, setTotal] = useState(1)

    const handleBuy = async () => {
        var listCart = await AsyncStorage.getItem('list_cart')
       
        if (listCart) {
            let newList = [...JSON.parse(listCart)]
            newList.unshift({
                img: data?.image,
                name: data?.title,
                mota: data?.description,
                gia: data?.product_detail?.[0]?.price,
                total: total,
                status: false
            })
            AsyncStorage.setItem('list_cart', JSON.stringify(newList))
        }else  {
            AsyncStorage.setItem('list_cart', JSON.stringify([{
                img: data?.image,
                name: data?.title,
                mota: data?.description,
                gia: data?.product_detail?.[0]?.price,
                total: total,
                status: false
            }]))
        }
        Alert.alert('Thông báo', 'Thêm vào giỏ hàng thành công', [
            {
                text: 'Mua tiếp',
                onPress: () =>navigation.goBack(),
            },
            {
                text: 'Qua giỏ hàng',
                onPress: () => navigation.navigate('MyCart'),
            },
        ],
            { cancelable: false })
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ position: 'absolute', top: 16, left: 16, zIndex: 5, backgroundColor: 'rgba(0, 0, 0, 0.1)', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6 }}
            >
                <Image
                    source={ICON.ARROW_LEFT}
                    style={{ width: 32, height: 32, resizeMode: 'contain' }}
                />
            </TouchableOpacity>
            <ScrollView
                style={{
                    flex: 1
                }}
                showsVerticalScrollIndicator={false}
            >

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={data?.product_detail?.[0]?.image?.split(',')?.map(item => item.trim())}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                style={{ width: size, height: size * 0.85, resizeMode: 'cover', borderBottomRightRadius: 32, borderBottomLeftRadius: 32 }}
                            />
                        )}
                    />
                    {/* <View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: size, paddingHorizontal: 16, top: size * 0.4 }}>
                        <Image
                            source={ICON.ARROW_LEFT_W}
                            style={{ width: 26, height: 26, resizeMode: 'cover', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 30, paddingVertical:4 }}
                        />
                        <Image
                            source={ICON.ARROW_RIGHT_W}
                            style={{ width: 26, height: 26, resizeMode: 'cover', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 30, paddingVertical:4 }}
                        />
                    </View> */}
                </View>
                <View style={{ padding: 16 }}>
                    <Text style={{ fontSize: 26, color: 'black', fontWeight: '500' }}>
                        {data?.title}
                    </Text>
                    {/* <Text maxFontSizeMultiplier={4} style={{ fontSize: 14, color: 'black', fontWeight: '400' }}>
                        Tên sản phẩm
                    </Text> */}
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>
                                Giá
                            </Text>
                            <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>
                                Số lượng
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, color: '#EA3323', fontWeight: '500' }}>
                                {data?.product_detail?.[0]?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 6, alignItems: 'center' }}>
                                <TouchableOpacity

                                    onPress={() => { total && setTotal(total - 1) }}
                                    style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#ED5345', width: 30, height: 30, borderRadius: 50 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500' }}>
                                    {total}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => { setTotal(total + 1) }}
                                    style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: '#3FAF1D', width: 30, height: 30, borderRadius: 50 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, color: '#FAA338', fontWeight: '500' }}>
                            Thông tin chi tiết
                        </Text>
                        <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                            <Text style={{ fontSize: 16, color: '#434A56', fontWeight: '500' }}>
                                Màn hình : {data?.product_detail?.[0]?.screen} inch
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                            <Text style={{ fontSize: 16, color: '#434A56', fontWeight: '500' }}>
                                CPU  : {data?.product_detail?.[0]?.chip}
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                            <Text style={{ fontSize: 16, color: '#434A56', fontWeight: '500' }}>
                                Ram : {data?.product_detail?.[0]?.ram} GB
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                            <Text style={{ fontSize: 16, color: '#434A56', fontWeight: '500' }}>
                                Rom : {data?.product_detail?.[0]?.rom} GB
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                            <Text style={{ fontSize: 16, color: '#434A56', fontWeight: '500' }}>
                                Pin : {data?.product_detail?.[0]?.battery} mAh
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                            <Text style={{ fontSize: 16, color: '#434A56', fontWeight: '500' }}>
                                Hệ điều hành : {data?.product_detail?.[0]?.os}
                            </Text>
                        </View>
                        <View style={{ paddingVertical: 10, borderBottomWidth: 0.5, borderColor: 'gray' }}>
                            <Text style={{ fontSize: 16, color: '#434A56', fontWeight: '500' }}>
                                camera : {data?.product_detail?.[0]?.camera} mAh
                            </Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <TouchableOpacity
                onPress={handleBuy}
                style={{ paddingHorizontal: 60, paddingVertical: 16, borderRadius: 10, backgroundColor: '#FAA338', marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                    Mua ngay
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

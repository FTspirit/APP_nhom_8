import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StatusBar, Image, KeyboardAvoidingView } from 'react-native'
import { firebase } from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import { ICON } from '../assets';
import { getCategory, getProduct } from '../services/api/api-product';

const listFilter = [
    {
        id : 1,
        name: 'Hãng',
        selections : [
            'Apple',
            'Asus',
        ] 
    },
    {
        id: 2,
        name: 'Giá',
        selections: [
            'Dưới 7 triệu',
            'Từ 7 - 15 triệu ',
            'Từ 15 - 20 triệu',
            'Trên 20 triệu'
        ]
    }
] 

export const ZaloHome = ({ navigation }: any) => {
    const [data, setData] = useState<any>([]);
    const [category, setCategory] = useState<any[]>([]);
    const [isCategory, setIsCategory] = useState<number | undefined>();
    function getApiPro(branch_id?: number, category_id?: number) {
        getProduct({
            branch_id: branch_id,
            category_id: category_id
        }).then((e) => {
            setData(e?.data)
            // console.log(e);

        }).catch((e) => {
            console.log(e);

        })
    }
    useEffect(() => {
        console.log('kkkk');
        getApiPro()
        callCategory()
    }, [])


    function callCategory() {

        getCategory().then((e) => {
            // setData(e)
            console.log(e);
            setCategory(e?.data)
        }).catch((e) => {
            console.log(e);

        })
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={'#FAA338'}
            />
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10, backgroundColor: '#FAA338', gap: 6 }}>
                    <TextInput placeholder='LAPTOP...' style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }} />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MyCart')
                        }}
                    >
                        <Image
                            source={ICON.SHOP}
                            style={{ width: 28, height: 28, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('profile')
                        }}
                    >
                        <Image
                            source={ICON.USER}
                            style={{ width: 28, height: 28, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>

                </View>


                <View style={{ flex: 1, backgroundColor: '#E2E5E9', gap: 8 }}>
                    <View style={{ flexDirection: 'row', gap: 16, paddingHorizontal: 8, paddingVertical: 16, backgroundColor: 'white' }}>
                        <View style={{}}>
                            <Image
                                source={ICON.FILTER}
                                style={{ width: 16, height: 16, resizeMode: 'contain' }}
                            />
                            <Text style={{ color: '#FAA338', fontWeight: '600' }}>
                                Lọc
                            </Text>
                        </View>
                        <FlatList
                            data={listFilter}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 8 }}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center', borderWidth: 1, borderColor: '#FAA338', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, backgroundColor: '#FFF8EF' }}>
                                    <Text style={{ fontWeight: '500' }}>
                                        {item?.name}
                                    </Text>
                                    <Image
                                        source={ICON.ARROW_DOWN_FILL}
                                        style={{ width: 16, height: 16, resizeMode: 'contain' }}
                                    />
                                    <View style={{position:'absolute',top:24,left:6}}>
                                        <FlatList 
                                            data={item?.selections}
                                            scrollEnabled={false}
                                            renderItem={({item})=>(
                                                <View style={{paddingHorizontal:16,paddingVertical:10}}>
                                                    <Text>
                                                        {item}
                                                    </Text>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 8 }}>
                        <FlatList
                            data={category}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            // contentContainerStyle={{ gap: 8 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    // onPress={() => {
                                    //     // setIsCategory(item?.id)
                                    //     getApiPro(undefined,item?.id)
                                    // }}
                                    style={{ alignItems: 'center', gap: 6, paddingHorizontal: 4, paddingVertical: 8, minWidth: 74,
                                    //  backgroundColor: item?.id === isCategory ?'#FEE8CD' :undefined
                                      }}>

                                    <Image
                                        source={{ uri: item?.image }}
                                        style={{ width: 42, height: 42, resizeMode: 'contain' }}
                                    />
                                    <Text style={{ fontWeight: '500' }}>
                                        {item?.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 8, flex: 1 }}>
                        <FlatList
                            data={data}
                            // contentContainerStyle={{ gap: 8 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProductDetail', { data: item })}
                                    style={{ gap: 16, paddingHorizontal: 4, paddingVertical: 8, width: '100%', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#A9B0BC', flex: 1 }}>
                                    <View>
                                        <Image
                                            source={{ uri: item?.image }}
                                            style={{ width: 82, height: 82, resizeMode: 'cover' }}
                                        />
                                    </View>
                                    <View style={{ gap: 12, flex: 1 }}>
                                        <View>
                                            <Text style={{ fontWeight: '500', fontSize: 20, color: '#2C313A' }}>
                                                {item?.title}
                                            </Text>
                                            <Text
                                                numberOfLines={2}
                                                ellipsizeMode='tail'
                                                style={{ fontWeight: '400', fontSize: 16, color: '#596373' }}>
                                                {item?.description}
                                            </Text>
                                        </View>
                                        <Text style={{ fontWeight: '600', fontSize: 18, color: '#EA3323' }}>
                                            {item?.product_detail?.[0]?.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}



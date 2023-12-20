import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ICON } from '../../assets'
import AsyncStorage from '@react-native-async-storage/async-storage'

const listCart = [
    {
        img: 'https://cdn.tgdd.vn/Files/2019/08/22/1190454/laptop-vien-man-hinh-mong-co-nhung-uu-va-nhuoc-diem-gi--4.jpg',
        name: 'laptop top to',
        mota: 'dù madasd  asdasdj  asdasd  đóa',
        gia: 1000,
        total: 2,
        status: false
    },
    {
        img: 'https://cdn.tgdd.vn/Files/2019/08/22/1190454/laptop-vien-man-hinh-mong-co-nhung-uu-va-nhuoc-diem-gi--4.jpg',
        name: 'laptop top to',
        mota: 'dù madasd  asdasdj  asdasd  đóa',
        gia: 1000,
        total: 2,
        status: false
    },
    {
        img: 'https://cdn.tgdd.vn/Files/2019/08/22/1190454/laptop-vien-man-hinh-mong-co-nhung-uu-va-nhuoc-diem-gi--4.jpg',
        name: 'laptop top to',
        mota: 'dù madasd  asdasdj  asdasd  đóa',
        gia: 100000000,
        total: 2,
        status: true
    }
]

export const MyCart = () => {

    const [list, setList] = useState<any[]>([])
    async function fake() {
        var listCart = await AsyncStorage.getItem('list_cart')
        if (listCart) {
            setList(JSON.parse(listCart))
        }
    }
    useEffect(() => {
        fake()

    }, [])


    const handleChoose = (index: number) => {
        var newList = [...list];
        newList[index].status = !newList[index].status;
        setList(newList)
    }

    const handleChooseAll = () => {
        var newList = [...list];
        setList(newList.map(item => ({
            ...item,
            status: list?.findIndex(item => item?.status === false) >= 0
        })))
    }
    const sum = () =>{
        var a = 0
        list?.map((item)=>{
            if(item?.status){
                a += item?.gia * item?.total
            }
        })
        return a
    }
    const handleOrder = async () =>{
        var newList = list.filter(item => (item?.status === false));
        AsyncStorage.setItem('list_cart', JSON.stringify(newList))
        var listHi =  await AsyncStorage.getItem('list_cart_history')
        var newListHis : any[] = []
        if (listHi) {
            newListHis = JSON.parse(listHi)
        }
        Alert.alert('Thông báo', 'Đặt đơn hàng thành công', [
            {
                text: 'OK',
                onPress: () => console.log('xong')
            },
         
        ],
        { cancelable: false })
        list.filter(item => (item?.status === true))?.map((item) => ({
            ...item,
            order: 0
        }))
        .forEach((item)=>{
            newListHis.unshift(item)
        })
      
        AsyncStorage.setItem('list_cart_history', JSON.stringify(newListHis));
        setList(newList);
     
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, backgroundColor: '#EFF2F5', paddingTop: 16, }}>
                <FlatList
                    data={list}
                    contentContainerStyle={{ gap: 8, paddingHorizontal: 8, paddingBottom: 16 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'white', paddingHorizontal: 16, borderRadius: 10, elevation: 2, }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 16, }}>
                                <TouchableOpacity
                                    onPress={() => handleChoose(index)
                                    }
                                >
                                    {
                                        item?.status ?
                                            <Image
                                                source={ICON.CHECK_BOX}
                                                style={{ width: 24, height: 24, resizeMode: 'contain' }}
                                            />
                                            :
                                            <View style={{ width: 24, height: 24, borderRadius: 4, borderWidth: 0.5, borderColor: '#8C96A6' }} />

                                    }
                                </TouchableOpacity>

                                <Image
                                    source={{ uri: item?.img }}
                                    style={{ width: 82, height: 82, resizeMode: 'center', borderWidth: 1, borderColor: 'red', }}
                                />
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', gap: 6 }}>
                                    <View style={{ flex: 0.6 }}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#2C313A' }}>
                                            {item?.name}
                                        </Text>
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode='tail'
                                        >
                                            {item?.mota}
                                        </Text>
                                    </View>
                                    <View style={{  alignItems: 'flex-end', flex: 0.4,gap:8 }}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#2C313A' }}>
                                            Giá
                                        </Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FAA338' }}>
                                            x{item?.total}
                                        </Text>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#FAA338' }}>
                                            {item?.gia?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 16, backgroundColor: '#FFF8EF' }}>
                    <TouchableOpacity
                        onPress={handleChooseAll}
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
                    >
                        {
                            list?.findIndex(item => item?.status === false) >= 0 ?
                                <View style={{ width: 24, height: 24, borderRadius: 4, borderWidth: 0.5, borderColor: '#8C96A6' }} />
                                :
                                <Image
                                    source={ICON.CHECK_BOX}
                                    style={{ width: 24, height: 24, resizeMode: 'contain' }}
                                />
                        }
                        <Text>
                            Chọn tất cả
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, }}>
                        <View>
                            <Text>
                                Tổng thanh toán
                            </Text>
                            <Text style={{ color: '#BA2012' }}>
                                {sum().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={handleOrder}
                            style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6, backgroundColor: '#FAA338' }}
                        >
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
                                Mua hàng ({list?.filter(item => item?.status === true).length})
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

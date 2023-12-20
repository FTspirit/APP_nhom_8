import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { ICON } from '../../assets'

interface ItemSelectionParams {
    onPress : ()=> void, 
    list : any [], 
    title ?: string
}

export const ItemSelection = (props : ItemSelectionParams) => {


    const {
        onPress, list, title 
    } = props
    return (

        <TouchableOpacity 
        onPress={onPress}
        style={{ paddingHorizontal: 16, gap: 16 }}>
            <Text style={{ fontWeight: '400', fontSize: 18, color: '#16191D' }}>
                {title}
            </Text>
           <FlatList 
            data={list}
            scrollEnabled={false}
            renderItem={({item})=>(
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16, padding: 16, borderRadius: 16, backgroundColor: '#F1F2F4' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
                        <Image
                            source={item?.icon}
                            style={{ width: 24, height: 24, resizeMode: 'contain' }}
                        />
                        <Text style={{ fontWeight: '400', fontSize: 16, color: '#16191D' }}>
                           {item?.content}
                        </Text>
                    </View>
                    <Image
                        source={ICON.ARROW_RIGHT}
                        style={{ width: 24, height: 24, resizeMode: 'contain' }}
                    />
                </View>
            )}
           />
        </TouchableOpacity>

    )
}

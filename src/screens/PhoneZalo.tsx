import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector ,useDispatch } from 'react-redux';
export const PhoneZalo = () => {

    const userName = useSelector(( state : any) => state.appReducer.userName);
    console.log('Namessss',userName);
    const isLoading  = useSelector((state : any) => state.appReducer.isLoading);
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log('isloading' , isLoading);
        
    }, [isLoading])
    
    return (
        <View>
            <Text>phone</Text>
            <TouchableOpacity onPress={() => { 
                dispatch({ type: 'CHANGE_APP_MODE', payload: { userName: 'gà' }});
                }}
            >
                <Text>test</Text>
            </TouchableOpacity>
        </View>
    )
}

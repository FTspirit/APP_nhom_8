/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileZalo } from './screens/profile/ProfileZalo';
import { PhoneZalo } from './screens/PhoneZalo';
import { MessageZalo } from './screens/MessageZalo';
import { FlashScreen } from './screens/FlashScreen';
import { ZaloHome } from './screens/ZaloHome';
import { LoginZalo } from './screens/LoginZalo';
import {Provider} from 'react-redux';
import Redux from './redux/store'
import { ProfileUser } from './screens/profile/profile-detail/ProfileUser';
import { ProductDetail } from './screens/product-detail/ProductDetail';
import { MyCart } from './screens/MyCart.tsx';
import { History } from './screens/profile/history.tsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const MainHome = () => {

  const Render_ = () => (
      <View style={{backgroundColor:'blue'}}>
      <Text style={{ color:'white',fontSize:16, fontWeight:'600' }}>Nguyễn Văn A</Text>
      <Text style={{ color: 'white',fontSize:12 }}>Trạng thái hoạt động</Text>
      </View>
  );
  const Render_Right = () =>{

    return(
      <View style={{flexDirection:'row',gap:12}}>
        <View style={{ width: 30, height: 30, backgroundColor: 'green', marginLeft: 12 }}/>
        <View style={{ width: 30, height: 30, backgroundColor: 'green', marginLeft: 12 }}/>
        <View style={{ width: 30, height: 30, backgroundColor: 'green', marginLeft: 12 }}/>
      </View>
    );
    // return(
    // <View >
    //     <FlatList horizontal={true}
    //     data={data}
    //     renderItem={(item)=>(
    //       <View style={{ width: 30, height: 30, backgroundColor: 'green' ,marginLeft:12 }}>
    //         <Text>{item.item}</Text>
    //       </View>
    //     )}
    //   />
    // </View>
    // )
};
  
          
  const Tab_Bottom_Home = ()=> (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="message" component={ZaloHome}
          options={{
            title: 'Tin nhắn',
            tabBarBadge:10
            // header: Render_
          }}

        />
        <Tab.Screen name="phone" component={PhoneZalo} 
          options={{
            title: 'Danh bạ'
          }}
        />
        
        
        {/* nhật ký */}
        {/* <Tab.Screen name="phone" component={PhoneZalo} 
        options={{
          title: 'Danh bạ'
        }}
        /> */}
      <Tab.Screen name="profile" component={ProfileZalo}
        options={{
          title: 'Cá nhân'
        }}
      />
    </Tab.Navigator>
  );
  // headerShown: false 
  return (
    <View style={{flex:1,backgroundColor:'#0066CC'}}>
      <Provider store={Redux.store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="flash" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="flash" component={FlashScreen} />
            {/* <Stack.Screen name="home" component={Tab_Bottom_Home} /> */}
            <Stack.Screen name="profile" component={ProfileZalo}
              options={{
                headerShown: true,
                title: 'Cá nhân',
                headerTintColor: 'black',
                headerStyle: { backgroundColor: 'white' }
              }}
            />
            <Stack.Screen name="MyCart" component={MyCart}
              options={{
                headerShown: true,
                title: 'Giỏ hàng',
                headerTintColor: 'black',
                headerStyle: { backgroundColor: 'white' }
              }}
            />
            <Stack.Screen name="History" component={History}
              options={{
                headerShown: true,
                title: 'Lịch sử mua hàng',
                headerTintColor: 'black',
                headerStyle: { backgroundColor: 'white' }
              }}
            />
            <Stack.Screen name="ProductDetail" component={ProductDetail}
              options={{
                headerShown: false,
                
              }}
            />
            <Stack.Screen name="ProfileUser" component={ProfileUser}
              options={{
                headerShown: true,
                title: 'Thông tin cá nhân',
                headerTintColor: 'black',
                headerStyle: { backgroundColor: 'white' }
              }}
            />
            <Stack.Screen name="message" component={ZaloHome} />
            <Stack.Screen name="mess" component={MessageZalo}
              options={{
                headerShown: true,
                headerBackTitle: 'Go Back',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#FAA338' },
                headerTitle: Render_,
                headerRight: Render_Right,

                // headerLeft:Render_

                // header :Render_

              }}
            />
            <Stack.Screen name="login" component={LoginZalo}
              options={{
                headerShown: true,
                title: 'Đăng nhập',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#FAA338' }
              }}
            />
          </Stack.Navigator >
        </NavigationContainer>
      </Provider>
    </View>
  );
};

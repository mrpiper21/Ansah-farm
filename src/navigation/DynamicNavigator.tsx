import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import ResourceDetailScreen from '../screens/protected/home/ResourceDetails';
import ChatScreen from '../screens/protected/home/Chat';
import OrderDetailsScreen from '../screens/protected/home/OrderDetails';
import OrderScreen from '../screens/protected/home/OrderScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import FarmerProduce from '../screens/protected/home/FarmProduceScreen';
import SellScreen from '../screens/protected/home/SellScreen';

export type DynamicStackParamList = {
  'resource-details': { id: string };
  'order-details': { id: string };
  'chat': undefined; // Add your params if needed
  'listing': undefined;
  'orders': undefined;
  "farmer-produce": undefined;
  "sell": undefined
};
export type DynamicStackScreenProps<T extends keyof DynamicStackParamList> = 
  StackScreenProps<DynamicStackParamList, T>;

  const Stack = createStackNavigator<DynamicStackParamList>();

const DynamicNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="resource-details" initialParams={{id: ""}} component={ResourceDetailScreen as React.ComponentType<any>} />
        <Stack.Screen name="chat" component={ChatScreen} />
        <Stack.Screen name="order-details" component={OrderDetailsScreen as React.ComponentType<any>} />
        {/* <Stack.Screen name="product-details" component={OrderDetailsScreen} /> */}
        <Stack.Screen name="orders" component={OrderScreen} />
        <Stack.Screen name="farmer-produce" component={FarmerProduce} />
        <Stack.Screen name="sell" component={SellScreen} />
      </Stack.Navigator>
  )
}

export default DynamicNavigator
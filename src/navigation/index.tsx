import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import TabsNavigator from './TabNavigator';
import LoginScreen from '../screens/auth/login';
import useAuthStore from '../store/auth-store';
import DynamicNavigator from './DynamicNavigator';
import { ChatProvider } from "../context/chatContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
	const { user } = useAuthStore((state) => state);
	return (
		<NavigationContainer>
			{user ? (
				<ChatProvider>
					<Stack.Navigator>
						<Stack.Screen
							name="Tabs"
							component={TabsNavigator}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="dynamicNavigator"
							component={DynamicNavigator}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</ChatProvider>
			) : (
				<Stack.Navigator>
					<Stack.Screen
						name="AuthNavigator"
						component={AuthNavigator}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default AppNavigator
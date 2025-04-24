import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
	StyleSheet,
	Text,
	TextInput,
	useColorScheme,
	View,
	Platform,
} from "react-native";
import { EvilIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";

// Import your screens
import FarmerDashboard from "../screens/protected/home/HomeScreen";
import ExploreScreen from "../screens/protected/explore";
import MarketPlace from "../screens/protected/market";
import ProfileScreen from "../screens/protected/profile";
import SessionScreen from "../screens/protected/session";
import { useLocationStore } from "../store/location-store";
import useAuthStore from "../store/auth-store";
import { Colors } from "../constants/Colors";
import responsive from "../helpers/responsive";
import useCartStore from "../store/cart-store";
import CartScreen from "../screens/protected/cart";
import CartTabBadge from "../components/atoms/cartBadge";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
	const colorScheme = useColorScheme();
	const { locationName } = useLocationStore();
	const { user } = useAuthStore((state) => state);
	const [searchQuery, setSearchQuery] = React.useState("");
	const totalOrders = useCartStore.getState().getTotalItems();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: Colors[colorScheme ?? "light"].background,
					paddingBottom: Platform.OS === "ios" ? 20 : 10,
					height: Platform.OS === "ios" ? 90 : 70,
				},
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
				tabBarInactiveTintColor: Colors[colorScheme ?? "light"].text,
				tabBarLabelStyle: {
					fontSize: 12,
					marginBottom: Platform.OS === "ios" ? 0 : 5,
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={FarmerDashboard}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "home" : "home-outline"}
							size={28}
							color={color}
						/>
					),
					headerShown: true,
					header: () => (
						<View style={styles.header}>
							<Text style={styles.welcomeText}>Welcome, {user?.userName}</Text>
							{user?.location && (
								<View style={styles.locationText}>
									<EvilIcons name="location" size={24} color="black" />
									<Text>{locationName}</Text>
								</View>
							)}
						</View>
					),
				}}
			/>

			{user?.type == "farmer" && (
				<Tab.Screen
					name="Explore"
					component={ExploreScreen}
					options={{
						tabBarIcon: ({ color, focused }) => (
							<Ionicons
								name={focused ? "compass" : "compass-outline"}
								size={28}
								color={color}
							/>
						),
						headerShown: true,
						header: () => (
							<View style={styles.exploreHeader}>
								<Text style={styles.headerTitle}>Explore Resources</Text>
								{/* <View style={styles.searchContainer}>
									<View style={styles.searchBox}>
										<MaterialIcons
											name="search"
											size={20}
											color={Colors.light.text}
										/>
										<TextInput
											style={styles.searchText}
											placeholder="Search resources..."
											placeholderTextColor={Colors.light.text}
											value={searchQuery}
											onChangeText={setSearchQuery}
										/>
									</View>
								</View> */}
							</View>
						),
					}}
				/>
			)}

			{user?.type === "client" && (
				<Tab.Screen
					name="Cart"
					component={CartScreen}
					options={{
						tabBarIcon: ({ color, focused }) => (
							<View>
								<Ionicons
									name={focused ? "cart" : "cart-outline"}
									size={28}
									color={color}
								/>
								{totalOrders > 0 && <CartTabBadge />}
							</View>
						),
						headerShown: true,
						header: () => (
							<View style={styles.exploreHeader}>
								<Text style={styles.headerTitle}>Market</Text>
								<View style={styles.searchContainer}>
									<View style={styles.searchBox}>
										<MaterialIcons
											name="search"
											size={20}
											color={Colors.light.text}
										/>
										<TextInput
											style={styles.searchText}
											placeholder="Search food..."
											placeholderTextColor={Colors.light.text}
											value={searchQuery}
											onChangeText={setSearchQuery}
										/>
									</View>
								</View>
							</View>
						),
					}}
				/>
			)}

			<Tab.Screen
				name="Sessions"
				component={SessionScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "chatbubbles" : "chatbubbles-outline"}
							size={28}
							color={color}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "person" : "person-outline"}
							size={28}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    marginTop: responsive.Dh(5),
    paddingHorizontal: 16
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreHeader: {
    marginTop: responsive.Dh(5),
    paddingHorizontal: 16
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  searchText: {
    flex: 1,
    marginLeft: 8,
    color: Colors.light.text,
    fontSize: 16,
  },
});
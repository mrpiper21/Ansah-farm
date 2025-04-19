import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

// Import your screens
import FarmerDashboard from '../screens/protected/home/HomeScreen';
import ExploreScreen from '../screens/protected/explore';
import MarketPlace from '../screens/protected/market';
import ProfileScreen from '../screens/protected/profile';
import SessionScreen from '../screens/protected/session';
import { useLocationStore } from '../store/location-store';
import useAuthStore from '../store/auth-store';
import { Colors } from '../constants/Colors';
import { IconSymbol } from '../components/ui/IconSymbol';
import responsive from '../helpers/responsive';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const colorScheme = useColorScheme();
  const { locationName } = useLocationStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].text,
      }}
    >
      <Tab.Screen
        name="Home"
        component={FarmerDashboard}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'house.fill' : 'house'}
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
      
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'paperplane.fill' : 'paperplane'}
              color={color}
            />
          ),
          headerShown: true,
          header: () => (
            <View style={styles.exploreHeader}>
              <Text style={styles.headerTitle}>Explore Resources</Text>
              <View style={styles.searchContainer}>
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
              </View>
            </View>
          ),
        }}
      />
      
      <Tab.Screen
        name="Market"
        component={MarketPlace}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? 'seal.fill' : 'seal'}
              color={color}
            />
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
      
      <Tab.Screen
        name="Sessions"
        component={SessionScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
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
            <IconSymbol
              size={28}
              name={focused ? 'person.fill' : 'person'}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Reuse your existing styles
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
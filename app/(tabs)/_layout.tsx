import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { Chrome as Home, Search, Bookmark, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const activeColor = "#FF3B30"; // iOS red theme color
  const inactiveColor = "#8E8E93"; // iOS gray theme color
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarBackground: () => 
          Platform.OS === 'ios' ? (
            <BlurView 
              tint="dark" 
              intensity={80} 
              style={StyleSheet.absoluteFill} 
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ size, color }) => (
            <Bookmark size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#121212',
    borderTopWidth: 0,
    elevation: 0,
    height: 60,
    paddingBottom: 8,
  },
  tabBarLabel: {
    fontWeight: '500',
    fontSize: 11,
  },
});
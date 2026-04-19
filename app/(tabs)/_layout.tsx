import { Tabs } from 'expo-router';
import { BottomTabBar } from '../../src/components/BottomTabBar';

export default function TabLayout() {
  return (
    <Tabs 
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ title: 'Home' }} 
      />
      <Tabs.Screen 
        name="records" 
        options={{ title: 'Records' }} 
      />
      <Tabs.Screen 
        name="hospital" 
        options={{ title: 'Hospital' }} 
      />
    </Tabs>
  );
}

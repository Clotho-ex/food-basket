import useAuthStore from "@/store/auth.store";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import cn from "clsx";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface TabBarIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  focused: boolean;
  title: string;
}

function TabBarIcon({ name, focused, title }: TabBarIconProps) {
  return (
    <View className="tab-icon">
      <MaterialCommunityIcons
        name={name}
        size={24}
        resizeMode="contain"
        tintColor={focused ? "#FE8C00" : "#878787"}
        color={focused ? "#FE8C00" : "#878787"}
      />
      <Text
        className={cn(
          "font-quicksand-bold text-sm",
          focused ? "text-primary" : "text-gray-200",
        )}
      >
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: "absolute",
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.25,
          shadowRadius: 1,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="home-outline" focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="magnify" focused={focused} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="cart-outline" focused={focused} title="Cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="account-outline"
              focused={focused}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}

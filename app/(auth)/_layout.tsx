import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import { useMemo } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore();

  const headerHeight = useMemo(
    () => Dimensions.get("screen").height / 2.25,
    [],
  );

  if (isAuthenticated) return <Redirect href="/" />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        className="h-full bg-white"
        keyboardShouldPersistTaps="handled"
      >
        <View className="relative w-full" style={{ height: headerHeight }}>
          <ImageBackground
            source={images.loginGraphic}
            className="size-full rounded-b-lg"
            resizeMode="stretch"
          />
          <Image
            source={images.logo}
            className="absolute -bottom-16 z-10 size-48 self-center"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

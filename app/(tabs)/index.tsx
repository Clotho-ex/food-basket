import CartButton from "@/components/CartButton";
import { offers } from "@/constants";
import { signOut } from "@/lib/appwrite";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import cn from "clsx";
import { router } from "expo-router";
import { Fragment } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex-between my-5 w-full flex-row">
            <View className="flex-start">
              <Text className="small-bold text-primary">Deliver to</Text>
              <TouchableOpacity className="flex-center mt-0.5 flex-row gap-x-1">
                <Text className="paragraph-bold text-dark-100">
                  Bulgaria, Sofia
                </Text>
                <MaterialCommunityIcons
                  name="arrow-down"
                  size={24}
                  color="#FE8C00"
                  resizeMode="contain"
                  tintColor="#FE8C00"
                />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        )}
        ListFooterComponent={() => (
          <TouchableOpacity
            onPress={() => {
              signOut().then(() => {
                router.replace("/sign-in");
              });
            }}
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>
        )}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row",
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#FFFFFF22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className="h-full w-1/2">
                      <Image
                        source={item.image}
                        className="h-full w-full"
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-10" : "pr-10",
                      )}
                    >
                      <Text className="h1-bold leading-tight text-white">
                        {item.title}
                      </Text>
                      <MaterialCommunityIcons
                        name="arrow-right"
                        size={24}
                        color="white"
                        resizeMode="contain"
                        tintColor="white"
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

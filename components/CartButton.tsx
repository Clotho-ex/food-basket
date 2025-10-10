import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const totalItems = 10;

  return (
    <TouchableOpacity className="cart-btn" onPress={() => {}}>
      <MaterialCommunityIcons name="shopping-outline" size={24} color="white" />
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;

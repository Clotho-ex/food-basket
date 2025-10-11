import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.name || !form.email || !form.password)
      return Alert.alert("Error", "All fields are required");

    setIsSubmitting(true);
    try {
      // Call Appwrite SignUp Function

      Alert.alert("Success", "Sign Up successful");
      router.replace("/");
    } catch {
      Alert.alert("Error", "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="mt-5 gap-10 rounded-lg bg-white p-5">
      <CustomInput
        placeholder="Enter your name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Name"
      />
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) =>
          setForm((prev) => ({ ...prev, password: text }))
        }
        label="Password"
        keyboardType="default"
        secureTextEntry={true}
      />
      <CustomButton title="Sign Up" onPress={submit} isLoading={isSubmitting} />
      <View className="mt-5 flex flex-row justify-center gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?
        </Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
        <Text className="base-regular text-gray-100">here</Text>
        <Text className="base-regular text-gray-100">to sign in</Text>
      </View>
    </View>
  );
};

export default SignUp;

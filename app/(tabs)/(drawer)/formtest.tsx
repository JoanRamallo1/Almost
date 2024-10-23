import { Image, StyleSheet, Platform } from "react-native";
import { Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { View, TextInput, Button } from "react-native";
import FormInputController from "@/components/myComponents/FormInputController";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().min(2, "Username of 2 plis").required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
});

export default function HomeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  console.log(errors);
  return (
    <View style={styles.container}>
      <Text>Helloaa FORaaa</Text>
      <FormInputController
        control={control}
        errors={errors}
        name="name"
        placeholder="name"
        rules={{ required: "name is required" }}
      ></FormInputController>
      <FormInputController
        control={control}
        errors={errors}
        name="email"
        placeholder="Email"
        rules={{ required: "Email is required" }}
      ></FormInputController>
      <FormInputController
        control={control}
        errors={errors}
        name="password"
        placeholder="password"
        rules={{ required: "password is required" }}
        secureTextEntry
      ></FormInputController>
      <Button
        title="Submit"
        onPress={handleSubmit((data) => console.log(data))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    width: "90%",
    marginTop: 8,
    borderColor: "black",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

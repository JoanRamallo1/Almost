import { Image, StyleSheet, Platform, TextInputProps } from "react-native";
import { Text } from "react-native";
import { View, TextInput, Button } from "react-native";
import { Control, Controller, FieldValues, FieldErrors } from "react-hook-form";
import { FC } from "react";
interface FormInputControllerProps {
  control: Control<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  name: string;
  placeholder: string;
  props?: TextInputProps;
  secureTextEntry?: boolean;
  rules?: any;
}
const FormInputController: FC<FormInputControllerProps> = ({
  control,
  errors,
  name,
  placeholder,
  ...props
}) => {
  return (
    <>
      <Text>{name}</Text>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...props}
          ></TextInput>
        )}
        //rules={rules}
      />
      {errors && errors[name] && <Text>{errors[name]?.message}</Text>}
    </>
  );
};
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

export default FormInputController;

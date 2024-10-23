import { Image, StyleSheet, Platform, Pressable } from "react-native";
import { Text } from "react-native";
import { View, TextInput, Button } from "react-native";
import axios from "axios";
import { useState } from "react";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tokken, setToken] = useState({});
  const submitForm3 = async () => {
    let formData = { UserId: "jramallo", Password: "User_1234" };

    console.log("submittin");
    const API_URL = "https://nsbilling.sisinf.com/Account/CheckPassword";
    try {
      axios
        .post(API_URL, formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.message); // logs the error message
          console.log(error.response); // logs the full error response
          console.log(error.request); // logs the request if no response was received
        });
    } catch (e) {
      console.log(e);
    }
  };
  const submitForm2 = async () => {
    let formData = {
      UserId: "jramallo",
      Password: "User_1234",
      SelectedDatabase: "MT",
    };

    console.log("dologin");
    const API_URL = "https://nsbilling.sisinf.com/Account/DoLogin";
    try {
      axios
        .post(API_URL, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log("aaa" + e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const submitForm4 = async () => {
    let formData = {
      UserId: "jramallo",
      Password: "User_1234",
      Database: "MT",
      Language: "ca",
    };

    console.log("Authenticate");
    const API_URL =
      "https://nsbilling.sisinf.com:444/api/Authentication/Authenticate/true";
    try {
      axios
        .post(API_URL, formData)
        .then((response) => {
          console.log(response.data);
          setToken(response.data.value);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const submitForm5 = async () => {
    let formData = {
      Address: null,
      Comments: null,
      CountryId: null,
      DateOfBirth: null,
      DateOfDeath: null,
      Email: null,
      EmailNotifications: false,
      FullName: "joan",
      Gender: null,
      IdentificationDocument: "",
      IdentificationDocumentTypeId: null,
      Inactive: false,
      InactiveDate: null,
      IntellectualDisability: false,
      LastDate: null,
      LastUser: null,
      Locality: null,
      MailNotifications: false,
      Mobile: null,
      Municipality: null,
      MunicipalityId: null,
      Name: "",
      PatientId: "",
      PatientLanguage: null,
      PhoneNotifications: false,
      Province: null,
      ProvinceId: null,
      SMSNotifications: false,
      SanitaryIdNumber: "",
      SecondSurname: "",
      Surname: "",
      Telephone: null,
      ValidatedData: false,
      ZIPCode: null,
    };

    console.log("patient");
    console.log(tokken);
    const API_URL =
      "https://nsbilling.sisinf.com:444/api/Patients/SearchPatients";
    try {
      axios
        .post(API_URL, formData, {
          headers: { Authorization: "Bearer " + tokken },
        })
        .then((response) => {
          console.log(response.data[0].FullName);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Text>https://nsbilling.sisinf.com/Account/CheckPassword</Text>
      <Button title="Submit" onPress={submitForm3} />
      <Text>https://nsbilling.sisinf.com/Account/DoLogin</Text>
      <Button title="DoLogin" onPress={submitForm2} />
      <Text>https://.../api/Authentication/Authenticate/true</Text>
      <Button title="Authenticate" onPress={submitForm4} />
      <Text>https://nsbilling.sisinf.com:444/api/Patients/SearchPatients</Text>
      <Button title="SearchPatient" href={"/paptata"} onPress={submitForm5} />
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

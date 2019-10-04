import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, AsyncStorage, TouchableOpacity } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Input, Button } from 'react-native-elements';
import Axios from "axios";


type IPropsLoginScreen = {
  navigation: NavigationStackProp;
};

interface Registerdata {
  userid: string;
  password: string;
  email: string;
}
interface Logindata {
  userid: string;
  password: string;
}

interface IStateLoginScreen {
  userid: string;
  password: string;
}

export class LoginScreen extends React.Component<
  IPropsLoginScreen,
  IStateLoginScreen
  > {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: ""
    };
  }
  static navigationOptions = ({ navigation }) => {
    return { headerTitle: "Đăng nhập" };
  };
  private onsubmit = async () => {
    const url = "http://163.47.9.196:8000/api/login"
    const userid = "kalkalkal", password = "123123123"
    let rsp = await Axios.post(url, { userid, password }), { data } = rsp
    if (data && data.token) {
      await AsyncStorage.setItem('login_token', data.token)
      this.props.navigation.navigate("Connect")
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={{
              width: 90,
              height: 90
            }}
            resizeMethod="resize"
            resizeMode="contain"
            source={require("../../../assets/images.png")}
          />
          <Text style={{ fontSize: 20, color: "#162B97" }}>HaraHotdeal</Text>
        </View>
        <View>
          <KeyboardAvoidingView enabled behavior="padding">
            <Input
              onChange={value =>
                this.setState({ userid: value.nativeEvent.text })
              }
              placeholder="Tên đăng nhập"
            />
            <Input
              onChange={value =>
                this.setState({ password: value.nativeEvent.text })
              }
              placeholder="mật khẩu"
            />
          </KeyboardAvoidingView>
        </View>
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            style={styles.touchbtn}
            onPress={this.onsubmit}
          >
            <Text>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10
  },
  header: {
    alignItems: "center",
    justifyContent: "center"
  },
  touchbtn: {
    backgroundColor: "#FFEF00",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%"
  }
});

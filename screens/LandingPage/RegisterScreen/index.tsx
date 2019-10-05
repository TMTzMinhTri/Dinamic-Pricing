import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, SegmentedControlIOSComponent, AsyncStorage, TouchableOpacity } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Input, Button } from 'react-native-elements';
import axios from 'axios'

type IPropsRegisterScreen = {
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
const urlRegister = "/api/register";
const login = "/api/login";

interface IStateRegisterScreen {
  userid: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export class RegisterScreen extends React.Component<IPropsRegisterScreen, IStateRegisterScreen> {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: "",
      confirmPassword: "",
      email: ""
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Đăng ký"
    };
  };
  private onSubmit = async () => {
    const { email, password, userid } = this.state
    // const email = "12312111", password = "1234", userid = "123123111"
    const datapost = { email, userid, password }
    try {
      let rsp = await axios.post('http://163.47.9.196:8000/api/register', datapost), { data } = rsp
      console.log(rsp.status)
      if (data.status === "Success") {
        try {
          const logindata = { userid, password }
          let rsp = await axios.post('http://163.47.9.196:8000/api/login', logindata), { data } = rsp
          console.log(rsp.data)
          if (data && data.token) {
            await AsyncStorage.setItem('login_token', data.token)
            this.props.navigation.navigate("Connect")
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  render() {
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={{flex:1}}>
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
          <View style={styles.body}>
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
            <Input
              onChange={value =>
                this.setState({ confirmPassword: value.nativeEvent.text })
              }
              placeholder="xác nhận mật khẩu"
            />
            <Input
              onChange={value =>
                this.setState({ email: value.nativeEvent.text })
              }
              placeholder="email"
            />
            <TouchableOpacity
              style={styles.touchbtn}
              onPress={this.onSubmit}
            >
              <Text>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },

  header: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center"
  },
  body: {
    flex: 0.7,

  },
  touchbtn: {
    marginTop:30,
    backgroundColor: "rgb(127,	162,	244	)",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "100%"
  }
});

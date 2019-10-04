import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, ActivityIndicator } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Input, Button } from 'react-native-elements';
import Axios from "axios";


type IPropsLoginScreen = {
  navigation: NavigationStackProp;
};

interface IStateLoginScreen {
  userid: string;
  password: string;
  loading: boolean
}

export class LoginScreen extends React.Component<IPropsLoginScreen, IStateLoginScreen> {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: "",
      loading: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return { headerTitle: "Đăng nhập" };
  };
  private onsubmit = async () => {
    this.setState({ loading: true }, async () => {
      const url = "http://163.47.9.196:8000/api/login"
      const userid = "kalkalkal", password = "123123123"
      let rsp = await Axios.post(url, { userid, password }), { data } = rsp
      if (data && data.token) {
        await AsyncStorage.setItem('login_token', data.token)
        this.setState({ loading: false }, () => {
          this.props.navigation.push("Connect")
        })
      }
    })
  }

  render() {
    const { loading } = this.state
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              // style={{ width: 1000, height: 120 }}
              resizeMethod="resize"
              resizeMode="contain"
              source={require("../../../assets/images.png")}
            />
            <Text style={{ fontSize: 28, color: "#162B97" }}>HaraHotdeal</Text>
          </View>
          <View style={styles.body}>
              <Input
                onChange={value => this.setState({ userid: value.nativeEvent.text })}
                placeholder="Tên đăng nhập"
								style={{marginBottom: 50}}
              />
            <Input
              onChange={value => this.setState({ password: value.nativeEvent.text })}
              placeholder="mật khẩu" />
            <TouchableOpacity
              style={styles.touchbtn}
              onPress={this.onsubmit}>
              <Text>Đăng nhập</Text>
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
    width: "100%",
    alignItems: "center",

  },
  header: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  body: {
    flex: 0.7,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",
  },
  touchbtn: {
  backgroundColor: "rgb(127,	162,	244	)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 20,
    width: "50%"
  }
});

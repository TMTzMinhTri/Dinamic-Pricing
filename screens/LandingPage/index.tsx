import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { Button } from "react-native-elements";

type IPropsLandingScreen = {
  navigation: NavigationStackProp;
};
export class LandingScreen extends React.Component<IPropsLandingScreen, {}> {
  static navigationOptions = {
    header: null
  };

  private _login = () => {
    this.props.navigation.navigate("Login");
  };
    componentDidMount() {
        const { navigation } = this.props;
        AsyncStorage.getItem("login_token").then(res => {
            if (res) {
                navigation.navigate("Connect");
            }
        })
    }

  private _register = () => {
    this.props.navigation.navigate("Register");
  };

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>Hara</Text>
          <Text style={[styles.appTitle, styles.noPadding]}>Hotdeal</Text>
          <Text style={styles.description}>
            Tối đa hóa lợi nhuận cho hàng tồn kho chỉ bằng một cú chạm
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={{ flex: 1, height: undefined, width: undefined }}
            resizeMethod="resize"
            resizeMode="contain"
            source={require("../../assets/2456069.png")}
          />
        </View>
        <View style={styles.functionContainer}>
          <View style={{ width: "35%", marginRight: 20 }}>
            <TouchableOpacity style={styles.touchbtn} onPress={this._register}>
              <Text>Đăng ký</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "35%", marginRight: 20 }}>
            <TouchableOpacity style={styles.touchbtn} onPress={this._login}>
              <Text>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
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
  titleContainer: {
    flex: 0.35,
    flexDirection: "column",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: -20,
    paddingBottom: 0
  },
  imageContainer: {
    flex: 0.5
  },
  touchbtn: {
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "#FFEF00",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    shadowRadius: 15
  },

  functionContainer: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "500",
    color: "#162B97"
  },
  noPadding: {
    marginTop: -10
  },

  description: {
    color: "#686C80",
    marginTop: 12
  },

  loginButton: {
    flex: 1,
    color: "#000"
  },

  demoButton: {
    flex: 1,
    color: "#000"
  }
});

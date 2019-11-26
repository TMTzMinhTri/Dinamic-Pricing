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
    this.props.navigation.push("Login");
  };
    componentDidMount() {
        const { navigation } = this.props;
        // AsyncStorage.getItem("login_token").then(res => {
        //     if (res) {
        //         navigation.push("Home");
        //     }
        // })
    }

  private _register = () => {
    this.props.navigation.push("Register");
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
          <View style={{ width: "35%"}}>
            <TouchableOpacity style={styles.touchbtn} onPress={this._register}>
              <Text style={{fontSize:16, fontWeight:"bold"}}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "35%" }}>
            <TouchableOpacity style={styles.touchbtn} onPress={this._login}>
              <Text  style={{fontSize:16, fontWeight:"bold"}}>Đăng nhập</Text>
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
  },
  titleContainer: {
    flex: 0.3,
    flexDirection: "column",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  imageContainer: {
    flex: 0.5,
  },
  touchbtn: {
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    backgroundColor: "rgb(127,	162,	244	)",
    shadowColor: "rgba(0, 0, 0,0.24)",
    shadowOpacity: 1,
    shadowRadius: 15,
    shadowOffset:{  width: 0,  height: 8,  },
  },

  functionContainer: {
    flex: 0.2,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop:30
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
  }
});

import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, AsyncStorage, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Input, Button } from 'react-native-elements';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootAction } from "../../../Modals";
import { RootState } from "../../../Store";
import { SignIn, reset } from "../../../Store/actions/auth.action";
import { IPostSignIn } from "../../../Modals/dataPost";
import { bindActionCreators } from "redux";
import { IResponeSignIn } from "../../../Modals/response";


type IPropsLoginScreen = {
  navigation: NavigationStackProp;
} & IAction & IState

interface IStateLoginScreen {
  email: string;
  password: string;
  loading: boolean
}

class Login extends React.Component<IPropsLoginScreen, IStateLoginScreen> {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return { headerTitle: "Đăng nhập" };
  };
  private onsubmit = async () => {
    let { password, email } = this.state
    const { SignIn } = this.props
    const modal = {
      email: email.toLowerCase().trim(),
      password: password.trim()
    }
    const data = {
      email,
      password
    }
    SignIn(data, (data: IResponeSignIn) => {
      if (data) {
        this.props.navigation.navigate("Main")
      }
    })

  }

  render() {
    const { loading } = this.state
    const { errorMessage, reset } = this.props
    return (<React.Fragment>
      {errorMessage && Alert.alert("Error", errorMessage, [
        { text: 'Cancel', style: 'cancel', onPress: () => reset() },
      ])}
      <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={{ width: 1000, height: 120 }}
              resizeMethod="resize"
              resizeMode="contain"
              source={require("../../../assets/images.png")}
            />
            <Text style={{ fontSize: 28, color: "#162B97" }}>HaraHotdeal</Text>
          </View>
          <View style={styles.body}>
            <Input
              onChange={value => this.setState({ email: value.nativeEvent.text })}
              placeholder="email"
              style={{ marginBottom: 50 }}
            />
            <Input
              onChange={value => this.setState({ password: value.nativeEvent.text })}
              textContentType="newPassword"
              placeholder="mật khẩu" />
            <TouchableOpacity
              style={styles.touchbtn}
              onPress={this.onsubmit}>
              <Text>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </React.Fragment>
    );
  }
}
interface IState {
  errorMessage: string,
}
interface IAction {
  SignIn: (data: IPostSignIn, callback: Function) => void,
  reset: VoidFunction,

}


const mapStateToProps = (state: RootState): IState => ({
  errorMessage: state.userinfo.errormessage
})


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootAction>): IAction => ({
  SignIn: bindActionCreators(SignIn, dispatch),
  reset: bindActionCreators(reset, dispatch)
})


export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login)



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

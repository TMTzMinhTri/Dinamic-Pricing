import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, SegmentedControlIOSComponent, AsyncStorage, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Input, Button } from 'react-native-elements';
import { connect } from "react-redux";
import { Register, reset, GetAccessToken, SignIn } from "../../../Store/actions/auth.action";
import { ThunkDispatch } from "redux-thunk";
import { RootAction } from "../../../Modals";
import { bindActionCreators } from "redux";
import { IPostRegister, IPostSignIn } from "../../../Modals/dataPost";
import { RootState } from "../../../Store";
import { AuthSession } from "expo";
import * as LocalAuthentication from 'expo-local-authentication'
import { IResponeSignIn } from "../../../Modals/response";


type IPropsRegisterScreen = {
  navigation: NavigationStackProp;
} & IAction & IState

interface IStateRegisterScreen {
  userid: string;
  password: string;
  confirmPassword: string;
  email: string;
  loading: boolean
}

export class RegisterComponent extends React.Component<IPropsRegisterScreen, IStateRegisterScreen> {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: "",
      confirmPassword: "",
      email: "",
      loading: false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Đăng ký"
    };
  };
  private onSubmit = async () => {
    const { email, password, userid } = this.state
    const { register, getAccessToken, navigation, SignIn } = this.props
    const modal: IPostRegister = {
      email: "tmtzminhtri53111@gmail.com",
      name: "Minh Tri",
      password: "0123123123",
      shopName: "harend"
    }
    register(modal, (value) => {
      if (value.status === true) {
        const dataSignin: IPostSignIn = {
          email: modal.email,
          password: modal.password
        }
        SignIn(dataSignin, async (data: IResponeSignIn) => {
          const redirectUrl = AuthSession.getRedirectUrl();
          const result = await AuthSession.startAsync({
            authUrl:
              `https://${data.shopName}.myharavan.com/admin/api/auth/?api_key=${data.apiKey}&redirect_uri=${encodeURIComponent(redirectUrl)}`,
          });
          if (result.type === "success") {
            getAccessToken(result.params.code, navigation.navigate)
          }
        })
      }
    })

  }
  render() {
    const { errorMessage, reset, } = this.props
    const { loading } = this.state
    return (
      < React.Fragment >
        {errorMessage && Alert.alert("Error", errorMessage, [
          { text: 'Cancel', style: 'cancel', onPress: () => reset() },
        ])}
        <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
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
      </React.Fragment >

    );
  }
}

interface IState {
  errorMessage: string,
  shopName: string,
  apiKey: string
}
interface IAction {
  register: (data: IPostRegister, callback: Function) => void,
  reset: VoidFunction,
  getAccessToken: (code: string, navigate: Function) => void,
  SignIn: (data: IPostSignIn, callback: Function) => void
}


const mapStateToProps = (state: RootState): IState => ({
  errorMessage: state.userinfo.errormessage,
  shopName: state.userinfo.shopName,
  apiKey: state.userinfo.apiKey
})


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootAction>): IAction => ({
  register: bindActionCreators(Register, dispatch),
  reset: bindActionCreators(reset, dispatch),
  getAccessToken: bindActionCreators(GetAccessToken, dispatch),
  SignIn: bindActionCreators(SignIn, dispatch)
})

export const RegisterScreen = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)

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
    marginTop: 30,
    backgroundColor: "rgb(127,	162,	244	)",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "100%"
  }
});

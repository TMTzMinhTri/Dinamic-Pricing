import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, SegmentedControlIOSComponent, AsyncStorage, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Input, Button } from 'react-native-elements';
import { connect } from "react-redux";
import { Register, reset, GetAccessToken, SignIn, SendEmail, VerifyEmail } from "../../../Store/actions/auth.action";
import { ThunkDispatch } from "redux-thunk";
import { RootAction } from "../../../Modals";
import { bindActionCreators } from "redux";
import { IPostRegister, IPostSignIn } from "../../../Modals/dataPost";
import { RootState } from "../../../Store";
import { AuthSession } from "expo";
import * as Components from "../../../components";
import { IResponeSignIn } from "../../../Modals/response";
import { getAccessToken } from "../../../Api/Repository";


type IPropsRegisterScreen = {
  navigation: NavigationStackProp;
} & IAction & IState

interface IStateRegisterScreen {
  shopName: string;
  password: string;
  confirmPassword: string;
  email: string;
  name: string,
  popupComfirm: boolean,
  verifyCode: string,
  session_id: string
}

export class RegisterComponent extends React.Component<IPropsRegisterScreen, IStateRegisterScreen> {
  constructor(props) {
    super(props);
    this.state = {
      shopName: "",
      password: "",
      confirmPassword: "",
      email: "",
      name: "",
      popupComfirm: false,
      verifyCode: "",
      session_id: ""
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Đăng ký"
    };
  };
  private onSubmit = async () => {
    const { email, password, shopName, name } = this.state
    const { register } = this.props
    const modal: IPostRegister = {
      email: email.trim().toLowerCase(),
      name: name.trim().toLowerCase(),
      password: password.trim(),
    }
    const data = {
      name: 'asdasd',
      password: "123123",
      email: "minhtri11@gmail.com",
      shopName: 'harend'
    }
    register(data, async (value) => {
      console.log(value)
      if (value.status === true) {
        await AsyncStorage.setItem('email', data.email)
        this.setState({ popupComfirm: true })
      }
    })

  }
  private confirmemail = async () => {
    const { verifyCode, session_id, name, password, email } = this.state
    const { navigation, VerifyEmail, register } = this.props

    let redirectUrl = AuthSession.getRedirectUrl();
    let shopName = "harend"
    const apikey = "bd7b21fa44f96ed035b3ce15fa225721"
    this.setState({ popupComfirm: false }, async () => {
      let result: any = await AuthSession.startAsync({
        authUrl:
          `https://${shopName}.myharavan.com/admin/api/auth/?api_key=${apikey}&redirect_uri=${encodeURIComponent(redirectUrl)}`,
      });
      const { type } = result;

      if (type === 'success') {
        console.log('aaa')
        getAccessToken(result.params.code).then((res: any) => {
          if (res.success == true)
            navigation.navigate("Main")
        })
      }

    })
  }

  private RenderPopupComfirm = () => {
    const { popupComfirm, verifyCode } = this.state
    return <Components.Modals modalVisible={popupComfirm}>
      <View style={{ padding: 30 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 25, textTransform: "uppercase", fontWeight: "bold" }}>Kết nối</Text>
        </View>
        <Button
          title="Kết nối"
          onPress={this.confirmemail} />
      </View>
    </Components.Modals>
  }

  render() {
    const { errorMessage, reset, navigation } = this.props
    const { popupComfirm } = this.state
    return (
      < React.Fragment >
        {popupComfirm && this.RenderPopupComfirm()}
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
                label="Email"
                containerStyle={{ marginBottom: 20 }}

                onChange={value =>
                  this.setState({ email: value.nativeEvent.text })
                }
                placeholder="Email"
              />
              <Input
                label="Mật khẩu"
                containerStyle={{ marginBottom: 20 }}

                onChange={value =>
                  this.setState({ password: value.nativeEvent.text })
                }
                placeholder="Mật khẩu"
              />
              <Input
                containerStyle={{ marginBottom: 20 }}
                label="Xác nhận mật khẩu"
                onChange={value =>
                  this.setState({ confirmPassword: value.nativeEvent.text })
                }
                placeholder="Xác nhận mật khẩu"
              />
              <Input
                label="Họ và tên"
                onChange={value =>
                  this.setState({ name: value.nativeEvent.text })
                }
                placeholder="Tên của bạn là ?"
              />
              <Input
                label=""
                onChange={value =>
                  this.setState({ name: value.nativeEvent.text })
                }
                placeholder="Tên của bạn là ?"
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
//#region 
interface IAction {
  register: (data: IPostRegister, callback: Function) => void,
  reset: VoidFunction,
  getAccessToken: (code: string, navigate: Function) => void,
  SignIn: (data: IPostSignIn, callback: Function) => void,
  SendEmail: (email: string, callback: Function) => void,
  VerifyEmail: (code: string, session_id: string, callback: Function) => void
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
  SignIn: bindActionCreators(SignIn, dispatch),
  SendEmail: bindActionCreators(SendEmail, dispatch),
  VerifyEmail: bindActionCreators(VerifyEmail, dispatch)
})
//#endregion
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

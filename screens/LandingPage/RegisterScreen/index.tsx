import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, SegmentedControlIOSComponent, AsyncStorage, TouchableOpacity, Alert } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Input, Button } from 'react-native-elements';
import { connect } from "react-redux";
import { Register, reset } from "../../../Store/actions/auth.action";
import { ThunkDispatch } from "redux-thunk";
import { RootAction } from "../../../Modals";
import { bindActionCreators } from "redux";
import { IPostRegister } from "../../../Modals/dataPost";
import { RootState } from "../../../Store";



type IPropsRegisterScreen = {
  navigation: NavigationStackProp;
} & IAction & IState

interface IStateRegisterScreen {
  userid: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export class RegisterComponent extends React.Component<IPropsRegisterScreen, IStateRegisterScreen> {
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
    const { register, errorMessage } = this.props
    console.log(errorMessage)
    const modal: IPostRegister = {
      email: "tmtzminhtri1@gmail.com",
      name: "Minh Tri",
      password: "0123123123",
      shopName: "harend"
    }
    //#region 
    // const email = "12312111", password = "1234", userid = "123123111"
    // const datapost = { email, userid, password }
    // try {
    //   let rsp = await axios.post('http://163.47.9.196:8000/api/register', datapost), { data } = rsp
    //   console.log(rsp.status)
    //   if (data.status === "Success") {
    //     try {
    //       const logindata = { userid, password }
    //       let rsp = await axios.post('http://163.47.9.196:8000/api/login', logindata), { data } = rsp
    //       console.log(rsp.data)
    //       if (data && data.token) {
    //         await AsyncStorage.setItem('login_token', data.token)
    //         this.props.navigation.navigate("Connect")
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // } catch (error) {
    //   console.error(error)
    // }
    //#endregion
    register(modal, () => {

    })

  }
  render() {
    const { errorMessage, reset } = this.props
    return (<React.Fragment>
      {errorMessage && Alert.alert("Error", errorMessage, [
        { text: 'Cancel', style: 'cancel', onPress: () => reset()},
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
    </React.Fragment>
    );
  }
}

interface IState {
  errorMessage: string
}


interface IAction {
  register: (data: IPostRegister, callback: Function) => void,
  reset: VoidFunction
}


const mapStateToProps = (state: RootState): IState => ({
  errorMessage: state.userinfo.errormessage
})


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootAction>): IAction => ({
  register: bindActionCreators(Register, dispatch),
  reset: bindActionCreators(reset, dispatch)
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

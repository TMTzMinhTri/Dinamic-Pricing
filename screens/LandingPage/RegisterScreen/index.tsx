import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Input, Button } from 'react-native-elements';


type IPropsRegisterScreen = {
    navigation: NavigationStackProp;
};

interface Registerdata {
    userid: string,
    password: string,
    email: string
}
interface Logindata {
    userid: string,
    password: string
}
const urlRegister = "/api/register"
const login = "/api/login"

interface IStateRegisterScreen {
    userid: string,
    password: string
    confirmPassword: string,
    email: string
}

export class RegisterScreen extends React.Component<IPropsRegisterScreen, IStateRegisterScreen> {
    constructor(props) {
        super(props)
        this.state = {
            userid: "",
            password: "",
            confirmPassword: "",
            email: ""
        }
    }
    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: "Đăng ký"
        };
    }
    render() {
        return <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    resizeMethod='resize'
                    resizeMode='contain'
                    source={require('../../../assets/images.png')}
                />
                <Text >HaraHotdeal</Text>
            </View>
            <View>
                <KeyboardAvoidingView
                    enabled
                    behavior="padding"
                >
                    <Input
                        onChange={(value) => this.setState({ userid: value.nativeEvent.text })}
                        placeholder='Tên đăng nhập'
                    />
                    <Input
                        onChange={(value) => this.setState({ password: value.nativeEvent.text })}
                        placeholder='mật khẩu'
                    />
                    <Input
                        onChange={(value) => this.setState({ confirmPassword: value.nativeEvent.text })}
                        placeholder='xác nhận mật khẩu'
                    />
                    <Input
                        onChange={(value) => this.setState({ email: value.nativeEvent.text })}
                        placeholder='email'
                    />
                </KeyboardAvoidingView>
            </View>
            <View>
                <Button title="Đăng ký" onPress={() => this.props.navigation.navigate("Connect")} />
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    header: {

    }
});
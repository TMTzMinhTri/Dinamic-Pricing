import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Input, Button } from 'react-native-elements';


type IPropsLoginScreen = {
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

interface IStateLoginScreen {
    userid: string,
    password: string
}


export class LoginScreen extends React.Component<IPropsLoginScreen, IStateLoginScreen> {
    constructor(props) {
        super(props)
        this.state = {
            userid: "",
            password: ""
        }
    }
    static navigationOptions = ({ navigation, }) => {
        return { headerTitle: "Đăng nhập" };
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
                </KeyboardAvoidingView>
            </View>
            <View>
                <Button title="Đăng nhập" onPress={() => this.props.navigation.navigate("Connect")} />
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
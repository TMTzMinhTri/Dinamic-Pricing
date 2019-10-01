import React from "react";
import { View, Text, Image, StyleSheet, AsyncStorage, } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { Button } from 'react-native-elements';

type IPropsLandingScreen = {
    navigation: NavigationStackProp;
};
export class LandingScreen extends React.Component<IPropsLandingScreen, {}> {

    componentDidMount() {
        const { navigation } = this.props;
        AsyncStorage.getItem("code").then(res => {
            if (res) {
                navigation.navigate("Main");
            }
        })
    }

    private _login = () => { this.props.navigation.navigate('Login') }

    private _register = () => { this.props.navigation.navigate('Register') };

    public render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.appTitle}>Hara</Text>
                    <Text style={[styles.appTitle, styles.noPadding]}>Hotdeal</Text>
                    <Text style={styles.description}>Tối đa hóa lợi nhuận cho hàng tồn kho chỉ bằng một cú chạm</Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        style={{ flex: 1, height: undefined, width: undefined }}
                        resizeMethod='resize'
                        resizeMode='contain'
                        source={require('../../assets/2456069.png')}
                    />
                </View>
                <View style={styles.functionContainer}>
                    <View style={{ width: '35%', marginRight: 20 }}>
                        <Button
                            title="Đăng ký"
                            onPress={this._register} />
                    </View>
                    <View style={{ width: '35%', marginLeft: 20 }}>
                        <Button
                            title="Đăng nhập"
                            onPress={this._login} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

        paddingHorizontal: 10,
    },
    titleContainer: {
        flex: 0.35,
        flexDirection: 'column',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: -20,
        paddingBottom: 0,
    },
    imageContainer: {
        flex: 0.5,
    },

    functionContainer: {
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appTitle: {
        fontSize: 36,
        fontWeight: '500',
        color: '#162B97',
    },
    noPadding: {
        marginTop: -10,
    },

    description: {
        color: '#686C80',
        marginTop: 12,
    },

    loginButton: {
        flex: 1,
        color: '#000',
    },

    demoButton: {
        flex: 1,
        color: '#000',
    },
});
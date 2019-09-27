import React from "react";
import { View, Text, Button, AsyncStorage, Image, StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";

interface IHomeScreenProps extends NavigationScreenProps {

}

export class SignInScreen extends React.Component<IHomeScreenProps, {}> {
    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
    };
    render() {
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
                    ></Image>
                </View>
                <View style={styles.functionContainer}>
                    <View style={{ width: '35%', marginRight: 20 }}>
                        <Button title='Dang nhap' color='#FFEF00' onPress={() => this._signInAsync()} />
                    </View>
                    <View style={{ width: '35%', marginLeft: 20 }}>
                        <Button title='Demo' color='#ffff' onPress={() => this._signInAsync()} />
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
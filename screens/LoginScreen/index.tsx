import React from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Input, Button } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';

interface ILoginScreenProps extends NavigationScreenProps {

}
interface ILoginScreenState {
    shopName: string
}

export class LoginScreen extends React.Component<ILoginScreenProps, ILoginScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            shopName: ""
        }
    }
    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: "Kết nối"
        };
    }

    onSubmit = async () => {
        const { shopName } = this.state
        const apikey = "3fc24cce86994cac510e117c927bbda4"
        const url = `https://${shopName}.myharavan.com/admin/api/auth/?api_key=${apikey}`
        // Linking.canOpenURL(url).then((supported) => {
        //     if (!supported) {
        //         console.log("Can't handle url: " + url);
        //     } else {
        //         return Linking.openURL(url)
        //     }
        // })
        //     .catch((err) => console.error('An error occurred', err));
        // WebBrowser.openBrowserAsync('url')

        let result = await WebBrowser.openBrowserAsync(url);
        console.log(result)
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    enabled
                    behavior="padding"
                >
                    <Input
                        onChange={(value) => this.setState({ shopName: value.nativeEvent.text })}
                        placeholder='Shop name'
                    />
                </KeyboardAvoidingView>
                <Button
                    title="Xác nhận"
                    onPress={this.onSubmit}
                />
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
});
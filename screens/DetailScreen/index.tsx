import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationScreenProps } from "react-navigation";

interface IDetailsScreenProps extends NavigationScreenProps {

}
export class DetailsScreen extends React.Component<IDetailsScreenProps, {}> {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}
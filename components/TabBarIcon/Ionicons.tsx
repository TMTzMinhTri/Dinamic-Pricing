import React from 'react';
import { Ionicons } from '@expo/vector-icons';


interface IIconIoniconsProps {
    focused: boolean,
    name: string
}
export const IconIonicons: React.SFC<IIconIoniconsProps> = props => {
    return (
        <Ionicons
            name={props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
    );
}

const Colors = {
    tabIconSelected: '#2f95dc',
    tabIconDefault: "#ccc"
}
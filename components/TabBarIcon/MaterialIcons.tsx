import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';


interface IIconMaterialIconsProps {
    focused: boolean,
    name: string
}
export const IconMaterialIcons: React.SFC<IIconMaterialIconsProps> = props => {
    return (
        <MaterialIcons
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
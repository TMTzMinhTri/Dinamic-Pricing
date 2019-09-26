import React from 'react';
import { AntDesign } from '@expo/vector-icons';


interface IIconAntDesignProps {
    focused: boolean,
    name: string
}
export const IconAntDesign: React.SFC<IIconAntDesignProps> = props => {
    return (
        <AntDesign
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
import { Text, TextProps, View } from "react-native";
import React from "react";

interface StyledTextProps extends TextProps {}

const StyledText = (props: StyledTextProps) => {
    return (
        <Text
            {...props}
            style={[
                { fontFamily: "Montserrat" },
                props.style,
                { textAlign: "center", fontSize: 16, fontWeight: "bold" } 
            ]}
        >
            {props.children}
        </Text>
    );
};

export default StyledText;

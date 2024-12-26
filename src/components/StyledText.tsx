import { Text, TextProps, View } from "react-native";
import React from "react";

interface StyledTextProps extends TextProps {}

const StyledText = (props: StyledTextProps) => {
    return (
        <Text
            {...props}
            style={[
                { fontFamily: "Montserrat" },
                props.style, // Allow parent to override style if needed
                { textAlign: "center", fontSize: 16, fontWeight: "bold" } // Default button text style
            ]}
        >
            {props.children}
        </Text>
    );
};

export default StyledText;

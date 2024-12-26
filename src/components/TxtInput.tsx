import React, { forwardRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import StyledText from "./StyledText";

interface TxtInputProps extends TextInputProps {
    error?: boolean;
    errorLabel?: string;
}

const TxtInput = forwardRef<TextInput, TxtInputProps>((props, ref) => {
    return (
        <View className="w-full">
            <TextInput
                {...props}
                ref={ref}
                className={`border px-4 py-4 rounded-md text-lg ${props.error ? "border-red-600" : "border-gray-400"} ${props.className}`}
            />
            {props.error && props.errorLabel && (
                <StyledText className="text-red-600 text-sm mt-2">
                    {props.errorLabel}
                </StyledText>
            )}
        </View>
    );
});

export default TxtInput;

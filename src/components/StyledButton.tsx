import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";

interface StyledButtonProps extends TouchableOpacityProps {}

const StyledButton = (props: StyledButtonProps) => {
  return (
    <TouchableOpacity {...props} className=" bg-black rounded-lg p-4">
      {props.children}
    </TouchableOpacity>
  );
};

export default StyledButton;
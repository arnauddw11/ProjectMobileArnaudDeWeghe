import React, { useState, useRef } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
} from "react-native";
import { TextInput } from "react-native";
import StyledButton from "../components/StyledButton";
import StyledText from "../components/StyledText";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Geen geldig emailadres.")
        .required("Email is verplicht!"),
    password: Yup.string()
        .required("Wachtwoord is verplicht!")
        .min(8, "Wachtwoord moet minstens uit 8 tekens bestaan."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Wachtwoorden komen niet overeen.")
        .required("Bevestig je wachtwoord!"),
});

const Register = () => {
    const navigation = useNavigation();
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async ({ email, password }) => {
            setLoading(true);
            setErrorMessage("");
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                setLoading(false);
                Alert.alert("Succes", "Je account is aangemaakt!");
                navigation.navigate("login");
            } catch (error: any) {
                setLoading(false);
                setErrorMessage(
                    error.message || "Er is iets fout gegaan tijdens het registreren."
                );
            }
        },
    });

    return (
        <View className="flex-1 bg-gray-100 justify-center items-center p-4">
            <View className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <StyledText className="text-3xl font-extrabold text-center text-gray-900 mb-6">
                    Registreren
                </StyledText>
                <KeyboardAvoidingView
                    className="space-y-6"
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <TextInput
                        placeholder="Emailadres"
                        className="w-full h-12 border border-gray-300 rounded-md px-3 mb-2"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        style={{
                            fontSize: 16,
                        }}
                    />
                    {touched.email && errors.email && (
                        <StyledText className="text-red-600">{errors.email}</StyledText>
                    )}

                    <View className="relative">
                        <TextInput
                            placeholder="Wachtwoord"
                            secureTextEntry={!passwordVisible}
                            className="w-full h-12 border border-gray-300 rounded-md px-3"
                            autoCapitalize="none"
                            autoComplete="password"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            style={{
                                fontSize: 16,
                            }}
                            ref={passwordRef}
                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordVisible(!passwordVisible)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <MaterialIcons
                                name={passwordVisible ? "visibility-off" : "visibility"}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                        <StyledText className="text-red-600">{errors.password}</StyledText>
                    )}

                    <TextInput
                        placeholder="Bevestig Wachtwoord"
                        secureTextEntry
                        className="w-full h-12 border border-gray-300 rounded-md px-3"
                        autoCapitalize="none"
                        autoComplete="password"
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        style={{
                            fontSize: 16,
                        }}
                        ref={confirmPasswordRef}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <StyledText className="text-red-600">
                            {errors.confirmPassword}
                        </StyledText>
                    )}
                </KeyboardAvoidingView>

                {errorMessage ? (
                    <StyledText className="text-red-600 text-center mt-4">
                        {errorMessage}
                    </StyledText>
                ) : null}

                <TouchableOpacity
                    onPress={() => navigation.navigate("login")} 
                    className="mt-4"
                >
                    <StyledText className="text-sm text-right text-blue-600 underline">
                        Heb je al een account?
                    </StyledText>
                </TouchableOpacity>

                <StyledButton
                    onPress={handleSubmit}
                    className="bg-blue-600 mt-6 py-3 rounded-lg"
                >
                    <StyledText className="text-white text-lg font-bold text-center">
                        {loading ? "Bezig met registreren..." : "Registreren"}
                    </StyledText>
                </StyledButton>
            </View>
        </View>
    );
};

export default Register;

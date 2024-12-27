import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useRef, useState } from "react";
import TxtInput from "../components/TxtInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import StyledButton from "../components/StyledButton";
import StyledText from "../components/StyledText";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { FirebaseError } from "firebase/app";
import { MaterialIcons } from "@expo/vector-icons"; // Import for the eye icon
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const firebaseErrors = {
    "auth/invalid-credential": "Email of wachtwoord is fout!",
    "auth/missing-password": "Wachtwoord is verplicht!",
};

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Geen geldig emailadres.")
        .required("Email is verplicht!"),
    password: Yup.string()
        .required("Wachtwoord is verplicht!")
        .min(8, "Wachtwoord moet minstens uit 8 tekens bestaan."),
});

const Login = () => {
    const passwordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

    // Get the navigation instance
    const navigation = useNavigation();

    const { handleChange, handleBlur, handleSubmit, errors, touched } = useFormik(
        {
            initialValues: {
                email: "",
                password: "",
            },
            onSubmit: async ({ email, password }) => {
                setLoading(true);
                setErrorMessage("");
                try {
                    await signInWithEmailAndPassword(auth, email, password);
                    setLoading(false);
                } catch (error) {
                    setLoading(false); // Reset loading state
                    const firebaseError = error as FirebaseError;
                    const errorMessage =
                        firebaseErrors[firebaseError.code as keyof typeof firebaseErrors] ||
                        "Er is iets fout gegaan!";
                    setErrorMessage(errorMessage); // Show error message if login fails
                }
            },
            validationSchema: validationSchema,
        }
    );

    return (
        <View className="flex-1 bg-gray-100 justify-center items-center p-4">
            <View className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
                <StyledText className="text-3xl font-extrabold text-center text-gray-900 mb-6">
                    Inloggen
                </StyledText>
                <KeyboardAvoidingView
                    className="space-y-6"
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <TxtInput
                        error={touched.email && !!errors.email}
                        errorLabel={errors.email}
                        placeholder="Email"
                        onSubmitEditing={() => {
                            passwordRef.current?.focus();
                        }}
                        returnKeyType="next"
                        autoCapitalize="none"
                        autoComplete="email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        style={{
                            height: 50,
                            fontSize: 18,
                            paddingHorizontal: 15,
                        }}
                    />
                    <View className="relative">
                        <TxtInput
                            error={touched.password && !!errors.password}
                            errorLabel={errors.password}
                            ref={passwordRef}
                            placeholder="Wachtwoord"
                            secureTextEntry={!passwordVisible} // Conditionally hide/show password
                            autoCapitalize="none"
                            autoComplete="current-password"
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            style={{
                                height: 50,
                                fontSize: 18,
                                paddingHorizontal: 15,
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <MaterialIcons
                                name={passwordVisible ? "visibility-off" : "visibility"}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                {errorMessage ? (
                    <StyledText className="text-red-600 text-center mt-4">
                        {errorMessage}
                    </StyledText>
                ) : null}

                <TouchableOpacity
                    onPress={() => navigation.navigate('register')} // Navigate to the register screen
                    className="mt-4"
                >
                    <StyledText className="text-sm text-right text-blue-600 underline">
                        Nog geen account?
                    </StyledText>
                </TouchableOpacity>



                <StyledButton
                    onPress={() => handleSubmit()}
                    className="bg-blue-600 mt-6 py-3 rounded-lg"
                >
                    <StyledText className="text-white text-lg font-bold text-center">
                        {loading ? "Bezig met inloggen..." : "Inloggen"}
                    </StyledText>
                </StyledButton>
            </View>
        </View>
    );
};

export default Login;

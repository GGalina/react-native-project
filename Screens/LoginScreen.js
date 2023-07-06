import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";

export const LoginScreen = () => {
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isKeyboardShown, setIsKeyboardShown] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isInputFilled, setIsInputFilled] = useState({
        email: false,
        password: false,
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFocus = (value) => {
        switch (value) {
            case "email":
                setIsFocusedEmail(true);
                break;
            case "password":
                setIsFocusedPassword(true);
                break;
            default:
                return;
        }
    };

    const handleBlur = (value) => {
        switch (value) {
            case "email":
                setIsFocusedEmail(false);
                setIsInputFilled((prevState) => ({
                    ...prevState,
                    email: !!email,
                }));
                break;
            case "password":
                setIsFocusedPassword(false);
                setIsInputFilled((prevState) => ({
                    ...prevState,
                    password: !!password,
                }));
                break;
            default:
                return;
        }
    };

    const handleSubmit = () => {
        const formData = { email, password };

        console.log(formData);

        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        const keyboardShownListener = Keyboard.addListener("keyboardDidShow",
            () => {
                setIsKeyboardShown(true);
            }
        );
        const keyboardHideListener = Keyboard.addListener("keyboardDidHide",
            () => {
                setIsKeyboardShown(false);
            }
        );
        return () => {
            keyboardShownListener.remove();
            keyboardHideListener.remove();
        };
    }, []);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={[styles.container, isKeyboardShown && styles.containerKeyboard]}>
                <Text style={styles.header}>Увійти</Text>
                <View style={styles.formInput}>
                    <TextInput
                        name="email"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={() => handleFocus("email")}
                        onBlur={() => handleBlur("email")}
                        style={[
                            styles.input,
                            isFocusedEmail && styles.inputFocused,
                            isInputFilled.email && styles.inputFilled,
                        ]}
                        placeholder="Адреса електронної пошти"
                    />
                    <View style={styles.passwordWrapper}>
                        <TextInput
                            name="password"
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => handleFocus("password")}
                            onBlur={() => handleBlur("password")}
                            style={[
                                styles.input,
                                isFocusedPassword && styles.inputFocused,
                                isInputFilled.password && styles.inputFilled,
                            ]}
                            secureTextEntry={!isPasswordVisible}
                            placeholder="Пароль"
                        />
                        <TouchableOpacity
                            style={styles.paswordShownButton}
                            onPress={togglePasswordVisibility}
                        >
                            <Text style={styles.passwordShownText}>
                                {isPasswordVisible ? "Приховати" : "Показати"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
                        <Text style={styles.loginText}>Увійти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.notRegisteredLink}>
                        <Text style={styles.notRegisteredText}>Немає акаунту? Зареєструватися</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%",
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        border: "1px solid #FFFFFF",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    containerKeyboard: {
        marginTop: Platform.OS === "ios" ? 125 : 250,
        paddingTop: Platform.OS === "ios" ? 0 : 75,
    },
    header: {
        fontFamily: "Roboto-Medium",
        fontSize: 30,
        textAlign: "center",
        fontWeight: 500,
        letterSpacing: 0.3,
        color: "#212121",
        marginTop: 32,
        marginBottom: 33,
    },
    formInput: {
        width: "100%",
        gap: 16,
    },
    input: {
        position: "relative",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        backgroundColor: "#F6F6F6",
        color: "#BDBDBD",
        width: "100%",
        height: 50,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderStyle: "solid",
        borderRadius: 5,
    },
    inputFocused: {
        color: "#212121",
        borderColor: "#FF6C00",
        backgroundColor: "#FFFFFF",
    },
    passwordWrapper: {
        position: "relative",
    },
    paswordShownButton: {
        position: "absolute",
        right: 16,
        top: 16,
    },
    passwordShownText: {
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        color: "#1B4371",
    },
    inputFilled: {
        color: "#212121",
    },
    loginButton: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        marginTop: 43,
        marginBottom: 16,
    },
    loginText: {
        color: "#FFFFFF",
        fontFamily: "Roboto-Regular",
        textAlign: "center",
        fontSize: 16,
    },
    notRegisteredText: {
        color: "#1B4371",
        textAlign: "center",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        marginBottom: 111,
    }
});
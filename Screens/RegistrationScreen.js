import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";

export const RegistrationScreen = () => {
    const [isSelectedImage, setSelectedImage] = useState(null);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isKeyboardShown, setIsKeyboardShown] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isInputFilled, setIsInputFilled] = useState({
        name: false,
        email: false,
        password: false,
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleImageUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access the camera roll is required!');
            return;
        }

        const imageResult = await ImagePicker.launchImageLibraryAsync();

        if (!imageResult.canceled) {
            const selectedAsset = imageResult.assets[0];
            setSelectedImage(selectedAsset.uri || selectedAsset.uri !== null ? selectedAsset.uri : null);
        }
    };

    const handleImageDelete = () => {
        setSelectedImage(null);
    };

    const handleFocus = (value) => {
        switch (value) {
            case "name":
                setIsFocusedName(true);
                break;
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
            case "name":
                setIsFocusedName(false);
                setIsInputFilled((prevState) => ({
                    ...prevState,
                    name: !!name,
                }));
                break;
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
        const formData = { name, email, password };

        console.log(formData);

        setName('');
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
                <View style={styles.imageContainer}>
                    {!isSelectedImage &&
                        <View>
                            <View style={styles.image} />
                            <TouchableOpacity onPress={handleImageUpload} style={styles.buttonPhoto}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {isSelectedImage &&
                        <View>
                            <Image source={{ uri: isSelectedImage }} style={styles.image} />
                            <TouchableOpacity onPress={handleImageDelete} style={styles.buttonPhotoSelected}>
                                <Text style={styles.buttonTextSelected}>x</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <Text style={styles.header}>Реєстрація</Text>
                <View style={styles.formInput}>
                    <TextInput
                        name="name"
                        value={name}
                        onChangeText={setName}
                        onFocus={() => handleFocus("name")}
                        onBlur={() => handleBlur("name")}
                        style={[
                            styles.input,
                            isFocusedName && styles.inputFocused,
                            isInputFilled.name && styles.inputFilled,
                        ]}
                        placeholder="Логін"
                    />
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
                    <TouchableOpacity onPress={handleSubmit} style={styles.registerButton}>
                        <Text style={styles.registerText}>Зареєструватися</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.alreadyRegisteredLink}>
                        <Text style={styles.alreadyRegisteredText}>Вже є акаунт? Увійти</Text>
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
        marginTop: Platform.OS === "ios" ? 125 : 150,
        paddingTop: Platform.OS === "ios" ? 0 : 50,
    },
    imageContainer: {
        borderRadius: 16,
        width: 120,
        height: 120,
        border: "1px solid #F6F6F6",
        backgroundColor: "#F6F6F6",
        position: "absolute",
        top: -60,
    },
    buttonPhoto: {
        position: "absolute",
        bottom: 10,
        right: -15,
        width: 30,
        height: 30,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#FF6C00",
        borderStyle: "solid",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonPhotoSelected: {
        position: "absolute",
        bottom: 10,
        right: -15,
        width: 30,
        height: 30,
        backgroundColor: "#FFFFFF",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#BDBDBD",
        borderStyle: "solid",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#FF6C00",
        fontFamily: "Roboto-Light",
        fontSize: 26,
        textAlign: "center",
        lineHeight: 29,
    },
    buttonTextSelected: {
        color: "#BDBDBD",
        fontFamily: "Roboto-Light",
        fontSize: 26,
        textAlign: "center",
        lineHeight: 26,
    },
    image: {
        borderRadius: 16,
        width: 120,
        height: 120,
        border: "1px solid #F6F6F6",
    },
    header: {
        fontFamily: "Roboto-Medium",
        fontSize: 30,
        textAlign: "center",
        fontWeight: 500,
        letterSpacing: 0.3,
        color: "#212121",
        marginTop: 92,
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
    registerButton: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        marginTop: 43,
        marginBottom: 16,
    },
    registerText: {
        color: "#FFFFFF",
        fontFamily: "Roboto-Regular",
        textAlign: "center",
        fontSize: 16,
    },
    alreadyRegisteredText: {
        color: "#1B4371",
        textAlign: "center",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        marginBottom: 45,
    }
});
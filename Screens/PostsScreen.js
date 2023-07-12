import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, Image } from "react-native";

export const PostsScreen = () => {
    const { params: { login, email, avatar }} = useRoute();

    return (
        <View style={styles.container}>
            <View style={styles.containerUser}>
                <View>
                    {avatar && (<Image source={{ uri: avatar }} style={styles.image} />)}
                    {!avatar && (
                        <View style={styles.imageContainer}>
                            <AntDesign name="user" size={25} color="#212121" />
                        </View>
                    )}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.login}>{login}</Text>
                    <Text style={styles.email}>{email}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        paddingTop: 32,
        paddingLeft: 16,
    },
    containerUser: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 8,
        alignItems: "center",
    },
    imageContainer: {
        borderRadius: 16,
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#F6F6F6",
        borderStyle: "solid",
        backgroundColor: "#F6F6F6",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        borderRadius: 16,
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#F6F6F6",
    },
    login: {
        fontFamily: "Roboto-Regular",
        fontSize: 13,
        fontWeight: 700,
    },
    email: {
        fontFamily: "Roboto-Regular",
        fontSize: 11,
        fontWeight: 400,
        color: "rgba(33, 33, 33, 0.80)",
    }
});
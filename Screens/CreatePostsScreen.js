import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'; 
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";

export const CreatePostsScreen = () => {
    const [isSelectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Потрібен доступ до фотографій у галереї!');
            return;
        }

        const imageResult = await ImagePicker.launchImageLibraryAsync();

        if (!imageResult.canceled) {
            const selectedAsset = imageResult.assets[0];
            setSelectedImage(selectedAsset.uri || selectedAsset.uri !== null ? selectedAsset.uri : null);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.postImageContainer}>
                {!isSelectedImage && (
                    <View>
                        <View style={styles.image}>
                            <TouchableOpacity onPress={handleImageUpload} style={styles.buttonPhoto}>
                                <MaterialIcons name="photo-camera" size={24} color="rgba(189, 189, 189, 1)" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.photoDesc}>Завантажте фото</Text>
                    </View>
                )}
                {isSelectedImage && (
                    <View>
                        <View style={styles.imgWrapper}>
                            <Image source={{ uri: isSelectedImage }} style={styles.image}/>
                            <TouchableOpacity onPress={handleImageUpload} style={styles.buttonPhotoUpload}>
                                <MaterialIcons name="photo-camera" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.photoDesc}>Редагувати фото</Text>
                    </View>
                )}
            </View>
            <View>
                <View style={styles.inputWrapper}>
                    <TextInput
                    name="name"
                    placeholder="Назва..."
                    style={styles.input}
                    placeholderTextColor="#BDBDBD"
                    />
                </View>
            </View>
            <View>
                <View style={styles.inputWrapperWithIcon}>
                    <SimpleLineIcons name="location-pin" size={24} color="rgba(189, 189, 189, 1)" />
                    <TextInput
                        name="location"
                        placeholder="Місцевість..."
                        style={styles.input}
                        placeholderTextColor="#BDBDBD"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.postButton}>
                <Text style={styles.postText}>Опубліковати</Text>
            </TouchableOpacity>
            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom:8,
    },
    postImageContainer: {
        width: "100%",
        height: 240,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        borderStyle: "solid",
        marginBottom: 32,
    },
    imgWrapper: {
        position: "relative",     
    },
    buttonPhoto: {
        width: 60,
        height: 60,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonPhotoUpload: {
        width: 60,
        height: 60,
        backgroundColor: "rgba(255, 255, 255, 0.30)",
        borderRadius: 30,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
    image: {
        width: "100%",
        height: 238,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    photoDesc: {
        color: "#BDBDBD",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        fontWeight: 400,
    },
     inputWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        borderStyle: "solid",
    },
    inputWrapperWithIcon: {
        borderBottomWidth: 1,
        borderBottomColor: "#E8E8E8",
        borderStyle: "solid",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 16,
    },
    input: {
        color: "#212121",
        width: "100%",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        height: 50,
    },

    postInactiveButton: {

    },
    postButton: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: "#F6F6F6",
        borderRadius: 100,
        marginTop: 43,
        marginBottom: 16,
        width: "100%",
    },
    postText: {
        color: "#BDBDBD",
        fontFamily: "Roboto-Regular",
        textAlign: "center",
        fontSize: 16,
    },
});
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import { AntDesign, MaterialIcons, Ionicons, Feather  } from "@expo/vector-icons";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { useNavigation, useRoute } from '@react-navigation/native';

const Tabs = createBottomTabNavigator();

export const HomeScreen = () => {
    const navigation = useNavigation();
    const { params: { login, email, avatar }} = useRoute();

    const handleGetBack = () => {
        navigation.navigate('Home', {
            screen: 'PostsScreen',
            params: {login, email, avatar},
        });
    };

    const handleLogout = () => {  
        navigation.navigate('Login');
    };

    return (
        <Tabs.Navigator
        initialRouteName="PostsScreen"
        screenOptions={{
            tabBarStyle: styles.tabContainer,
        }}
        >
            <Tabs.Screen name="PostsScreen" component={PostsScreen}
                options={{
                    title: "Публікації",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: "#212121",
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 17,
                        lineHeight: 22,
                        letterSpacing: -0.408,
                        paddingTop: 11,
                        paddingBottom: 11,
                    },
                    headerRight: () => (
                        <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
                            <MaterialIcons name="logout" size={24} style={styles.logoutIcon}/>
                        </TouchableOpacity>
                    ),
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused, color, size }) => {
                        const navigation = useNavigation();
                        const routeName = navigation.getState().routes[navigation.getState().index].name;
                            if (routeName === 'CreatePostsScreen') {
                                return null;
                            }
                            return <Ionicons name="md-grid-outline" size={24} styles={styles.footerIcon} />
                        }
                }}
            />
            <Tabs.Screen name="CreatePostsScreen" component={CreatePostsScreen}
                options={{
                    title: "Створити публікацію",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        color: "#212121",
                        textAlign: "center",
                        fontFamily: "Roboto-Medium",
                        fontSize: 17,
                        lineHeight: 22,
                        letterSpacing: -0.408,
                    },
                    headerLeft: () => (
                        <TouchableOpacity style={styles.arrowContainer}  onPress={handleGetBack}>
                            <Feather name="arrow-left" size={24} color="rgba(33, 33, 33, 0.8)" />
                        </TouchableOpacity>
                    ),
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused, color, size }) => {
                        if (focused) {
                            return (
                                <View style={styles.plusContainerFocused}>
                                    <AntDesign name="delete" size={size} color="rgba(189, 189, 189, 1)" />
                                </View>
                            );
                        }
                        return (
                            <View style={styles.plusContainer}>
                                    <AntDesign name="plus" size={size} style={styles.plusIcon} />
                            </View>
                        )
                    },
                }}
            />
            <Tabs.Screen name="ProfileScreen" component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: () => null,
                    tabBarIcon: ({ focused, color, size }) => {
                        const navigation = useNavigation();
                        const routeName = navigation.getState().routes[navigation.getState().index].name;
                            if (routeName === 'CreatePostsScreen') {
                                return null;
                            }
                            return <Feather name="user" size={24} style={styles.footerIcon} />
                        }
                }}
    
            />
        </Tabs.Navigator>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        paddingBottom: 22,
        paddingLeft: 75,
        paddingRight: 75,
        paddingTop: 9,
        height: 83,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    plusContainerFocused: {
        width: 70,
        height: 40,
        backgroundColor: "rgba(246, 246, 246, 1)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Platform.OS === "ios" ? "50%" : 125,
    },
    plusContainer: {
        width: 70,
        height: 40,
        backgroundColor: "#FF6C00",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Platform.OS === "ios" ? "50%" : 125,
        },
    logoutContainer: {
        marginRight: 16,
    },
    arrowContainer: {
        marginLeft: 16,
    },
    logoutIcon: {
        color: "#BDBDBD"
    },
    footerIcon: {
        color: "rgba(33, 33, 33, 0.8)"
    },
    plusIcon: {
        color: "#FFFFFF"
    }
});
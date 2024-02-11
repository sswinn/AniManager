import { Pressable, View, Text, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"


const TabBar = ({navigation, screen}) =>
{ // custom navbar used on every screen. Consists of 5 evenly spaced pressables with icons representing the page

    const pressed = (button) =>
    {
        if (button === screen)
        {
            return "darkblue";
        }
    } // screen prop is a string for each screen this component appears on.
    // it allows the button for each screen to look "pressed" when on the respective screen
    return(
        <View style = {styles.bar}>

            <Pressable
                style = {[styles.barButton, {backgroundColor: pressed("home")}]}
                onPress = {() => {
                    navigation.navigate("FrontPage");
                }}
            >
                <View >
                    <MaterialIcons 
                        style = {styles.barButtonText}
                        name = {"home"}
                        color = {"white"}
                    />
                </View>
            </Pressable>

            <Pressable
                style = {[styles.barButton, {backgroundColor: pressed("pets")}]}
                onPress = {() => {
                    navigation.navigate("MyPets");
                }}
            >
                <View >
                    <MaterialIcons 
                            style = {styles.barButtonText}
                            name = {"pets"}
                            color = {"white"}
                    />
                </View>
            </Pressable>

            <Pressable
                style = {[styles.barButton, {backgroundColor: pressed("camera")}]}
                onPress = {() => {
                    navigation.navigate("Camera", {type: "normal"});
                }}
            >
                <View >
                    <MaterialIcons 
                        style = {styles.barButtonText}
                        name = {"camera-alt"}
                        color = {"white"}
                    />
                </View>
            </Pressable>

            <Pressable
                style = {[styles.barButton, {backgroundColor: pressed("profile")}]}
                onPress = {() => {
                    navigation.navigate("Profile");
                }}
            >
                <View >
                    <MaterialIcons 
                        style = {styles.barButtonText}
                        name = {"person"}
                        color = {"white"}
                    />
                </View>
            </Pressable>

            <Pressable
                style = {[styles.barButton, {backgroundColor: pressed("missing")}]}
                onPress = {() => {
                    navigation.navigate("Missing");
                }}
            >
                <View >
                    <MaterialIcons 
                        style = {styles.barButtonText}
                        name = {"warning"}
                        color = {"white"}
                    />
                </View>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        height: 60,
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-evenly",
        backgroundColor: "cornflowerblue"
    },
    barButton: {
        height: "100%",
        justifyContent: "center",
        width: "20%",
        backgroundColor: "cornflowerblue"
    },
    barButtonText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    }
})

export default TabBar;
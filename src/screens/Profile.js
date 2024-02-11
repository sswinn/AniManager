import { useContext, useEffect, useState } from "react";
import { View, FlatList, Image, Pressable, TextInput, Text, Button, StyleSheet } from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import TabBar from "../components/TabBar";
import PetContext from "../contexts/PetContext";
import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";
import { auth } from "../firebase_setup/firebase";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = ({navigation}) =>
{
    const {postState, deletePostState} = useContext(PostContext);
    const {petState, deletePetState} = useContext(PetContext);
    const {deleteProfileState, profileState, updateProfile} = useContext(UserContext);

    const userid = auth.currentUser.uid;
    console.log(profileState);
    const profile = profileState.find((prf) => prf.userId == userid);

    const [username, setUsername] = useState(profile.username);
    const [location, setLocation] = useState(profile.location);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress = {() => {
                        try {
                            auth.signOut()
                            .then(() => {
                                navigation.navigate("SignIn");
                                postState.forEach(post => deletePostState(post.id));
                                petState.forEach(pet => deletePetState(pet.id));
                                deleteProfileState(profile.userId);
                            })
                        } catch (e) {
                            console.log("Failed to sign out");
                        }
                    }}    

                >
                    <MaterialIcons
                        style = {{fontSize: 30}}
                        name = {"logout"}
                        color = {"black"}
                    />
                </Pressable>
            ),
        })
    }, []);

    return (
        <View style = {[GlobalStyles.mainView, {backgroundColor: "lightblue", justifyContent: "space-between"}]}>
            <View style = {{padding: 30, justifyContent: "space-between"}}>
                <View style = {GlobalStyles.itemContainer}>
                    <Text style = {GlobalStyles.subtitle}>Display name: </Text>
                    <TextInput 
                        value = {username} 
                        style = {[GlobalStyles.textinput, {marginBottom: 20}]} 
                        onChangeText = {(text) => setUsername(text)} 
                    />

                    <Text style = {GlobalStyles.subtitle}>Location: </Text>
                    <TextInput 
                        value = {location} 
                        style = {[GlobalStyles.textinput, {marginBottom: 20}]} 
                        onChangeText = {(text) => setLocation(text)} 
                    />

                    <Button 
                        style = {{borderRadius: 5}}
                        title = "Save Changes" 
                        onPress = {() => 
                            updateProfile(
                                profile.id, 
                                username,
                                location,
                                profile.userId
                            )
                        } 
                    />
                </View>
                <View style = {[GlobalStyles.itemContainer, {marginVertical: 30, height: "50%"}]}>
                    <Text style = {GlobalStyles.subtitle}>My Uploaded Images</Text>
                    <FlatList
                        data = {postState.filter((post) => post.userId = auth.currentUser.uid)}
                        keyExtractor = {item => item.id}
                        numColumns = {3}
                        style = {{}}
                        renderItem = {({item}) => {
                            return(
                                <Pressable 
                                    style = {styles.galleryImage} 
                                    onPress = {() => {
                                        navigation.navigate("PersonalImageViewer", {postId: item.id})
                                    }}    
                                >
                                    <Image 
                                        source = {{uri: item.image}} 
                                        style = {{width: "100%", height: "100%"}}
                                    />
                                </Pressable>
                            )}
                        }
                    />
                </View>
            </View>
            <View style = {GlobalStyles.navBarContainer}>
                <TabBar
                    screen = {"profile"}
                    navigation = {navigation}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    galleryImage: {
        marginRight: ".5%", 
        marginBottom: ".5%", 
        aspectRatio: 1, 
        width: "33%"
    }
})

export default Profile;
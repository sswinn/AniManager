import { auth } from "../firebase_setup/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextInput, View, Text, StyleSheet, Image } from "react-native";
import { useContext, useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import PetContext from "../contexts/PetContext";
import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";

const SignIn = ({navigation}) => 
{

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const {petState, getUserPets, addPetState, deletePetState} = useContext(PetContext);
    const {postState, getUserPosts, addPostState, deletePostState} = useContext(PostContext);
    const {getUserProfile, addProfileState} = useContext(UserContext);

    const signIn = async () =>
    {
        petState.forEach(pet => {
            deletePetState(pet.id); // clears state of pets
        });
        postState.forEach(post => {
            deletePostState(post.id); // clears state of posts
        });
        try {
            setMessage("Attempting to log you in, please wait...");
            await signInWithEmailAndPassword(auth, email, pass);
            navigation.navigate("FrontPage");
            console.log("1")
            getUserPets(auth.currentUser.uid, (pets) => {
                pets.forEach(pet => { // adds all users pets to the state for easier access
                    addPetState(
                        pet.id, 
                        pet.name, 
                        pet.age, 
                        pet.weight, 
                        pet.type, 
                        pet.breed_or_species, 
                        pet.food,
                        pet.medicine,
                        pet.userId,
                        pet.pfp,
                        pet.missing
                    );
                });
            });
            console.log("2")
            getUserPosts(auth.currentUser.uid, (posts) => {
                posts.forEach(post => { // adds all users posts to the state
                    addPostState(
                        post.id,
                        post.image,
                        post.desc,
                        post.petsVisible,
                        post.shared,
                        post.userId
                    );
                });
            });
            console.log("3", auth.currentUser.uid)
            getUserProfile(auth.currentUser.uid, (profile) => { // adds user profile details to state
                console.log("Adding profile to state");
                console.log(profile);
                addProfileState(profile.id, profile.username, profile.location, profile.userId, () => {console.log("profile added to state")});
            });
        } catch (e) {
            console.log("Error")
            setError(e.toString() + "\nEmail or password are incorrect.");
        }
        setMessage("");
    }

    return(
        <View>
            <TextInput 
                style = {[styles.signInInputs, GlobalStyles.textinput]}
                placeholder = "Email"
                onChangeText = {(text) => {
                    setEmail(text);
                }}
            />
            <TextInput 
                style = {[styles.signInInputs, GlobalStyles.textinput]}
                placeholder = "Password"
                secureTextEntry = {true}
                onChangeText = {(text) => {
                    setPass(text);
                }}
            />
            <Text >{error.split("\n")[0]}</Text>
            <Text style = {[GlobalStyles.bold, {color: "red"}]}>{error.split("\n")[1]}</Text>
            <Button 
                title = {"Login"}
                onPress = {() => {
                    signIn();
                }}
            />
            <Text style = {{alignSelf: "center", margin: 20}}>OR</Text>
            <Button 
                title = {"Sign Up"}
                onPress = {() => {
                    navigation.navigate("SignUp");
                }}
            />
            <Text style = {{alignSelf: "center", margin: 20}}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        signInInputs: {
            marginTop: 40,
            marginHorizontal: 20,
        }
    }
)

export default SignIn;
import { auth } from "../firebase_setup/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import UserContext from "../contexts/UserContext";

const SignUp = ({navigation}) => 
{
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const {addProfile} = useContext(UserContext);

    const createProfile = async () =>
    {
        addProfile(user, "", auth.currentUser.uid); // adds users profile to the state
    }

    const signUp = async () =>
    {
        try {
            setMessage("Attempting to sign you up, please wait...");
            await createUserWithEmailAndPassword(auth, email, pass)
            .then(() => {
                createProfile();
            })
            navigation.navigate("FrontPage");
            
        } catch (e) {
            setError(e.toString() + "\nPlease try entering a different email. Display names must be 3 or more characters long.");
        }
        setMessage("");
    }

    return(
        <View>
            <TextInput 
                style = {[GlobalStyles.textinput, styles.signUpInputs]}
                placeholder = "Email"
                onChangeText = {(text) => {
                    setEmail(text);
                }}
            />
            <TextInput
                style = {[GlobalStyles.textinput, styles.signUpInputs]}
                placeholder = "Display Name"
                onChangeText = {(text) => {
                    setUser(text);
                }}
            />
            <TextInput 
                style = {[GlobalStyles.textinput, styles.signUpInputs]}
                placeholder = "Password"
                secureTextEntry = {true}
                onChangeText = {(text) => {
                    setPass(text);
                }}
            />
            <Text >{error.split("\n")[0]}</Text>
            <Text style = {[GlobalStyles.bold, {color: "red"}]}>{error.split("\n")[1]}</Text>
            <Button 
                title = {"Sign Up"}
                onPress = {() => {
                    if (user.length >= 3)
                    {
                        signUp();
                    }
                }}
            />
            <Text style = {{alignSelf: "center", margin: 20}}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        signUpInputs: {
            marginTop: 40,
            marginHorizontal: 20,
        }
    }
)


export default SignUp;
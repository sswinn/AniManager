import { useContext, useState } from "react";
import { TextInput, View, Text, Pressable, StyleSheet, Image } from "react-native"
import GlobalStyles from "../components/GlobalStyles";
import TabBar from "../components/TabBar";
import { auth } from "../firebase_setup/firebase";
import PetContext from "../contexts/PetContext";
import defaultpfp from "../../assets/defaultpfp.jpg";

const AddPet = ({navigation}) =>
{
    const [name, setName] = useState("");

    const {addPet, addPetState} = useContext(PetContext);

    const defaultUri = Image.resolveAssetSource(defaultpfp).uri

    return(
        <View style = {[GlobalStyles.mainView, {backgroundColor: "lightblue", justifyContent: "center"}]}>

            <View style = {[styles.addPetView, {backgroundColor: "white"}]}>
                <Text style = {GlobalStyles.title}>Enter your pet's name:</Text>
                <TextInput
                    placeholder = "Name"
                    style = {GlobalStyles.textinput}
                    value = {name}
                    onChangeText = {(text) => {
                        setName(text);
                    }}
                />
            </View>

            <Pressable 
                style = {[styles.addPetView, {backgroundColor: "cornflowerblue"}]}
                onPress = {() => {
                    addPet(
                        name, 
                        auth.currentUser.uid, 
                        defaultUri,
                        (id) => {navigation.navigate("PetProfile", {currentId: id})}
                    );
                }}
            >
                    <View >
                        <Text style = {[GlobalStyles.title, {color: "white", textAlign: "center"}]}>Confirm</Text>
                    </View>
            </Pressable>

            <View style = {GlobalStyles.navBarContainer}>

                <TabBar                    
                    screen = {"pets"}
                    navigation = {navigation}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create(
    {
        addPetView: {
            margin: 20, 
            padding: 20, 
            borderRadius: 5, 
            justifyContent: "space-evenly", 
        }
    }
)

export default AddPet;
import { useContext, useEffect, useState } from "react";
import { TextInput, View, Button, Pressable, StyleSheet, Image, Text } from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import PetContext from "../contexts/PetContext";
import { MaterialIcons } from "@expo/vector-icons";
import EditPetField from "../components/EditPetField";
import { Picker } from "@react-native-picker/picker";
import TypePicker from "../components/TypePicker";

const EditPet = ({navigation, route}) => // screen for editing pet details, as well as food and medicine
{
    const {petState, updatePet, deletePet} = useContext(PetContext);

    const {currentId} = route.params;

    const currentPet = petState.find((pet) => pet.id === currentId);
    
    const [name, setName] = useState(currentPet.name);
    const [age, setAge] = useState(currentPet.age);
    const [weight, setWeight] = useState(currentPet.weight);
    const [type, setType] = useState(currentPet.type);
    const [breed_or_species, setBreed_or_species] = useState(currentPet.breed_or_species);
    const [missing, setMissing] = useState(currentPet.missing);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress = {() => {
                        updatePet(
                            currentId, 
                            name, 
                            age, 
                            weight, 
                            type, 
                            breed_or_species, 
                            currentPet.food,
                            currentPet.medicine,
                            currentPet.userId, 
                            currentPet.pfp,
                            missing,
                            () => navigation.pop());
                        console.log(petState);
                    }} 
                >
                    <MaterialIcons
                        style = {{fontSize: 30}}
                        name = {"check"}
                        color = {"black"}
                    />
                </Pressable>
            ),
            headerLeft: () => (
                <Pressable
                    onPress = {() => {
                        navigation.pop()
                    }}
                >
                    <MaterialIcons
                        style = {{fontSize: 30}}
                        name = {"close"}
                        color = {"black"}
                    />
                </Pressable>
            )
        })
    });

    const isMissingFunc = () =>
    {
        if (currentPet.missing.isMissing === true)
        {
            return "No Longer Missing";
        }
        return "Report Missing";
    }

    return (
        <View style = {{height: "100%", padding: 20, backgroundColor: "lightblue", justifyContent: "space-between"}}>
            <View style = {[GlobalStyles.itemContainer, {gap: 20}]}>

                <EditPetField 
                    stat = {name}
                    setStat = {setName}
                    title = {"Name:"}
                />

                <EditPetField 
                    stat = {age}
                    setStat = {setAge}
                    title = {"Age (years):"}
                />

                <EditPetField 
                    stat = {weight}
                    setStat = {setWeight}
                    title = {"Weight (kg):"}
                />

                <Text style = {[GlobalStyles.bold, {marginBottom: -15}]}>Type:</Text>
                <View style = {[GlobalStyles.textinput, {padding: 0}]}>
                    <TypePicker
                        value = {type}
                        setValue = {setType}
                    />
                </View>

                {/*<EditPetField 
                    stat = {type}
                    setStat = {setType}
                    title = {"Type:"}
                />*/}

                <EditPetField
                    stat = {breed_or_species}
                    setStat = {setBreed_or_species}
                    title = {"Breed / Species:"}
                />

                {/*<DropDownPicker
                    placeholder = "Select type..."
                    value = {type}
                    setValue = {setType}
                    items = {dropdownItems}
                    setItems = {setDropdownItems}
                    open = {dropdownOpen}
                    setOpen = {setDropdownOpen}
                    dropDownContainerStyle = {{zIndex: 999}}
                />*/}

            </View>

            <View style = {{gap: 20}}>
                <Pressable 
                    style = {[GlobalStyles.footerButton, {backgroundColor: "orange", borderRadius: 10}]} 
                    onPress = {() => {
                        if (currentPet.missing.isMissing === true)
                        {
                            setMissing({isMissing: false, location: {}});
                        } else {
                            navigation.navigate("ReportMissing", {currentPet: currentPet});
                        }
                    }}
                >
                    {/*<MaterialIcons      
                        style = {{fontSize: 30, alignSelf: "center"}}
                        name = {"warning"}
                        color = {"white"}
                    />*/}
                    <Text style = {[GlobalStyles.title, {alignSelf: "center", color: "white"}]}>{isMissingFunc()}</Text>
                </Pressable>

                <Pressable 
                    style = {[GlobalStyles.footerButton, {backgroundColor: "crimson", borderRadius: 10}]} 
                    onPress = {() => {
                        deletePet(currentId);
                        navigation.navigate("MyPets");
                    }}
                >
                    <MaterialIcons  
                        style = {{fontSize: 30, alignSelf: "center"}}
                        name = {"delete"}
                        color = {"white"}
                    />
                </Pressable>
            </View>

        </View>
    );
}

styles = StyleSheet.create(
    {
        editPetTextInput: {
            margin: 10,
        }
    }
)

export default EditPet;
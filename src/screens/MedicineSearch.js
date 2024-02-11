import { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, Pressable, TextInput } from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import PetContext from "../contexts/PetContext";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const MedicineSearch = ({navigation, route}) => // screen to search for medications to document them for each pet
{
    const {petState, updatePet} = useContext(PetContext);

    const [drugResults, setDrugResults] = useState([]);

    const search = async (str) =>
    {
        try {
            const result = await axios.get(
                "https://dailymed.nlm.nih.gov/dailymed/services/v2/drugnames.json?drug_name=" + str)  
            setDrugResults(result.data.data.filter(item => (item.drug_name.length < 100))); // uses axios to access API url with search term concat
        } catch (e) {                                           // long medication names omitted since many take up too much space and are combinations of specific medication
            console.log("Error fetching API results");
        }
    }

    const {currentId} = route.params;
    const currentPet = petState.find(pet => pet.id === currentId);

    const [selected, setSelected] = useState(currentPet.medicine);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress = {() => {
                        updatePet(
                            currentPet.id,
                            currentPet.name,
                            currentPet.age,
                            currentPet.weight,
                            currentPet.type,
                            currentPet.breed_or_species,
                            currentPet.food,
                            selected, // update pet with selected medications
                            currentPet.userId,
                            currentPet.pfp,
                            currentPet.missing,
                            () => navigation.pop());
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

    return (
        <View style = {{height: "100%", backgroundColor: "grey", padding: 30, gap: 30}}>
            <View style = {[GlobalStyles.itemContainer, {height: "40%"}]}>
                <FlatList
                    style = {{flex: 1, padding: 5,}}
                    data = {selected}
                    keyExtractor = {(item, index) => index}
                    renderItem = {({item}) => {
                        return (
                            <View style = {{backgroundColor: "lightblue", marginVertical: 2, padding: 2, borderRadius: 2, display: "flex", flexDirection: "row"}}>
                                <Pressable onPress = {() => {
                                        setSelected(selected.filter((obj) => obj !== item)) // remove item when pressed
                                }}>
                                    <MaterialIcons
                                        style = {{fontSize: 30}}
                                        name = {"close"}
                                        color = {"black"}
                                    />
                                </Pressable>
                                <Text>{item}</Text>
                            </View>
                        )
                    }}
                />
            </View>
            <View style = {[GlobalStyles.itemContainer, {height: "40%"}]}>
                <TextInput 
                    placeholder = "Search..."
                    style = {GlobalStyles.textinput}  
                    onChangeText = {(text) => search(text)}    
                />
                <FlatList
                    style = {{flex: 1, padding: 5,}}
                    data = {drugResults}
                    keyExtractor = {(item, index) => index}
                    renderItem = {({item}) => {
                        return (
                            <Pressable onPress = {() => {
                                if (!selected.includes(item.drug_name)) setSelected(selected.concat([item.drug_name])) // add item when pressed
                            }}>
                                <View style = {{backgroundColor: "lightblue", marginVertical: 2, padding: 2, borderRadius: 2, display: "flex", flexDirection: "row"}}>
                                    <MaterialIcons
                                        style = {{fontSize: 30}}
                                        name = {"add"}
                                        color = {"black"}
                                    />
                                    <Text >{item.drug_name}</Text>
                                </View>
                            </Pressable>
                        )
                    }}
                />
            </View>
        </View>
    );
}

export default MedicineSearch;
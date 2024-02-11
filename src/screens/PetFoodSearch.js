import { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, Pressable, TextInput, StyleSheet } from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import PetContext from "../contexts/PetContext";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { BarCodeScanner } from "expo-barcode-scanner"

const PetFoodSearch = ({navigation, route}) => // screen for search pet food with a barcode scanner to document food given to each pet
{
    const {petState, updatePet} = useContext(PetContext);

    const {currentId} = route.params;
    const currentPet = petState.find(pet => pet.id === currentId);

    const [selected, setSelected] = useState(currentPet.food);

    const addResult = (item) =>
    {
        if (!selected.includes(item.product_name)) {
            setSelected(selected.concat([item.product_name]));
        }
    }

    const search = async ( {type, data} ) =>
    {
        try {
            const result = await axios.get(
                "https://world.openpetfoodfacts.org/api/v0/product/" + data + ".json") 
            addResult(result.data.product) // uses axios to access API url with search term concat
        } catch (e) {
            console.log("Error fetching API results");
        }
    };

    const [hasPerms, setHasPerms] = useState(null);

    useEffect(() =>
    {
        const getPerms = async () => { // func to get perms
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPerms(status == "granted");
        };

        getPerms(); // call function
    }, []);

    const noPerms = () => {
        if (hasPerms === null || hasPerms === false) {
            return "Error Accessing Camera";
        }        
    }

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
                            selected,
                            currentPet.medicine,
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

            <View style = {{width: "80%", aspectRatio: 1, alignSelf: "center"}}>
                <BarCodeScanner
                    style = {StyleSheet.absoluteFillObject}
                    onBarCodeScanned = { search }
                />
            </View>
            <Text style = {GlobalStyles.bold}>{noPerms()}</Text>
        </View>
    );
}

export default PetFoodSearch;
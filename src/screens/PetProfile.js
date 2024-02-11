import { View, Image, FlatList, Text, StyleSheet, Button, Pressable, TextInput, ScrollView } from "react-native";
import TabBar from "../components/TabBar";
import GlobalStyles from "../components/GlobalStyles";
import PetDetails from "../components/PetDetails";
import { useContext, useEffect, useState } from "react";
import PetContext from "../contexts/PetContext";
import { MaterialIcons } from "@expo/vector-icons";
import PhotoDisplayList from "../components/PhotoDisplayList";
import { auth } from "../firebase_setup/firebase";
import PostContext from "../contexts/PostContext";
import axios from "axios";
import PetFoodSearch from "./PetFoodSearch";

const PetProfile = ({navigation, route}) => 
{
    const {petState} = useContext(PetContext);
    const {getPostsByPet} = useContext(PostContext);

    const {currentId} = route.params;
    const currentPet = petState.find((pet) => pet.id === currentId);

    console.log(currentPet);

    const photoList = getPostsByPet(currentPet);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress = {() => {
                        navigation.navigate("EditPet", {currentId: currentId});
                    }}    
                >
                    <MaterialIcons
                        style = {{fontSize: 30}}
                        name = {"edit"}
                        color = {"black"}
                    />
                </Pressable>
            )
        })
    });

    return(
        <View style = {[GlobalStyles.mainView, {backgroundColor: "gray"}]}>

            <View style = {{justifyContent: "space-between", height: "100%", marginBottom: 110}}>
                <View>
                    <PetDetails
                        pet = {currentPet}
                    />

                    {/*<View style = {[GlobalStyles.itemContainer, {margin: 20}]}>
                        <Pressable onPress = {() => navigation.navigate("PetFoodSearch", {currentId: currentId})}>
                            <View>
                                <Text style = {GlobalStyles.subtitle}>Feeding</Text>
                            </View>
                        </Pressable>
                    </View>*/}

                    <View style = {[GlobalStyles.itemContainer, {marginHorizontal: 20, marginTop: 20, height: "20%"}]}>
                        <Pressable onPress = {() => {navigation.navigate("PetFoodSearch", {currentId: currentId})}}>
                            <View style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, padding: 5, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Text style = {GlobalStyles.subtitle}>Food</Text>
                                <MaterialIcons
                                    style = {{fontSize: 20}}
                                    name = {"arrow-forward-ios"}
                                    color = {"black"}
                                />
                            </View>
                        </Pressable>
                        <FlatList
                            data = {currentPet.food}
                            keyExtractor = {(item, index) => index} // flatlist containing array of pet food assigned to pet
                            renderItem = {({item}) => {
                                return (
                                    <View style = {{padding: 2, margin: 2, backgroundColor: "lightblue"}}>
                                        <Text>{item}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>

                    <View style = {[GlobalStyles.itemContainer, {marginHorizontal: 20, marginTop: 20, height: "20%"}]}>
                        <Pressable onPress = {() => {navigation.navigate("MedicineSearch", {currentId: currentId})}}>
                            <View style = {{backgroundColor: "white", borderColor: "gray", borderWidth: 1, padding: 5, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Text style = {GlobalStyles.subtitle}>Medicine</Text>
                                <MaterialIcons
                                    style = {{fontSize: 20}}
                                    name = {"arrow-forward-ios"}
                                    color = {"black"}
                                />
                            </View>
                        </Pressable>
                        <FlatList
                            data = {currentPet.medicine}
                            keyExtractor = {(item, index) => index} // flatlist containing array of medicine assigned to pet
                            renderItem = {({item}) => {
                                return (
                                    <View style = {{padding: 2, margin: 2, backgroundColor: "lightblue"}}>
                                        <Text>{item}</Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>

            <View style = {GlobalStyles.navBarContainer}>
                <PhotoDisplayList
                        list = {photoList}
                        navigation = {navigation}
                        currentPet = {currentPet}
                        type = "private"
                />
                <TabBar
                    screen = {"pets"}
                    navigation = {navigation}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create(
    {

    }
);

export default PetProfile;
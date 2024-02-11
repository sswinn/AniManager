import { useContext, useEffect, useState } from "react";
import { View, Image, Text, Button, Pressable, FlatList, TextInput, StyleSheet, ScrollView } from "react-native";
import PostContext from "../contexts/PostContext";
import { MaterialIcons } from "@expo/vector-icons";
import PetContext from "../contexts/PetContext";
import GlobalStyles from "../components/GlobalStyles";
import TabBar from "../components/TabBar";


const PersonalImageViewer = ({navigation, route}) => 
{ // viewer used for images that havent been shared publicly, which are all stored in state
    const {postState, updatePost, deletePost} = useContext(PostContext);
    const {petState, updatePet} = useContext(PetContext)

    const {postId, currentPet} = route.params;
    const post = postState.find((item) => item.id === postId);

    const [petsVisible, setPetsVisible] = useState(post.petsVisible);
    const [desc, setDesc] = useState(post.desc);

    const shareToggleString = (bool) =>
    {
        if (bool === true) return "Unshare";
        return "Share";
    }

    const visiblePetHandler = (item) => // removes or adds pet from or to petsVisible array based on what has been toggled
    {
        if (petsVisible.includes(item)) {
            setPetsVisible(petsVisible.filter((pet) => pet !== item));
        } else {
            setPetsVisible(petsVisible.concat([item]));
        }
    }

    const tickCrossHandler = (item) => // returns intuitively coloured and shaped symbols per toggled pet
    {
        if (petsVisible.includes(item)) {
            return ["check-circle", "green"];
        } else {
            return ["cancel", "red"];
        }
    }

    const makePfp = () =>
    {
        if (currentPet)
        {
            return (
                <Button
                    style = {styles.buttons} 
                    title = "Make Profile Picture" 
                    onPress = {() => {
                        updatePet(
                            currentPet.id, 
                            currentPet.name, 
                            currentPet.age, 
                            currentPet.weight, 
                            currentPet.type, 
                            currentPet.breed_or_species, 
                            currentPet.food,
                            currentPet.medicine,
                            currentPet.userId, 
                            post.image,
                            currentPet.missing,);
                    }} 
                />
            )
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress = {() => {
                        updatePost(
                            post.id,
                            post.image, 
                            desc,
                            petsVisible,
                            post.shared,
                            post.userId
                        );
                        navigation.pop();
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
                        navigation.pop();
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

        <ScrollView style = {{paddingBottom: 500, backgroundColor: "lightblue"}}>
            <Image
                source = {{uri: post.image}}
                style = {styles.personalImage}
            />

            <View style = {styles.visibleListContainer}>
                <Text style = {{fontWeight: "bold", marginBottom: 10}}>Image description:</Text>
                <TextInput
                    multiline = {true}
                    style = {GlobalStyles.textinput}
                    value = {desc}
                    onChangeText = {(text) => setDesc(text)}
                />
            </View>


            <View style = {styles.visibleListContainer}>
                <Text style = {{fontWeight: "bold"}}>Who appears in this image?</Text>
                <View style = {styles.visiblePetsList}>
                    {        
                        petState.map((item) => 
                        {
                            return (
                                <Pressable 
                                    style = {styles.pressableListItem}
                                    key = {item.id}
                                    onPress = {() => 
                                    {
                                        visiblePetHandler(item.id);
                                    }}
                                >
                                    <Text>{item.name}</Text>
                                    <MaterialIcons 
                                        name = {tickCrossHandler(item.id)[0]}
                                        color = {tickCrossHandler(item.id)[1]}
                                    />
                                </Pressable>
                            );
                        })
                    }
                </View>
            </View>

            {makePfp()}

            <Button style = {styles.buttons} title = {shareToggleString(post.shared)} onPress = {() => {
                    updatePost(
                        post.id,
                        post.image, 
                        desc,
                        petsVisible,
                        !post.shared,
                        post.userId
                    );
                }}
            />

            <Button 
                style = {styles.buttons} 
                color = "red"
                title = "Delete"
                onPress = {() => {
                    navigation.navigate("FrontPage");
                    deletePost(postId);
                }}
            />

        </ScrollView>

    )
}

const styles = StyleSheet.create(
    {
        buttons: {
            marginTop: 5
        },
        visiblePetsList: {
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            flexWrap: "wrap",
            justifyContent: "space-evenly"
        },
        pressableListItem: {
            padding: 10, 
            backgroundColor: "lightgrey", 
            borderRadius: 10, 
            marginRight: 10,
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5
        },
        visibleListContainer: {
            borderRadius: 10,
            backgroundColor: "white",
            padding: 20,
            marginTop: 10,
            marginHorizontal: 20
        },
        personalImage: {
            width: "60%", 
            aspectRatio: 1, 
            alignSelf: "center", 
            borderRadius: 10, 
            marginTop: 10
        },
    }
)

export default PersonalImageViewer;
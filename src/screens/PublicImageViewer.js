import { useContext, useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import TabBar from "../components/TabBar";
import PetContext from "../contexts/PetContext";
import PostContext from "../contexts/PostContext";

const PublicImageViewer = ({navigation, route}) =>
{ // viewer for images that have been shared to the gallery, accessed from the database
    const {post} = route.params;

    const {getUserPets} = useContext(PetContext);
    const {getUsernameByPost} = useContext(PostContext);

    const [petString, setPetString] = useState(" no named pets");
    const [username, setUsername] = useState("");

    const petStringFunc = (pets) =>
    {
        let str = "";
        post.petsVisible.forEach((petid, i) => {
            const pet = pets.find((pet) => pet.id === petid);
            if (pet) {
                if (i === 0) str += " ";
                else if (i === pets.length -1) {
                    if (pets.length > 2) str += ", and ";
                    else str += " and "; 
                }
                else str += ", ";
                str += pet.name;
            }
        });
        setPetString(str);
    }

    getUserPets(post.userId, (pets) => {
        petStringFunc(pets);
    });

    useEffect(() => {
        getUsernameByPost(post, (name) => setUsername(name));
    })

    return (
        <View style = {[GlobalStyles.mainView, {justifyContent: "space-between", backgroundColor: "black"}]}>
            <View style = {{padding: 20, gap: 20}}>
                <Image 
                    source = {{uri: post.image}} 
                    style = {{aspectRatio: 1, width: "100%", alignSelf: "center", borderRadius: 20}}    
                />

                <View style = {[GlobalStyles.itemContainer, {gap: 10}]}>
                    <Text>
                        {post.desc}
                    </Text>
                    <Text>This image includes{petString}.</Text>
                </View>
                <Text style = {[GlobalStyles.bold, {color: "white"}]}>Uploaded by {username}</Text>
            </View>
            <View style = {GlobalStyles.navBarContainer}>
                <TabBar
                    screen = {"home"}
                    navigation = {navigation}
                />
            </View>
        </View>
    );
}

export default PublicImageViewer;
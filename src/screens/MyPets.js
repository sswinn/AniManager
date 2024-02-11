import { FlatList, Pressable, View, Text, Image } from "react-native"
import { auth, db } from "../firebase_setup/firebase";
import { getDocs, collection } from "firebase/firestore";
import TabBar from "../components/TabBar";
import GlobalStyles from "../components/GlobalStyles";
import { useContext, useEffect, useState } from "react";
import MyPetsCard from "../components/MyPetsCard";
import PetContext from "../contexts/PetContext";
import PostContext from "../contexts/PostContext";

const MyPets = ({navigation}) => // list of current users pets
{

    const {petState} = useContext(PetContext);

    return (
        <View style = {GlobalStyles.mainView}>
            <FlatList
                contentContainerStyle = {{paddingBottom: 500}}
                data = {petState}
                keyExtractor = {(item) => item.id}
                renderItem = {({item}) => 
                {
                    return (
                        <MyPetsCard
                            navigation = {navigation}
                            item = {item}
                            missing = {false}
                        />
                    )
                }}
            />

            <View style = {GlobalStyles.navBarContainer}>
                
                <Pressable onPress = {() => {navigation.navigate("AddPet")}}>
                    <View style = {GlobalStyles.footerButton}>
                        <Text style = {[GlobalStyles.title, {textAlign: "center"}]}>
                            + Add New Pet
                        </Text>
                    </View>
                </Pressable>

                <TabBar
                    screen = {"pets"}
                    navigation = {navigation}
                />
            </View>

        </View>
    );
}

export default MyPets;
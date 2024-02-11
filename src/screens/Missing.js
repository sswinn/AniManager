import { useContext, useEffect, useState } from "react";
import { Button, FlatList, Pressable, View } from "react-native";
import PetContext from "../contexts/PetContext";
import MyPetsCard from "../components/MyPetsCard";
import GlobalStyles from "../components/GlobalStyles";
import TabBar from "../components/TabBar";
import { MaterialIcons } from "@expo/vector-icons";

const Missing = ({navigation}) =>
{

    const {getMissingPets} = useContext(PetContext);
    const [petsList, setPetsList] = useState([]);

    const getList = () =>
    {
        getMissingPets((pets) => {
            setPetsList(pets);
        })
    }

    useEffect(() => {
            getList();
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress = {() => {
                        getList();
                    }}    

                >
                    <MaterialIcons
                        style = {{fontSize: 30}}
                        name = {"refresh"}
                        color = {"black"}
                    />
                </Pressable>
            ),
        })
    }, []);

    return(
        <View style = {GlobalStyles.mainView}>
            <FlatList
                data = {petsList}
                keyExtractor = {(pet) => pet.id}
                renderItem = {({item}) => 
                {
                    return (

                        <MyPetsCard
                            navigation = {navigation}
                            item = {item}
                            missing = {true}
                        />

                    )
                }}
            />

            <View style = {GlobalStyles.navBarContainer}>
                <TabBar
                    screen = "missing"
                    navigation = {navigation}
                />
            </View>
        </View>
    );
}

export default Missing;
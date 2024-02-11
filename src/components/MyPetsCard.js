import { useContext } from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import PetContext from "../contexts/PetContext";
import GlobalStyles from "./GlobalStyles";

const MyPetsCard = ({navigation, item, missing}) =>
{
    const {petState, addPetState} = useContext(PetContext);
// component used in MyPets and Missing flatlist to show pet profile picture and name
    return ( // leads to their respective profiles on the respective screens
        <View>
            <Pressable 
                style = {styles.cardPressable}
                onPress = {() => {
                    if (missing == false)
                    {
                        addPetState(
                            item.id, 
                            item.name, 
                            item.age, 
                            item.weight, 
                            item.type, 
                            item.breed_or_species,
                            item.food,
                            item.medicine,
                            item.userId,
                            item.pfp,
                            item.missing,
                            () => navigation.navigate("PetProfile", {currentId: item.id}));
                    }
                    else if (missing == true)
                    {
                        navigation.navigate("MissingProfile", {pet: item});
                    }
                }}
            >
                <Image 
                    style = {styles.petCardImage}
                    source = {{uri: item.pfp}} 
                />
                <View>
                    <Text style = {GlobalStyles.title}>{item.name}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        cardPressable: {
            display: "flex", 
            flexDirection: "row",
            padding: 10, 
            marginTop: 20, 
            marginHorizontal: 20,
            backgroundColor: "lightblue",
            borderRadius: 5
        },
        petCardImage: {
            width: 50,
            height: 50,
            resizeMode: "cover",
            marginRight: 10,
            borderRadius: 5
        },
    }
)

export default MyPetsCard;
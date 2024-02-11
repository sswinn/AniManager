import { View, Text, StyleSheet, Image } from "react-native";
import GlobalStyles from "./GlobalStyles";

const PetDetails = ({pet}) =>
{
    return(
// component used to display all pet details with nice styling for a couple different uses (PetProfile and Missing)
        <View>
            <View style = {{display: "flex", flexDirection: "row", padding: 20, backgroundColor: "lightblue"}}>

                <Image style = {styles.petProfileImage}
                source = {{uri: pet.pfp}} />

                <View style = {[GlobalStyles.itemContainer, {flex: 1}]}>

                    <Text style = {GlobalStyles.title}>Pet Details</Text>   

                    <View style = {styles.petDetailsView}>
                        <Text style = {GlobalStyles.subtitle}>Name:</Text>
                        <Text style = {GlobalStyles.bold}>{pet.name}</Text>
                    </View>

                    <View style = {styles.petDetailsView}>
                        <Text style = {GlobalStyles.subtitle}>Age:</Text>
                        <Text style = {GlobalStyles.bold}>{pet.age} yrs</Text>
                    </View>

                    <View style = {styles.petDetailsView}>
                        <Text style = {GlobalStyles.subtitle}>Weight:</Text>
                        <Text style = {GlobalStyles.bold}>{pet.weight} kg</Text>
                    </View>

                </View>

            </View>

            <View style = {{paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "lightblue"}}>
            
                <View style = {GlobalStyles.itemContainer}>
                    <View style = {styles.petDetailsView}>
                        <Text style = {GlobalStyles.subtitle}>Type:</Text>
                        <Text style = {GlobalStyles.bold}>{pet.type}</Text>
                    </View>

                    <View style = {styles.petDetailsView}>
                        <Text style = {GlobalStyles.subtitle}>Breed/Species:</Text>
                        <Text style = {GlobalStyles.bold}>{pet.breed_or_species}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        petDetailsView: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        },
        petProfileImage: {
            width: "40%", 
            aspectRatio: 1, 
            resizeMode: "cover",
            marginRight: 20,
            borderRadius: 10
        }
    }
)

export default PetDetails;
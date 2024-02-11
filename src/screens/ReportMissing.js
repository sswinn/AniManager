import { useState, useEffect, useContext } from "react";
import { View, Text, Pressable, Button } from "react-native";
import GlobalStyles from "../components/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import PetContext from "../contexts/PetContext";
import MapView, { Marker } from "react-native-maps";

const ReportMissing = ({route, navigation}) => // screen to report a pet missing using maps and optional GPS
{

    const {currentPet} = route.params;
    const {updatePet} = useContext(PetContext);
    
    const [region, setRegion] = useState(
        {
            latitude: 0,
            longitude: 0,
        }
    );

    useEffect(() => {
        getPerms();
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
                            currentPet.medicine,
                            currentPet.userId, 
                            currentPet.pfp,
                            {isMissing: true, location: region},
                            () => navigation.navigate("Missing")
                        );
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

    if (hasPerms === null || hasPerms === false){
        console.log("Error retrieving your location");
    }

    const [hasPerms, setHasPerms] = useState(null);

    const getPerms = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        setHasPerms(status == "granted");
        console.log(status);
    };

    const getLocation = async (callback) => 
    {
        const location = await Location.getCurrentPositionAsync({});
        callback(location.coords); // has to use a callback or returns undefined and sets UseState to undefined
    }

    return(
        <View style = {{padding: 30, justifyContent: "space-evenly"}}>
            <Text style = {GlobalStyles.title}>Are you sure you want to report {currentPet.name} as missing?</Text>
            <Text style = {GlobalStyles.subtitle}>By progressing past this screen you will publicly share this pet as missing on the Missing Pets screen.</Text>
            <Text>Hold finger down on marker until it moves upwards, then drag to desired location</Text>
           
            
            <MapView 
                style = {{height: "50%"}} 
                region = {region}
            >
                <Marker
                    draggable = {true}
                    coordinate = {region}
                    title = {currentPet.name}
                    onDragEnd = {(marker) => {
                        setRegion(
                            {
                                latitude: marker.nativeEvent.coordinate.latitude,
                                longitude: marker.nativeEvent.coordinate.longitude
                            } // sets region to the marker's location on the map
                        );
                    }}
                />
            </MapView>
            
            <Button title = "Use my location" 
                onPress = {() => {
                    getLocation((loc) => {
                        setRegion({
                            latitude: loc.latitude,
                            longitude: loc.longitude
                        })
                    })
                }}
            />

        </View>
    )
}

export default ReportMissing;
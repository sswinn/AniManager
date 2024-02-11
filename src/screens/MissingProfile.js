import { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import GlobalStyles from "../components/GlobalStyles";
import PetDetails from "../components/PetDetails";
import PhotoDisplayList from "../components/PhotoDisplayList";
import TabBar from "../components/TabBar";
import PostContext from "../contexts/PostContext";

const MissingProfile = ({navigation, route}) =>
{
    const {pet} = route.params;
    const loc = pet.missing.location;

    const {getSharedPostsByPet} = useContext(PostContext);

    const [photoList, setPhotoList] = useState([]);

    useEffect(() => {
        getSharedPostsByPet(pet, (newList) => {
            setPhotoList(newList);
        })
    }, [])

    const locObj = 
        {
            latitude: loc.latitude,
            longitude: loc.longitude,
        }

    return (
        <View style = {GlobalStyles.mainView}>
            <View style = {{justifyContent: "space-between", paddingBottom: 60, height: "100%"}}>
                <View>

                    <PetDetails
                        pet = {pet}
                    />

                    <MapView 
                        style = {{height: "60%"}} 
                        region = {locObj}
                    >
                        <Marker
                            draggable = {false}
                            coordinate = {locObj}
                            title = {pet.name}
                            type = "public"
                        />
                    </MapView>

                </View>

            </View>

            <View style = {GlobalStyles.navBarContainer}>
                <PhotoDisplayList
                    navigation = {navigation}
                    currentPet = {pet}
                    list = {photoList}
                />
                <TabBar
                    screen = "missing"
                    navigation = {navigation}
                />
            </View>

        </View>
    )
}

export default MissingProfile;
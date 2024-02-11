import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import TabBar from "../components/TabBar";
import GlobalStyles from "../components/GlobalStyles";
import { useContext, useEffect, useState } from "react";
import PostContext from "../contexts/PostContext";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TypePicker from "../components/TypePicker";

const FrontPage = ({navigation}) => 
{
    const [petsList, setPetsList] = useState([]);
    const [filter, setFilter] = useState("");

    const {getSharedPosts} = useContext(PostContext);

    const getList = () =>
    {
        getSharedPosts(filter, (list) => {
            setPetsList(list);
            console.log(list)
        })
    }

    useEffect(() => {
        getList();
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    onPress = {() => {
                        getList(); // refresh button to re-obtain the list from the database
                    }}    

                >
                    <MaterialIcons
                        style = {{fontSize: 30}}
                        name = {"refresh"}
                        color = {"black"}
                    />
                </Pressable>
            ),
            headerLeft: () => (
                <Pressable
                    onPress = {() => {
                        setFilter("");
                    }}    

                >
                    <MaterialCommunityIcons
                        style = {{fontSize: 26}}
                        name = {"filter-remove-outline"}
                        color = {"black"}
                    />
                </Pressable>
            )
        })
    }, [filter]);

    return(
        <View style = {[GlobalStyles.mainView, {backgroundColor: "black"}]}>
            
            <TypePicker
                value = {filter}
                setValue = {setFilter}
            />

            <FlatList
                contentContainerStyle = {{paddingBottom: 60}} // allows user to be able to scroll past navbar so bottom row images arent obscured
                data = {petsList}
                keyExtractor = {item => item.id}
                numColumns = {3}
                style = {{paddingBottom: 60}}
                renderItem = {({item}) => {
                    return(
                        <Pressable 
                            style = {{        marginRight: ".5%", 
                            marginBottom: ".5%", 
                            aspectRatio: 1, 
                            width: "33%"}} 
                            onPress = {() => {
                                navigation.navigate("PublicImageViewer", {post: item})
                            }}    
                        >
                            <Image 
                                source = {{uri: item.image}} 
                                style = {{width: "100%", height: "100%"}}
                            />
                        </Pressable>
                    )}
                }
            />

            <View style = {GlobalStyles.navBarContainer}>
                <TabBar
                    screen = {"home"}
                    navigation = {navigation}
                />
            </View>

        </View>
    
    );
}

styles = StyleSheet.create({
    galleryImage: {
        marginRight: ".5%", 
        marginBottom: ".5%", 
        aspectRatio: 1, 
        width: "33%"
    },

});

export default FrontPage;
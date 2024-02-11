import { ScrollView, Pressable, Image } from "react-native";

const PhotoDisplayList = ({navigation, list, currentPet, type}) =>
{
    return ( // component for rendering all posts containing this specific pet
        <ScrollView horizontal = {true} style = {{backgroundColor: "white", display: "flex", flexDirection: "row"}}>
        {
            list.map((item) => 
                {
                    return (
                        <Pressable 
                            style = {{width: 50, height: 50}}
                            key = {item.id}
                            onPress = {() => 
                            {
                                if (type === "private") { // component is used on two screens - one accesses state the other accesses database
                                    navigation.navigate("PersonalImageViewer", 
                                    {postId: item.id, currentPet: currentPet});
                                } else {
                                    navigation.navigate("PublicImageViewer", // all shared images are visible on missing pet profiles
                                    {navigation: navigation, post: item})
                                }
                            }}
                        >
                            <Image 
                                source = {{uri: item.image}} 
                                style = {{height: "100%", width: "100%"}} 
                            />
                        </Pressable>
                    );
                })
        }
        </ScrollView>
    );
}

export default PhotoDisplayList;
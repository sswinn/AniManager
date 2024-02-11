import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, ToastAndroid, Pressable } from "react-native";
import { Camera } from "expo-camera";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";
import { auth } from "../firebase_setup/firebase";
import PostContext from "../contexts/PostContext";
import GlobalStyles from "../components/GlobalStyles";
import TabBar from "../components/TabBar";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

const CameraScreen = ({navigation}) => {

    const {addPost} = useContext(PostContext);

    const storage = getStorage();
    const metaData = { contentType: "image/jpeg", };

    const [hasPerms, setHasPerms] = useState(null);
    const getPerms = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPerms(status == "granted");
    };

    useEffect(() => {
        getPerms(); // get permissions on screen load
    }, []);

    if (hasPerms === null || hasPerms === false) {
        console.log("Unable to access camera");
    }

    const uploadImage = async (image, type) =>
    {
        try {
            let imgName = "petpfps/" + uuidv4() + ".jpg";
            const storageRef = ref(storage, imgName);

            let uri;
            if (type === "camera") uri = await fetch(image.uri);
            else uri = await fetch(image.assets[0].uri);

            const blob = await uri.blob();

            navigation.navigate("FrontPage");
            ToastAndroid.show("Your image will be visible on your profile page once it has finished uploading.", ToastAndroid.LONG);

            await uploadBytes(storageRef, blob, metaData)

            const imgRef = ref(storage, imgName);
            getDownloadURL(imgRef)
                .then((url) => {
                    addPost(
                        url,
                        "",
                        [],
                        false,
                        auth.currentUser.uid,
                    )
                });
        } catch (e) {console.log("Error uploading image")}
    }

    let camera;

    const getPic = async () => {
        if (camera) {
            const newPhoto = await camera.takePictureAsync({quality: 0.5});

            uploadImage(newPhoto, "camera");
        }
    }

    const pickImage = async () =>
    {
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!image.canceled) {
            uploadImage(image, "picker");
        }
    }

    return (
        <View style = {GlobalStyles.mainView}>
            <Camera style = {styles.subContainer} ref = {(ref) => { camera = ref }} >
                <View style = {styles.buttonContainer}>
                    <View></View>
                    <Button title = "Capture Image" onPress = {() => {
                        getPic();
                    }}/>
                    <Pressable 
                        onPress = {() => {
                            pickImage();
                        }}
                    >
                        <MaterialIcons
                            style = {{fontSize: 30, backgroundColor: "white"}}
                            name = {"add-photo-alternate"}
                            color = {"black"}
                        />
                    </Pressable>
                    
                </View>
            </Camera>

            <View style = {GlobalStyles.navBarContainer}>
                <TabBar
                    screen = {"camera"}
                    navigation = {navigation}
                />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        alignItems: "center",
        padding: 70,
        justifyContent: "flex-end"
    },
    buttonContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },  
    textStyle: {
        fontSize: 24,
        marginBottom: 15,
        color: "yellow",
        margin: 70,
        padding: 10,
        backgroundColor: "blue"
    }
});


export default CameraScreen;
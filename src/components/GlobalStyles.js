import { StyleSheet } from "react-native";

export default Styles = StyleSheet.create({
    mainView: {
        height: "100%"
    },
    itemContainer: {
        backgroundColor: "white",
        padding: 10,
        justifyContent: "space-evenly",
        //flex: 1,
        borderRadius: 10
    },
    navBarContainer: {
        position: "absolute", 
        bottom: 0, 
        width: "100%"
    },
    title: {
        //fontWeight: 600,
        fontSize: 20
    },
    subtitle: {
        //fontWeight: 400,
        fontSize: 18
    },
    bold: {
        fontWeight: "bold",
        fontSize: 15
    },
    textinput: {
        backgroundColor: "white",
        borderRadius: 5,
        padding: 5,
        borderColor: "darkgrey",
        borderWidth: 1
    },
    footerButton: {
        backgroundColor: "lightgrey", 
        height: 60, 
        justifyContent: "center"
    }
});

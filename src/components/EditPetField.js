import { TextInput, View, Text } from "react-native";
import GlobalStyles from "./GlobalStyles";

const EditPetField = ({stat, setStat, title}) =>
{
    return(
        <View>
            <Text style = {GlobalStyles.bold}>{title}</Text>
            <TextInput 
                style = {GlobalStyles.textinput}
                value = {stat}
                onChangeText = {(text) => {
                    setStat(text);
                }}
            />
        </View>
    )
}

export default EditPetField;
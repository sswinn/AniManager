import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const TypePicker = ({value, setValue}) =>
{ // custom Picker component with white background and constant picker items
    return ( // takes value and setValue from useState as props
        <View style = {{backgroundColor: "white"}}>
            <Picker
                prompt = ""
                selectedValue = {value}
                onValueChange = {(val) => {
                    setValue(val);
                }}
            >
                <Picker.Item label = "Not Assigned" value = "N/A"/>
                <Picker.Item label = "Cat" value = "Cat" />
                <Picker.Item label = "Dog" value = "Dog" />
                <Picker.Item label = "Rabbit" value = "Rabbit" />
                <Picker.Item label = "Poultry" value = "Poultry" />
                <Picker.Item label = "Horse" value = "Horse" />
                <Picker.Item label = "Fish" value = "Fish" />
                <Picker.Item label = "Parrot" value = "Parrot" />
                <Picker.Item label = "Ferret" value = "Ferret" />
                <Picker.Item label = "Rodent" value = "Rodent" />
                <Picker.Item label = "Reptile" value = "Reptile" />
                <Picker.Item label = "Amphibian" value = "Amphibian" />
                <Picker.Item label = "Insect" value = "Insect" />
                <Picker.Item label = "Arachnid" value = "Arachnid" />
                <Picker.Item label = "Mollusc" value = "Mollusc" />
                <Picker.Item label = "Lobster" value = "Lobster" />
                <Picker.Item label = "Bug" value = "Bug" />
                <Picker.Item label = "Farmyard" value = "Farmyard" />
                <Picker.Item label = "Other" value = "Other" />
            </Picker>
        </View>
    )
}

export default TypePicker;
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FrontPage from './src/screens/FrontPage';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import MyPets from './src/screens/MyPets';
import AddPet from './src/screens/AddPet';
import PetProfile from './src/screens/PetProfile';
import EditPet from './src/screens/EditPet';
import { PetProvider } from './src/contexts/PetContext';
import { PostProvider } from './src/contexts/PostContext';
import CameraScreen from './src/screens/Camera';
import PersonalImageViewer from './src/screens/PersonalImageViewer';
import PublicImageViewer from './src/screens/PublicImageViewer';
import Profile from './src/screens/Profile';
import { UserProvider } from './src/contexts/UserContext';
import MedicineSearch from './src/screens/MedicineSearch';
import Missing from './src/screens/Missing';
import ReportMissing from './src/screens/ReportMissing';
import MissingProfile from './src/screens/MissingProfile';
import PetFoodSearch from './src/screens/PetFoodSearch';


const Stack = createNativeStackNavigator();

const App = () =>
{
  return (
    /*<NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name = "FrontPage" component = {FrontPage} />
      </Tab.Navigator>
    </NavigationContainer>*/
    <PetProvider>
      <PostProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName = "SignIn" 
              screenOptions = {{animation: "none"}} 
            >
              <Stack.Screen name = "SignIn" component = {SignIn} options = {{title: "Sign In"}}/>
              <Stack.Screen name = "SignUp" component = {SignUp} options = {{title: "Sign Up"}}/>
              <Stack.Screen name = "FrontPage" component = {FrontPage} options = {{title: ""}}/>
              <Stack.Screen name = "MyPets" component = {MyPets} options = {{title: "My Pets"}}/>
              <Stack.Screen name = "PetProfile" component = {PetProfile} options = {{title: "My Pet Profile"}}/>
              <Stack.Screen name = "AddPet" component = {AddPet} options = {{title: "Add New Pet"}}/>
              <Stack.Screen name = "EditPet" component = {EditPet} options = {{title: ""}}/>
              <Stack.Screen name = "Camera" component = {CameraScreen} options = {{title: ""}}/>
              <Stack.Screen name = "PersonalImageViewer" component = {PersonalImageViewer} options = {{title: ""}}/>
              <Stack.Screen name = "PublicImageViewer" component = {PublicImageViewer} options = {{title: ""}}/>
              <Stack.Screen name = "Profile" component = {Profile} options = {{title: "My Profile"}}/>
              <Stack.Screen name = "MedicineSearch" component = {MedicineSearch} options = {{title: "Search Medication"}}/>
              <Stack.Screen name = "PetFoodSearch" component = {PetFoodSearch} options = {{title: "Search Pet Food"}}/>
              <Stack.Screen name = "Missing" component = {Missing} options = {{title: "Missing Pets"}}/>
              <Stack.Screen name = "ReportMissing" component = {ReportMissing} options = {{title: ""}}/>
              <Stack.Screen name = "MissingProfile" component = {MissingProfile} options = {{title: "Missing Pet"}}/>
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </PostProvider>
    </PetProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
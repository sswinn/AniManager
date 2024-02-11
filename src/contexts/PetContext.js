import { createContext, useReducer, useEffect } from "react";
import { getDocs, addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase_setup/firebase";

const PetContext = createContext();

const petsDb = collection(db, "pets");

let data = [];

const reducer = (state, action) =>
{
    switch (action.type) {
        case "addPetState":
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    age: action.payload.age,
                    weight: action.payload.weight,
                    type: action.payload.type,
                    breed_or_species: action.payload.breed_or_species,
                    food: action.payload.food,
                    medicine: action.payload.medicine,
                    userId: action.payload.userId,
                    pfp: action.payload.pfp,
                    missing: action.payload.missing
                }
            ];
        case "updatePetState":
            return state.map((pet) => {
                if (pet.id === action.payload.id) {
                    return action.payload;
                } else {
                    return pet;
                }
            });
        case "deletePetState":
            return state.filter((pet) => pet.id !== action.payload.id);
        default: 
            console.log("default");
            return state;
    }
}

export const PetProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, data);

    const getAllPets = async (callback) => {
        try {
            const petsData = await getDocs(petsDb);
            const filteredData = petsData.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            if (callback) callback(filteredData);
        } catch (e) {console.log("Error getting all pets")}
    } 

    const addPetState = (id, name, age, weight, type, breed_or_species, food, medicine, userId, pfp, missing, callback) => 
    {
        if ( !state.find((pet) => pet.id === id) ) // if pet is not already in state
        {
            dispatch({ type: "addPetState", 
                payload: { 
                    id, name, age, weight, type, breed_or_species, food, medicine, userId, pfp, missing // add pet info to state
                }
            });
        }
        if (callback) callback();
    }

    const updatePetState = (id, name, age, weight, type, breed_or_species, food, medicine, userId, pfp, missing, callback) =>
    {
        dispatch({ 
            type: "updatePetState", 
            payload: {
                id, name, age, weight, type, breed_or_species, food, medicine, userId, pfp, missing
            }
        });
        if (callback) callback();
    }

    const deletePetState = (id, callback) =>
    {
        dispatch({ type: "deletePetState", payload: {id} });
        if (callback) callback();
    }
    
    const addPet = async (name, userId, pfp, callback) => 
    {
        try {
            let idreturn;
            await addDoc(petsDb, { // adds pet to the database and the state
                name: name,
                age: "",
                weight: "",
                type: "",
                breed_or_species: "",
                food: [],
                medicine: [],
                userId: userId,
                pfp: pfp,
                missing: {isMissing: false, location: {}}
            })
            .then((docRef) => {
                idreturn = docRef.id;
            })
            addPetState(idreturn, name, "", "", "", "", [], [], userId, pfp, {isMissing: false, location: {}});
            if (callback) callback(idreturn); // initialises pet state with empty values
        } catch (e) {console.log("Error adding pet to database")}
    }
    
    const updatePet = async (id, name, age, weight, type, breed_or_species, food, medicine, userId, pfp, missing, callback) =>
    {
        try {
            const docToUpdate = doc(db, "pets", id) // updates the database and the state
            await updateDoc(docToUpdate, {
                name: name,
                age: age,
                weight: weight,
                type: type,
                breed_or_species: breed_or_species,
                food: food,
                medicine: medicine,
                userId: userId,
                pfp: pfp,
                missing: missing
            });
            updatePetState(id, name, age, weight, type, breed_or_species, food, medicine, userId, pfp, missing);
            if (callback) callback();
        } catch (e) {console.log("Error updating pet")}
    }

    const deletePet = async (id, callback) =>
    {
        try {
            const docToDelete = doc(db, "pets", id)
            await deleteDoc(docToDelete); // deletes from database and from state
            deletePetState(id);
            if (callback) callback();
        } catch (e) {console.log("Error deleting pet")}
    }

    const getUserPets = async (userId, callback) => {
        try {
            const petsData = await getDocs(petsDb);
            const filteredData = petsData.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            const userPets = filteredData.filter((pet) => pet.userId === userId);
            if (callback) callback(userPets);
        } catch (e) {console.log("Error getting user pets")}
    } 

    const getMissingPets = async (callback) => {
        try {
            const petsData = await getDocs(petsDb);
            const filteredData = petsData.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            const missingPets = filteredData.filter((pet) => pet.missing.isMissing === true); // filters pets by if isMissing is set to true
            if (callback) callback(missingPets);
        } catch (e) {console.log("Error getting missing pets")}
    }

    return (
        <PetContext.Provider
            value = {{
                petState: state,
                addPetState: addPetState,
                updatePetState: updatePetState,
                deletePetState: deletePetState,
                addPet: addPet,
                updatePet: updatePet,
                getAllPets: getAllPets,
                getUserPets: getUserPets,
                getMissingPets: getMissingPets,
                deletePet: deletePet,
            }}
        >
            {children}
        </PetContext.Provider>
    );

}

export default PetContext;
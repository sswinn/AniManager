import { createContext, useReducer, useEffect } from "react";
import { getDocs, addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase_setup/firebase";

const UserContext = createContext();

const profilesDb = collection(db, "profiles");

let data = [];

const reducer = (state, action) =>
{
    switch (action.type) {
        case "addProfileState":
            return [
                ...state,
                {
                    id: action.payload.id,
                    username: action.payload.username,
                    location: action.payload.location,
                    userId: action.payload.userId,
                }
            ];
        case "updateProfileState":
            return state.map((profile) => {
                if (profile.id === action.payload.id) {
                    return action.payload;
                } else {
                    return profile;
                }
            });
        case "deleteProfileState":
            return state.filter((profile) => profile.id !== action.payload.id);
        default: 
            console.log("default");
            return state;
    }
}


export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, data);

    const addProfileState = (id, username, location, userId, callback) =>
    {
        console.log("before if statement ",id);
        if ( !state.find((profile) => profile.id === id) ) // if user is not already in state
        {
            console.log(id);
            dispatch({ type: "addProfileState", 
                payload: { 
                    id, username, location, userId // add user info to state
                }
            });
        }
        if (callback) callback();
    }

    const updateProfileState = (id, username, location, userId, callback) =>
    {
        dispatch({ type: "updateProfileState",
            payload: {
                id, username, location, userId
            }
        });
        if (callback) callback();
    }

    const addProfile = async (username, location, userId, callback) =>
    {
        console.log(userId);
        let idreturn;
        await addDoc(profilesDb, {
            username: username,
            location: location,
            userId: userId,
        })
        .then((docRef) => {
            idreturn = docRef.id;
        })
        addProfileState(idreturn, username, location, userId);
        console.log(state);
        if (callback) callback(idreturn);
    }

    const updateProfile = async (id, username, location, userId, callback) =>
    {
        const docToUpdate = doc(db, "profiles", id)
        await updateDoc(docToUpdate, {
            username: username,
            location: location, 
            userId: userId,
        });
        updateProfileState(id, username, location, userId);
        if (callback) callback();
    }

    const getUserProfile = async (userId, callback) => {
        const profilesData = await getDocs(profilesDb);
        const filteredData = profilesData.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }));
        console.log("in context")
        console.log(userId)
        console.log(filteredData)
        const foundProfile = filteredData.find((profile) => profile.userId === userId);
        console.log(foundProfile)
        if (callback) callback(foundProfile);
    }

    const deleteProfileState = (id, callback) => {
        dispatch({ type: "deleteProfileState", payload: {id} });
        if (callback) callback();
    }

    return (
        <UserContext.Provider
            value = {{
                profileState: state,
                addProfile: addProfile,
                addProfileState: addProfileState,
                updateProfile: updateProfile,
                updateProfileState: updateProfileState,
                getUserProfile: getUserProfile,
                deleteProfileState: deleteProfileState,
            }}
        >
            {children}
        </UserContext.Provider>
    );

}

export default UserContext;
import { createContext, useReducer, useEffect } from "react";
import { getDocs, addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase_setup/firebase";

const PostContext = createContext();

const postsDb = collection(db, "posts");
const petsDb = collection(db, "pets");
const profilesDb = collection(db, "profiles");

let data = [];

const reducer = (state, action) =>
{
    switch (action.type) {
        case "addPostState":
            return [
                ...state,
                {
                    id: action.payload.id,
                    image: action.payload.image,
                    desc: action.payload.desc,
                    petsVisible: action.payload.petsVisible,
                    shared: action.payload.shared,
                    userId: action.payload.userId,
                }
            ];
        case "updatePostState":
            return state.map((post) => {
                if (post.id === action.payload.id) {
                    return action.payload;
                } else {
                    return post;
                }
            });
        case "deletePostState":
            return state.filter((post) => post.id !== action.payload.id);
        default: 
            console.log("default");
            return state;
    }
}

export const PostProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, data);

    const getUserPosts = async (userId, callback) => {
        try {
            const postData = await getDocs(postsDb);
            const filteredData = postData.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            const userPosts = filteredData.filter((post) => post.userId === userId);
            if (callback) callback(userPosts);
        } catch (e) {console.log("Error getting user posts")}
    } 

    const getSharedPosts = async (filter, callback) =>
    {
        try {
            const postData = await getDocs(postsDb);
            const filteredData = postData.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            let sharedPosts = filteredData.filter((post) => post.shared === true);
            if (filter.length > 0)
            {
                const petData = await getDocs(petsDb);
                const filteredPetData = petData.docs.map((doc) => ({
                    ...doc.data(), id: doc.id
                })); // because pet-post relations are done by pet ids I have to load the pets db to get pets by id for the filter

                const findPet = (id) =>
                {
                    let found = filteredPetData.find((pet) => pet.id === id);
                    if (found == undefined || found == null) found = {type: "noType"};
                    return found; // finds pet by id, if not found it returns object with a type attribute
                }

                sharedPosts = sharedPosts.filter((post) => post.petsVisible.find((pet) => findPet(pet).type === filter) !== undefined);
            }   // ^ filters all posts by looking through petsVisible array and getting pets by id and comparing their type to the filter
            if (callback) callback(sharedPosts);
        } catch (e) {console.log("Error getting shared posts")}
    }

    const addPostState = (id, image, desc, petsVisible, shared, userId, callback) => 
    {
        if ( !state.find((post) => post.id === id) ) // if post is not already in state
        {
            dispatch({ type: "addPostState", 
                payload: { 
                    id, image, desc, petsVisible, shared, userId // add post info to state
                }
            });
        }
        if (callback) callback();
    }

    const updatePostState = (id, image, desc, petsVisible, shared, userId, callback) =>
    {
        dispatch({ 
            type: "updatePostState", 
            payload: {
                id, image, desc, petsVisible, shared, userId
            }
        });
        if (callback) callback();
    }

    const deletePostState = (id, callback) =>
    {
        dispatch({ type: "deletePostState", payload: {id} });
        if (callback) callback();
    }

    const addPost = async (image, desc, petsVisible, shared, userId, callback) =>  // adds post to database and to state
    {
        try {
            let idreturn;
            await addDoc(postsDb, {
                image: image,
                desc: desc, 
                petsVisible: petsVisible,
                shared: shared,
                userId, userId,
            })
            .then((docRef) => {
                idreturn = docRef.id;
            })
            addPostState(idreturn, image, desc, petsVisible, shared, userId);
            if (callback) callback(idreturn);
        } catch (e) {console.log("Error adding post")}
    }
    
    const updatePost = async (id, image, desc, petsVisible, shared, userId, callback) => // updates post in database and state
    {
        try {
            const docToUpdate = doc(db, "posts", id)
            await updateDoc(docToUpdate, {
                image: image,
                desc: desc,
                petsVisible: petsVisible,
                shared: shared,
                userId: userId
            });
            updatePostState(id, image, desc, petsVisible, shared, userId);
            if (callback) callback();
        } catch (e) {console.log("Error updating post")}
    }

    const deletePost = async (id, callback) => // deletes post from database and state
    {
        try {
            const docToDelete = doc(db, "posts", id)
            await deleteDoc(docToDelete);
            deletePostState(id);
            if (callback) callback();
        } catch (e) {console.log("Error deleting post")}
    }

    const getPostsByPet = (pet) =>
    {
        try {
            const petPosts = state.filter((post) => 
                post.petsVisible.includes(pet.id) === true // filters posts by if pet is included in petsVisible array
            );
            return petPosts;
        } catch (e) {console.log("Error getting posts by pet")}
    }

    const getSharedPostsByPet = async (pet, callback) => // similar to the last function except only returns publicly shared posts
    {
        try {
            const postData = await getDocs(postsDb);
            const filteredData = postData.docs.map((doc) => ({ // so it must access the database
                ...doc.data(), id: doc.id
            }));
            const postsWithPets = filteredData.filter((post) => post.petsVisible.length > 0) // check to make sure the array isnt empty
            const sharedPosts = postsWithPets.filter((post) => post.petsVisible.includes(pet.id) === true);
            if (callback) callback(sharedPosts);
        } catch (e) {console.log("Error getting shared posts by pet")}
    }
    
    const getPostById = async (postId, callback) =>
    {
        try {
            const postData = await getDocs(postsDb);
            const filteredData = postData.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }));
            const post = filteredData.find(item => item.id === postId);
            if (callback) callback(post);
        } catch (e) {console.log("Error getting post by id")}
    }

    const getUsernameByPost = async (post, callback) =>
    {
        try {
            const profilesData = await getDocs(profilesDb);
            const filteredData = profilesData.docs.map((doc) => ({
                ...doc.data(), id: doc.id // get all records from profiles db 
            }));
            //console.log(filteredData);
            const profile = filteredData.find(user => user.userId === post.userId); // find if the userid and the current post's userid matches
            //console.log(profile);
            if (callback) callback(profile.username);
        } catch (e) {console.log("Error getting username by post")}
    }

    return (
        <PostContext.Provider
            value = {{
                postState: state,
                addPostState: addPostState,
                updatePostState: updatePostState,
                addPost: addPost,
                getPostsByPet: getPostsByPet,
                getSharedPostsByPet: getSharedPostsByPet,
                getUserPosts: getUserPosts,
                deletePostState: deletePostState,
                updatePost: updatePost,
                deletePost: deletePost,
                getSharedPosts: getSharedPosts,
                getPostById: getPostById,
                getUsernameByPost: getUsernameByPost,
            }}
        >
            {children}
        </PostContext.Provider>
    );

}

export default PostContext;
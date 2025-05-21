// import { database } from "@react-native-firebase/database";
import database from '@react-native-firebase/database';
export const addUserData = async (userData) => {
    try {
        const newRef = database().ref('/users').push();
        await newRef.set(userData);
        console.log('User Added Successfully!');

    } catch (error) {
        console.error('Error adding user data', error);
    }
}
export const getUsers = async () => {
    try {
        const snapShot = await database().ref('/users').once('value');
        const userData = snapShot.val() ? Object.entries(snapShot.val()).map(([id, data]) => ({ id, ...data })) : []
        console.log('Fetched users: ', userData);
        return userData;

    } catch (error) {
        console.error('Error fetching user data', error);
        // return [];
    }
}
export const updateUser = async (id, updatedData) => {
    try {
        await database().ref(`/users/${id}`).update(updatedData);
        console.log('User updated Successfully!');
        
    } catch (error) {
        console.error('Error updating user data', error);
    }
}
export const deleteUser = async (id) => {
    try {
        await database().ref(`/users/${id}`).remove();
        console.log('User Data deleted Successfully!');

    } catch (error) {
        console.error('Error deleting user data', error);
    }
}
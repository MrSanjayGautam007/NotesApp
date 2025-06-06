import firestore, { doc } from '@react-native-firebase/firestore'
export const addUserData = async (userData) => {
    try {
        await firestore().collection('users').add(userData);
        console.log('User Added Successfully!');
    } catch (error) {
        console.error('Error Adding user data');

    }
}
export const getUsers = async () => {
    try {
        const usersSnapShot = await firestore().collection('users').get();
        const users = usersSnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Fetched Users : ', users);
        return users;
    } catch (error) {
        console.error('Error fetching user data');
    }
}
export const updateUser = async (id, updatedData) => {
    try {
        await firestore().collection('users').doc(id).update(updatedData);
       
        console.log('User updated successfully');
        // return users;
    } catch (error) {
        console.error('Error updating user data',error);
    }
}
export const deleteUser = async (id) => {
    try {
        await firestore().collection('users').doc(id).delete();
        console.log('User deleted successfully');
        return id;
    } catch (error) {
        console.error('Error deleting user data',error);
    }
}
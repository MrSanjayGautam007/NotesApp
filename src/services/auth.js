import auth from "@react-native-firebase/auth";

export const registerUser = async (email, password) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password)
        await userCredential.user.sendEmailVerification();
        return userCredential.user;
    } catch (error) {
        // Handle known errors
        let errorMessage;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already in use. Please use a different email address';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address';
                break;

            case 'auth/weak-password':
                errorMessage = 'Password is too weak, Please use atleast 6 characters';
                break;

            default:
                errorMessage = 'An unknown error occured'
                break;
        }
        throw new Error(errorMessage);
    }
}
export const loginUser = async (email, password) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        return { user, emailVerified: user.emailVerified };
    } catch (error) {
        console.log('Error Object', error);
        let errorMessage;

        switch (error.code) {
            case 'auth/wrong-password':
                errorMessage = 'Incorrect Password';
                break;
            case 'auth/user-not-found':
                errorMessage = 'User Not Found';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid Email Format';
                break;
            default:
                errorMessage = 'An unknown error';
                break;
        }

        throw new Error(errorMessage);
        // throw new Error(`${errorMessage}: ${error.message || 'No additional details'}`);
    }
}
export const sendPasswordResetEmail = async (email) => {
    try {
        await auth().sendPasswordResetEmail(email);
    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'User doesnt exist';
                break;
            // case 'auth/wrong-password':
            //     errorMessage = 'Incorrect Password';
            //     break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid Email Format';
                break;
            default:
                errorMessage = 'An unknown error';
                break;
        }
        throw new Error(errorMessage);
    }
}
import { RefreshControl, Alert, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, StatusBar, useColorScheme, ScrollView, ActivityIndicator, useWindowDimensions,TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Button, IconButton, RadioButton,  } from 'react-native-paper';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import ImageComp from './ImageComp';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
// Get the screen width and height
// const { width, height } = Dimensions.get('window');

const NoteScreen = () => {
    const { width } = useWindowDimensions(); // Dynamically get width of the screen
    // for dark and light mode
    const isDarkMode = useColorScheme() === 'dark';
    //note
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [note, setNote] = useState('');
    const [noteList, setNoteList] = useState('');
    const [editedNote, setEditNote] = useState(null);
    const [showModal, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [date, setDate] = useState(new Date());
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    // console.log('Date',date.toISOString().split('T')[0]);
    const [pasteWord, setPasteWord] = useState('');
    // console.log('Dark',isDarkMode);
    // console.log('notelist' , noteList);
    //dark background
    const notesToShow = hasSearched ? filteredNotes : noteList;
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    useEffect(() => {
        loadNotes();

        pasteItem();
    }, []);
    const pasteItem = async () => {
        try {
            const getClipboard = await Clipboard.getString();
            // console.log('Pasted', getClipboard);
            setPasteWord(getClipboard);

        } catch (error) {
            
            console.log(error);
        }
    }
    const loadNotes = async () => {
        // setIsRefreshing(true)
        try {
            const storedNotes = await AsyncStorage.getItem('NoteList');
            if (storedNotes) {
                setNoteList(JSON.parse(storedNotes));
                setIsRefreshing(false);
            }
        } catch (error) {
            console.error('Error loading notes from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        const saveNotes = async () => {
            try {
                await AsyncStorage.setItem('NoteList', JSON.stringify(noteList));  // Save updated list
            } catch (error) {
                console.error('Error saving notes to AsyncStorage:', error);
            }
        };
        if (noteList.length > 0) {
            saveNotes();
        }
    }, [noteList]);
    const renderItem = ({ item, index }) => (
        <View style={{ flex: 1, width: width, alignItems: "center" }}>
            <View style={styles.listBox}>
                <Text style={{
                    fontSize: 25,
                    marginLeft: 10,
                }}>
                    {index + 1}.
                </Text>
                <Text style={styles.title} >
                    {item.title}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleCopy(item.title)}
                    style={styles.icons}>

                    <MaterialIcons name="content-copy" size={27} color="#6A6BBF" />

                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleEditNote(item)}
                    style={styles.icons}>

                    <EvilIcons name="pencil" size={32} color="#000" />

                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => handleDeleteNote(item.id, item.title)} style={styles.icons}>

                    <EvilIcons name="trash" size={32} color="red" />
                </TouchableOpacity>

            </View>
        </View>

    );
    const onRefresh = () => {
        loadNotes();
    };

    const handleSearch = () => {
        if (!note.trim()) {
            setModalShow(true)
        }
        const filtered = noteList.filter((note) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNotes(filtered);
        setHasSearched(true);
     
    };


    const handleCopy = (copy) => {
        Clipboard.setString(copy)
        pasteItem();
    }
    const handleAddNote = () => {
        if (!note) {
            setModalShow(true); // Alert Messege
            return;
        }
        else {
            setNoteList([...noteList, {
                id: Date.now(),
                // id: noteList.length + 1, // for serial number
                title: note,
                created_date: date.toISOString().split('T')[0],
            }]);

            setNote('');
            setLoading(false);
            Alert.alert('Success', `Note "${note}" added.`);
        }

    };
    const handleDeleteNote = async (id, title) => {
        const updatedNoteList = noteList.filter((note) => note.id !== id);
        setNoteList(updatedNoteList);  // Update state with the new list

        if (updatedNoteList.length === 0) {
            // If the list is empty, clear AsyncStorage
            try {
                await AsyncStorage.setItem('NoteList', JSON.stringify([]));
                Alert.alert('Success', 'All notes deleted!');
                setIsEditing(false);
                setNote('');
            } catch (error) {
                console.error('Error clearing AsyncStorage:', error);
                Alert.alert('Error', 'Failed to clear tasks');
            }
        } else {

            AsyncStorage.setItem('NoteList', JSON.stringify(updatedNoteList));
            Alert.alert('Success', `Note '${title}' Deleted`);
        }
    };
    const handleEditNote = (note) => {
        setIsEditing(true);
        setEditNote(note);
        setNote(note.title);

    }
    const handleUpdateNote = () => {
        if (!note) {
            setModalShow(true);
            return;
        }
        //else block
        const updatedNote = noteList.map((item) => {
            if (item.id === editedNote.id) {
                return {
                    ...item, title: note
                };
            }
            else {
                return item;
            }
        });
        setNoteList(updatedNote);
        setEditNote(null);
        setIsEditing(false);
        setNote('');
        setHasSearched(false)
        // Alert.alert('Success', 'Note Updated');
        Alert.alert('Success', `"${note}" has been updated.`);

    }
    const handleTextFill = (text) => {
        setNote(text);
        setSearchQuery(text)
        if (text.trim() === '') {
            // Reset filteredNotes when input is cleared
            setFilteredNotes([]);
            setHasSearched(false); // Reset to show full list
        }

    }
    const handleClear = () => {
        setNote('')
        setHasSearched(false)
    }
    return (
        <SafeAreaView style={[styles.mainView, { backgroundColor: isDarkMode ? '#3F4F44' : '#fff', }]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={isDarkMode ? '#3F4F44' : '#fff'}
            />

            <View style={styles.noteTitle}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: "500",
                    color: isDarkMode ? '#E0E0E0' : 'black',

                }}>Notes App</Text>
            </View>

            {/* Modal Dialog View */}
            <Modal transparent={true}
                visible={showModal}
                animationType="fade"
                hardwareAccelerated={true}
                statusBarTranslucent={true}
                presentationStyle="overFullScreen"
                onRequestClose={() => setModalShow(false)}
            >

                <View style={styles.centerView}>
                    <View style={[styles.modalView, { backgroundColor: isDarkMode ? '#3F4F44' : '#fff' }]}>
                        <Text style={[styles.modalText, { color: isDarkMode ? '#fff' : 'black' }]}>Messege</Text>
                        <Text style={[styles.modalText, { color: isDarkMode ? '#fff' : 'black', fontSize: 15 }]}>Please Enter Something</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setModalShow(false)}  >
                            <Text style={{
                                alignSelf: 'flex-end',
                                marginTop: 5,
                                color: isDarkMode ? '#E0E0E0' : 'black'
                            }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={[styles.inputView, { backgroundColor: '#fff', }]}
            >
                <TextInput 
                style={styles.textInput}
              
                    placeholder='Enter your note here...'
                    placeholderTextColor={"black"}
                    value={note}
                    onChangeText={(userText) => handleTextFill(userText)}
                />
                {
                    note ? (<TouchableOpacity
                        activeOpacity={0.5}
                        onPress={handleClear}
                        style={styles.searchIcon}
                    >
                        <Feather name="x" size={28} color="#000" />
                    </TouchableOpacity>) : (
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setNote(pasteWord)}
                            style={styles.searchIcon}
                        >
                            <MaterialIcons name="content-paste" size={23} color="#000" />
                        </TouchableOpacity>
                    )

                }
                {
                    !isEditing && (<TouchableOpacity
                        onPress={handleSearch}
                        style={styles.searchIcon}
                    >
                        <AntDesign name="search1" size={25} color="#000" />
                    </TouchableOpacity>)
                }


            </View>
            {
                note ? (<TouchableOpacity
                    activeOpacity={0.8}

                    style={[styles.touchView, { backgroundColor: 'skyblue' }]}
                    onPress={isEditing ? handleUpdateNote : handleAddNote}
                >
                    <Text
                        style={{
                            fontWeight: "500",
                        }}>
                        {isEditing ? 'Save Task' : 'Add Todo'}
                    </Text>

                </TouchableOpacity>) : (<TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.touchView}
                    onPress={isEditing ? handleUpdateNote : handleAddNote}
                >

                    <Text
                        style={{
                            fontWeight: "500",

                        }}>
                        {isEditing ? 'Save Note' : 'Add Note'}

                    </Text>

                </TouchableOpacity>)
            }
            {
                isEditing && (<TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setIsEditing(false) || handleClear()}
                    style={[styles.touchView, { padding: 5, marginBottom: 10, elevation: 5, }]}
                >
                    <Text
                        style={{
                            color: "blue"
                        }}
                    >Cancle</Text>
                </TouchableOpacity>)
            }
            {/* Display data */}

            <View style={{ flex: 1 }}>
                {
                    noteList.length <= 0 ? <ImageComp color={(isDarkMode)} /> : <FlatList
                        data={notesToShow}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}

                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={onRefresh}

                            />
                        }
                        ListEmptyComponent={(
                            <Text style={{ fontSize: 20, fontWeight: '500', fontStyle: "italic" }}>Nothing Matched with {searchQuery}</Text>
                        )

                        }
                    />
                }
            </View>

        </SafeAreaView>

    )
}

export default NoteScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",

    },
    inputView: {
        borderWidth: 0.4,
        borderColor: "red",
        borderRadius: 20,
        // backgroundColor: "white",
        elevation: 10,
        height: 50,
        width: "90%",
        // margin: 10,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center"

    },
    textInput: {
        marginLeft: 15,
        fontSize: 15,
        marginVertical: 5,
        color: "black",
        fontWeight: "500",
        flex: 1,
       
     

    },
    touchView: {
        backgroundColor: "#fff",
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        // for android
        elevation: 20,
        // for ios
        shadowColor: '#000', // Set shadow color (e.g., black)
        shadowOffset: { width: 0, height: 4 }, // Set the shadow's offset
        shadowOpacity: 0.3, // Set the opacity of the shadow
        shadowRadius: 6, // Set the blur radius of the shadow
        marginBottom: 10,
        marginTop: 15,
    },
    listBox: {
        borderBottomColor: "red",
        borderWidth: 0.4,
        flexDirection: "row",
        margin: 5,
        borderRadius: 10,
        backgroundColor: "white",
        elevation: 10,
        alignItems: "center",
        padding: 5,
        marginBottom: 10,
        width: '90%',
        marginTop: 10,

    },
    title: {
        flex: 1,
        fontWeight: "500",
        fontSize: 20,
        color: 'gray',
        // marginBottom: 20,
        margin: 5,
        marginLeft: 10,
        // textAlign: "center",
    },
    icons: {
        // padding:2,
        height: 30,
        width: 30,
        // marginLeft: 10,
        // backgroundColor: "#fff",
        borderRadius: 20,
        // elevation: 5,
        marginRight: 5,


    },
    iconsText: {
        textAlign: "center",
        fontSize: 20,

    },

    //Modal Style 
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: "white",
        padding: 20,
        height: 150,
        width: '70%',
        borderRadius: 10,
        shadowColor: "#000",
        // For android
        elevation: 10,
        //for ios
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        // alignItems:"center",
        justifyContent: "space-between"

    },
    modalText: {
        fontSize: 18,
        // marginBottom: 57,
    },
    noteTitle: {
        padding: 20
    },
    searchIcon: {
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 10
    }
})
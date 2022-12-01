import React, { useState } from 'react';
import {Text,TextInput, View, Pressable, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

import { openDatabase} from "react-native-sqlite-storage"

//use the hook to create database
const myRemindersDB = openDatabase({name: 'MyReminders.db'});
const remindersTableName = 'reminders';
const reminderPrioritiesTableName = 'reminder_priorities';


const ExistingRemindersScreen = props => {

        const post = props.route.params.post;

        const [title, setTitle] = useState(post.title);
        const [description, setDescription] = useState(post.description);
        const [date, setDate] = useState(post.date);

        const navigation = useNavigation();

        const onReminderUpdate = () => {//Validation //declaring a function
                if(!title) {
                        alert( 'Please enter a title.');
                        return;
                }
                if(!description) {
                        alert('Please enter a description.');
                        return;
                }
                if(!date) {
                        alert('Please enter a date in format YYYT-MM-DD!');
                        return;
                } 
                
                myRemindersDB.transaction(txn => {
                        txn.executeSql(
                                `UPDATE ${remindersTableName} SET name = '${title}', store = '${description}', date = '${date}' WHERE id = ${post.id}`,
                                [],
                                () => {
                                        console.log(`${title} updated successfully`);
                                },
                                error => {
                                        console.log('Error on updating reminders' + error.message);
                                }
                        );
                });

                alert(title + ' updated!');
                navigation.navigate('Get Reminders!');
        }
        

                const onReminderDelete = () => {
                        return Alert.alert(
                          //title
                          'Confirm',
                          //message
                          'Are you sure you want to delete this Reminder?',
                          //buttons
                          [
                                {
                                        text: 'Yes',
                                        onPress: () => {
                                                myRemindersDB.transaction(txn => {
                                                        txn.executeSql(
                                                                `DELETE FROM ${remindersTableName} WHERE id = ${post.id}`,
                                                                [],
                                                                () => {
                                                                        console.log(`${title} deleted  
                                                                        successfully`);
                                                                },
                                                                error => {
                                                                        console.log('Error on deleting reminders' + error.message);
                                                                }
                                                        );
                                                });
                                                myRemindersDB.transaction(txn => {
                                                        txn.executeSql(
                                                                `DELETE FROM ${reminderPrioritiesTableName} WHERE reminder_id = ${post.id}`,
                                                                [],
                                                                () => {
                                                                        console.log('Reminder priority deleted successfully.');
                                                                },
                                                                error => {
                                                                        console.log('Error on deleting reminder priority' + error.message);
                                                                }
                                                        );
                                                });
                                                alert('Reminder Deleted!');
                                                navigation.navigate('Get Reminders!');
                                                
                                        }
                                },
                                {
                                        text: 'No',
                                }
                          ],
                        );
                }

const onAddPriority = () => {
        navigation.navigate('Add Reminder Priority', {post: post});
}


  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
        <TextInput
                        value={title}
                        onChangeText={value => setTitle(value)}
                        style={styles.title}
                        clearButtonMode={'while-editing'}
                        placeholder={'Enter Reminder Name'}
                        placeholderTextColor={'grey'}
                />
                <TextInput  
                        value={description}
                        onChangeText={value => setDescription(value)}
                        style={styles.description}
                        clearButtonMode={'while-editing'}
                        placeholder={'Enter Description'}
                        placeholderTextColor={'grey'}
                />
                <TextInput  
                        value={date}
                        onChangeText={value => setDate(value)}
                        style={styles.date}
                        clearButtonMode={'while-editing'}
                        placeholder={'Enter Date in format YYYY-MM-DD'}
                        placeholderTextColor={'grey'}
                />
        </View>
        <View style={styles.bottomContainer}>
        <Pressable style={styles.updateButton} onPress={onReminderUpdate}> 
                        <Text style={styles.buttonText}>Update</Text>
                </Pressable>
                <Pressable style={styles.deleteButton} onPress={onReminderDelete}> 
                        <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
                <Pressable style={styles.addButton} onPress={onAddPriority}> 
                        <Text style={styles.buttonText}>Add Priority</Text>
                </Pressable>
                </View>
    </View>
  );
};

export default ExistingRemindersScreen;
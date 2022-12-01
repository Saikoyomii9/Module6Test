import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/Home';
import TabNavigator from './TabNavigator';
import AddReminder from '../screens/AddReminder';
import AddPriority from '../screens/AddPriority';
import ExistingRemindersScreen from '../screens/ExistingReminder';

const Stack = createStackNavigator();

const Router = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name={'Get Reminders!'} component={TabNavigator}/>
        <Stack.Screen name={'Add Reminder'} component={AddReminder}/>
        <Stack.Screen name={'Add Priority'} component={AddPriority}/>
        <Stack.Screen name={'Existing Reminder'} component={ExistingRemindersScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
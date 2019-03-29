import React, { Component, ScrollView } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Text
} from 'react-native';
import {NavigationActions} from 'react-navigation'

export default class DrawerCoponent extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                <ImageBackground source={require('../images/logo.png')} style={{flex: 1, width: 120, justifyContent: 'center'}} >
                    <Text style={styles.headerText}>Header Portion</Text>
                    <Text style={styles.headerText}>You can display here logo or profile image</Text>
                </ImageBackground>
            </View>
            <View style={styles.screenContainer}>
                <View style={styles.screenStyle}>
                    <Text onPress={this.navigateToScreen('Tab')}>Screen A</Text>
                </View>
                <View style={styles.screenStyle}>
                    <Text onPress={this.navigateToScreen('Me')}>Screen B</Text>
                </View>
            </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    headerContainer: {
        height: 150,
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
        paddingTop: 20
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20
    },

});
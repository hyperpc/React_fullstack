import  React from 'react';
import { StyleSheet, View } from 'react-native';

export function FlexboxDemo1() {
    return (
        <View style={styles.container}>
            <View style={styles.box} />
            <View style={styles.box} />
            <View style={styles.box} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //flexDirection:'column',
        //justifyContent:'flex-start'
        //justifyContent:'center'
        //justifyContent:'flex-end'
        //justifyContent:'space-around'
        //justifyContent:'space-between'
        justifyContent:'space-evenly'
    },
    box:{
        height:50,
        width:50,
        backgroundColor:'#e76e63',
        margin:10
    }
});

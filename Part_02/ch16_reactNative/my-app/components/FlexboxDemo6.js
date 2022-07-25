import  React from 'react';
import { StyleSheet, View } from 'react-native';

export function FlexboxDemo6() {
    return (
        <View style={styles.container}>
            <View style={[styles.box, {flex:1}]} />
            <View style={[styles.box, {flex:2}]} />
            <View style={[styles.box, {flex:1}]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    box:{
        height:50,
        width:50,
        backgroundColor:'#e76e63',
        margin:10
    }
});

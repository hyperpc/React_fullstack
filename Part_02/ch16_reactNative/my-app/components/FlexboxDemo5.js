import  React from 'react';
import { StyleSheet, View } from 'react-native';

export function FlexboxDemo5() {
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
        flexDirection:'row',
        alignItems:'stretch'
    },
    box:{
        //height:50,
        width:50,
        backgroundColor:'#e76e63',
        margin:10
    }
});

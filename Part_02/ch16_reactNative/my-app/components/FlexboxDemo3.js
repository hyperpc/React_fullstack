import  React from 'react';
import { StyleSheet, View } from 'react-native';

export function FlexboxDemo3() {
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
        //alignItems:'flex-start'
        //alignItems:'center'
        //alignItems:'flex-end'
        //alignItems:'stretch'
        alignItems:'baseline'
    },
    box:{
        height:50,
        width:50,
        backgroundColor:'#e76e63',
        margin:10
    }
});

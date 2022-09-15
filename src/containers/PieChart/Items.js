import React from 'react';
import { View, Text } from 'react-native';
import ProgressBar from "react-native-animated-progress";
import numeral from 'numeral';

function Items(props) {
    const { item } = props;
    return (
        <View>
            {item && item.serviceName && item.color && item.y ?
                <View style={{ paddingHorizontal: 14 }}>
                    <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, color: 'grey' }}>{item.serviceName}</Text>
                        <Text style={{ fontSize: 12 }}>{item.x}</Text>
                    </View>
                    <View style={{
                        borderColor: 'white', borderWidth: 2,
                        borderRadius: 6, shadowColor: 'grey',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        elevation: 5,
                    }} >
                        <ProgressBar progress={item.y} height={5} backgroundColor={item.color} trackColor='white' />
                    </View>
                    <View height={20} />
                </View>
                : null}
        </View>
    );
}
export default Items;
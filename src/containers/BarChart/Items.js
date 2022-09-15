import React from 'react';
import { View, } from 'react-native';
import { VictoryChart, VictoryArea, VictoryTheme } from 'victory-native';
import { Defs, LinearGradient, Stop } from "react-native-svg";

function Items(props) {
    const { data } = props;
    return (
        <View style={{ bottom: 18, justifyContent: 'center', alignContent: 'center', paddingHorizontal: 10 }}>
            <VictoryChart
                theme={VictoryTheme.material}
                padding={{ left: 75, top: 50, right: 50, bottom: 50 }}
            >
                <Defs>
                    <LinearGradient id="gradientStroke" x1="0%" y1="100%" x2="0%" y2="0%">
                        <Stop offset="0%" stopColor="white" />
                        <Stop offset="100%" stopColor={'orange'} />
                    </LinearGradient>
                </Defs>
                <VictoryArea
                    interpolation="natural"
                    style={{ data: { fill: 'url(#gradientStroke)' } }}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    data={data}
                />
            </VictoryChart>
        </View>
    );
}
export default Items;

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import numeral from 'numeral';
import { VictoryPie } from 'victory-native';
import Items from './Items';
import Svg from 'react-native-svg';
import axios from 'axios';

const data = [
    {
        serviceName: "Kotlin",
        x: "27%",
        color: "#F77676",
        y: 27,
        id: "1"
    },
    {
        serviceName: "JavaScript",
        x: "41%",
        color: "#00cc00",
        y: 41,
        id: "2"
    },
    {
        serviceName: "AWS",
        x: "5%",
        color: "#6600ff",
        y: 5,
        id: "3"
    },
    {
        serviceName: "Java",
        x: "10%",
        color: "#7DD9F7",
        y: 10,
        id: "4"
    },
    {
        serviceName: "React",
        x: "19%",
        color: "#FBA642",
        y: 19,
        id: "5"
    },
    {
        serviceName: "C#",
        x: "25%",
        color: "#FDDE72",
        y: 25,
        id: "6"
    },
    {
        serviceName: "Swift",
        x: "31%",
        color: "#F45BA4",
        y: 31,
        id: "7"
    },
];

function PieChart(props) {
    const [graphicData, setGraphicData] = useState();
    const [switchBack, setSwitchBack] = useState(false);
    const [totalAmount, setTotalAmount] = useState('1000');
    const [sliceColor, setSliceColor] = useState(["#D9D9D9"]);

    useEffect(() => {
        fetchAPI(switchBack);
    }, []);

    const fetchAPI = (backOrNext) => {
        axios({
            method: 'get',
            url: 'https://63219b4282f8687273b51b7b.mockapi.io/sample/piechart/pieChart',
        }).then((response) => {
            if (response?.data) {
                if (backOrNext) {
                    setGraphicData(response.data);
                }
                else {
                    setGraphicData(data);
                }
                let color = [];
                response.data.forEach(i => {
                    color.push(i.color)
                });
                setSliceColor(color);
            } else {
                setGraphicData(data);
                let color = [];
                data.forEach(i => {
                    color.push(i.color)
                });
                setSliceColor(color);
            }
        }).catch(err => {
            setGraphicData(null);
            setSliceColor(null);
        });
    }

    const nextAndBack = () => {
        setSwitchBack(!switchBack);
        fetchAPI(!switchBack);
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text style={{ color: 'red', paddingHorizontal: 15 }}>Click Switch Arrow button for next data</Text>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}
                    >
                        <View
                            style={{
                                width: '61%'
                            }}
                        >
                            <Svg style={{ zIndex: 1 }}>
                                <VictoryPie
                                    animate={{ easing: 'exp', duration: 200 }}
                                    data={graphicData && Array.isArray(graphicData) && graphicData.length > 0 ? graphicData : [{ y: 100 }]}
                                    width={250}
                                    height={250}
                                    colorScale={sliceColor.length > 0 ? sliceColor : ["#D9D9D9"]}
                                    innerRadius={52}
                                    labelRadius={({ innerRadius }) => innerRadius + 30}
                                    style={{
                                        labels: {
                                            fontSize: 8
                                        },
                                        data: {
                                            stroke: "white", strokeWidth: 1
                                        }
                                    }}
                                />
                            </Svg>

                            <View style={{
                                position: 'absolute',
                                zIndex: 2, elevation: 1, marginVertical: 76, marginHorizontal: 75,
                                color: 'grey', fontSize: 12, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <TouchableOpacity onPress={nextAndBack} style={{
                                    width: 100, height: 100, justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Text style={{
                                        color: 'grey', fontSize: 12
                                    }}>{switchBack ? 'Back' : 'Next'}</Text>
                                    <View style={{
                                        flexDirection: 'row', marginVertical: 12
                                    }}>
                                        <Text style={{
                                            color: 'black',
                                            fontWeight: 'bold',
                                            fontSize: 15, textAlign: 'center'
                                        }}>{numeral(totalAmount).format('0,0')}{' '}
                                            <Text style={{ fontSize: 9, textAlign: 'center' }}>$</Text>
                                        </Text></View>
                                    <Image source={require('../../assets/images/Switch.png')} resizeMode='contain' style={{ width: 15, height: 15 }} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <View
                        style={{
                            borderRadius: 6, shadowColor: 'grey',
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                            borderWidth: 0.2,
                            elevation: 5,
                            borderColor: 'grey', marginHorizontal: 15, backgroundColor: 'white',
                            flex: 1
                        }}
                    >
                        <Text style={{ paddingHorizontal: 14, paddingVertical: 15, fontSize: 16, fontWeight: 'bold' }}>Programming Language List</Text>
                        {graphicData && Array.isArray(graphicData) && graphicData.length > 0 ?
                            <FlatList
                                data={graphicData && Array.isArray(graphicData) && graphicData.length > 0 ? graphicData : []}
                                renderItem={({ item }) => (
                                    <Items item={item} progressBar={true} />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={[]}
                            /> :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }}>
                                <Text style={{ fontSize: 13, color: 'grey', textAlign: 'center', marginBottom: 40 }}>No Data Available</Text>
                            </View>
                        }
                    </View>
                    <View height={20} />
                </View>
            </ScrollView>
        </View>
    );
}

export default PieChart;
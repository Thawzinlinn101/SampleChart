import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import numeral from 'numeral';
import LinearGradient from "react-native-linear-gradient";
import axios from 'axios';
import Items from './Items';

const data = [
    {
        x: 1,
        y: 10
    },
    {
        x: 2,
        y: 30
    },
    {
        x: 3,
        y: 20
    },
    {
        x: 4,
        y: 50
    },
    {
        x: 5,
        y: 40
    },
    {
        x: 6,
        y: 70
    },
    {
        x: 7,
        y: 60
    },
    {
        x: 8,
        y: 90
    },
    {
        x: 9,
        y: 80
    },
    {
        x: 10,
        y: 120
    },
    {
        x: 11,
        y: 100
    },
    {
        x: 12,
        y: 300
    }
];

function BarChart(props) {
    const [graphicData, setGraphicData] = useState();
    const [primitiveLanguage, setPrimitiveLanguage] = useState('0');
    const [scriptLanguage, setScriptLanguage] = useState('0');
    const [totalUsage, setTotalUsage] = useState('0');
    const [switchData, setSwitchData] = useState(true);

    useEffect(() => {
        fetchAPI(switchData);
        setGraphicData(data);
    }, []);

    const fetchAPI = (dataSwitch) => {
        axios({
            method: 'get',
            url: 'https://63219b4282f8687273b51b7b.mockapi.io/sample/piechart/barChart',
        }).then((response) => {
            if (response?.data) {
                if (dataSwitch) {
                    setGraphicData(response.data);
                }
                else {
                    setGraphicData(data);
                }
            } else {
                setGraphicData(data);
            }
        }).catch(err => {
            setGraphicData(null);
        });

        axios({
            method: 'get',
            url: 'https://63219b4282f8687273b51b7b.mockapi.io/sample/piechart/total',
        }).then((response) => {
            if (response?.data) {
                if (dataSwitch) {
                    setPrimitiveLanguage(response.data[0].primitiveLanguage);
                    setScriptLanguage(response.data[0].scriptLanguage);
                    setTotalUsage(response.data[0].total);
                }
                else {
                    setPrimitiveLanguage(response.data[1].primitiveLanguage);
                    setScriptLanguage(response.data[1].scriptLanguage);
                    setTotalUsage(response.data[1].total);
                }
            } else {
                setPrimitiveLanguage(0);
                setScriptLanguage(0);
                setTotalUsage(0);
            }
        }).catch(err => {
            setPrimitiveLanguage(0);
            setScriptLanguage(0);
            setTotalUsage(0);
        });
    }

    const nextData = () => {
        setSwitchData(!switchData);
        fetchAPI(!switchData);
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <View
                        style={{ flexDirection: 'row', padding: 10, justifyContent: 'center', marginHorizontal: 5 }}
                    >
                        <View style={{ width: '50%' }}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.0 }}
                                end={{ x: 0.0, y: 1.0 }}
                                colors={['rgb(238, 136, 194)', 'rgb(253, 240, 248)']}
                                style={{
                                    borderRadius: 4, justifyContent: 'center', shadowColor: 'black',
                                    shadowOpacity: 0.5, borderColor: 'grey', borderWidth: 0.5,
                                    shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, padding: 5, marginVertical: 13,
                                    elevation: 2
                                }}
                            >
                                <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 5 }}>Primitive Language</Text>
                                <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, paddingVertical: 5 }}>{numeral(primitiveLanguage).format('0,0')}{' '}<Text style={{ fontSize: 12 }}>%</Text></Text>
                            </LinearGradient>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.0 }}
                                end={{ x: 0.0, y: 1.0 }}
                                colors={['rgb(232, 157, 145)', 'rgb(255, 247, 234)']}
                                style={{
                                    borderRadius: 4, justifyContent: 'center', shadowColor: 'black',
                                    shadowOpacity: 0.5, borderColor: 'grey', borderWidth: 0.5,
                                    shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, padding: 5,
                                    elevation: 2,
                                }}>
                                <Text style={{ color: 'white', textAlign: 'center', paddingVertical: 5 }}>Script Language</Text>
                                <Text style={{ color: 'black', textAlign: 'center', fontSize: 18, paddingVertical: 5 }}>{numeral(scriptLanguage).format('0,0')}{' '}<Text style={{ fontSize: 12 }}>%</Text></Text>
                            </LinearGradient>
                        </View>
                        <View style={{
                            borderRadius: 4, justifyContent: 'center', shadowColor: 'black',
                            shadowOpacity: 0.5, borderColor: 'grey', borderWidth: 0.5, backgroundColor: 'orange',
                            shadowOffset: { width: 0, height: 1 }, shadowRadius: 2, padding: 15,
                            elevation: 2, width: '46%', marginTop: 13, marginLeft: 13, opacity: 0.7
                        }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Total</Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, paddingTop: 5 }}>{numeral(totalUsage).format('0,0')}{' '}<Text style={{ fontSize: 12 }}>%</Text></Text>
                        </View>
                    </View>
                    {graphicData && Array.isArray(graphicData) && graphicData.length > 0 ?
                        <View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: 'grey', paddingHorizontal: 15, paddingVertical: 15, fontSize: 21, fontWeight: '500' }}>Total Usage</Text>
                                <Text style={{ color: 'black', paddingHorizontal: 15, fontSize: 21, fontWeight: '500' }}>
                                    {numeral(totalUsage).format('0,0')}{' '}<Text style={{ fontSize: 14 }}>%</Text></Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Items data={graphicData} />
                                <Text style={{ color: 'grey', fontSize: 16, justifyContent: 'center', alignItems: 'center', bottom: 20, textAlign: 'center' }}>Language</Text>
                                <TouchableOpacity onPress={nextData}>
                                    <Text style={{ color: 'red', paddingHorizontal: 15 }}>Click to see next data</Text>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }}>
                            <Text style={{ fontSize: 13, color: 'grey', textAlign: 'center', marginBottom: 40 }}>No Data Available</Text>
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
}

export default BarChart;
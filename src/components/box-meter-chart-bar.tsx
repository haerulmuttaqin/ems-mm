import React, {useEffect, useRef} from "react";
import {optionBar} from "../../app/utils/optionBar";
import {meterGroupService} from "@Services/meterGroupService";
import {Box, useColorModeValue} from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import moment from "moment";
import variableChartHourly from "app-config/variable-chart-hourly.json"
import configChart from "app-config/option-chart.json"
import {padDigits} from "../../app/utils/utils";

const BoxMeterBarChart = ({data}) => {
    const eChartsRef = useRef() as any

    optionBar.series = [] as any
    optionBar.series.length = 0
    optionBar.xAxis[0].data = [] as any
    optionBar.xAxis[0].data.length = 0
    variableChartHourly.map((data, index) => {
        const seriesConfig = {
            name: data?.label,
            type: data?.type,
            showSymbol: true,
            showAllSymbol: true,
            label: {
                position: 'top',
                show: data?.showValue,
                formatter: function (params) {
                    return padDigits(params?.value)
                }
            },
            itemStyle: {
                borderRadius: [4, 4, 0, 0],
            },
            data: [],
        }
        optionBar.series.push(seriesConfig)
    })
    optionBar.series.length = variableChartHourly.length
    optionBar.title.text = `${configChart.filter((it) => it.key == 'chart-2')?.[0]?.title}`

    useEffect(() => {
        meterGroupService.fetchAllMeterCounterLiveByMeterID(data?.id).then((res) => {
            if (eChartsRef && eChartsRef.current) {
                res?.data?.forEach(item => {
                    variableChartHourly.map((itemVariable, index) => {
                        optionBar.series[index]?.data.push(item?.[`${itemVariable.key}`] || 0)
                        optionBar.xAxis[index]?.data.push(item?.date_time)
                    })
                })
                optionBar.title.subtext = moment(res?.data?.[0].date_time).format('YYYY-MM-DD HH:mm:ss') + " — " + moment(res?.data?.[res?.data?.length - 1].date_time).format('YYYY-MM-DD HH:mm:ss')
                eChartsRef.current?.getEchartsInstance().setOption(optionBar, true);
            }
        })
    }, [])
    return (
        <Box
            // borderRadius={'lg'}
            mr={2}
            p={4}
            // bg={useColorModeValue('white', 'gray.800')}
            backdropFilter="auto" backdropBlur="4px"
            className={'gradient-border'}
            boxShadow={'sm'}
            // minH={'44vh'}
            h={'100%'}
            borderWidth={1}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
            <ReactECharts
                option={optionBar}
                ref={eChartsRef}
                style={{minHeight: "40vh", width: "100%"}}
                notMerge={true}
                lazyUpdate={true}
                theme={useColorModeValue("mylight", "mydark")}
            />

        </Box>
    )
}
export default BoxMeterBarChart
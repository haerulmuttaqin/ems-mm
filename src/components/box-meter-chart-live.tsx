import React, {useEffect, useRef} from "react";
import {meterGroupService} from "@Services/meterGroupService";
import {optionChart} from "../../app/utils/optionChart";
import {Box, useColorModeValue} from "@chakra-ui/react";
import moment from "moment/moment";
import ReactECharts from "echarts-for-react";
import variableChartRealtime from "app-config/variable-chart-realtime.json"
import configChart from "app-config/option-chart.json"
import {endLabelConfig} from "../../app/utils/optionEndLabel";
import {padDigits} from "../../app/utils/utils";

const BoxMeterChartLive = ({data}) => {
    const eChartsRef = useRef() as any
    let {
        data: meterData,
        isLoading,
        refetch,
        status,
        error
    } = meterGroupService.fetchMeterCounterLiveByMeterIDuseQuery(data?.id)
    if (meterData == undefined) {
        meterData = data
        optionChart.series = []  as any
        variableChartRealtime.map((data, index) => {
            const endLabel =
            {
                endLabel: {
                    show: data?.endLabel,
                    backgroundColor: useColorModeValue('#d9dce3', '#333e50'),
                    ...endLabelConfig
                },
            }
            const seriesConfig = {
                name: data?.label,
                type: data?.type,
                showSymbol: true,
                showAllSymbol: true,
                label: {
                    position: 'top',
                    show: data?.showValue,
                    formatter: function (params) {
                        return padDigits(params?.value?.[1])
                    }
                },
                itemStyle: {
                    borderRadius: [4, 4, 0, 0],
                },
                data: [],
               ...endLabel
            }
            optionChart.series.push(seriesConfig)
        })
        optionChart.series.length = variableChartRealtime.length
        optionChart.title.text = `${configChart.filter((it) => it.key == 'chart-1')?.[0].title}`
        optionChart.xAxis.data = []
        optionChart.xAxis.data.length = 0
    }
    useEffect(() => {

        const time = setInterval(() => {
            interValLiveData(meterData)
        }, 1000)
        return () => clearTimeout(time)

    }, [meterData])

    const interValLiveData = async (meterData) => {
        const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        let dataSeries = [] as any
        let xAxisCurrent = optionChart.xAxis.data as any
        variableChartRealtime.map((itemVariable, index) => {
            dataSeries = optionChart.series?.[index]?.data as any
            dataSeries.push(
                {
                    name: currentDate,
                    value: [
                        currentDate,
                        meterData?.[`${itemVariable.key}`]
                    ]
                }
            )
        })
        xAxisCurrent.push(currentDate)
        optionChart.title.subtext = "Updated at " + moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        optionChart.xAxis.data = xAxisCurrent
        eChartsRef.current?.getEchartsInstance().setOption(optionChart, true);
    }

    return (
        <Box
            // borderRadius={'lg'}
            mr={2}
            p={4}
            // bg={useColorModeValue('white', 'gray.800')}
            backdropFilter="auto" backdropBlur="4px"
            className={'gradient-border'}
            boxShadow={'sm'}
            // minH={'40vh'}
            h={'100%'}
            borderWidth={1}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
            <ReactECharts
                option={optionChart}
                ref={eChartsRef}
                style={{minHeight: "38vh", width: "100%"}}
                notMerge={true}
                lazyUpdate={true}
                theme={useColorModeValue("mylight", "mydark")}
            />

        </Box>
    )
}
export default BoxMeterChartLive
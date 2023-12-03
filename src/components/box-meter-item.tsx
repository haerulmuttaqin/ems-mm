import {useRecoilState} from "recoil";
import {meterPositionState} from "@State";
import React, {useEffect, useState} from "react";
import {timeout} from "../../app/utils/utils";
import {Col, Container, Row} from "react-grid-system";
import {Box, Center, Progress, useColorModeValue} from "@chakra-ui/react";
import BoxMeterChartLive from "./box-meter-chart-live";
import BoxMeterBarChart from "./box-meter-chart-bar";
import BoxMeterVariableLive from "./box-meter-variable-live";
import appConfig from "app-config/app-config.json"

const intervalSize = appConfig?.pageTimeout + 1000
const BoxMeterItem = ({data, setHeaderData}) => {
    let [position, setPosition] = useRecoilState(meterPositionState) as any
    const {data: meterData} = data?.data
    const groupData = data?.group

    const [componentChartLive, setComponentChartLive] = useState() as any
    const [componentBar, setComponentBar] = useState() as any
    const [componentTableLive, setComponentTableLive] = useState() as any

    useEffect(() => {
        setupIntervalMeter(position, meterData, groupData)
    }, [])

    const setupIntervalMeter = async (position, meterData, groupData) => {
        const meter = meterData[position - 1]
        setHeaderData({
            title: meter?.id,
            desc: `${groupData.metergroupname} — ${position} of ${meterData?.length}`
        })

        setComponentChartLive(
            <BoxMeterChartLive data={meter} key={position}/>
        )
        setComponentBar(
            <BoxMeterBarChart data={meter} key={position}/>
        )
        setComponentTableLive(
            <BoxMeterVariableLive data={meter} key={position}/>
        )

        setPosition(position++)
        await timeout(intervalSize);
        if (position <= meterData?.length) {
            setComponentChartLive(null)
            setComponentTableLive(null)
            await setupIntervalMeter(position, meterData, groupData)
        } else {
            setPosition(1)
        }
    }

    return (
        <Box
            h={'88vh'}
        >
            <Container fluid>
                {
                    componentChartLive ?
                        <Row>
                            <Col sm={8} style={{padding: 0}}>
                                <Row>
                                    <Col sm={12} style={{marginBottom: 20}}>
                                        {
                                            componentChartLive
                                        }
                                    </Col>
                                    <Col sm={12}>
                                        {
                                            componentBar
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={4} style={{padding: 0}}>
                                {
                                    componentTableLive
                                }
                            </Col>
                        </Row>
                        :
                        <Center h={'80vh'}>
                            <Box w={230} m='auto'>
                                <Progress colorScheme={useColorModeValue('main', 'gray')} size='xs'
                                          bg={useColorModeValue('gray.300', 'gray.600')}
                                          isIndeterminate
                                          borderRadius={10}/>
                            </Box>
                        </Center>
                }
            </Container>
        </Box>

    )
}
export default BoxMeterItem
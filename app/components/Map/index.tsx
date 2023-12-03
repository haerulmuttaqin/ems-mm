import React, {useCallback, useEffect, useRef, useState} from 'react';
import ReactMapGL, {Layer, Popup, Source} from 'react-map-gl';
import {Box, Button, Divider, Text} from '@chakra-ui/react';
import {Link} from '@Components/Link';

interface PopupInfo {
    lngLat: [number, number];
    text: string;
}

const Map = ({ children }) => {
    const MAP_STYLE: any = "mapbox://styles/mapbox/streets-v9"
    const [nodes, setNodes] = useState() as any
    const [loading, setLoading] = useState(true)
    const [cursor, setCursor] = useState('default') as any[];
    const [interactiveLayerIds, setInteractiveLayerIds] = useState<string[]>(['node-id']);
    const [viewport, setViewport] = useState({
        longitude: 124.838805,
        latitude: 1.478906,
        zoom: 13,
        // transitionInterpolator: new FlyToInterpolator(),
        // transitionEasing: null
    })
    const mapRef: any = useRef(null);

    useEffect(() => {




        setViewport({
            longitude: 124.838805,
            latitude: 1.478906,
            zoom: 12,
            // transitionInterpolator: new FlyToInterpolator(),
            // transitionEasing: null
        })

    }, [])

    const [popupInfo, setPopupInfo] = useState(null) as any;

    const handleMapClick = useCallback(event => {
        const features = event.features || [];
        console.log(event.features);

        if (features.length > 0) {
            try {
                setPopupInfo({
                    lngLat: features[0].geometry.coordinates,
                    data: features[0].properties,
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, [])

    const onInteractiveLayersChange = useCallback(layerFilter => {
        setInteractiveLayerIds(MAP_STYLE.layers.map(layer => layer.id).filter(layerFilter));
    }, []);

    const onMouseEnter = useCallback(() => {
        setCursor('pointer')
    }, []);
    const onMouseLeave = useCallback(() => setCursor('default'), []);

    const getCursor = () => {
        return cursor
    }

    return (
        <ReactMapGL
            mapStyle={MAP_STYLE}
            mapboxApiAccessToken={`${process.env.mapboxApiKey}`}
            onViewportChange={setViewport}
            attributionControl={true}
            width="100%"
            height="700px"
            onClick={handleMapClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            getCursor={getCursor}
            interactiveLayerIds={interactiveLayerIds}
            ref={mapRef}
            container={mapRef.current}
            {...viewport}
        >
            <Box rounded={'lg'}>{children}</Box>
            {
                !loading ?
                    <>
                        <Source id="node-source" type="geojson" data={nodes} >
                            <Layer
                                id="node-id"
                                type="circle"
                                source="node-source"
                                paint={
                                    {
                                        'circle-radius': {
                                            'base': 2,
                                            'stops': [[12, 5], [22, 200]]
                                        },
                                        'circle-color': ['get', 'fill'],
                                        'circle-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.6],
                                        'circle-stroke-width': 1,
                                        'circle-stroke-color': ['get', 'outline'],
                                    }
                                } />

                        </Source>
                    </>
                    : null
            }
            {popupInfo && (
                <Popup
                    tipSize={5}
                    longitude={popupInfo.lngLat[0]}
                    latitude={popupInfo.lngLat[1]}
                    onClose={setPopupInfo}
                    closeButton={true}
                >
                    <Box px={2}>
                        <b>{popupInfo.data.locationCode}</b>
                        <Divider mb={2} />
                        <Text fontSize={'sm'}>
                            {popupInfo.data.locationName}
                        </Text>
                        {`Status: ${popupInfo.data.status}`}
                        <br /> 
                        <Link href={`/datalist/${popupInfo.data.dataSid}`}>
                            <Button mt={2} size="sm">Customer Detail</Button>
                        </Link>
                    </Box>
                </Popup>
            )}
        </ReactMapGL>
    );
}

export default Map;

import * as React from 'react';
import {useCallback, useState} from 'react';
import ReactMapGL, {GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
import Pin from '@Components/Map/Pin';
import {
    Button,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Tooltip
} from '@chakra-ui/react';
import {FaMapPin} from 'react-icons/fa';

const TOKEN = `${process.env.mapboxApiKey}`; // Set your mapbox token here

const navStyle = {
    position: 'absolute',
    top: 40,
    left: 0,
    padding: '10px'
} as any;

const geolocateControlStyle = {
    left: 10,
    top: 10
} as any;

const iconButtonStyle = {
    left: 8,
    top: 150
} as any;

export default function MapPicker({ params }) {
    const [longitude, setLongitude] = useState(params.longitude)
    const [latitude, setLatitude] = useState(params.latitude)
    const [longitudeUserLocation, setLongitudeUserLocation] = useState()
    const [latitudeUserLocation, setLatitudeUserLocation] = useState()
    const [viewport, setViewport] = useState({
        latitude: params.latitude,
        longitude: params.longitude,
        zoom: 15,
        bearing: 0,
        pitch: 0
    });
    const [marker, setMarker] = useState({
        latitude: params.latitude,
        longitude: params.longitude,
    });
    const [events, logEvents] = useState({});

    const onMarkerDragStart = useCallback(event => {
        logEvents(_events => ({ ..._events, onDragStart: event.lngLat }));
    }, []);

    const onMarkerDrag = useCallback(event => {
        logEvents(_events => ({ ..._events, onDrag: event.lngLat }));
    }, []);

    const onMarkerDragEnd = useCallback(event => {
        logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
        setMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
        setLongitude(event.lngLat[0])
        setLatitude(event.lngLat[1])
    }, []);

    const setToCurrentLocation = () => {
        setMarker({
            longitude: longitudeUserLocation,
            latitude: latitudeUserLocation
        });
        setLongitude(longitudeUserLocation)
        setLatitude(latitudeUserLocation)
    }

    const locationContolHandler = (e) => {
        console.log(e);
        
        setLongitudeUserLocation(e.coords.longitude)
        setLatitudeUserLocation(e.coords.latitude)

        if (longitude == 0) {
            // setMarker({
            //     longitude: longitudeUserLocation,
            //     latitude: latitudeUserLocation
            // });
        }
    }

    return (
        <>
            <Modal size={'xl'} closeOnOverlayClick={false} isOpen={params.isOpenCoordinatesChange} onClose={params.onCloseCoordinatesChange}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Coordinates</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={params.handleSubmitCoordinatesChange}>
                        <ModalBody pb={6}>

                            <ReactMapGL
                                {...viewport}
                                width="100h"
                                height="300px"
                                onViewportChange={setViewport}
                                mapStyle={`${process.env.apiUrl}/maps/styles`}
                                mapboxApiAccessToken={TOKEN}
                            >
                                <GeolocateControl
                                    style={geolocateControlStyle}
                                    // positionOptions={{ enableHighAccuracy: true }}
                                    trackUserLocation={true}
                                    fitBoundsOptions={{maxZoom: 14}}
                                    onGeolocate={locationContolHandler}
                                    auto
                                />
                                <Tooltip hasArrow label='Set to current location'>
                                    <IconButton colorScheme={'blue'} onClick={()=>setToCurrentLocation()} style={iconButtonStyle} aria-label="" size="sm" icon={<FaMapPin />} />
                                </Tooltip>
                                <Marker
                                    longitude={marker.longitude}
                                    latitude={marker.latitude}
                                    offsetTop={-35}
                                    offsetLeft={-25}
                                    draggable
                                    onDragStart={onMarkerDragStart}
                                    onDrag={onMarkerDrag}
                                    onDragEnd={onMarkerDragEnd}
                                >
                                    <Pin size={20} />
                                </Marker>

                                <div className="nav" style={navStyle}>
                                    <NavigationControl />
                                </div>
                            </ReactMapGL>

                            <SimpleGrid columns={2} spacing={2} mt={2}>
                                <Input required name="latitude" type="text" placeholder="Latitude" value={latitude} />
                                <Input required name="longitude" type="text" placeholder="Longitude" value={longitude} />
                            </SimpleGrid>

                        </ModalBody>


                        <ModalFooter>
                            <Button isTruncated colorScheme="main" mr={3} type="submit">
                                Set Coordinates
                            </Button>
                            <Button onClick={params.onCloseCoordinatesChange}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
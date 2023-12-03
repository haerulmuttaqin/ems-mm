import React from 'react';
import dynamic from 'next/dynamic';
// import LocationPicker from 'react-location-picker';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid
} from '@chakra-ui/react';

const LocationPicker = dynamic(() => import('react-location-picker'), {
    ssr: false,
});


export default function NodeLocationPicker({ params }) {
    const [address, setAddress] = React.useState('')
    const [longitude, setLongitude] = React.useState(params.longitude)
    const [latitude, setLatitude] = React.useState(params.latitude)

    const handleLocationChange = ({ position, address, places }) => {

        // Set new location
        setAddress(address)
        setLongitude(position.longitude)
        setLatitude(position.latitude)
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

                            {/* <LocationPicker
                                containerElement={<div style={{ height: '100%' }} />}
                                mapElement={<div style={{ height: '400px' }} />}
                                defaultPosition={{lat: latitude, lng: longitude}}
                                onChange={handleLocationChange}
                            /> */}

                            <SimpleGrid columns={2} spacing={2} mt={2}>
                                <Input required name="longitude" type="text" placeholder="Longitude" value={longitude} />
                                <Input required name="latitude" type="text" placeholder="Latitude" value={latitude} />
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

            {/* <ControlPanel events={events} /> */}
        </>
    );
}
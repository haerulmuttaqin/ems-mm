import {ArrowBackIcon} from '@chakra-ui/icons';
import {Box, Button, Heading, Text} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';

export default function Error({ params }) {

    const router = useRouter();

    return (
        <Box textAlign="center" py={20} px={6}>
            <Box display="inline-block">
                {params.icon}
            </Box>
            <Heading as="h4" mt={4} mb={2}>
                {params.title}
            </Heading>
            <Text color={'gray.500'} mb={6}>
                Something went wrong...
                <br />
                {params.message}
            </Text>

            <Button
                onClick={() => router.push('')}
                leftIcon={<ArrowBackIcon />}
                colorScheme="gray"
                variant="solid">
                Back
            </Button>
        </Box>
    );
}
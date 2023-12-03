import {
    AlertDialog as AlrDial,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react";
import React from "react";

export default function AlertDialog(isOpen: any, cancelRef: any, onClose: any, process: HTMLButtonElement): 
JSX.Element {
    return (
        <AlrDial
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent mx={8} >
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Log Out Application
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure want to log out?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={()=>process} ml={3}>
                            Log out
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlrDial>
    )
}
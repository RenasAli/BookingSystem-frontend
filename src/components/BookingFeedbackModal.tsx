import {Text,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Card, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

interface BookingFeedbackModalProps{
    status: string,
}

const BookingFeedbackModal = ({status}: BookingFeedbackModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        if(status){
            onOpen()
        }
    },);

    const onCloseHandle = ()=> {
        searchParams.delete("status");
        setSearchParams(searchParams);
        onClose();
    }



  return (
    <Modal isOpen={isOpen} onClose={onCloseHandle}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader></ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      {status === "success" ?
        <Card align='center' shadow='none'>
            <FaCalendarCheck size={200} color="#2dd4bf" /> 
            <Text mt={5}>Tak! Din booking er blevet bekræftet.</Text>

        </Card>
        : status === "cancel" ?
        <Card align='center' shadow='none'>
            <FaCalendarTimes size={200} color="#ef4444" /> 
            <Text mt={5}>Noget gik galt, og din booking blev ikke gemt.<br/>
            Prøv igen eller kontakt salonen, hvis problemet fortsætter.</Text>

        </Card>
        : ""}
      </ModalBody>

      <ModalFooter>
        <Button colorScheme='teal' mr={3} onClick={onCloseHandle}>
          Luk
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>

  )
}

export default BookingFeedbackModal

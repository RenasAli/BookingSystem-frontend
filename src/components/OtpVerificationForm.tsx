import { useState } from "react";
import { useCreateMutation } from "../hooks/useCreateMutation";
import { Input, Button, Text, VStack } from "@chakra-ui/react";
import BookingFeedbackModal from "../components/BookingFeedbackModal";

interface OtpVerificationFormProps {
  bookingId: number;
  companyId: number;
  phoneNumber: string;
  status?: string;
  onOtpVerified: () => void;
}

const OtpVerificationForm = ({
  bookingId,
  companyId,
  phoneNumber,
  status,
  onOtpVerified,
}: OtpVerificationFormProps) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const createBookingMutation = useCreateMutation({
    endpoint: "booking/verify-booking",
    method: "POST",
    onSuccess: async () => {
      console.log("Booking verified successfully!");
      setMessage("✅ Booking confirmed!");
      onOtpVerified();
    },
    onError: () => {
      setMessage("❌ Verification failed. Please try again.");
    },
  });

  const handleVerify = async () => {
    if (!code) {
      setMessage("❌ Please enter the code.");
      return;
    }

    setIsVerifying(true);
    setMessage("");

    try {
      console.log("Payload:", {
        bookingId,
        companyId,
        phoneNumber,
        code,
      });
  
      const res = await createBookingMutation.mutateAsync({
        bookingId,
        companyId,
        phoneNumber,
        code,
      });
  
      if (res.data?.success) {
        setMessage("✅ Booking confirmed!");
        onOtpVerified();
      } else {
        setMessage("❌ Verification failed. Please try again.");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "❌ Incorrect code");
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <VStack spacing={4} mt={6}>
      <Text>Enter the code sent to {phoneNumber}</Text>
      <Input
        type="text"
        placeholder="Enter code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxW="200px"
      />
      <Button
        onClick={handleVerify}
        isLoading={isVerifying}
        colorScheme="blue"
        isDisabled={!code}
      >
        Verify Booking
      </Button>
      {message && <Text>{message}</Text>}
      {status && (status === "success" || status === "cancel") && (
        <BookingFeedbackModal status={status} />
      )}
    </VStack>
  );
};

export default OtpVerificationForm;
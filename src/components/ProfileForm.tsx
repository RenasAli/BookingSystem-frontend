import { Box, Button, FormControl, FormLabel, Heading, Input, SimpleGrid } from "@chakra-ui/react"
import Staff from "../types/Staff"
import { useCreateMutation } from "../hooks/useCreateMutation";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateProfile } from "../types/UpdateProfile";
import { useState } from "react";

interface ProfileFormProps {
    staff: Staff
}
const ProfileForm = ({staff}: ProfileFormProps) => {
    const queryClient = useQueryClient();
    const [newStaff, setNewStaff] = useState<UpdateProfile>();
    const [staffData, setStaffData] = useState<Staff>(staff);

    const updateMutation = useCreateMutation<UpdateProfile>({ endpoint: `staff/update/profile`, method: "PUT", onSuccess: async() => {
        await queryClient.invalidateQueries({queryKey: ['staff']});
        await queryClient.refetchQueries({ queryKey: ["staff",] });
        setNewStaff(undefined);
    }});

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();      
        if (newStaff) {
        updateMutation.mutate(newStaff);
        }
    }
    const onChange = (field: keyof UpdateProfile, value: string)=> {
        setStaffData((prev) => ({ ...prev, [field]: value } as Staff));
        setNewStaff((prev) => ({ ...prev, [field]: value } as UpdateProfile));
        

    }
  return (
    <Box mx="auto" px={4} py={8}>
        <form onSubmit={onSubmit}>
            <Box
                mb={5}
                p={4}
                borderWidth="1px"
                borderRadius="md"
            >
                <Heading mb={6} fontSize="3xl">Din Info</Heading>
                <SimpleGrid columns={[1, null, 2]} spacing={8} >
                   <FormControl>
                        <FormLabel>Navn</FormLabel>
                        <Input
                            type="text"
                            data-cy="profile-name"
                            value={staffData.name ?? ""}
                            onChange={(e) => onChange("name", e.target.value)}
                        />
                    </FormControl> 
                   <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            data-cy="profile-email"
                            value={staffData.email ?? ""}
                            onChange={(e) => onChange("email", e.target.value)}
                        />
                    </FormControl> 
                   <FormControl>
                        <FormLabel>Mobile</FormLabel>
                        <Input
                            type="number"
                            data-cy="profile-phone"
                            value={staffData.phone ?? ""}
                            onChange={(e) => onChange("phone", e.target.value)}
                        />
                    </FormControl> 
                </SimpleGrid>
                <Button data-cy="save-button" variant="primary" type="submit" mt={5}>
                    Gem
                </Button>
            </Box>
        </form>
    </Box>
  )
}

export default ProfileForm

import { Field, Input, Flex, Text, Button } from "@chakra-ui/react"
import { Link } from 'react-router'
import { useState } from "react"
import { LuArrowLeft } from "react-icons/lu"
import { useNavigate } from 'react-router'

function NewItemForm() {
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")

    const navigate = useNavigate()
    
    return (
        <Flex flexDirection="column" justifyContent={'flex-start'}>
            <Flex width={200} paddingBottom={'100px'}>
                <Button colorPalette="black" variant={'subtle'} onClick={() => navigate('/')}>
                    <LuArrowLeft /> Back to Home 
                </Button>
            </Flex>
            <Flex width={500} flexDirection="column" justifyContent={'center'} alignItems={'center'} paddingBottom={'100px'}>
                <Text marginBottom={25} fontSize={36}>Add a New Item</Text>
                <Field.Root paddingBottom={'10px'}>
                    <Field.Label>Item Name</Field.Label>
                    <Input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" />
                </Field.Root>

                <Field.Root paddingBottom={'10px'}>
                    <Field.Label>Item Description</Field.Label>
                    <Input value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} placeholder="Item Description" />
                </Field.Root>
            </Flex>
        </Flex>
    );
}

export default NewItemForm

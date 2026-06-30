import {Field, Input, Flex, Text, Select, Button, NumberInput, InputGroup, Portal, createListCollection} from "@chakra-ui/react"
import { Link } from 'react-router'
import { useState } from "react"
import { LuArrowLeft, LuDollarSign } from "react-icons/lu"
import { useNavigate } from 'react-router'
import {toast, ToastContainer} from "react-toastify";
import {usePostItem} from "../hooks/items";

function NewItemForm() {
    const onToast = (msg) => {
        toast(msg)
    }
    
    const [itemName, setItemName] = useState("")
    const [itemDescription, setItemDescription] = useState("")
    const [category, setCategory] = useState([])
    const [price, setPrice] = useState('')
    const [priceAsNumber, setPriceAsNumber] = useState(0)
    const [postItem] = usePostItem(itemName, itemDescription, category, priceAsNumber, onToast)

    const navigate = useNavigate()

    const categories = createListCollection({
        items: [
            { label: "Food", value: "food" },
            { label: "Tech", value: "tech" },
            { label: "Clothing", value: "clothing" },
            { label: "Books", value: "books" },
        ],
    })

    const onSubmitNewItem = (e) => {
        e.preventDefault()
        postItem(itemName, itemDescription, category, priceAsNumber)
    }
    
    return (
        <Flex flexDirection="column" justifyContent={'flex-start'}>
            <ToastContainer theme={"dark"} closeOnClick={true}/>
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

                <Flex width={500}>
                    <Field.Root>
                        <Field.Label>Item Price</Field.Label>
                    <NumberInput.Root
                        value={price}
                        onValueChange={(details) => setPrice(details.value)}
                    >
                        <InputGroup startElement={<LuDollarSign />}>
                            <NumberInput.Input />
                        </InputGroup>
                        <NumberInput.Context>
                            {(context) => {
                                if (isNaN(context.valueAsNumber)) {
                                    setPriceAsNumber(0)
                                } else {
                                    setPriceAsNumber(context.valueAsNumber)
                                }
                            }}
                        </NumberInput.Context>
                    </NumberInput.Root>
                    </Field.Root>
                </Flex>
                <Select.Root
                    collection={categories}
                    marginTop={3}
                    value={category}
                    onValueChange={(e) => setCategory(e.value)}
                >
                    <Select.HiddenSelect />
                    <Select.Label>Item category</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select category" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {categories.items.map((c) => (
                                    <Select.Item item={c} key={c.value}>
                                        {c.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                <Button marginTop={6} onClick={e => onSubmitNewItem(e)}>Submit</Button>
            </Flex>
        </Flex>
    );
}

export default NewItemForm

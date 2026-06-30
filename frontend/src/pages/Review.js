import {Field, Input, Flex, Text, Button, Select, Portal, createListCollection} from "@chakra-ui/react"
import {LuArrowLeft} from "react-icons/lu";
import {useState} from "react";
import {useNavigate} from "react-router";


function Review() {
    const navigate = useNavigate()

    const itemID = localStorage.getItem('itemID')
    const itemName = localStorage.getItem('itemName')
    const itemDescription = localStorage.getItem('itemDescription')

    const [reviewContent, setReviewContent] = useState('')
    const [reviewLevel, setReviewLevel] = useState('')

    const reviewLevels = createListCollection({
        items: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
        ],
    })
    
    return (
        <Flex flexDirection="column" justifyContent={'flex-start'}>
            <Flex width={200} paddingBottom={'100px'}>
                <Button colorPalette="black" variant={'subtle'} onClick={() => navigate('/')}>
                    <LuArrowLeft /> Back to Home
                </Button>
            </Flex>
            <Flex width={500} flexDirection="column" justifyContent={'center'} alignItems={'center'} paddingBottom={'100px'}>
                <Text marginBottom={25} fontSize={36}>Reviewing Item: {itemName}</Text>

                <Select.Root
                    collection={reviewLevels}
                    marginTop={3}
                    value={reviewLevel}
                    onValueChange={(e) => setReviewLevel(e.value)}
                >
                    <Select.HiddenSelect />
                    <Select.Label>Quality of the item</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Review" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {reviewLevels.items.map((l) => (
                                    <Select.Item item={l} key={l.value}>
                                        {l.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
                
                <Field.Root paddingBottom={'10px'}>
                    <Field.Label>Review</Field.Label>
                    <Input value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} placeholder="Leave your review description here!" />
                </Field.Root>
            </Flex>
        </Flex>
    );
}

export default Review

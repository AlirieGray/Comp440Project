// libraries
import {
    Button,
    Combobox,
    createListCollection,
    Flex,
    Input,
    InputGroup,
    Portal,
    ScrollArea,
    Select
} from "@chakra-ui/react"
import {LuCirclePlus, LuSearch} from "react-icons/lu"
import {useNavigate} from "react-router";

function SearchBar() {
    const categories = [
        {
            value: "Category One",
            label: "Category One"
        },
        {
            value: "Category One",
            label: "Category One"
        },
    ]

    const navigate = useNavigate()

    const handleClickNewItem = (e) => {
        e.preventDefault()
        navigate('/new-item')
    }

    return (
        <Flex padding={'10px'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <InputGroup startElement={<LuSearch />}>
                <Input placeholder="Search for an item" />
            </InputGroup>
            <Flex justifyContent={'flex-end'} width={'180px'}>
                <Select.Root size={'md'} collection={createListCollection({items: categories})}>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Category" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content backgroundColor={'white'}>
                                {categories.map((c) => (
                                    <Select.Item item={c} key={c.value} >
                                        {c.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </Flex>
            <Button marginLeft={'10px'} colorPalette="green" variant="solid" onClick={e => handleClickNewItem(e)}>
                Add an Item <LuCirclePlus />
            </Button>
        </Flex>
    )
}

export default SearchBar
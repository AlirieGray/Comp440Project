// libraries
import {
    Button,
    Combobox,
    createListCollection,
    Flex,
    Input,
    InputGroup,
    Group,
    Portal,
    ScrollArea,
    Select
} from "@chakra-ui/react"
import { useState } from "react"
import {LuCirclePlus, LuSearch} from "react-icons/lu"
import {useNavigate} from "react-router";

function SearchBar({onSearch}) {
    const [category, setCategory] = useState("")

    const navigate = useNavigate()

    const handleClickNewItem = (e) => {
        e.preventDefault()
        navigate('/new-item')
    }

    const search = (e) => {
        e.preventDefault()
        onSearch(category)
    }

    return (
        <Flex padding={'10px'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Group startElement={<LuSearch />} attached w="full" maxW="sm">
                <Input width={500} placeholder="Search for an item by category" value={category} onChange={e => {setCategory(e.target.value)} } />
                <Button bg="bg.subtle" variant="outline" onClick={(e) => search(e)}>
                    Search
                </Button>
            </Group>
            <Button marginLeft={'10px'} colorPalette="green" variant="solid" onClick={e => handleClickNewItem(e)}>
                Add an Item <LuCirclePlus />
            </Button>
        </Flex>
    )
}

export default SearchBar
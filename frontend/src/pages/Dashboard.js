import {Field, Button, Flex, Text, Grid, GridItem} from "@chakra-ui/react"
import { LuCirclePlus } from "react-icons/lu"
import { useNavigate } from 'react-router'
import SearchBar from '../components/SearchBar'
import ItemCard from "../components/ItemCard";
import {useEffect, useState} from "react";
import {useGetItems} from "../hooks/items";

function Dashboard() {
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const phone = localStorage.getItem('phone')
    const email = localStorage.getItem('email')
    const [category, setCategory] = useState("")
    const {items, getItems} = useGetItems(category)
    
    const onSearch = (searchTerm) => {
        setCategory(searchTerm)
        getItems()
    }
    
    //useEffect(() => {getItems()}, [])
    
    return (
        <Flex flexDirection="column" justifyContent={'center'} alignItems={'center'} paddingBottom={'100px'}>
            <Flex width={500} flexDirection="column" justifyContent={'center'} alignItems={'center'}>
                <Text>{`Welcome, ${firstName} ${lastName}`}</Text>
                <Text>{`My Profile: `}</Text>
                <Text>{`Phone: ${phone}`}</Text>
                <Text>{`Email: ${email}`}</Text>
            </Flex>
            <SearchBar onSearch={onSearch} />
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
                {items && items.map((item) => {
                    return (
                        <GridItem>
                            <ItemCard name={item.name} description={item.description} />
                        </GridItem>
                    );
                })}
            </Grid>
        </Flex>
    );
}

export default Dashboard;

// libraries
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import {ItemsContext} from "../context/items";

export function useGetItems(category) {
    const { items, setItems } = useContext(ItemsContext)
    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-type': 'application/json'},
    }

    const getItems = async () => {
        try {
            fetch('http://localhost:5000/api/items/search?category=' + category, requestOptions).then(res => {
                return res.json()
            }).then(json => {
                setItems(json)
            }).catch((err) => {
                console.error(err)
            })
        } catch (e) {
            console.error(e)
        }
    }
    
    return {items, getItems}
}
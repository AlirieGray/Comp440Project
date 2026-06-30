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

export function usePostItem(title, description, categoryArr, price, onToast) {
    const owner = localStorage.getItem('username')
    const navigate = useNavigate()
    let category = ''
    if (categoryArr.length >= 1) {
        category = categoryArr[0]
    }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({title, description, category, price, owner})
    }

    const postItem = async () => {
        let receivedErr = false
        try {
            fetch('http://localhost:5000/api/items/', requestOptions).then(res => {
                console.log(res)
                if (res.status !== 200 && res.status !== 201) {
                    receivedErr = true
                }
                return res.json()
            }).then(json => {
                if (receivedErr) {
                    onToast(json['message'])
                } else {
                    navigate('/')
                }
                console.log(json)
            }).catch((err) => {
                console.error(err)
            })
        } catch (e) {
            console.error(e)
        }
    }

    return [postItem]
    
}

export function usePostReview(item_id, ratingArr, description, onToast){
    const reviewer = localStorage.getItem('username')
    const navigate = useNavigate()

    let rating = ''
    if (ratingArr.length >= 1) {
        rating = ratingArr[0]
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({item_id, rating, description, reviewer})
    }
    
    const postReview = async () => {
        let receivedErr = false
        try {
            fetch('http://localhost:5000/api/reviews/', requestOptions).then(res => {
                console.log(res)
                if (res.status !== 200 && res.status !== 201) {
                    receivedErr = true
                }
                return res.json()
            }).then(json => {
                if (receivedErr) {
                    onToast(json['message'])
                } else {
                    navigate('/')
                }
                console.log(json)
            }).catch((err) => {
                console.error(err)
            })
        } catch(e) {
            console.error(e)
        }
    }
    
    return [postReview]
    
}
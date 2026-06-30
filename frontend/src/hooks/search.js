// libraries
import { useContext } from 'react'
import { useNavigate } from 'react-router'

export function useSearch(category) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({category})
    }

    const search = async () => {
        try {
            fetch('http://localhost:5000/api/items/search', requestOptions).then((res) => {
                if (res.status !== 200) {
                    throw new Error("Could not login")
                } else {
                    return res.json()
                }
            }).then((resJSON) => {
                console.log(resJSON)
            }).catch((err) => {
                console.error(err)
            })
        } catch (err) {
            console.error(err)
        }
    }

    return [search]
}
// libraries
import { useContext } from 'react'
import { useNavigate } from 'react-router'

export function useLogin(username, password) {
    const navigate = useNavigate()

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({username, password})
    }

    const login = async () => {
        try {
            fetch('https://localhost:7190/login', requestOptions).then((res) => {
                if (res.status !== 200) {
                    throw new Error("Could not login")
                } else {
                    return res.json()
                }
            }).then((resJSON) => {
                const meReqOptions = {
                    method: 'GET',
                    headers: {
                        //'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
                return fetch('https://localhost:7260/api/users/me', meReqOptions)
            }).then(meRes => {
                return meRes.json()
            }).then(meJSON => {
                console.log(meJSON)
                    // localStorage.setItem('firstName', meJSON['firstName'])
                    // localStorage.setItem('lastName', meJSON['lastName'])
                navigate("/home")
            }).catch((err) => {
                console.error(err)
            })

        } catch (err) {
            console.error(err)
        }
    }

    return [login]
}
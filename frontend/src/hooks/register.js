// libraries
import { useContext } from 'react'
import { useNavigate } from 'react-router'

export function useRegister(username, password, passwordConfirmed, phone, email, firstName, lastName) {
    const navigate = useNavigate()

    const registerReqOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({username, password, passwordConfirmed, phone, email, firstName, lastName})
    }

    const loginReqOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({username, password})
    }

    const register = async () => {
        try {
            fetch('http://localhost:5000/api/users/register', registerReqOptions).then(res => res.json()).then(json => {
                console.log(json)
                fetch('http://localhost:5000/api/users/login', loginReqOptions).then((res) => {
                    if (res.status !== 200) {
                        throw new Error("Could not login")
                    } else {
                        return res.json()
                    }
                }).then((resJSON) => {
                    console.log(resJSON)
                    localStorage.setItem('firstName', resJSON['firstName'])
                    localStorage.setItem('lastName', resJSON['lastName'])
                    localStorage.setItem('email', resJSON['email'])
                    localStorage.setItem('phone', resJSON['phone'])
    
                    navigate("/")
                }).catch((err) => {
                    console.error(err)
                })
            })
        } catch (err) {
            console.error(err)
        }
    }

    return [register]
}
// libraries
import { useContext } from 'react'
import { useNavigate } from 'react-router'

export function useLogin(username, password, onToast) {
    const navigate = useNavigate()

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({username, password})
    }

    const login = async () => {
        let receivedErr = false
        try {
            fetch('http://localhost:5000/api/users/login', requestOptions).then((res) => {
                if (res.status !== 200) {
                    receivedErr = true
                }
                return res.json()
            }).then((resJSON) => {
                if (receivedErr) {
                    onToast(resJSON['message'])
                } else {
                    localStorage.setItem('firstName', resJSON['firstName'])
                    localStorage.setItem('lastName', resJSON['lastName'])
                    localStorage.setItem('email', resJSON['email'])
                    localStorage.setItem('phone', resJSON['phone'])
                    localStorage.setItem('username', resJSON['username'])
                    
                    navigate("/")
                }
            }).catch((err) => {
                console.error(err)
            })
        } catch (err) {
            console.error(err)
        }
    }

    return [login]
}
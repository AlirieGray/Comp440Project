// libraries
import { useContext } from 'react'
import { useNavigate } from 'react-router'

export function useRegister(username, password, passwordConfirmed, firstName, lastName, phone, email, onToast) {
    const navigate = useNavigate()

    const registerReqOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({username, password, passwordConfirmed, firstName, lastName, phone, email})
    }

    const loginReqOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({username, password})
    }

    const register = async () => {
        let receivedError = false
        try {
            fetch('http://localhost:5000/api/users/register', registerReqOptions).then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    receivedError = true
                }
                return res.json()
            }).then(json => {
                if (receivedError) {
                    onToast(json['message'])
                } else {
                    fetch('http://localhost:5000/api/users/login', loginReqOptions).then((res) => {
                        if (res.status !== 200) {
                            receivedError = true
                        } else {
                            return res.json()
                        }
                    }).then((resJSON) => {
                        if (receivedError) {
                            onToast(json['message'])
                        }
                        localStorage.setItem('firstName', resJSON['firstName'])
                        localStorage.setItem('lastName', resJSON['lastName'])
                        localStorage.setItem('username', resJSON['username'])
                        localStorage.setItem('email', resJSON['email'])
                        localStorage.setItem('phone', resJSON['phone'])
        
                        navigate("/")
                    }).catch((err) => {
                        console.error(err)
                        onToast(err.message)
                    })
                }
            })
        } catch (err) {
            console.error(err)
            onToast(err.message)
        }
    }

    return [register]
}
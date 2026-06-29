import { Field, Input, Flex, Text, Button } from "@chakra-ui/react"
import {
    PasswordInput,
} from "../components/ui/password-input"
import { Link } from 'react-router'
import { useState } from "react"
import {useLogin} from "../hooks/login"
import { ToastContainer, toast } from 'react-toastify'

function Login() {
    const onToast = (msg) => {
        toast(msg)
    }
    
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [login] = useLogin(username, password, onToast)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.length < 1 || username.length < 1) {
            toast("Username and password may not be empty!")
        }
        login()
    }
    
    return (
        <Flex width={500} flexDirection="column" justifyContent={'center'} alignItems={'center'} paddingBottom={'100px'}>
            <ToastContainer theme={"light"} closeOnClick={true}/>
            <Text marginBottom={25} fontSize={36}>Login</Text>
            <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
            </Field.Root>

            <Field.Root>
                <Field.Label>Password</Field.Label>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field.Root>

            <Button onClick={e => handleSubmit(e)}>Log In</Button>
        <Text>No account yet? <Link style={{color: 'blue'}} to='/signup'> Sign up here! </Link> </Text>
        </Flex>
    );
}

export default Login;

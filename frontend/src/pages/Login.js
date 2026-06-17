import { Field, Input, Flex, Text } from "@chakra-ui/react"
import {
    PasswordInput,
} from "../components/ui/password-input"
import { Link } from 'react-router'
import { useState } from "react"
import {useLogin} from "../hooks/login";

function Login() {
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [login] = useLogin(username, password)
    
    return (
        <Flex width={500} flexDirection="column" justifyContent={'center'} alignItems={'center'} paddingBottom={'100px'}>
            <Text marginBottom={25} fontSize={36}>Login</Text>
            <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input value={username} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your username" />
            </Field.Root>

            <Field.Root>
                <Field.Label>Password</Field.Label>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
            </Field.Root>
        <Text>No account yet? <Link style={{color: 'blue'}} to='/signup'> Sign up here! </Link> </Text>
        </Flex>
    );
}

export default Login;

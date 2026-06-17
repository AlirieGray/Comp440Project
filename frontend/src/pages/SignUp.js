import { Field, Input, Flex, Text } from "@chakra-ui/react"
import {
    PasswordInput,
} from "../components/ui/password-input"
import { Link } from 'react-router'
import { useState } from "react"

function SignUp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmed, setPasswordConfirmed] = useState("")
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [phone, setPhone] = useState("")

    return (
        <Flex width={500} flexDirection="column" justifyContent={'center'} alignItems={'center'} paddingBottom={'100px'}>
            <Text marginBottom={25} fontSize={36}>Register</Text>
            
            <Field.Root marginBottom={'10px'}>
                <Field.Label>First Name</Field.Label>
                <Input value={first} onChange={(e) => setFirst(e.target.value)} placeholder="Luke" />
            </Field.Root>

            <Field.Root marginBottom={'10px'}>
                <Field.Label>Last Name</Field.Label>
                <Input value={last} onChange={(e) => setLast(e.target.value)} placeholder="Skywalker" />
            </Field.Root>

            <Field.Root marginBottom={'10px'}>
                <Field.Label>Phone Number</Field.Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(818) 555 - 3333" />
            </Field.Root>

            <Field.Root marginBottom={'10px'}>
                <Field.Label>Email</Field.Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="luke@holo.net" />
            </Field.Root>
            
            <Field.Root marginBottom={'10px'}>
                <Field.Label>Username</Field.Label>
                <Input value={username} onChange={(e) => setPassword(e.target.value)} placeholder="Select a username" />
            </Field.Root>

            <Field.Root marginBottom={'10px'}>
                <Field.Label>Password</Field.Label>
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Pick a strong password" />
            </Field.Root>

            <Field.Root marginBottom={'10px'}>
                <Field.Label>Confirm Password</Field.Label>
                <PasswordInput value={passwordConfirmed} onChange={(e) => setPasswordConfirmed(e.target.value)} placeholder="Confirm Password" />
            </Field.Root>
            
            <Text>Already have an account? <Link style={{color: 'blue'}} to='/login'> Login </Link> </Text>
        </Flex>
    );
}

export default SignUp;

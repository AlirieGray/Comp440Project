import { Field, Input, Flex, Text } from "@chakra-ui/react"

function Dashboard() {
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const phone = localStorage.getItem('phone')
    const email = localStorage.getItem('email')
    
    return (
        <Flex width={500} flexDirection="column" justifyContent={'center'} alignItems={'center'} paddingBottom={'100px'}>
            <Text>{`Welcome, ${firstName} ${lastName}`}</Text>
            <Text>{`My Profile: `}</Text>
            <Text>{`Phone: ${phone}`}</Text>
            <Text>{`Email: ${email}`}</Text>
        </Flex>
    );
}

export default Dashboard;

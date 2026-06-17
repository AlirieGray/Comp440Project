import { Field, Input, Flex, Text } from "@chakra-ui/react"

function Dashboard() {
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    return (
        <Flex width={500} flexDirection="column" justifyContent={'center'} alignItems={'center'} paddingBottom={'100px'}>
            <Text>{`Welcome, ${firstName} ${lastName}`}</Text> 
        </Flex>
    );
}

export default Dashboard;

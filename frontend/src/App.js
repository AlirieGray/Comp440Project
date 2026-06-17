import { ChakraProvider, defaultSystem, Flex } from '@chakra-ui/react'
import Login from "./pages/Login"

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
        <Flex
            minHeight={'100vh'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Login></Login>
        </Flex>
    </ChakraProvider>
  );
}

export default App;

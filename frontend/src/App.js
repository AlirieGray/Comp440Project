import { ChakraProvider, defaultSystem, Flex } from '@chakra-ui/react'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import { Routes, Route } from 'react-router'
import NewItemForm from "./pages/NewItemForm";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
        <Flex
            minHeight={'100vh'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Routes>
                <Route path={'/'} element={<Dashboard />}/>
                <Route path={'/login'} element={<Login />}/>
                <Route path={'/signup'} element={<SignUp />}/>
                <Route path={'/new-item'} element={<NewItemForm />}/>
            </Routes>
        </Flex>
    </ChakraProvider>
  );
}

export default App;

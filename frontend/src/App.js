import { ChakraProvider, defaultSystem, Flex } from '@chakra-ui/react'
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Review from "./pages/Review"
import { Routes, Route } from 'react-router'
import NewItemForm from "./pages/NewItemForm";
import ItemsContextProvider from "./context/items";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
        <ItemsContextProvider>
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
                    <Route path={'/review'} element={<Review />}/>
                </Routes>
            </Flex>
        </ItemsContextProvider>
    </ChakraProvider>
  );
}

export default App;

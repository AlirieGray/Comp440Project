import {Button, Card, Text} from "@chakra-ui/react"
import {useNavigate} from "react-router";

function ItemCard({title, id, price, description, category, owner}) {

    const navigate = useNavigate()

    const handleClickLeaveAReview = (e) => {
        e.preventDefault()
        localStorage.setItem('itemID', id)
        navigate('/review')
    }
    
    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
                <Card.Title mt="2">{title}</Card.Title>
                <Card.Description>
                    <Text>{description}</Text>
                    <Text>{price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}</Text>
                    <Text>Category: {category}</Text>
                    <Text>Owner: {owner}</Text>
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button variant="outline" onClick={e => handleClickLeaveAReview(e)}>Leave a Review</Button>
            </Card.Footer>
        </Card.Root>
    )
}

export default ItemCard

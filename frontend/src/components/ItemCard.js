import {Button, Card} from "@chakra-ui/react"

function ItemCard({name, description}) {
    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
                <Card.Title mt="2">{name}</Card.Title>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
                <Button variant="outline">View</Button>
            </Card.Footer>
        </Card.Root>
    )
}

export default ItemCard

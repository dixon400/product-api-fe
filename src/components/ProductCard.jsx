import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteProduct } from '../api/apiAdmin';

const ProductCard = ({ product }) => {
  const { id, name, price, brand, description } = product
  const navigate = useNavigate()

  const deleteItem = async () => {
    let resp = await deleteProduct(id)
    if(resp.status == 204){
      return navigate("/");
    }
    
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>
        {name}
      </Card.Header>
      <Card.Body>
        <Card.Title>{price}</Card.Title>
        <Card.Text>
          {brand}
        </Card.Text>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="danger" type='button' onClick={deleteItem}> Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
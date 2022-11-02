import axios from 'axios';
import { NavItem } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard =({product})=> {
  const {id, name, price, brand, description} = product

  const productPage = async() => {
    let resp = await axios.get(`127.0.0.1:8000/api/product/${id}`)
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
          {description}
        </Card.Text>
        <Button variant="primary" type='button'>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Card className="my-3 px-3 rounded" style={{ textAlign: "center" }}>
            <Link to={`/product/${product._id}`}>
                {/* <Card.Img src={product.image} variant="top" /> */}
                <Card.Img
                    src={product.s3Image1}
                    variant="top"
                    style={{ height: "200px", maxWidth: "250px" }}
                />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div" style={{ height: "40px" }}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as="h3">{product.price} Rs</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;

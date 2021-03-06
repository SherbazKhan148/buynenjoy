import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
    listProductDetails,
    createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { Zoom, Rotate } from "react-reveal";

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [imageToShow, setImageToShow] = useState("");

    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productCreateReview = useSelector(
        (state) => state.productCreateReview
    );
    const { error: errorProductReview, success: successProductReview } =
        productCreateReview;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const notify = () => toast("Reviewed Submitted!");

    useEffect(() => {
        if (!loading && product && !product.s3Image1) {
            dispatch(listProductDetails(match.params.id));
        } else if (!loading && product && product.s3Image1) {
            setImageToShow(product.s3Image1);
        }

        if (successProductReview) {
            setTimeout(() => {
                notify();
            }, 1000);
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
    }, [dispatch, match, successProductReview, loading, product]);

    const handleAddToCart = (e) => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const handleImageSelect = (e) => {
        setImageToShow(e.target.src);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        );
    };

    return (
        <>
            <Link className="btn btn-dark my-3" to="/">
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message />
            ) : (
                <>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Row>
                        <Col
                            md={6}
                            style={{ textAlign: "center", paddingLeft: "0px" }}
                        >
                            <Zoom>
                                {/* src={product.image} */}
                                <Image
                                    style={{
                                        maxHeight: "350px",
                                        maxWidth: "500px",
                                    }}
                                    // src={product.s3Image1}
                                    src={imageToShow}
                                    alt={product.name}
                                    fluid
                                ></Image>
                                <br />
                                <Row>
                                    {product.s3Image1 &&
                                        product.s3Image1.includes(
                                            "ecommerce-pics"
                                        ) && (
                                            <Col>
                                                <Image
                                                    style={{
                                                        maxHeight: "100px",
                                                        maxWidth: "100px",
                                                        cursor: "pointer",
                                                    }}
                                                    src={product.s3Image1}
                                                    alt={product.name}
                                                    fluid
                                                    onClick={(e) =>
                                                        handleImageSelect(e)
                                                    }
                                                ></Image>
                                            </Col>
                                        )}
                                    {product.s3Image2 &&
                                        product.s3Image2.includes(
                                            "ecommerce-pics"
                                        ) && (
                                            <Col>
                                                <Image
                                                    style={{
                                                        maxHeight: "100px",
                                                        maxWidth: "100px",
                                                        cursor: "pointer",
                                                    }}
                                                    src={product.s3Image2}
                                                    alt={product.name}
                                                    fluid
                                                    onClick={(e) =>
                                                        handleImageSelect(e)
                                                    }
                                                ></Image>
                                            </Col>
                                        )}
                                    {product.s3Image3 &&
                                        product.s3Image3.includes(
                                            "ecommerce-pics"
                                        ) && (
                                            <Col>
                                                <Image
                                                    style={{
                                                        maxHeight: "100px",
                                                        maxWidth: "100px",
                                                        cursor: "pointer",
                                                    }}
                                                    src={product.s3Image3}
                                                    alt={product.name}
                                                    fluid
                                                    onClick={(e) =>
                                                        handleImageSelect(e)
                                                    }
                                                ></Image>
                                            </Col>
                                        )}
                                </Row>
                            </Zoom>
                        </Col>
                        <Col md={3}>
                            <Rotate bottom left>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: Rs {product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Rotate>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <Zoom bottom cascade>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>
                                                        Rs {product.price}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > 0
                                                        ? "In Stock"
                                                        : "Out of Stock"}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => {
                                                                setQty(
                                                                    e.target
                                                                        .value
                                                                );
                                                            }}
                                                        >
                                                            {[
                                                                ...Array(
                                                                    product.countInStock
                                                                ).keys(),
                                                            ].map((x) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            x +
                                                                            1
                                                                        }
                                                                        value={
                                                                            x +
                                                                            1
                                                                        }
                                                                    >
                                                                        {x + 1}
                                                                    </option>
                                                                );
                                                            })}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item
                                            style={{ textAlign: "center" }}
                                        >
                                            <Button
                                                className="btn-block"
                                                type="button"
                                                disabled={
                                                    product.countInStock <= 0
                                                }
                                                onClick={handleAddToCart}
                                            >
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Zoom>
                            </Card>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={6}>
                            <h2>Reivews</h2>
                            {product.reviews &&
                                product.reviews.length === 0 && (
                                    <Message>No Reviews</Message>
                                )}
                            <ListGroup variant="flush">
                                {product.reviews &&
                                    product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating
                                                value={review.rating}
                                                text=""
                                            />
                                            <p>
                                                {review.createdAt &&
                                                    review.createdAt.substring(
                                                        0,
                                                        10
                                                    )}
                                            </p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                <ListGroup.Item>
                                    <h2>Write a Review</h2>
                                    {errorProductReview && (
                                        <Message variant="danger">
                                            {errorProductReview}
                                        </Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select...
                                                    </option>
                                                    <option value="1">
                                                        1 - Poor
                                                    </option>
                                                    <option value="2">
                                                        2 - Fair
                                                    </option>
                                                    <option value="3">
                                                        3 - Good
                                                    </option>
                                                    <option value="4">
                                                        4 - Very Good
                                                    </option>
                                                    <option value="5">
                                                        5 - Excellent
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    row="3"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                            >
                                                Submit Review
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please{" "}
                                            <Link to="/login">
                                                <b>
                                                    <u>Sign In</u>
                                                </b>
                                            </Link>{" "}
                                            to write a Review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default ProductScreen;

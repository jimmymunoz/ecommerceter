var ProductItem = React.createClass({
    displayName: "ProductItem",

    addItemToShoppingCart: function (e) {
        addToShoppingCart(this.props.product_data, 1);
        //this.props.product_data.quantity = this.props.product_data.quantity -1;
        //this.setState({quantity: (this.props.product_data.quantity -1) });
        return false;
    },
    showProductDetail: function (e) {
        openModal('showProductDetail');
        showProductDetailWindow(this.props.product_data);
        return false;
    },
    render: function () {
        var product_data = this.props.product_data;
        return React.createElement(
            "div",
            { className: "col-sm-4" },
            React.createElement(
                "div",
                { className: "product-image-wrapper" },
                React.createElement(
                    "div",
                    { className: "single-products" },
                    React.createElement(
                        "div",
                        { className: "product_container" },
                        React.createElement(
                            "a",
                            { href: "javascript:void(0);", onClick: this.showProductDetail },
                            React.createElement(
                                "div",
                                { className: "productinfo text-left" },
                                React.createElement("img", { src: product_data.image, alt: "" }),
                                React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "b",
                                        null,
                                        product_data.name
                                    )
                                ),
                                React.createElement(
                                    "span",
                                    null,
                                    product_data.category.name
                                ),
                                React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-sm-6" },
                                        React.createElement("img", { alt: "", src: "images/product-details/rating.png" })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-sm-6" },
                                        React.createElement(
                                            "span",
                                            { className: "price_product" },
                                            product_data.price,
                                            " €"
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "productinfo text-center" },
                            React.createElement("input", { className: "btn btn-default add-to-cart", type: "button", value: "Add to cart", onClick: this.addItemToShoppingCart })
                        )
                    )
                )
            )
        );
    }
});
//<a className="btn btn-default add-to-cart" href="javascript:void(0);" onClick={this.addItemToShoppingCart} ><span>Add to cart</span></a>
//<a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</a>
var ProductListContent = React.createClass({
    displayName: 'ProductListContent',
    data: [],
    render: function () {
        var data = this.props.data;
        var ProductItems = this.props.data.map(function (product) {
            return React.createElement(
                ProductItem,
                { product_data: product, key: product._id },
                product.text
            );
        });
        return React.createElement(
            "div",
            { className: "product_list_content" },
            ProductItems
        );
    }
});
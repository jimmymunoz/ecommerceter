var ProductItem = React.createClass({
    displayName: "ProductItem",

    addItemToShoppingCart: function (e) {
        addToShoppingCart(this.props.product_data);
        //this.props.product_data.quantity = this.props.product_data.quantity -1;
        this.setState({ quantity: this.props.product_data.quantity - 1 });
        return false;
    },
    render: function () {
        var product_data = this.props.product_data;
        return React.createElement(
            "div",
            { className: "col-sm-4" },
            React.createElement(
                "a",
                { href: "#showProductDetail" },
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
                            ),
                            React.createElement(
                                "div",
                                { className: "productinfo text-center" },
                                React.createElement(
                                    "a",
                                    { href: "#", className: "btn btn-default add-to-cart" },
                                    React.createElement("i", { className: "fa fa-shopping-cart" }),
                                    "Add to cart"
                                ),
                                React.createElement("input", { type: "button", value: "Add", onClick: this.addItemToShoppingCart })
                            )
                        )
                    )
                )
            )
        );
    }
});
var ProductListContent = React.createClass({
    displayName: 'ProductListContent',
    data: [],
    render: function () {
        var data = this.props.data;
        var ProductItems = this.props.data.map(function (product) {
            return React.createElement(
                ProductItem,
                { product_data: product, key: product.idProduct },
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
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
            "form",
            { className: "formAddToShoppingCart" },
            React.createElement("input", { type: "hidden", name: "idProduct", value: product_data.idProduct }),
            React.createElement(
                "div",
                { className: "product_list_item" },
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "span",
                        { className: "float-left product_name" },
                        React.createElement(
                            "b",
                            null,
                            product_data.name
                        )
                    ),
                    React.createElement("img", { className: "product_image", src: product_data.image })
                ),
                React.createElement(
                    "div",
                    { className: "product_description" },
                    React.createElement(
                        "span",
                        { className: "float-left product_category" },
                        product_data.category.name
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "span",
                        { className: "float-left product_price" },
                        product_data.price,
                        " €"
                    ),
                    React.createElement(
                        "span",
                        { className: "float-left product_quantiy" },
                        product_data.quantity,
                        " Available"
                    ),
                    React.createElement(
                        "span",
                        { className: "float-left description" },
                        product_data.description
                    ),
                    React.createElement("br", null),
                    React.createElement("input", { type: "button", value: "Add", onClick: this.addItemToShoppingCart })
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
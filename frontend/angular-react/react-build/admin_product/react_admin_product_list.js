var ProductItemRow = React.createClass({
    displayName: "ProductItemRow",

    addItemToShoppingCart: function (e) {
        addToShoppingCart(this.props.product_data);
        //this.props.product_data.quantity = this.props.product_data.quantity -1;
        this.setState({ quantity: this.props.product_data.quantity - 1 });
        return false;
    },
    render: function () {
        var product_data = this.props.product_data;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                product_data.name
            ),
            React.createElement(
                "td",
                null,
                product_data.description
            ),
            React.createElement(
                "td",
                null,
                product_data.price
            ),
            React.createElement(
                "td",
                null,
                product_data.tax
            ),
            React.createElement(
                "td",
                null,
                product_data.buyPrice
            ),
            React.createElement(
                "td",
                null,
                product_data.quantity
            ),
            React.createElement(
                "td",
                null,
                product_data.weight
            ),
            React.createElement(
                "td",
                null,
                product_data.category
            ),
            React.createElement(
                "td",
                null,
                product_data.creationDate
            ),
            React.createElement(
                "td",
                null,
                product_data.modificationDate
            ),
            React.createElement(
                "td",
                null,
                product_data.image
            ),
            React.createElement(
                "td",
                null,
                product_data.idProduct
            )
        );
    }
});
var AdminProductListTable = React.createClass({
    displayName: 'AdminProductListTable',
    data: [],
    render: function () {
        var data = this.props.data;
        var ProductItemRows = this.props.data.map(function (product) {
            return React.createElement(
                "table",
                { className: "table table-hover" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "Name"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Description"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Price"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Tax"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Buy Price"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Quantity"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Weight"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Category"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Creation Date"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Modification Date"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Image"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Config"
                        )
                    )
                ),
                React.createElement(
                    ProductItemRow,
                    { product_data: product, key: product.idProduct },
                    product.text
                )
            );
        });
        return React.createElement(
            "div",
            { className: "product_list_content" },
            ProductItems
        );
    }
});
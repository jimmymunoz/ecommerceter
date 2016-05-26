var OrderListItem = React.createClass({
    displayName: "OrderListItem",

    render: function () {
        var shopping_cart_line = this.props.shopping_cart_line;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                { className: "cart_product " },
                React.createElement(
                    "a",
                    { href: "" },
                    React.createElement("img", { alt: "", src: shopping_cart_line.product.image, className: "shopping_cart_image" })
                )
            ),
            React.createElement(
                "td",
                { className: "cart_description " },
                React.createElement(
                    "h4",
                    null,
                    shopping_cart_line.product.name
                )
            ),
            React.createElement(
                "td",
                { className: "cart_price " },
                React.createElement(
                    "p",
                    null,
                    shopping_cart_line.product.price,
                    " €"
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total " },
                React.createElement(
                    "p",
                    { className: "cart_total_price" },
                    shopping_cart_line.product.tax,
                    " €"
                )
            ),
            React.createElement(
                "td",
                { className: "cart_quantity " },
                React.createElement(
                    "p",
                    { className: "cart_quantity_price" },
                    shopping_cart_line.quantity
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total " },
                React.createElement(
                    "p",
                    { className: "cart_total_price" },
                    shopping_cart_line.total,
                    " €"
                )
            )
        );
    }
});
var OrderListContent = React.createClass({
    displayName: 'OrderListListContent',
    data: [],
    render: function () {
        var data = this.props.data;
        var OrderListItems = this.props.data.map(function (shopping_cart_line) {
            return React.createElement(OrderListItem, { shopping_cart_line: shopping_cart_line, key: shopping_cart_line.product._id });
        });
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col-sm-12 col-md-12" },
                React.createElement(
                    "table",
                    { className: "table table-condensed " },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            { className: "cart_menu" },
                            React.createElement("th", { className: "cart_product image" }),
                            React.createElement(
                                "th",
                                { className: "description" },
                                "Product"
                            ),
                            React.createElement(
                                "th",
                                { className: "price" },
                                "Price"
                            ),
                            React.createElement(
                                "th",
                                { className: "price" },
                                "Tax"
                            ),
                            React.createElement(
                                "th",
                                { className: "quantity" },
                                "Quantity"
                            ),
                            React.createElement(
                                "th",
                                { className: "total" },
                                "Total"
                            ),
                            React.createElement("th", { className: "total border-none" })
                        ),
                        OrderListItems
                    )
                )
            )
        );
    }
});
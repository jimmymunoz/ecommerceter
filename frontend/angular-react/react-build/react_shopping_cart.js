var ShoppingCartItem = React.createClass({
    displayName: "ShoppingCartItem",

    removeItemToShoppingCart: function (item) {
        console.log("remove");
    },
    render: function () {
        var order_line = this.props.order_lines;
        return(
            //<input type="hidden" name="product[]" value={order_lines.idProduct} />
            //<input type="hidden" name="quantity[]" value={order_lines.quantity} />
            React.createElement(
                "div",
                { className: "shopping_cart_item" },
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "span",
                        { className: "float-left product_name" },
                        order_line.name
                    ),
                    React.createElement(
                        "span",
                        { className: "float-left product_quantiy" },
                        React.createElement(
                            "b",
                            null,
                            order_line.quantity
                        )
                    )
                )
            )
        );
    }
});
var ShoppingCartContent = React.createClass({
    displayName: 'ShoppingCartListContent',
    data: [],
    render: function () {
        var data = this.props.data;
        var ShoppingCartItems = this.props.data.map(function (order_line) {
            return React.createElement(
                ShoppingCartItem,
                { order_lines: order_line, key: order_line.idProduct },
                order_line.text
            );
        });
        return React.createElement(
            "div",
            { className: "shopping_cart_list_content" },
            ShoppingCartItems
        );
    }
});
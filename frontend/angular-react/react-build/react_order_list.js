var OrderItem = React.createClass({
    displayName: "OrderItem",

    addItemToShoppingCart: function (e) {
        addToShoppingCart(this.props.order_data);
        //this.props.order_data.quantity = this.props.order_data.quantity -1;
        this.setState({ quantity: this.props.order_data.quantity - 1 });
        return false;
    },
    render: function () {
        var order_data = this.props.order_data;
        return React.createElement(
            "form",
            { className: "formAddToShoppingCart" },
            React.createElement("input", { type: "hidden", name: "idOrder", value: order_data.idOrder }),
            React.createElement(
                "div",
                { className: "order_list_item" },
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "span",
                        { className: "float-left order_name" },
                        React.createElement(
                            "b",
                            null,
                            order_data.name
                        )
                    ),
                    React.createElement("img", { className: "order_image", src: order_data.image })
                ),
                React.createElement(
                    "div",
                    { className: "order_description" },
                    React.createElement(
                        "span",
                        { className: "float-left order_category" },
                        order_data.category.name
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "span",
                        { className: "float-left order_price" },
                        order_data.price,
                        " €"
                    ),
                    React.createElement(
                        "span",
                        { className: "float-left order_quantiy" },
                        order_data.quantity,
                        " Available"
                    ),
                    React.createElement(
                        "span",
                        { className: "float-left description" },
                        order_data.description
                    ),
                    React.createElement("br", null),
                    React.createElement("input", { type: "button", value: "Add", onClick: this.addItemToShoppingCart })
                )
            )
        );
    }
});
var OrderListContent = React.createClass({
    displayName: 'OrderListContent',
    data: [],
    render: function () {
        var data = this.props.data;
        var OrderItems = this.props.data.map(function (order) {
            return React.createElement(
                OrderItem,
                { order_data: order, key: order.idOrder },
                order.text
            );
        });
        return React.createElement(
            "div",
            { className: "order_list_content" },
            OrderItems
        );
    }
});
var ProductItem = React.createClass({
    displayName: "ProductItem",

    addItemToShoppingCart: function (e) {
        addToShoppingCart(this.props.user_data);
        //this.props.user_data.quantity = this.props.user_data.quantity -1;
        this.setState({ quantity: this.props.user_data.quantity - 1 });
        return false;
    },
    render: function () {
        var user_data = this.props.user_data;
        return React.createElement(
            "form",
            { className: "formAddToShoppingCart" },
            React.createElement("input", { type: "hidden", name: "idProduct", value: user_data.idProduct }),
            React.createElement(
                "div",
                { className: "user_list_item" },
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "span",
                        { className: "float-left user_name" },
                        React.createElement(
                            "b",
                            null,
                            user_data.name
                        )
                    ),
                    React.createElement("img", { className: "user_image", src: user_data.image })
                ),
                React.createElement(
                    "div",
                    { className: "user_description" },
                    React.createElement(
                        "span",
                        { className: "float-left user_category" },
                        user_data.category.name
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "span",
                        { className: "float-left user_price" },
                        user_data.price,
                        " €"
                    ),
                    React.createElement(
                        "span",
                        { className: "float-left user_quantiy" },
                        user_data.quantity,
                        " Available"
                    ),
                    React.createElement(
                        "span",
                        { className: "float-left description" },
                        user_data.description
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
        var ProductItems = this.props.data.map(function (user) {
            return React.createElement(
                ProductItem,
                { user_data: user, key: user.idProduct },
                user.text
            );
        });
        return React.createElement(
            "div",
            { className: "user_list_content" },
            ProductItems
        );
    }
});
var CategoryItem = React.createClass({
    displayName: "CategoryItem",

    addItemToShoppingCart: function (e) {
        addToShoppingCart(this.props.category_data);
        //this.props.category_data.quantity = this.props.category_data.quantity -1;
        this.setState({ quantity: this.props.category_data.quantity - 1 });
        return false;
    },
    render: function () {
        var category_data = this.props.category_data;
        return React.createElement(
            "form",
            { className: "formAddToShoppingCart" },
            React.createElement("input", { type: "hidden", name: "idCategory", value: category_data.idCategory }),
            React.createElement(
                "div",
                { className: "category_list_item" },
                React.createElement(
                    "div",
                    { className: "container" },
                    React.createElement(
                        "span",
                        { className: "float-left category_name" },
                        React.createElement(
                            "b",
                            null,
                            category_data.name
                        )
                    ),
                    React.createElement("img", { className: "category_image", src: category_data.image })
                ),
                React.createElement(
                    "div",
                    { className: "category_description" },
                    React.createElement(
                        "span",
                        { className: "float-left category_category" },
                        category_data.category.name
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "span",
                        { className: "float-left category_price" },
                        category_data.price,
                        " €"
                    ),
                    React.createElement(
                        "span",
                        { className: "float-left category_quantiy" },
                        category_data.quantity,
                        " Available"
                    ),
                    React.createElement(
                        "span",
                        { className: "float-left description" },
                        category_data.description
                    ),
                    React.createElement("br", null),
                    React.createElement("input", { type: "button", value: "Add", onClick: this.addItemToShoppingCart })
                )
            )
        );
    }
});
var CategoryListContent = React.createClass({
    displayName: 'CategoryListContent',
    data: [],
    render: function () {
        var data = this.props.data;
        var CategoryItems = this.props.data.map(function (category) {
            return React.createElement(
                CategoryItem,
                { category_data: category, key: category.idCategory },
                category.text
            );
        });
        return React.createElement(
            "div",
            { className: "category_list_content" },
            CategoryItems
        );
    }
});
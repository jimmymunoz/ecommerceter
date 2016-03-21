var ProductItemRow = React.createClass({
    displayName: "ProductItemRow",

    editProductItem: function (e) {
        editProductItem(this.props.row_data);
        return false;
    },
    removeProductItem: function (e) {
        removeProductItem(this.props.row_data);
        return false;
    },
    render: function () {
        var row_data = this.props.row_data;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                null,
                row_data.name
            ),
            React.createElement(
                "td",
                null,
                row_data.price
            ),
            React.createElement(
                "td",
                null,
                row_data.tax
            ),
            React.createElement(
                "td",
                null,
                row_data.buyPrice
            ),
            React.createElement(
                "td",
                null,
                row_data.quantity
            ),
            React.createElement(
                "td",
                null,
                row_data.weight
            ),
            React.createElement(
                "td",
                null,
                row_data.category.name
            ),
            React.createElement(
                "td",
                null,
                row_data.modificationDate
            ),
            React.createElement(
                "td",
                null,
                React.createElement("img", { className: "product_image_admin", src: row_data.image })
            ),
            React.createElement(
                "td",
                null,
                React.createElement("input", { type: "button", value: "Edit", onClick: this.editProductItem }),
                React.createElement("input", { type: "button", value: "Remove", onClick: this.removeProductItem })
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
            return React.createElement(ProductItemRow, { row_data: product, key: product.idProduct });
        });
        return React.createElement(
            "div",
            { className: "product_list_content" },
            React.createElement(
                "table",
                { className: "table table-hover" },
                React.createElement(
                    "tbody",
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
                    ),
                    ProductItemRows
                )
            )
        );
    }
});
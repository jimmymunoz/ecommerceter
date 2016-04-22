var OrderItemRow = React.createClass({
    displayName: "OrderItemRow",

    editOrderItem: function (e) {
        editOrderItem(this.props.row_data);
        return false;
    },
    removeOrderItem: function (e) {
        removeOrderItem(this.props.row_data);
        return false;
    },
    render: function () {
        var row_data = this.props.row_data;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.idOrder
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement("p", null)
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.address
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.total
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.status
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.city
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.total
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.totalTax
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.modificationDate
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    React.createElement("img", { className: "admin_items_image", src: row_data.image })
                )
            ),
            React.createElement(
                "td",
                { className: "cart_delete border-none admin_grid_actions" },
                React.createElement(
                    "a",
                    { href: "javascript:void(0);", onClick: this.editOrderItem, className: "cart_quantity_delete" },
                    React.createElement(
                        "i",
                        { className: "fa " },
                        "Edit"
                    )
                ),
                React.createElement(
                    "a",
                    { href: "javascript:void(0);", onClick: this.removeOrderItem, className: "cart_quantity_delete" },
                    React.createElement(
                        "i",
                        { className: "fa " },
                        "Remove"
                    )
                )
            )
        );
    }
});
var AdminOrderListTable = React.createClass({
    displayName: 'AdminOrderListTable',
    data: [],
    render: function () {
        var data = this.props.data;
        var OrderItemRows = this.props.data.map(function (order) {
            return React.createElement(OrderItemRow, { row_data: order, key: order._id });
        });
        return React.createElement(
            "table",
            { className: "table table-condensed" },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    { className: "cart_menu" },
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "idOrder"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "User Name"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Address"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "total"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "status"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "city"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "total"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "totalTax"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Modification Date"
                    ),
                    React.createElement("th", { className: "col-sm-1 border-none" })
                ),
                OrderItemRows
            )
        );
    }
});
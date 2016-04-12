var PrivilegeItemRow = React.createClass({
    displayName: "PrivilegeItemRow",

    editPrivilegeItem: function (e) {
        editPrivilegeItem(this.props.row_data);
        return false;
    },
    removePrivilegeItem: function (e) {
        removePrivilegeItem(this.props.row_data);
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
                    row_data.name
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.price
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.tax
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.buyPrice
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.quantity
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.weight
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.category.name
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
                    { href: "javascript:void(0);", onClick: this.editPrivilegeItem, className: "cart_quantity_delete" },
                    React.createElement(
                        "i",
                        { className: "fa " },
                        "Edit"
                    )
                ),
                React.createElement(
                    "a",
                    { href: "javascript:void(0);", onClick: this.removePrivilegeItem, className: "cart_quantity_delete" },
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
var AdminPrivilegeListTable = React.createClass({
    displayName: 'AdminPrivilegeListTable',
    data: [],
    render: function () {
        var data = this.props.data;
        var PrivilegeItemRows = this.props.data.map(function (privilege) {
            return React.createElement(PrivilegeItemRow, { row_data: privilege, key: privilege.idPrivilege });
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
                        { className: "col-sm-2" },
                        "Name"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Price"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Tax"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Buy Price"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Quantity"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Weight"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Category"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Modification Date"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Image"
                    ),
                    React.createElement("th", { className: "col-sm-1 border-none" })
                ),
                PrivilegeItemRows
            )
        );
    }
});
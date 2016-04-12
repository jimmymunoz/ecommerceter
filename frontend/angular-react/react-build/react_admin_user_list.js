var UserItemRow = React.createClass({
    displayName: "UserItemRow",

    editUserItem: function (e) {
        editUserItem(this.props.row_data);
        return false;
    },
    removeUserItem: function (e) {
        removeUserItem(this.props.row_data);
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
                    row_data.idUser
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.firstName
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.lastName
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.email
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.rol
                )
            ),
            React.createElement(
                "td",
                { className: "cart_delete border-none admin_grid_actions" },
                React.createElement(
                    "a",
                    { href: "javascript:void(0);", onClick: this.editUserItem, className: "cart_quantity_delete" },
                    React.createElement(
                        "i",
                        { className: "fa " },
                        "Edit"
                    )
                ),
                React.createElement(
                    "a",
                    { href: "javascript:void(0);", onClick: this.removeUserItem, className: "cart_quantity_delete" },
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
var AdminUserListTable = React.createClass({
    displayName: 'AdminUserListTable',
    data: [],
    render: function () {
        var data = this.props.data;
        var UserItemRows = this.props.data.map(function (user) {
            return React.createElement(UserItemRow, { row_data: user, key: user.idUser });
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
                        "idUser"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "firstName"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "lastName"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "email"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "rol"
                    ),
                    React.createElement("th", { className: "col-sm-1 buser-none" })
                ),
                UserItemRows
            )
        );
    }
});
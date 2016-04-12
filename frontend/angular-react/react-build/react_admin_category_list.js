var CategoryItemRow = React.createClass({
    displayName: "CategoryItemRow",

    editCategoryItem: function (e) {
        editCategoryItem(this.props.row_data);
        return false;
    },
    removeCategoryItem: function (e) {
        removeCategoryItem(this.props.row_data);
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
                    row_data.idCategory
                )
            ),
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
                    row_data.idCategory.name
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.level
                )
            ),
            React.createElement(
                "td",
                { className: "cart_total col-sm-1 " },
                React.createElement(
                    "p",
                    null,
                    row_data.creationDate
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
                    { href: "javascript:void(0);", onClick: this.editCategoryItem, className: "cart_quantity_delete" },
                    React.createElement(
                        "i",
                        { className: "fa " },
                        "Edit"
                    )
                ),
                React.createElement(
                    "a",
                    { href: "javascript:void(0);", onClick: this.removeCategoryItem, className: "cart_quantity_delete" },
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
var AdminCategoryListTable = React.createClass({
    displayName: 'AdminCategoryListTable',
    data: [],
    render: function () {
        var data = this.props.data;
        var CategoryItemRows = this.props.data.map(function (category) {
            return React.createElement(CategoryItemRow, { row_data: category, key: category.idCategory });
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
                        "idCategory"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Name"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Parent"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Level"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Creation Date"
                    ),
                    React.createElement(
                        "th",
                        { className: "col-sm-1" },
                        "Modification Date"
                    ),
                    React.createElement("th", { className: "col-sm-1 border-none" })
                ),
                CategoryItemRows
            )
        );
    }
});
var CategoryItemRow = React.createClass({
    editCategoryItem: function(e) {
        editCategoryItem(this.props.row_data);
        return false;
    },
    removeCategoryItem: function(e) {
        removeCategoryItem(this.props.row_data);
        return false;
    },
    render: function() {
        var row_data = this.props.row_data;
        return (
           <tr>     
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.idCategory}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.name}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.parentName}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.level}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.creationDate}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.modificationDate}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        <img className="admin_items_image" src={row_data.image} />
                    </p>
                </td>
                <td className="cart_delete border-none admin_grid_actions">
                    <a href="javascript:void(0);" onClick={this.editCategoryItem} className="cart_quantity_delete"><i className="fa ">Edit</i></a>
                    <a href="javascript:void(0);" onClick={this.removeCategoryItem} className="cart_quantity_delete"><i className="fa ">Remove</i></a>
                </td>
            </tr>
        );
    }
});
var AdminCategoryListTable = React.createClass({
    displayName: 'AdminCategoryListTable',
    data: [],
    render: function() {
        var data = this.props.data;
        var CategoryItemRows = this.props.data.map(function(category) {
          return (
            <CategoryItemRow row_data={category} key={category._id}>
            </CategoryItemRow>
          );
        });
        return (
            <table className="table table-condensed">
                <tbody>
                    <tr className="cart_menu">     
                        <th className="col-sm-1">idCategory</th>
						<th className="col-sm-1">Name</th>
						<th className="col-sm-1">Parent</th>
						<th className="col-sm-1">Level</th>
						<th className="col-sm-1">Creation Date</th>
						<th className="col-sm-1">Modification Date</th>
                        <th className="col-sm-1 border-none"></th>
                    </tr>
                    {CategoryItemRows}
                </tbody>
            </table>
        );
    }
});
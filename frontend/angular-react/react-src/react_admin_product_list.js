var ProductItemRow = React.createClass({
    editProductItem: function(e) {
        editProductItem(this.props.row_data);
        return false;
    },
    removeProductItem: function(e) {
        removeProductItem(this.props.row_data);
        return false;
    },
    render: function() {
        var row_data = this.props.row_data;
        return (
            <tr>     
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.name}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.price}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.tax}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.buyPrice}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.quantity}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.weight}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.category.name}
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
                    <a href="javascript:void(0);" onClick={this.editProductItem} className="cart_quantity_delete"><i className="fa ">Edit</i></a>
                    <a href="javascript:void(0);" onClick={this.removeProductItem} className="cart_quantity_delete"><i className="fa ">Remove</i></a>
                </td>
            </tr>
        );
    }
});
var AdminProductListTable = React.createClass({
    displayName: 'AdminProductListTable',
    data: [],
    render: function() {
        var data = this.props.data;
        var ProductItemRows = this.props.data.map(function(product) {
          return (
            <ProductItemRow row_data={product} key={product._id}>
            </ProductItemRow>
          );
        });
        return (
            <table className="table table-condensed">
                <tbody>
                    <tr className="cart_menu">     
                        <th className="col-sm-2">Name</th>
                        <th className="col-sm-1">Price</th>
                        <th className="col-sm-1">Tax</th>
                        <th className="col-sm-1">Buy Price</th>
                        <th className="col-sm-1">Quantity</th>
                        <th className="col-sm-1">Weight</th>
                        <th className="col-sm-1">Product</th>
                        <th className="col-sm-1">Modification Date</th>
                        <th className="col-sm-1">Image</th>
                        <th className="col-sm-1 border-none"></th>
                    </tr>
                    {ProductItemRows}
                </tbody>
            </table>
        );
    }
});
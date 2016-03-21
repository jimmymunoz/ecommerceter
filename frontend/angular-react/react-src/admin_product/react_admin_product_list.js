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
                <td>{row_data.name}</td>
                <td>{row_data.price}</td>
                <td>{row_data.tax}</td>
                <td>{row_data.buyPrice}</td>
                <td>{row_data.quantity}</td>
                <td>{row_data.weight}</td>
                <td>{row_data.category.name}</td>
                <td>{row_data.modificationDate}</td>
                <td><img className="product_image_admin" src={row_data.image} /></td>
                <td>
                    <input type="button" value="Edit" onClick={this.editProductItem} />
                    <input type="button" value="Remove" onClick={this.removeProductItem} />
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
            <ProductItemRow row_data={product} key={product.idProduct}>
            </ProductItemRow>
          );
        });
        return (
            <div className="product_list_content">
                <table className="table table-hover">
                    <tbody>
                        <tr>     
                            <th>Name</th>
                            <th>Price</th>
                            <th>Tax</th>
                            <th>Buy Price</th>
                            <th>Quantity</th>
                            <th>Weight</th>
                            <th>Category</th>
                            <th>Modification Date</th>
                            <th>Image</th>
                            <th>Config</th>
                        </tr>
                        {ProductItemRows}
                    </tbody>
                </table>
            </div>
        );
    }
});
var ProductItemRow = React.createClass({
    addItemToShoppingCart: function(e) {
        addToShoppingCart(this.props.product_data);
        //this.props.product_data.quantity = this.props.product_data.quantity -1;
        this.setState({quantity: (this.props.product_data.quantity -1) });
        return false;
    },
    render: function() {
        var product_data = this.props.product_data;
        return (
            <tr>     
                <td>{product_data.name}</td>
                <td>{product_data.description}</td>
                <td>{product_data.price}</td>
                <td>{product_data.tax}</td>
                <td>{product_data.buyPrice}</td>
                <td>{product_data.quantity}</td>
                <td>{product_data.weight}</td>
                <td>{product_data.category}</td>
                <td>{product_data.creationDate}</td>
                <td>{product_data.modificationDate}</td>
                <td>{product_data.image}</td>
                <td>{product_data.idProduct}</td>
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
            <table className="table table-hover" >
                <thead>
                    <tr>     
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Tax</th>
                        <th>Buy Price</th>
                        <th>Quantity</th>
                        <th>Weight</th>
                        <th>Category</th>
                        <th>Creation Date</th>
                        <th>Modification Date</th>
                        <th>Image</th>
                        <th>Config</th>
                    </tr>
                </thead>
                <ProductItemRow product_data={product} key={product.idProduct}>
                  {product.text}
                </ProductItemRow>
            </table>
          );
        });
        return (
            <div className="product_list_content">
                {ProductItems}
            </div>
        );
    }
});
var OrderListItem = React.createClass({
    render: function() {
        var shopping_cart_line = this.props.shopping_cart_line;
        return (
            <tr>
                <td className="cart_product ">
                    <a href=""><img alt="" src={shopping_cart_line.product.image} className="shopping_cart_image" /></a>
                </td>
                <td className="cart_description ">
                    <h4>
                            {shopping_cart_line.product.name}
                    </h4>
                </td>
                <td className="cart_price ">
                    <p>{shopping_cart_line.product.price} €</p>
                </td>
                <td className="cart_total ">
                    <p className="cart_total_price">{shopping_cart_line.product.tax} €</p>
                </td>
                <td className="cart_quantity ">
                    <p className="cart_quantity_price">{shopping_cart_line.quantity}</p>
                </td>
                <td className="cart_total ">
                    <p className="cart_total_price">{shopping_cart_line.total} €</p>
                </td>
            </tr>
        );
    }
});
var OrderListContent = React.createClass({
    displayName: 'OrderListListContent',
    data: [],
    render: function() {
        var data = this.props.data;
        var OrderListItems = this.props.data.map(function(shopping_cart_line) {
          return (
            <OrderListItem shopping_cart_line={shopping_cart_line} key={shopping_cart_line.product._id}>
            </OrderListItem>
          );
        });
        return (
            <div className="row">
                <div className="col-sm-12 col-md-12">
                    <table className="table table-condensed ">
                        <tbody>
                            <tr className="cart_menu">
                                <th className="cart_product image" ></th>
                                <th className="description">Product</th>
                                <th className="price">Price</th>
                                <th className="price">Tax</th>
                                <th className="quantity">Quantity</th>
                                <th className="total">Total</th>
                                <th className="total border-none"></th>
                            </tr>
                            {OrderListItems}
                            
                        </tbody>
                    </table>
                </div>  
            </div> 
        );
    }
});
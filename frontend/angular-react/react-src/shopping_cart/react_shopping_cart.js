var ShoppingCartItem = React.createClass({
    removeItemToShoppingCart: function(item) {
        console.log("remove");
    },
    render: function() {
        var order_line = this.props.order_lines;
        return (
            //<input type="hidden" name="product[]" value={order_lines.idProduct} />
            //<input type="hidden" name="quantity[]" value={order_lines.quantity} />
            <div className="shopping_cart_item" >
                <div className="container">
                    <span className="float-left product_name">{order_line.name}</span>
                    <span className="float-left product_quantiy"><b>{order_line.quantity}</b></span>
                </div>
            </div>
        );
    }
});
var ShoppingCartContent = React.createClass({
    displayName: 'ShoppingCartListContent',
    data: [],
    render: function() {
        var data = this.props.data;
        var ShoppingCartItems = this.props.data.map(function(order_line) {
          return (
            <ShoppingCartItem order_lines={order_line} key={order_line.idProduct}>
              {order_line.text}
            </ShoppingCartItem>
          );
        });
        return (
            <div className="shopping_cart_list_content">
                {ShoppingCartItems}
            </div>
        );
    }
});
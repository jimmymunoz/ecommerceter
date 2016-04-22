var OrderItem = React.createClass({
    addItemToShoppingCart: function(e) {
        addToShoppingCart(this.props.order_data);
        //this.props.order_data.quantity = this.props.order_data.quantity -1;
        this.setState({quantity: (this.props.order_data.quantity -1) });
        return false;
    },
    render: function() {
        var order_data = this.props.order_data;
        return (
            <form className="formAddToShoppingCart" >
                <input type="hidden" name="idOrder" value={order_data.idOrder} />
                <div className="order_list_item" >
                    <div className="container">
                        <span className="float-left order_name"><b>{order_data.name}</b></span>
                        <img className="order_image" src={order_data.image} />
                    </div>
                    <div className="order_description">
                        <span className="float-left order_category">{order_data.category.name}</span>
                        <br/>
                        <span className="float-left order_price">{order_data.price} €</span>
                        <span className="float-left order_quantiy">{order_data.quantity} Available</span>
                        <span className="float-left description">{order_data.description}</span>
                        <br/>
                        <input type="button" value="Add" onClick={this.addItemToShoppingCart} />
                    </div>
                </div>
            </form>
        );
    }
});
var OrderListContent = React.createClass({
    displayName: 'OrderListContent',
    data: [],
    render: function() {
        var data = this.props.data;
        var OrderItems = this.props.data.map(function(order) {
          return (
            <OrderItem order_data={order} key={order._id}>
              {order.text}
            </OrderItem>
          );
        });
        return (
            <div className="order_list_content">
                {OrderItems}
            </div>
        );
    }
});
var ProductItem = React.createClass({
    addItemToShoppingCart: function(e) {
        addToShoppingCart(this.props.user_data);
        //this.props.user_data.quantity = this.props.user_data.quantity -1;
        this.setState({quantity: (this.props.user_data.quantity -1) });
        return false;
    },
    render: function() {
        var user_data = this.props.user_data;
        return (
            <form className="formAddToShoppingCart" >
                <input type="hidden" name="idProduct" value={user_data.idProduct} />
                <div className="user_list_item" >
                    <div className="container">
                        <span className="float-left user_name"><b>{user_data.name}</b></span>
                        <img className="user_image" src={user_data.image} />
                    </div>
                    <div className="user_description">
                        <span className="float-left user_category">{user_data.category.name}</span>
                        <br/>
                        <span className="float-left user_price">{user_data.price} €</span>
                        <span className="float-left user_quantiy">{user_data.quantity} Available</span>
                        <span className="float-left description">{user_data.description}</span>
                        <br/>
                        <input type="button" value="Add" onClick={this.addItemToShoppingCart} />
                    </div>
                </div>
            </form>
        );
    }
});
var ProductListContent = React.createClass({
    displayName: 'ProductListContent',
    data: [],
    render: function() {
        var data = this.props.data;
        var ProductItems = this.props.data.map(function(user) {
          return (
            <ProductItem user_data={user} key={user._id}>
              {user.text}
            </ProductItem>
          );
        });
        return (
            <div className="user_list_content">
                {ProductItems}
            </div>
        );
    }
});
var ProductItem = React.createClass({
    addItemToShoppingCart: function(e) {
        addToShoppingCart(this.props.product_data);
        //this.props.product_data.quantity = this.props.product_data.quantity -1;
        this.setState({quantity: (this.props.product_data.quantity -1) });
        return false;
    },
    render: function() {
        var product_data = this.props.product_data;
        return (
            <form className="formAddToShoppingCart" >
                <input type="hidden" name="idProduct" value={product_data.idProduct} />
                <div className="product_list_item" >
                    <div className="container">
                        <span className="float-left product_name"><b>{product_data.name}</b></span>
                        <img className="product_image" src={product_data.image} />
                    </div>
                    <div className="product_description">
                        <span className="float-left product_category">{product_data.category.name}</span>
                        <br/>
                        <span className="float-left product_price">{product_data.price} €</span>
                        <span className="float-left product_quantiy">{product_data.quantity} Available</span>
                        <span className="float-left description">{product_data.description}</span>
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
        var ProductItems = this.props.data.map(function(product) {
          return (
            <ProductItem product_data={product} key={product.idProduct}>
              {product.text}
            </ProductItem>
          );
        });
        return (
            <div className="product_list_content">
                {ProductItems}
            </div>
        );
    }
});
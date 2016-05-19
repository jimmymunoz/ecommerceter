var ProductItem = React.createClass({
    addItemToShoppingCart: function(e) {
        addToShoppingCart(this.props.product_data, 1);
        return false;
    },
    showProductDetail: function(e) {
        openModal('showProductDetail')
        showProductDetailWindow(this.props.product_data);
        return false;
    },
    render: function() {
        var product_data = this.props.product_data;
        return (
            <div className="col-sm-4">
                <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="product_container">
                            <a href="javascript:void(0);" onClick={this.showProductDetail} >
                                <div className="productinfo text-left">
                                    <img src={product_data.image} alt="" />
                                    <div><b>{product_data.name}</b></div>
                                    <span>{product_data.category.name}</span>
                                    <div className="row">
                                        <div className="col-sm-6"><img alt="" src="images/product-details/rating.png" /></div>
                                        <div className="col-sm-6"><span className="price_product">{product_data.price} €</span></div>
                                    </div>
                                </div>
                            </a>
                            <div className="productinfo text-center">
                                <input className="btn btn-default add-to-cart" type="button" value="Add to cart" onClick={this.addItemToShoppingCart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            <ProductItem product_data={product} key={product._id}>
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
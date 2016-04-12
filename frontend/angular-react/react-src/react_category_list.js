var CategoryItem = React.createClass({
    addItemToShoppingCart: function(e) {
        addToShoppingCart(this.props.category_data);
        //this.props.category_data.quantity = this.props.category_data.quantity -1;
        this.setState({quantity: (this.props.category_data.quantity -1) });
        return false;
    },
    render: function() {
        var category_data = this.props.category_data;
        return (
            <form className="formAddToShoppingCart" >
                <input type="hidden" name="idCategory" value={category_data.idCategory} />
                <div className="category_list_item" >
                    <div className="container">
                        <span className="float-left category_name"><b>{category_data.name}</b></span>
                        <img className="category_image" src={category_data.image} />
                    </div>
                    <div className="category_description">
                        <span className="float-left category_category">{category_data.category.name}</span>
                        <br/>
                        <span className="float-left category_price">{category_data.price} €</span>
                        <span className="float-left category_quantiy">{category_data.quantity} Available</span>
                        <span className="float-left description">{category_data.description}</span>
                        <br/>
                        <input type="button" value="Add" onClick={this.addItemToShoppingCart} />
                    </div>
                </div>
            </form>
        );
    }
});
var CategoryListContent = React.createClass({
    displayName: 'CategoryListContent',
    data: [],
    render: function() {
        var data = this.props.data;
        var CategoryItems = this.props.data.map(function(category) {
          return (
            <CategoryItem category_data={category} key={category.idCategory}>
              {category.text}
            </CategoryItem>
          );
        });
        return (
            <div className="category_list_content">
                {CategoryItems}
            </div>
        );
    }
});
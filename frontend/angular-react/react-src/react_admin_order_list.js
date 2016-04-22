var OrderItemRow = React.createClass({
    editOrderItem: function(e) {
        editOrderItem(this.props.row_data);
        return false;
    },
    removeOrderItem: function(e) {
        removeOrderItem(this.props.row_data);
        return false;
    },
    render: function() {
        var row_data = this.props.row_data;
        return (
           <tr>     
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.idOrder}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.address}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.total}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.status}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.city}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.total}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.totalTax}
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
                    <a href="javascript:void(0);" onClick={this.editOrderItem} className="cart_quantity_delete"><i className="fa ">Edit</i></a>
                    <a href="javascript:void(0);" onClick={this.removeOrderItem} className="cart_quantity_delete"><i className="fa ">Remove</i></a>
                </td>
            </tr>
        );
    }
});
var AdminOrderListTable = React.createClass({
    displayName: 'AdminOrderListTable',
    data: [],
    render: function() {
        var data = this.props.data;
        var OrderItemRows = this.props.data.map(function(order) {
          return (
            <OrderItemRow row_data={order} key={order._id}>
            </OrderItemRow>
          );
        });
        return (
            <table className="table table-condensed">
                <tbody>
                    <tr className="cart_menu">     
                        <th className="col-sm-1">idOrder</th>
                        <th className="col-sm-1">User Name</th>
                        <th className="col-sm-1">Address</th>
                        <th className="col-sm-1">total</th>
                        <th className="col-sm-1">status</th>
                        <th className="col-sm-1">city</th>
                        <th className="col-sm-1">total</th>
                        <th className="col-sm-1">totalTax</th>
                        <th className="col-sm-1">Modification Date</th>
                        <th className="col-sm-1 border-none"></th>
                    </tr>
                    {OrderItemRows}
                </tbody>
            </table>
        );
    }
});
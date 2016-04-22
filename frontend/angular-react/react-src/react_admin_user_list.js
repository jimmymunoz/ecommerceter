var UserItemRow = React.createClass({
    editUserItem: function(e) {
        editUserItem(this.props.row_data);
        return false;
    },
    removeUserItem: function(e) {
        removeUserItem(this.props.row_data);
        return false;
    },
    render: function() {
        var row_data = this.props.row_data;
        return (
            <tr>     
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.idUser}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.firstName}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.lastName}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.email}
                    </p>
                </td>
                <td className="cart_total col-sm-1 ">
                    <p>
                        {row_data.rol}
                    </p>
                </td>
                <td className="cart_delete border-none admin_grid_actions">
                    <a href="javascript:void(0);" onClick={this.editUserItem} className="cart_quantity_delete"><i className="fa ">Edit</i></a>
                    <a href="javascript:void(0);" onClick={this.removeUserItem} className="cart_quantity_delete"><i className="fa ">Remove</i></a>
                </td>
            </tr>
        );
    }
});
var AdminUserListTable = React.createClass({
    displayName: 'AdminUserListTable',
    data: [],
    render: function() {
        var data = this.props.data;
        var UserItemRows = this.props.data.map(function(user) {
          return (
            <UserItemRow row_data={user} key={user._id}>
            </UserItemRow>
          );
        });
        return (
            <table className="table table-condensed">
                <tbody>
                    <tr className="cart_menu">     
                        <th className="col-sm-1">idUser</th>
                        <th className="col-sm-1">firstName</th>
                        <th className="col-sm-1">lastName</th>
                        <th className="col-sm-1">email</th>
                        <th className="col-sm-1">rol</th>
                        <th className="col-sm-1 buser-none"></th>
                    </tr>
                    {UserItemRows}
                </tbody>
            </table>
        );
    }
});
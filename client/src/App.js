import React, { Component } from "react";
import './App.css';

// Material UI
import { DataGrid } from '@mui/x-data-grid';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sellers: [],
      orders: []
    };
    this.orderColumns = [
      { field: 'orderId', headerName: 'Order ID', flex: 1 },
      { field: 'product', headerName: 'Product', flex: 1 },
      { field: 'seller', headerName: 'Seller', flex: 1 },
      { field: 'country', headerName: 'Country', flex: 1 },
      { field: 'price', headerName: 'Price', flex: 1 },
    ];
    this.sellerColumns = [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'total', headerName: 'Total Sold', flex: 1 },
    ];
  }

  callSellers() {
    fetch("http://localhost:5000/api/sellers")
      .then(res => res.json())
      .then(res => this.setState({ sellers: res }));
  }

  callOrders() {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(res => this.setState({ orders: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callSellers();
    this.callOrders();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Welcome to RTB House Sales System</p>
        </header>
        <div className="App-sellers">
          <h2>Sellers</h2>
          <DataGrid
            rows={this.state.sellers.map(item => {
              return {
                id: item.id,
                name: item.name,
                total: item.total
              };
            })}
            columns={this.sellerColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </div>
        <div className="App-orders">
          <h2>Orders</h2>
          <DataGrid
            rows={this.state.orders.map(item => {
              return {
                orderId: item.orderId,
                product: item.product,
                seller: item.seller,
                country: item.country,
                price: item.price
              };
            })}
            columns={this.orderColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row.orderId}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;

import axios from 'axios';

export default axios.create({
  baseURL:'https://api.yelp.com/v3/businesses'  ,
  headers:{
      Authorization:'Bearer v5Jy4AXFwa_KCqK1jlRxl3ak6op-mM6n4gmIASsq8J6UXQ13KGJHkvqO6ECHzP0CM7zNizRRvIdgClD3e63PQDxIEHDqIMCDUvo1F2nrbl8VzpsmitWLIvTLkuT1XnYx'
  }
});
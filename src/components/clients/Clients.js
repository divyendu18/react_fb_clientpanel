import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import {compose} from "redux";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import Spinner from '../layout/Spinner';

class Clients extends Component {

    state={
        totalOwed:null
    }

    static getDerivedStateFromProps(props,state)
    {
        const { client }= props;

        if(client)
        {
            const total=client.reduce((total,client) => {
                return total+parseFloat(client.Balance);
            },0)
            return {totalOwed:total}
        }
       
            return null;
        
    }
    render() {
        const {client} = this.props;
        const {totalOwed}=this.state;

        if(client){
            return (
                <div>
                <div className="row">
                    <div className="col-md-6">
                        <h2>
                            
                            <i className="fas fa-users">Clients</i></h2>
                    </div>
                    <div className="col-md-6">
                        <h5 className="text-right text-secondary">
                            Total Owed:
                        <span className="text-primary">
                        <i className="fas fa-rupee-sign"/>{totalOwed}
                        </span></h5>
                    </div>   
                </div>
                <table className="table table-striped">
                    <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th/>
                        </tr> 
                    </thead>
                    <tbody>
                        {client.map(clients =>(
                            <tr key={clients.id}>
                                <td>{clients.firstName} {clients.lastName}</td>
                                <td>  {clients.email}  </td>
                                <td><i className="fas fa-rupee-sign"/>{parseFloat(clients.Balance).toFixed(2)}</td>
                                <td>
                                    <Link to={`/clients/${clients.id}`} className="btn btn-secondary btn-sm">
                                           <i className="fas fa-arrow-circle-right"/> Details
                                        </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            );
        }
        else{
            return(
                    <Spinner/>
            )
        }
        
    }
}

Clients.propTypes={
    firestore: PropTypes.object.isRequired,
    clients:PropTypes.array.isRequired
}
export default  compose(
    firestoreConnect([{ collection: 'client'}]),
    connect((state ,props) => ({
        client: state.firestore.ordered.client
    }))
)(Clients);


/*[{
            id:'12345678',
            firstName:'Divyendu',
            lastName:'Jha',
            email:'djs',
            phone:'123455',
            balance:'30'

        },
    {
        id:'1234567',
            firstName:'Divyendu',
            lastName:'Jha',
            email:'djs',
            phone:'123455',
            balance:'30'
    */
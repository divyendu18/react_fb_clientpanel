import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import PropTypes from 'prop-types'
//import {compose} from 'redux';
//import {  connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

 class AddClients extends Component {
     state={
         firstName:'',
         lastName:'',
         email:'',
         phone:'',
         Balance:''
     }

     onSubmit =(e) =>{
         e.preventDefault();

         const newClient=this.state;

         const {firestore, history}=this.props;
         //If no balance make it zero
         if(newClient.Balance==="")
         {
            newClient.Balance=0;
         }
         firestore.add({collection:'client'},newClient).then(() => history.push('/'));
     }

      onChange=(e) =>{
            this.setState({[e.target.name]:e.target.value})
      }
      
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"/>Back To Dashboard
                        </Link>
                    </div>
                </div>
            

            <div className="card">
                <div className="card-header">Add Client </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">FirstName</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="firstName"
                                minLength="2"
                                required
                                onChange={this.onChange}
                                value={this.state.firstName}>
                             </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">LastName</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="lastName"
                                minLength="2"
                                required
                                onChange={this.onChange}
                                value={this.state.lastName}>
                             </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={this.state.email}>
                             </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="phone"
                                minLength="10"
                                required
                                onChange={this.onChange}
                                value={this.state.phone}>
                             </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Balance">Balance</label>
                            <input 
                                type="text"
                                className="form-control"
                                name="Balance"
                                onChange={this.onChange}
                                value={this.state.Balance}>
                             </input>
                        </div>
                        <input type="submit" value="Submit" className="btn btn-primary btn-block"/>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

AddClients.propTypes={
    firestore:PropTypes.object.isRequired
};
export default firestoreConnect()(AddClients);
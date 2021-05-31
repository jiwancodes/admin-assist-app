import React, { Component } from 'react'

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { Button, Card } from 'react-bootstrap'
// import InputField from '../../components/inputfield/InputField'
// import './Signup.css'

export class Signup extends Component {
   constructor(){
      super();
      this.state = {
         name:'',
         email:'',
         password: '',
         password2: '',
         faculty: '',
         errors: {}
      };

   };
   onChangeHandler = (e) => {
      console.log("onchangehandler called");
      console.log([e.target.name]);
      this.setState({[e.target.name]: e.target.value});
      const newErr = {...this.state.errors};
      newErr[e.target.name] = '';
      this.setState({errors: newErr});
   };

   componentDidUpdate(nextProps){
      if(nextProps.errors){
         this.setState({errors: nextProps.errors});
      }
   }

   onClickHandler = (e) => {
      e.preventDefault(); //prevents from default submission
      const newUser =  {
         name: this.state.name,
         email: this.state.email,
         password: this.state.password,
         password2: this.state.password2,
         faculty: this.state.faculty,
      };

      this.props.registerUser(newUser, this.props.history);

   };

   render() {
      return (
         <div className="signUpFormBox">
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registeredsign in?
                </p>
            </form>
            
         </div>
      )
   }
}

export default Signup

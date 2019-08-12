import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Logout extends Component {

    handleSubmit = async (e) => {
        e.preventDefault();

        const logout = await fetch('http://localhost:9000/auth/logout', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const parsedLogout = await logout.json();

        console.log(parsedLogout, ' < logout response');

        if(parsedLogout.status.message === 'User Logout'){
            console.log('logged out');

            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
            
            </div>
        )
    }
}
export default Logout
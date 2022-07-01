import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';


const Users = ({ users, things, deleteUser })=> {

  return (
    <div>
      <h1>Users</h1>
      <UserForm />
      <ol>
        {
          users.map( user => {
            const userThings = things.filter(thing => thing.userId === user.id);
            
            return (
              <li key={ user.id }>
                { user.name } {userThings.length > 0 ? 'owns the below things' : 'dows not own anything yet'}
                <ul>
                  {
                    userThings.map(thing => {
                      return (
                        <li key={thing.id}>
                          {thing.name}
                        </li>
                      )
                    })
                  }
                </ul>
                <button onClick={() => {deleteUser(user)}}>Delete {user.name}</button>
              </li>
            );
          })
        }
      </ol>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: async(user) =>{
      await axios.delete(`/api/users/${user.id}`);
      dispatch({
        type: 'DELETE_USER',
        user
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

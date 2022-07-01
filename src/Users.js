import React from 'react';
import { connect } from 'react-redux';


const Users = ({ users, things })=> {

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            const userThings = things.filter(thing => thing.userId === user.id);
            return (
              <li key={ user.id }>
                { user.name } {userThings.length > 0 ? 'owns' : 'dows not own anything yet'}
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
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users,
    things: state.things
  };
}
export default connect(mapStateToProps)(Users);

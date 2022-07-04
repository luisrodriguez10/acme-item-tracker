import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import UserForm from "./UserForm";

const Users = ({ users, things, deleteUser }) => {
  return (
    <div id="Users">
      <h2>Welcome to the Users Page</h2>
      <UserForm />
      <table>
        <tbody>
          <tr>
            <th>Owner</th>
            <th>Things</th>
            <th>Delete</th>
          </tr>
          {users.map((user) => {
            const userThings = things.filter(
              (thing) => thing.userId === user.id
            );
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>
                  <ul>
                    {userThings.map((thing) => {
                      return <li key={thing.id}>{thing.name}</li>;
                    })}
                  </ul>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(user);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    things: state.things,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: async (user) => {
      await axios.delete(`/api/users/${user.id}`);
      dispatch({
        type: "DELETE_USER",
        user,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

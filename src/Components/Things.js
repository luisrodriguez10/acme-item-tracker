import React from "react";
import ThingForm from "./ThingForm";
import { connect } from "react-redux";
import axios from "axios";

const Things = ({
  things,
  deleteThing,
  users,
  increaseRating,
  decreaseRating,
  updateUser,
}) => {
  return (
    <div id="Things">
      <h2>Welcome to the Things Page</h2>
      <ThingForm />
      <table>
        <tbody>
          <tr>
            <th>Thing</th>
            <th>Ranking</th>
            <th>Increase/Decrease Ranking</th>
            <th>Owner</th>
            <th>Delete</th>
          </tr>
          {things.map((thing) => {
            return (
              <tr key={thing.id}>
                <td>{thing.name}</td>
                <td>{thing.ranking}</td>
                <td>
                  <button
                    onClick={() => {
                      increaseRating(thing);
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      decreaseRating(thing);
                    }}
                  >
                    -
                  </button>
                </td>
                <td>
                  <select
                    defaultValue={thing.userId ? thing.userId : ""}
                    onChange={(ev) => updateUser(ev, thing)}
                  >
                    <option value={0}>-- No onwer --</option>
                    {users.map((user) => {
                      return (
                        <option value={user.id} key={user.id}>
                          {user.name}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteThing(thing);
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
    things: state.things,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteThing: async (thing) => {
      await axios.delete(`/api/things/${thing.id}`);
      dispatch({
        type: "DELETE_THING",
        thing,
      });
    },
    increaseRating: async (thing) => {
      const newThing = (
        await axios.put(`/api/things/${thing.id}`, {
          ranking: thing.ranking + 1,
        })
      ).data;
      dispatch({
        type: "INCREASE_RANKING",
        newThing,
      });
    },
    decreaseRating: async (thing) => {
      const newThing = (
        await axios.put(`/api/things/${thing.id}`, {
          ranking: thing.ranking - 1,
        })
      ).data;
      dispatch({
        type: "DECREASE_RANKING",
        newThing,
      });
    },
    updateUser: async (ev, thing) => {
      const newUserId = ev.target.value * 1;
      const updatedThing = (
        await axios.put(`/api/things/${thing.id}`, {
          userId: newUserId ? newUserId : null,
        })
      ).data;
      dispatch({
        type: "UPDATE_USER",
        updatedThing,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Things);

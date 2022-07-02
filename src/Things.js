import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteThing, users, increaseRating, decreaseRating })=> {
  return (
    <div>
      <h1>Things</h1>
      <ThingForm />
      <ol>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name } with ranking: {thing.ranking}
                <button onClick={() => {increaseRating(thing)}}>+</button>
                <button onClick={() => {decreaseRating(thing)}}>-</button>
                owned by
                <select defaultValue={thing.userId} >
                  {
                    users.map(user => {
                      return (
                        thing.userId ? <option value={user.id} key={user.id}>{user.name}</option> : <option key={user.id}>-- No owner --</option>
                      )
                    })
                  }
                </select>
                <button onClick={() =>{deleteThing(thing)}}>Delete</button>
              </li>
              
            );
          })
        }
      </ol>
      
    </div>
  );
};

const mapStateToProps = (state) =>{
  return {
    things: state.things,
    users: state.users
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
    deleteThing: async(thing)=>{
      await axios.delete(`/api/things/${thing.id}`);
      dispatch({
        type: 'DELETE_THING',
        thing
      })
    },
    increaseRating: async(thing) =>{
      const newThing = (await axios.put(`/api/things/${thing.id}`, {ranking: thing.ranking + 1})).data;
      dispatch({
        type: 'INCREASE_RANKING',
        newThing
      })
    },
    decreaseRating: async(thing) =>{
      const newThing = (await axios.put(`/api/things/${thing.id}`, {ranking: thing.ranking - 1})).data;
      dispatch({
        type: 'DECREASE_RANKING',
        newThing
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Things);

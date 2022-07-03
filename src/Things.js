import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteThing, users, increaseRating, decreaseRating, updateUser })=> {
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
                <select defaultValue={thing.userId ? thing.userId: ''} onChange={(ev) => updateUser(ev, thing)}>
                  <option value={0}>-- No onwer --</option>
                  {
                    
                    users.map(user => {
                      return (
                          <option value={user.id} key={user.id}>{user.name}</option>
                        
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
    },
    updateUser: async(ev, thing) =>{
      const newUserId = ev.target.value*1;
      const updatedThing = (await axios.put(`/api/things/${thing.id}`, {userId: newUserId ? newUserId : null})).data;
      dispatch({
        type: 'UPDATE_USER',
        updatedThing
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Things);

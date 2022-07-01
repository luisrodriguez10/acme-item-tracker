import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';

const Things = ({ things, deleteThing })=> {
  return (
    <div>
      <h1>Things</h1>
      <ThingForm />
      <ol>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name } | Ranking: {thing.ranking}
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
    things: state.things
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
    deleteThing: async(thing)=>{
      dispatch({
        type: 'DELETE_THING',
        thing
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Things);

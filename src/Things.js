import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';

const Things = ({ things })=> {
  return (
    <div>
      <h1>Things</h1>
      <ThingForm />
      <ol>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name }
              </li>
            );
          })
        }
      </ol>
      
    </div>
  );
};

export default connect(
  (state)=> {
    return {
      things: state.things
    }
  }
)(Things);

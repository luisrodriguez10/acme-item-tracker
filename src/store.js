import { createStore } from 'redux';

const initialState = {
  view: window.location.hash.slice(1),
  users: [],
  things: []
};

const store = createStore((state = initialState, action)=> { 
  if(action.type === 'SET_THINGS'){
    return {...state, things: action.things };
  }
  if(action.type === 'SET_USERS'){
    return {...state, users: action.users }; 
  }
  if(action.type === 'SET_VIEW'){
    return {...state, view: action.view }; 
  }
  if(action.type === 'CREATE_THING'){
    return {...state, things: [...state.things, action.thing ]}; 
  }
  if(action.type === 'DELETE_THING'){
    const things = state.things.filter(_thing => _thing.id !== action.thing.id)
    return {...state, things}; 
  }
  if(action.type === 'CREATE_USER'){
    return {...state, users: [...state.users, action.user ]}; 
  }
  if(action.type === 'DELETE_USER'){
    const users = state.users.filter(_user => _user.id !== action.user.id);
    const things = state.things.filter(_thing => _thing.userId !== action.user.id);
    return {...state, users, things}; 
  }
  if(action.type === 'INCREASE_RANKING'){
    let newThings = [];
    state.things.map(_thing => {
      if(_thing.id === action.newThing.id){
        _thing.ranking = action.newThing.ranking
      }
      newThings.push(_thing);
    })
    return {...state, things: newThings}; 
  }
  if(action.type === 'DECREASE_RANKING'){
    let newThings = [];
    state.things.map(_thing => {
      if(_thing.id === action.newThing.id){
        _thing.ranking = action.newThing.ranking
      }
      newThings.push(_thing);
    })
    return {...state, things: newThings}; 
  }
  if(action.type === 'UPDATE_USER'){
    let newThings = [];
    state.things.map(_thing => {
      if(_thing.id === action.updatedThing.id){
        _thing.userId = action.updatedThing.userId;

      }
      newThings.push(_thing)
    })

    return {...state, things: newThings}
  }

  return state;
});

export default store;


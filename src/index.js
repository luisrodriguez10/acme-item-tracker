import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import Nav from './Components/Nav';
import Users from './Components/Users';
import Things from './Components/Things';
import Home from './Components/Home';
import store from './store';
import { Provider, connect } from 'react-redux';

const root = createRoot(document.querySelector('#app'));

class _App extends Component{
  componentDidMount(){
    window.addEventListener('hashchange', ()=> {
      this.props.setView(window.location.hash.slice(1));
    });
    try {
      this.props.loadData();
    }
    catch(ex){
      console.log(ex);
    }
  }
  render(){
    const { view } = this.props;
    return (
      <div>
        <Nav />
        {
          view === '' ? <Home /> : null

        }
        {
          view === 'users' ? <Users /> : null

        }
        {
          view === 'things' ? <Things /> : null

        }
      </div>
    );
  }
}


const mapDispatch = (dispatch)=> {
  return {
    setView: (view)=> {
      dispatch({ type: 'SET_VIEW', view });
    },
    loadData: async()=> {
      const responses = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/things'),
      ]);
      dispatch({
        type: 'SET_USERS',
        users: responses[0].data
      });
      dispatch({
        type: 'SET_THINGS',
        things: responses[1].data
      });
    }
  };
};
const mapStateToProps = state => {
  return {
    view: state.view
  };
};

const App = connect(mapStateToProps, mapDispatch)(_App);


root.render(<Provider store={ store }><App /></Provider>);
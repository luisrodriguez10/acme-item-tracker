import React from "react";
import { connect } from "react-redux";

const Home = ({ things }) => {

  const thingsRaking = things.filter((thing) => {
    return thing.ranking >= 5;
  }).sort((a, b) => b.ranking - a.ranking);

  return (
    <div id="Home">
      <h2>Welcome to the Home Page</h2>
      <h3>Here you will find the things with the highest ranking</h3>
      <table>
        <tbody>
          <tr>
            <th>Thing</th>
            <th>Ranking</th>
          </tr>
          {
            thingsRaking.map(thing => {
              return (
                <tr key={thing.id}>
                  <td>{thing.name}</td>
                  <td>{thing.ranking}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    things: state.things,
  };
};

export default connect(mapStateToProps)(Home);

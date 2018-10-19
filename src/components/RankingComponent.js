import React, { Component } from 'react';

class RankingComponent extends Component {
  componentDidMount() {
    this.props.getRanking();
  }

  render() {
    return (
      <div className="ranking-wrap">
        <h2>Ranking</h2>
        <ul className="ranking-list">
          {
            this.props.ranking.map((ranking, index) => (
              <li key={ranking._id}>
                <span className="ranking-number">{index + 1}.</span>
                <strong className="ranking-point">{ranking.point} Point</strong>
                <span className="ranking-user">Player Name : {ranking.name}</span>
              </li>
            ))
          }
        </ul>
      </div>
    );
  };
}

export default RankingComponent;

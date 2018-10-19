import { connect } from 'react-redux';
import axios from 'axios';
import RankingComponent from '../components/RankingComponent';
import { GET_USER_RANKING } from '../constants/ActionTypes'

const BASE_URL = `http://localhost:5000`;

const rankingStateToProps = (state) => {
  return {
    router: state.router,
    ranking: state.rankingReducer.ranking
  };
};

const rankingDispatchProps = (dispatch, ownProps) => {
  return {
    getRanking() {
      axios({
        url: BASE_URL + '/users/points',
        method: 'get',
        headers: {
          'authorization': 'Bearer ' + ownProps.token
        }
      })
        .then((response) => {
          dispatch({ type: GET_USER_RANKING, ranking: response.data.result });
        })
        .catch((err) => {
          alert('Get ranking failed');
          console.log(err);
        });
    }
  };
};

export default connect(rankingStateToProps, rankingDispatchProps)(RankingComponent);

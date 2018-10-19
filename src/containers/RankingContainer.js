import { connect } from 'react-redux';
import axios from 'axios';
import RankingComponent from '../components/RankingComponent';
import { GET_USER_RANKING } from '../constants/ActionTypes'

let BASE_URL;
if (process.env.REACT_APP_NODE_ENV === 'development') {
  BASE_URL = `https://api-dev.listenup.kr`;
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = `https://api.listenup.kr`;
}

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

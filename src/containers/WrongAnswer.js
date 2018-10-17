import { connect } from 'react-redux';
import axios from 'axios';
import WrongComponent from '../components/WrongComponent';

const BASE_URL = `http://localhost:5000`;

const wrongStateToProps = (state) => {
  return {
    router: state.router,
    getAnswers: state.getAnswers,
    getProblem: state.getProblem,
    wrongPlayer: state.wrongPlayer
  };
};

const wrongDispatchProps = (dispatch, ownProps) => {
  return {
    getWrongAnswer() {
      axios({
        url: BASE_URL + '/answers',
        method: 'get',
        headers: {
          'authorization': 'Bearer ' + ownProps.token
        }
      })
        .then((response) => {
          dispatch({ type: 'GET_WRONG_ANSWER', answers: response.data.result });
        })
        .catch((err) => {
          alert('Get answer failed');
          console.log(err);
        });
    },
    getProblemByWrong(id) {
      return axios({
        url: BASE_URL + '/problems/' + id,
        method: 'get',
        headers: {
          'authorization': 'Bearer ' + ownProps.token
        }
      })
        .then((response) => {
          dispatch({ type: 'GET_PROBLEM_BY_WRONG', problem: response.data.result });
        })
        .catch((err) => {
          alert('Get answer failed');
          console.log(err);
        });
    },
    wrongPlayerChange(player) {
      dispatch({ type: 'WRONG_PLAYER_CHANGE', player });
    }
  };
};

export default connect(wrongStateToProps, wrongDispatchProps)(WrongComponent);

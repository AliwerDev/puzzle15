import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import Modal from '../../components/Modal';
import { MATRIX } from '../../consts/matrix';
import type { GameMatrix } from '../../types';

type Props = {
  matrix: GameMatrix,
  isStarted: boolean,
  newGame: () => void,
  counter: number,
};

const WinnerDialog = ({ matrix, isStarted, newGame, counter }: Props) => {
  const [win, setWin] = useState(false);

  useEffect(() => {
    newGame();
    return newGame();
  }, []);

  useEffect(() => {
    setWin(isEqual(matrix, MATRIX));
  }, [matrix]);

  useEffect(() => {
    window.parent.postMessage(
      { status: 'started', numberOfAttempts: counter },
      '*',
    );
  }, [counter]);

  useEffect(() => {
    if (win) {
      window.parent.postMessage(
        { status: 'finished', numberOfAttempts: counter },
        '*',
      );
    }
  }, [win]);

  useEffect(() => {
    window.addEventListener('message', data => {
      if (data.data.type === 'NEW_GAME') {
        newGame();
      }
    });
  }, []);

  return (
    <Fragment>
      {/* {win && isStarted ? (
        <Fragment>
          <Modal
            onClose={() => {
              setWin(false);
              newGame();
            }}
          >
            Congratulation! You are winner!!!
            <h6>Click to restart game</h6>
            <div />
          </Modal>
        </Fragment>
      ) : null} */}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  matrix: state.game.matrix,
  isStarted: state.game.isStarted,
  counter: state.game.counter,
});

export default connect(
  mapStateToProps,
  null,
)(WinnerDialog);

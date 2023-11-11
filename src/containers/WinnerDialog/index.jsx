// @flow
// flow
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Confetti from 'react-confetti';
import isEqual from 'lodash/isEqual';
import Modal from '../../components/Modal';
import { MATRIX } from '../../consts/matrix';
import type { GameMatrix } from '../../types';

type Props = {
  matrix: GameMatrix,
  isStarted: boolean,
  newGame: () => void,
};

const WinnerDialog = ({ matrix, isStarted, newGame }: Props) => {
  const [win, setWin] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    setWin(isEqual(matrix, MATRIX));
  }, [matrix]);

  return (
    <Fragment>
      {win && isStarted ? (
        <Fragment>
          <Confetti gravity={0.2} width={width} height={height} />
          <Modal
            onClose={() => {
              newGame();
              setWin(false);
            }}
          >
            Congratulation! You are winner!!!
          </Modal>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  matrix: state.game.matrix,
  isStarted: state.game.isStarted,
});

export default connect(
  mapStateToProps,
  null,
)(WinnerDialog);

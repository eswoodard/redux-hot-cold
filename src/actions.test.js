import {GENERATE_AURAL_UPDATE, generateAuralUpdate, RESTART_GAME, restartGame, MAKE_GUESS, makeGuess} from './actions';

describe('restartGame', () => {
  it('Should return the action', () => {
    const correctAnswer = Math.round(Math.random() * 100) + 1;
    const action = restartGame(correctAnswer);
    expect(action.type).toEqual(RESTART_GAME);
    expect(action.correctAnswer).toEqual(correctAnswer);
  });
});

describe('makeGuess', () => {
  it('Should return the action', () => {
    const guess = 'guess';
    const action = makeGuess(guess);
    expect(action.type).toEqual(MAKE_GUESS);
    expect(action.guess).toEqual(guess);
  });
});

describe('generateAuralUpdate', () => {
  it('Should return the action', () => {
    const action = generateAuralUpdate();
    expect(action.type).toEqual(GENERATE_AURAL_UPDATE);
  });
});
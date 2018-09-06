import reducer from './reducer';
import {GENERATE_AURAL_UPDATE, generateAuralUpdate, RESTART_GAME, restartGame, MAKE_GUESS, makeGuess} from './actions';

describe('reducer', () => {

  it('Should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '_UNKNOWN'});
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.auralStatus).toEqual('');

  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = reducer(currentState, {type: '_UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('restartGame', () => {
    it('should start a new game', () => {
      let state = {
        guesses: [10, 20, 30, 40],
        feedback: 'You are cold',
        correctAnswer: 20,
      };
      const correctAnswer = 18;
      state = reducer(state, restartGame(correctAnswer));
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.correctAnswer).toEqual(correctAnswer);
      expect(state.auralStatus).toEqual('');
    });
  });


  describe('makeGuess', () => {
    ('it should compare guess to correctAnswer', () => {
      let state = {
        guesses: [],
        feedback: '',
        correctAnswer: 100
      };
      state = reducer(state, makeGuess(25));
      expect(state.guesses).toEqual([25]);
      expect(state.feedback).toEqual("You're Ice Cold...");

      state = reducer(state, makeGuess(60));
      expect(state.guesses).toEqual([25, 60]);
      expect(state.feedback).toEqual("You're Cold...");

      state = reducer(state, makeGuess(80));
      expect(state.guesses).toEqual([25, 60, 80]);
      expect(state.feedback).toEqual("You're Warm.");

      state = reducer(state, makeGuess(95));
      expect(state.guesses).toEqual([25, 60, 80, 95]);
      expect(state.feedback).toEqual("You're Hot!");

      state = reducer(state, makeGuess(100));
      expect(state.guesses).toEqual([25, 60, 80, 95, 100]);
      expect(state.feedback).toEqual('You got it!');
    });
  });

  it('can generate aural updates', () => {
    let state = {
      guesses: [50, 60, 70],
      feedback: "You're warm",
      auralStatus: ''
    };
    state = reducer(state, generateAuralUpdate());
    expect(state.auralStatus).toEqual(
      "Here's the status of the game right now: You're warm You've made 3 guesses. In order of most- to least-recent, they are: 70, 60, 50"
    );
  });
});
// class CounterController {

//   constructor($ngRedux, $scope) {
//     const unsubscribe = $ngRedux.connect(this.mapStateToThis, CounterActions)(this);
//     $scope.$on('$destroy', unsubscribe);
//   }

//   // Which part of the Redux global state does our component want to receive?
//   mapStateToThis(state) {
//     return {
//       value: state.counter
//     };
//   }
// }


// class TestClass {
//   constructor() {
//     this.words = seeduxNGReduxConnectorLogic(this.mapStateToTarget, this);
//   }
//   mapStateToTarget() {
//     console.log(this); 
//   }
// }

// const test = new TestClass();

// function seeduxNGReduxConnectorLogic(mapStateToTarget, prototype) {
  // console.log(prototype)
  // const controller = Object.getOwnPropertyDescriptor(mapStateToTarget);
  // const coerceToString = '';
  // const mappedState = mapStateToTarget + coerceToString;
  // console.log({[controller]: mappedState})
  // return { [controller]: mappedState };
// }

// const answerUI = {

// }
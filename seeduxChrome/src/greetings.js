function getGreetings() {
  const greetings = [
    'Greetings from Seedux.',
    'Hey there. Redux got you down?',
    'Let\'s crush some Redux, eh?',
    'The solution is at hand.',
    'Another challenge to conquer!'
  ]
  return greetings[Math.floor(Math.random() * greetings.length)];
}
export default getGreetings;

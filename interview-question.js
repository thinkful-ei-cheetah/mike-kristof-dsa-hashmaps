/*
Imagine you are working on an application that provides movie streaming
facility to customers in flights.

Users on longer flights like to start a second movie right when their 
first one ends, but they complain that the plane usually lands before 
they can see the ending. So you're building a feature for choosing 
two movies those total runtimes will eqqual the exact flight length.

Write a function that takes an integer flight_time (in minutes) and a 
list of integers movie_lengths (in minutes) and returns a boolean 
indicating whether there are two movies equal to the flight_time.

When building your function:

Assume your users will watch exactly two movies
Don't make your users watch the same movie twice
Optimize for runtime over memory
You are allowed to use any build in functions or class necessary as 
long as you are optimizing for runtime
*/

// input: flight_time: 180, [60, 90, 120, 210, 360]
// output: true / false

/*
- use a nexted loop to add the different combinations to find the less than or
  equal to the flight_time 
  Time Complexity: O(n^2)

- use hash map to run thru the array that would return true
  Time Complexity: O(n)
*/

function findMyMovies(flight_time, movie_lengths) {
  let movieMap = new Map();
  for (let i = 0; i < movie_lengths.length; i++) {
    let second = flight_time - movie_lengths[i];
    if (movieMap.has(second)) {
      return true;
    }
    movieMap.set(movie_lengths[i])
  }
  return false;
}
export const CARS_API = 'http://localhost:8080/api' as const;

const WELCOME = `Welcome to carshow api!\n`;
const INSTRUCTIONS = `
Type one of the next commands:
"cars":
Lists all cars available on our stands.
If needed - pass "from" and "to" separated by space to paginate cars.

"create {"brand": "string", "name": "string", "yearCreated": number, "price": number}":
Creates a new car with defined JSON(not js!!!) and returns it

"delete 63bdd3ba17d5e76a22821ca4"
Deletes the car from the database if car with id exists\n\n
`;

export const OUTPUT_MSGS = {
  WELCOME,
  INSTRUCTIONS,
} as const;

# Package.json

`yarn init -y` - initialize a new Node.JS project.

```
yarn add express typescript
yarn add --dev @types/node @types/express ts-node-dev
```

`express` - Because it will help in handling HTTP requests & response, routing and middleware management.
`TypeScript` - Because is a superset of Javascript, and will help in type check, which will help me in long run in preventing bugs and inproving code quality.
`ts-node-dev` - It is similar to nodemon.
`dotenv` - It will help me hide my personl information secret, even when I'll push my code to GitHub.

# Types

`Promise<void>` - The function will deal with asynchronous operations hence 'Promise', but will return nothing hence 'void'

## app.ts

```
const start = async (): Promise<void> => {
  try {
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
```

It will start a basic asynchronous function, which will start a express server on PORT 5000.

`import * as dotenv from "dotenv"`
It means all exports from the module are grouped under a single object (here, dotenv). Now we have access to all the method provided by dotenv, e.g. config(), parse(), etc.

## connectDB

connectDB will return a promise and it will resolve with a mongoose object, else if there will be an error during connection it will log the error and exits the 'Node' process.

The exit code 1 is significant:

By convention, a non-zero exit code (like 1) indicates that the process terminated with an error.
An exit code of 0 typically means the process executed successfully.

## CustomAPIError

```
class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
  }
}
```

`class` - creates a new class called "CustomAPIError".
`extends` - helps borrow features from an already established "Error class".
`constructor` - create an instance of the class, and pass the arugments if present. And is called automatically when `new` keyword is called.
`super` - helps pasing data to the parent class (Error)

`Class` -

1. Is a blueprint or template for creating objects.
2. Defines the structure and behaviour that object will have.
3. It's like a recipe for making dish(Object).

`Object` -

1. Is an instance of a class.
2. Is concrete entity created from the class blueprint.
3. It's the acutal dish created with the recipe(Class)

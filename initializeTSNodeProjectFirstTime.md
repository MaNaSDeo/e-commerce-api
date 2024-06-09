# TypeScript Backend Project with Node.js and Express

This project is a simple backend server built with Node.js, Express, and TypeScript.

## Prerequisites

- Node.js (v12 or later)
- Yarn package manager

## Getting Started

### Step 1: Initialize a New Node.js Project

Open your terminal and navigate to the directory where you want to create your project. Run the following command to initialize a new Node.js project:

`yarn init -y`

### Step 2: Install Required Dependencies

In the same directory, run the following command to install the necessary dependencies:

```
yarn add express typescript
yarn add --dev @types/node @types/express ts-node-dev
```

### Step 3: Create & Configure TypeScript

Run the following command to create a tsconfig.json file:

```
npx tsc --init --rootDir src --outDir dist --esModuleInterop --lib ES6,dom --module commonjs
```

`npx tsc:` runs the TypeScript compiler(tsc) using npx, and allows to run binaries from npm packages without installing them gloablly.

`--rootDir src:` specifies the root directory of the input files. In this case, it's set to `src`, which means that the TypeScript compiler will look for source files in the src directory.

`--outDir dist:` specifies the output directory for the compiled JS files. In this case, the compiled files will be placed in the `dist` directory.

`--esModuleInterop:` This flag enables interoperability between CommonJS and ES modules. This is useful when we works with a mix of CommonJS and ES modules, allowing us to import and use them together without any issues.

`--lib ES6,dom:` This option specifies the sets of built-in APIs that should be included in the compilation process. In this case, it includes the ES6 (ECMAScript 2015) library and the DOM (Document Object Model) library. The DOM library is typically used in web development when working with browser APIs.

`--module commonjs:` --module commonjs: This option specifies the module system used for the compiled JavaScript files. In this case, it's set to commonjs, which is the module system used by Node.js. This means that the compiled files will use the require function to import modules.

Create a tsconfig.json file in the root of your project with the following content:

```
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

### Step 4: Set Up the Project Structure

Create a src directory in the root of your project. Inside the src directory, create an app.ts file. This will be the entry point of your Express application.

### Step 5: Write Your Express Application

In the src/app.ts file, add the following code to create a basic Express server:

### Step 6: Add Scripts to package.json

Open package.json and add the following scripts:

```
"scripts": {
    "start": "yarn build && node dist/app.js",
    "dev": "ts-node-dev --respawn --pretty src/app.ts",
    "build": "tsc -p ."
  }
```

Note:

`ts-node-dev:` is a development tool that helps improve the development experience when working with TypeScript. It watches your TypeScript files for changes and automatically restarts the application when changes are detected. This eliminates the need to manually stop and restart the development server every time you make changes to your code. i.e. work like nodemon.

`--respawn:` This option tells ts-node-dev to automatically restart the application when changes are detected.

`--pretty`: This option enables pretty output formatting, making the console logs more readable.

`--transpile-only:` This option tells ts-node-dev to skip type checking and only transpile the TypeScript code to JavaScript. Type checking can be slow, so skipping it during development can improve performance, but you may miss some type errors.

### Step 7: Start the Development Server

Run the following command to start the development server:

`yarn dev`

### Step 8: Your Express application should now be running at

`http://localhost:3000`

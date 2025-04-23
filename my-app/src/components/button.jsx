import React from "react";
import { useState } from "react";
//In this file we learn, what are hooks and how to use them in react. We will also learn about the useState hook, which is used to manage state in functional components.
//This is first project.

function CounterDiv() {
  const [counter, setCounter] = useState(0);
  const [errorMassage, setErrorMassage] = useState("")
  // useState is a hook that allows you to add state to your functional components. It returns an array with two elements: the current state value and a function to update it.
  // The initial state value is passed as an argument to useState. In this case, the initial value is 0.

  // let Value = 0
  const counterUp = () => {
    if (counter < 20) {
      setCounter(counter + 1);
      setErrorMassage("")
      console.log(counter);
      }
    else {
      console.log("you cant perform this operation");
      setErrorMassage("Maximum value is 20. You can not perform this operation.")

    }
  }
  const counterDown = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      setErrorMassage("")

      console.log(counter);

    }
    else {
      console.log("you cant perform this operation");
      setErrorMassage("Minimum value is 0. You can not perform this operation.")


    }
  }
  return (
    <div className="flex flex-col items-center gap-6 p-7 rounded-2xl">
      <h1>Chai Aur React</h1>
      <p className="text-red-700">{errorMassage}</p>
      <p>Counter Value: {counter}</p>
      <br/>
      <button
        onClick={counterUp}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Increment</button>
      <button
        onClick={counterDown}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Decrement</button>
    </div>
  )
}

export default CounterDiv;
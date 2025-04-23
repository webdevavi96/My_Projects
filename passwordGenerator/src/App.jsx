import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(6);
  const [isNumber, setNumber] = useState(false);
  const [isChar, setChar] = useState(false);
  const [password, setPassword] = useState("");

  //useRef is used to create a reference to the password input field
  // it is used to access the input field directly
  const passwordRef = useRef(null);

  //useCallback is used to memoize the passwordGenerator function
  // it will only re-create the function if the dependencies change
  // in this case, the dependencies are length, isNumber, and isChar.

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let charecters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumber) charecters += "0123456789";
    if (isChar) charecters += "!@#$%^&*_+?~`";

    for (let i = 1; i <= length; i++) {
      let randChar = Math.floor(Math.random() * charecters.length + 1)
      generatedPassword += charecters.charAt(randChar);
    }

    setPassword(generatedPassword);

  }, [length, isNumber, isChar, setPassword])

  //useEffect is used to call the passwordGenerator function whenever the dependencies change
  // in this case, whenever length, isNumber, or isChar changes
  // it will call the passwordGenerator function to generate a new password.

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumber, isChar, passwordGenerator])

  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 24);
  }
    , [password]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-red-900 bg-gray-100'>
        <h1>Password Generator</h1>
        <div className='flex shaadow-lg rounded-lg overflow-hidden mb-4'>
          <input
            value={password}
            className='outline-none w-full py-1 px-3 text-black-900'
            type="text"
            readOnly
            placeholder='password'
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 cursor-pointer'
            onClick={copyToClipboard}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex ityems-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={24}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
            <input
              type="checkbox"
              defaultChecked={isNumber}
              onChange={(e) => setNumber((prev) => !prev)}
              className='cursor-pointer'
            />
            <label>Number</label>
            <input
              type="checkbox"
              defaultChecked={isChar}
              onChange={(e) => setChar((prev) => !prev)}
              className='cursor-pointer'
            />
            <label>Charecter</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App

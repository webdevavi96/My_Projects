import React from "react";

//This is second project in same app. This project is about creating a card component using react and tailwind css. We will also ;earnabout props and how to use them in react.
//Props are used to pass data from one component to another. In this case, we are passing title and content as props to the Card component. This makes a component reusable and allows us to create multiple instances of the same component with different data.

function Card({ title, content }) {
  return (
    <div className="flex flex-col items-center gap-6 p-7 rounded-2xl">
      <div>
        <img className="size-48 shadow-xl rounded-md" alt="" src="/vite.svg" />
      </div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}


export default Card;
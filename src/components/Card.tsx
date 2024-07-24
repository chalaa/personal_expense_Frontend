import React from "react";

interface CardProps{
    title: string;
    children: React.ReactNode;
    width: string;
}

const Card: React.FC<CardProps> = ({title, width, children}) => {
  return (
    <div className = {` bg-white shadow-md rounded p-4 m-4  ${width}`}>
      <h2 className = "text-2xl fint-bold mb-4 text-center">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
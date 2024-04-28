import React, { FunctionComponent } from "react";

const Card: FunctionComponent<CardInfoProps> = ({ cardInfo }) => {
  return (
    <div className="border border-gray-300 bg-white shadow-md rounded-md p-2 mx-4 my-2 md:flex md:flex-col md:items-center text-center">
      <ul>
        <li className="text-lg font-semibold mb-2 md:text-xl">
          {cardInfo?.name}
        </li>
        <li>
          <img
            src={cardInfo.imagePath}
            className="mt-2 w-full rounded-md md:max-w-xs"
            alt={cardInfo?.url}
          />
        </li>
      </ul>
    </div>
    // <div className="border border-gray-300 bg-white shadow-md rounded-md p-2 md:flex md:flex-col md:items-center text-center">
    //   <ul>
    //     <li className="text-lg font-semibold mb-2 md:text-xl">
    //       {cardInfo?.name}
    //     </li>
    //     <li>
    //       <img
    //         src={cardInfo.imagePath}
    //         className="mt-2 w-full rounded-md md:max-w-xs"
    //         alt={cardInfo?.url}
    //       />
    //     </li>
    //   </ul>
    // </div>
  );
};

export default Card;

type CardInfoProps = {
  cardInfo: {
    id: number;
    name: string;
    url: string;
    imagePath: string;
  };
};

// import { FunctionComponent } from "react";

// const Card: FunctionComponent<CardInfoProps> = ({ cardInfo }) => {
//   return (
//     <div>
//       <ul>
//         <li>{cardInfo?.name}</li>
//         <li>
//           <img src={cardInfo.imagePath} width={100} alt={cardInfo?.url} />
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Card;

// type CardInfoProps = {
//   cardInfo: {
//     id: number;
//     name: string;
//     url: string;
//     imagePath: string;
//   };
// };

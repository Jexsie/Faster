// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// const Test = () => {
//   return (
//     <div>
//       <FontAwesomeIcon icon={faEnvelope} />
//     </div>
//   );
// };

// export default Test;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Test = () => (
  <div>
    <FontAwesomeIcon icon="fa-solid fa-check-square" />
    Your <FontAwesomeIcon icon="fa-regular fa-coffee" /> is hot! Compliments of
    the <FontAwesomeIcon icon="fa-sharp fa-solid fa-hat-chef" />!
  </div>
);

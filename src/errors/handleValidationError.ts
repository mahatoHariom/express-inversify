// import { Prisma } from "@prisma/client";
// import { iGenericErrorResponse } from "../interfaces/common";

// const handleValidationError = (
//   error: Prisma.PrismaClientValidationError
// ): iGenericErrorResponse => {
//   const errors = [
//     {
//       path: "",
//       message: error.message,
//     },
//   ];
//   const statusCode = 400;
//   return {
//     statusCode,
//     message: "Validation Error",
//     errorMessages: errors,
//   };
// };

// export default handleValidationError;

import { Prisma } from "@prisma/client";
import { iGenericErrorResponse } from "../@types/common";
import { compareSync } from "bcrypt";


const handleValidationError = (
  error: Prisma.PrismaClientValidationError
): iGenericErrorResponse => {
  console.log("SDFsdhari")
  const errors = [
    {
      path: "",
      message: error.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;

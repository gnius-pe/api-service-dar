const httpResponses = {
    OK: {
      status: 200,
      message: "Success",
    },
    CREATED: {
      status: 201,
      message: "Resource created successfully",
    },
    BAD_REQUEST: {
      status: 400,
      message: "Bad Request",
    },
    UNAUTHORIZED: {
      status: 401,
      message: "Unauthorized",
    },
    FORBIDDEN: {
      status: 403,
      message: "Forbidden",
    },
    NOT_FOUND: {
      status: 404,
      message: "Resource not found",
    },
    INTERNAL_SERVER_ERROR: {
      status: 500,
      message: "Internal Server Error",
    },
    CUSTOM: (status, message) => ({ status, message }),
  };
  
  export default httpResponses;
  
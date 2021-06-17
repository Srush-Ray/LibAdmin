import axios from "axios";

export const getAllQuestions = async () => {
  return await axios
    .get("/api/all")
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};

export const deleteQuestion = async (data) => {
  console.log(data);
  return await axios
    .post("/api/all/delete", data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};
export const getAllQueTypes = async () => {
  return await axios
    .get("/api/all/quetype")
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};
export const addNewQA = async (data) => {
  console.log(data);
  return await axios
    .post("/api/all/addnew", data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};

export const delete_Unsat_Question = async (data) => {
  console.log(data);
  return await axios
    .post("/api/all/deleteUnsat", data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};

export const getUnsatisfiedQuestions = async () => {
  return await axios
    .get("/api/all/unsatQ")
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};
export const addNewQueType = async (data) => {
  console.log(data);
  return await axios
    .post("/api/all/addquesType", data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};
export const editQA = async (data) => {
  console.log(data);
  return await axios
    .post("/api/all/editqa", data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};

export const countUnsat = async () => {
  return await axios
    .get("/api/all/countUnsat")
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};
export const deleteQtype = async (data) => {
  console.log(data);
  return await axios
    .post("/api/all/deleteQtype", data)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.log(err);
      return { message: "Error. Please try again later." };
    });
};

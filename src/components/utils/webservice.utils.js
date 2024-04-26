import { WEBSERVICE_DIALOGS } from "../../constants/dialog.constants";

export function callWebService(props, id, BodyParams, apiName) {
  const { requestData } = props;
  const Params = {
    id,
    api: {
      body: BodyParams,
      apiName
    }
  };

  return requestData(Params)
    .then(dataMap => {
      console.log("dataMap after requesting = ", dataMap);
      if (dataMap.apiData && dataMap.apiData.response) {
        console.log("response gawlo bawa = ", dataMap);

        const message = dataMap.apiData.response;
        console.log("message gawlo bawa = ", message);
        console.log(
          "WEBSERVICE_DIALOGS.saveSuccessMsg = ",
          WEBSERVICE_DIALOGS.saveSuccessMsg
        );
        if (message === "failure") {
          console.log("failure bawa = ", dataMap);
          return { message, apiData: "" };
        } else if (
          message === WEBSERVICE_DIALOGS.saveSuccessMsg ||
          message === WEBSERVICE_DIALOGS.saveSuccessMsg1
        ) {
          console.log("success bawa = ", dataMap);
          return { message, apiData: dataMap.apiData.response };
        }
      } else {
        console.log("zol = ", dataMap);
        return { message: "Connection issue", apiData: "" };
      }
    })
    .catch(function (error) {
      console.log("error after requesting = ", error, dataMap);
      return { message: "Connection issue", apiData: "" };
    });
}

export function storeToServerStorage(obj, id, props, apiName) {
  const { requestData } = props;
  if (apiName) {
    console.log("JSON.stringify(obj) :-", JSON.stringify(obj));
    return callWebService(
      { requestData },
      id,
      JSON.stringify(obj),
      apiName
    ).then(response => {
      console.log("response :-", response);
      if (response) {
        if (response.message === "failure") {
          return {
            isSuccess: false,
            message: "failure"
          };
        } else if (
          response.message === WEBSERVICE_DIALOGS.saveSuccessMsg ||
          response.message === WEBSERVICE_DIALOGS.saveSuccessMsg1
        ) {
          return {
            isSuccess: true,
            message: WEBSERVICE_DIALOGS.saveSuccessMsg1
          };
        }
      } else {
        return {
          isSuccess: false,
          message: "failure"
        };
      }
    });
  } else {
    return {
      isSuccess: false,
      message: "failure"
    };
  }
}

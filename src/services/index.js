import axios from "axios";
import { toast } from "react-toastify";

export const submitPFBTransaction = async (url, namespace_id, data) => {
  const body = {
    namespace_id,
    data,
    gas_limit: 80000,
    fee: 2000,
  };

  const pfbToastId = toast.loading("Submitting PFB transaction", {
    position: "top-right",
    theme: "light",
  });

  return axios
    .post(`${url}/submit_pfb`, body, {
      "Access-Control-Allow-Origin": "*",
      mode: "no-cors",
    })
    .then((res) => {
      toast.update(pfbToastId, {
        render: "Sent success PFB transaction",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
      return { isSuccess: true, data: res.data };
    })
    .catch((err) => {
      toast.update(pfbToastId, {
        render: "Oops. Something went wrong!",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
      return { isSuccess: false, data: err };
    });
};

export const getNamespacedByBlockHeight = async (
  url,
  namespace_id,
  blockHeight
) => {
  const pfbToastId = toast.loading("Getting namespace...", {
    position: "top-right",
    theme: "light",
  });

  return axios
    .get(`${url}/namespaced_shares/${namespace_id}/height/${blockHeight}`)
    .then((res) => {
      toast.update(pfbToastId, {
        render: "Get success Namespace",
        type: "success",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
      return { isSuccess: true, data: res.data };
    })
    .catch((err) => {
      toast.update(pfbToastId, {
        render: "Oops. Something went wrong!",
        type: "error",
        isLoading: false,
        closeOnClick: true,
        autoClose: 3000,
      });
      return { isSuccess: false, data: err };
    });
};

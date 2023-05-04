import { useQuery } from "react-query";
import axios from "axios";

export function
  useBuscarInfoQuery(params) {
  return useQuery(
    ["buscarInfoQuery", params],
    buscarInfoQuery, {
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: false,
    enabled: true,
  });
}

export const buscarInfoQuery = async (params) => {
  const [queryName, paramsFilter] = params.queryKey;
  let urlBase = "https://dog.ceo/api/breeds/image/random";

  const { data } = await axios.get(
    urlBase
  );
  // const resumen = data.message.map((item, index) => {
  //   return { label: item, id: index + 1 };
  // })

  return data.message;
};


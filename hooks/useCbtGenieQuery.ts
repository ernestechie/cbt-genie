import httpClient from "@/server/axios";
import { useQuery } from "@tanstack/react-query";

interface CbtGenieQueryProps {
  url: string;
  queryKeys: string[];
}

export default function useCbtGenieQuery({
  url,
  queryKeys,
}: CbtGenieQueryProps) {
  return useQuery({
    queryKey: queryKeys,
    queryFn: () => httpClient.get(url).then((res) => res.data),
  });
}

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { refresh } from "../services/axiosAPI";



export const useGetCurrentUser = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["user"],
    queryFn: () => Promise.resolve(queryClient.getQueryData(["user"])), // щоб не падало
    initialData: queryClient.getQueryData(["user"]),
    enabled: false,
  });
};



export const useRefreshQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: refresh,
    staleTime: Infinity, // дані ніколи не застарівають
    cacheTime: Infinity, // кеш завжди тримається
    refetchOnMount: false, // не оновлювати при монтуванні
    refetchOnWindowFocus: false, // не оновлювати при поверненні вкладки
    refetchOnReconnect: false, // не оновлювати при відновленні з’єднання
    retry: false,
  });
};

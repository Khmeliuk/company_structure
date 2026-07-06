import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "../services/authService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: authService.getCurrentUser,
    enabled: !!localStorage.getItem("token"),
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["currentUser"], null);
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  };
};

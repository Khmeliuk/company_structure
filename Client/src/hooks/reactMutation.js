import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSyncAuthAcrossTabs } from "./useSyncAuthAcrossTabs";

export const useAuthMutation = function (fetchFunction) {
  const queryClient = useQueryClient();
  const { notifyAuthUpdate } = useSyncAuthAcrossTabs();

  return useMutation({
    mutationFn: fetchFunction,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      notifyAuthUpdate(); // 🔔 повідомляємо інші вкладки
    },
    onError: (error) => {
      console.error("Auth error:", error);
    },
  });
};

export const useStructureMutation = function (fetchFunction) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchFunction,
    onSuccess: (data) => {
      queryClient.setQueryData(["structure"], data);
    },
    onError: (error) => {
      console.error("Structure error:", error);
    },
  });
};

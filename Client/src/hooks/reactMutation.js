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

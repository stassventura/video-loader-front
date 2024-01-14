import api from '@/lib/api';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@tanstack/react-query';
import { taskApi } from '@/lib/api/task';

export default function useData() {
  const [loading, setLoading] = useState(false);
  const sendData = (
    text: string,
    fontName: string,
    files: FileList | null,
    successMessage: string,
    reset?: () => void,
  ) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('chatId', import.meta.env.VITE_USER_ID!);
    formData.append('text', text);
    formData.append('fontName', fontName);

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('videos', files[i]);
      }
    }

    toast.promise(
      api.post('/api/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      {
        loading: 'Загрузка...',
        success: () => {
          setLoading(false);
          reset?.();
          return successMessage || 'Видео успешно загружены!';
        },
        error: (err) => {
          setLoading(false);
          return err.response?.data.message || 'Ой.. что-то пошло не так';
        },
      },
    );
  };

  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskApi.getAll(),
    refetchInterval: 1000,
  });

  const tasksMutation = useMutation({
    mutationFn: () => taskApi.clearAll(),
    onSuccess: () => {
      toast.success('Все задачи успешно удалены!');
      tasksQuery.refetch();
    },
    onError: () => {
      toast.error('Ой.. что-то пошло не так');
    },
  });

  return {
    loading,
    sendData,
    tasksQuery,
    tasksMutation,
  };
}

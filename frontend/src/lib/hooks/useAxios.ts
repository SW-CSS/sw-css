import { DefaultError, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect, RedirectType, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { AccessDeniedError, BusinessError, UnauthorizedError } from '@/types/error';

function handleError(error: Error, pathname: string) {
  if (error instanceof UnauthorizedError) {
    redirect(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/login?redirect=${process.env.NEXT_PUBLIC_SERVER_URL + pathname}`,
      RedirectType.replace,
    );
  }

  if (error instanceof AccessDeniedError) {
    toast.error('해당 요청을 수행할 권한이 없습니다.');
    return;
  }

  if (error instanceof BusinessError && error.originalError instanceof AxiosError && error.originalError.response) {
    toast.error(error.originalError.response.data.detail);
    return;
  }

  throw error;
}

export function useAxiosQuery<TQueryFnData>(options: UseQueryOptions<TQueryFnData>) {
  const query = useQuery<TQueryFnData>(options);
  const { error, isError } = query;
  const pathname = usePathname();

  useEffect(() => {
    if (isError) {
      handleError(error, pathname);
    }
  }, [error, isError, pathname]);

  return query;
}

export function useAxiosMutation<TData, TVariables>(options: UseMutationOptions<TData, DefaultError, TVariables>) {
  const mutation = useMutation<TData, DefaultError, TVariables>(options);
  const { error, isError } = mutation;
  const pathname = usePathname();

  useEffect(() => {
    if (isError) {
      handleError(error, pathname);
    }
  }, [error, isError, pathname]);

  return mutation;
}

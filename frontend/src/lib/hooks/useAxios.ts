import { DefaultError, useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect, RedirectType, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  AccessDeniedError,
  BusinessError,
  MemberNotFoundError,
  MemberRoleNotMatchedError,
  UnauthorizedError,
} from '@/types/error';

import type { UseQueryOptions } from '@tanstack/react-query/src/types';

import { AUTH_UI_SERVER, MANAGER_UI_SERVER } from '@/constants/env.constant';

function handleError(error: Error, pathname: string) {
  if (error instanceof UnauthorizedError) {
    redirect(`${AUTH_UI_SERVER}/login?redirect=${MANAGER_UI_SERVER + pathname}`, RedirectType.replace);
  }

  if (error instanceof AccessDeniedError) {
    toast.error('해당 요청을 수행할 권한이 없습니다.');
    return;
  }

  if (error instanceof MemberNotFoundError || error instanceof MemberRoleNotMatchedError) {
    redirect(`${AUTH_UI_SERVER}/logout?redirect=${MANAGER_UI_SERVER}`, RedirectType.replace);
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

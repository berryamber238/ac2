import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import { handleResponse, isOkStatus } from '../utils/handleRestApiResponse';
import usePrevious from '../utils/usePrevious';
import {
  encodeQueryParam,
  renderParam,
  renderQueryString,
} from '../utils/encodeQueryParam';
import * as GlobalVariables from '../config/GlobalVariableContext';

const cleanHeaders = headers =>
  Object.fromEntries(Object.entries(headers).filter(kv => kv[1] != null));

export const editOpinionPOST = async (
  Constants,
  {
    content,
    corporation_ids,
    cover_image,
    expected_trend,
    id,
    industry_ids,
    state,
    stock_tracing,
    title,
    type,
  },
  handlers,
  timeout
) => {
  const url = `https://webhook.uutool.cn/acecamp`;
  const controller = new AbortController();
  let timeoutObj;
  if (timeout) {
    timeoutObj = setTimeout(() => {
      const err = new Error(`Timeout after ${timeout}ms`);
      err.__type = 'TIMEOUT';
      controller.abort(err);
    }, timeout);
  }
  try {
    const res = await fetch(url, {
      body: JSON.stringify({
        state: state,
        type: type,
        content: content,
        disclaimer: true,
        cover_image: cover_image,
        stock_tracing: stock_tracing,
        expected_trend: expected_trend,
        corporation_ids: corporation_ids,
        industry_ids: industry_ids,
        title: title,
        id: id,
      }),
      headers: cleanHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: Constants['cookie'],
      }),
      method: 'POST',
      signal: controller.signal,
    });
    timeoutObj && clearTimeout(timeoutObj);
    return handleResponse(res, handlers);
  } catch (e) {
    if (e.__type === 'TIMEOUT') {
      handlers.onTimeout?.();
    } else if (timeoutObj) {
      clearTimeout(timeoutObj);
    }
    throw e;
  }
};

export const useEditOpinionPOST = (
  initialArgs = {},
  { handlers = {} } = {}
) => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();
  return useMutation(
    args => editOpinionPOST(Constants, { ...initialArgs, ...args }, handlers),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('test', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('test');
        queryClient.invalidateQueries('tests');
      },
    }
  );
};

export const FetchEditOpinionPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  refetchOnReconnect,
  retry,
  staleTime,
  timeout,
  content,
  corporation_ids,
  cover_image,
  expected_trend,
  id,
  industry_ids,
  state,
  stock_tracing,
  title,
  type,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useEditOpinionPOST(
    {
      content,
      corporation_ids,
      cover_image,
      expected_trend,
      id,
      industry_ids,
      state,
      stock_tracing,
      title,
      type,
    },
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      timeout,
      handlers: { onData, ...handlers },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused && refetchOnWindowFocus !== false) {
      refetch();
    }
  }, [isFocused, prevIsFocused, refetchOnWindowFocus]);

  React.useEffect(() => {
    if (error) {
      console.error(error);
      if (error.status) {
        console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      }
    }
  }, [error]);
  return children({ loading, data, error, refetchEditOpinion: refetch });
};

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

export const dimensionsGET = async (Constants, _args, handlers = {}) => {
  const url = `https://api.acecamptech.com/api/v1/dimensions`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      'User-Agent': 'AceCamp/1.6.0(100)',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useDimensionsGET = (
  args = {},
  {
    refetchInterval,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    retry,
    staleTime,
    handlers = {},
  } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['aceCampTestDimensionsGET', args],
    () => dimensionsGET(Constants, args, handlers),
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      onSuccess: () =>
        queryClient.invalidateQueries(['aceCampTestDimensionsGETS']),
    }
  );
};

export const FetchDimensionsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  refetchOnReconnect,
  retry,
  staleTime,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useDimensionsGET(
    {},
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      handlers: { onData, ...handlers },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchDimensions: refetch });
};

export const feedsGET = async (
  Constants,
  {
    content_language_preference,
    custom_sector_ids,
    follow,
    recommend_search,
    vip,
  },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['recommend'] = 'true';
  paramsDict['version'] = '2.0';
  if (content_language_preference !== undefined) {
    paramsDict['content_language_preference'] = content_language_preference;
  }
  if (custom_sector_ids !== undefined) {
    paramsDict['custom_sector_ids'] = custom_sector_ids;
  }
  if (recommend_search !== undefined) {
    paramsDict['recommend_search'] = recommend_search;
  }
  if (follow !== undefined) {
    paramsDict['follow'] = follow;
  }
  if (vip !== undefined) {
    paramsDict['vip'] = vip;
  }
  const url = `https://api.acecamptech.com/api/v1/feeds${renderQueryString(
    paramsDict,
    'brackets'
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Cookie: Constants['cookie'],
      'User-Agent': 'AceCamp/1.6.0(100)',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useFeedsGET = (
  args = {},
  {
    refetchInterval,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    retry,
    staleTime,
    handlers = {},
  } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['aceCampTestFeedsGET', args],
    () => feedsGET(Constants, args, handlers),
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      onSuccess: () => queryClient.invalidateQueries(['aceCampTestFeedsGETS']),
    }
  );
};

export const FetchFeedsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  refetchOnReconnect,
  retry,
  staleTime,
  content_language_preference,
  custom_sector_ids,
  follow,
  recommend_search,
  vip,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useFeedsGET(
    {
      content_language_preference,
      custom_sector_ids,
      follow,
      recommend_search,
      vip,
    },
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      handlers: { onData, ...handlers },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchFeeds: refetch });
};

export const feeds2GET = async (
  Constants,
  {
    content_language_preference,
    custom_sector_ids,
    follow,
    recommend_search,
    vip,
  },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['recommend'] = 'true';
  paramsDict['version'] = '2.0';
  if (content_language_preference !== undefined) {
    paramsDict['content_language_preference'] = content_language_preference;
  }
  if (custom_sector_ids !== undefined) {
    paramsDict['custom_sector_ids'] = custom_sector_ids;
  }
  if (recommend_search !== undefined) {
    paramsDict['recommend_search'] = recommend_search;
  }
  if (follow !== undefined) {
    paramsDict['follow'] = follow;
  }
  if (vip !== undefined) {
    paramsDict['vip'] = vip;
  }
  const url = `https://api.acecamptech.com/api/v1/feeds${renderQueryString(
    paramsDict,
    'brackets'
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Cookie: Constants['cookie'],
      'User-Agent': 'AceCamp/1.6.0(100)',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useFeeds2GET = (
  args = {},
  {
    refetchInterval,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    retry,
    staleTime,
    handlers = {},
  } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['aceCampTestFeeds2GET', args],
    () => feeds2GET(Constants, args, handlers),
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      onSuccess: () => queryClient.invalidateQueries(['aceCampTestFeeds2GETS']),
    }
  );
};

export const FetchFeeds2GET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  refetchOnReconnect,
  retry,
  staleTime,
  content_language_preference,
  custom_sector_ids,
  follow,
  recommend_search,
  vip,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useFeeds2GET(
    {
      content_language_preference,
      custom_sector_ids,
      follow,
      recommend_search,
      vip,
    },
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      handlers: { onData, ...handlers },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchFeeds2: refetch });
};

export const hotGET = async (
  Constants,
  {
    content_language_preference,
    custom_sector_ids,
    follow,
    recommend_search,
    vip,
  },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['collection'] = 'hot';
  paramsDict['version'] = '2.0';
  if (content_language_preference !== undefined) {
    paramsDict['content_language_preference'] = content_language_preference;
  }
  if (custom_sector_ids !== undefined) {
    paramsDict['custom_sector_ids'] = custom_sector_ids;
  }
  if (recommend_search !== undefined) {
    paramsDict['recommend_search'] = recommend_search;
  }
  if (follow !== undefined) {
    paramsDict['follow'] = follow;
  }
  if (vip !== undefined) {
    paramsDict['vip'] = vip;
  }
  paramsDict['topping'] = 'false';
  const url = `https://api.acecamptech.com/api/v1/feeds${renderQueryString(
    paramsDict,
    'brackets'
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      Cookie: Constants['cookie'],
      'User-Agent': 'AceCamp/1.6.0(100)',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useHotGET = (
  args = {},
  {
    refetchInterval,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    retry,
    staleTime,
    handlers = {},
  } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['aceCampTestHotGET', args],
    () => hotGET(Constants, args, handlers),
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      onSuccess: () => queryClient.invalidateQueries(['aceCampTestHotGETS']),
    }
  );
};

export const FetchHotGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  refetchOnReconnect,
  retry,
  staleTime,
  content_language_preference,
  custom_sector_ids,
  follow,
  recommend_search,
  vip,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useHotGET(
    {
      content_language_preference,
      custom_sector_ids,
      follow,
      recommend_search,
      vip,
    },
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      handlers: { onData, ...handlers },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchHot: refetch });
};

export const regionsGET = async (Constants, { page }, handlers = {}) => {
  const paramsDict = {};
  paramsDict['deep_size'] = '1';
  if (page !== undefined) {
    paramsDict['page'] = page;
  }
  paramsDict['per_page'] = '20';
  const url = `https://api.acecamptech.com/api/v1/regions${renderQueryString(
    paramsDict,
    'brackets'
  )}`;
  const options = {
    headers: cleanHeaders({
      Accept: 'application/json',
      'User-Agent': 'AceCamp/1.6.0(100)',
    }),
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useRegionsGET = (
  args = {},
  {
    refetchInterval,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    retry,
    staleTime,
    handlers = {},
  } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['aceCampTestRegionsGET', args],
    () => regionsGET(Constants, args, handlers),
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      onSuccess: () =>
        queryClient.invalidateQueries(['aceCampTestRegionsGETS']),
    }
  );
};

export const FetchRegionsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  refetchOnReconnect,
  retry,
  staleTime,
  page,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useRegionsGET(
    { page },
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      handlers: { onData, ...handlers },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchRegions: refetch });
};

export const requestCodePOST = async (
  Constants,
  { code_scope, country_code_id, email, phone_number, scene },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['country_code_id'] =
    country_code_id !== undefined ? country_code_id : '';
  paramsDict['scene'] = scene !== undefined ? scene : '';
  if (code_scope !== undefined) {
    paramsDict['code_scope'] = code_scope;
  }
  if (phone_number !== undefined) {
    paramsDict['phone_number'] = phone_number;
  }
  if (email !== undefined) {
    paramsDict['email'] = email;
  }
  const url = `https://api.acecamptech.com/api/v1/users/request_code${renderQueryString(
    paramsDict,
    'brackets'
  )}`;
  const options = {
    body: JSON.stringify({ key: 'value' }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'User-Agent': 'AceCamp/1.6.0(100)',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useRequestCodePOST = (
  args = {},
  {
    refetchInterval,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    retry,
    staleTime,
    handlers = {},
  } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['aceCampTestRequestCodePOST', args],
    () => requestCodePOST(Constants, args, handlers),
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      onSuccess: () =>
        queryClient.invalidateQueries(['aceCampTestRequestCodePOSTS']),
    }
  );
};

export const FetchRequestCodePOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  refetchOnReconnect,
  retry,
  staleTime,
  code_scope,
  country_code_id,
  email,
  phone_number,
  scene,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useRequestCodePOST(
    { code_scope, country_code_id, email, phone_number, scene },
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      handlers: { onData, ...handlers },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchRequestCode: refetch });
};

export const spotlightsGET = async (
  Constants,
  { custom_sector_ids },
  handlers = {}
) => {
  const paramsDict = {};
  paramsDict['version'] = '2.0';
  paramsDict['per_page'] = '15';
  if (custom_sector_ids !== undefined) {
    paramsDict['custom_sector_ids'] = custom_sector_ids;
  }
  paramsDict['page'] = '1';
  const url = `https://api.acecamptech.com/api/v1/spotlights${renderQueryString(
    paramsDict,
    'brackets'
  )}`;
  console.log('use cookie : ' + Constants['cookie']);
  const options = {
    headers: {
      Accept: 'application/json',
      Cookie: Constants['cookie'],
      'User-Agent': 'AceCamp/1.6.0(100)',
    },
    credentials: 'include',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useSpotlightsGET = (
  args = {},
  {
    refetchInterval,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    retry,
    staleTime,
    handlers = {},
  } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['aceCampTestSpotlightsGET', args],
    () => spotlightsGET(Constants, args, handlers),
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      onSuccess: () =>
        queryClient.invalidateQueries(['aceCampTestSpotlightsGETS']),
    }
  );
};

export const FetchSpotlightsGET = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  refetchOnReconnect,
  retry,
  staleTime,
  custom_sector_ids,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    refetch,
  } = useSpotlightsGET(
    { custom_sector_ids },
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      handlers: { onData, ...handlers },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchSpotlights: refetch });
};

export const usersLoginPOST = async (Constants, _args, handlers = {}) => {
  const url = `https://api.acecamptech.com/api/v1/users/login`;
  const options = {
    body: JSON.stringify({
      country_code_id: '+86',
      phone_number: '18611169707',
      email: '',
      code: '',
      password: 'Qwer1234',
    }),
    headers: cleanHeaders({
      Accept: 'application/json',
      'User-Agent': 'AceCamp/1.6.0(100)',
    }),
    method: 'POST',
  };
  const res = await fetch(url, options);
  return handleResponse(res, handlers);
};

export const useUsersLoginPOST = (
  args = {},
  {
    refetchInterval,
    refetchOnWindowFocus,
    refetchOnMount,
    refetchOnReconnect,
    retry,
    staleTime,
    handlers = {},
  } = {}
) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(
    ['aceCampTestUsersLoginPOST', args],
    () => usersLoginPOST(Constants, args, handlers),
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      onSuccess: () =>
        queryClient.invalidateQueries(['aceCampTestUsersLoginPOSTS']),
    }
  );
};

export const FetchUsersLoginPOST = ({
  children,
  onData = () => {},
  handlers = {},
  refetchInterval,
  refetchOnWindowFocus,
  refetchOnMount,
  refetchOnReconnect,
  retry,
  staleTime,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    isLoading: loading,
    data,
    error,
    mutate: refetch,
  } = useUsersLoginPOST(
    {},
    {
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnMount,
      refetchOnReconnect,
      retry,
      staleTime,
      handlers: { onData, ...handlers },
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  return children({ loading, data, error, refetchUsersLogin: refetch });
};

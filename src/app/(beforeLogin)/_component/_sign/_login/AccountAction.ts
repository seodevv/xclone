'use server';

interface AccountActionState {
  message:
    | 'idle'
    | 'ok'
    | 'invalid'
    | 'bad_request'
    | 'not_found'
    | 'network_error'
    | 'something_is_wrong';
}

const AccountAction = async (
  prevState: AccountActionState,
  formData: FormData
): Promise<AccountActionState> => {
  const id = formData.get('id');
  if (!id || typeof id !== 'string' || !id.trim()) {
    return { message: 'invalid' };
  }

  const requestUrl = `/api/v1/login?type=login&id=${id}`;
  const requestOptions: RequestInit = {
    method: 'GET',
    credentials: 'include',
  };

  try {
    const response = await fetch(requestUrl, requestOptions);

    if (response.ok) {
      return { message: 'ok' };
    }

    switch (response.status) {
      case 400:
        return { message: 'bad_request' };
      case 404:
        return { message: 'not_found' };
      default:
        return { message: 'something_is_wrong' };
    }
  } catch (error) {
    console.error(error);
    return { message: 'network_error' };
  }
};

export default AccountAction;

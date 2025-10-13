'use server';

interface LoginActionState {
  message:
    | 'idle'
    | 'ok'
    | 'bad_request'
    | 'invalid'
    | 'incorrect'
    | 'server_error'
    | 'something_is_wrong'
    | 'network_error';
}

const LoginAction = async (
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  const id = formData.get('id');
  const password = formData.get('password');

  if (
    !id ||
    typeof id !== 'string' ||
    !id.trim() ||
    !password ||
    typeof password !== 'string'
  ) {
    return { message: 'invalid' };
  }

  const requestUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`;
  const requestOptions: RequestInit = {
    method: 'POST',
    body: formData,
  };

  try {
    const response = await fetch(requestUrl, requestOptions);

    switch (response.status) {
      case 200:
        return { message: 'ok' };
      case 400:
        return { message: 'bad_request' };
      case 403:
        return { message: 'incorrect' };
      case 500:
        return { message: 'server_error' };
      default:
        return { message: 'something_is_wrong' };
    }
  } catch (error) {
    return { message: 'network_error' };
  }
};

export default LoginAction;

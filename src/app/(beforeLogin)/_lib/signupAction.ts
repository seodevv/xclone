'use server';

const signupAction = async (
  prevState: { message: string; user?: { id: string; password: string } },
  formData: FormData
) => {
  const id = formData.get('id');
  const password = formData.get('password');
  const nickname = formData.get('nickname');
  const image = formData.get('image');

  if (!id || typeof id !== 'string' || !id.trim()) {
    return { message: 'invalid_id' };
  }

  if (!password || typeof password !== 'string' || !password.trim()) {
    return { message: 'invalid_password' };
  }

  if (!nickname || typeof nickname !== 'string' || !nickname.trim()) {
    return { message: 'invalid_nickname' };
  }

  if (!image || typeof image !== 'object' || image.size === 0) {
    return { message: 'invalid_image' };
  }

  const allowExt = ['png', 'gif', 'jpeg'];
  if (!allowExt.includes(image.type.split('/')[1])) {
    return { message: 'invalid_image_type' };
  }

  try {
    const requestUrl = `${process.env.SERVER_URL}/api/users`;
    const options: RequestInit = {
      method: 'post',
      body: formData,
      credentials: 'include',
    };
    const response = await fetch(requestUrl, options);

    if ([400, 500].includes(response.status)) {
      return { message: 'server_error' };
    } else if (response.status === 403) {
      return { message: 'duplicated' };
    }

    return { message: '', user: { id, password } };
  } catch (error) {
    console.error(error);
    return { message: 'server_error' };
  }
};

export default signupAction;

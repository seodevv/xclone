export const generateImagePath = (image: string) => {
  const regex = /^http?s/;
  return regex.test(image)
    ? image
    : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/image/${image}`;
};

export const translateKorean = (message: string) => {
  switch (message) {
    case 'invalid_id':
      return '올바른 아이디를 입력해주세요.';
    case 'invalid_password':
      return '올바른 패스워드를 입력해주세요.';
    case 'invalid_nickname':
      return '올바른 닉네임을 입력해주세요.';
    case 'invalid_image':
      return '올바른 이미지를 선택해주세요';
    case 'invalid_image_type':
      return '올바른 이미지 형식(jpg, png, gif)를 선택해주세요.';
    case 'incorrect_id_password':
      return '아이디/패스워드를 확인해주세요.';
    case 'duplicated':
      return '이미 존재하는 아이디입니다.';
    case 'server_error':
    default:
      return '(서버 에러) 잠시 후 다시 시도해주세요.';
  }
};

export const unitConversion = (num: number) => {
  const isKilo = num >= 1000;
  const isMillion = num >= 1000000;

  if (isMillion) {
    return `${Math.round(num / 100000) / 10}M`;
  }

  if (isKilo) {
    return `${Math.round(num / 100) / 10}K`;
  }

  return parseInt(num.toString());
};

export const getFileDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Failed to read file');
      }
    };
    reader.onerror = () => {
      reject('Failed to read file');
    };
  });
};

export const getImageMeta = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const _url = window.URL || window.webkitURL;
    const image = new Image();
    image.src = _url.createObjectURL(file);
    image.onload = () => {
      resolve({ width: image.width, height: image.height });
    };
    image.onerror = () => {
      reject('Not an image format.');
    };
  });
};

export const captialCase = (word: string) => {
  return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
};

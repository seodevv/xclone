import { InfiniteData } from '@tanstack/react-query';

export const generateImagePath = (image: string) => {
  // if (!image) {
  //   return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/image/default_profile.png`;
  // }

  const regex = /^http?s|^data:image/;
  return regex.test(image)
    ? image
    : `${process.env.NEXT_PUBLIC_SERVER_URL}/api/image/${image}`;
};

export const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const characterLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characterLength));
  }

  return result;
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

  return num.toString();
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

export const getYearsArray = () => {
  return new Array(200)
    .fill(undefined)
    .map((v, i) => {
      const year = new Date().getFullYear() - i;
      return year >= 1920 ? year : undefined;
    })
    .filter((v) => typeof v !== 'undefined');
};

export const getMonthsArray = () => {
  return new Array(12).fill(undefined).map((v, i) => i + 1);
};

export const getDaysArray = (date: Date) => {
  const day = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return new Array(day.getDate()).fill(undefined).map((v, i) => i + 1);
};

export const getLastDay = (date: Date) => {
  const temp = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return temp.getDate();
};

export const DAY_EN = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const MONTH_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const splitEmoji = (string: string) => {
  return [...new Intl.Segmenter().segment(string)].map((x) => x.segment);
};

export const delay = (duration: number) =>
  new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, duration);
  });

export function isSingleData<T, K>(
  data:
    | { data: T; message: string }
    | InfiniteData<{ data: T[]; nextCursor?: K; message: string }, K>
): data is { data: T; message: string } {
  return Object.hasOwn(data, 'data');
}

export const IMAGE_DEFAULT_PROFILE = generateImagePath('default_profile.png');
export const IMAGE_DEFAULT_LISTS = generateImagePath('default_lists.png');

export function generateStringToNumberHash(str: string) {
  let hash = 0;
  let chr;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  if (hash < 0) return Math.abs(hash);
  return hash;
}

export const hashString = (str: string) => {
  const salt = 'secret';
  const textToChars = (text: string) =>
    text.split('').map((c) => c.charCodeAt(0));
  const byteHex = (n: number) => ('0' + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: number) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return str
    .split('')
    .map((v) => v.charCodeAt(0))
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

export const unHashString = (encoded: string) => {
  const salt = 'secret';
  const textToChars = (text: string) =>
    text.split('').map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: number) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return encoded
    .match(/.{1,2}/g)!
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join('');
};

export const encryptRoomId = (senderId: string, receiverId: string) => {
  const a = hashString(senderId);
  const b = hashString(receiverId);
  return [a, b].sort().join('-');
};

export const decryptRoomId = ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) => {
  const [a, b] = roomId.split('-');
  const u1 = unHashString(a);
  const u2 = unHashString(b);
  const receiverId = userId === u1 ? u2 : u1;
  return receiverId;
};

export function dataURLtoFile(dataurl: string, filename: string) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)?.at(1);
  let bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

import { Area } from 'react-easy-crop';

interface CroppedImageParams {
  imageSrc: string;
  pixelCrop: Area;
  rotation: number;
  fileName?: string;
  type?: string;
  flip?: { horizontal: boolean; vertical: boolean };
}

export const getCroppedImage = async ({
  imageSrc,
  pixelCrop,
  rotation,
  fileName = 'profile.webp',
  type = 'image/webp',
  flip = { horizontal: false, vertical: false },
}: CroppedImageParams) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) return null;

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  const dataUrl = croppedCanvas.toDataURL(type);
  const blobBin = atob(dataUrl.split(',')[1]);
  const arr = [];
  for (let i = 0; i < blobBin.length; i++) {
    arr.push(blobBin.charCodeAt(i));
  }
  const file = new File([new Uint8Array(arr)], fileName, {
    type,
  });

  return {
    file,
    dataUrl,
  };
};

export const createImage = (imageSrc: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    // image.setAttribute('crossOrigin', 'anonymous');
    image.src = imageSrc;
  });
};

const getRadianAngle = (degressValue: number) => {
  return (degressValue * Math.PI) / 180;
};

const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

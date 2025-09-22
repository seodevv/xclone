import { generateImagePath } from '@/app/_lib/common';
import utils from '@/app/utility.module.css';
import cx from 'classnames';
import Image from 'next/image';

interface Props {
  image: {
    src: string;
    alt?: string;
    width: number;
    height: number;
  };
  backgroundColor?: string;
}

export default function ImageContainer({
  image,
  backgroundColor = 'rgba(62, 65, 68)',
}: Props) {
  return (
    <div
      className={cx(utils.flexGrow_1, utils.relative, utils.of_hide)}
      style={{ backgroundColor }}
    >
      <div className={cx(utils.pb_100, utils.w_100p)}></div>
      <div
        className={cx(
          utils.absolute,
          utils.t_r_b_l_0,
          utils.w_100p,
          utils.h_100p
        )}
      >
        <Image
          className={cx(utils.w_100p, utils.h_100p)}
          alt={image.alt ? image.alt : image.src}
          src={generateImagePath(image.src)}
          width={image.width}
          height={image.height}
        />
      </div>
    </div>
  );
}

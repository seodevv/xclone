import styles from './photoEditor.module.css';
import utils from '@/app/utility.module.css';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Cropper, { Area, CropperProps } from 'react-easy-crop';
import cx from 'classnames';
import PrevButton from '@/app/(beforeLogin)/_component/_button/PrevButton';
import FlexButton from '@/app/(beforeLogin)/_component/_button/FlexButton';
import ZoomSvg from '@/app/_svg/post/ZoomSvg';
import { getCroppedImage } from '@/app/_lib/photoCropper';
import useAlterModal from '@/app/_hooks/useAlterModal';

interface Props {
  imageSrc: string;
  fileName?: string;
  type?: string;
  title?: string;
  aspect?: number;
  cropShape?: 'rect' | 'round';
  objectFit?: 'contain' | 'cover' | 'horizontal-cover' | 'vertical-cover';
  onClose?: () => void;
  onComplete?: (dataUrl: string, file: File) => void;
}

export default function PhotoEditor({
  imageSrc,
  fileName,
  type,
  title = 'Edit media',
  aspect = 1 / 1,
  cropShape = 'round',
  objectFit = 'horizontal-cover',
  onClose,
  onComplete,
}: Props) {
  const { alterMessage } = useAlterModal();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [control, setControl] = useState({
    flag: false,
    grow: 0,
    offsetWidth: 0,
    zoom: {
      min: 1,
      max: 3,
    },
  });
  const sliderRef = useRef<HTMLDivElement>(null);

  const onClickPrev = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  const onChangeZoom: CropperProps['onZoomChange'] = (zoom) => {
    setZoom(zoom);
    setControl((prev) => ({
      ...prev,
      grow: (zoom - prev.zoom.min) / (prev.zoom.max - prev.zoom.min),
    }));
  };
  const onCropComplete: CropperProps['onCropComplete'] = (
    _,
    croppedAreaPixels
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const onCropApply: MouseEventHandler<HTMLButtonElement> = () => {
    onCroppedImage();
  };
  const onCroppedImage = async () => {
    try {
      if (!croppedAreaPixels) return;
      const cropped = await getCroppedImage({
        imageSrc,
        pixelCrop: croppedAreaPixels,
        rotation,
        fileName,
        type,
      });
      if (cropped && typeof onComplete === 'function') {
        onComplete(cropped.dataUrl, cropped.file);
      }
    } catch (error) {
      alterMessage(
        'An error occurred while editing your photo.\nPlease try again.',
        'error',
        3000
      );
      console.error(error);
    }
  };

  const sliderHandler = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const { offsetWidth } = sliderRef.current;
      const { x } = sliderRef.current.getBoundingClientRect();

      const relativeX = clientX - x;
      const per = relativeX / offsetWidth;
      let grow = per;
      let zoom = (control.zoom.max - control.zoom.min) * per + 1;
      if (per < 0) {
        grow = 0;
        zoom = control.zoom.min;
      } else if (per > 1) {
        grow = 1;
        zoom = control.zoom.max;
      }
      setZoom(zoom);
      setControl((prev) => ({ ...prev, grow }));
    },
    [control.zoom, setZoom, setControl]
  );

  useEffect(() => {
    const mouseUp = () => {
      setControl((prev) => ({ ...prev, flag: false }));
    };
    const mouseMove = (e: MouseEvent) => {
      sliderHandler(e.clientX);
    };
    if (control.flag) {
      window.addEventListener('mouseup', mouseUp);
      window.addEventListener('mousemove', mouseMove);
    }
    return () => {
      if (control.flag) {
        window.removeEventListener('mouseup', mouseUp);
        window.removeEventListener('mousemove', mouseMove);
      }
    };
  }, [control.flag, control.zoom, setControl, sliderHandler]);

  useLayoutEffect(() => {
    setControl((prev) => {
      if (sliderRef.current) {
        return { ...prev, offsetWidth: sliderRef.current.offsetWidth };
      }
      return prev;
    });
  }, []);

  return (
    <div className={cx(styles.photoEditor, utils.fadeIn)}>
      <div className={styles.header}>
        <div className={styles.prev}>
          <PrevButton onClick={onClickPrev} />
        </div>
        <div className={styles.title}>
          <span>{title}</span>
        </div>
        <div>
          <FlexButton
            text="Apply"
            style={{ minHeight: 32 }}
            onClick={onCropApply}
          />
        </div>
      </div>
      <div className={cx(utils.relative, utils.flexGrow_1)}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          cropShape={cropShape}
          objectFit={objectFit}
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={onChangeZoom}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          style={{
            cropAreaStyle: { border: '4px solid rgb(29, 155, 240)' },
          }}
        />
      </div>
      <div className={styles.controller}>
        <div className={styles.controls}>
          <div className={cx(utils.pt_4, utils.mr_12)}>
            <ZoomSvg type="out" />
          </div>
          <div
            ref={sliderRef}
            className={styles.slider}
            onMouseDown={() => {
              setControl((prev) => ({ ...prev, flag: true }));
            }}
            onClick={(e) => sliderHandler(e.clientX)}
          >
            <div className={styles.bar}>
              <div className={styles.baseline}></div>
              <div
                className={styles.progress}
                style={{ flexGrow: control.grow }}
              ></div>
              <div
                className={styles.thumb}
                style={{
                  left: `calc(${control.grow * 100}% - ${16 * control.grow}px)`,
                }}
              >
                <div className={styles.dot}></div>
              </div>
            </div>
          </div>
          <div className={cx(utils.pt_4, utils.ml_12)}>
            <ZoomSvg type="in" />
          </div>
        </div>
      </div>
    </div>
  );
}

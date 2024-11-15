'use client';

import useSettingsLocalStore, {
  AccessibilitySelector,
} from '@/app/(afterLogin)/_store/SettingsLocalStore';
import SettingsSubMenu from '@/app/(afterLogin)/settings/_component/SettingsSubMenu';
import IdentifierCheckBox from '@/app/_component/_input/IdentifierCheckBox';
import Text from '@/app/_component/_text/Text';
import DivideLine from '@/app/_component/_util/DivideLine';

export default function SettingsAccessibility() {
  const { accessibility, setAccessibility } = useSettingsLocalStore(
    AccessibilitySelector
  );

  return (
    <div>
      <Text size="xl" bold="boldest" pad>
        Vision
      </Text>
      <IdentifierCheckBox
        title={'Increase color contrast'}
        sub={
          'Improves legibility by increasing the contrast between text and background colors.'
        }
        noMargin
        noPad={false}
        defaultValue={accessibility.vision.contrast}
        onChange={(value) => setAccessibility({ vision: { contrast: value } })}
      />
      <DivideLine />
      <Text size="xl" bold="boldest" pad>
        Motion
      </Text>
      <IdentifierCheckBox
        title={'Reduce motion'}
        sub={
          'Limits the amount of in-app animations, including live engagement counts.'
        }
        noMargin
        noPad={false}
        defaultValue={accessibility.motion.reduce}
        onChange={(value) =>
          setAccessibility({
            motion: { reduce: value, autoplay: accessibility.motion.autoplay },
          })
        }
      />
      <IdentifierCheckBox
        title={'Autoplay'}
        sub={'On cellular or Wi-Fi'}
        noMargin
        noPad={false}
        defaultValue={accessibility.motion.autoplay}
        onChange={(value) =>
          setAccessibility({
            motion: { reduce: accessibility.motion.reduce, autoplay: value },
          })
        }
      />
      <DivideLine />
      <Text size="xl" bold="boldest" pad>
        Media
      </Text>
      <IdentifierCheckBox
        title={'Receive image description reminder'}
        sub={
          'Enables a reminder to add image descriptions before a post can be sent.'
        }
        noMargin
        noPad={false}
        defaultValue={accessibility.media.reminder}
        onChange={(value) => setAccessibility({ media: { reminder: value } })}
      />
      <DivideLine />
      <Text size="xl" bold="boldest" pad>
        Learn more about accessibility at X
      </Text>
      <SettingsSubMenu
        type="link"
        href="https://help.x.com/resources/accessibility"
        title="Accessibility at X"
        external
      />
    </div>
  );
}

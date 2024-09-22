import { Fragment } from 'react';
import styles from './userDesc.module.css';
import Link from 'next/link';

interface Props {
  desc?: string;
}

export default function UserDesc({ desc }: Props) {
  if (!desc) return null;

  const split = desc.split(/\r\n|\r|\n/);

  return (
    <div className={styles.description}>
      {split.map((t, i) => (
        <AnalysisText key={i} text={t} />
      ))}
    </div>
  );
}

export function AnalysisText({ text }: { text: string }) {
  const regex =
    /((?:@|#)[a-zA-Z가-힣0-9_]+)|((?:http|https):\/\/)?(?:www.)?(?:[a-zA-Z0-9]+)\.[a-z]+(?:[a-zA-z0-9.?#/]+)/g;
  const analaysis = [...text.matchAll(regex)];

  if (analaysis.length === 0) {
    return (
      <div>
        <span>{text}</span>
      </div>
    );
  }

  return (
    <div>
      {analaysis.map((v, i) => {
        const matched = v[0];
        const prevIndex =
          i === 0 ? 0 : analaysis[i - 1].index + analaysis[i - 1][0].length;
        const index = v.index;
        const isMention = /^@/.test(matched);
        const isHashtag = /^#/.test(matched);
        const href = isMention
          ? `/${matched.replace('@', '')}`
          : isHashtag
          ? `/search?q=${encodeURIComponent(matched)}`
          : /^http?/.test(matched)
          ? matched
          : `//${matched}`;
        const target = !isMention && !isHashtag ? '_blank' : undefined;
        return (
          <Fragment key={i}>
            <span>{text.substring(prevIndex, index)}</span>
            <Link className={styles.link} href={href} target={target}>
              {matched}
            </Link>
          </Fragment>
        );
      })}
      {analaysis.length !== 0 && (
        <span>
          {text.substring(
            analaysis[analaysis.length - 1].index +
              analaysis[analaysis.length - 1][0].length
          )}
        </span>
      )}
    </div>
  );
}

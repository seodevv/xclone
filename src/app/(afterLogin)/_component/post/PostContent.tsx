import { CSSProperties } from 'react';

interface Props {
  className?: string;
  style?: CSSProperties;
  content: string;
}

export default function PostContent({ className, style, content }: Props) {
  const splited = content.split(/\r\n|\r|\n/);

  return (
    <div className={className} style={style}>
      {splited.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  );
}

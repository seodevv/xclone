import GlobalSvg from '@/app/_svg/post/GlobalSvg';
import styles from './whoCanReply.module.css';
import SubMenuWrapper from '@/app/(afterLogin)/_component/_subMenu/SubMenuWrapper';
import CheckSvg from '@/app/_svg/input/CheckSvg';
import ProfileSvg from '@/app/_svg/navbar/ProfileSvg';
import ProfileWithCheckSvg from '@/app/_svg/post/ProfileWithCheckSvg';
import VerifiedSvg from '@/app/_svg/post/VerifiedSvg';
import { captialCase } from '@/app/_lib/common';
import { useContext } from 'react';
import { SubMenuContext } from '@/app/(afterLogin)/_provider/SubMenuProvider';
import usePostScopeMutation from '@/app/(afterLogin)/_hooks/usePostScopeMutation';
import { useQueryClient } from '@tanstack/react-query';
import useAlterModal from '@/app/_hooks/useAlterModal';
import { AdvancedPost } from '@/model/Post';

interface Options {
  id: number;
  text: string;
  active: 'every' | 'follow' | 'verified' | 'only';
  svg: React.ReactNode;
}

interface Props {
  post: AdvancedPost;
}

export default function WhoCanReply({ post }: Props) {
  const { alterMessage } = useAlterModal();
  const { close } = useContext(SubMenuContext);

  const options: Options[] = [
    {
      id: 0,
      text: 'everyone',
      active: 'every',
      svg: <GlobalSvg width={20} theme="white" />,
    },
    {
      id: 1,
      text: 'Accounts you follow',
      active: 'follow',
      svg: <ProfileWithCheckSvg width={20} theme="white" />,
    },
    {
      id: 2,
      text: 'verified accounts',
      active: 'verified',
      svg: <VerifiedSvg width={20} theme="white" />,
    },
    {
      id: 3,
      text: 'only you',
      active: 'only',
      svg: <ProfileSvg width={20} theme="white" />,
    },
  ];

  const queryClient = useQueryClient();
  const scopeMutation = usePostScopeMutation();
  const scopeHandler = (scope: Options['active']) => {
    scopeMutation.mutate({
      queryClient,
      post,
      scope,
    });

    switch (scope) {
      case 'every':
        alterMessage('Everyone can reply now');
        break;
      case 'follow':
        alterMessage('Accounts you follow can reply now');
        break;
      case 'verified':
        alterMessage('Verified accounts can reply now');
        break;
      case 'only':
        alterMessage('Only you can reply now');
        break;
    }

    close();
  };

  return (
    <SubMenuWrapper>
      <div className={styles.whoCanReply}>
        <div className={styles.description}>
          <div className={styles.title}>
            <span>Who can reply?</span>
          </div>
          <div className={styles.sub}>
            <span>
              Choose who can reply to this post. Anyone mentioned can always
              reply.
            </span>
          </div>
        </div>
        <div className={styles.selector}>
          {options.map((option) => (
            <div
              key={option.id}
              className={styles.option}
              onClick={() => scopeHandler(option.active)}
            >
              <div className={styles.icon}>{option.svg}</div>
              <div className={styles.scope}>
                <span>{captialCase(option.text)}</span>
              </div>
              {(typeof post?.scope === 'undefined'
                ? option.active === 'every'
                : post.scope === option.active) && (
                <div className={styles.checked}>
                  <CheckSvg width={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SubMenuWrapper>
  );
}

import utils from '@/app/utility.module.css';
import cx from 'classnames';
import TextLink from '@/app/(afterLogin)/_component/Link/TextLink';
import NoPost from '@/app/(afterLogin)/_component/post/NoPost';

export default function NoLists() {
  return (
    <NoPost
      title="Your Lists are empty"
      message="You’ll need to create a List before adding someone.
"
    >
      <div className={cx(utils.d_flexRow, utils.flex_justiStart)}>
        <TextLink
          theme="primary"
          text="Create a List"
          size="large"
          href="/i/lists/create"
          scroll={false}
        />
      </div>
    </NoPost>
  );
}

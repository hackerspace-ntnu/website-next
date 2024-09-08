import { cx } from '@/lib/utils';

import {
  MemberCard,
  type MemberCardProps,
} from '@/components/members/MemberCard';

function MemberViewCard(props: MemberCardProps) {
  return (
    <MemberCard
      {...props}
      className={cx('custom-styling', props.className)} // Apply custom styling
    />
  );
}

export { MemberViewCard };

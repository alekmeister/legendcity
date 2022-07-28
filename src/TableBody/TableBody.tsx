import React, { useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from 'store/types';

interface Props {
  cb: () => void;
}
export const TableBody: React.FC<Props> = ({ cb }) => {
  const ref = useRef(null);

  const { users, isEmptyMoreData, isOpenModal } = useAppSelector((state) => state.users);

  const infinityObserver = new IntersectionObserver(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        if (!isEmptyMoreData) {
          cb();
        }
      }
    },
    { threshold: 1.0 }
  );

  useEffect(() => {
    const currentTarget = ref.current;
    if (currentTarget) infinityObserver.observe(currentTarget);
    return () => {
      if (currentTarget) infinityObserver.unobserve(currentTarget);
      infinityObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, isOpenModal]);

  return (
    <tbody>
      {users.map((user, idx, array) => (
        <React.Fragment key={uuidv4()}>
          <tr className="tbody_tr" key={uuidv4()}>
            {(Object.keys(user) as (keyof typeof user)[]).map((key) => (
              <td className="tbody_td" key={uuidv4()}>
                {user[key]}
              </td>
            ))}
          </tr>
          {idx === array.length - 1 && <tr ref={ref} key={uuidv4()} style={{ height: '1px' }} />}
        </React.Fragment>
      ))}
    </tbody>
  );
};

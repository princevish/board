import { Avatar } from "./Avatar";
import styles from "./ActiveUsers.module.css";
import { useOthers, useSelf } from "@/liveblocks.config";
import { generateRandomName } from "@/lib/utils";
import { useMemo } from "react";

const ActiveUsers = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 5;

  const memoizedUsers = useMemo(
    () => (
      <main className="flex items-center justify-center gap-1 py-2">
        <div className="flex pl-3">
          {currentUser && (
            <Avatar
              name="You"
              otherStyles="border-[3px] boarder-primary-green"
            />
          )}
          {users.slice(0, 5).map(({ connectionId }) => {
            return (
              <Avatar
                key={connectionId}
                name={generateRandomName()}
                otherStyles="-ml-3"
              />
            );
          })}

          {hasMoreUsers && (
            <div className={styles.more}>+{users.length - 5}</div>
          )}
        </div>
      </main>
    ),
    [users.length]
  );

  return memoizedUsers;
};

export default ActiveUsers;

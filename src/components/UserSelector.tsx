import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[] | null;
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUser,
  setSelectedUser,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isDropdownOpen,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>Choose a user</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users &&
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': selectedUser?.id === user.id,
                })}
                onClick={() => {
                  setSelectedUser(user);
                  setIsDropdownOpen(false);
                }}
              >
                {user.name}
              </a>
            ))}
          {/* <a href="#user-1" className="dropdown-item">
            Leanne Graham
          </a>
          <a href="#user-2" className="dropdown-item is-active">
            Ervin Howell
          </a>
          <a href="#user-3" className="dropdown-item">
            Clementine Bauch
          </a>
          <a href="#user-4" className="dropdown-item">
            Patricia Lebsack
          </a>
          <a href="#user-5" className="dropdown-item">
            Chelsey Dietrich
          </a> */}
        </div>
      </div>
    </div>
  );
};

import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUserPosts, getUsers } from './api/users';
import { Post } from './types/Post';
import { getPostComments } from './api/comments';
import { Comment } from './types/Comment';

export const App = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState<
    Comment[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [postsLoadingError, setPostsLoadingError] = useState('');
  const [commentsLoadingError, setCommentsLoadingError] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');

    getUsers()
      .then(setUsers)
      .catch(error => {
        setErrorMessage('Unable to load users');
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setPostsLoadingError('');

    if (selectedUser) {
      getUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(error => {
          setPostsLoadingError("Unable to load user's posts");
          throw error;
        })
        .finally(() => setLoading(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    setCommentsLoading(true);
    setCommentFormOpened(false);

    if (selectedPost !== null) {
      getPostComments(selectedPost.id)
        .then(setSelectedPostComments)
        .catch(error => {
          setCommentsLoadingError('Unable to load post commnets');
          throw error;
        })
        .finally(() => {
          setCommentsLoading(false);
        });
    }
  }, [selectedPost]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loading && <Loader />}

                {postsLoadingError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userPosts?.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userPosts !== null && userPosts?.length !== 0 && (
                  <PostsList
                    userPosts={userPosts}
                    setSelectedPost={setSelectedPost}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost !== null && (
                <PostDetails
                  selectedPost={selectedPost}
                  selectedPostComments={selectedPostComments}
                  commentsLoading={commentsLoading}
                  commentsLoadingError={commentsLoadingError}
                  commentFormOpened={commentFormOpened}
                  setCommentFormOpened={setCommentFormOpened}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentComponent } from './CommentComponent';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  selectedPostComments: Comment[] | null;
  commentsLoading: boolean;
  commentsLoadingError: string;
  commentFormOpened: boolean;
  setCommentFormOpened: (arg: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  selectedPostComments,
  commentsLoading,
  commentsLoadingError,
  commentFormOpened,
  setCommentFormOpened,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {commentsLoading ? (
            <Loader />
          ) : (
            <>
              {commentsLoadingError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {selectedPostComments?.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {selectedPostComments?.length !== 0 && selectedPostComments && (
                <>
                  <p className="title is-4">Comments:</p>

                  {selectedPostComments.map(comment => (
                    <CommentComponent comment={comment} key={comment.id} />
                  ))}
                </>
              )}

              {!commentsLoadingError && !commentFormOpened && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setCommentFormOpened(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {commentFormOpened && <NewCommentForm />}
      </div>
    </div>
  );
};

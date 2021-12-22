import React, { FunctionComponent, useState } from 'react'
import { nanoid } from 'nanoid'

import * as S from './CommentSection.styled'
import { IComment } from '../../../models'
import { H2, P } from '../../../themes/typography'

interface Props {
  comments: IComment[] | undefined
  postComment: (newComment: IComment) => void
}

const CommentSection: FunctionComponent<Props> = ({ comments, postComment }) => {
  const [newComment, setNewComment] = useState<string>('')

  const postNewComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postComment({ id: nanoid(), text: newComment })
    setNewComment('')
  }

  return (
    <S.Wrapper data-testid="comments-section">
      <S.Form onSubmit={postNewComment}>
        <S.Input
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          data-testid="post-comment-input"
        />
        <S.Button data-testid="post-comment-button">post</S.Button>
      </S.Form>
      <H2>Comments</H2>
      {comments &&
        comments.map(comment => (
          <P key={comment.id} data-testid="comment">
            {comment.text}
          </P>
        ))}
    </S.Wrapper>
  )
}

export default CommentSection

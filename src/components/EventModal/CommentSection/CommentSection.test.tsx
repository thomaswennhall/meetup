import { shallow, mount, ReactWrapper } from 'enzyme'
import CommentSection from '.'
import mockEvents from '../../../models/mockData'

const comments = mockEvents[1].comments
const postComment = jest.fn()

describe('CommentSection component', () => {
  it('should render without errors', () => {
    shallow(<CommentSection comments={comments} postComment={postComment} />)
  })

  describe('Blackbox', () => {
    let wrapper: ReactWrapper
    beforeEach(() => {
      wrapper = mount(<CommentSection comments={comments} postComment={postComment} />)
    })

    it('should not render comments if there are none', () => {
      wrapper = mount(<CommentSection comments={undefined} postComment={postComment} />)
      const comments = wrapper.find('[data-testid="comment"]')
      expect(comments.exists()).toBeFalsy()
    })

    it('should render comments if there are any', () => {
      const comment = wrapper.find('[data-testid="comment"]')
      expect(comment.exists()).toBeTruthy()
    })

    it('should render an postComment input', () => {
      const input = wrapper.find('[data-testid="post-comment-input"]')
      expect(input.exists()).toBeTruthy()
    })

    it('should render an postComment button', () => {
      const button = wrapper.find('[data-testid="post-comment-button"]')
      expect(button.exists()).toBeTruthy()
    })

    it('should change input value when typing new comment', () => {
      const testInput = 'Lorem Ipsum'
      const input = wrapper.find('[data-testid="post-comment-input"]').first()

      input.simulate('change', { target: { value: testInput } })
      expect(input.render().val()).toBe(testInput)
    })
  })
})

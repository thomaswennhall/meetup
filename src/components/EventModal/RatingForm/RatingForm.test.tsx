import { mount, ReactWrapper, shallow } from 'enzyme'
import RatingForm from '.'

describe('RatingForm component', () => {
    it('should render without errors', () => {
        shallow(<RatingForm rate={jest.fn()} />)
    })

    describe('Blackbox', () => {
        let wrapper: ReactWrapper
        const rateFn = jest.fn()
        beforeEach(() => {
            wrapper = mount(<RatingForm rate={rateFn} />)
        })

        it('should have an input for changing event rating', () => {
            const ratingInput = wrapper.find('[data-testid="rating-input"]').first()
            expect(ratingInput.exists()).toBeTruthy()
        })
        it('should have a submit button', () => {
            const button = wrapper.find('[data-testid="rating-button"]').first()
            expect(button.exists()).toBeTruthy()
        })
        it('should call the method from props on submit', () => {
            const form = wrapper.find('form').first()
            form.simulate('submit')
            expect(rateFn).toHaveBeenCalled()
        })
    })
})
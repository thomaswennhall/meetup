import React, { useState } from 'react';
import { H3 } from '../../../themes/typography';

type RatingFormProps = {
    rate: (ratingValue: number) => void
}

const RatingForm:React.FC<RatingFormProps> = ({ rate }) => {
    const [newRating, setNewRating] = useState(5)

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        rate(newRating)
    }

    return (
        <div style={{display: 'flex', gap: '1rem'}}>
            <H3> Rate this meetup: </H3>
            <form data-testid="rating-form" onSubmit={e => submitHandler(e)} >
            <select data-testid="rating-input" value={newRating} onChange={e => setNewRating(+e.target.value)} style={{padding: '0.3rem'}}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
            <button data-testid="rating-button" type='submit'>post rating</button>
            </form>
        </div>
    )
}

export default RatingForm
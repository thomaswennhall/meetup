export interface IEvent {
  id: string
  title: string
  date: Date
  time: string
  place: string
  description: string
  maxAttendees: number
  attendees: number
  comments?: IComment[]
  rating?: TRating
}

export interface IComment {
  id: string
  text: string
}

export type TRating = [number, number]

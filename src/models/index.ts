import stylingTheme from '../themes'

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
  themes: Theme[]
}

export interface IComment {
  id: string
  text: string
}

export type TRating = [number, number]

export enum Theme {
  MUSIC = 'music',
  HOLIDAY = 'holiday',
  PROGRAMMING = 'programming',
  SCIENCE = 'science',
  LEARNING = 'learning',
}

export interface IThemeCheck {
  music: boolean
  holiday: boolean
  programming: boolean
  science: boolean
  learning: boolean
}

export interface IThemeColors {
  music: string
  holiday: string
  programming: string
  science: string
  learning: string
}

export const themeColors: IThemeColors = {
  music: stylingTheme.colors.blue,
  holiday: stylingTheme.colors.green,
  programming: stylingTheme.colors.orange,
  science: stylingTheme.colors.red,
  learning: stylingTheme.colors.yellow,
}

export const themes: Theme[] = Object.values(Theme)

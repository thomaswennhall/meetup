import React from 'react'
import { Theme, themeColors } from '../../models'
import { P } from '../../themes/typography'
import stylingTheme from '../../themes'

type ThemeStickerProps = {
  theme: Theme
}

const ThemeSticker: React.FC<ThemeStickerProps> = ({ theme }) => {
  const stickerStyle = {
    borderRadius: '4px',
    padding: '4px 8px',
    maxWidth: '8rem',
    backgroundColor: themeColors[theme],
  }

  return (
    <div data-testid="theme-sticker" style={stickerStyle}>
      <P
        light={stickerStyle.backgroundColor == stylingTheme.colors.yellow ? false : true}
        data-testid="theme-sticker-text"
      >
        {theme}
      </P>
    </div>
  )
}

export default ThemeSticker

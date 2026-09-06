import { screen, render } from '@testing-library/react'
import { SplashScreen } from '.'
import * as nextRouter from 'next/router'

describe('SplashScreen component', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  nextRouter.useRouter = jest.fn().mockReturnValue({
    query: {},
  })

  it('renders the header', () => {
    render(<SplashScreen />)
    const header = screen.getByRole('heading')

    expect(header).toBeInTheDocument()
  })
  it('renders all the buttons', () => {
    render(<SplashScreen />)
    const links = screen.getAllByRole('link')

    // 5 InternalLinks + Attributions-Link auf das Berliner Original
    expect(links.length).toBe(6)
  })
  it('renders all the svgs', () => {
    render(<SplashScreen />)
    const svgs = document.querySelectorAll('svg')

    // CrossIcon + SunIcon; OdisLogo und CitylabLogo entfallen in der
    // Dresdner Adaption
    expect(svgs.length).toBe(2)
  })
})

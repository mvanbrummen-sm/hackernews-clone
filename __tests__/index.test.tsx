import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home data={[]} />)

        const heading = screen.getByText('Hacker News')

        expect(heading).toBeInTheDocument()
    })

    it('renders component with props provided', () => {
        const data = [{
            id: 1,
            title: 'title',
            url: 'url',
            by: 'by',
            score: 1,
            time: 1
        }]
        render(<Home data={data} />)
        const item = screen.getByText('title')
        expect(item).toBeInTheDocument()
    })
})

import {render, screen} from '@testing-library/react'
import Item from "../../../components/Item";
import timekeeper from "timekeeper";

describe('Items', () => {
    it('renders a Item', () => {
        timekeeper.freeze(new Date(2023, 2, 1, 0, 0, 0, 0));

        render(<Item index={0} page={0} item={
            {
                id: 1,
                title: 'An example web page',
                url: 'https://example.com',
                by: 'mvanbrummen',
                score: 69,
                time: 1656681497,
                descendants: 1
            }
        }/>)

        expect(screen.getByText('1.')).toBeInTheDocument()
        expect(screen.getByText('An example web page')).toBeInTheDocument()
        expect(screen.getByText('69 points by mvanbrummen 8 months ago |')).toBeInTheDocument()
        expect(screen.getByText('An example web page')).toHaveAttribute('href', 'https://example.com')
    })
})

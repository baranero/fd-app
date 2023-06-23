import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NavbarItem from '@/components/NavbarItem'

describe('NavbarItem render', () => {
    test('Should render properly', () => {
        const label = 'Home'
        render(<NavbarItem label={label}/>)

        const navbarItem = screen.getByText(label)
        navbarItem.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));

        expect(navbarItem).toHaveClass("hover:text-gray-300");
    })

    test('removes hover styles on mouseout', () => {
        const label = 'Home'
        render(<NavbarItem label={label}/>)

        const navbarItem = screen.getByText(label);
        navbarItem.dispatchEvent(new MouseEvent("mouseover", { bubbles: true}))
        navbarItem.dispatchEvent(new MouseEvent("mouseout", { bubbles: true}))
        expect(navbarItem).toHaveClass("text-white");
    })
})
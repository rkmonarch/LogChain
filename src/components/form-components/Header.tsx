import React from 'react'

interface HeaderProps {
  heading: string
}

const Header = ({ heading }: HeaderProps) => {
  return (
    <div className="flex flex-col text-center w-full">
      <h1 className="text-2xl mb-10 font-medium title-font mb-4 text-gray-900 dark:text-white">
        {heading}
      </h1>
    </div>
  )
}

export default Header

Header.defaultProps = {
  label: '',
  onClick: () => {}
}
import React from 'react'

const Avatar = (props) => {
    const colorMap = [
        {
            color: '#F57A23',
            letters: ['A', 'D', 'G', 'J', 'M', 'P', 'S', 'V', 'Y']
        },
        {
            color: '#4A90E2',
            letters: ['B', 'E', 'H', 'K', 'N', 'Q', 'T', 'W', 'Z']
        },
        {
            color: '#B8E986',
            letters: ['C', 'F', 'I', 'L', 'O', 'R', 'U', 'X']
        }
    ]
    const { firstName } = props
    const firstNameChar = firstName.charAt(0)
    const color = colorMap.find(obj => obj.letters.includes(firstNameChar)) 
    ? colorMap.find(obj => obj.letters.includes(firstNameChar)).color
    : 'lightslategray'
    return <>
    <svg height="50" width="50">
    <circle cx="25" cy="25" r="20" fill={color} />
  </svg> 
    <p className="avatar-letter">{firstNameChar}</p>
    </>
}

export default Avatar
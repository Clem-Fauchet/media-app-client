import React from 'react'

function Corner({ corner }) {
	return (
		<>
			<svg viewBox='0 0 100 100' fill='#C4C4C4' className={corner}>
				<polygon points='100 0, 100 100, 0 50' />
			</svg>
		</>
	)
}

export default Corner

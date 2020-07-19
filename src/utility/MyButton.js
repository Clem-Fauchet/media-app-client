import React from 'react'

//Material UI Stuff
import { withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'

const LightTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
		fontFamily: theme.typography.fontFamily.Lato,
	},
}))(Tooltip)

export default ({
	children,
	onClick,
	tip,
	btnClassName,
	tipClassName,
	placement,
}) => (
	<LightTooltip title={tip} className={tipClassName} placement={placement}>
		<IconButton onClick={onClick} className={btnClassName}>
			{children}
		</IconButton>
	</LightTooltip>
)

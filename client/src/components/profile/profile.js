import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';
import ProfileTable from './profile-table';

const styles = (theme) => ({
	root: {
		padding:50
	},
	out:{
		marginLeft:theme.spacing.unit,
		marginRight:theme.spacing.unit,
	},
	container: {
		margin:10,
	}
})



class Profile extends Component {
	render() {
		const { classes } = this.props
		return (
			<Grid className={classes.root} container spacing={24}>
				<Grid className={classes.container} container spacing={24}>
					<Grid item xs={12}>
						<Typography align="left" color="primary" variant="h4">
	           				Dashboard
	          			</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography align="left" color="primary" variant="h6">
	           				Welcome. Jason
	          			</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button	
							component={Link}
							to={{
								pathname: `${this.props.match.url}/edit-profile`
							}}
			        		size="large"
			        		variant="outlined" 
			        		color="primary">
	        				Edit Profile
	      				</Button>
	      				<Button
	      					component={Link}
							to={{
								pathname: `${this.props.match.url}/add-experience`
							}}
	      					classes = {{outlined: classes.out}}
			        		size="large"
			        		variant="outlined" 
			        		color="primary">
	        				Add Experience
	      				</Button>
	      				<Button
	      					component={Link}
							to={{
								pathname:  `${this.props.match.url}/add-education`
							}}
			        		size="large"
			        		variant="outlined" 
			        		color="primary">
	        				Add Education
	      				</Button>
					</Grid>
				</Grid>
				<Grid className={classes.container} container spacing={24}>
					<ProfileTable 
					    title = "Experience Credentials"
						header={['Company', 'Title', 'Years', 'Action']}
						data = ""
					/>
					<ProfileTable 
					    title = "Education Credentials"
						header={['School', 'Degree', 'Years', 'Action']}
						data = ""
					/>
					<Button
							style={{backgroundColor:'pink'}}
			        		size="large"
			        		variant="contained" 
			        		color="default">
	        				Delete my account
	      			</Button>
				</Grid>
			</Grid>
		);
	}
}

export default  withRouter(withStyles(styles)(Profile));

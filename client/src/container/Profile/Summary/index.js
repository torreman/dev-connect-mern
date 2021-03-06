import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profileActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Loading from '../../../components/Layout/ModalSpinner'
import ProfileTable from './ExperienceEducationTable';
import isEmpty from '../../../validation/is-empty';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



const styles = (theme) => ({
	root: {
		paddingLeft: theme.spacing.unit*8,
		paddingRight: theme.spacing.unit*8,
		paddingTop: theme.spacing.unit,
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
	componentDidMount() {
		// this.props.getCurrentProfile();
		getCurrentProfile(this.props.dispatch)
	}

	render() {
		const { classes, auth } = this.props
		const { user_profile, isFetching } = this.props.profile;
		return (
			<Grid className={classes.root} container>
				<Loading loading={isFetching}/>
				<Grid className={classes.container} container spacing={24}>
					<Grid item xs={12}>
						<Typography align="left" color="primary" variant="h4">
	           				Dashboard
	          			</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography align="left" color="primary" variant="h6">
	           				Welcome,  { auth.user.name.toUpperCase() }
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
	        				{!isEmpty(user_profile) ? 'Edit' : 'Add' } Profile
	      				</Button>
	      				{!isEmpty(user_profile) ? 
	      					<Fragment>
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
		      				</Fragment>
	      					:
	      					""
	      				}
					</Grid>
				</Grid>
				<Grid className={classes.container} container spacing={24}>
					{!isEmpty(user_profile) ?
						<Fragment>
							<ProfileTable 
							    title = "Experience Credentials"
								header={['Company', 'Title', 'Years', 'Action']}
								data = {user_profile.experience}
								type="EXPERIENCE"
							/>
							<ProfileTable 
							    title = "Education Credentials"
								header={['School', 'Degree', 'Years', 'Action']}
								data = {user_profile.education}
								type="EDUCATION"
							/>
						</Fragment>
						:
						""
					}
					<Grid item xs={4}>
						{!isEmpty(user_profile) ? 
						<Button
						style={{backgroundColor:'pink'}}
		        		size="large"
		        		variant="contained" 
		        		color="default">
        				Delete my profile
      					</Button>
						:
						""
						}
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
})


Profile.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

export default  connect(mapStateToProps)(withRouter(withStyles(styles)(Profile)));

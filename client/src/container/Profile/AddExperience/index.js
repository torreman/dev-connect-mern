import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addExperience } from '../../../actions/profileActions'
// Component Imports
import TextInput from '../Layout/InputField';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import green from '@material-ui/core/colors/green';
import Checkbox from '@material-ui/core/Checkbox';



const styles = (theme) => ({
	icon: {
		fontSize:30,
		display:'flex',
		height:'100%',
		justifyContent: 'center',
		alignItems:'center',
		opacity:'0.5'
	},
	margin: {
		paddingTop: theme.spacing.unit*2,
		paddingBottom: theme.spacing.unit*4,
	},
	root: {
	    color: green[600],
	    '&$checked': {
	      color: green[500],
	    },
	},
	checked: {},
})

class AddExperience extends Component {
	state = {
		title:'',
		company:'',
		location:'',
		fromdate: '',
		todate: '',
		current: false,
		desc:''
	}

	handleChangeEditProfile = (e, profile) => {
		this.setState({ [profile]: e.target.value })
	}

	handleSubmit = () => {
		const experience = {
			title:this.state.title,
			company:this.state.company,
			location:this.state.location,
			from: this.state.fromdate,
			to: this.state.todate,
			current: this.state.current,
			description:this.state.desc
		}
		this.props.addExperience(experience, this.props.history)
	}

	handleCurrentJob = () => {
		const checkbox = !this.state.current
		if(checkbox === true) {
			this.setState({todate: '', current: checkbox })
		} else {
			this.setState({current: checkbox })
		}
	}

	render() {
		const {classes} = this.props
		
		return (
			<Grid container>
				<Grid className={classes.margin}  container justify="center">
					<Grid item xs={6}>
						<Grid item xs={4}>
							<Button
							component={Link}
							to={{
								pathname:'/profile'
							}}
							fullWidth
			        		size="large"
			        		variant="outlined" 
			        		color="secondary">
	        				Return to Profile
	      					</Button>
	      				</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography align="center" color="primary" variant="h4">
	           				Add Your Experience
	          		</Typography>
	          		<Typography align="center" color="primary" variant="h6">
	           				Add any developer/programming experience positions that you've had
	          		</Typography>
				</Grid>
				<TextInput 
					id="title"
					name="title"
					label="* Job Title"
					value={this.state.title}
					handleChange = {(e) => this.handleChangeEditProfile(e, 'title')}
				/>
				<TextInput 
					id="company"
					name="company"
					label="* Company"
					value={this.state.company}
					handleChange = {(e) => this.handleChangeEditProfile(e, 'company')}
				/>
				<TextInput 
					id="location"
					name="location"
					label="Location"
					value={this.state.location}
					handleChange = {(e) => this.handleChangeEditProfile(e, 'location')}
				/>
				<TextInput 
					id="fromdate"
					name="fromdate"
					value={this.state.fromdate}
					handleChange = {(e) => this.handleChangeEditProfile(e, 'fromdate')}
					subtitle="From Date"
					type='date'
					justifysub="left"
				/>
				<TextInput 
					id="todate"
					name="todate"
					value={this.state.todate}
					handleChange = {(e) => this.handleChangeEditProfile(e, 'todate')}
					subtitle="To Date"
					type='date'
					justifysub="left"
					disabled={this.state.current}
				/>
				<Grid container justify="center">
					<Grid item xs={6}>
						<FormControlLabel
				          control={
				            <Checkbox
				              // checked={this.state.checkedG}
				              onChange={this.handleCurrentJob}
				              value=""
				              classes={{
				                root: classes.root,
				                checked: classes.checked,
				              }}
				            />
				          }
				          label="Current Job"
				        />
					</Grid>	
				</Grid>
				<TextInput 
					id="desc"
					name="desc"
					label="Describe your job"
					value={this.state.desc}
					handleChange = {(e) => this.handleChangeEditProfile(e, 'desc')}
					textfield
					subtitle="Some of your responsibilities"
					justifysub="left"
				/>
				<Grid container justify="center">
					<Grid item xs={6}  className={classes.margin} >
						<Button
						fullWidth
		        		size="large"
		        		variant="extendedFab" 
		        		color="primary"
		        		onClick={this.handleSubmit}>
        				Add your experience
      					</Button>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withStyles(styles)(AddExperience));
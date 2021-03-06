import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDeveloperProfile } from '../../../actions/developerActions';
import isEmpty from '../../../validation/is-empty';
//Components
import LandingCard from './HeadCard';
import BioSkillsCard from './BioSkillsCard';
// import WEcard from './educ-experience.js'
import EducationCardList from './EducationCard'
import ExperienceCardList from './ExperienceCard'
import GithubCard from './GithubRepoCard'
//Material UI
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class DeveloperProfile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			_id:'',
			user:'',
			status:'',
			company:'',
			handle:'',
			website:'',
			location: '',
			githubusername:'',
			experience:'',
			education:'',
			social:'',
			bio:'',
			skills:''
		}
	}

	componentDidMount() {
		this.props.getDeveloperProfile(this.props.match.params.id)
	}

	componentWillReceiveProps(newProps) {
		const { profile } = newProps.developers.single_profile
		if(!isEmpty(profile)) {
			this.setState({
				_id:profile._id,
				user:profile.user,
				status:profile.status,
				company:profile.company,
				handle:profile.handle,
				website:profile.website,
				location: profile.location,
				githubusername:profile.githubusername,
				experience:profile.experience,
				education:profile.education,
				social:profile.social,
				bio:profile.bio,
				skills: profile.skills
			})
		}
	}

	render() {
		const { experience, education } = this.state
		return (
			<Grid container justify="center">
				<Grid item xs={10}>
					<Grid container justify="flex-start">
						<Grid item xs={3}>
							<Button
								component={Link}
								to={{
									pathname:'/developers'
								}}
								fullWidth
				        		size="small"
				        		variant="contained" 
				        		color="secondary">
		        				Return to Developers
		      				</Button>
						</Grid>
					</Grid>
					<LandingCard 
						img={this.state.user.avatar}
						name={this.state.user.name}
						job={this.state.status}
						company={this.state.company}
						social={this.state.social}
						website={this.state.website}
					/>
					<BioSkillsCard 
						bio={this.state.bio}
						skills={this.state.skills}
					/>
					<Grid container spacing={24}>
						<Grid item xs={6}>
							<Grid container justify="center">
								<Typography align="center" variant="h6" color="primary">
									Experience
								</Typography>
							</Grid>
							{education ? 
								<ExperienceCardList data={experience} />
								:
								<ExperienceCardList data={[]}/>
							}
						</Grid>
						<Grid item xs={6}>
							<Grid container justify="center">
								<Typography align="center" variant="h6" color="primary">
									Education
								</Typography>
							</Grid>
							{education ? 
								<EducationCardList data={education} />
								:
								<EducationCardList data={[]}/>
							}
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12}>
							<Typography style={{marginTop:20}} align="left" variant="h5" color="inherit">
									My Github Repository
							</Typography>
						</Grid>
						<Grid item xs={12}>
							{this.state.githubusername ? <GithubCard data={this.state.githubusername}/> : ''}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	developers: state.developers
})

export default connect(mapStateToProps, { getDeveloperProfile })(DeveloperProfile);
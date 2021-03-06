import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import PostComment from './PostComment';
import SingleComment from './SingleComment';
import PropTypes from 'prop-types';

import { getComments } from '../../../actions/postActions';

// Component Imports
import Loading from '../../../components/Layout/ModalSpinner'

// Material UI Imports


class Comments extends Component {
	constructor(props) {
		super(props)
		this.state = {
			current: ''
		}
	}

	componentDidMount() {
		this.props.getComments(this.props.match.params.post_id);
	}

	componentWillReceiveProps(newProps) {
		const { current } = newProps.posts.current_post
		if(current) {
			this.setState({current: current})
		}
	}

	render() {
		const { auth, posts } = this.props
		const { current } = this.state
		return (
			<Fragment>
				<Loading loading={posts.loading} />
				<SingleComment 
					avatar = { current.avatar }
					text = { current.text }
					name = { current.name }
				/>
				<div style={{marginTop:32, marginBottom:32}}>
					<PostComment
					head="Comment on the post!"
					name={ auth.user.name }
					avatar={ auth.user.avatar }
					user={ auth.user.id }
					post_id = { this.props.match.params.post_id }
					/>
					{
						current.comments !== undefined && current.comments.length > 0 ?
						current.comments.map(c => (
							<SingleComment 
								key = { c._id }
								avatar = { c.avatar }
								text = { c.text }
								name = { c.name }
							/>
						))
						:
						null
					}
				</div>
			</Fragment>

		);
	}
}

const mapStateToProps = (state) => ({
	posts: state.posts,
	auth: state.auth
})

Login.propTypes = {
	getComments: PropTypes.func.isRequired,
	posts: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getComments })(Comments);


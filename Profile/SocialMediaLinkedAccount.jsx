/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }


        this.state = {
            showEditSection: false,
            newAccount: linkedAccounts
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.savelinkedAccount = this.savelinkedAccount.bind(this)
        this.openUrlLinkedIn = this.openUrlLinkedIn.bind(this)
        this.openUrlGithhub = this.openUrlGithhub.bind(this)
        
    }

    openEdit() {
        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newAccount: linkedAccounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAccount)
        data[event.target.name] = event.target.value
        console.log("linked data", data)
        this.setState({
            newAccount: data
        })
      //  this.props.updateProfileData({ linkedAccounts: data })
       
    }

    savelinkedAccount() {
        console.log(this.props.componentId)
        console.log(this.state.newAccount)
        const data = Object.assign({}, this.state.newAccount)
        
        this.props.saveProfileData({ linkedAccounts: data})
        this.closeEdit()
    }
    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    openUrlLinkedIn(e) {
        e.preventDefault();
        if (this.props.linkedAccounts.linkedIn != null) {
            window.open('//' + this.props.linkedAccounts.linkedIn)
        } 
       
    }

    openUrlGithhub(e) {
        e.preventDefault();
        if (this.props.linkedAccounts.github != null) {
            window.open('//' + this.props.linkedAccounts.github)
        }

    }
   
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>

                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newAccount.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid linkedIn url"
                />

                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newAccount.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid github url"
                />

                <button type="button" className="ui teal button" onClick={this.savelinkedAccount}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>

        )
    }


    renderDisplay() {

        let linkedIn = this.props.linkedAccounts ? this.props.linkedAccounts.linkedIn : ""
        let github = this.props.linkedAccounts ? this.props.linkedAccounts.github : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">

                    <button className="ui linkedin button" onClick={this.openUrlLinkedIn.bind(this)} >
                        <i aria-hidden="true" className="linkedin icon"></i>
                        LinkedIn
                    </button>
                    <button className="ui github secondary button" onClick={this.openUrlGithhub.bind(this)}>
                        <i aria-hidden="true" className="github icon"></i>
                        Github
                    </button>


                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )

    }

}
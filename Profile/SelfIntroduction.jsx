/* Self introduction section */
import React, { Component } from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Form, Input } from 'semantic-ui-react'
import Cookies from 'js-cookie'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);

        const summary = props.summary ?
            Object.assign({}, props.summary)
            : {
                summary: ""
            }
        const description = props.description ?
            Object.assign({}, props.description)
            : {
                description: ""
            }


        this.state = {
            summaryDetail: summary,
            descriptionDetail: description
           
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDesc = this.handleChangeDesc.bind(this)
        this.SaveIntro = this.SaveIntro.bind(this)
    };


    handleChange(event) {
        const data = Object.assign({}, this.state.summaryDetail)
        data[event.target.name] = event.target.value
        console.log("summary data", data)
        this.setState({
            summaryDetail: data
        })
        this.props.updateWithoutSave(data)
    }

    handleChangeDesc(event) {
        const data = Object.assign({}, this.state.descriptionDetail)
        data[event.target.name] = event.target.value
        console.log("description data", data)
        this.setState({
            descriptionDetail: data
        })
        this.props.updateWithoutSave(data)
    }

    SaveIntro() {
        console.log(this.state.summaryDetail)
        console.log(this.state.descriptionDetail)
        const data = Object.assign({}, this.state)
     
        console.log(data)
        this.props.updateProfileData(data)
    }
    render() {
       
        return (
            <div className='ui sixteen wide column'>
                <Form>
                    <Form.Field>
                        
                        <Input
                            name='summary'
                            onChange={this.handleChange}
                            value={this.props.summary ||""}
                            maxLength="150"
                            placeholder='Please provide a short summary about yourself' />
                        Summary must be no more than 150 characters.
                    </Form.Field>
                    <Form.Field>
                        <textarea 
                            name='description'
                            maxLength="600"
                            onChange={this.handleChangeDesc}
                            value={this.props.description || ""}
                            placeholder={"please tell us about any hobbies,additional expertise,or anything else you'd like to add"}
                        />
                        Description must be between 150-600 characters.
                    </Form.Field>

                </Form>
                <button type="button" className="ui right floated teal button" onClick={this.SaveIntro}>Save</button>
                </div>

        )
    }
}




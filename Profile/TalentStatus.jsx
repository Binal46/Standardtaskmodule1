import React from 'react'
import { Form, Radio } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const jobStatus = props.status ?
            Object.assign({}, props.status)
            : {
               status: "",
               AvailableDate:""
            }

        this.state = {
            status: '',
            newjobStatus: jobStatus,
         
        }

        this.handleChange = this.handleChange.bind(this)

     
    }
    
    
    handleChange(e, { value }) {
       
       
        const data = Object.assign({}, this.state.newjobStatus)
        data['status'] = value
        console.log("job data", data)

        
        this.setState({ status:value })
       
       this.props.saveProfileData({ JobSeekingStatus: data })
    }


   
    render() {

        return (
            <Form>
                
                <Form.Field>
                   
                    <label>Current status</label>
                </Form.Field>
                <Form.Field>
                  
                    <Radio
                        label='Actively looking for a job'
                        name='radioGroup'
                        value='Actively looking for a job'
                        checked={this.state.status ? this.state.status === 'Actively looking for a job' : this.props.status.status === 'Actively looking for a job'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Not looking for a job at the moment'
                        name='radioGroup'
                        value='Not looking for a job at the moment'
                        checked={this.state.status ? this.state.status === 'Not looking for a job at the moment' : this.props.status.status === 'Not looking for a job at the moment'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Currently employed but open to offers'
                        name='radioGroup'
                        value='Currently employed but open to offers'
                        checked={this.state.status ? this.state.status === 'Currently employed but open to offers' : this.props.status.status === 'Currently employed but open to offers'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Will be available on later date'
                        name='radioGroup'
                        value='Will be available on later date'
                        checked={this.state.status ? this.state.status === 'Will be available on later date' : this.props.status.status === 'Will be available on later date'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </Form>

        )
    }
    
}
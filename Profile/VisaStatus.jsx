import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Dropdown, Form, Input, Button } from 'semantic-ui-react';
import moment from 'moment';
import { ChildSingleInput } from '../Form/SingleInput.jsx';


const options = [
    { key: 1, text: 'Citizen', value: 'Citizen' },
    { key: 2, text: 'Permanent Resident', value: 'Permanent Resident' },
    { key: 3, text: 'Work Visa', value: 'Work Visa' },
    { key: 4, text: 'Student Visa', value: 'Student Visa' },
  

]
export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        const visaDetails = props.visaStatus ?
            Object.assign({}, props.visaStatus)
            : {
                visaStatus: ""
            }

        const visaExpiryDetails = props.visaExpiryDate ?
            Object.assign({}, props.visaExpiryDate)
            : {
                visaExpiryDate: ""
            }
        this.state = {
            showExpiryDate: false,
            visa: visaDetails,
            visaExpiry: visaExpiryDetails,
            newVisaDate:''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangedate = this.handleChangedate.bind(this);
        this.ExpiryDateSection = this.ExpiryDateSection.bind(this);
        this.saveVisaExpiry = this.saveVisaExpiry.bind(this);


        
    }
 
      
    
    handleChange(event, { value, name }) {
        console.log("Visa status", value)

        const data = Object.assign({}, this.state.visa)
        data[name] = value

        if (value === 'Work Visa' || value === 'Student Visa') {
            this.setState({
                visa: data,
                showExpiryDate: true
            })
            this.props.updateProfileData(data)
        } else {
            data['visaExpiryDate'] = ''
            this.setState({
                visa: data,
                showExpiryDate: false
            })
            this.props.saveProfileData(data)
        }
        console.log(data)
        
        

    }
    handleChangedate(event, { value, name }) {
        console.log("Visa Expiry", value)

        const data = Object.assign({}, this.state.visaExpiry)
        data[name] = value
        this.setState({
            visaExpiry: data
        })
        console.log(data)
        this.props.updateProfileData(data)

    }

    saveVisaExpiry() {
        console.log(this.state.visaExpiry)
        const data = Object.assign({}, this.state.visaExpiry)
        console.log(data)
           this.props.saveProfileData(data)
    }

    render() {
        if (this.props.visaStatus === 'Work Visa' || this.props.visaStatus === 'Student Visa') {

            this.state = {
                showExpiryDate: true,
               
            }
        } else {
            this.state = {
                showExpiryDate: false
            }

        }
        
        return (
            <div className='ui sixteen wide column'>
                <Form>
                    <Form.Group>
                        <Dropdown
                            name="visaStatus"
                            selection
                            options={options}
                            placeholder='Select your visa type'
                            onChange={this.handleChange}
                            value={this.props.visaStatus}
                        />


                        {this.state.showExpiryDate ? this.ExpiryDateSection() : ''}
                       

                        
                    
                    </Form.Group>

                </Form>

            </div>
        )
    }

    ExpiryDateSection() {

        return (
            <Form.Field inline>
                
                <Input type='date'
                    name='visaExpiryDate'
                    placeholder='Visa Expiry date'
                    value={moment(this.props.visaExpiryDate).format('YYYY-MM-DD')}
                    onChange={this.handleChangedate} />

               
                <Button secondary
                    onClick={this.saveVisaExpiry}>Save</Button>
            </Form.Field>
            )
    }
}
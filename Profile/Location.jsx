import React from 'react'
import Cookies from 'js-cookie'

import { countries } from '../Employer/common.js'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Form, Input, TextArea, Button, Select, Dropdown } from 'semantic-ui-react'





export class Address extends React.Component {
    constructor(props) {
        super(props)

        const addressData = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                city: "",
                country: "",
                number: "",
                postCode: "",
                street: "",
                suburb: "",
            }

        this.state = {
            showEditSection: false,
            newAddress: addressData,

        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.saveAddress = this.saveAddress.bind(this);

    }

    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: addressData
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        var data = Object.assign({}, this.state.newAddress);
        //required
        const name = event.target.name;
        let value = event.target.value;
       

        data[name] = value;

        console.log("Address", data)
        this.setState({
            newAddress: data
        })
      
    }

    saveAddress() {
      
        console.log(this.state.newAddress)
        const data = Object.assign({}, this.state.newAddress)

        this.props.updateProfileData({ address: data })
        this.props.saveProfileData({ address: data })
        this.closeEdit()
    }
   
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {

        let countriesOptions = [];
        let citiesOptions = [];
     
        const selectedCountry = this.state.newAddress.country;
        const selectedCity = this.state.newAddress.city;

        countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);
        console.log("Country", selectedCountry)
       
        if (selectedCountry != "" && selectedCountry != null) {

            var popCities =countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);
            console.log("City", selectedCity)
        }
     
        return (
            <div className='ui sixteen wide column'>
                <Form>
                    <Form.Group widths='equal'>
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            value={this.state.newAddress.number}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Number"
                            errorMessage="Please enter a valid number"
                        />

                        <ChildSingleInput
                            inputType="text"
                            label="Street"
                            name="street"
                            value={this.state.newAddress.street}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Street"
                            errorMessage="Please enter a valid street"
                        />
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={this.state.newAddress.suburb}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Suburb"
                            errorMessage="Please enter a valid suburb"
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <div className="field">
                            <label>Country</label>
                        <select className="ui right labeled dropdown"
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="country"
                            >

                            <option value="">Select a country</option>
                            {countriesOptions}
                            </select>
                        </div>

                        <div className="field" style={{ marginLeft: "5px", marginRight: "5px" }}>
                            <label>City</label>
                            
                        <select className="ui right labeled dropdown"
                            placeholder="City"
                            value={selectedCity}
                            onChange={this.handleChange}
                                name="city"
                        >
                                <option value="">Select a city</option>
                                {popCities}
                            </select>
                        </div>


                        <ChildSingleInput
                            inputType="number"
                            label="Post Code"
                            name="postCode"
                            value={this.state.newAddress.postCode}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Post Code"
                            errorMessage="Please enter a valid post code"
                        />
                    </Form.Group>
                </Form>
                
              

                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }


    renderDisplay() {

        let Address = this.props.addressData ? `${this.props.addressData.number} ${this.props.addressData.street}, ${this.props.addressData.suburb}, 
                        ${this.props.addressData.postCode}` : ""
        let City = this.props.addressData ? this.props.addressData.city : ""
        let Country = this.props.addressData ? this.props.addressData.country : ""
       

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {Address} </p>
                        <p>City: {City}</p>
                        <p>Country: {Country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }


}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        const details = props.nationalityData ?
            Object.assign({}, props.nationalityData)
            : {
                nationality: ""
            }
        this.state = {
            newnationality: details
        }

     
        this.handleChange = this.handleChange.bind(this);

    }

   
    handleChange(event, { value, name }) {
        console.log("Nationality", value)

        const data = Object.assign({}, this.state.newnationality)
        data[name] = value
        this.setState({
            newnationality: data
        })
        
        console.log(data)
        this.props.saveProfileData(data)
        
    }
    
    render() {
       
        const options = [
            { key: 1, text: 'American', value: 'American' },
            { key: 2, text: 'Chinese', value: 'Chinese' },
            { key: 3, text: 'Indian', value: 'Indian' },
            { key: 4, text: 'Mexican', value: 'Mexican' },
            { key: 5, text: 'New Zealander', value: 'NewZealander' },
           
        ]

        return (
            <div className='ui sixteen wide column'>
                <Dropdown
                    name="nationality"
                    selection
                    options={options}
                    placeholder='Select your nationality'
                    onChange={this.handleChange}
                    value={this.props.nationalityData}
                />
            </div>


        )
        
    }
}
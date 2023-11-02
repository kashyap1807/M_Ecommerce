import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
    <Layout title={'About'} >
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            This is a M-Ecommerce app. Build By Kashyap. Here you can buy any product like books , clothes , electronics etc. Basically it's a B to C Ecommerce website.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About

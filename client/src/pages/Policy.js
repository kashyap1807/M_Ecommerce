import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title={"PrivacyPolicy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            We use your personal information for the following purposes:1. To
            process your orders and provide customer support.2. To improve and
            personalize your experience on the Website.
          </p>
          <p>
            Security We take reasonable measures to protect your personal
            information from unauthorized access, disclosure, alteration, and
            destruction.
          </p>
          <p>
            Contact Information If you have questions or concerns about this
            Privacy Policy or your personal information, please contact us at
            www.help@Mecommerceapp.com.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Policy

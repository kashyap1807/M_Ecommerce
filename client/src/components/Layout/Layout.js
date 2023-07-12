import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";

import  { Toaster } from "react-hot-toast";


const Layout = ({children,title,description,keyword,author}) => {

    

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
    title:'MEcommerce - shop now',
    description : 'mern stack project',
    keyword :"ecommerce,mern,react , nodejs,mongodb",
    author:'kashyap',
}

export default Layout

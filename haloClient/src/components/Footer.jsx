import { HomeOutlined, MailOutlined, PhoneAndroidOutlined } from '@material-ui/icons';
import React from 'react';
import './Css/Footer.css'

function Footer() {
    return (
        <div className="footer">
           <div className="footer_text_section">

               <div className="quick_links">

                   <span className="quck_link_text">About us </span>
                   <span className="quck_link_text">FAQ </span>
                   <span className="quck_link_text">Contact us </span>
                   <span className="quck_link_text">Terms and conditions</span>


               </div>
               <div className="footer_contacts ">
   <span className="footer_contact"> <HomeOutlined className="footer_contact_icon" /> KAthmandu,nepal</span>  
   <span className="footer_contact"> <MailOutlined className="footer_contact_icon"/> +977 98 12 12 12</span>  
   <span className="footer_contact"> <PhoneAndroidOutlined className="footer_contact_icon"/> Foody@gmail.com</span>  
   </div>
   
            </div>
           <div className="footer_findus_section">


           <span className="footer_contact">  facebook</span>  
   <span className="footer_contact"> Instagram</span>  
   <span className="footer_contact"> youTube</span>  
   <span className="footer_contact">Twitter</span>  
  

           </div>

        </div>
    )
}

export default Footer

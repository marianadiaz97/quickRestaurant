import React from 'react';
import {InertiaLink} from "@inertiajs/inertia-react";

const PaginationTable = ({ links }) => {
   return (
       <nav aria-label="Page navigation example">
           <ul className="pagination justify-content-center">
               {links.map((link, index) => (
                   <li
                       key={index}
                       className={`page-item ${link.url === null && 'disabled'} ${link.active && 'active'}`}
                   >
                       <InertiaLink className='page-link' href={`${link.url}`}>
                           {link.label}
                       </InertiaLink>
                   </li>
               ))}
           </ul>
       </nav>
   );
};

export default PaginationTable;


import React, {useState} from 'react';
import Select from "react-select";


const CategorySelect = ({ category, dish, setUserOrder, onChange }) => {

    const products = category.products || [];

    return(<>
        <p>{category.name}</p>
        <Select
            className="basic-multi-select mb-3"
            classNamePrefix="select"
            id={category.id}
            onChange={onChange}
            options={products.map(product => ({
                value: product.id,
                label: product.name,
                category_id: category.id,
            }))}
            placeholder={category.name}
        />
    </>);
};

export default CategorySelect;

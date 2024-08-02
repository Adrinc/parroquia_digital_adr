import React from 'react';
import LCstyle from '../css/dropMenuCategorias.module.css';

const DropMenuCategorias = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className={LCstyle.dropdown}>
      <select
        className={LCstyle.dropdownSelect}
        value={selectedCategory}
        onChange={(e) => onCategorySelect(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropMenuCategorias;

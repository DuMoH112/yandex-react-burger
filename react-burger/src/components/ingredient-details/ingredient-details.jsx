import React from 'react';

import stylesDetails from './ingredient-details.module.css';
import { item } from '../../utils/types';


function IngredientDetails (props) {
    return (
        <div className={stylesDetails.root}>
            <img src={props.currentIngredient.image_large} alt="" />
            <h4 className="text_type_main-medium mb-8 mt-4">{props.currentIngredient.name}</h4>
            <div className={`${stylesDetails.info}`}>
                <div className={`${stylesDetails.infoItem} mr-5`}>
                    <span className="text_type_main-default mb-2">Калории,ккал</span>
                    <span className="text_type_digits-default">{props.currentIngredient.calories}</span>
                </div>
                <div className={`${stylesDetails.infoItem} mr-5`}>
                    <span className="text_type_main-default mb-2">Белки, г</span>
                    <span className="text_type_digits-default">{props.currentIngredient.proteins}</span>
                </div>
                <div className={`${stylesDetails.infoItem} mr-5`}>
                    <span className="text_type_main-default mb-2">Жиры, г</span>
                    <span className="text_type_digits-default">{props.currentIngredient.fat}</span>
                </div>
                <div className={`${stylesDetails.infoItem}`}>
                    <span className="text_type_main-default mb-2">Углеводы, г</span>
                    <span className="text_type_digits-default">{props.currentIngredient.carbohydrates}</span>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    currentIngredient: item.isRequired
};

export default IngredientDetails;

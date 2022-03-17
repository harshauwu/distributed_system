const { checkSchema } = require('express-validator');
const { locales } = require('../locales');
const ObjectId = require('mongoose').Types.ObjectId;
const { isUndefined } = require('lodash');

const validateSaveOrder = () => {
    return checkSchema({
        items: {
            optional: { options: { nullable: false } },
            isArray: {
                errorMessage: 'The items should be an array'
            },
            toArray: true
        },
        'items.*.product_id': {
            exists: {
                errorMessage:'The items should be an array of objects with product_id attribute'
            },
            custom: {
                options: value => {
                    if (!isUndefined(value) && value == 0) {
                        return true;
                    } else {
                        if (!ObjectId.isValid(value.toString())) {
                            throw Error(
                                locales.__('messages.validation.object_attribute_is_mongo_id', {
                                    attribute: 'product_id',
                                    object: 'Items'
                                })
                            );
                        } else {
                            return true;
                        }
                    }
                }
            }
        },
        'items.*.unit_price': {
            exists: {
                errorMessage: 'The items should be an array of objects with unit_price attribute'
            },
            isNumeric: {
                errorMessage: 'The unit_price should be a number'
            },
            toInt: true
        },
        'items.*.quantity': {
            exists: {
                errorMessage: 'The items should be an array of objects with quantity attribute'
            },
            isNumeric: {
                errorMessage: 'The quantity should be a number'
            },
            toInt: true
        },
        shipping_name: {
            exists: {
                errorMessage: locales.__('messages.validation.attribute_is_required', {
                    attribute: 'shipping_name'
                })
            },
            notEmpty: {
                errorMessage: locales.__('messages.validation.attribute_is_required', {
                    attribute: 'shipping_name'
                })
            },
            isString: {
                errorMessage: locales.__('messages.validation.attribute_is_string', {
                    attribute: 'shipping_name'
                })
            }
        },
        shipping_address: {
            exists: {
                errorMessage: locales.__('messages.validation.attribute_is_required', {
                    attribute: 'shipping_address'
                })
            },
            notEmpty: {
                errorMessage: locales.__('messages.validation.attribute_is_required', {
                    attribute: 'shipping_address'
                })
            },
            isString: {
                errorMessage: locales.__('messages.validation.attribute_is_string', {
                    attribute: 'shipping_address'
                })
            }
        }
    });
};

module.exports = {
    validateSaveOrder
};
